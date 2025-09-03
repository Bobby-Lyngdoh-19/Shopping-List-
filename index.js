const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
//functions

function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value
    console.log(newItem)

    //validation

    if(!newItem){
        alert("please enter the item");
        return;
    }
//creating element

const li = document.createElement("li")
const itemName = document.createTextNode(newItem);
li.appendChild(itemName);


 
 
}




//Event Listener
  itemForm.addEventListener("submit", addItem);

