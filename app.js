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
    logData: function(){
      return data; 
    }
  }
})();
//UI Controller
const UICtrl = (function(){

})();
//App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){

})(ItemCtrl,UICtrl);  