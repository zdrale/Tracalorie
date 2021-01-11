//Storage Controller
const StorageCtrl = (function(){
  //Public methods
  return {
    storeItem: function(item){
      let items;
      //Chekc to if any items in ls

      if(localStorage.getItem('items')===null){
        items = [];
        //push new item
        items.push(item);

        //Set ls 
        localStorage.setItem('items', JSON.stringify(items)); //because ls can hold strings only by default
      }else {
        //Get what is already in ls and turn it back into object
        items = JSON.parse(localStorage.getItem('items'));

        //Push new item
        items.push(item);
        
        //Reset ls
        localStorage.setItem('items', JSON.stringify(items)); //because ls can hold strings only by default
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items=[];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updateItem.id === item.id){
          items.splice(index, 1, updateItem);  //remove 1 from where that index is and replace with updated item
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); //because ls can hold strings only by default
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);  //remove 1 from where that index is and replace with updated item
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); //because ls can hold strings only by default
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();

//Item Controller
const ItemCtrl = (function(){
  //Item Constructor

  const Item = function(id,name,calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure  /State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      //Create id
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories to number
       calories = parseInt(calories);

       //Create new item
       newItem = new Item(ID, name, calories);


       //Add items array
       data.items.push(newItem);

       return newItem;
    },
    getItemById: function(id){
      let found = null;
      //Loop throug  items

      data.items.forEach(function(item){
        if(item.id === id) {
          found = item;   
        }
      });

      return found; 
    },

    updateItem:function(name, calories) {
      //Calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        } 
      });
      return found;
    },
    deleteItem: function(id) {
      //Get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      //Get the index
      const index = ids.indexOf(id);

      //Remove from the array
      data.items.splice(index, 1)
    },
    clearALlItems: function(){
      data.items = [];
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;
      //Loop through items and add calories
      data.items.forEach(function(item) {
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;

      //Return total
      return data.totalCalories;
    },
    logData: function(){
      return data; 
    }
  }
})();
//UI Controller
const UICtrl = (function(){
  //If somehow id gets changed 
  const UISelectors =  {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  //Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong> ${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pencil-alt"></i> 
        </a>
      </li>`;
      })

      //Insert list items 
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput:function() {
      return {
        name:document.querySelector(UISelectors.itemNameInput).value,
        calories:document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addItemToForm: function()
    {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn node list into arrray 
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();

      })
    },
    addListItem: function(item) {
      //Show the list 
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create li element
      const li = document.createElement('li');

      //Add class
      li.className = 'collection-item';
      //Add id
      li.id = `item-${item.id}`;

      //Add HTML

      li.innerHTML = `<strong> ${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i> 
      </a>`;

      //Insert item 
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');
        
        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong> ${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fas fa-pencil-alt"></i> 
          </a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    getSelectors: function() {
      return UISelectors;
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;          
    }
  }

})();
//App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  //Load all event listeners
  const loadEventListeners = function() {
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Disable submit on enter

    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    
    //Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    //Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     //Clear items event
     document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  //Add item subit
  const itemAddSubmit = function (e) {
    //Get form input from UI Controller
    const input = UICtrl.getItemInput();

    //Check for name and calorie input

    if(input.name !== '' && input.calories !== '') {
      //Add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    
      //Add item to ui

      UICtrl.addListItem(newItem);

      //Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      
      //Store in localStorage
      StorageCtrl.storeItem(newItem);

      //Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //Click edit item
  const itemEditClick = function(e) {
    if(e.target.classList.contains('edit-item')){
      //Get list item id 
      const listId = e.target.parentNode.parentNode.id;

      //Break into an array
      const listIdArr = listId.split('-');

      //Get the actual id
      const id  = parseInt(listIdArr[1]);
      
      //Get entire item
      const itemToEdit = ItemCtrl.getItemById(id);

      //set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  //Udpate item submit

  const itemUpdateSubmit = function (e) {
    //Get item input
    const input  =  UICtrl.getItemInput();

    //Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //update ui
    UICtrl.updateListItem(updatedItem);


    //Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Update local storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();
    e.preventDefault();
  }

  //Delete button 

  const itemDeleteSubmit = function(e) {
    //Get current item 
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);
    
    //Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    //Delete form local storage
    StorageCtrl.deleteItemFromStorage();

    e.preventDefault();
  }

  //Clear items event
  const clearAllItemsClick = function() {
    //Delete all items from data sctructure
    ItemCtrl.clearALlItems();

    //Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);  

    //Remove from ui
    UICtrl.removeItems();

    //Clear from local storage
    StorageCtrl.clearItemsFromStorage();

    //Hide the ul
    UICtrl.hideList();
  }
  //Public methods
  return {
 
    init: function() {
      //Set inital state
      UICtrl.clearEditState();
      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Check if any items

      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate ul with items
        UICtrl.populateItemList(items);
      }
      
      //Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Load event listeners
      loadEventListeners();


    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);  

//Init app
App.init();