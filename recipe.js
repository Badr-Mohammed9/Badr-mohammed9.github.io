var myCatgroy = '';
var myRecpeis = [];
function addCatgorys(){
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => {
        let arrOfCatgroeis = response.data.categories;
        let numOfcatgries = 14;
        for (let index = 0; index < numOfcatgries/2 - 1; index++) {
            let elemnt = `<a  href="#" class="catgroyBox">${arrOfCatgroeis[index].strCategory}</a>`;
            document.querySelector('.cBoxA').innerHTML+=elemnt;
            
        }
        document.querySelector('.cBoxA').innerHTML+=`<a  href="#" class="catgroyBox">elemnt</a>`
        for (let index = numOfcatgries/2; index < numOfcatgries; index++) {
            let elemnt = `<a  href="#" class="catgroyBox">${arrOfCatgroeis[index].strCategory}</a>`;
            document.querySelector('.cBoxB').innerHTML+=elemnt;
            
        }
        document.querySelectorAll('.catgroyBox').forEach(elemnt => elemnt.addEventListener('click',e => {
            e.target.onclick = changeCatgroy(e.target)
            
        }))
    })
}
function normalCatgroy(){
    document.querySelectorAll('.catgroyBox').forEach(e => {
        e.style.color = 'black';
    })
}
function changeCatgroy(name){
    normalCatgroy();
    name.style.color = 'red';
    myCatgroy = name.innerHTML;
    searchBtn(false);
    
}
function getFood(name,catgory){
    let url = '';
    if (name=='') {
        alert("You should Write something")
        normalCatgroy();
        return
    }
    if (catgory!='') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catgory}&i=${name}`
    }else{
        url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+name;
    }
    axios.get(url)
    .then((response) => {
        let dialog = `
        <dialog class="pop">
                <a class="closeBtn" href="#">
                    <div class="closeDiv"><i class="fa-sharp fa-solid fa-circle-xmark"></i></div>
                </a>
                 <h4 id="popName">name</h4>
                <h5>Instructions:</h5>
                <div class="instra">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nulla iure saepe! Ipsum iure numquam officia. Doloremque quia saepe, maxime sed blanditiis quam mollitia ipsam laboriosam iure nam quasi laborum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit accusantium quasi, itaque veniam quidem aspernatur debitis commodi excepturi iusto qui corporis pariatur quaerat esse odio ea eum cupiditate deleniti vel.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam vel nulla ipsa explicabo consequatur eos deleniti odio! Assumenda iure reiciendis deleniti facere praesentium recusandae nulla cupiditate! Possimus odit cum dolorum.
                </div>
                <a id="getRecp" href="#">
                    <div class="foodBtn2">Add Recipe</div>
                 </a>
            </dialog>
        `
        let secondDilog = `
        <dialog class="newpop">
            <a class="closeBtn2" href="#">
                <div class="closeDiv"><i class="fa-sharp fa-solid fa-circle-xmark"></i></div>
            </a>
            <h4 id="buyM">The item has been added sucssuflly!,you can find it on 'myRecipes' above</h4>
        </dialog>
        `
        document.querySelector(".listItems").innerHTML += dialog;
        document.querySelector(".listItems").innerHTML += secondDilog;
        let meals = response.data.meals;
        for(meal of meals){
            let imgEl = document.createElement("div");
            imgEl.className ='imgFood';
            imgEl.style.backgroundImage = `url("${meal.strMealThumb}")`
            let foodName = document.createElement("div");
            foodName.className = 'foodName';
            foodName.innerHTML = meal.strMeal;
            let aherf = document.createElement("a");
            let footBtn = document.createElement("div");
            footBtn.className = "foodBtn";
            footBtn.id = meal.idMeal;
            footBtn.innerHTML = 'Get Recipe';
            aherf.appendChild(footBtn);
            let box = document.createElement("div");
            box.className = 'box';
            box.id = meal.idMeal;
            box.appendChild(imgEl);
            box.appendChild(foodName);
            box.appendChild(aherf);
            
            document.querySelector(".listItems").appendChild(box);
        }
        
        document.querySelectorAll('.foodBtn').forEach(item => item.addEventListener("click",(el) => {
            setPopup(el.target.id);
        }))
        document.querySelector('.closeBtn').addEventListener("click",() => {
            const elemnt = document.querySelector(".pop");
            elemnt.close();
        })
        document.querySelector('.closeBtn2').addEventListener("click",() => {
            const elemnt = document.querySelector(".newpop");
            elemnt.close();
        })
        document.querySelector("#getRecp").addEventListener('click',(el) => {
            myRecpeis.push(el.target.id);
            document.querySelector(".pop").close();
            document.querySelector(".newpop").showModal();
        })

    })
}

function searchBtn(isNew){
    if (isNew) {
        myCatgroy = '';
        normalCatgroy();
    }
    let value = document.querySelector('#searchBox').value;
    document.querySelector(".listItems").innerHTML = '';
    getFood(value,myCatgroy);
}

addCatgorys()

function setPopup(id){
    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    .then((response) => {
        let meal = response.data.meals[0];
        document.querySelector("#popName").innerHTML = meal.strMeal;
        document.querySelector(".instra").innerHTML = meal.strInstructions;
        document.querySelector(".foodBtn2").id = meal.idMeal;
        const elemnt = document.querySelector(".pop");
        elemnt.showModal();
    })
    
}
function createMyRecipe(id){
    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    .then((response) => {
        let meal = response.data.meals[0];
        
        let contet = `
        <div class="box">
            <div class="imgSide"></div>
            <div class="textSide">
                <div class="aboveText">name</div>
                <div class="bottomText">
                    catgroy: desert
                </div>
            /div>
        </div>
        `
        let box = document.createElement("div");
        let imgSide = document.createElement("div");
        let textSide = document.createElement("div");
        let aboveText = document.createElement("div");
        let bottomText = document.createElement("div");
        box.className = 'box2';
        imgSide.className = 'imgSide2';
        imgSide.style.backgroundImage = `url("${meal.strMealThumb}")`
        textSide.className = 'textSide';
        aboveText.className = 'aboveText';
        aboveText.innerHTML = meal.strMeal +'<br>catgory: '+meal.strCategory;
        bottomText.className = 'bottomText';
        // bottomText.innerHTML = 'catgory: '+meal.strCategory;
        textSide.appendChild(aboveText);
        textSide.appendChild(bottomText);
        box.appendChild(imgSide);
        box.appendChild(textSide);
        box.addEventListener("click",() => {createDetil(meal.idMeal)})
        document.querySelector(".recipeBox").appendChild(box);
        //console.log(document.querySelector(".recipeBox"))
    })
    
}
function myRecipesPage(){
    if (document.querySelector(".myRecipes").innerHTML == 'myRecipes') {
        let content = `
        <div class="leftBar2">
            <div class="titleMyrecipe">my Recpies:</div>
            <div class="recipeBox">
                            
            </div>
        </div>
        <div class="rightBar2">
                        
        </div>
        `;
        document.querySelector('.main').innerHTML = '';
        document.querySelector('.main').innerHTML += content;
        myRecpeis.forEach(el => {createMyRecipe(el)})
        document.querySelector(".myRecipes").innerHTML = 'Find Recipes';
    }else {
        let content = `
        <div class="leftBar">
                    <div class="ingrText">Find Meals for Your Ingredient!</div>
                    <div class="filter">
                        <h4>Filter by catgory:</h4>
                        <div class="catgorys">
                            <div class="cBoxA">
                                
                            </div>
                            <div class="cBoxB">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightBar">
                    <div class="serchBar">
                        <input id="searchBox" type="text" placeholder="Search..">
                        <button onclick="searchBtn(true)" id="serBtn" type="submit"><i class="fas fa-search"></i></button>
                    </div>
                    <div class="listItems">
                        <dialog class="pop">
                            <a class="closeBtn" href="">
                                <div class="closeDiv"><i class="fa-sharp fa-solid fa-circle-xmark"></i></div>
                            </a>
                            <h4 id="popName">name</h4>
                            <h5>Instructions:</h5>
                            <div class="instra">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nulla iure saepe! Ipsum iure numquam officia. Doloremque quia saepe, maxime sed blanditiis quam mollitia ipsam laboriosam iure nam quasi laborum!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit accusantium quasi, itaque veniam quidem aspernatur debitis commodi excepturi iusto qui corporis pariatur quaerat esse odio ea eum cupiditate deleniti vel.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam vel nulla ipsa explicabo consequatur eos deleniti odio! Assumenda iure reiciendis deleniti facere praesentium recusandae nulla cupiditate! Possimus odit cum dolorum.
                            </div>
                            <a id="getRecp" href="#">
                                <div class="foodBtn2">Add Recipe</div>
                            </a>
                        </dialog>
                        <dialog class="newpop">
                            <a class="closeBtn" href="">
                                <div class="closeDiv"><i class="fa-sharp fa-solid fa-circle-xmark"></i></div>
                            </a>
                            <h4 id="buyM">The item has been added sucssuflly!</h4>
                        </dialog>
                        
                    </div>
                </div>
        `;
        document.querySelector('.main').innerHTML = '';
        document.querySelector('.main').innerHTML += content;
        document.querySelector(".myRecipes").innerHTML = 'myRecipes';
        addCatgorys();
    }
}
//createMyRecipe(52794);
//myRecpeis.forEach(el => {console.log(el)})
document.querySelector(".about").addEventListener('click',() => {
    //createMyRecipe(52794);
   
})
function createDetil(id){
    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    .then((response) => {
        document.querySelector(".rightBar2").innerHTML = "";

        let meal = response.data.meals[0];
        
        let bigImg = document.createElement("div");
        bigImg.className = 'bigImg';
        bigImg.style.backgroundImage = `url("${meal.strMealThumb}")`;

        let content = `
        <div class="area">${meal.strArea}</div>
        <div class="link">${meal.strYoutube}</div>
        <div class="detialBox">
            <div class="ingred"><span>Ingredient</span></div>
            <div class="measure"><span>measures</span></div>
        </div>
        `;
        document.querySelector(".rightBar2").appendChild(bigImg);
        document.querySelector(".rightBar2").innerHTML+=content;
        
        document.querySelector(".ingred").innerHTML+="<div>"+meal.strIngredient1+"</div>";
        document.querySelector(".ingred").innerHTML+="<div>"+meal.strIngredient2+"</div>";
        document.querySelector(".ingred").innerHTML+="<div>"+meal.strIngredient3+"</div>";
        document.querySelector(".ingred").innerHTML+="<div>"+meal.strIngredient4+"</div>";
        document.querySelector(".ingred").innerHTML+="<div>"+meal.strIngredient5+"</div>";

        document.querySelector(".measure").innerHTML+="<div>"+meal.strMeasure1+"</div>";
        document.querySelector(".measure").innerHTML+="<div>"+meal.strMeasure2+"</div>";
        document.querySelector(".measure").innerHTML+="<div>"+meal.strMeasure3+"</div>";
        document.querySelector(".measure").innerHTML+="<div>"+meal.strMeasure4+"</div>";
        document.querySelector(".measure").innerHTML+="<div>"+meal.strMeasure5+"</div>";
    })
}
