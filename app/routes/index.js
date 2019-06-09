import ticketRoutes from './ticket.routes';
import userRoutes from './user.routes';
import userAuthRoutes from './user.auth.routes';

const routes = router => {
  ticketRoutes(router);
  userRoutes(router);
  userAuthRoutes(router);
};

export default routes;
