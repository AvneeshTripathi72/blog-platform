import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
      fill="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="64" rx="20" width="64" fill="currentColor" />
      <path
        d="M20 18.5C25.8 18.7 29.7 20.5 32 23.9C34.3 20.5 38.2 18.7 44 18.5V42.3C39.3 42.4 35.7 43.9 33.1 46.9L32 48.2L30.9 46.9C28.3 43.9 24.7 42.4 20 42.3V18.5Z"
        fill="url(#inkspire-book)"
      />
      <path
        d="M32 24.4V48.2"
        opacity="0.5"
        stroke="#F7F3EC"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M37.6 14.8L38.6 18L41.8 19L38.6 20L37.6 23.2L36.6 20L33.4 19L36.6 18L37.6 14.8Z"
        fill="#F0AA77"
      />
      <defs>
        <linearGradient id="inkspire-book" x1="20" x2="44" y1="19" y2="47">
          <stop stopColor="#FFF8EF" />
          <stop offset="0.55" stopColor="#F4E2C8" />
          <stop offset="1" stopColor="#E1A173" />
        </linearGradient>
      </defs>
    </svg>
  );
}
