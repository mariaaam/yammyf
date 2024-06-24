let meals=document.getElementById("mealT");
let searchContainer = document.getElementById("searchContainer");


$(document).ready(() => {
    getMeal("").then(() => {
        $(".loading-screen").fadeOut(700)
        $("body").css("overflow", "visible")
        $(".inner-loading-screen ").fadeOut(900)

        

    })
})



function closeNavSide(){
    const sidBarWidth=$('.navMenue').innerWidth();
      $('.sideBar').animate({left:-sidBarWidth},900)
    $('.open-close-icon').addClass("fa-align-justify");
    $('.open-close-icon').removeClass("fa-x");
    $('.linkNav li').animate({top:300},1000)
}
function openSideBar(){
     $('.sideBar').animate({left:'0px'},900)
    $('.open-close-icon').addClass("fa-x");
    $('.open-close-icon').removeClass("fa-align-justify");
    for(let i=0 ;i<=5 ;i++){
        $('.linkNav li').eq(i).animate({top:0},(i+5)*200)
    }
}
closeNavSide()
$(".open-close-icon").click(function () { 

if($(".sideBar").css('left')=='0px'){
  closeNavSide();
}
else{
   openSideBar()
}
    
});


 async function getMeal(mealID){
    $(".inner-loading-screen").fadeIn(300)

let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealID}`);
let FinalRespons=await respons.json();
console.log(FinalRespons);
displayMeal(FinalRespons.meals)
$(".inner-loading-screen").fadeOut(300)


}



function displayMeal(arr){
    // searchContainer.innerHTML="";
let container="";

for(let i=0 ; i<arr.length ;i++){
    container +=`
    <div class="col-md-3 " >
 <div class="mealContain position-relative mt-5 rounded-3 overflow-hidden"  onclick="getDetails('${arr[i].idMeal}')">

                       
                        <img src="${arr[i].strMealThumb}" class="w-100" alt="${arr[i].strTags}">
                        <div class="mealLayer">
                            <h4>${arr[i].strMeal}</h4>
                        </div> </div>
                    </div>
    
    `;
    
}
// console.log(container)
meals.innerHTML=container;
}


async function getCateg(){
    $(".inner-loading-screen").fadeIn(300)

    let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
let FinalRespons=await respons.json();
console.log(FinalRespons.categories);

displayMealCateg(FinalRespons.categories)
closeNavSide()
$(".inner-loading-screen").fadeOut(300)

}

async function getCatDetais(categ){
    let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`);
    respons =await respons.json();
    console.log(respons.meals);
    displayDetalCateg(respons.meals)
    $(".inner-loading-screen ").fadeOut(900)

}


function displayMealCateg(arr){
    // searchContainer.innerHTML="";
    let container="";
    
    for(let i=0 ; i<arr.length ;i++){
        container +=`
        <div class="col-md-3 " >
     <div class="mealContain position-relative mt-5 rounded-3 overflow-hidden" onclick="getCatDetais('${arr[i].strCategory}')" >
    
                           
                            <img src="${arr[i].strCategoryThumb}" class="w-100" alt="${arr[i].strCategory}">
                            <div class="mealLayer flex-column">
                                <h4>${arr[i].strCategory}</h4>
                                <p> ${arr[i].strCategoryDescription.split(" ").slice(0,15).join(' ')}
                                </p>
                            </div> </div>
                        </div>
        
        `;
        
    }
meals.innerHTML=container;

}

function displayDetalCateg(arr){
    // searchContainer.innerHTML="";
    let container="";
    
    for(let i=0 ; i<arr.length ;i++){
        container +=`
        <div class="col-md-3 " >
     <div class="mealContain position-relative mt-5 rounded-3 overflow-hidden" onclick="getDetails('${arr[i].idMeal}')" >
    
                           
                            <img src="${arr[i].strMealThumb}" class="w-100" alt="${arr[i].strMeal}">
                            <div class="mealLayer flex-column">
                                <h4>${arr[i].strMeal}</h4>
                                
                            </div> </div>
                        </div>
        
        `;
        
    }
meals.innerHTML=container;

}




async function getArea(){
    $(".inner-loading-screen").fadeIn(300)

    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    // console.log(response.meals)
    displayMealArea(response.meals)
    $(".inner-loading-screen ").fadeOut(900)

    closeNavSide()
}

async function getAreaDetais(area){
    $(".inner-loading-screen").fadeIn(300)

    let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    respons =await respons.json();
    console.log(respons.meals);
    displayDetalArea(respons.meals)
    $(".inner-loading-screen ").fadeOut(900)

}

