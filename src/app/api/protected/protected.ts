
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../middleware/auth';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is a protected route' });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, res, () => handler(req, res));
};
