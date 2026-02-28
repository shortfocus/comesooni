// src/scripts/lenis-init.ts
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initLenis = () => {
  // 1. Lenis 인스턴스 생성
  const lenis = new Lenis({
    duration: 1.2, // 스크롤 속도
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 이징
    smoothWheel: true,
  });

  // 2. Lenis 스크롤 시 ScrollTrigger 업데이트 (필수!)
  lenis.on("scroll", ScrollTrigger.update);

  // 3. GSAP Ticker에 Lenis 업데이트 로직 추가
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // 밀리초 단위로 업데이트
  });

  // 4. 리프레시 시 스크롤 위치 보정
  gsap.ticker.lagSmoothing(0);

  return lenis; // 필요 시 외부에서 제어할 수 있도록 반환
};