function displayMealArea(arr){

    // searchContainer.innerHTML="";
    let container="";
    
    for(let i=0 ; i<arr.length ;i++){
        container +=`
        <div class="col-md-3 mt-5  " >
        <div class="rounded-2 text-center cursor-pointer text-white mt-3 h3" onclick="getAreaDetais('${arr[i].strArea
        }')" >
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3 >${arr[i].strArea
        }</h3>
</div>
                        </div>
        
        `;
        
    }
meals.innerHTML=container;

}


function displayDetalArea(arr){
    searchContainer.innerHTML="";
    let container="";
    
    for(let i=0 ; i<arr.length ;i++){
        container +=`
        <div class="col-md-3 " >
     <div class="mealContain position-relative mt-5 rounded-3 overflow-hidden cursor-pointer" onclick="getDetails('${arr[i].idMeal}')">
    
                           
                            <img src="${arr[i].strMealThumb}" class="w-100" alt="${arr[i].strMeal}">
                            <div class="mealLayer flex-column">
                                <h4>${arr[i].strMeal}</h4>
                                
                            </div> </div>
                        </div>
        
        `;
        
    }
meals.innerHTML=container;

}





async function getIngredients(){
    $(".inner-loading-screen").fadeIn(300)

    let respons= await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
let FinalRespons=await respons.json();
console.log(FinalRespons.meals);

displayMealIngre(FinalRespons.meals.slice(0,20))
$(".inner-loading-screen ").fadeOut(900)

closeNavSide()
}


function displayMealIngre(arr){
    // searchContainer.innerHTML="";
    let container="";
    
    for(let i=0 ; i<arr.length ;i++){
        container +=`
        <div class="col-md-3 " >
     <div class="mealContain position-relative mt-5 rounded-3  text-white text-center" onclick="getIntegDetais('${arr[i].strIngredient}')"  >
    
    
                            
                               <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                <h3>${arr[i].strIngredient}</h3>
                                 <p> ${arr[i].strDescription.split(" ").slice(0,20).join(' ')}
                                 </p>
                             </div>
                        </div>
        
        `;
        
    }
meals.innerHTML=container;

}



async function getIntegDetais(integ){
    $(".inner-loading-screen").fadeIn(300)

    let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${integ}`);
    respons =await respons.json();
    console.log(respons.meals);
    displayDetalInteg(respons.meals)
     $(".inner-loading-screen ").fadeOut(900)
    closeNavSide();
   

}

function displayDetalInteg(arr){
    searchContainer.innerHTML="";
    let container="";
    
    for(let i=0 ; i<arr.length ;i++){
        container +=`
        <div class="col-md-3 " >
     <div class="mealContain position-relative mt-5 rounded-3 overflow-hidden" onclick="getDetails('${arr[i].idMeal}')" >
    
                           
                            <img src="${arr[i].strMealThumb}" class="w-100" alt="${arr[i].strMeal}">
                            <div class="mealLayer flex-column">
                                <h4>${arr[i].strMeal}</h4>
                                
                            </div> </div>
                        </div>
        
        `;
        
    }
meals.innerHTML=container;

}






async function getDetails(idMeal) {
    $(".inner-loading-screen").fadeIn(300)

    let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    respons = await respons.json()
    console.log(respons.meals[0])
    displayDetails(respons.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}




function displayDetails(arrDetails){
    searchContainer.innerHTML="";



    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (arrDetails[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1"> ${arrDetails[`strMeasure${i}`]} ${arrDetails[`strIngredient${i}`]} </li>`
        }
        
    }
console.log(ingredients)
    let tags = arrDetails.strTags?.split(",")
    // let tags = arrDetails.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    
    let containerDetails=
    `
        <div class="col-md-4 text-white">
        <img class="w-100 rounded-3" src="${arrDetails.strMealThumb}"
            alt="">
            <h2>${arrDetails.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${arrDetails.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${arrDetails.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${arrDetails.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a target="_blank" href="${arrDetails.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${arrDetails.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`

        
    
meals.innerHTML=containerDetails
    
}



function showSearchInputs() {
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
   closeNavSide()
   $(".inner-loading-screen ").fadeOut(900)

    meals.innerHTML = ""
}

async function searchByName(term) {
    $(".inner-loading-screen").fadeIn(700)

  
    meals.innerHTML = ""
  

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeal(response.meals) : displayMeal([])
 
    $(".inner-loading-screen ").fadeOut(900)

}

async function searchByFLetter(term) {
    closeNavSide()
    meals.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeal(response.meals) : displayMeal([])
    $(".inner-loading-screen").fadeOut(300)

}





function showContacts() {
    $(".inner-loading-screen").fadeIn(300)

    meals.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })


    closeNavSide();


    $(".inner-loading-screen ").fadeOut(900)

}


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}



function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
