import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  email: string;
  permissao: string;
}

// Extende o tipo Request
interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
    permissao: string;
  };
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

   console.log('Authorization header:', authHeader); 

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = process.env.JWT_SECRET || 'segredo_super_secreto';
    const decoded = jwt.verify(token, secret) as TokenPayload;
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      permissao: decoded.permissao,
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

export const verificarProprietario = (req: CustomRequest, res: Response, next: NextFunction) => {
  const userId = Number(req.params.id);
  
  if (!req.user) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }
  
  if (req.user.id !== userId) {
    return res.status(403).json({ error: 'Você só pode editar seu próprio perfil' });
  }
  
  next();
};