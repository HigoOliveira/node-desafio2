const { Project, Section } = require('../models');
module.exports = {
  async new(req, res, next) {
    try {
      const project = await Project.findOne({
        include: [Section],
        where: {
          id: req.params.projectId,
        },
      });

      console.log(project);
      return res.render('section/new', { project });
    } catch (err) {
      return next(err);
    }
  },
};
