# HoMM 3 The Board Game Unit Tokens Generator

This project is designed for generating small Unit summaries for Heroes of Might and Magic 3 The Board Game by automating the process of enabling and disabling layers in the Adobe Photoshop document homm.psd based on data from a CSV file and exporting the result. Some images must be exported manually if needed, like the Neutral Unit backs.

## Example

![example_1.png](example_1.png?)![example_2.png](example_2.png?)

## Used Material

- Unit raw data: https://docs.google.com/spreadsheets/d/1Wm5LqhT1qEvUsgfJ4wycAGEEmSxRtw7w65bwA9MG5cY/edit?usp=sharing (Thanks to Discord user Re4XN)
- Image Assets: https://github.com/Mirzipan/Homm3_BG_Database

I don't own any of these.

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
- `Tier`: Tier of the unit (bronze, silver, gold, azure).
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
