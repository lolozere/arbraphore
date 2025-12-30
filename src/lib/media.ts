export function normalizeMediaPath(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('../medias/')) {
    return `/medias/${path.replace(/^\.\.\/medias\/?/, '')}`;
  }
  if (path.startsWith('/medias/')) {
    return path;
  }
  return path;
}

export function formatDateFR(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
