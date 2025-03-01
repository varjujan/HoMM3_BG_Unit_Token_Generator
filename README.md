# Generate HoMM 3 Board Game Unit Tokens Script

This script is designed to automate the process of enabling and disabling layers in an Adobe Photoshop document based on data from a CSV file. It is specifically tailored for generating units for Heroes of Might and Magic (HoMM).

## How It Works

1. **CSV Parsing**: The script reads a CSV file containing data about various units. Each row in the CSV represents a unit with specific attributes.
2. **Layer Management**: Based on the data from the CSV, the script enables or disables specific layers and layer sets in the active Photoshop document.
3. **Image Export**: After adjusting the layers, the script saves the document as a PNG file with a name derived from the unit's attributes.

## CSV File Format

The CSV file should have the following columns:

- `Town`: The name of the town.
- `Unit`: The name of the unit.
- `Attack`: Attack value.
- `Defense`: Defense value.
- `Health`: Health value.
- `Initiative`: Initiative value.
- `Type`: Type of the unit.
- `Pack`: Indicates if the unit is a pack (Few otherwise).
- `Axe`, `Sword`, `Arrow`, `Hourglass`, `Vortex`: These columns should contain `TRUE` or `FALSE` values indicating whether the unit has the corresponding ability.

## How to Use

1. **Open Photoshop**: Ensure that the Photoshop application is open and the document you want to modify is active (homm.psd).
2. **Run the Script**: Open the script file (`generate_homm_units.jsx`) in Adobe ExtendScript Toolkit or any other compatible editor.
3. **Select CSV File**: When prompted, select the CSV file containing the unit data.
4. **Select Save Folder**: When prompted, select the folder where the output PNG files should be saved.
5. **Wait for Completion**: The script will process each row in the CSV, adjust the layers accordingly, and save the document as a PNG file.

## Script Details

### Functions

- `hideAllArtLayers()`: Hides all art layers in the active document.
- `parseCSV(csv)`: Parses the CSV data into an array of objects.
- `enableLayersByName(data)`: Enables or disables layers based on the data from the CSV.
- `enableLayerInGroup(group, name, caseInsensitive)`: Enables a specific layer in a group.
- `enableAllLayersInGroup(group)`: Enables all layers in a group.
- `disableAllLayersInGroup(group)`: Disables all layers in a group.
- `combine()`: Main function that orchestrates the process of reading the CSV, adjusting layers, and saving the document.
- `normalizeSaveFileName(name)`: Normalizes the file name to ensure it is valid.
- `saveDocumentAsPNG(path)`: Saves the active document as a PNG file.
