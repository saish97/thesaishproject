import type { ThoughtContent, ThoughtSection, TiptapNode } from '@/types';

function isLegacySections(content: ThoughtContent): content is ThoughtSection[] {
  return Array.isArray(content);
}

function RenderNode({ node }: { node: TiptapNode }) {
  // Text node
  if (node.type === 'text') {
    let element: React.ReactNode = node.text ?? '';
    for (const mark of node.marks ?? []) {
      switch (mark.type) {
        case 'bold':
          element = <strong>{element}</strong>;
          break;
        case 'italic':
          element = <em>{element}</em>;
          break;
        case 'underline':
          element = <u>{element}</u>;
          break;
        case 'strike':
          element = <s>{element}</s>;
          break;
        case 'link':
          element = (
            <a href={mark.attrs?.href as string} className="text-[var(--accent)] underline" target="_blank" rel="noopener noreferrer">
              {element}
            </a>
          );
          break;
      }
    }
    return <>{element}</>;
  }

  const children = (node.content ?? []).map((child, i) => <RenderNode key={i} node={child} />);

  switch (node.type) {
    case 'heading': {
      const level = (node.attrs?.level as number) ?? 2;
      if (level === 2) return <h2 className="text-2xl leading-tight text-ink">{children}</h2>;
      return <h3 className="text-xl leading-tight text-ink">{children}</h3>;
    }
    case 'paragraph':
      return <p className="text-base leading-8 text-dim md:text-lg">{children}</p>;
    case 'bulletList':
      return <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-dim md:text-lg">{children}</ul>;
    case 'orderedList':
      return <ol className="list-decimal space-y-2 pl-6 text-base leading-8 text-dim md:text-lg">{children}</ol>;
    case 'listItem':
      return <li>{children}</li>;
    case 'blockquote':
      return <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic text-dim">{children}</blockquote>;
    case 'horizontalRule':
      return <hr className="border-[var(--border)]" />;
    case 'image':
      return (
        <img
          src={node.attrs?.src as string}
          alt={(node.attrs?.alt as string) ?? ''}
          className="rounded-lg max-w-full"
        />
      );
    case 'hardBreak':
      return <br />;
    default:
      return <>{children}</>;
  }
}

function LegacyContent({ sections }: { sections: ThoughtSection[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <section key={index} className="space-y-5">
          {section.heading ? <h2 className="text-2xl leading-tight text-ink">{section.heading}</h2> : null}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-base leading-8 text-dim md:text-lg">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}

export function ThoughtContentRenderer({ content }: { content: ThoughtContent }) {
  if (isLegacySections(content)) {
    return <LegacyContent sections={content} />;
  }

  return (
    <div className="space-y-5">
      {(content.content ?? []).map((node, i) => (
        <RenderNode key={i} node={node} />
      ))}
    </div>
  );
}
