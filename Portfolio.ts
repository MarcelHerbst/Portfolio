const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
  const toggleButton = item.querySelector('a') as HTMLElement;
  const submenu = item.querySelector('.submenu') as HTMLElement;

  if (!submenu) return;

  toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isVisible = submenu.style.display === 'flex';

    // Alle Submenüs schließen
    document.querySelectorAll('.submenu').forEach(menu => {
      (menu as HTMLElement).style.display = 'none';
    });

    // Alle Sub-Submenüs schließen
    document.querySelectorAll('.sub-submenu').forEach(sub => {
      (sub as HTMLElement).style.display = 'none';
    });

    submenu.style.display = isVisible ? 'none' : 'flex';
  });

  // Innerhalb des NavItems: Klick auf Submenu-Items
  const submenuItems = item.querySelectorAll('.submenu-item');

  submenuItems.forEach(subItem => {
    const subToggle = subItem.querySelector('a') as HTMLElement;
    const subSubmenu = subItem.querySelector('.sub-submenu') as HTMLElement;

    if (!subSubmenu) return;

    subToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isVisible = subSubmenu.style.display === 'flex';

      // Alle Sub-Submenüs schließen
      document.querySelectorAll('.sub-submenu').forEach(sub => {
        (sub as HTMLElement).style.display = 'none';
      });

      subSubmenu.style.display = isVisible ? 'none' : 'flex';
    });
  });
});

// Klick außerhalb schließt alles
document.addEventListener('click', (e) => {
  if (!(e.target as HTMLElement).closest('.nav-item')) {
    document.querySelectorAll('.submenu').forEach(menu => {
      (menu as HTMLElement).style.display = 'none';
    });
    document.querySelectorAll('.sub-submenu').forEach(sub => {
      (sub as HTMLElement).style.display = 'none';
    });
  }
});


function drawImageWithTitle(src: string, title: string) {
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

const canvasRenderMap: Record<string, () => void> = {
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
      console.log("Zeige HTML-Inhalt für:", href); // ← für Test
      showHTMLContent(content.title, content.image, content.text);
    }
  });
});


console.log("Gefundene Menü-Links:", document.querySelectorAll('.main-nav a').length);

function showHTMLContent(title: string, imagePath: string, textLines: string[]) {
  // 👉 Alle Submenüs schließen
  document.querySelectorAll('.submenu').forEach(menu => {
    (menu as HTMLElement).style.display = 'none';
  });

  // 👉 Alle Sub-Submenüs schließen
  document.querySelectorAll('.sub-submenu').forEach(sub => {
    (sub as HTMLElement).style.display = 'none';
  });

  // 👉 Dann normalen Inhalt anzeigen
  const container = document.getElementById("contentArea")!;
  const imageHtml = imagePath ? `<img src="${imagePath}" alt="${title}">` : "";
  const textHtml = textLines.map(line => `<p>${line}</p>`).join("");

  container.innerHTML = `
    <h2>${title}</h2>
    ${imageHtml}
    ${textHtml}
  `;
}
const htmlContentMap: Record<string, { title: string; image: string; text: string[] }> = {
  "#Player": {
    title: "Player Modell",
    image: "", // ← z. B. ein Dummy-Bild
    text: [
      "Das Player-Modell wird hier noch erscheinen.",
      "Die Textur und Animationen folgen später.",
    ]
  },

  "#soldier": {
  title: "Soldier Modell",
  image: "",
  text: ["Dies ist das Soldier-Modell."]
}

};