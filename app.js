
let stats = {
    currency: 0,
    ore: 0,
    ingot: 0,
    sword: 0,
    ironRod: 0,
    ironGear: 0,
    orePerSwing: 1,
    automining: false,
    hasPurchasedMining: false,
    autosmelting: false,
    hasPurchasedSmelting: false,
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
    oreValue: .5,
    ingotValue: 7,
    swordValue: 35,
}

let shopPrices = {
    autominingPrice: 500,
    autosmeltingPrice: 1000,
}



$(window).on('load', function(){
    let myStats = JSON.parse(localStorage.getItem("myStats"));
    if(myStats){
        stats.currency = myStats.currency;
        stats.ore = myStats.ore;
        stats.ingot = myStats.ingot;
        stats.sword = myStats.sword;
        stats.ironRod = myStats.ironRod;
        stats.ironGear = myStats.ironGear;
        stats.orePerSwing = myStats.orePerSwing;
        stats.automining = myStats.automining;
        stats.hasPurchasedMining = myStats.hasPurchasedMining;
        updateStatsView();
    }
    let myMaterialsNeeded = JSON.parse(localStorage.getItem("myMaterialsNeeded"));
    if(myMaterialsNeeded){
        materialsNeeded.ironGear = myMaterialsNeeded.ironGear;
        materialsNeeded.ironRod = myMaterialsNeeded.ironRod;
        updateStatsView();
    }
})


function autoMine(){
    stats.ore = stats.ore + stats.orePerSwing;
    updateStatsView();
}

function updateStatsView() {
    $('#currency-text-value').text(stats.currency);
    $('#ore-text-value').text(stats.ore);
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
        $('#mine-btn').val('Mining..');
        $('#mine-btn').prop('disabled', true);
        setTimeout('autoMine()', 2500);
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
        updateStatsView();
    } else {
        $('#shop-upgrade-error-text').text(" Insufficient materials.")
    }
})