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

  //Public methods
  return {
 
    init: function() {
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