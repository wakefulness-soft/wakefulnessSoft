
export const HeroSection = () => {
  return (
    <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-36">
            <div className="mx-auto max-w-3xl text-center">
                {/* <div className="inline-flex items-center gap-2 rounded-full border border-border bg-pool px-3.5 py-1.5 text-xs font-medium backdrop-blur-lg">
                    banner de AI
                </div> */}
                
                <h1 className="mt-6 text-balance text-4xl text-snow font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                    We turn bold ideas into
                    <span className="block text-prymary">
                        software that wakes up
                    </span>
                    <span className="block">your business.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed sm:text-lg">
                    Designing your dream is our most cherished task
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-6 md:flex-row">
                    {/* TODO: Add href */}
                    <a
                        href=""
                        className="bg-prymary text-inkblack px-4 py-2 rounded-xl transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_44px_-14px_color-mix(in_oklch,var(--color-vodka)_70%,transparent)]"
                    >
                        Request a Quote
                    </a>
                    {/* TODO: Add href */}
                    <a
                        href=""
                        className="border border-border px-4 py-2 rounded-xl bg-secondary transition-colors hover:bg-hover"
                    >
                        View Our Work
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}
