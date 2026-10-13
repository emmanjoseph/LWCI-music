"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import TextReveal from "@/components/ui/line-text-reveal";

const quickLinks = [
    { title: "About", href: "/about" },
    { title: "Courses", href: "/courses" },
    { title: "Contact", href: "/contact" },
    { title: "Jerusalem Family Ministry", href: "/contact" },
];

const contactInfo = [
    { title: "Talk to Felix", href: "tel:+254700000000" },
    { title: "Talk to Marian", href: "tel:+254700000000" },
    { title: "Talk to David", href: "tel:+254700000000" },
    { title: "Visit us", href: "https://goo.gl/maps/1234567890" },
];

const Footer = () => {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <div className={' bg-black text-gray-200'}>
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-5 gap-8">
                    <div className="md:col-span-2">
                        <TextReveal
                            as="h3"
                            mode="lines"
                            blockColor="#9cae65"
                            text="Living Water Music School"
                            className="max-w-[15ch] text-5xl font-bold tracking-tight text-balance"
                        />
                        
                        <p className="mt-7 text-[15px]">Growing in faith Growing in music</p>
                    </div>

                    <div className="md:col-span-3 grid md:grid-cols-2 gap-8">
                        <div className="">
                            <TextReveal
                                as="h3"
                                mode="lines"
                                blockColor="#9cae65"
                                text="Quick Links"
                                className="max-w-[15ch] text-xl font-bold tracking-tight text-balance"
                            />

                            <ul className="mt-7 space-y-4">
                                {quickLinks.map((link) => (
                                    <li key={link.title}>
                                        <a href={link.href} className="text-gray-400 hover:text-white">
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="">
                            <TextReveal
                                as="h3"
                                mode="lines"
                                blockColor="#9cae65"
                                text="Contacts us"
                                className="max-w-[15ch] text-xl font-bold tracking-tight text-balance"
                            />

                            <ul className="mt-7 space-y-4">
                                {contactInfo.map((info) => (
                                    <li key={info.title}>
                                        <a href={info.href} className="text-gray-400 hover:text-white">
                                            {info.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
                <p className="text-center text-sm text-gray-400 mt-20">
                    &copy; {year ?? "2026"} LWCI Music School. All rights reserved.
                </p>
            </div>
            </div>
    )
}
export default Footer
