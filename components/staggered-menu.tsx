"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import {
    Menu
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {KeyboardMusicIcon} from "lucide-react";

export interface StaggeredMenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}
export interface StaggeredMenuSocialItem {
    label: string;
    link: string;
}
export interface StaggeredMenuProps {
    position?: "left" | "right";
    colors?: string[];
    items?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    logoAlt?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    isFixed?: boolean;
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

type Ease = [number, number, number, number];
const EASE_OUT: Ease = [0.22, 1, 0.36, 1];
const EASE_IN: Ease = [0.32, 0, 0.67, 0];
const EASE_IN_OUT: Ease = [0.65, 0, 0.35, 1];

const CLOSE_S = 0.32;
const LAYER_STAGGER = 0.07;
const PANEL_S = 0.65;
const DEFAULT_COLORS = ["#B497CF", "#5227FF"];
const PANEL_WIDTH = "w-[clamp(260px,38vw,420px)] max-lg:w-full";
const TOGGLE_LINES = ["Menu", "Close", "Menu", "Close"];

export default function StaggeredMenu({
                                          position = "right",
                                          colors = DEFAULT_COLORS,
                                          items = [],
                                          socialItems = [],
                                          displaySocials = true,
                                          displayItemNumbering = true,
                                          className,
                                          menuButtonColor = "#fff",
                                          openMenuButtonColor = "#fff",
                                          changeMenuColorOnOpen = true,
                                          accentColor = "#5227FF",
                                          isFixed = false,
                                          closeOnClickAway = true,
                                          onMenuOpen,
                                          onMenuClose,
                                      }: StaggeredMenuProps) {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);
    const panelRef = useRef<HTMLElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const change = useCallback(
        (next: boolean) => {
            if (openRef.current === next) return;
            openRef.current = next;
            setOpen(next);
            if (next) onMenuOpen?.();
            else onMenuClose?.();
        },
        [onMenuOpen, onMenuClose]
    );

