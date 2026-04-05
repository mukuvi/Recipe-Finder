export function getYouTubeUrl(value: string | null | undefined): string | null {
  const raw = (value ?? '').trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      return url.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(value: string | null | undefined): string | null {
  const url = getYouTubeUrl(value);
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    const id = parsed.searchParams.get('v');
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}
