function scaleChatroom() {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const scale = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
  );

  const main = document.querySelector(".chatroom-main");

  const offsetX = (window.innerWidth - baseWidth * scale) / 2;

  main.style.transform =
    `translateX(${offsetX}px) scale(${scale})`;
}

window.addEventListener("resize", scaleChatroom);
window.addEventListener("load", scaleChatroom);

//para el form

function scaleForm() {
  const baseWidth = 1920;
  const baseHeight = 1080;

  const scale = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
  );  

  const main = document.querySelector(".form-main");

  const offsetX = (window.innerWidth - baseWidth * scale) / 2;  
  
  main.style.transform =
    `translateX(${offsetX}px) scale(${scale})`;
}

window.addEventListener("resize", scaleForm);
window.addEventListener("load", scaleForm);
