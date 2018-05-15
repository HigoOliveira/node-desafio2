const { User } = require('../models');
const bcrypt = require('bcrypt');
module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },
  signup(req, res) {
    return res.render('auth/signup');
  },
  async register(req, res, next) {
    try {
      const { email } = req.body;
      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.saveAndRedirect('back');
      }

      const password = await bcrypt.hash(req.body.password, 5);
      await User.create({ ...req.body, password });

      req.flash('success', 'Uusário cadastrado com sucesso!');
      return res.saveAndRedirect('/');
    } catch (err) {
      return next(err);
    }
  },
  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Usuário inexistente!');
        return res.saveAndRedirect('/');
      }

      req.session.user = user;
      return res.saveAndRedirect('app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
