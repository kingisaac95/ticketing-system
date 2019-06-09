import UserController from '../controllers/user.controllers';
import Authorize from '../middleware/auth';

const userRoutes = router => {
  const BASE_URL = '/users';
  router
    .route(`${BASE_URL}`)
    .post(UserController.addUser)
    .get(Authorize.isLoggedIn, UserController.getAllUsers);

  router
    .route(`${BASE_URL}/:id`)
    .get(Authorize.isLoggedIn, UserController.getUser)
    .patch(Authorize.isLoggedIn, UserController.updateUser)
    .delete(Authorize.isLoggedIn, UserController.deleteUser);
};

export default userRoutes;
