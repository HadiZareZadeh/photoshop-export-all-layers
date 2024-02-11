var doc = app.activeDocument;
var layers = doc.layers;

var currentLayer, i, j, subLayers;
var filename = doc.name;
var baseFilename = filename.split(".")[0];
var exportFolder = doc.path + "/exports";

if (!Folder(exportFolder).exists) {
    Folder(exportFolder).create();
}

function toggleLayer(newState) {
    for (i = 0; i < layers.length; i++) {
        currentLayer = layers[i];
        currentLayer.visible = newState;
        subLayers = currentLayer.layers;
        if (subLayers)
            for (j = 0; j < subLayers.length; j++) {
                subLayers[j].visible = newState;
            }
    }
}

toggleLayer(false)

for (i = 0; i < layers.length; i++) {
    currentLayer = layers[i];
    currentLayer.visible = true;
    subLayers = currentLayer.layers;
    if (subLayers)
        for (j = 0; j < subLayers.length; j++) {
            subLayers[j].visible = true;
            if (!Folder(exportFolder + "/" + currentLayer.name + "/").exists)
                Folder(exportFolder + "/" + currentLayer.name + "/").create();
            doc.saveAs(new File(exportFolder + "/" + currentLayer.name + "/" + subLayers[j].name + ".png"), new PNGSaveOptions(), true, Extension.LOWERCASE);
            subLayers[j].visible = false;
        }
    currentLayer.visible = false;
}

toggleLayer(true)

alert("Exported all visible layers!");
