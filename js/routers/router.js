var app = app || {};

(function() {
	'use strict';

	var TaskRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			app.tasksFilter = param || '';
			app.tasks.trigger('filter');
		}
	});

	app.TaskRouter = new TaskRouter();
	Backbone.history.start();
})();
