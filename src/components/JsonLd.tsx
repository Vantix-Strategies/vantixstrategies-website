/**
 * Renders a schema.org JSON-LD block. Server-safe; stringifies the passed
 * object into a <script type="application/ld+json"> tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is our own static data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
