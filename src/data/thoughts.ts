import { ThoughtPost } from '@/types';

const thoughts: ThoughtPost[] = [
  {
    slug: 'designing-learning-that-doesnt-feel-like-homework',
    title: "Designing learning that doesn't feel like homework",
    excerpt:
      'The best learning experiences reduce friction first, then invite people into deeper work.',
    publishedAt: '2026-02-03',
    readingTime: '4 min read',
    tags: ['Learning Design', 'UX', 'Facilitation'],
    content: [
      {
        paragraphs: [
          "When a learning experience feels heavy from the first click, most people start negotiating with it immediately. They are not asking what they will discover. They are asking how quickly they can get through it.",
          "I try to design against that reaction. A good learning flow should feel clear, human, and slightly curious before it feels demanding. That shift changes how much attention people are willing to offer.",
        ],
      },
      {
        heading: 'Start with the moment, not the module',
        paragraphs: [
          'I have found it more useful to design around a specific moment of friction than around an abstract curriculum. What is the exact conversation someone struggles with? What decision feels unclear? What behavior needs rehearsal?',
          'Once that moment is obvious, the design gets simpler. The activity has a reason to exist, the examples feel grounded, and the learner can see why they should care.',
        ],
      },
      {
        heading: 'Lower the entry cost',
        paragraphs: [
          'Small choices matter here: shorter prompts, stronger examples, clearer feedback, and interfaces that do not make people decode the tool before they use it. None of that is superficial. It is how trust is built.',
          'If the first minute feels easy to enter, people are much more willing to do the harder reflective work that comes after it.',
        ],
      },
    ],
  },
  {
    slug: 'prototype-the-experience-first',
    title: 'Prototype the experience first',
    excerpt:
      'I would rather test the emotional shape of a tool early than spend weeks polishing the stack behind it.',
    publishedAt: '2025-11-18',
    readingTime: '3 min read',
    tags: ['Prototyping', 'Product', 'Experimentation'],
    content: [
      {
        paragraphs: [
          'When I am building something new, I usually want to know one thing before anything else: does the experience feel useful in motion? That answer often matters more than whether the underlying implementation is elegant on day one.',
          'A rough prototype can tell you if the pacing works, whether the prompt is confusing, and if the interaction creates momentum or hesitation.',
        ],
      },
      {
        heading: 'Prototype for response, not completeness',
        paragraphs: [
          'Early versions do not need every setting, every edge case, or every visual polish pass. They need enough fidelity for someone to react honestly.',
          'If a prototype makes someone lean in, ask a better question, or say "I get what this is trying to do," then it has already done valuable product work.',
        ],
      },
      {
        heading: 'Save the heavy lifting for validated ideas',
        paragraphs: [
          'I still care about robust systems, but I want proof of value before I over-invest in them. That habit keeps projects lighter and makes iteration less expensive.',
          'In practice, that usually means scrappier front-end experiments first and cleaner architecture once the behavior is worth preserving.',
        ],
      },
    ],
  },
  {
    slug: 'small-systems-beat-big-intentions',
    title: 'Small systems beat big intentions',
    excerpt:
      'The most reliable creative and technical momentum usually comes from tiny systems that remove daily decisions.',
    publishedAt: '2025-09-07',
    readingTime: '4 min read',
    tags: ['Systems', 'Workflow', 'Consistency'],
    content: [
      {
        paragraphs: [
          'Most good work is less dramatic than people imagine. It usually comes from a repeatable setup, a clear next action, and enough structure to keep momentum from leaking away.',
          'That has been true for writing, prototyping, project maintenance, and learning design. Ambition is useful, but it is rarely the thing that gets the work finished.',
        ],
      },
      {
        heading: 'Choose systems that reduce friction',
        paragraphs: [
          'A useful system is small enough to survive real life. It might be a standing review block, a content template, or a default process for turning rough notes into publishable material.',
          'The point is not to optimize everything. The point is to make the next good action obvious.',
        ],
      },
      {
        heading: 'Consistency compounds quietly',
        paragraphs: [
          'Quiet consistency often looks unimpressive in the moment. Over a few months, though, it turns into a body of work, a clearer point of view, and better instincts.',
          'That is why I keep returning to simple systems. They let energy go into the work itself instead of into re-deciding how to begin every time.',
        ],
      },
    ],
  },
];

export const thoughtPosts = [...thoughts].sort(
  (firstPost, secondPost) =>
    new Date(secondPost.publishedAt).getTime() - new Date(firstPost.publishedAt).getTime()
);

export function getFeaturedThoughts(limit = 3): ThoughtPost[] {
  return thoughtPosts.slice(0, limit);
}

export function getThoughtBySlug(slug: string): ThoughtPost | undefined {
  return thoughtPosts.find((post) => post.slug === slug);
}
