// Scale the chatroom layout to fit the viewport while keeping it centered.
function scaleChatroom() {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const scale = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
  );

  const main = document.querySelector(".chatroom-main");
  if (!main) return;

  const offsetX = (window.innerWidth - baseWidth * scale) / 2;

  main.style.transform =
    `translateX(${offsetX}px) scale(${scale})`;
}

// Scale the form layout with the same viewport rules as the chatroom.
function scaleForm() {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const scale = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
  );

  const main = document.querySelector(".form-main");
  if (!main) return;

  const offsetX = (window.innerWidth - baseWidth * scale) / 2;

  main.style.transform =
    `translateX(${offsetX}px) scale(${scale})`;
}

// Recalculate both layouts whenever the window size changes.
window.addEventListener("resize", () => {
  scaleChatroom();
  scaleForm();
});

// Apply the initial scale as soon as the page finishes loading.
window.addEventListener("load", () => {
  scaleChatroom();
  scaleForm();
});
