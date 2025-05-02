const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