    // click away + Escape
    useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: PointerEvent) => {
            if (!closeOnClickAway) return;
            const t = e.target as Node;
            if (panelRef.current?.contains(t) || btnRef.current?.contains(t)) return;
            change(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") change(false);
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open, closeOnClickAway, change]);

    const layerColors = useMemo(() => {
        const raw = colors.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
        const arr = [...raw];
        if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
        return arr;
    }, [colors]);

    const v = useMemo(() => {
        const off = position === "left" ? "-100%" : "100%";
        const panelStart = layerColors.length ? (layerColors.length - 1) * LAYER_STAGGER + 0.08 : 0;
        const itemsStart = panelStart + PANEL_S * 0.15;
        const socialsStart = panelStart + PANEL_S * 0.4;
        // contents reset only after the panel has slid out, so reopening replays the entrance
        const reset = { duration: 0, delay: CLOSE_S };
        const cycle = { duration: 0.5 + TOGGLE_LINES.length * 0.07, ease: EASE_OUT };

        return {
            layer: {
                closed: { x: off, transition: { duration: CLOSE_S, ease: EASE_IN } },
                open: (i: number) => ({
                    x: "0%",
                    transition: { duration: 0.5, ease: EASE_OUT, delay: i * LAYER_STAGGER },
                }),
            },
            panel: {
                closed: { x: off, transition: { duration: CLOSE_S, ease: EASE_IN } },
                open: { x: "0%", transition: { duration: PANEL_S, ease: EASE_OUT, delay: panelStart } },
            },
            item: {
                closed: { y: "140%", rotate: 10, transition: reset },
                open: (i: number) => ({
                    y: "0%",
                    rotate: 0,
                    transition: { duration: 1, ease: EASE_OUT, delay: itemsStart + i * 0.1 },
                }),
            },
            num: {
                closed: { opacity: 0, transition: reset },
                open: (i: number) => ({
                    opacity: 1,
                    transition: { duration: 0.6, ease: "easeOut", delay: itemsStart + 0.1 + i * 0.08 },
                }),
            },
            socialTitle: {
                closed: { opacity: 0, transition: reset },
                open: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: socialsStart } },
            },
            socialLink: {
                closed: { y: 25, opacity: 0, transition: reset },
                open: (i: number) => ({
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.55, ease: EASE_OUT, delay: socialsStart + 0.04 + i * 0.08 },
                }),
            },
            btn: {
                closed: { color: menuButtonColor, transition: { delay: 0.18, duration: 0.3 } },
                open: {
                    color: changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
                    transition: { delay: 0.18, duration: 0.3 },
                },
            },
            text: {
                closed: { y: "0%", transition: cycle },
                open: { y: "-75%", transition: cycle }, // lands on the 4th line, "Close"
            },
            plusH: {
                closed: { rotate: 0, transition: { duration: 0.35, ease: EASE_IN_OUT } },
                open: { rotate: 45, transition: { duration: 0.5, ease: EASE_OUT } },
            },
            plusV: {
                closed: { rotate: 90, transition: { duration: 0.35, ease: EASE_IN_OUT } },
                open: { rotate: -45, transition: { duration: 0.5, ease: EASE_OUT } },
            },
        } satisfies Record<string, Variants>;
    }, [position, layerColors.length, menuButtonColor, openMenuButtonColor, changeMenuColorOnOpen]);

    const side = position === "left" ? "left-0" : "right-0";

    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                initial="closed"
                animate={open ? "open" : "closed"}
                className={`pointer-events-none z-40 overflow-hidden ${
                    isFixed ? "fixed inset-0" : "relative h-full w-full"
                } ${className ?? ""}`}
                style={{ ["--sm-accent" as string]: accentColor }}
                data-position={position}
                data-open={open || undefined}
            >
                {/* staggered colour layers */}
                <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 z-[5] ${side} ${PANEL_WIDTH}`}>
                    {layerColors.map((c, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={v.layer}
                            className="absolute inset-0"
                            style={{ background: c }}
                        />
                    ))}
                </div>

                {/* header */}
                <header
                    aria-label="Main navigation header"
                    className="pointer-events-none absolute left-0 top-0 z-20 flex w-full items-center justify-between p-8  text-white"
                >
                    <div className="pointer-events-auto select-none flex items-center gap-2">
                        <KeyboardMusicIcon className="h-5 w-5" />
                        <h1 className={'font-extrabold'}>LWCI Music</h1>
                    </div>

                    <motion.button
                        ref={btnRef}
                        type="button"
                        variants={v.btn}
                        onClick={() => change(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="staggered-menu-panel"
                        className="pointer-events-auto relative inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent font-medium leading-none focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
            <span aria-hidden="true" className="relative mr-2 inline-block h-[1em] overflow-hidden whitespace-nowrap">
              <motion.span variants={v.text} className="flex flex-col leading-none">
                {TOGGLE_LINES.map((l, i) => (
                    <span key={i} className="block h-[1em] leading-none">
                    {l}
                  </span>
                ))}
              </motion.span>
            </span>

                        <span aria-hidden="true" className="relative block h-[14px] w-[14px] shrink-0">
              <motion.span variants={v.plusH} className="absolute inset-x-0 top-[6px] h-0.5 rounded-sm bg-current" />
              <motion.span variants={v.plusV} className="absolute inset-x-0 top-[6px] h-0.5 rounded-sm bg-current" />
            </span>
                    </motion.button>
                </header>

                {/* panel */}
                <motion.aside
                    id="staggered-menu-panel"
                    ref={panelRef}
                    variants={v.panel}
                    inert={!open}
                    aria-hidden={!open}
                    className={`pointer-events-auto absolute inset-y-0 z-10 flex flex-col overflow-y-auto bg-white px-8 pb-8 pt-24 backdrop-blur-xl ${side} ${PANEL_WIDTH}`}
                >
                    <div className="flex flex-1 flex-col gap-5">
                        <ul role="list" className="m-0 flex list-none flex-col gap-2 p-0">
                            {items.map((it, idx) => (
                                <li key={it.label + idx} className="relative overflow-hidden leading-none">
                                    <Link
                                        href={it.link}
                                        aria-label={it.ariaLabel}
                                        onClick={() => change(false)}
                                        className="relative inline-block pr-[1.4em] text-[4rem] font-semibold uppercase leading-none tracking-[-2px] text-black no-underline transition-colors duration-150 hover:text-[var(--sm-accent)]"
                                    >
                                        <motion.span custom={idx} variants={v.item} className="inline-block origin-[50%_100%]">
                                            {it.label}
                                        </motion.span>
                                        {displayItemNumbering && (
                                            <motion.span
                                                aria-hidden="true"
                                                custom={idx}
                                                variants={v.num}
                                                className="pointer-events-none absolute right-[3.2em] top-[0.1em] select-none text-[18px] font-normal tracking-normal text-[var(--sm-accent)]"
                                            >
                                                {String(idx + 1).padStart(2, "0")}
                                            </motion.span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {displaySocials && socialItems.length > 0 && (
                            <div role="group" aria-label="Social links" className="mt-auto flex flex-col gap-3 pt-8">
                                <motion.h3 variants={v.socialTitle} className="m-0 text-base font-medium text-[var(--sm-accent)]">
                                    Socials
                                </motion.h3>
                                <ul role="list" className="m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0">
                                    {socialItems.map((s, i) => (
                                        <motion.li key={s.label + i} custom={i} variants={v.socialLink}>
                                            <a
                                                href={s.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block py-0.5 text-[1.2rem] font-medium text-[#111] no-underline transition-colors duration-300 hover:text-[var(--sm-accent)]"
                                            >
                                                {s.label}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.aside>
            </motion.div>
        </MotionConfig>
    );
}