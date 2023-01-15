"use strict";

const gUrlPrefix = "../../assets/sources/archolos/"; // relative path based on the custom_config.md file
const gUrlBase = `${gUrlPrefix}system/`;
const gFilePathBase = "system/";
const gDX11Base = "GD3D11/"
const gZenResourcesBase = `${gDX11Base}ZENResources/`;

// noinspection SpellCheckingInspection
const gFileNames = [
    "gothic.ini",
    "systempack.ini",
    "UserSettings.ini",
    "ARCHOLOS_MAINLAND.INI",
    "ARCHOLOS_SEWERS.INI",
    "ARCHOLOS_SILVERMINE.INI",
    "ARCHOLOS_VOLFZACKE.INI",
    "ARCHOLOS_ENDGAME.INI",
];

// noinspection SpellCheckingInspection
const gDX11ZenVariants = [
    "DieChronikenVonMyrtana",
    "DieChronikenVonMyrtanaPolnischeSprachausgabe",
    "KronikiMyrtany",
    "LeCronacheDiMyrtana",
    "LeCronacheDiMyrtanaDoppiaggioPolacco",
    "TheChroniclesOfMyrtana",
    "TheChroniclesOfMyrtanaPolishVo",
    "TheChroniclesOfMyrtanaRU",
    "TheChroniclesOfMyrtanaRUPolishVo",
];

const gSettingsManager = {
    width: 1280,
    height: 720,
    mouseSensitivity: 0.5.toFixed(2),
    mouseRotationScale: 2.0.toFixed(2),
    mouseSmoothing: 3,
    windowPosX: 0,
    windowPosY: 0,
    invMaxCols: 5,
    showWeaponTrails: false,
    hideFocus: false,
    hideTakeAnimation: false,
    availableResolutions: [
        { width: 800, height: 600 },
        { width: 1280, height: 720 },
        { width: 1920, height: 1080 },
        { width: 2560, height: 1440 },
        { width: 3840, height: 2160 },
    ],
    setResolution(event) {
        const [width, height] = event.target.value.toLowerCase().split("x").map(Number);
        if (Number.isNaN(width) || Number.isNaN(height))
            return;
        this.width = width;
        this.height = height;
    },
    setMouseSensitivity(event) {
        const value = parseFloat(event.target.value)
        if (Number.isNaN(value))
            return
        this.mouseSensitivity = value.toFixed(2);
    },
    setMouseRotationScale(event) {
        const value = parseFloat(event.target.value)
        if (Number.isNaN(value))
            return
        this.mouseRotationScale = value.toFixed(2);
    },
    setMouseSmoothing(event) {
        const value = parseInt(event.target.value, 10)
        if (Number.isNaN(value))
            return
        this.mouseSmoothing = value;
    },
    setWindowPos(event) {
        const [screenWidth, screenHeight] = event.target.value.toLowerCase().split("x").map(Number);
        if (Number.isNaN(screenWidth) || Number.isNaN(screenHeight)) {
            this.windowPosX = 0;
            this.windowPosY = 0;
            return;
        }
        this.windowPosX = Math.round((screenWidth - this.width) / 2);
        this.windowPosY = Math.round((screenHeight - this.height) / 2);
    },
    setInvMaxCols(event) {
        const value = parseInt(event.target.value, 10)
        if (Number.isNaN(value))
            return
        this.invMaxCols = value;
    },
    setShowWeaponTrails(event) {
        this.showWeaponTrails = event.target.checked;
    },
    setHideFocus(event) {
        this.hideFocus = event.target.checked;
    },
    setHideTakeAnimation(event) {
        this.hideTakeAnimation = event.target.checked;
    },
    processTextForFile(filePath, text) {
        // TODO Change it to read the files line by line and only call replace on the lines, performance
        if (filePath.includes("gothic.ini")) {
            text = text.replace(/zVidResFullscreenX=.*/i, `zVidResFullscreenX=${this.width}`);
            text = text.replace(/zVidResFullscreenY=.*/i, `zVidResFullscreenY=${this.height}`);
            text = text.replace(/mouseSensitivity=.*/i, `mouseSensitivity=${this.mouseSensitivity}`);
            text = text.replace(/zMouseRotationScale=.*/i, `zMouseRotationScale=${this.mouseRotationScale}`);
            text = text.replace(/zSmoothMouse=.*/i, `zSmoothMouse=${this.mouseSmoothing}`);
            text = text.replace(/invMaxColumns=.*/i, `invMaxColumns=${this.invMaxCols}`);
            text = text.replace(/zShowWeaponTrails=.*/i, `zShowWeaponTrails=${this.showWeaponTrails ? 1 : 0}`);
        } else if (filePath.includes("UserSettings.ini")) {
            text = text.replace(/Width=.*/i, `Width=${this.width}`);
            text = text.replace(/Height=.*/i, `Height=${this.height}`);
        } else if (filePath.includes("systempack.ini")) {
            text = text.replace(/WindowPosX=.*/i, `WindowPosX=${this.windowPosY}`); // swapped Y
            text = text.replace(/WindowPosY=.*/i, `WindowPosY=${this.windowPosX}`); // swapped X
            text = text.replace(/HideFocus=.*/i, `HideFocus=${this.hideFocus ? 1 : 0}`);
            text = text.replace(/^No_Take_Anim=.*/im, `No_Take_Anim=${this.hideTakeAnimation ? 1 : 0}`);
        }
        return text;
    },
    getTitleString() {
        let title = "";
        title += `R${this.width}x${this.height}`;
        title += `_MS${this.mouseSensitivity}`;
        title += `_MR${this.mouseRotationScale}`;
        title += `_MA${this.mouseSmoothing}`;
        title += `_C${((this.windowPosX > 0) || (this.windowPosY > 0)) ? 1 : 0}`;
        title += `_I${this.invMaxCols}`;
        title += `_WT${this.showWeaponTrails ? 1 : 0}`;
        title += `_HF${this.hideFocus ? 1 : 0}`;
        title += `_NA${this.hideTakeAnimation ? 1 : 0}`;
        return title;
    },
};

