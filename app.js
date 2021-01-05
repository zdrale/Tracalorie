//Storage Controller

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
    items: [
      // {
      //   id: 0, name:'Stake Dinner', calories:1200
      // },
      // {
      //   id: 1, name:'Coockie', calories:400
      // },
      // {
      //   id: 2, name:'Eggs', calories:300
      // }
    ],
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
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
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
const App = (function(ItemCtrl, UICtrl){
  //Load all event listeners
  const loadEventListeners = function() {
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
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

      //Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //Update item submit
  const itemUpdateSubmit = function(e) {
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
})(ItemCtrl,UICtrl);  

//Init app
App.init();