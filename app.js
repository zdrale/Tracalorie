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
    items: [],
    currentItem: null,
    totalCalories: 0
  }
})();
//UI Controller
const UICtrl = (function(){

})();
//App Controller
const AppCtrl = (function(ItemCtrl, UICtrl){

})(ItemCtrl,UICtrl);  