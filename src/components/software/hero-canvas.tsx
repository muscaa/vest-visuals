"use client";

/* HeroCanvas — three animated background variants for the hero.
   Ported 1:1 from the Claude Design handoff (hero-canvas.jsx). */

import { useEffect, useRef } from "react";

export type HeroVariant = "grid" | "orbit" | "mesh";

export function HeroCanvas({
    variant = "grid",
    accent = "#4B71D8",
    dark = false,
}: {
    variant?: HeroVariant;
    accent?: string;
    dark?: boolean;
}) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let raf = 0;
        let width = 0,
            height = 0,
            dpr = 1;
        const mouse = { x: 0.5, y: 0.5, vx: 0.5, vy: 0.5 };
        const t0 = performance.now();

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const onResize = () => resize();
        window.addEventListener("resize", onResize);

        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) / rect.width;
            mouse.y = (e.clientY - rect.top) / rect.height;
        };
        window.addEventListener("pointermove", onMove);

        const hex = (c: string): [number, number, number] => {
            const h = c.replace("#", "");
            const n = parseInt(
                h.length === 3
                    ? h
                          .split("")
                          .map((s) => s + s)
                          .join("")
                    : h,
                16,
            );
            return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        };
        const ACC = hex(accent);
        const FG: [number, number, number] = dark
            ? [242, 242, 238]
            : [14, 15, 18];

        const drawGrid = (t: number) => {
            ctx.clearRect(0, 0, width, height);
            const step = 28;
            const cols = Math.ceil(width / step) + 1;
            const rows = Math.ceil(height / step) + 1;
            const cx = mouse.x * width;
            const cy = mouse.y * height;
            const time = t * 0.0006;
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * step;
                    const y = j * step;
                    const dx = x - cx,
                        dy = y - cy;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    const wave =
                        Math.sin(d * 0.012 - time * 4) * 0.5 + 0.5;
                    const falloff = Math.max(0, 1 - d / 380);
                    const diag =
                        Math.sin((i + j) * 0.35 + time * 2) * 0.5 + 0.5;
                    const r = 0.7 + diag * 0.8 + wave * falloff * 3.4;
                    const alpha = 0.08 + diag * 0.06 + falloff * 0.7;
                    let color = FG;
                    if (falloff > 0.2) {
                        const mix = Math.min(1, falloff * 1.4);
                        color = [
                            FG[0] + (ACC[0] - FG[0]) * mix,
                            FG[1] + (ACC[1] - FG[1]) * mix,
                            FG[2] + (ACC[2] - FG[2]) * mix,
                        ];
                    }
                    ctx.fillStyle = `rgba(${color[0] | 0},${color[1] | 0},${color[2] | 0},${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const drawOrbit = (t: number) => {
            ctx.clearRect(0, 0, width, height);
            const cx = width / 2;
            const cy = height * 0.62;
            const time = t * 0.0004;
            const rings = 14;
            for (let i = 0; i < rings; i++) {
                const r = 60 + i * 56 + Math.sin(time + i) * 6;
                const arcLen =
                    0.6 + Math.sin(time * 1.2 + i * 0.7) * 0.5;
                const start = time * (0.6 + i * 0.05) + i * 0.5;
                const end = start + arcLen;
                const isAcc = i % 3 === 1;
                const col = isAcc ? ACC : FG;
                const alpha = 0.06 + (1 - i / rings) * 0.18;
                ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
                ctx.lineWidth = isAcc ? 1.6 : 1;
                ctx.beginPath();
                ctx.arc(cx, cy, r, start, end);
                ctx.stroke();

                const px = cx + Math.cos(end) * r;
                const py = cy + Math.sin(end) * r;
                ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(1, alpha * 3)})`;
                ctx.beginPath();
                ctx.arc(px, py, isAcc ? 3 : 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
            const cx2 = mouse.x * width;
            const cy2 = mouse.y * height;
            const grad = ctx.createRadialGradient(
                cx2,
                cy2,
                0,
                cx2,
                cy2,
                180,
            );
            grad.addColorStop(0, `rgba(${ACC[0]},${ACC[1]},${ACC[2]},0.10)`);
            grad.addColorStop(1, `rgba(${ACC[0]},${ACC[1]},${ACC[2]},0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
        };

        const drawMesh = (t: number) => {
            ctx.clearRect(0, 0, width, height);
            const time = t * 0.0005;
            const lines = 24;
            for (let i = 0; i < lines; i++) {
                const yBase = (i / (lines - 1)) * height;
                const phase = time + i * 0.18;
                const isAcc = i % 5 === 2;
                const col = isAcc ? ACC : FG;
                const alpha =
                    0.05 +
                    (1 - Math.abs(i - lines / 2) / (lines / 2)) * 0.22;
                ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
                ctx.lineWidth = isAcc ? 1.3 : 1;
                ctx.beginPath();
                for (let x = 0; x <= width; x += 8) {
                    const k = x / width;
                    const cursorPull =
                        Math.exp(-Math.pow((k - mouse.x) * 3, 2)) * 60;
                    const y =
                        yBase +
                        Math.sin(k * 6 + phase * 2) * 18 +
                        Math.sin(k * 14 - phase * 1.3) * 8 -
                        cursorPull * (mouse.y - 0.5) * 2;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        };

        const loop = (t: number) => {
            const elapsed = t - t0;
            if (variant === "grid") drawGrid(elapsed);
            else if (variant === "orbit") drawOrbit(elapsed);
            else drawMesh(elapsed);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onMove);
        };
    }, [variant, accent, dark]);

    return (
        <canvas
            ref={ref}
            style={{ display: "block", width: "100%", height: "100%" }}
        />
    );
}
