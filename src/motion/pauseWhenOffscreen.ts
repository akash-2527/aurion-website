/**
 * Pauses an endless animation while its element is outside the viewport and
 * resumes it (from the same spot) when it scrolls back in. Saves main-thread
 * work for JS-driven marquees without any visible difference.
 */
export function pauseWhenOffscreen(el: Element, anim: { pause(): unknown; resume(): unknown }) {
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) anim.resume();
    else anim.pause();
  });
  io.observe(el);
  return () => io.disconnect();
}
