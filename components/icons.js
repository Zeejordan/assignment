export function Icon({ name, className = 'ui-icon' }) {
  const commonProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true'
  };

  switch (name) {
    case 'bag':
      return (
        <svg {...commonProps}>
          <path d="M6 8h12l-1 11H7L6 8Z" />
          <path d="M9 9V7a3 3 0 1 1 6 0v2" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...commonProps}>
          <path d="m12 20-1.2-1.1C5.2 13.8 2 10.9 2 7.4 2 4.7 4.1 3 6.6 3 8.2 3 9.8 3.8 11 5.2 12.2 3.8 13.8 3 15.4 3 17.9 3 20 4.7 20 7.4c0 3.5-3.2 6.4-8.8 11.5L12 20Z" />
        </svg>
      );
    case 'heart-filled':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="m12 20-1.2-1.1C5.2 13.8 2 10.9 2 7.4 2 4.7 4.1 3 6.6 3 8.2 3 9.8 3.8 11 5.2 12.2 3.8 13.8 3 15.4 3 17.9 3 20 4.7 20 7.4c0 3.5-3.2 6.4-8.8 11.5L12 20Z" />
        </svg>
      );
    case 'star':
      return (
        <svg {...commonProps}>
          <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      );
    case 'filter':
      return (
        <svg {...commonProps}>
          <path d="M4 6h16" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
      );
    case 'sort':
      return (
        <svg {...commonProps}>
          <path d="M8 6h10" />
          <path d="M8 12h7" />
          <path d="M8 18h4" />
          <path d="m5 4-2 2 2 2" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="6" height="6" rx="1.2" />
          <rect x="14" y="4" width="6" height="6" rx="1.2" />
          <rect x="4" y="14" width="6" height="6" rx="1.2" />
          <rect x="14" y="14" width="6" height="6" rx="1.2" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...commonProps}>
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
      );
    case 'minus':
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...commonProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...commonProps}>
          <path d="M4 7h16" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M6 7l1 12h10l1-12" />
          <path d="M9 7V5h6v2" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...commonProps}>
          <path d="M3 7h11v8H3z" />
          <path d="M14 10h4l3 3v2h-7z" />
          <circle cx="8" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...commonProps}>
          <path d="M12 3 5 6v5c0 4.6 2.9 7.8 7 10 4.1-2.2 7-5.4 7-10V6l-7-3Z" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...commonProps}>
          <path d="m3 12 9-9h7v7l-9 9L3 12Z" />
          <circle cx="16.5" cy="7.5" r="1.2" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1L6.5 8.5l4.1-1.4L12 3Z" />
          <path d="m18.5 15 .9 2.5 2.6.9-2.6.9-.9 2.6-.9-2.6-2.5-.9 2.5-.9.9-2.5Z" />
          <path d="m5.5 14 .9 2.5 2.6.9-2.6.9-.9 2.6-.9-2.6-2.5-.9 2.5-.9.9-2.5Z" />
        </svg>
      );
    default:
      return null;
  }
}
