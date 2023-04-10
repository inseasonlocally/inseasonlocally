const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user, {httpOnly: true});
  return next();
};

cookieController.checkSSIDCookie = (req, res, next) => {
  if(req.cookies.ssid) return res.redirect('/');
  return next();
};  

module.exports = cookieController;