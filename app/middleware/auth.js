import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Authorize {
  isLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.SALT_SECRETE, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            status: false,
            message: 'Invalid token.',
            error
          });
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.expiresIn < currentTime)
          return res.status(401).send({
            status: false,
            message: 'Token has expired.'
          });

        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(401).send({
        status: 401,
        message: 'Access token required.'
      });
    }
  }

  isAdmin() {
    //
  }

  isAdminOrOwner() {
    //
  }
}

export default new Authorize();
