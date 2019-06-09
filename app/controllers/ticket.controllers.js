import { Ticket } from '../models';
import errorHandlerUtils from '../utils/errorHandler.utils';

export default new class TicketController {
  async createTicket(req, res) {
    try {
      const ticket = await Ticket.create(req.body);
      return res.status(201).send({ success: true, ticket });
    } catch (error) {
      return res.status(400).send(errorHandlerUtils(error));
    }
  }

  async getAllTickets(req, res) {
    try {
      const tickets = await Ticket.findAll();
      return res.status(200).send({ success: true, tickets });
    } catch(error) {
      return res.status(400).send(errorHandlerUtils(error));
    }
  }

  async getTicket(req, res) {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket does not exist!' });
      }
      return res.status(200).send({ success: true, ticket });
    } catch(error) {
      return res.status(400).send(errorHandlerUtils(error))
    }
  }

  async updateTicket(req, res) {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket not found!' });
      }

      const updatedTicket = await ticket.update(req.body);
      return res.status(200).send({
        message: 'Ticket updated!',
        updatedTicket
      })
    } catch(error) {
      return res.status(400).send(errorHandlerUtils(error, 'Unable to update ticket!'));
    }
  }

  async deleteTicket(req, res) {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).send({ message: 'Ticket does not exist!' });
      }

      const updatedTicket = await ticket.destroy();
      return res.status(200).send({
        message: 'Ticket deleted!',
        updatedTicket
      })
    } catch(error) {
      return  res.status(400).send(errorHandlerUtils(error));
    }
  }
}
