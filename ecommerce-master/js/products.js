const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
var productsArray = [];

function sortProducts(criteria, array){

}

function showProductsList(array){

    
    let htmlContentToProducts = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToProducts += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3"> <img src="` + product.imgSrc +  `" class="img-thumbnail"> </div>
                <div class="col">` + product.name + `</div>
                <div class="col">` + product.description + `</div>
                <div class="col">` + product.cost + `</div>
                <div class="col">` + product.currency + `</div>
                <div class="col">` + product.soldCount + `</div>
                
            </div>
        </div>
        `

        document.getElementById("product-list-container").innerHTML = htmlContentToProducts;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(result){
        if (result.status === "ok")
        {
            productsArray = result.data;
         showProductsList(productsArray);
        }
    });
})