const gDownloadManager = {
    downloadedTexts: {},
    urlToFile: {},
    downloadZip() {
        const zip = new JSZip();
        const promises = [];
        for (const url in this.urlToFile) {
            if (!this.downloadedTexts[url]) {
                promises.push(
                    fetch(url)
                        .then(response => response.text())
                        .then(text => {
                            this.downloadedTexts[url] = text;
                            const processedText = gSettingsManager.processTextForFile(this.urlToFile[url][0], text);
                            for (const filePath of this.urlToFile[url]) {
                                zip.file(filePath, processedText);
                            }
                        })
                );
            } else {
                const processedText = gSettingsManager.processTextForFile(this.urlToFile[url][0], this.downloadedTexts[url]);
                for (const filePath of this.urlToFile[url]) {
                    zip.file(filePath, processedText);
                }
            }
        }
        Promise.all(promises)
            .then(() => zip.generateAsync({type:"blob"}))
            .then(content => {
                // FileSaver.js saveAs
                window.saveAs(content, `TheChroniclesOfMyrtana_${gSettingsManager.getTitleString()}.zip`);
            });
    },
};

window.addEventListener("load", () => {
    // region Create URL to File Mapping
    for (const fileName of gFileNames) {
        if (fileName.startsWith("ARCHOLOS")) {
            const url = `${gUrlBase}${gZenResourcesBase}${fileName}`;
            gDownloadManager.urlToFile[url] = [`${gFilePathBase}${gZenResourcesBase}${fileName}`];
            for (const variant of gDX11ZenVariants) {
                gDownloadManager.urlToFile[url].push(`${gFilePathBase}${gZenResourcesBase}${variant}/${fileName}`)
            }
        } else if (fileName.startsWith("UserSettings")) {
            const url = `${gUrlBase}${gDX11Base}${fileName}`;
            gDownloadManager.urlToFile[url] = [`${gFilePathBase}${gDX11Base}${fileName}`];
        } else {
            const url = `${gUrlBase}${fileName}`;
            gDownloadManager.urlToFile[url] = [`${gFilePathBase}${fileName}`];
        }
    }
    // endregion

    // region Create Resolution Select Element
    const select = document.createElement("select");
    select.id = "select-resolution";

    for (const resolution of gSettingsManager.availableResolutions) {
        const option = document.createElement("option");
        option.value = `${resolution.width}x${resolution.height}`;
        option.textContent = option.value;
        select.appendChild(option);
        if (resolution.width === gSettingsManager.width && resolution.height === gSettingsManager.height) {
            option.selected = true;
        }
    }

    select.addEventListener("change", (event) => {
        gSettingsManager.setResolution(event);
        document.querySelector("#resolution-input").placeholder = select.value;
        document.querySelector("#center-input").placeholder = select.value;
    })
    // endregion

    // region Create Resolution Text Input Element
    const resolutionInput = document.createElement("input");
    resolutionInput.id = "resolution-input";
    resolutionInput.type = "text";
    resolutionInput.placeholder = `${gSettingsManager.width}x${gSettingsManager.height}`;
    resolutionInput.addEventListener("change", (event) => {
        gSettingsManager.setResolution(event);
    });
    // endregion

    // region Create Resolution Text Input Element (Window Centering)
    const centerResolutionInput = document.createElement("input");
    centerResolutionInput.id = "center-input";
    centerResolutionInput.type = "text";
    centerResolutionInput.placeholder = `${gSettingsManager.width}x${gSettingsManager.height}`;
    centerResolutionInput.addEventListener("change", (event) => {
        gSettingsManager.setWindowPos(event);
    });
    // endregion

    // region Create Mouse Sensitivity Number Input Element
    const mouseSensitivityInput = document.createElement("input");
    mouseSensitivityInput.type = "number";
    mouseSensitivityInput.step = "0.5";
    mouseSensitivityInput.min = "0";
    mouseSensitivityInput.value = `${gSettingsManager.mouseSensitivity}`;
    mouseSensitivityInput.addEventListener("change", (event) => {
        gSettingsManager.setMouseSensitivity(event);
    });
    // endregion

    // region Create Mouse Rotation Number Input Element
    const mouseRotationScaleInput = document.createElement("input");
    mouseRotationScaleInput.type = "number";
    mouseRotationScaleInput.step = "0.5";
    mouseRotationScaleInput.min = "0";
    mouseRotationScaleInput.value = `${gSettingsManager.mouseRotationScale}`;
    mouseRotationScaleInput.addEventListener("change", (event) => {
        gSettingsManager.setMouseRotationScale(event);
    });
    // endregion

    // region Create Mouse Smoothing Number Input Element
    const mouseSmoothingInput = document.createElement("input");
    mouseSmoothingInput.type = "number";
    mouseSmoothingInput.min = "0";
    mouseSmoothingInput.value = `${gSettingsManager.mouseSmoothing}`;
    mouseSmoothingInput.addEventListener("change", (event) => {
        gSettingsManager.setMouseSmoothing(event);
    });
    // endregion

    // region Create Misc Max Inventory Column Number Input Element
    const invMaxColsInput = document.createElement("input");
    invMaxColsInput.type = "number";
    invMaxColsInput.min = "0";
    invMaxColsInput.value = `${gSettingsManager.invMaxCols}`;
    invMaxColsInput.addEventListener("change", (event) => {
        gSettingsManager.setInvMaxCols(event);
    });
    // endregion

    // region Create Show Weapon Trails Checkbox Input Element
    const showWeaponTrailsInput = document.createElement("input");
    showWeaponTrailsInput.type = "checkbox";
    showWeaponTrailsInput.checked = gSettingsManager.showWeaponTrails;
    showWeaponTrailsInput.addEventListener("change", (event) => {
        gSettingsManager.setShowWeaponTrails(event);
    });
    // endregion

    // region Create Hide Focus Checkbox Input Element
    const hideFocusInput = document.createElement("input");
    hideFocusInput.type = "checkbox";
    hideFocusInput.checked = gSettingsManager.hideFocus;
    hideFocusInput.addEventListener("change", (event) => {
        gSettingsManager.setHideFocus(event);
    });
    // endregion

    // region Create Hide Take Animation Input Element
    const showTakeAnimationInput = document.createElement("input");
    showTakeAnimationInput.type = "checkbox";
    showTakeAnimationInput.checked = gSettingsManager.hideTakeAnimation;
    showTakeAnimationInput.addEventListener("change", (event) => {
        gSettingsManager.setHideTakeAnimation(event);
    });
    // endregion

    // region Attach Elements to DOM
    const content = document.querySelector("article.md-content__inner");

    content.querySelector("#resolution-placeholder-input").replaceWith(resolutionInput);
    content.querySelector("#resolution-placeholder-select").replaceWith(select);
    content.querySelector("#center-placeholder-input").replaceWith(centerResolutionInput);
    content.querySelector("#mouse-placeholder-sensitivity").replaceWith(mouseSensitivityInput);
    content.querySelector("#mouse-placeholder-rotation").replaceWith(mouseRotationScaleInput);
    content.querySelector("#mouse-placeholder-smoothing").replaceWith(mouseSmoothingInput);

    content.querySelector("#misc-placeholder-max-col").replaceWith(invMaxColsInput);
    content.querySelector("#misc-placeholder-trails").replaceWith(showWeaponTrailsInput);
    content.querySelector("#misc-placeholder-focus").replaceWith(hideFocusInput);
    content.querySelector("#misc-placeholder-anim").replaceWith(showTakeAnimationInput);

    const button = content.querySelector("#download-zip-button");
    button.addEventListener("click", () => {
        gDownloadManager.downloadZip();
    })
    // endregion
});