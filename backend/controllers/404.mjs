const errorController = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);

  res.status(err.status || 500);
  res.render('404', { title: `${err.message}`, path: `/${err.status}` });
};

export default errorController;
