/**
 * Linguagem de movimento ByteFlow — "bytes encaixam, o fluxo desliza".
 * byte: movimentos curtos que encaixam (leve overshoot).
 * flow: movimentos contínuos e fluidos.
 */
export const EASE = {
  byte: "back.out(1.6)",
  flow: "expo.out",
  flowInOut: "power3.inOut",
  pixel: "steps(6)",
} as const;

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 1.1,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Caracteres usados nos efeitos de "decodificação" */
export const SCRAMBLE_CHARS = "01<>/{}#$%&*+=";

/** Evento disparado quando o preloader libera a página */
export const INTRO_DONE_EVENT = "bf:intro-done";
