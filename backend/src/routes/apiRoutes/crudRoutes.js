import express from 'express';
import CrudController from '../../controllers/crudController';
import { verifyToken, verifyUserInput } from '../../middlewares';

const crudRouter = express.Router();

crudRouter.get('/animes', verifyToken, CrudController.GetAnimes);

crudRouter.post('/animes', verifyToken, verifyUserInput.crudUserRequestBody, CrudController.CreateAnime);

crudRouter.get('/animes/:id', verifyToken, CrudController.GetAnimeById);

crudRouter.delete('/animes/:id', verifyToken, CrudController.DeleteAnimeById);

crudRouter.patch('/animes/:id', verifyToken, verifyUserInput.crudUserRequestBody, CrudController.UpdateAnimeById);

export default crudRouter;
