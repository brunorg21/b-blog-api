export function generateSlug(text: string): string {
  const slug = text.trim().toLowerCase().replace(/\s+/g, "-");

  return `b/${slug}`;
}
