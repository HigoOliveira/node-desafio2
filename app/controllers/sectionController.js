const { Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { title, content } = req.body;
      const { projectId } = req.params;
      const url = `/app/project/${projectId}`;
      if (!title || !content) {
        req.flash('error', 'A seção precisa ter um título e um conteúdo.');
        return res.saveAndRedirect(url);
      }

      const checkExists = await Section.findOne({
        where: {
          title,
          ProjectId: projectId,
        },
      });

      if (checkExists) {
        req.flash('error', 'A seção já existe neste projeto');
        return res.saveAndRedirect(url);
      }
      const section = await Section.create({ ...req.body, ProjectId: projectId });

      req.flash('success', 'Seção registrada com sucesso!');
      return res.saveAndRedirect(`${url}/section/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async update(req, res, next) {
    try {
      const { sectionId, projectId } = req.params;
      const { title, content } = req.body;
      const url = `/app/project/${projectId}/section/${sectionId}`;

      if (!title || !content) {
        req.flash('error', 'A seção precisa ter um título e um conteúdo.');
        return res.saveAndRedirect(url);
      }

      const section = await Section.findById(sectionId);
      await section.update(req.body);
      req.flash('success', 'Seção atualizada com sucesso!');

      return res.saveAndRedirect(url);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      const { sectionId, projectId } = req.params;
      await Section.destroy({ where: { id: sectionId } });

      req.flash('success', 'A seção foi removida com sucesso!');
      return res.saveAndRedirect(`/app/project/${projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
