import { PrimaryAction, SecondaryAction, SectionIntro, SurfaceCard, TagPill, cx, surfaceClasses } from './ui';

const socialLinks = [
  {
    href: 'https://linkedin.com/in/saishgaonkar/',
    label: 'linkedin',
    description: 'professional updates, experiments, and collaboration notes',
  },
  {
    href: 'https://github.com/saish97',
    label: 'github',
    description: 'code, prototypes, and technical side projects',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28">
      <SurfaceCard as="div" tone="panel" className="grid gap-8 p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] lg:items-start">
        <div>
          <SectionIntro
            eyebrow="contact"
            title="let's make the next useful thing."
            description="If you are exploring learning products, AI-enabled workflows, or a prototype that needs sharper thinking, email is the fastest way to reach me."
            titleClassName="max-w-[9ch] text-3xl sm:text-4xl lg:text-[3.6rem]"
            descriptionClassName="max-w-xl"
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryAction href="mailto:saishgaonkar97@gmail.com">email me</PrimaryAction>
            <SecondaryAction href="https://linkedin.com/in/saishgaonkar/" target="_blank" rel="noopener noreferrer">
              connect on linkedin
            </SecondaryAction>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-dim">
            based in dubai. currently focused on enterprise AI strategy, learning design, and the operational systems that make experimentation sustainable.
          </p>
        </div>

        <div className="grid gap-4">
          <SurfaceCard className="p-6">
            <TagPill>availability</TagPill>
            <p className="mt-4 text-[1.85rem] leading-tight text-ink">open to strong conversations, scoped collaborations, and practical experiments.</p>
            <p className="mt-3 text-sm leading-7 text-dim">
              best fit: learning innovation, internal AI adoption, lightweight product prototypes, and experience design that needs both clarity and technical execution.
            </p>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <TagPill tone="muted">elsewhere</TagPill>
            <div className="mt-4 space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(surfaceClasses.card, surfaceClasses.interactive, 'block p-4')}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{link.label}</p>
                  <p className="mt-2 text-sm leading-7 text-dim">{link.description}</p>
                </a>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </SurfaceCard>
    </section>
  );
}
