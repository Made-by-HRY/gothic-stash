"use strict";

let gGMC_DEBUG = window.location.hostname === "127.0.0.1";

window.addEventListener("DOMContentLoaded", _ => {
    gmcExpandNavigation();
});

function gmcExpandNavigation() {
    // Function adapted from the Gothic Modding Community page
    // https://github.com/Gothic-Modding-Community/gmc/blob/77b85bc892ea071d325a86bf9cae42ff0392b287/docs/assets/javascripts/extra.js#L139

    if (window.matchMedia("(max-width: 76.1875em)").matches) {
        // gmcDebug(`⏩ mobile doesn't expand`);
        return;
    }

    const activeNav = document.querySelector(".md-sidebar__inner");

    if (!activeNav) {
        return;
    }

    const children = activeNav.parentElement.querySelector("nav > ul").children;

    for (let i = 0; i < children.length; i++) {
        const toggle = children[i].querySelector('input[type="checkbox"]');

        if (!toggle) {
            // gmcDebug(`⏩ toggle not present`);
            continue;
        }

        if (toggle.checked) {
            // gmcDebug(`⏩ '${toggle.id}' already checked`);
            continue;
        }

        toggle.checked = true;
        // gmcDebug(`✅ Expanded '${toggle.id}'`);
    }
}

function gmcDebug(message) {
    if (gGMC_DEBUG)
        console.debug(message);
}