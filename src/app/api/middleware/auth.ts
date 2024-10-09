// middleware/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  });
};
