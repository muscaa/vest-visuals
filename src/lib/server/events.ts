/**
 * Sending live events to open pages, from anywhere on the server: a request, a workflow step, another process.
 * Postgres carries them between processes (NOTIFY / LISTEN, built in, nothing to set up), each process passes them on
 * to the pages connected to it (Server-Sent Events). Nothing is stored: a page that reconnects reloads its data.
 */
import { sql } from "drizzle-orm";
import pg from "pg";
import { db } from "@server/db";
import { envServer } from "@server/env";
import type { EventTopic, Events } from "@shared/events";

const channel = "app_events";

interface Message<T extends EventTopic = EventTopic> {
    topic: T;
    payload: Events[T];
}

/**
 * Tells the pages following `topic` that something changed. Inside a transaction, it's sent when it commits, never if
 * it's rolled back. Postgres takes up to 8 KB per event, so it only says what changed.
 */
export async function publish<T extends EventTopic>(topic: T, payload: Events[T]) {
    const message: Message<T> = { topic, payload };
    await db.execute(sql`select pg_notify(${channel}, ${JSON.stringify(message)})`);
}

//
// listening: one connection per process, shared by every page connected to it
//

type Listener = (message: Message) => void;

interface Bus {
    listeners: Set<Listener>;
    connecting?: Promise<void>;
}

// on globalThis, so reloading this file in development doesn't open another connection
const bus: Bus = ((globalThis as { __eventBus?: Bus }).__eventBus ??= { listeners: new Set() });

/** Opens the listening connection, again after it drops (a database restart), as long as someone listens. */
function connect(): Promise<void> {
    bus.connecting ??= (async () => {
        const client = new pg.Client({ connectionString: envServer.DATABASE_URL });
        client.on("notification", (notification) => {
            if (!notification.payload) return;
            const message = JSON.parse(notification.payload) as Message;
            for (const listener of bus.listeners) listener(message);
        });
        const reconnect = () => {
            client.removeAllListeners();
            bus.connecting = undefined;
            if (bus.listeners.size) setTimeout(() => void connect().catch(() => undefined), 1000);
        };
        client.on("error", reconnect);
        client.on("end", reconnect);

        await client.connect();
        await client.query(`listen ${channel}`);
    })();
    return bus.connecting;
}

function listen(listener: Listener) {
    bus.listeners.add(listener);
    void connect().catch(() => undefined);
    return () => bus.listeners.delete(listener);
}

//
// streaming to a page
//

/** A comment line every so often, so proxies (Cloudflare cuts at 100 s) don't take the stream as idle. */
const heartbeat = 25_000;

/**
 * The response of an events route: a stream of the topic's events until the page closes it. The route checks who may
 * follow the topic before returning it.
 */
export function eventStream(request: Request, topic: EventTopic) {
    const encoder = new TextEncoder();
    let close = () => {};

    const body = new ReadableStream<Uint8Array>({
        start(controller) {
            let closed = false;
            const send = (text: string) => {
                if (!closed) controller.enqueue(encoder.encode(text));
            };

            const unlisten = listen((message) => {
                if (message.topic === topic) send(`data: ${JSON.stringify(message.payload)}\n\n`);
            });
            const timer = setInterval(() => send(": ping\n\n"), heartbeat);

            // once, whether the page left or the stream was cancelled
            close = () => {
                if (closed) return;
                closed = true;
                unlisten();
                clearInterval(timer);
                try {
                    controller.close();
                } catch {
                    // already closed, when it was cancelled
                }
            };
            request.signal.addEventListener("abort", () => close(), { once: true });

            // a comment straight away, so the page knows it's connected
            send(": connected\n\n");
        },
        cancel: () => close(),
    });

    return new Response(body, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            // nginx and others would hold the events back otherwise
            "X-Accel-Buffering": "no",
        },
    });
}
