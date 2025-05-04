"use strict";
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
// Hover-Delay für alle Submenüs
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    const submenu = item.querySelector('.submenu');
    if (!submenu)
        return;
    let hideTimeout = null;
    item.addEventListener('mouseenter', () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        submenu.style.display = 'flex';
    });
    item.addEventListener('mouseleave', () => {
        hideTimeout = window.setTimeout(() => {
            submenu.style.display = 'none';
        }, 100);
    });
    submenu.addEventListener('mouseenter', () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    });
    submenu.addEventListener('mouseleave', () => {
        hideTimeout = window.setTimeout(() => {
            submenu.style.display = 'none';
        }, 100);
    });
});
