import {
  siCloudflare,
  siDocker,
  siFigma,
  siKubernetes,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siStripe,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "./cn";

/** Ícones de marca (Simple Icons, CC0) renderizados em cor única via `currentColor`. */
export const STACK_ICONS = {
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  "Node.js": siNodedotjs,
  Docker: siDocker,
  "Vue.js": siVuedotjs,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Kubernetes: siKubernetes,
  Cloudflare: siCloudflare,
  Stripe: siStripe,
  Figma: siFigma,
} satisfies Record<string, SimpleIcon>;

export type StackName = keyof typeof STACK_ICONS;

interface StackIconProps {
  name: StackName;
  size?: number;
  className?: string;
}

export const StackIcon = ({ name, size = 22, className }: StackIconProps) => (
  <svg
    role="img"
    aria-label={name}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={cn("shrink-0", className)}
    fill="currentColor"
  >
    <path d={STACK_ICONS[name].path} />
  </svg>
);
