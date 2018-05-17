const { Project, Section } = require('../models');

module.exports = {
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
      return res.saveAndRedirect(`/app/project/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async index(req, res, next) {
    try {
      const { projectId, sectionId } = req.params;
      const project = await Project.findOne({
        include: [Section],
        where: {
          id: projectId,
        },
      });

      const activeSection = project.Sections[
        !sectionId
          ? 0
          : project.Sections.findIndex(section => section.id === Number(sectionId))
      ];
      return res.render('project/index', { project, activeSection });
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.projectId } });

      req.flash('success', 'Projeto excluido com sucesso!');
      return res.saveAndRedirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
