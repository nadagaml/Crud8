// crud operation
// create product
// save localstorage
// get total 
// clear inputs
// read in table
// count
// delete 
//delete all data 
// update
// sreach by real time 
// sreach by gategory
// clean date
// validation

////////////////////////////////////////////

var ProductName = document.getElementById("Pname");
var ProductPrice = document.getElementById("Pprice");
var ProductTaxes = document.getElementById("Ptaxes");
var ProductAds = document.getElementById("Pads");
var ProductDiscound = document.getElementById("Pdiscount");
var ProductTotal = document.getElementById("total");
var ProductCount = document.getElementById("Pcount");
var input =document.getElementsByClassName("form-control");
var ProductCategory = document.getElementById("Pcategory");
var submit = document.getElementById("submit");
let btnDeleteAll = document.getElementById("deleteAll");
var nameAlert=document.getElementById("name-alert");

var currentIndex=0;
var products=[];
////////////////////

//validation

ProductName.onkeyup=function()
{
    var nameRejex=/^[A-Z a-z]{2,10}$/
    if(!nameRejex.test(ProductName.value))
    {
        submit.disabled="true";
        ProductName.classList.add("is-invalid");
        ProductName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
        return false;

    }
    else 
    {
        submit.removeAttribute("disabled");
        ProductName.classList.add("is-valid")
        ProductName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
        return true;
    }

}



//localStorage.setItem("test",nada)

if(JSON.parse(localStorage.getItem("productList"))!=null)
{
    products=JSON.parse(localStorage.getItem("productList"));
    displayData();
}
submit.onclick=function()
{
   
    if (submit.innerHTML=="create")
    {
        AddProduct();
    }
    else {
        updateProduct();
    }
    displayData();
    clearData();
    

}
//get total
function GetTotal()
{
    if (ProductPrice.value !='')
    {
        var result =( +ProductPrice.value + +ProductTaxes.value + +ProductAds.value)- +ProductDiscound.value ;

        ProductTotal.innerHTML=result;
        ProductTotal.style.background='#040';
    }
    else{
        ProductTotal.innerHTML='';
        ProductTotal.style.background='red'
    }
}

// Add Product

function AddProduct ()
{
    var product =  
    {
        name:ProductName.value,
        price:ProductPrice.value,
        taxes:ProductTaxes.value,
        ads:ProductAds.value,
        discound:ProductDiscound.value,
        total:ProductTotal.innerHTML,
        count:ProductCount.value,
        Category:ProductCategory.value   
    }

    if(product.count>1){
        for( var i=0;i<product.count;i++)
        {
            products.push(product);
        }
    }
    else{                          //  -1 عشان لو حد ظريف كتب 
        products.push(product);    // بيدخل مره واحده بس
    }
   
    ProductTotal.innerHTML='';
    ProductTotal.style.background='red'
    localStorage.setItem("productList",JSON.stringify(products)); // LocalStorage مش بتخزن غير string 

}

//dispaly data

function displayData()
{
    cartona='';
    
    for(var i=0;i<products.length;i++)
    {
        cartona+=`<tr>
            <td> ${i+1} </td>
            <td> ${products[i].name} </td>
            <td> ${products[i].price} </td>
            <td> ${products[i].taxes} </td>
            <td> ${products[i].ads} </td>
            <td> ${products[i].discound} </td>
            <td> ${products[i].total} </td>
            <td> ${products[i].count} </td>
            <td> ${products[i].Category} </td>
            <td> <button onclick="DeleteProduct(${i})" class="btn btn-danger"> Delete </button> </td>

            <td> <button onclick="getProduct(${i})" class="btn btn-warning"> update </button> </td>

        
        </tr>`
    }
        document.getElementById("tableBody").innerHTML=cartona;

        if(products.length>0)
        {
            btnDeleteAll.innerHTML= 
            `<button onclick="DeleteAll()" class="btn btn-danger  my-4"> Delete All (${products.length})</button> `
            
        }
        else{
            btnDeleteAll.innerHTML= '';
        }

}

// clear data
function clearData()
{

    for(var i=0; i<input.length;i++)
    {
        input[i].value="";
    }

}

// delete data

function DeleteProduct(index)
{
    products.splice(index,1); //(عدد الي عايزه امسحه, المكان الي همسح منه)
    displayData();
    localStorage.setItem("productList",JSON.stringify(products))
}

