const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearbtn = document.getElementById("clear");



//add item functions

function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value;
    console.log(newItem);

    //validation

    if(!newItem){
        alert("please enter the item ");
        return;
    }
//creating element

const li = document.createElement("li");
const itemName = document.createTextNode(newItem);
li.appendChild(itemName);
const button = createButton("remove-item btn-link text-red");
li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = "" ;
};
  

// create button function
function createButton(classes){
    const button  = document.createElement("button");
    button.className = classes;
     const icon = createIcon("fa-xmark fa-solid");
 button.appendChild(icon);

    return button;
};

//create icon function
function createIcon(classes){
    const icon =  document.createElement("i");
    icon.className = classes;
    return icon;
};

//remove item function 

function removeItem(e){

    if(e.target.parentElement.classList.contains("remove-item")){
    e.target.parentElement.parentElement.remove() };
};


//function clear items

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    };
};

//Event Listener
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", removeItem);
  clearbtn.addEventListener("click", clearItems);


