import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: `Data Deletion | ${SITE.name}` };

export default function DataDeletionPage() {
    return (
        <section className="bg-black">
            <LegalPage title="Data Deletion Instructions" updated={SITE.updated}>
                <section>
                    <p>
                        You can ask us to delete the personal data you or your child submitted through our
                        enrolment form at any time.
                    </p>
                </section>

                <section>
                    <h2>How to ask</h2>
                    <ul>
                        <li>
                            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the subject "Delete my data", or
                        </li>
                        <li>
                            Send a WhatsApp message to <a href={SITE.whatsappLink}>{SITE.whatsappDisplay}</a> saying
                            you want your data deleted.
                        </li>
                    </ul>
                    <p>
                        Please include the student's full name and the phone number used on the form so we can
                        find the record. We may ask you to confirm you are the person (or the parent or guardian)
                        who submitted it.
                    </p>
                </section>

                <section>
                    <h2>What happens next</h2>
                    <ul>
                        <li>We will confirm we've received your request within [3] working days</li>
                        <li>We will delete the enrolment record from our systems within [30] days</li>
                        <li>We will tell the teacher or coordinator who received your details to delete their copy</li>
                    </ul>
                    <p>
                        We may need to keep limited information where the law requires it, for example fee
                        records. Messages already delivered through WhatsApp are also subject to Meta's own
                        retention rules.
                    </p>
                </section>

                <p>
                    More detail on how we use your data is in our <Link href="/privacy">Privacy Policy</Link>.
                </p>
            </LegalPage>

        </section>

    );
}