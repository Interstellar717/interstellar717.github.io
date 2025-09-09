/// Framing backup
const isChromeOS = navigator.userAgent.includes("CrOS");

if (isChromeOS && self === top) {
    // alert("Chromebook detected. Framing...");
    window.open("https://interstellar717.github.io/custom.html/?url=" + window.location.href);

}

const qs = q => { return document.querySelector(q) };
const qsa = q => { return document.querySelectorAll(q) };

const sidebar = qs(".sidebar");
const close_btn = qs(".sidebar .close");

sidebar.addEventListener("click", e => {

    if (e.target != sidebar) return;

    if (sidebar.classList.contains("hidden")) {
        sidebar.classList.remove("hidden");
    }
});

close_btn.addEventListener("click", e => {
    sidebar.classList.add("hidden");
});

async function getJSON(path) {
    var s = await fetch(path);
    if (s.status != 200) return;
    var r = await s.json();
    return (r)

}

function blankImages() {
    for (let i = 0; i < qsa("img").length; i++) {
        !qsa("img")[i].getAttribute("src") && (qsa("img")[i].src = "/assets/img/ds_white.png");
    }
}

blankImages();

var data = [];

getJSON("links.json").then(d => data = d).then(e => {

    if (!data) return;

    var first = true;

    for (let header of data) {
        var container = document.createElement("div");
        container.classList.add("tile-container");

        if (header.header) {
            var h1 = document.createElement("h1");
            h1.classList.add("section-header");
            h1.textContent = header.header;
            if (first) {
                h1.style.setProperty("margin-top", "3vh");
            }
            first = false;
            container.appendChild(h1);
        }

        for (let link of header.links) {
            var a = document.createElement("a");
            a.href = link.url;
            if (link.target) {
                a.target = link.target;
            }
            var tile = document.createElement("div");
            tile.classList.add("page-tile");
            var img = document.createElement("img");
            img.classList.add("thumbnail");
            img.src = link.image;
            if (link.obj) {
                img.style.setProperty("object-position", link.obj);
            }
            if (link.fit) {
                img.style.setProperty("object-fit", link.fit);
            }
            if (link["img-style"]) {
                for (let i of Object.keys(link["img-style"])) {
                    img.style.setProperty(i, link["img-style"][i]);
                }
            }
            var label = document.createElement("div");
            label.classList.add("label");
            label.textContent = link.title;

            tile.append(img, label);
            a.appendChild(tile);
            container.appendChild(a);
        }

        document.body.appendChild(container);
    }

    blankImages();

});

