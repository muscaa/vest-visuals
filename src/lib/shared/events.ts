/**
 * Live events the server sends to open pages, by topic. They only say what changed, the page then reloads what it
 * shows. Each topic has its own route (`/api/events/assets`), which decides who may follow it; see `useLiveRefresh`.
 */
export interface Events {
    /** an asset's variants or its last upload changed */
    assets: { key: string };
    /** something in the portfolio changed: a category's or a group's contents, a media's variants */
    portfolio: Record<string, never>;
}

export type EventTopic = keyof Events;
