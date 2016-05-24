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
    completed: fetchChecked("project-check"),
    tasks: [
      {
        section: "Content",
        items: [
          {"name": "Spelling checked", "id": "spelling"},
          {"name": "Placeholder content removed", "id": "placeholders"},
          {"name": "Contact details correct", "id": "contact"},
          {"name": "Logo links to index page", "id": "logo"},
          {"name": "404 page exist", "id": "404"},
          {"name": "All forms tested", "id": "forms"}, 
          {"name": "Checked for broken links", "id": "links"}
        ]
      },
      {
        section: "Usability",
        items: [
          {"id": "screens", "name": "Check on screens"},
          {"id": "spelling", "name": "Spelling"}
        ]
      },
      {
        section: "Design",
        items: [
          {"id": "consistency", "name": "Consistency"},
          {"id": "colour", "name": "Colour"}
        ]
      }
    ]
  },

  computed: {
    // 
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

// Collapse panels
$('.btn-box-tool').click(function(){
  $(this).find('span').toggleClass('glyphicon-minus glyphicon-plus');
});
