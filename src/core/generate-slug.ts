export function generateSlug(text: string, hasPrefix: boolean = true): string {
  const slug = text.trim().toLowerCase().replace(/\s+/g, "-");

  return hasPrefix ? `b/${slug}` : slug;
}
