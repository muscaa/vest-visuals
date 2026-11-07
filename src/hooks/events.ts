import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { QueryKey } from "@tanstack/react-query";
import type { EventTopic } from "@shared/events";

/**
 * Keeps a query up to date while the page is open: each event of the topic loads it again. The browser reconnects on
 * its own when the connection drops, and it's loaded again then too, for what changed in between.
 */
export function useLiveRefresh(topic: EventTopic, queryKey: QueryKey) {
    const queryClient = useQueryClient();
    // the key as text, so a new array with the same key doesn't reconnect
    const key = JSON.stringify(queryKey);

    useEffect(() => {
        const refresh = () => void queryClient.invalidateQueries({ queryKey: JSON.parse(key) as QueryKey });
        const source = new EventSource(`/api/events/${topic}`);

        let reconnecting = false;
        source.onopen = () => {
            if (reconnecting) refresh();
            reconnecting = true;
        };
        source.onmessage = refresh;

        return () => source.close();
    }, [queryClient, topic, key]);
}