//delete all data 
function DeleteAll()
{
localStorage.clear();
products.splice(0);
displayData();
}

//update

// get data from the row
function getProduct(index)
{
    ProductName.value=products[index].name;
    ProductPrice.value=products[index].price;
    ProductTaxes.value=products[index].taxes;
    ProductAds.value=products[index].ads;
    ProductDiscound.value=products[index].discound;
    ProductTotal.innerHTML=products[index].total
    ProductCount.value=products[index].count
    ProductCategory.value=products[index].Category;
    ProductTotal.style.background='#040';
    submit.innerHTML="Update Product";
    currentIndex=index;  // update السطر دا هو اساس ال 
}

function  updateProduct() 
{
    var product = 
    {
        name:ProductName.value,
        price:ProductPrice.value,
        taxes:ProductTaxes.value, 
        ads:ProductAds.value,
        discound:ProductDiscound.value,
        total:ProductTotal.innerHTML,
        count:ProductCount.value,
        Category:ProductCategory.value
    }
    products[currentIndex]=product;  /// كله object  عشان مش محدد هيعمل ابديت ف انهي جزء ف كدا ماسك الproduct(object) استخدمنا ال 
    localStorage.setItem("productList",JSON.stringify(products));
    ProductTotal.innerHTML='';
    ProductTotal.style.background='red'


}
// search

//1) real time search
function Search(val)
{
    cartona='';
    for(var i=0;i<products.length;i++)
    {
        if(products[i].name.toLowerCase().includes(val.toLowerCase()))

        cartona+=`<tr>
            <td> ${i+1} </td>
            <td> ${products[i].name} </td>
            <td> ${products[i].price} </td>
            <td> ${products[i].taxes} </td>
            <td> ${products[i].ads} </td>
            <td> ${products[i].discound} </td>
            <td> ${products[i].total} </td>
            <td> ${products[i].count} </td>
            <td> ${products[i].Category} </td>
            <td> <button onclick="DeleteProduct(${i})" class="btn btn-danger"> Delete </button> </td>

            <td> <button onclick="getProduct(${i})" class="btn btn-warning"> update </button> </td>

        
        </tr>`
    }
    document.getElementById("tableBody").innerHTML=cartona;

}

//2) search by button

let searchMood ='name';

function getSearchMood(id)
{
    let Searchkey = document.getElementById("Search2"); 
      if(id=='searchName')
      {
        searchMood='name';
        // Searchkey.placeholder = "search By Name";
      }
      else{
        searchMood='Category'
        // Searchkey.placeholder= 'search By category';
      }

    console.log(searchMood);
}

function searchData(val)
{
    let cartona ='';
    for (let i=0;i<products.length;i++)
{

    if(searchMood == 'name')
    {

        if(products[i].name.toLowerCase().includes((val).toLowerCase()))
            {
                cartona+=`<tr>
                <td> ${i+1} </td>
                <td> ${products[i].name} </td>
                <td> ${products[i].price} </td>
                <td> ${products[i].taxes} </td>
                <td> ${products[i].ads} </td>
                <td> ${products[i].discound} </td>
                <td> ${products[i].total} </td>
                <td> ${products[i].count} </td>
                <td> ${products[i].Category} </td>
                <td> <button onclick="DeleteProduct(${i})" class="btn btn-danger"> Delete </button> </td>
    
                <td> <button onclick="getProduct(${i})" class="btn btn-warning"> update </button> </td>
    
            
            </tr>`
        }
        
    }
        else
        {   
            
            
                if(products[i].Category.toLowerCase().includes((val).toLowerCase()))
                {
                    cartona+=`<tr>
                    <td> ${i+1} </td>
                    <td> ${products[i].name} </td>
                    <td> ${products[i].price} </td>
                    <td> ${products[i].taxes} </td>
                    <td> ${products[i].ads} </td>
                    <td> ${products[i].discound} </td>
                    <td> ${products[i].total} </td>
                    <td> ${products[i].count} </td>
                    <td> ${products[i].Category} </td>
                    <td> <button onclick="DeleteProduct(${i})" class="btn btn-danger"> Delete </button> </td>
        
                    <td> <button onclick="getProduct(${i})" class="btn btn-warning"> update </button> </td>
        
                
                </tr>`
                }
            
        }
    document.getElementById("tableBody").innerHTML=cartona;
    }
} 
  
