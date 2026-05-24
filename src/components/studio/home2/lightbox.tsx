"use client";

// Lightbox — keyboard-driven gallery overlay. Ported from ui.jsx.

import { useEffect } from "react";
import { COPY, type Lang } from "./data";
import { Icon } from "./icons";

export function Lightbox({
    photos,
    index,
    onClose,
    onNext,
    onPrev,
    lang,
}: {
    photos: string[];
    index: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    lang: Lang;
}) {
    useEffect(() => {
        const k = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", k);
        document.body.style.overflow = "hidden";
        return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
    }, [onClose, onNext, onPrev]);
    const c = COPY[lang];
    return (
        <div className="lightbox" onClick={onClose}>
            <div className="lb-top">
                <span className="lb-counter">{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
                <button className="lb-close" onClick={onClose} aria-label={c.galleryClose}><Icon.close /></button>
            </div>
            <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
                <button className="lb-nav prev" onClick={onPrev} aria-label={c.galleryPrev}><Icon.chevL /></button>
                <img className="lb-img" src={photos[index]} alt="" />
                <button className="lb-nav next" onClick={onNext} aria-label={c.galleryNext}><Icon.chevR /></button>
            </div>
            <div className="lb-bottom">
                <span>{c.galleryPrev} · {c.galleryNext} · ESC</span>
                <span>VEST VISUALS</span>
            </div>
        </div>
    );
}

export function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
    useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
    return <div className="toast"><Icon.check /> {msg}</div>;
}
