const form = document.querySelector("#feedback-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  status.textContent = "Sending your note…";

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Your note couldn't be sent. Please try again.");
    status.textContent = result.message;
    form.reset();
  } catch (error) {
    status.textContent = error.message || "We couldn't reach the server. Please try again.";
  } finally {
    button.disabled = false;
  }
});

function makeTomatoAnimation() {
  const ease = { x: [0.42, 0.58], y: [0, 1] };
  const tomato = {
    ddd: 0, ind: 1, ty: 4, nm: "Tomato", sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ t: 0, s: [0], e: [360], i: ease, o: ease }, { t: 60, s: [360] }] },
      p: { a: 0, k: [60, 60, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ t: 0, s: [86, 86, 100], e: [100, 100, 100], i: ease, o: ease }, { t: 30, s: [100, 100, 100], e: [86, 86, 100], i: ease, o: ease }, { t: 60, s: [86, 86, 100] }] }
    },
    ao: 0,
    shapes: [
      { ty: "el", p: { a: 0, k: [0, 5] }, s: { a: 0, k: [58, 51] }, nm: "Tomato body" },
      { ty: "fl", c: { a: 0, k: [1, 0.231, 0.188, 1] }, o: { a: 0, k: 100 }, r: 1, nm: "Tomato red" },
      { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } }
    ],
    ip: 0, op: 60, st: 0, bm: 0
  };
  return { v: "5.7.4", fr: 30, ip: 0, op: 60, w: 120, h: 120, nm: "ByteBite tomato", ddd: 0, assets: [], layers: [tomato] };
}

const lottieNodes = document.querySelectorAll(".lottie-icon");
function startLottieIcons() {
  if (!window.lottie) return;
  const animationData = makeTomatoAnimation();
  lottieNodes.forEach((container) => {
    container.replaceChildren();
    window.lottie.loadAnimation({ container, renderer: "svg", loop: true, autoplay: true, animationData });
  });
}

if (lottieNodes.length) {
  if (window.lottie) startLottieIcons();
  else window.addEventListener("load", startLottieIcons, { once: true });
}