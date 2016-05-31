'use strict';

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
  if (value.length === 0) {
    return 'All done! Good Job';
  } else {
    if (value.length === 1) {
      return value.length + ' Task Remaining';
    } else {
      return value.length + ' Tasks Remaining';
    }
  }
});
Vue.filter('percentage', function (value, total) {
  var percentageRemaining = (value.length / total.length * 100).toFixed();
  var percentageCompleted = 100 - percentageRemaining;
  return percentageCompleted;
});

new Vue({
  el: '#app',
  data: {
    completed: fetchChecked(),
    tasks: [
      {
        name: 'Content',
        items: [
          {'id': 'spelling-checked', 'name': 'Spelling checked', 'done': false},
          {'id': 'placeholders-removed', 'name': 'Placeholder content removed', 'done': false},
          {'id': 'deteails-correct', 'name': 'Contact details correct', 'done': false},
          {'id': 'logo-link', 'name': 'Logo links to index page', 'done': false},
          {'id': '404', 'name': '404 page exist', 'done': false},
          {'id': 'forms-tested', 'name': 'All forms tested', 'done': false},
          {'id': 'broken-links', 'name': 'Checked for broken links', 'done': false}
        ]
      },
      {
        name: 'Usability',
        items: [
          {'id': 'html5', 'name': 'HTML5 compatibility check', 'done': false},
          {'id': 'favicon', 'name': 'Favicon exist', 'done': false},
          {'id': 'urls', 'name': 'Use friendly URLs', 'done': false},
          {'id': 'print', 'name': 'Print-friendly CSS', 'done': false},
          {'id': 'search', 'name': 'Search feature works', 'done': false},
          {'id': 'contrast', 'name': 'Check color contrast on at least 2 different monitors', 'done': false}
        ]
      },
      {
        name: 'Security',
        items: [
          {'id': 'practices', 'name': 'Follow best practices', 'done': false},
          {'id': 'cross-site-scripting', 'name': 'Cross-site scripting', 'done': false},
          {'id': 'cross-site-forgery', 'name': 'Cross-site request forgery', 'done': false},
          {'id': 'ssl', 'name': 'Secure connection (SSL)', 'done': false},
          {'id': 'https', 'name': 'HTTP Strict Transport Security', 'done': false}
        ]
      },
      {
        name: 'Mobile',
        items: [
          {'id': 'input-types', 'name': 'Use correct input types', 'done': false},
          {'id': 'emulators', 'name': 'Manual check using emulators/simulators', 'done': false},
          {'id': 'real-devices', 'name': 'Test using real devices', 'done': false}
        ]
      },
      {
        name: 'Semantics',
        items: [
          {'id': 'structured-data', 'name': 'Add meaning with structured data', 'done': false},
          {'id': 'semantics', 'name': 'Check the semantics', 'done': false}
        ]
      },
      {
        name: 'Social Media',
        items: [
          {'id': 'open-graph', 'name': 'Open Graph protocol', 'done': false},
          {'id': 'twitter-cards', 'name': 'Twitter Cards', 'done': false},
          {'id': 'facebook-insights', 'name': 'Facebook Insights', 'done': false},
          {'id': 'google-plus', 'name': 'Google+', 'done': false}
        ]
      },
      {
        name: 'Analytics',
        items: [
          {'id': 'uptime-monitoring', 'name': 'Uptime monitoring', 'done': false},
          {'id': 'traffic-code', 'name': 'Traffic code installed', 'done': false}
        ]
      },
      {
        name: 'SEO',
        items: [
          {'id': 'seo-score', 'name': 'SEO score checked', 'done': false},
          {'id': 'google-snippets', 'name': 'Google Rich Snippets', 'done': false},
          {'id': 'robots', 'name': 'robots.txt', 'done': false},
          {'id': 'sitemap', 'name': 'XML sitemap', 'done': false},
          {'id': '301-redirects', 'name': 'Setup 301 redirections for old URLs', 'done': false}
        ]
      },
      {
        name: 'Performance',
        items: [
          {'id': 'google-speed', 'name': 'Google Page Speed score', 'done': false},
          {'id': 'yahoo-speed', 'name': 'Yahoo YSlow score of', 'done': false},
          {'id': 'http-headers', 'name': 'Optimize HTTP headers', 'done': false},
          {'id': 'optimize-images', 'name': 'Optimize images', 'done': false}
        ]
      },
      {
        name: 'Code quality',
        items: [
          {'id': 'html-validation', 'name': 'HTML validation', 'done': false},
          {'id': 'css-validation', 'name': 'CSS validation', 'done': false},
          {'id': 'css-lint', 'name': 'Run CSS Lint', 'done': false},
          {'id': 'js-lint', 'name': 'Run JSLint/JSHint', 'done': false},
          {'id': 'auto-testing', 'name': 'Automated testing', 'done': false},
          {'id': 'psr2', 'name': 'PHP PSR-2 Standard', 'done': false}
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
  $('.btn-box-tool').click(function(){
    $(this).find('span').toggleClass('glyphicon-minus glyphicon-plus');
    $(this).tooltip('destroy');
  });
  $('.btn-box-tool').mouseenter(function(){
    if($(this).find('span').hasClass('glyphicon-plus')) {
      $(this).tooltip('show');
    }
  });
});
