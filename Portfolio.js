"use strict";
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function resizeCanvas() {
    var _a, _b, _c;
    const dpr = window.devicePixelRatio || 1;
    const bannerHeight = ((_a = document.getElementById("banner")) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
    const navHeight = ((_b = document.querySelector(".main-nav")) === null || _b === void 0 ? void 0 : _b.clientHeight) || 0;
    const contentHeight = ((_c = document.getElementById("contentArea")) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
    const canvasHeight = window.innerHeight - (bannerHeight + navHeight + contentHeight + 10);
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.width = "100%";
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
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
function drawImageWithTitle(src, title) {
    clearCanvas();
    const img = new Image();
    img.onload = () => {
        const scale = Math.min(canvas.width / 600, 1);
        const imgWidth = 400 * scale;
        const imgHeight = 400 * scale;
        const x = (canvas.width - imgWidth) / 2;
        const y = 120;
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
        ctx.fillStyle = "#ffffff";
        ctx.font = "26px Arial";
        ctx.textAlign = "center";
        ctx.fillText(title, canvas.width / 2, y - 30);
    };
    img.src = src;
}
const canvasRenderMap = {
//"#Player": () => drawImageModel("Player Modell", "Picture_Website/Player_Model.png"),
//"#soldier": () => drawImageModel("Soldier Modell", "Picture_Website/Soldier_Model.png"),
//"#zombie": () => drawImageModel("Zombie Modell", "Picture_Website/Zombie_Model.png"),
//"#roundtracker": () => drawImageModel("Roundtracker", "Picture_Website/Roundtracker.png"),
//"#cardholder": () => drawImageModel("Cardholder", "Picture_Website/Cardholder.png"),
//"#kumo": () => drawImageModel("Kumo", "Picture_Website/Kumo.png"),
// usw.
};
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = (link.getAttribute('href') || "").trim();
        const content = htmlContentMap[href];
        if (content) {
            e.preventDefault();
            console.log("Zeige HTML-Inhalt für:", href);
            console.log("Titel:", content.title);
            console.log("Bilder:", content.images);
            console.log("Text:", content.text);
            showHTMLContent(content.title, content.images, content.text, content.sectionTitle);
        }
    });
});
console.log("Gefundene Menü-Links:", document.querySelectorAll('.main-nav a').length);
function showHTMLContent(title, imagePaths, textLines, sectionTitle) {
    // 👉 Alle Submenüs schließen
    document.querySelectorAll('.submenu').forEach(menu => {
        menu.style.display = 'none';
    });
    document.querySelectorAll('.sub-submenu').forEach(sub => {
        sub.style.display = 'none';
    });
    // 👉 HTML zusammenbauen
    const container = document.getElementById("contentArea");
    // 👇 alle Bilder als <img>-Elemente
    const imageHtml = imagePaths.map((src, index) => {
        const labels = ["Links", "Vorne", "Rechts", "Hinten"];
        const label = labels[index] || `Ansicht ${index + 1}`;
        return `
      <div class="image-block">
        <img src="${src}" alt="${title} - ${label}" class="model-image">
        <div class="image-caption">${label}</div>
      </div>`;
    }).join("");
    const textHtml = textLines.map(line => `<p class="model-description">${line.replace(/\n/g, "<br>")}</p>`).join("");
    container.innerHTML = `
    <h1 class="section-heading ${getSectionClass(sectionTitle)}">${sectionTitle}</h1>
    <h2 class="model-title">${title}</h2>
    <div class="image-gallery">
      ${imageHtml}
    </div>
    ${textHtml}
  `;
    // 👉 Jetzt die Click-Events auf neue Bilder registrieren
    container.querySelectorAll('.model-image').forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modalImg.src = img.src;
            modal.style.display = "flex";
        });
    });
}
function getSectionClass(title) {
    switch (title) {
        case 'Fall of Egypt: The Last City':
            return 'section-foe';
        case 'Characters':
            return 'section-characters';
        case 'Ambisonic':
            return 'section-ambisonic';
        // Weitere Sektionen hier ergänzen
        default:
            return '';
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------------
const htmlContentMap = {
    "#Player": {
        title: "Player Character Modell:",
        sectionTitle: "Fall of Egypt: The Last City",
        images: [
            "3DModell/PlayerCharakter/PlayerCharakter_Links.png",
            "3DModell/PlayerCharakter/PlayerCharakter_Vorne.png",
            "3DModell/PlayerCharakter/PlayerCharakter_Rechts.png",
            "3DModell/PlayerCharakter/PlayerCharakter_Hinten.png"
        ],
        // ← z. B. ein Dummy-Bild
        text: [
            "This model represents the player character of the game Fall of Egypt: The Last City. \nIt is inspired by the citizens of ancient Egypt.",
        ]
    },
    "#soldier": {
        title: "Soldier Modell",
        sectionTitle: "Fall of Egypt: The Last City",
        images: [""],
        text: ["Dies ist das Soldier-Modell."]
    }
};
function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}
