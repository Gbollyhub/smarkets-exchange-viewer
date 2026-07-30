type IconProps = { className?: string };

export function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 9l3-3-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronUpIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2l1.545 3.13L13 5.635l-2.5 2.435.59 3.44L8 9.885l-3.09 1.625.59-3.44L3 5.635l3.455-.505L8 2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 4V7l2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function StadiumIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M2.5 13c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function GraphIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
      <polyline points="1,11 4,7 7,9 10,4 13,6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1.5" width="10" height="11" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5 1.5V12.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 5h3M7 7.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function ExpandIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
      <path d="M2 9v3h3M12 5V2H9M2 5V2h3M12 9v3H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProfitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="5" width="3" height="7" rx="0.5" fill="currentColor" opacity="0.4" />
      <rect x="5.5" y="3" width="3" height="9" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="10" y="1" width="3" height="11" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export function PortfolioIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1" />
      <path d="M1 7.5h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
