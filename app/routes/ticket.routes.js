import TicketController from '../controllers/ticket.controllers';
import Authorize from '../middleware/auth';

const ticketRoutes = router => {
  const BASE_URL = '/tickets';
  router
    .route(`${BASE_URL}`)
    .post(TicketController.createTicket)
    .get(Authorize.isLoggedIn, TicketController.getAllTickets);

  router
    .route(`${BASE_URL}/:id`)
    .get(Authorize.isLoggedIn, TicketController.getTicket)
    .patch(Authorize.isLoggedIn, TicketController.updateTicket)
    .delete(Authorize.isLoggedIn, TicketController.deleteTicket);
};

export default ticketRoutes;
