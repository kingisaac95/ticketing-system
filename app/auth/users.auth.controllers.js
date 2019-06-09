import { User } from '../models';
import getToken from '../utils/auth.utils';
import errorHandlerUtils from '../utils/errorHandler.utils';

class UserAuthController {
  async login(req, res) {
    if (!(req.body.username && req.body.password)) {
      return res.status(400).send({ success: false, message: 'Provide all required fields' });
    }

    try {
      const user = await User.findOne({
        where: { email: req.body.username }
      });

      if (!user)
        return res.status(400).send({
          success: false,
          message: 'User does not exist'
        });

      if (!user.matchPassword(req.body.password)) {
        return res.status(400).send({
          success: false,
          message: 'Authorization failed. Check login credentials',
        });
      }

      const { token, expiresIn } = getToken(user);
      return res.status(200).send({
        success: true,
        token,
        expiresIn
      });
    } catch (error) {
      res.status(400).send(errorHandlerUtils(error));
    }
  }

  async logout(req, res) {
    if (req.body.username) return res.status(404).send({
      success: false,
      message: 'Invalid user!'
    });

    try {
      const user = User.findOne({
        where: { email: req.body.username }
      });

      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist!'
        });
      }

      return res.status(200).send({
        success: true,
        message: 'User has been logged out!'
      });
    } catch (error) {
      return res.status(400).send(errorHandlerUtils(err));
    }
  }

  async resetPassword(req, res) {
    const { username, password, newPassword } = req.body;
    if (!(username && password && newPassword))
      return res.status(400).send({
        success: false,
        message: 'Provide all required fields.'
      });

    try {
      const user = await User.findOne({
        where: { username }
      });

      if (user.username !== username)
        return res.status(401).send({
          success: false,
          message: 'You are not authorized to make this action.'
        });

      if (!user.matchPassword(password))
        return res.status(401).send({
          success: false,
          message: 'Authorization failed. Check credentials'
        });

      await user.update({ password: newPassword });

      return res.status(200).send({
        success: true,
        message: 'Your password have been updated!',
      });
    } catch (error) {
      return res.status(400).send(errorHandlerUtils(error, 'Unable to update password'));
    }
  }
}

export default new UserAuthController();
