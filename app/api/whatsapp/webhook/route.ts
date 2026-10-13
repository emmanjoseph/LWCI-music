import { createHmac, timingSafeEqual } from "node:crypto";

// Meta calls this once when you save the webhook, to verify you own the URL
export async function GET(req: Request) {
    const p = new URL(req.url).searchParams;
    if (
        p.get("hub.mode") === "subscribe" &&
        p.get("hub.verify_token") === process.env.WA_VERIFY_TOKEN
    ) {
        return new Response(p.get("hub.challenge") ?? "", { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
}

// Meta sends events here
export async function POST(req: Request) {
    const raw = await req.text(); // must be the raw body for the signature check

    const signature = req.headers.get("x-hub-signature-256") ?? "";
    const expected =
        "sha256=" +
        createHmac("sha256", process.env.WA_APP_SECRET!).update(raw).digest("hex");
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
        return new Response("Invalid signature", { status: 401 });
    }

    const body = JSON.parse(raw);
    for (const entry of body.entry ?? []) {
        for (const change of entry.changes ?? []) {
            for (const s of change.value?.statuses ?? []) {
                // s.status: "sent" | "delivered" | "read" | "failed"
                if (s.status === "failed") {
                    console.error("WhatsApp delivery failed", s.recipient_id, s.errors);
                    // e.g. update the enrollment record to "failed" here
                }
            }
        }
    }

    return new Response("OK", { status: 200 }); // reply quickly with 200
}