
let stats = {
    currency: 0,
    ore: 0,
    copperOre: 0,
    titOre: 0,
    ingot: 0,
    sword: 0,
    ironRod: 0,
    ironGear: 0,
    orePerSwing: 1,
    hasPurchasedMining: false,
    autosmelting: false,
    hasPurchasedSmelting: false,
    mineCount: 0,
    isCopperUnlocked: false,
    isTitaniumUnlocked: false,
};

let materialsNeeded = {
    ingot: 10,
    sword: 3,
    ironGear: 3,
    craftIronGear: 2, //ingots required
    ironRod: 3,
    craftIronRod: 7, //ore required
}

let materialsValue = {
    oreValue: .25,
    copperValue: 1,
    titValue: 15,
    ingotValue: 5,
    swordValue: 20,
}

let shopPrices = {
    autominingPrice: 5000,
    autoSmeltingPrice: 10000,
}

let gameUnlocks = {
    copperOreUnlock: 15000,
    titaniumOreUnlock: 35000,
}


$(window).on('load', function(){
    let myStats = JSON.parse(localStorage.getItem("myStats"));
    if(myStats){
        stats.currency = myStats.currency;
        stats.ore = myStats.ore;
        stats.copperOre = myStats.copperOre;
        stats.mineCount = myStats.mineCount;
        stats.ingot = myStats.ingot;
        stats.sword = myStats.sword;
        stats.ironRod = myStats.ironRod;
        stats.ironGear = myStats.ironGear;
        stats.orePerSwing = myStats.orePerSwing;
        stats.hasPurchasedMining = myStats.hasPurchasedMining;
    }
    let myMaterialsNeeded = JSON.parse(localStorage.getItem("myMaterialsNeeded"));
    if(myMaterialsNeeded){
        materialsNeeded.ironGear = myMaterialsNeeded.ironGear;
        materialsNeeded.ironRod = myMaterialsNeeded.ironRod;
    }
    updateStatsView();
})


function autoMine(){
    $('#mine-btn').val('Mining..');
    $('#mine-btn').prop('disabled', true);
    stats.ore = stats.ore + stats.orePerSwing;
    stats.mineCount = stats.mineCount + 1;
    setTimeout('updateStatsView()', 10000);
}

function isUnlocked(){
    if(stats.isCopperUnlocked === true){
        $('#workshop-table').append('<tr><td><input type="button" id="mine-copper-ore" value="Mine"></td><td>Copper Ore:</td><td id="copper-ore-text-value"></td></tr>');
        $('#shop-table').append('<td><input type="button" id="sell-copper-ore-btn" value="Copper Ore"></td><td id="copper-ore-value-text"></td>');
        $('#copper-ore-text-value').text(stats.copperOre);
        $('#copper-ore-value-text').text("$ " +materialsValue.copperValue);

        $('#mine-copper-ore').on("click", function(){
            clearErrorText();
            $('#mine-copper-ore').val('Mining..');
            $('#mine-copper-ore').prop('disabled', true);
            setTimeout('copperCooldown()', 500);
        })

        $('#sell-copper-ore-btn').on("click", function(){
            stats.currency = stats.currency + (stats.copperOre * materialsValue.copperValue);
            stats.copperOre = 0;
            $('#copper-ore-text-value').text(stats.copperOre);
        })
    }
    if(stats.isTitaniumUnlocked === true){
        $('#workshop-table').append('<tr><td><input type="button" id="mine-tit-ore" value="Mine"></td><td>Titanium Ore:</td><td id="tit-ore-text-value"></td></tr>');
        $('#shop-table').append('<td><input type="button" id="sell-tit-ore-btn" value="Titanium Ore"></td><td id="tit-ore-value-text"></td>');
        $('#tit-ore-text-value').text(stats.titOre);
        $('#tit-ore-value-text').text("$ " +materialsValue.titValue);

        $('#mine-tit-ore').on("click", function(){
            clearErrorText();
            $('#mine-tit-ore').val('Mining..');
            $('#mine-tit-ore').prop('disabled', true);
            setTimeout('titCooldown()', 10000);
        })
    }
}

