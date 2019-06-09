import userAuthController from '../auth/users.auth.controllers';
import Authorize from '../middleware/auth';

const userAuthRoutes = router => {
  const BASE_URL = '/users';

  router.route(`${BASE_URL}/login`).post(userAuthController.login);

  router.route(`${BASE_URL}/logout`).post(userAuthController.logout);

  router.route(`${BASE_URL}/reset`).patch(Authorize.isLoggedIn, userAuthController.resetPassword);
};

export default userAuthRoutes;
