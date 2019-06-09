import { User } from '../models';
import errorHandlerUtils from '../utils/errorHandler.utils';

export default new class UserController {
  async addUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).send({ success: true, user });
    } catch (error) {
      return res.status(400).send(errorHandlerUtils(error));
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).send({ success: true, users });
    } catch(error) {
      return res.status(400).send(errorHandlerUtils(error));
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User does not exist!' });
      }
      return res.status(200).send({ success: true, user });
    } catch(error) {
      return res.status(400).send(errorHandlerUtils(error))
    }
  }

  async updateUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found!' });
      }

      const updatedUser = await user.update(req.body);
      return res.status(200).send({
        message: 'User updated!',
        updatedUser
      })
    } catch(error) {
      return res.status(400).send(errorHandlerUtils(error, 'Unable to update user!'));
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User does not exist!' });
      }

      const updatedUser = await user.destroy();
      return res.status(200).send({
        message: 'User deleted!',
        updatedUser
      })
    } catch(error) {
      return  res.status(400).send(errorHandlerUtils(error));
    }
  }
}
