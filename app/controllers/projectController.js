const { Project } = require('../models');
module.exports = {
  new(req, res) {
    return res.render('project/new');
  },
  async store(req, res, next) {
    try {
      const { name } = req.body;
      if (name.length === 0) {
        req.flash('error', 'Seu projeto precisa de um nome');
        return res.saveAndRedirect('/app/dashboard');
      }

      if (await Project.findOne({ where: { name } })) {
        req.flash('error', 'Já existe um projeto com esse nome');
        return res.saveAndRedirect('/app/dashboard');
      }

      const project = await Project.create({
        name,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto criado com sucesso!');
      return res.saveAndRedirect(`/app/project/${project.id}/section-new`);
    } catch (err) {
      return next(err);
    }
  },
};
