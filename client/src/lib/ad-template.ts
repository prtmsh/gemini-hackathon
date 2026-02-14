import type { MatrixVariation } from "@shared/ad-matrix";

export function getAdTemplate(
  data: MatrixVariation,
  logoBase64: string,
  productBase64: string,
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@600&family=Inter:wght@300;400;700&family=Noto+Sans+Tamil:wght@900&family=Noto+Sans+Devanagari:wght@900&family=Noto+Sans+Kannada:wght@900&family=Noto+Sans+Telugu:wght@900&family=Noto+Sans+Oriya:wght@900&display=swap');

          body { margin: 0; overflow: hidden; background: ${data.bgColor}; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          :root { --accent: ${data.accentColor}; --text-main: ${data.textColor}; }

          #ad-container { width: 100%; height: 100%; position: relative; overflow: hidden; background: ${data.bgGradient}; }
          .logo { position: absolute; top: 15px; right: 15px; width: 50px; opacity: 0; z-index: 100; }
          .product { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); width: 75%; z-index: 20; opacity: 0; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6)); }
          .scene { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; pointer-events: none; }
          .noise-container { display: flex; flex-direction: column; align-items: center; gap: 5px; width: 100%; }
          .noise-word { font-family: 'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Telugu', 'Noto Sans Oriya', sans-serif; font-size: 2rem; font-weight: 900; text-transform: uppercase; color: rgba(255,255,255,0.2); opacity: 0; line-height: 1.1; }
          .tagline { position: absolute; bottom: 60px; width: 100%; text-align: center; color: var(--text-main); opacity: 0; z-index: 30; padding: 0 10px; box-sizing: border-box; }
          .main-copy { font-family: 'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Telugu', 'Noto Sans Oriya', sans-serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 5px; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
          .sub-copy { font-size: 0.7rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 2px; }
          .pulse { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background: radial-gradient(circle, var(--accent) 0%, rgba(0,0,0,0) 70%); opacity: 0; z-index: 10; }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"><\/script>
  </head>
  <body>
      <div id="ad-container">
          <img src="${logoBase64}" class="logo">
          <div class="scene" id="scene-noise">
              <div class="noise-container">
                  ${data.noiseWords.map((word) => `<div class="noise-word">${word}</div>`).join("")}
              </div>
          </div>
          <div class="scene" id="scene-product">
              <div class="pulse"></div>
              <img src="${productBase64}" class="product">
              <div class="tagline">
                  <div class="main-copy">${data.headline}</div>
                  <div class="sub-copy">${data.subline}</div>
              </div>
          </div>
      </div>

      <script>
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
          tl.to(".logo", { opacity: 1, duration: 0.45 });
          tl.to(".noise-word", { opacity: 1, y: 0, scale: 1, color: "#fff", duration: 0.35, stagger: 0.1, ease: "back.out(1.7)" });
          tl.to(".noise-word", { x: "random(-2, 2)", y: "random(-2, 2)", color: "${data.accentColor}", duration: 0.05, repeat: 6, yoyo: true });
          tl.to("#scene-noise", { opacity: 0, scale: 1.5, duration: 0.18, ease: "power4.in" });
          tl.to(".pulse", { scale: 40, opacity: 0.6, duration: 0.55 });
          tl.to(".product", { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" }, "-=0.45");
          tl.to(".tagline", { opacity: 1, y: -10, duration: 0.45 }, "-=0.35");
          tl.to(".product", { y: "-=8", duration: 0.8, yoyo: true, repeat: 0, ease: "sine.inOut" });
          tl.to(["#scene-product", ".logo"], { opacity: 0, duration: 0.35, delay: 0.1 });
      <\/script>
  </body>
  </html>
  `;
}