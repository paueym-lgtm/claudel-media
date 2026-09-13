// ==========================================
// CLAUDEL MÉDIA - PUBLIC CMS
// ==========================================

async function getSiteSettings() {

    const { data, error } = await supabaseClient
        .from("site_settings")
        .select("setting_key, setting_value");

    if (error) {
        console.error("Erreur réglages :", error);
        return {};
    }

    const settings = {};

    data.forEach(item => {
        settings[item.setting_key] = item.setting_value;
    });

    return settings;
}


// ==========================================
// APPLIQUER LES RÉGLAGES
// ==========================================

async function applySiteSettings() {

    const settings = await getSiteSettings();

    // -----------------------------
    // NOM DU SITE
    // -----------------------------

    document.querySelectorAll("[data-setting='site_name']")
        .forEach(el => {
            if (settings.site_name) {
                el.textContent = settings.site_name;
            }
        });


    // -----------------------------
    // SLOGAN
    // -----------------------------

    document.querySelectorAll("[data-setting='slogan']")
        .forEach(el => {
            if (settings.slogan) {
                el.textContent = settings.slogan;
            }
        });


    // -----------------------------
    // TITRE ACCUEIL
    // -----------------------------

    document.querySelectorAll("[data-setting='home_title']")
        .forEach(el => {
            if (settings.home_title) {
                el.textContent = settings.home_title;
            }
        });


    // -----------------------------
    // SOUS-TITRE
    // -----------------------------

    document.querySelectorAll("[data-setting='home_subtitle']")
        .forEach(el => {
            if (settings.home_subtitle) {
                el.textContent = settings.home_subtitle;
            }
        });


    // -----------------------------
    // DESCRIPTION
    // -----------------------------

    document.querySelectorAll("[data-setting='home_description']")
        .forEach(el => {
            if (settings.home_description) {
                el.textContent = settings.home_description;
            }
        });


    // -----------------------------
    // BOUTON 1
    // -----------------------------

    document.querySelectorAll("[data-setting='home_button_1']")
        .forEach(el => {
            if (settings.home_button_1) {
                el.textContent = settings.home_button_1;
            }
        });


    // -----------------------------
    // BOUTON 2
    // -----------------------------

    document.querySelectorAll("[data-setting='home_button_2']")
        .forEach(el => {
            if (settings.home_button_2) {
                el.textContent = settings.home_button_2;
            }
        });


    // -----------------------------
    // RADIO
    // -----------------------------

    document.querySelectorAll("[data-setting='radio_name']")
        .forEach(el => {
            if (settings.radio_name) {
                el.textContent = settings.radio_name;
            }
        });


    document.querySelectorAll("[data-setting='radio_text']")
        .forEach(el => {
            if (settings.radio_text) {
                el.textContent = settings.radio_text;
            }
        });


    // -----------------------------
    // FOOTER
    // -----------------------------

    document.querySelectorAll("[data-setting='footer_text']")
        .forEach(el => {
            if (settings.footer_text) {
                el.textContent = settings.footer_text;
            }
        });


    // -----------------------------
    // LOGO
    // -----------------------------

    if (settings.logo_url) {

        document.querySelectorAll("[data-logo]")
            .forEach(img => {
                img.src = settings.logo_url;
                img.style.display = "block";
            });

    }


    // -----------------------------
    // COULEUR PRINCIPALE
    // -----------------------------

    if (settings.primary_color) {

        document.documentElement.style.setProperty(
            "--primary",
            settings.primary_color
        );

    }


    // -----------------------------
    // COULEUR SECONDAIRE
    // -----------------------------

    if (settings.secondary_color) {

        document.documentElement.style.setProperty(
            "--secondary",
            settings.secondary_color
        );

    }


    // -----------------------------
    // TITRE DU NAVIGATEUR
    // -----------------------------

    if (settings.site_name) {

        document.title = settings.site_name;

    }
}


// ==========================================
// SIDEBAR (partagée par toutes les pages)
// ==========================================

function initSidebar() {

    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("menuToggle");
    const pageContent = document.getElementById("pageContent");

    if (sidebar && toggle && pageContent) {

        toggle.onclick = () => {
            sidebar.classList.toggle("collapsed");
            pageContent.classList.toggle("expanded");
        };

    }


    // Marque le lien de la page actuelle comme actif
    const currentPage = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("#sidebarNav a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });


    // Cache le badge générique dès qu'un vrai logo est chargé
    const logoImg = document.querySelector(".logo img[data-logo]");
    const badge = document.querySelector(".logo-badge");

    if (logoImg && badge) {

        const check = () => {
            if (logoImg.style.display !== "none" && logoImg.getAttribute("src")) {
                badge.style.display = "none";
            }
        };

        const observer = new MutationObserver(check);

        observer.observe(logoImg, {
            attributes: true,
            attributeFilter: ["src", "style"]
        });

    }

}


// ==========================================
// RACCOURCI ADMIN (Ctrl + Alt + P)
// ------------------------------------------
// Note : certains navigateurs (Firefox notamment)
// réservent Ctrl+Alt+<lettre> pour leurs propres
// raccourcis et n'transmettent jamais l'événement
// à la page. On garde ce raccourci pour les
// navigateurs qui le laissent passer (Chrome, Edge),
// et on ajoute un filet de sécurité universel juste
// en dessous.
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "p") {

        event.preventDefault();

        window.location.href = "admin.html";

    }

});


// ==========================================
// RACCOURCI ADMIN DE SECOURS
// ------------------------------------------
// Taper "admin" au clavier (sans champ de saisie
// actif) redirige aussi vers la page admin.
// Fonctionne sur tous les navigateurs.
// ==========================================

let adminTypedBuffer = "";

document.addEventListener("keydown", (event) => {

    const activeTag = document.activeElement
        ? document.activeElement.tagName
        : "";

    // On ignore si l'utilisateur est en train d'écrire
    // dans un champ de formulaire.
    if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
        return;
    }

    if (event.key.length !== 1) return;

    adminTypedBuffer = (adminTypedBuffer + event.key.toLowerCase()).slice(-5);

    if (adminTypedBuffer === "admin") {
        window.location.href = "admin.html";
    }

});


// ==========================================
// LANCEMENT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    applySiteSettings();
    initSidebar();

});