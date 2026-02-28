import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initLenis = () => {
  // 이미 생성되었다면 기존 것 반환
  if ((window as any).lenis) return (window as any).lenis;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  (window as any).lenis = lenis; // 전역 등록

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  console.log("✅ Lenis 엔진 시동 완료!");

  return lenis;
};
