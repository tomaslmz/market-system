/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../env';

import User from '../models/User';
import UserPhoto from '../models/UserPhoto';

declare module 'express-serve-static-core' {
    interface Request {
      user: {
        id: number,
        email: string,
        token: string
      }
    }
  }

class TokenController {
  async create(req: Request, res: Response) {
    try {
      const { email = '', password = '' } = req.body;

      if(!email || !password) {
        throw new Error('Insert a valid login!');
      }

      const newUser = await User.findOne({
        where: {
          email
        },
        include: {
          model: UserPhoto,
          as: 'photo',
        }
      });

      if(!newUser) {
        throw new Error('User not found!');
      }
      
      const correctPassword = await newUser.comparePassword(password);
      
      if(!correctPassword) {
        throw new Error('The password is incorrect!');
      }
      
      const { id, level_access } = newUser;
      const passwordHash = newUser.password;

      const token = jwt.sign({ id, email, passwordHash, level_access }, env.SECRET_TOKEN, {
        expiresIn: env.TOKEN_EXPIRATION
      });

      req.user = { id, email, token };

      res.cookie('auth', token, {
        httpOnly: true,
        maxAge: 15000 * 60 * 60 * 24
      });

      res.cookie('name', newUser.name, {
        maxAge: 15000 * 60 * 60 * 24 
      });

      res.cookie('email', email, {
        maxAge: 15000 * 60 * 60 * 24 
      });

      res.cookie('loginStatus', 'true', {
        maxAge: 15000 * 60 * 60 * 24 
      });

      res.cookie('photo', newUser.photo?.url, {
        maxAge: 15000 * 60 * 60 * 24
      });

      return res.json({ 
        status: 'Ok!',
        message: 'Your session has been authenticated',
        data: {
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
          }
        }
      });
    } catch(err: any) {
      return res.status(500).json({
        status: 'Internal server error!',
        message: err.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.clearCookie('auth');
      res.clearCookie('name');
      res.clearCookie('email');
      res.clearCookie('loginStatus');
      res.clearCookie('photo');

      res.status(200).json({
        status: 'Successfull logout!',
        message: 'You have been logout successfully!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Internal error server!',
        message: err.message
      });
    }
  }
}

export default new TokenController();