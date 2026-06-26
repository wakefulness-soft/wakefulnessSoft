
export const HeroSection = () => {
  return (
    <>
        <div className="relative mx-auto flex max-w-5xl items-center justify-between overflow-hidden backdrop-blur-xl transition-all px-6 py-3">
            <section>
                <h1 className="mt-6 text-balance font-heading text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                    We build software the <span className="text-gradient text-purple-400">world relies on</span>
                </h1>

                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                    Wakefulness Soft architects, ships, and scales mission-critical platforms for ambitious
                    teams. Precision engineering, ruthless reliability, and design that earns trust.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                </div>
            </section>
        </div>
    </>
  )
}
