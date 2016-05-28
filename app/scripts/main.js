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

Vue.filter('remaining', function (items) {
  return items.filter(function(items) {
      return !items.done;
  });
});
Vue.filter('completed', function (items) {
  return items.filter(function(items) {
      return items.done;
  });
});
Vue.filter('count', function (value) {
  if (value.length == 0) {
    return '<span class="label label-success">All done</span>';
  } else {
    return '<span class="badge">' + value.length + '</span>';
  }
});

new Vue({
  el: '#app',
  data: {
    completed: fetchChecked(),
    remainingCount: '',
    tasks: [
      {
        name: "Content",
        items: [
          {"name": "Spelling checked", "id": "spelling", "done": false},
          {"name": "Placeholder content removed", "id": "placeholders", "done": false},
          {"name": "Contact details correct", "id": "contact", "done": false}
        ]
      },
      {
        name: "Usability",
        items: [
          {"id": "screens", "name": "Check on screens", "done": false},
          {"id": "spelling", "name": "Spelling", "done": false}
        ]
      }
    ]
  },

  computed: {
    //
  },

  methods: {
    resetChecked: function() {
      this.tasks.forEach(function (task) {
        task.items.forEach(function (item) {
          item.done = false;
        });
      });
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

$(function() {
  // Collapse panels
  $('.btn-box-tool').click(function(){
    $(this).find('span').toggleClass('glyphicon-minus glyphicon-plus');
  });
});
