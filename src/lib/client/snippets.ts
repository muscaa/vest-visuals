import React from "react";

export function openNewTab(url: string) {
    const tab = window.open(url, "_blank");
    tab?.focus();
}

export function splitRender(node: React.ReactNode) {
    if (React.isValidElement(node)) {
        return {
            render: node,
        };
    }
    return {
        children: node,
    };
}

export function openLink(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.click();
}
