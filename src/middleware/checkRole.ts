import { Request, Response, NextFunction } from 'express';

export const checkRole = (role: 'admin' | 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
