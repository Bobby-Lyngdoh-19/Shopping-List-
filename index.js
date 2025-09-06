const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearbtn = document.getElementById("clear");
const filter = document.getElementById("filter");

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
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = localStorage.getItem("items");
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  //pushing items
  itemFromStorage.push(item);
  //converting to json
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
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

//remove item function

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("are you sure you want to remove")) {
      e.target.parentElement.parentElement.remove();
    }
    clearUI();
  }
}

//function clear items

function clearItems() {
  while (itemList.firstChild) {
    confirm("Are you sure you want to remove all the items ");
    itemList.removeChild(itemList.firstChild);
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

//Event Listener
itemForm.addEventListener("submit", SubmitItems);
itemList.addEventListener("click", removeItem);
clearbtn.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);
clearUI();
