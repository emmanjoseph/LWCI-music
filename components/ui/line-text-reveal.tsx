"use client";

import {
    Fragment,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type ElementType,
} from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

type LineBox = { top: number; left: number; width: number; height: number };

type Props = {
    text: string;
    mode?: "lines" | "words";
    as?: ElementType;
    className?: string;
    blockColor?: string; // lines mode
    duration?: number; // seconds per line (lines mode)
    stagger?: number; // seconds between lines (lines mode)
};

export default function TextReveal({
                                       text,
                                       mode = "lines",
                                       as: Tag = "p",
                                       className,
                                       blockColor = "currentColor",
                                       duration = 0.9,
                                       stagger = 0.12,
                                   }: Props) {
    const rootRef = useRef<HTMLElement | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const blockRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const words = useMemo(() => text.trim().split(/\s+/), [text]);

    const [layout, setLayout] = useState<{ lines: LineBox[]; lineOf: number[] }>({
        lines: [],
        lineOf: [],
    });
    const [done, setDone] = useState(false);

    // ---------- LINES: measure which words sit on which line ----------
    useIsoLayoutEffect(() => {
        if (mode !== "lines") return;
        const root = rootRef.current;
        if (!root) return;

        const measure = () => {
            const lines: LineBox[] = [];
            const lineOf: number[] = [];
            let lastTop = -1;
            let current = -1;

            for (let i = 0; i < words.length; i++) {
                const el = wordRefs.current[i];
                if (!el) continue;
                if (el.offsetTop !== lastTop) {
                    current++;
                    lastTop = el.offsetTop;
                    lines.push({
                        top: el.offsetTop,
                        left: el.offsetLeft,
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                    });
                } else {
                    const b = lines[current];
                    b.width = el.offsetLeft + el.offsetWidth - b.left;
                }
                lineOf[i] = current;
            }
            setLayout({ lines, lineOf });
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(root);
        document.fonts?.ready.then(measure);
        return () => ro.disconnect();
    }, [mode, words]);

    // ---------- LINES: play when scrolled into view ----------
    useEffect(() => {
        if (mode !== "lines" || done || layout.lines.length === 0) return;
        const root = rootRef.current;
        if (!root) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDone(true);
            return;
        }

        const anims: Animation[] = [];
        const ms = duration * 1000;
        const easing = "cubic-bezier(0.65, 0, 0.35, 1)";

        const play = () => {
            blockRefs.current.forEach((el, i) => {
                if (!el) return;
                anims.push(
                    el.animate(
                        [
                            { clipPath: "inset(0 100% 0 0)" },
                            { clipPath: "inset(0 0% 0 0)", offset: 0.5 },
                            { clipPath: "inset(0 0 0 100%)" },
                        ],
                        { duration: ms, delay: i * stagger * 1000, easing, fill: "both" }
                    )
                );
            });

            wordRefs.current.forEach((el, i) => {
                if (!el) return;
                anims.push(
                    el.animate(
                        [
                            { opacity: 0 },
                            { opacity: 0, offset: 0.499 },
                            { opacity: 1, offset: 0.5 },
                            { opacity: 1 },
                        ],
                        {
                            duration: ms,
                            delay: (layout.lineOf[i] ?? 0) * stagger * 1000,
                            easing,
                            fill: "both",
                        }
                    )
                );
            });

            Promise.all(anims.map((a) => a.finished))
                .then(() => setDone(true))
                .catch(() => {});
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    io.disconnect();
                    play();
                }
            },
            { rootMargin: "0px 0px -15% 0px" }
        );
        io.observe(root);

        return () => {
            io.disconnect();
            anims.forEach((a) => a.cancel());
        };
    }, [mode, done, layout, duration, stagger]);

    // ---------- WORDS: scroll-linked opacity ----------
    useEffect(() => {
        if (mode !== "words") return;
        const root = rootRef.current;
        if (!root) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const n = words.length;
        let raf = 0;

        const update = () => {
            raf = 0;
            const r = root.getBoundingClientRect();
            const vh = window.innerHeight;
            // starts when the top hits 85% of the viewport, ends when the bottom hits 50%
            const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (vh * 0.35 + r.height));
            wordRefs.current.forEach((el, i) => {
                if (!el) return;
                el.style.opacity = String(0.15 + 0.85 * clamp(p * n - i));
            });
        };

        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [mode, words]);

    return (
        <Tag ref={rootRef} className={className} style={{ position: "relative" }}>
            {words.map((w, i) => (
                <Fragment key={i}>
          <span
              ref={(el) => {
                  wordRefs.current[i] = el;
              }}
              style={{
                  display: "inline-block",
                  opacity: mode === "lines" ? (done ? 1 : 0) : 0.15,
              }}
          >
            {w}
          </span>
                    {i < words.length - 1 && " "}
                </Fragment>
            ))}

            {mode === "lines" &&
                !done &&
                layout.lines.map((b, i) => (
                    <span
                        key={i}
                        aria-hidden="true"
                        ref={(el) => {
                            blockRefs.current[i] = el;
                        }}
                        style={{
                            position: "absolute",
                            top: b.top,
                            left: b.left,
                            width: b.width,
                            height: b.height,
                            background: blockColor,
                            clipPath: "inset(0 100% 0 0)",
                            pointerEvents: "none",
                        }}
                    />
                ))}
        </Tag>
    );
}