"use strict";
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
