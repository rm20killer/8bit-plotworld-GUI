const biomesJson = require("./biomes.json");
const fs = require("fs");
module.exports = {
  execute() {
    biomeGen();
  },
};

function biomeGen() {
  let menu = [];
  let biomes = biomesJson.Biomes;
  next_slot = 9;
  biomes.forEach((biome) => {
    let material = biome.item;
    let name = biome.name;
    let manuadd = {
      material: material,
      display_name: name,
      display_slots: next_slot,
    };
    menu.push(manuadd);
    next_slot++;
  });
  save(menu);
}

async function save(menu) {
  let text = "";
  menu.forEach((item) => {
    let name = item.display_name.replace(/_/g, " ");
    name = name.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    let itemName = item.material.replace("minecraft:", "").toUpperCase();
    const content = `  ${item.display_name}_Switch:
    material: ${itemName}
    priority: 1
    amount: 1
    slot: ${item.display_slots}
    display_name: '&8&l■ &b${name} &8&l■'
    lore:  
    - '&c➥ &7Click to set biome to &e&l${name}&7.'
    left_click_commands:
    - '[player] plot setbiome ${item.display_name}'
    - '[close]'
    right_click_commands:
    - '[player] plot setbiome ${item.display_name}'
    - '[close]'`;
    

    const Enchantedcontent = `  ${item.display_name}_enchanted:
    material: ${itemName}
    priority: 0
    amount: 1
    slot: ${item.display_slots}
    display_name: '&8&l■ &b${name} &8&l■'
    lore:
    - '&c➥ &7Current biome is &e&l${name}&7.'
    hide_enchantments: true
    enchantments:
    - 'SILK_TOUCH;1'
    view_requirement:
      requirements:
          is_${item.display_name}: 
            type: string equals
            input: "%plotsquared_currentplot_biome%"
            output: "minecraft:${item.display_name}"`;

    text += content + "\n"+ Enchantedcontent + "\n";
  });

  fs.writeFile("biomeGen.yml", text, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
