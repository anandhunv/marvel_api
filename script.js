// Hide input box and container initially
document.querySelector('.container').style.display = '';

// Show input box and container after 3 seconds
setTimeout(() => {
    document.querySelector('.container').style.display = 'block';
}, 1000);


let input=document.getElementById("input-box")
let button=document.getElementById("submit-button")
let showContainer=document.getElementById("show-container");
let listContainer=document.querySelector(".list");

// let date=new Date();
// console.log(date.getTime());
const timestampInSeconds = Math.floor(Date.now() / 1000);
console.log(timestampInSeconds);

let ts="1707565176";
let publicKey="36c09c6deca5243d8d2a682c6cd73fd0";
let hashVal="9dad3f7f863d1d17b8ccae9d48babbb7";


function displayWords(value){
    input.value=value;
    removeElements();
}

function removeElements(){
    listContainer.innerHTML="";
}

    

input.addEventListener("keyup",async()=>{
    removeElements();
    if(input.value.length < 2){
        return false;
    }


const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=${input.value}`;
const response=await fetch(url);
const jsonData=await response.json();
jsonData.data["results"].forEach((result) => {

    let name=result.name;
    let div=document.createElement("div");
    div.style.cursor="pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick","displayWords('"+ name +"')");
    let word="<b>" + name.substr(0,input.value.length)+"</b>";
    word+=name.substr(input.value.length);
    div.innerHTML=`<p class="item">${word}</p>`;
    listContainer.appendChild(div);
});
})



button.addEventListener("click",(getResult= async()=>

{
    if(input.value.trim().length < 1){
        alert("Input Cannot be blank");
        
    
    }
    showContainer.innerHTML="";
    const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&name=${input.value}`;
    // const url=`https://gateway.marvel.com:443/v1/public/characters?ts=1707513268553&apikey=36c09c6deca5243d8d2a682c6cd73fd0&hash=cfc4c84ee89aacd6ba4e4e79a5e72685&name=${input.value}`;


    const response =  await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    jsonData.data["results"].forEach((element) => {

        showContainer.innerHTML=`<div class="card-container"> 
        <div class="container-character-image">
        <img src="${element.thumbnail["path"] + "." +element.thumbnail["extension"]}"/></div>
        <div class="character-name">${element.name}</div>  
        <div class="character-description">${element.description}</div>
        </div>`;
        // console.log(element.name);///

        
        });
    })
);
window.onload=()=>{
    getResult();
}



