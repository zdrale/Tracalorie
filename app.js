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
      {
        id: 0, name:'Stake Dinner', calories:1200
      },
      {
        id: 1, name:'Coockie', calories:400
      },
      {
        id: 2, name:'Eggs', calories:300
      }
    ],
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data; 
    }
  }
})();
//UI Controller
const UICtrl = (function(){
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
      document.querySelector('#item-list').innerHTML = html;
    }
  }

})();
//App Controller
const App = (function(ItemCtrl, UICtrl){

  //Public methods
  return {
 
    init: function() {
      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate ul with items

      UICtrl.populateItemList(items);
      

    }
  }
})(ItemCtrl,UICtrl);  

//Init app

App.init();