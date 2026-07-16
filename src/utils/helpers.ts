export function formatDate(dateString: string, locale = 'pt-BR'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateShort(dateString: string, locale = 'pt-BR'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatDateISO(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString();
}

export function getRelativeTime(dateString: string, locale = 'pt-BR'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 30) {
    return formatDate(dateString, locale);
  }
  if (diffDays > 0) {
    return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
  }
  if (diffHours > 0) {
    return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} min atrás`;
  }
  return 'Agora mesmo';
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Menos de 1 min';
  if (minutes === 1) return '1 min de leitura';
  return `${minutes} min de leitura`;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function classNames(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}

export function getImageSrcSet(image: { src: string; sizes?: Array<{ src: string; width: number }> }): string {
  if (!image.sizes?.length) return '';
  return image.sizes.map((size) => `${size.src} ${size.width}w`).join(', ');
}

export function getImageSizes(image: { sizes?: Array<{ src: string; width: number }> }): string {
  if (!image.sizes?.length) return '100vw';
  return image.sizes.map((size) => `(max-width: ${size.width}px) ${size.width}px`).join(', ');
}

export function generateId(prefix = ''): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

export function absoluteUrl(path: string, baseUrl?: string): string {
  const base = baseUrl || import.meta.env.PUBLIC_SITE_URL || 'https://emagrecer.xx.kg';
  return new URL(path, base).toString();
}