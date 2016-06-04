var app = app || {};

(function($) {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.tasksapp',
		statsTemplate: _.template($('#stats-template').html()),
		events: {
			'keypress .new-task': 'create',
			'click .delete-completed': 'deleteCompleted',
			'click .toggle-completed': 'toggleCompleted'
		},


		initialize: function () {
			this.$input = this.$('.new-task');
			this.$main = $('.main');
			this.$list = $('.tasks-list');
			this.$footer = this.$('.footer');

			this.listenTo(app.tasks, 'filter', this.filter);
			this.listenTo(app.tasks, 'all', this.render);

			app.tasks.fetch();
		},


		render: function() {
			if (app.tasks.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: app.tasks.getCompleted().length,
					remaining: app.tasks.getRemaining().length
				}));

				$('ul.filters a')
					.removeClass('selected')
					.filter('[href="#/'+ app.tasksFilter +'"]')
					.addClass('selected');

			} else {
				this.$main.hide();
				this.$footer.hide();
			}
		},


		create: function(event) {
			var value = this.$input.val().trim();

			if (event.which !== ENTER_KEY || !value)
				return;

			app.tasks.create({
				title: value,
				completed: false
			});

			this.$input.val('');
		},


		deleteCompleted: function() {
			app.tasks.deleteCompleted();
		},


		toggleCompleted: function() {
			var check = $('.toggle-completed').prop('checked');

			app.tasks.each(function(task) {
				task.save({
					completed: check
				});
			});
		},


		filter: function(name) {
			var name = name || app.tasksFilter;

			app.tasks.each(function(task) {
				task.trigger('visible', true);
			}, this);

			if (!name)
				return;

			var filteredTasks = app.tasks.where({
				'completed': name == 'active'? true : false}
			);

			_.each(filteredTasks, function(task) {
				task.trigger('visible', false);
			});
		}
	});
})(jQuery);
