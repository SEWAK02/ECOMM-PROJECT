fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
.then((response)=>response.json())
.then((data)=>data.products)
.then((data)=>{
forGender(data);
forBrand(data);
forCategory(data);
forDiscount(data);
forProduct(data);
saveData(data);
// forProducts(buttonResult);

})
.catch((error)=>{
    console.log(error);
    document.getElementById("displayProduct").innerHTML = "can't Fetch Data";
});

forGender = (data)=>{
var check_gender = document.getElementById("showGender")
var gendername =[]
data.forEach(element => {
    gendername.push(element["gender"])    

});
var gendername = new Set(gendername)
var htmlContent = `<div class="heading d-flex justify-content-between align-items-center">
<h6 class="text-uppercase">FILTER</h6>
</div>`
for(let element of gendername){
htmlContent+=`<div class="d-flex justify-content-between mt-2">
<div class="form-check"> <input class="form-check-input" type="radio" name="gender" value=${element} onclick= "radioFilter()"
        id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">${element} </label>
</div>
</div>`
}
check_gender.innerHTML=htmlContent;
}

forBrand = (data) => {
    var check_brand = document.getElementById("showBrand");
    var brName = [];
    data.forEach((elem) => {
      brName.push(elem["brand"]);
      brName.sort();
    });
    var brandName = new Set(brName);
    var htmlContent = `<div class="heading d-flex justify-content-between align-items-center">
      <h6 class="text-uppercase">Brand</h6></div>`;
    for (let element of brandName) {
      htmlContent +=
        `<div class="d-flex justify-content-between mt-2"><div class="form-check"> 
          <input class="form-check-input" type="checkbox" name="brand" value=${element} onclick="brandFilter()" 
          id=${element}><label class="form-check-label" for=${element}>${element}</label></div></div>`;
    }
    check_brand.innerHTML = htmlContent;
  };

  forCategory = (data)=>{
    var check_cat = document.getElementById("showcategory");
    var categoryName =[ ];
    data.forEach((element)=>{
      categoryName.push(element["category"]);
    });
    var categoryName = new Set(categoryName);
    var htmlContent = `<div class="heading d-flex justify-content-between align-items-center">
          <h6 class="text-uppercase">Category</h6></div>`;
          for (let element of categoryName) {
            htmlContent+= `<div class="d-flex justify-content-between mt-2"><div class="form-check"> 
            <input class="form-check-input" type="checkbox" name="category" value=${element} onclick="catFilter()"
             id=${element}><label class="form-check-label" for=${element}>${element}</label></div></div>`;
          }
          check_cat.innerHTML = htmlContent;
  }

forDiscount = (data)=>{
    var check_discount = document.getElementById("showdiscount")
    var discountname =[]
    data.forEach(element => {
        discountname.push(element["discountDisplayLabel"])    
    
    });
    var discountname = new Set(discountname)
    var htmlContent = `   <div class="heading d-flex justify-content-between align-items-center">
    <h6 class="text-uppercase">DISCOUNT RANGE</h6>
</div>`

    for(let element of discountname){
    htmlContent+=`<div class="d-flex justify-content-between mt-2">
    <div class="form-check"> <input class="form-check-input" type="checkbox" name="discount" value="${element}" onclick="disFilter()"
            id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">${element}& above</label>
    </div>
</div>`
   
    }
    check_discount.innerHTML=htmlContent;
    }

forProduct = (data)=>{
    var for_products = document.getElementById("displayProduct")
    htmlContent = ""
    data.forEach((element)=>{
        htmlContent+=` <div class="col-md-4">
        <div class="product py-4">
            <span class="off bg-success">${element["discountDisplayLabel"]}</span>
            <div class="text-center"> <img src="${element["searchImage"]}" width="200"> </div>
            <div class="about text-center"><h6>${element["product"]}</h6>
            <div id="brand">${element["brand"]}</div>
            <div id="shoes">${element["sizes"]}</div>
            <div id="rate">Rs.${element["price"]}
                    <strike>Rs.${element["mrp"]}</strike>
                    ${element["discountDisplayLabel"]}
            </div>
            <div class="cart-button mt-3 px-2 d-flex justify-content-between align-items-center">
                    <button class="btn btn-primary text-uppercase">Add to cart</button>
                    <div class="add"><span class="product_fav"><i class="fa fa-heart-o"></i></span>
                        <span class="product_fav"><i class="fa fa-opencart"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    })
    for_products.innerHTML= htmlContent;
}

var productData = []
const saveData = (data)=>{
  productData = data;
}

function radioFilter(){
  var radioVal = document.querySelector('input[name="gender"]:checked').value;
  var data = productData.filter((filterdata)=>filterdata.gender===radioVal)
  forProduct(data);
}

function brandFilter( ){
  var brandVal = document.querySelectorAll('input[name="brand"]:checked');
  var arr = [ ];
  brandVal.forEach((elem)=>{
    elem.checked ? arr.push(elem.value):null;
  })
  var resultBrand = [ ]
  arr.forEach((val)=>{
    resultBrand = resultBrand.concat(productData.filter((checkboxdata)=>checkboxdata.brand.includes(val)))
  })
  resultBrand.length !==0 ? forProduct(resultBrand):forProduct(productData);
}



  function catFilter(){
    var catVal = document.querySelectorAll('input[name="category"]:checked');
    var arr = [ ];
    catVal.forEach((elem)=>{
      elem.checked ? arr.push(elem.value): null;});
      var resultCat = [ ];
    arr.forEach((val)=>{
      resultCat = resultCat.concat(productData.filter((checkboxdata)=>checkboxdata.category.includes(val)))});
      resultCat.length !== 0 ? forProduct(resultCat):forProduct(productData);
  }

  function disFilter(){
    var disVal = document.querySelectorAll('input[name="discount"]:checked');
    var arr = [ ];
    disVal.forEach((elem)=>{
      elem.checked ? arr.push(elem.value):null;});
      var resultDIs = [ ];
      arr.forEach((val)=>{
        resultDIs = resultDIs.concat(productData.filter((checkboxdata)=>checkboxdata.discountDisplayLabel.includes(val)))
      });
      resultDIs.length !==0 ? forProduct(resultDIs):forProduct(productData);
  }
function searchFun(){
  var searchVal = document.getElementById("searchbar").value.toUpperCase();
  var searchResult = productData.filter((searchitem)=>searchitem.product.toUpperCase().includes(searchVal));
  forProduct(searchResult);
}
  