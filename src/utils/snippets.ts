export function myDate(input: Date | string) {
    const date = typeof input === "string" ? new Date(input) : input;

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(",", "");
}
