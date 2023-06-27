const blocksjson = require("./block.json");
const fs = require("fs");
module.exports = {
  execute() {
    blockgen();
  },
};


const types = [
    "floor",
    "main",
    "middle",
    "outline",
]
function blockgen() {


    types.forEach(type => {
        save(type);
    });
}


async function save(type) {
    const Top = `#plotsquared GUI

    menu_title: '&c&l⚠⚠ &8&lChange ${type} to different block &c&l⚠⚠'
    open_command: plot${type}
    
    size: 45
    items:
      back:
        material: OAK_DOOR
        data: 0
        slot: 36
        display_name: '&6&l< &e&lBack'
        lore:
        - '&c➥ &7Click to return to settings menu.'
        left_click_commands:
        - '[openguimenu] plotsettings'
        right_click_commands:
        - '[openguimenu] plotsettings'
      glass:
        material: GRAY_STAINED_GLASS_PANE
        data: 0
        slots:
        - 0
        - 1
        - 2
        - 3
        - 4
        - 5
        - 6
        - 7
        - 8
        - 37
        - 38
        - 39
        - 40
        - 41
        - 42
        - 43
        - 44
        display_name: '&r'
      plothead:
        material: head-%plotsquared_currentplot_owner%
        data: 0
        slot: 4
        display_name: '&6%plotsquared_currentplot_owner% plot'
        lore:
        - '&cCreated &7%plotsquared_currentplot_creationdate%.'
        - '&cID &7%plotsquared_currentplot_xy%'
        - '&cBiome: &7%plotsquared_currentplot_biome%'`;

    let blocks = blocksjson.block;
    let text = "";
    text += Top + "\n";
    let next_slot = 9;
    blocks.forEach((block) => {
        let itemName = block.replace("minecraft:", "").toUpperCase();
        let name = block.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        let display_name = name.replace(/_/g, " ");
        let blockType = itemName;
        if(itemName == "AIR") 
        {
            itemName = "BARRIER";
            blockType = "barrier";
        }
        if(itemName == "WATER")
        {
            itemName="WATER_BUCKET";
        }
        if(itemName == "LAVA")
        {
            itemName="LAVA_BUCKET";
        }
        const content = `      ${itemName}_block:
        material: ${itemName}
        amount: 1
        slot: ${next_slot}
        display_name: '&8&l■ &b${display_name} &8&l■'
        lore:  
        - '&c➥ &7Click to change &l${type} to &e&l${display_name}&7.'
        - '&c➥ &c&lWill clear all blocks at ${type} level.'
        left_click_commands:
        - '[player] plot set ${type} ${name}'
        - '[close]'
        right_click_commands:
        - '[player] plot set ${type} ${name}'
        - '[close]'`;
        text += content + "\n";
        next_slot++;
    })

    fs.writeFile(`./gen/src/block/plot${type}.yml`, text, function (err) {
        if (err) return console.log(err);
        console.log(`Saved ${type}.yml`);
    });
}