var app = app || {};

(function () {
	'use strict';

	var Tasks = Backbone.Collection.extend({
		model: app.Task,
		localStorage: new Backbone.LocalStorage('tasks'),


		initialize: function() {
			this.$list = $('.tasks-list');

			this.on('change reset add remove', this.renderRows, this);
		},


		renderRows: function() {
			this.$list.html('');

			this.each(function(task) {
				var view = new app.TaskView({
					model: task
				});

				this.$list.append(view.render().el);
			}, this);

			this.trigger('filter');
		},


		getCompleted: function() {
			return this.where({
				completed: true
			});
		},


		getRemaining: function() {
			return this.where({
				completed: false
			});
		},


		deleteCompleted: function() {
			_.invoke(this.getCompleted(), 'destroy');
		}
	});

	app.tasks = new Tasks();
})();
