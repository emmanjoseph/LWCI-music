import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: `Terms of Service | ${SITE.name}` };

export default function TermsPage() {
    return (
        <section className="bg-black">
            <LegalPage title="Terms of Service" updated={SITE.updated}>
                <section>
                    <p>
                        By using this website you agree to these terms. If you don't agree, please don't use the
                        site.
                    </p>
                </section>

                <section>
                    <h2>About the service</h2>
                    <p>
                        This website provides information about {SITE.name} and lets you send an enrolment
                        request. Submitting the form is an enquiry, not a confirmed place. A place, schedule and
                        fees are confirmed directly with us.
                    </p>
                </section>

                <section>
                    <h2>Your responsibilities</h2>
                    <ul>
                        <li>Give accurate information and use phone numbers you are entitled to share</li>
                        <li>If the student is under 18, have a parent or guardian submit the form</li>
                        <li>Don't misuse the site: no spam, automated submissions, or attempts to disrupt or break into it</li>
                    </ul>
                </section>

                <section>
                    <h2>Lessons and fees</h2>
                    <p>
                        Lesson schedules, fees, payment methods and cancellation arrangements are agreed
                        directly with the school and are not set by this website.
                    </p>
                </section>

                <section>
                    <h2>Content</h2>
                    <p>
                        The text, images, logos and design on this site belong to {SITE.name} or are used with
                        permission. Please don't copy or reuse them without our permission.
                    </p>
                </section>

                <section>
                    <h2>Availability and liability</h2>
                    <p>
                        We try to keep the site working but can't guarantee it will always be available or
                        error-free. To the extent the law allows, we are not liable for losses arising from
                        using the website, including a delay or failure in delivering an enquiry. If you
                        don't hear from us, please contact us on WhatsApp.
                    </p>
                </section>

                <section>
                    <h2>Privacy</h2>
                    <p>
                        How we handle your personal data is explained in our <Link href="/privacy">Privacy Policy</Link>.
                    </p>
                </section>

                <section>
                    <h2>Changes and governing law</h2>
                    <p>
                        We may update these terms; the date above shows the latest version. These terms are
                        governed by the laws of Kenya.
                    </p>
                </section>

                <section>
                    <h2>Contact</h2>
                    <p>
                        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApp{" "}
                        <a href={SITE.whatsappLink}>{SITE.whatsappDisplay}</a>.
                    </p>
                </section>
            </LegalPage>
        </section>

    );
}