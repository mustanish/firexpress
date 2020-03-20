const group = require('../controllers/group');
const validator = require('../middlewares/validator');

module.exports = app => {
  app.post('/group', validator.body(true), group.create);

  app.patch('/group/:id', validator.params(true), validator.body(true), group.update);

  app.delete('/group/:id', validator.params(true), group.remove);

  app.get('/group/:id', validator.params(true), group.get);

  app.get('/groups', validator.query(true), group.getAll);
};
