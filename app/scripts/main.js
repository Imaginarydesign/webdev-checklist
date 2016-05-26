Vue.config.debug = true;

var STORAGE_KEY = 'project-checks';

function fetchChecked(){
  if(localStorage.getItem(STORAGE_KEY)){
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
  return [];
}

function saveChecked(completed){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
}

new Vue({
  el: '#app',
  data: {
    completed: fetchChecked(),
    tasks: [
      {"name": "Spelling checked", "id": "spelling", "done": false},
      {"name": "Placeholder content removed", "id": "placeholders", "done": false},
      {"name": "Contact details correct", "id": "contact", "done": false}
    ]
  },

  computed: {
    remaining: function () {
      return this.tasks.filter(function(tasks){
        return ! tasks.done;
      });
    },
    done: function () {
      return this.tasks.filter(function(tasks){
        return tasks.done;
      });
    }
  },

  methods: {
    resetChecked: function() {
      this.tasks = [];
    }
  },

  watch: {
    tasks: {
      handler: function (tasks) {
        saveChecked(tasks);
      },
      deep: true
    }
  },

  ready: function() {
    if (this.completed.length) {
      this.tasks = this.completed;
    }
    
  }

});

// Collapse panels
$('.btn-box-tool').click(function(){
  $(this).find('span').toggleClass('glyphicon-minus glyphicon-plus');
});