function updateStatsView() {
    $('#currency-text-value').text(stats.currency);
    $('#ore-text-value').text(stats.ore);
    $('#copper-ore-text-value').text(stats.copperOre);
    $('#tit-ore-text-value').text(stats.titOre);
    $('#ingot-text-value').text(stats.ingot);
    $('#sword-text-value').text(stats.sword);
    $('#iron-ore-value-text').text("$ "+materialsValue.oreValue);
    $('#iron-ingot-value-text').text("$ "+materialsValue.ingotValue);
    $('#iron-sword-value-text').text("$ "+materialsValue.swordValue);
    $('#upgrade-rod-amount-text').text(materialsNeeded.ironRod);
    $('#rod-text-value').text(stats.ironRod);
    $('#upgrade-gear-amount-text').text(materialsNeeded.ironGear);
    $('#gear-text-value').text(stats.ironGear);
    if(stats.hasPurchasedMining === true){
        $('#buy-automining-btn').val('Purchased')
        $('#buy-automining-btn').prop('disabled', true);
        setTimeout('autoMine()', 10000);
    }
    if($('#copper-ore-text-value').length === 0){
        isUnlocked();
    }
    localStorage.setItem("myStats", JSON.stringify(stats)); //store stats
    localStorage.setItem("myMaterialsNeeded", JSON.stringify(materialsNeeded)); //store materials
}

function clearErrorText() {
    $('#error-text').text("");
    $('#shop-am-error-text').text("");
}

 //Cooldown functions
function miningCooldown(){
    $('#mine-btn').prop('disabled', false);
    $('#mine-btn').val('Mine');
    stats.ore = stats.ore + stats.orePerSwing;
    stats.mineCount = stats.mineCount + 1;
    console.log(stats.mineCount);
    updateStatsView();
}

function copperCooldown(){
    $('#mine-copper-ore').prop('disabled', false);
    $('#mine-copper-ore').val('Mine');
    stats.copperOre = stats.copperOre + stats.orePerSwing;
    stats.mineCount = stats.mineCount + 1;
    updateStatsView();
}

function titCooldown(){
    $('#mine-tit-ore').prop('disabled', false);
    $('#mine-tit-ore').val('Mine');
    stats.titOre = stats.titOre + stats.orePerSwing;
    stats.mineCount = stats.mineCount + 1;
    updateStatsView();
}

function ingotCooldown(){
    $('#forge-ingot-btn').prop('disabled', false);
    $('#forge-ingot-btn').val('Forge Ingot');
    stats.ingot = stats.ingot + 1;
    updateStatsView();
}

function swordCooldown(){
    $('#craft-sword-btn').prop('disabled', false);
    $('#craft-sword-btn').val('Craft a Sword');
    stats.sword = stats.sword + 1;
    updateStatsView();
}

function rodCooldown(){
    $('#smelt-rod-btn').prop('disabled', false);
    $('#smelt-rod-btn').val('Smelt Iron Rod');
    stats.ironRod = stats.ironRod + 1;
    updateStatsView();
}

function gearCooldown(){
    $('#craft-gear-btn').prop('disabled', false);
    $('#craft-gear-btn').val('Craft Iron Gear');
    stats.ironGear = stats.ironGear + 1;
    updateStatsView();
}

// easter eggs
if(stats.currency == 69){
    $('h1').append("( . )( . )");
}

if(stats.currency == 420){
    $('h1').append("&#129462;");
}


// onclick handlers

$('#mine-btn').on("click", function(){
    clearErrorText();
    $('#mine-btn').val('Mining..');
    $('#mine-btn').prop('disabled', true);
    setTimeout('miningCooldown()', 1200);
})


