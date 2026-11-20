import Image from "next/image";
import { cn } from "./cn";

interface BrowserFrameProps {
  src: string;
  alt: string;
  url?: string;
  /** largura/altura da imagem, para manter a proporção real do print */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export const BrowserFrame = ({
  src,
  alt,
  url,
  aspect = "1920/961",
  sizes = "(max-width: 640px) 90vw, 520px",
  priority,
  className,
  imageClassName,
}: BrowserFrameProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]",
      className,
    )}
  >
    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/25" />
      {url && (
        <span className="ml-2 truncate rounded-full bg-white/[0.06] px-3 py-[2px] font-mono text-[10.5px] text-white/60">
          {url}
        </span>
      )}
    </div>
    <div className="relative" style={{ aspectRatio: aspect }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-top", imageClassName)}
      />
    </div>
  </div>
);

interface PhoneFrameProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export const PhoneFrame = ({ src, alt, sizes = "160px", priority, className }: PhoneFrameProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-[22px] border-[5px] border-ink-2 bg-ink-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10",
      className,
    )}
  >
    <div className="relative aspect-[375/667]">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  </div>
);
