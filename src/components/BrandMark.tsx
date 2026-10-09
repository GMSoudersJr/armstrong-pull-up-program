import { BRAND_GLYPH_PATH, BRAND_PURPLE } from "@/lib/brandMark";

interface BrandMarkProps {
  className?: string;
}

// Small app-icon-style tile: the white glyph on a rounded purple square,
// inset the same ~82% as apple-icon.tsx so it reads like the app icon.
const BrandMark = ({ className }: BrandMarkProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="1024" height="1024" rx="224" fill={BRAND_PURPLE} />
      <path
        d={BRAND_GLYPH_PATH}
        fill="white"
        transform="translate(92 92) scale(0.82)"
      />
    </svg>
  );
};

export default BrandMark;
