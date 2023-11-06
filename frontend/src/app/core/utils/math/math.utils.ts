export function smoothstep(x: number): number {
    if (x <= 0) {
      return 0;
    }
    if (x >= 1) {
      return 1;
    }
    return x * x * (3 - 2 * x);
  }