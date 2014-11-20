import Ember from 'ember';

export default Ember.Route.extend({

	queryParams: {
		name: { replace: true }
	},

  setupController: function(controller) {
    controller.reset();
  }

});
