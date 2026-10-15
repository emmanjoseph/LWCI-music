export default function LegalPage({
                                      title,
                                      updated,
                                      children,
                                  }: {
    title: string;
    updated: string;
    children: React.ReactNode;
}) {
    return (
        <main className="mx-auto max-w-3xl px-6 py-24">
            <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-neutral-500">Last updated: {updated}</p>
            <div className="mt-10 space-y-8 text-base/7 text-neutral-700 dark:text-neutral-300 [&_a]:underline [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-950 dark:[&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
                {children}
            </div>
        </main>
    );
}