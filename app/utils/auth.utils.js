import jwt from 'jsonwebtoken';

require('dotenv').config();

const getToken = user => {
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  const data = { id: user.id };
  const token = jwt.sign(
    {
      expiresIn,
      user: data
    },
    process.env.SALT_SECRETE
  );

  return {
    token,
    expiresIn
  };
};

export default getToken;
