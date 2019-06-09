import sendGridMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import errorHandlerUtils from './errorHandler.utils';

dotenv.config();

const sendMail = message => {
  sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sendGridMail.send(message);
};

export const sendUserMail = async (res, user, message, response) => {
  try {
    const mailResponse = await sendMail(message);
    if (mailResponse.Error) {
      return res.status(400).send({
        success: false,
        message: 'An error occurred in send message',
        error: mailResponse.error
      });
    }
    return res.status(201).send({
      success: true,
      message: response || `A verification email has been sent to ${user.email}.`
    });
  } catch (error) {
    return res.status(400).send(errorHandlerUtils(error, 'An error occurred in sending the mail.'));
  }
};

export default sendMail;
