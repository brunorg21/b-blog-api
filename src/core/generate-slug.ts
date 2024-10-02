export function generateSlug(text: string, hasPrefix: boolean = true): string {
  const slug = text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return hasPrefix ? `b/${slug}` : slug;
}
