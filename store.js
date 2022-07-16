
let shopPrices = {
    autominingPrice: 500,
    autoSmeltingPrice: 1000,
}

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