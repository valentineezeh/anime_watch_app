import { v4 } from 'uuid';
import CrudService from '../services/crudService';

/**
 * @description Crud controller class
 * @class CrudController
 */
export default class CrudController {
/**
     * @description get all anime controller
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async GetAnimes(req, res) {
    try {
      // extract search query from query
      const { searchQuery } = req.query;
      let resp;
      // if searchQuery is true
      if (searchQuery && searchQuery !== 'null' && searchQuery !== 'undefined') {
        // get anime response base on search query
        const searchResp = await CrudService.SearchAndQuery({ searchQuery });
        resp = searchResp.Items;
      } else {
        // get all response
        resp = await CrudService.GetMethod();
      }
      return res.status(200).send({
        data: resp
      });
    } catch (error) {
      return res.status(500).send({
        error: { message: 'Internal server error' }
      });
    }
  }

  /**
     * @description get all anime controller
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async CreateAnime(req, res) {
    try {
      const { sub } = req.userData;
      const { animeName, description, genre } = req.body;
      const resourceId = v4();
      const payload = {
        id: resourceId,
        userId: sub,
        animeName,
        description,
        genre,
        timestamp: new Date().getTime()
      };
      await CrudService.CreateMethod(payload);
      return res.status(200).send({
        message: 'Success! Resource created.'
      });
    } catch (error) {
      return res.status(500).send({
        error: { message: 'Internal server error' }
      });
    }
  }

  /**
     * @description get a single anime controller using userId
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async GetAnimeById(req, res) {
    try {
      const { id } = req.params;
      const resp = await CrudService.GetByIdMethod(id);
      if (!resp) {
        return res.status(404).send({
          error: { message: 'Resource not found' }
        });
      }
      return res.status(200).send({
        data: resp.Item
      });
    } catch (error) {
      return res.status(500).send({
        error: { message: 'Internal server error' }
      });
    }
  }

  /**
     * @description get a single anime controller using userId
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async DeleteAnimeById(req, res) {
    try {
      const { id } = req.params;
      const { sub } = req.userData;
      const findAnime = await CrudService.GetByIdMethod(id);
      // if resource is not found return error message
      if (Object.keys(findAnime).length === 0) {
        return res.status(404).send({
          error: { message: 'Not found' }
        });
      }
      // if auth user tend to delete a resource he didn't create return authorize message.
      if (findAnime.Item.userId !== sub) {
        return res.status(400).send({
          error: { message: 'You are not authorize to delete this resource' }
        });
      }
      // if every thing goes on fire the delete method
      await CrudService.DeleteByIdMethod(id);
      // return success message
      return res.status(200).send({
        message: 'Resource successfully deleted'
      });
    } catch (error) {
      return res.status(500).send({
        error: { message: 'Internal server error' }
      });
    }
  }

  /**
     * @description get a single anime controller using userId
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async UpdateAnimeById(req, res) {
    try {
      const { id } = req.params;
      const { sub } = req.userData;
      const { animeName, description, genre } = req.body;

      const findAnime = await CrudService.GetByIdMethod(id);

      // if auth user tend to delete a resource he didn't create return authorize message.
      if (Object.keys(findAnime).length === 0) {
        return res.status(400).send({
          error: {
            message: 'Resource not found'
            // 'You are not authorize to update this resource'
          }
        });
      }

      // if auth user tend to delete a resource he didn't create return authorize message.
      if (findAnime.Item.userId !== sub) {
        return res.status(400).send({
          error: { message: 'You are not authorize to update this resource' }
        });
      }

      const payload = {
        id,
        updateQuery: 'set animeName = :value, description = :des, genre = :gen',
        updateValues: {
          ':value': animeName,
          ':des': description,
          ':gen': genre
        },
        timestamp: new Date().getTime()
      };
      const resp = await CrudService.UpdateByIdMethod(payload);
      return res.status(200).send({
        message: 'Resource was successfully updated',
        data: resp.UpdatedAttributes.Attributes
      });
    } catch (error) {
      return res.status(500).send({
        error: { message: 'Internal server error' }
      });
    }
  }
}
