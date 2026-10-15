import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: `Privacy Policy | ${SITE.name}` };

export default function PrivacyPage() {
    return (
        <section className="bg-black">
            <LegalPage title="Privacy Policy" updated={SITE.updated}>
                <section>
                    <p>
                        {SITE.name} ("we", "us") runs this website to share information about our music
                        lessons and to let you enrol. This policy explains what personal data we collect, why,
                        and what your rights are under the Kenya Data Protection Act, 2019.
                    </p>
                </section>

                <section>
                    <h2>Who is responsible for your data</h2>
                    <p>
                        {SITE.name}, {SITE.location}. Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
                        or WhatsApp <a href={SITE.whatsappLink}>{SITE.whatsappDisplay}</a>.
                    </p>
                </section>

                <section>
                    <h2>What we collect</h2>
                    <p>When you submit the enrolment form we collect:</p>
                    <ul>
                        <li>The student's first name and surname</li>
                        <li>The student's age and phone number</li>
                        <li>The course the student wants to learn</li>
                        <li>Who will pay the fees (the student, a parent or guardian, or a sponsor) and that person's phone number</li>
                    </ul>
                    <p>
                        For security we also process your IP address and basic request information to block spam
                        and automated abuse. We do not collect payment card or mobile money details through this
                        website.
                    </p>
                </section>

                <section>
                    <h2>Why we use it</h2>
                    <ul>
                        <li>To contact you about lessons, match the student with the right teacher and arrange schedules and fees</li>
                        <li>To keep a record of enrolment enquiries</li>
                        <li>To protect the website from spam and misuse</li>
                    </ul>
                    <p>We do not sell your data and we do not use it for unrelated marketing.</p>
                </section>

                <section>
                    <h2>Who sees your data</h2>
                    <ul>
                        <li>
                            <strong>Our teachers and coordinators.</strong> Your details are sent to the person
                            responsible for the course you chose, as a WhatsApp message.
                        </li>
                        <li>
                            <strong>WhatsApp (Meta).</strong> We use the WhatsApp Business Platform to send that
                            message, so Meta processes it under its own terms and privacy policy.
                        </li>
                        <li>
                            <strong>Technology providers</strong> that host the website, store enquiries and
                            protect it from abuse (for example Vercel, Appwrite and Arcjet). They process data
                            only to provide those services to us.
                        </li>
                        <li>Authorities, where the law requires us to share information.</li>
                    </ul>
                </section>

                <section>
                    <h2>Children</h2>
                    <p>
                        Many of our students are under 18. If the student is a child, the form should be
                        completed by a parent or guardian, who is responsible for confirming they agree to us
                        using the child's details as described here.
                    </p>
                </section>

                <section>
                    <h2>How long we keep it</h2>
                    <p>
                        We keep enquiry details for as long as needed to follow up and run lessons. If the
                        student does not enrol, we delete or anonymise the details within [12] months of our last
                        contact. For enrolled students we keep records while they are with us and for [period]
                        afterwards.
                    </p>
                </section>

                <section>
                    <h2>Your rights</h2>
                    <p>You may ask us to:</p>
                    <ul>
                        <li>Tell you what data we hold about you or your child and give you a copy</li>
                        <li>Correct data that is wrong or incomplete</li>
                        <li>Delete your data (see our <Link href="/data-deletion">data deletion page</Link>)</li>
                        <li>Stop using your data for a particular purpose</li>
                    </ul>
                    <p>
                        If you are unhappy with how we handle your data, you can also complain to the Office of
                        the Data Protection Commissioner in Kenya.
                    </p>
                </section>

                <section>
                    <h2>Security</h2>
                    <p>
                        We use HTTPS, restrict access to enrolment details to the people who need them, and
                        protect the form against automated abuse. No online system is completely risk-free, but
                        we take reasonable steps to protect your data.
                    </p>
                </section>

                <section>
                    <h2>Changes</h2>
                    <p>
                        We may update this policy. The date at the top shows when it last changed.
                    </p>
                </section>

                <section>
                    <h2>Contact</h2>
                    <p>
                        Questions or requests: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApp{" "}
                        <a href={SITE.whatsappLink}>{SITE.whatsappDisplay}</a>.
                    </p>
                </section>

            </LegalPage>
        </section>

    );
}