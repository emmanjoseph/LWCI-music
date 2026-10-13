"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export type CarouselItem = {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    video?: string;
};

type Props = {
    items: CarouselItem[];
    cardWidth?: number;
    cardHeight?: number;
    gap?: number;
    bleedLeft?: number;
    bleedRight?: number;
    accent?: string; // active arrow colour
};

const COPIES = 3;
const HOME = 1;
const VIDEO_BEHIND = 1;
const VIDEO_AHEAD = 3;

const Card = memo(function Card({
                                    item,
                                    width,
                                    stacked,
                                    playing,
                                    hidden,
                                }: {
    item: CarouselItem;
    width: number;
    stacked: boolean;
    playing: boolean;
    hidden: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        if (playing) el.play().catch(() => {});
        else if (!el.paused) el.pause();
    }, [playing]);

    return (
        <article
            aria-hidden={hidden}
            style={{
                flex: "0 0 auto",
                width,
                height: "100%",
                boxSizing: "border-box",
                padding: 8,
                borderRadius: 32,
                background: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: stacked ? "column" : "row",
                contain: "paint",
            }}
        >
            <div
                style={{
                    position: "relative",
                    flex: "1 1 auto",
                    borderRadius: 24,
                    background: "#EBE9D2",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: stacked ? 24 : 42,
                    boxSizing: "border-box",
                }}
            >
                {item.video && (
                    <video
                        ref={videoRef}
                        src={item.video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        tabIndex={-1}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            pointerEvents: "none",
                        }}
                    />
                )}
                {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.image}
                        alt={item.imageAlt ?? ""}
                        decoding="async"
                        style={{ position: "relative", zIndex: 2, maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                )}
            </div>

            <div
                style={{
                    flex: "0 0 auto",
                    width: stacked ? "100%" : "47%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 4,
                    padding: stacked ? "20px 12px 12px" : "0 24px 0 32px",
                    boxSizing: "border-box",
                }}
            >
                <h3 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, color: "#1a1a1c" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "rgba(26,26,28,.6)" }}>
                    {item.description}
                </p>
            </div>
        </article>
    );
});

export default function FeatureCarousel({
                                            items,
                                            cardWidth = 620,
                                            cardHeight = 359,
                                            gap = 10,
                                            bleedLeft = 295,
                                            bleedRight = 295,
                                            accent = "#FFFE54",
                                        }: Props) {
    const count = items.length;
    const sectionRef = useRef<HTMLElement>(null);
    const [width, setWidth] = useState(0);
    const [inView, setInView] = useState(false);
    const [page, setPage] = useState(0);
    const [instant, setInstant] = useState(false);
    const [active, setActive] = useState<"prev" | "next">("next");

    // responsive: shrink cards and drop the bleed on narrow screens
    const narrow = width > 0 && width < 640;
    const cw = narrow ? Math.max(240, width - 32) : cardWidth;
    const ch = narrow ? 480 : cardHeight;
    const bl = narrow ? 0 : bleedLeft;
    const br = narrow ? 0 : bleedRight;

    const step = cw + gap;
    const BASE = count * HOME;
    const restX = -BASE * step;
    const firstVisible = BASE + page;
    const target = -firstVisible * step;

    const x = useMotionValue(restX);
    const pageRef = useRef(0);
    pageRef.current = page;
    const mountedRef = useRef(false);
    const prevStepRef = useRef(step);
    const startedRef = useRef(false);
    const openedRef = useRef(false);

    // left edge stays closed at rest, then opens in sync with the first move
    const clipPath = useTransform(x, (v) => {
        if (!startedRef.current) return `inset(0px 0px 0px ${bl}px)`;
        if (openedRef.current) return "inset(0px 0px 0px 0px)";
        const left = Math.max(0, bl - Math.abs(v - restX));
        if (left <= 0.5) openedRef.current = true;
        return `inset(0px 0px 0px ${left}px)`;
    });

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
            rootMargin: "200px 0px",
        });
        ro.observe(el);
        io.observe(el);
        return () => {
            ro.disconnect();
            io.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!instant) return;
        const raf = requestAnimationFrame(() => setInstant(false));
        return () => cancelAnimationFrame(raf);
    }, [instant]);

    // after sliding into a spare copy, jump back to the real one with no animation
    const normalize = useCallback(() => {
        const cur = pageRef.current;
        if (count === 0 || (cur >= 0 && cur < count)) return;
        setInstant(true);
        setPage(((cur % count) + count) % count);
    }, [count]);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!mountedRef.current || prevStepRef.current !== step || instant || reduce) {
            mountedRef.current = true;
            prevStepRef.current = step;
            x.set(target);
            return;
        }
        const controls = animate(x, target, {
            type: "spring",
            stiffness: 300,
            damping: 38,
            mass: 0.8,
            onComplete: normalize,
        });
        return () => controls.stop();
    }, [target, step, instant, x, normalize]);

    const paginate = (dir: 1 | -1) => {
        startedRef.current = true;
        setActive(dir === 1 ? "next" : "prev");
        setPage((p) => p + dir);
    };

    const strip = useMemo(() => {
        const out: { key: string; index: number; copy: number; item: CarouselItem }[] = [];
        for (let copy = 0; copy < COPIES; copy++)
            for (let i = 0; i < count; i++)
                out.push({ key: `${copy}-${i}`, index: out.length, copy, item: items[i] });
        return out;
    }, [items, count]);

    if (count === 0) return null;

    const arrow = (dir: "prev" | "next") => (
        <button
            type="button"
            aria-label={dir === "prev" ? "Previous" : "Next"}
            onClick={() => paginate(dir === "next" ? 1 : -1)}
            style={{
                display: "flex",
                padding: 8,
                borderRadius: 99,
                border: 0,
                background: "#1a1a1c",
                cursor: "pointer",
                touchAction: "manipulation",
            }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d={dir === "prev" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}
                    stroke={active === dir ? accent : "rgba(255,255,255,.5)"}
                    strokeWidth="2"
                    strokeLinecap="square"
                />
            </svg>
        </button>
    );

    return (
        <section
            ref={sectionRef}
            aria-roledescription="carousel"
            style={{
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 72,
                visibility: width ? "visible" : "hidden",
            }}
        >
            <motion.div
                style={{
                    position: "relative",
                    width: `calc(100% + ${bl + br}px)`,
                    marginLeft: -bl,
                    height: ch,
                    overflow: "hidden",
                    clipPath,
                    WebkitClipPath: clipPath,
                }}
            >
                <motion.div
                    style={{ position: "absolute", top: 0, left: bl, height: "100%", display: "flex", gap, x }}
                >
                    {strip.map(({ key, index, copy, item }) => {
                        const offset = index - firstVisible;
                        return (
                            <Card
                                key={key}
                                item={item}
                                width={cw}
                                stacked={narrow}
                                hidden={copy !== HOME}
                                playing={inView && offset >= -VIDEO_BEHIND && offset <= VIDEO_AHEAD}
                            />
                        );
                    })}
                </motion.div>
            </motion.div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                {arrow("prev")}
                {arrow("next")}
            </div>
        </section>
    );
}