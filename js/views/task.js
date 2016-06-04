var app = app || {};

(function($) {
	'use strict';

	app.TaskView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#task-template').html()),
		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'delete',
			'keypress .edit': 'update',
			'blur .edit': 'update',
		},


		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},


		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.$input = this.$('.edit');

			return this;
		},


		toggleCompleted: function() {
			this.model.toggle();
		},


		toggleVisible: function(visible) {
			if (visible == this.$el.hasClass('hidden'))
				this.$el.toggleClass('hidden');
		},


		edit: function() {
			this.$el.addClass('editing');
			this.$input.focus();
		},


		update: function(event) {
			if (event.which === ESC_KEY)
				return this.cancel();

			if (event !== undefined && event.which !== ENTER_KEY && event.type != 'focusout')
				return;

			if (!this.$el.hasClass('editing'))
				return;

			var value = this.$input.val().trim();

			if (value) {
				this.model.save({
					title: value
				});

			} else {
				this.delete();
			}

			this.$el.removeClass('editing');
		},


		cancel: function(event) {
			this.$el.removeClass('editing');
			this.$input.val(this.model.get('title'));
		},


		delete: function () {
			this.model.destroy();
		}
	});
})(jQuery);
