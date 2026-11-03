/**
 * Saves a hand-made order, after dragging: a category's groups, a group's media, a directory's entries. Each gets its
 * place as given; every one of them must be there, once, so a stale page can't drop or duplicate one.
 */
export async function reorder(current: string[], order: string[], update: (id: string, position: number) => Promise<unknown>) {
    if (order.length !== current.length || new Set(order).size !== order.length || order.some((id) => !current.includes(id))) {
        throw new Error("The new order must hold the same items, each once");
    }
    for (const [position, id] of order.entries()) await update(id, position);
}
