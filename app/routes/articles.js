import Authenticated from 'ember-cli-auth/routes/authenticated';

export default Authenticated.extend({
	model: function() {
    return this.getJSONWithToken('/articles.json');
  }
});
