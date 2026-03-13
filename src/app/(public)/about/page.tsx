import { PageShell, SectionIntro, SurfaceCard, TagPill } from '@/components';

export const metadata = {
  title: 'About - The Saish Project',
  description: 'About Saish: digital learning specialist, AI architect lead, and builder of useful systems.',
};

const focusAreas = [
  {
    label: 'learning systems',
    body: 'Designing digital learning experiences that reduce friction and make it easier for people to build confidence quickly.',
  },
  {
    label: 'product prototypes',
    body: 'Testing ideas in motion before over-investing in architecture, so the experience earns its complexity.',
  },
  {
    label: 'AI operations',
    body: 'Shaping AI workflows, internal enablement, and practical experimentation that fits how teams already work.',
  },
];

export default function AboutPage() {
  return (
    <PageShell contentClassName="max-w-6xl space-y-8">
      <SurfaceCard tone="panel" className="p-8 md:p-12">
        <SectionIntro
          eyebrow="about"
          titleAs="h1"
          title="I work where learning design, product thinking, and implementation overlap."
          description="My background spans facilitation, digital learning, immersive experiments, customer enablement, and enterprise AI. The common thread is practical clarity: make the idea easier to enter, easier to test, and easier to keep using."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {focusAreas.map((item) => (
            <SurfaceCard key={item.label} className="p-5">
              <TagPill>{item.label}</TagPill>
              <p className="mt-4 text-sm leading-7 text-dim">{item.body}</p>
            </SurfaceCard>
          ))}
        </div>
      </SurfaceCard>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <SurfaceCard className="p-6 md:p-8">
          <TagPill tone="muted">how i work</TagPill>
          <h2 className="mt-4 text-3xl leading-tight text-ink">Prototype the experience first. Keep the system small enough to survive real life.</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-dim md:text-base">
            <p>
              I am usually looking for the moment where an idea becomes believable in use. That means early prototypes, lightweight proof, and enough polish to test the emotional shape of the experience.
            </p>
            <p>
              Once the value is clear, I care about making the system durable: the right prompts, the right scaffolding, and a workflow that people can return to without friction.
            </p>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6 md:p-8">
          <TagPill tone="muted">collaboration</TagPill>
          <div className="mt-4 space-y-4 text-sm leading-7 text-dim md:text-base">
            <p>I am most useful when a project needs product sense, facilitation instincts, and implementation reality in the same room.</p>
            <p>Good fit: internal learning tools, AI readiness work, workflow design, pilot programs, and portfolio-worthy prototypes.</p>
          </div>
        </SurfaceCard>
      </div>
    </PageShell>
  );
}
