var userDisplayDialogsPref = app.displayDialogs;
$.writeln("Stored current display dialogs preference.");

app.displayDialogs = DialogModes.ALL;
$.writeln("Set display dialogs to ALL.");

var savePath;

app.displayDialogs = DialogModes.NO;
$.writeln("Set display dialogs to NO.");

function hideAllArtLayers() {
  var layerSets = app.activeDocument.layerSets;
  //$.writeln("Hiding all art layers.");

  function hideLayers(layers) {
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].artLayers && layers[i].artLayers.length > 0) {
        for (var j = 0; j < layers[i].artLayers.length; j++) {
          layers[i].artLayers[j].visible = false;
        }
      }
      if (layers[i].layerSets && layers[i].layerSets.length > 0) {
        hideLayers(layers[i].layerSets);
      }
    }
  }

  for (var i = 0; i < layerSets.length; i++) {
    layerSets[i].visible = true; // Ensure top-level layer sets are always visible
    if (layerSets[i].artLayers && layerSets[i].artLayers.length > 0) {
      for (var j = 0; j < layerSets[i].artLayers.length; j++) {
        layerSets[i].artLayers[j].visible = false;
      }
    }
    hideLayers(layerSets[i].layers);
  }
}

function parseCSV(csv) {
  var lines = csv.split("\n");
  $.writeln("Parsing CSV data.");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

function enableLayersByName(data) {
  var layerSets = app.activeDocument.layerSets;
  //$.writeln("Enabling layers by name.");

  for (var i = 0; i < layerSets.length; i++) {
    var layerSet = layerSets[i];

    switch (layerSet.name) {
      case 'Town':
        //$.writeln("Enabling Town layer: " + data.Town);
        enableLayerInGroup(layerSet, data.Town, false);
        break;
      case 'Attack':
        //$.writeln("Enabling Attack layer: " + data.Attack);
        enableLayerInGroup(layerSet, 'Attack', false);
        enableLayerInGroup(layerSet.layerSets.getByName('AttackValues'), data.Attack, false);
        var vortexLayer = layerSet.artLayers.getByName('Vortex');
        if (vortexLayer) {
          vortexLayer.visible = data.Vortex === 'TRUE';
          //$.writeln((data.Vortex === 'TRUE' ? "Enabled" : "Disabled") + " Vortex layer inside Attack.");
          
          var swordsLayer = layerSet.artLayers.getByName('Swords');
          if (swordsLayer) {
            swordsLayer.visible = !vortexLayer.visible;
            //$.writeln((!vortexLayer.visible ? "Enabled" : "Disabled") + " Swords layer.");
          }
        }
        break;
      case 'Defense':
        //$.writeln("Enabling Defense layer: " + data.Defense);
        enableLayerInGroup(layerSet, 'Defense', false);
        enableLayerInGroup(layerSet.layerSets.getByName('DefenseValues'), data.Defense, false);
        break;
      case 'Health':
        //$.writeln("Enabling Health layer: " + data.Health);
        enableLayerInGroup(layerSet, 'Health', false);
        enableLayerInGroup(layerSet.layerSets.getByName('HealthValues'), data.Health, false);
        break;
      case 'Initiative':
        //$.writeln("Enabling Initiative layer: " + data.Initiative);
        enableLayerInGroup(layerSet, 'Initiative', false);
        enableLayerInGroup(layerSet.layerSets.getByName('InitiativeValues'), data.Initiative, false);
        break;
      case 'Unit':
        var unitName = data.Unit.replace(/\s+/g, '_');
        //$.writeln("Enabling Unit layer: " + unitName);
        enableLayerInGroup(layerSet, unitName, true);
        break;
      case 'Type':
        //$.writeln("Enabling Type layer: " + data.Type);
        enableLayerInGroup(layerSet, 'Type', false);
        var typeTierLayerName = data.Type + "_" + data.Tier;
        enableLayerInGroup(layerSet.layerSets.getByName('TypeValues'), typeTierLayerName, false);
        break;
      case 'Pack':
        if (data.Pack === 'TRUE') {
          //$.writeln("Enabling Pack layer.");
          layerSet.visible = true;
          enableAllLayersInGroup(layerSet);
        } else {
          //$.writeln("Disabling Pack layer.");
          layerSet.visible = false;
        }
        break;
      case 'Axe':
      case 'Sword':
      case 'Arrow':
      case 'Hourglass':
        if (data[layerSet.name] === 'TRUE') {
          //$.writeln("Enabling " + layerSet.name + " layer.");
          enableAllLayersInGroup(layerSet);
        } else {
          //$.writeln("Disabling " + layerSet.name + " layer.");
          disableAllLayersInGroup(layerSet);
        }
        break;
    }
  }
}

function enableLayerInGroup(group, name, caseInsensitive) {
  for (var i = 0; i < group.artLayers.length; i++) {
    var layer = group.artLayers[i];
    if (caseInsensitive ? layer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 : layer.name === name) {
      layer.visible = true;
      //$.writeln("Enabled layer: " + layer.name);
    }
  }
}

function enableAllLayersInGroup(group) {
  group.visible = true;
  for (var i = 0; i < group.artLayers.length; i++) {
    group.artLayers[i].visible = true;
  }
  for (var j = 0; j < group.layerSets.length; j++) {
    enableAllLayersInGroup(group.layerSets[j]);
  }
}

function disableAllLayersInGroup(group) {
  group.visible = false;
  for (var i = 0; i < group.artLayers.length; i++) {
    group.artLayers[i].visible = false;
  }
  for (var j = 0; j < group.layerSets.length; j++) {
    disableAllLayersInGroup(group.layerSets[j]);
  }
}

function combine() {
  var csvFile = File.openDialog("Select a CSV file");
  if (!csvFile) {
    $.writeln("No file selected. Script aborted.");
    return alert("No file selected. Script aborted.");
  }

  var saveFolder = Folder.selectDialog("Select a folder to save the output files");
  if (!saveFolder) {
    $.writeln("No folder selected. Script aborted.");
    return alert("No folder selected. Script aborted.");
  }
  savePath = saveFolder.fsName;
  $.writeln("Selected save path: " + savePath);

  csvFile.open("r");
  var csvData = csvFile.read();
  csvFile.close();
  $.writeln("Read CSV data.");

  var data = parseCSV(csvData);

  for (var i = 0; i < data.length; i++) {
    hideAllArtLayers();
    enableLayersByName(data[i]);

    var saveFileName = data[i].Town + "_" + data[i].Unit;
    saveFileName += data[i].Pack === 'TRUE' ? "_pack" : "_few";
    saveDocumentAsPNG(savePath + '/' + normalizeSaveFileName(saveFileName).substr(0, 254));
  }
}

function normalizeSaveFileName(name) {
  return name.replace(/[\/\\?%*:|"<>]/g, '-');
}

function saveDocumentAsPNG(path) {
  app.activeDocument.saveAs(new File(path), new PNGSaveOptions());
  $.writeln("Document saved as PNG: " + path);
}

combine();

app.displayDialogs = userDisplayDialogsPref;
$.writeln("Restored display dialogs preference.");