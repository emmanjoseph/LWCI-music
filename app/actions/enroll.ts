"use server";

import { COURSES, FEE_PAYERS, enrollmentSchema } from "@/lib/enrollment";
import { PROVIDERS } from "@/lib/providers";

type Result = { ok: true } | { ok: false; error: string };

const toIntl = (p: string) => {
    const d = p.replace(/[\s+-]/g, "");
    return d.startsWith("0") ? "254" + d.slice(1) : d;
};

// WhatsApp template params can't contain newlines or long runs of spaces
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

async function sendTemplate(to: string, params: string[]) {
    const res = await fetch(
        `https://graph.facebook.com/v21.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.WA_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to,
                type: "template",
                template: {
                    name: "new_enrollment",
                    language: { code: "en" },
                    components: [
                        { type: "body", parameters: params.map((text) => ({ type: "text", text })) },
                    ],
                },
            }),
        }
    );
    if (!res.ok) throw new Error(await res.text());
}

export async function enroll(input: unknown): Promise<Result> {
    const parsed = enrollmentSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

    const d = parsed.data;
    if (d.website) return { ok: true }; // honeypot filled: pretend success, send nothing

    const recipients = PROVIDERS[d.course];
    if (!recipients?.length) return { ok: false, error: "That course isn't available right now." };

    const params = [
        clean(`${d.firstName} ${d.surname}`),
        COURSES.find((c) => c.value === d.course)!.label,
        d.age,
        toIntl(d.phoneNumber),
        FEE_PAYERS.find((f) => f.value === d.feePayer)!.label,
        toIntl(d.contact),
    ];

    // Optional: save to Appwrite here first with status "pending", then update it after sending

    const results = await Promise.allSettled(recipients.map((to) => sendTemplate(to, params)));
    const failed = results.filter((r) => r.status === "rejected");

    if (failed.length) {
        console.error("WhatsApp failures:", { params, errors: failed.map((f) => String((f as PromiseRejectedResult).reason)) });
    }
    if (failed.length === recipients.length) {
        return { ok: false, error: "We couldn't send your details. Please try again or WhatsApp us directly." };
    }
    return { ok: true };
}