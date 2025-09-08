const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearbtn = document.getElementById("clear");
const filter = document.getElementById("filter");

// display item
function displayItems() {
  const itemFromStorage = getItemsFromStorage();

  itemFromStorage.forEach((item) => addItemtoDOM(item));

  clearUI();
}

//submit item function

function SubmitItems(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  console.log(newItem);

  //validation

  if (!newItem) {
    alert("please enter the item ");
    return;
  }
  //add items
  addItemtoDOM(newItem);
  //add item to local storage
  addToLocalStorage(newItem);

  //clear ui
  clearUI();

  //reset input value
  itemInput.value = "";
}

//adding items to dom
function addItemtoDOM(item) {
  //creating element
  const li = document.createElement("li");
  const itemName = document.createTextNode(item);
  li.appendChild(itemName);
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}

//adding item to local storage
function addToLocalStorage(item) {
  const itemFromStorage = getItemsFromStorage();

  //pushing items
  itemFromStorage.push(item);
  //converting to json
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

// get items from storage
function getItemsFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}

// create button function
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-xmark fa-solid");
  button.appendChild(icon);

  return button;
}

//create icon function
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// onclick item
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

//remove item function

function removeItem(item) {
  if (confirm("are you sure?")) {
    // remove item from DOM
    item.remove();
    // remove from storage

    removeItemFromStorage(item.textContent);

    clearUI();
  }
  // if (e.target.parentElement.classList.contains("remove-item")) {
  //   if (confirm("are you sure you want to remove")) {
  //     e.target.parentElement.parentElement.remove();
  //   }
  //   clearUI();
  // }
}

// function remove item from  local storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // reset to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//function clear items

function clearItems() {
  if (confirm("Are you sure you want to remove all the items ")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("items");
  }
  clearUI();
}

//filter item

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// clear ui
function clearUI() {
  const listItems = itemList.querySelectorAll("li");

  if (listItems.length === 0) {
    filter.style.display = "none";
    clearbtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clearbtn.style.display = "block";
  }
}
//initialize app

function init() {
  //Event Listener
  itemForm.addEventListener("submit", SubmitItems);
  itemList.addEventListener("click", onClickItem);
  clearbtn.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  clearUI();
}
init();
