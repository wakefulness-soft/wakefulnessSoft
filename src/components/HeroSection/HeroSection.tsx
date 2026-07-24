import s from './HeroSection.module.css';

export const HeroSection = () => {
  return (
    <section id="top" className={s.section}>
        <div className={s.container}>
            <div className={s.content}>
                {/* <div className="inline-flex items-center gap-2 rounded-full border border-border bg-pool px-3.5 py-1.5 text-xs font-medium backdrop-blur-lg">
                    banner de AI
                </div> */}
                
                <h1 className={s.title}>
                    We turn bold ideas into
                    <span className={s.highlight}>
                        software that wakes up
                    </span>
                    <span style={{display: 'block'}}>your business.</span>
                </h1>

                <p className={s.slogan}>
                    Designing your dream is our most cherished task
                </p>

                <div className={s.actions}>
                    {/* TODO: Add href */}
                    <a
                        href=""
                        className={`${s.link} ${s.linQuote}`}
                    >
                        Request a Quote
                    </a>
                    {/* TODO: Add href */}
                    <a
                        href=""
                        className={`${s.link} ${s.linkReview}`}
                    >
                        View Our Work
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}
