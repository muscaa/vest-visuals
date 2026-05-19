"use client";

/* ImageSlot — user-fillable image placeholder.
   Reproduces the visible empty-state of the design's <image-slot>
   custom element (icon + caption + "browse files" + dashed ring).
   Drop/click to preview a local image. The design's localStorage
   persistence + crop handles are design-tool scaffolding and are
   intentionally not reproduced. */

import { useId, useRef, useState } from "react";

export function ImageSlot({ placeholder }: { placeholder: string }) {
    const [url, setUrl] = useState<string | null>(null);
    const [over, setOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();

    const take = (file?: File | null) => {
        if (!file || !file.type.startsWith("image/")) return;
        setUrl(URL.createObjectURL(file));
    };

    return (
        <div
            className="vv-slot"
            data-over={over ? "" : undefined}
            data-filled={url ? "" : undefined}
            onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                take(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label={placeholder}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                    inputRef.current?.click();
            }}
        >
            {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="vv-slot-img" src={url} alt="" />
            ) : (
                <div className="vv-slot-empty">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-5-5L5 21" />
                    </svg>
                    <div className="vv-slot-cap">{placeholder}</div>
                    <div className="vv-slot-sub">
                        or <u>browse files</u>
                    </div>
                </div>
            )}
            <div className="vv-slot-ring" />
            <input
                id={inputId}
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => take(e.target.files?.[0])}
            />
        </div>
    );
}
