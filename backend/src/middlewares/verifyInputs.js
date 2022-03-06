import handleValidations from './errorHandler';

const verifyUserInput = {
  registerUserRequestBody: (req, res, next) => {
    req.check('email', 'invalid email type').isEmail();
    req.check('email', 'email is required').trim().notEmpty();
    req.check('password', 'password is required').trim().notEmpty();
    handleValidations(req, res, next);
  },
  crudUserRequestBody: (req, res, next) => {
    req.check('animeName', 'Anime name is required').trim().notEmpty();
    req.check('description', 'Anime description is required').trim().notEmpty();
    req.check('genre', 'Anime genre is required').trim().notEmpty();

    handleValidations(req, res, next);
  }
};

export default verifyUserInput;
