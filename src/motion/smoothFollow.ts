/**
 * Lerp follower that only runs requestAnimationFrame while values are moving.
 *
 * Replaces the "always-on" RAF loops used for mouse parallax / orbs, which
 * wrote a transform every frame forever — even with the mouse still or the
 * section off-screen. Motion is identical (same per-frame easing factor); the
 * loop simply sleeps once every value has settled and wakes on the next `to()`.
 */
export function createSmoothFollow(
  ease: number,
  apply: (values: readonly number[]) => void,
  initial: number[],
) {
  const EPSILON = 0.005;
  const current = initial.slice();
  const target = initial.slice();
  let raf: number | null = null;

  const tick = () => {
    let moving = false;
    for (let i = 0; i < current.length; i++) {
      const delta = target[i] - current[i];
      if (Math.abs(delta) > EPSILON) {
        current[i] += delta * ease;
        moving = true;
      } else {
        current[i] = target[i];
      }
    }
    apply(current);
    raf = moving ? requestAnimationFrame(tick) : null;
  };

  apply(current);

  return {
    to(...values: number[]) {
      for (let i = 0; i < values.length; i++) target[i] = values[i];
      if (raf === null) raf = requestAnimationFrame(tick);
    },
    destroy() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    },
  };
}
