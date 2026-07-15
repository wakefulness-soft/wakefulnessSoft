
export const HeroSection = () => {
  return (
    <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-36">
            <div className="mx-auto max-w-3xl text-center">
                {/* <div className="inline-flex items-center gap-2 rounded-full border border-border bg-pool px-3.5 py-1.5 text-xs font-medium backdrop-blur-lg">
                    banner de AI
                </div> */}
                
                <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                    We turn bold ideas into
                    <span className="block text-mypurple">
                        software that wakes up
                    </span>
                    <span className="block">your business.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-ghost leading-relaxed sm:text-lg">
                    Designing your dream is our most cherished task
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-6 md:flex-row">
                    {/* TODO: Add href */}
                    <a
                        href=""
                        className="bg-mypurple text-darkvoid px-4 py-2 rounded-xl"
                    >
                        Request a Quote
                    </a>
                    {/* TODO: Add href */}
                    <a
                        href=""
                        className="border-solid border px-4 py-2 rounded-xl"
                    >
                        View Our Work
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}
