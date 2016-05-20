Vue.config.debug = true;

function fetchChecked(key){
  if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
}

function saveChecked(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

new Vue({
  el: '#app',
  data: {
    completed: fetchChecked("project-check")
  },

  methods: {
    resetChecked: function() {
      this.completed = [];
    }
  },

  ready: function(){
    this.$watch("completed", function(value){
      saveChecked("project-check", value);
    });
  }

});
