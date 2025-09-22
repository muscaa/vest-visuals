export function openNewTab(url: string) {
    const tab = window.open(url, "_blank");
    tab?.focus();
}
