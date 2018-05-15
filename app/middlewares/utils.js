module.exports = (req, res, next) => {
  res.saveAndRedirect = (url) => {
    if (req.session === undefined) throw Error('Necessita de uma sessão');
    return req.session.save(() => res.redirect(url));
  };
  next();
};
