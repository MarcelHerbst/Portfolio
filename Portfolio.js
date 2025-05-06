"use strict";
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    const toggleButton = item.querySelector('a');
    const submenu = item.querySelector('.submenu');
    if (!submenu)
        return;
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = submenu.style.display === 'flex';
        // Alle Submenüs schließen
        document.querySelectorAll('.submenu').forEach(menu => {
            menu.style.display = 'none';
        });
        // Alle Sub-Submenüs schließen
        document.querySelectorAll('.sub-submenu').forEach(sub => {
            sub.style.display = 'none';
        });
        submenu.style.display = isVisible ? 'none' : 'flex';
    });
    // Innerhalb des NavItems: Klick auf Submenu-Items
    const submenuItems = item.querySelectorAll('.submenu-item');
    submenuItems.forEach(subItem => {
        const subToggle = subItem.querySelector('a');
        const subSubmenu = subItem.querySelector('.sub-submenu');
        if (!subSubmenu)
            return;
        subToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isVisible = subSubmenu.style.display === 'flex';
            // Alle Sub-Submenüs schließen
            document.querySelectorAll('.sub-submenu').forEach(sub => {
                sub.style.display = 'none';
            });
            subSubmenu.style.display = isVisible ? 'none' : 'flex';
        });
    });
});
// Klick außerhalb schließt alles
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.submenu').forEach(menu => {
            menu.style.display = 'none';
        });
        document.querySelectorAll('.sub-submenu').forEach(sub => {
            sub.style.display = 'none';
        });
    }
});