$('#forge-ingot-btn').on("click", function(){
    clearErrorText();
    if(stats.ore >= materialsNeeded.ingot){
        $('#forge-ingot-btn').val('Forging..');
        $('#forge-ingot-btn').prop('disabled', true);
        stats.ore = stats.ore - materialsNeeded.ingot;
        updateStatsView();
        setTimeout('ingotCooldown()', 10000);
    } else {
        $('#error-text').text("You need " + (materialsNeeded.ingot - stats.ore) + " more ore to forge an ingot.");
    }
})

$('#craft-sword-btn').on("click", function(){
    clearErrorText();
    if(stats.ingot >= materialsNeeded.sword){
        stats.ingot = stats.ingot - materialsNeeded.sword;
        $('#craft-sword-btn').val('Crafting..');
        $('#craft-sword-btn').prop('disabled', true);
        updateStatsView();
        setTimeout('swordCooldown()', 30000);
    } else {
        $('#error-text').text("You need " + (materialsNeeded.sword - stats.ingot) + " more ingots to craft a sword.");
    }
})

$('#smelt-rod-btn').on("click", function(){
    clearErrorText();
    if(stats.ore >= materialsNeeded.craftIronRod){
        stats.ore = stats.ore - materialsNeeded.craftIronRod;
        $('#smelt-rod-btn').val('Smelting..');
        $('#smelt-rod-btn').prop('disabled', true);
        updateStatsView();
        setTimeout('rodCooldown()', 15000);
    } else {
        $('#error-text').text("Insufficient materials");
    }
})

$('#craft-gear-btn').on("click", function(){
    clearErrorText();
    if(stats.ingot >= materialsNeeded.craftIronGear){
        stats.ingot = stats.ingot - materialsNeeded.craftIronGear;
        $('#craft-gear-btn').val('Crafting..');
        $('#craft-gear-btn').prop('disabled', true);
        updateStatsView();
        setTimeout('gearCooldown()', 7000);
    } else {
        $('#error-text').text("Insufficient materials");
    }
})



//Sell buttons
$('#sell-ore-btn').on("click", function(){
    stats.currency = stats.currency + (stats.ore * materialsValue.oreValue);
    stats.ore = 0;
    updateStatsView();
})

$('#sell-ingot-btn').on("click", function(){
    stats.currency = stats.currency + (stats.ingot * materialsValue.ingotValue);
    stats.ingot = 0;
    updateStatsView();
})

$('#sell-sword-btn').on("click", function(){
    stats.currency = stats.currency + (stats.sword * materialsValue.swordValue);
    stats.sword = 0;
    updateStatsView();
})

// Shop buttons
$('#buy-automining-btn').on("click", function(){
    if(stats.currency >= shopPrices.autominingPrice){
        stats.currency = stats.currency - shopPrices.autominingPrice;
        stats.hasPurchasedMining = true;
        updateStatsView();
    } else {
        $('#shop-am-error-text').text(" Insufficient funds.")
    }
    
})

//bugged with automining it incriments rapidly
$('#upgrade-ore-per-swing-btn').on("click", function(){
    if(stats.ironGear >= materialsNeeded.ironGear && stats.ironRod >= materialsNeeded.ironRod){
        stats.orePerSwing = stats.orePerSwing + 1;
        stats.ironGear = stats.ironGear - materialsNeeded.ironGear;
        stats.ironRod = stats.ironRod - materialsNeeded.ironRod;
        materialsNeeded.ironGear = materialsNeeded.ironGear * (Math.floor(Math.random() * 5) + 2);
        materialsNeeded.ironRod = materialsNeeded.ironRod * (Math.floor(Math.random() * 4) + 2);
        $('#ore-text-value').text(stats.ore);
        $('#upgrade-rod-amount-text').text(materialsNeeded.ironRod);
        $('#rod-text-value').text(stats.ironRod);
        $('#upgrade-gear-amount-text').text(materialsNeeded.ironGear);
        $('#gear-text-value').text(stats.ironGear);
    } else {
        $('#shop-upgrade-error-text').text(" Insufficient materials.")
    }
})