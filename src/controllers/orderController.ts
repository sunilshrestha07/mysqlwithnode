import {Request, Response} from 'express';
import dbconnection from '../db/dbconnect';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await dbconnection.query('SELECT * FROM orders');

    if (!allOrders) {
      res.status(404).json({message: 'No orders found'});
      return;
    }

    res.status(200).json({
      message: 'All the orders',
      numberOfOrders: allOrders.length,
      allOrders: allOrders[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting orders'});
    return;
  }
};

export const insetOrder = async (req: Request, res: Response) => {
  const {userId, productId, quantity, totalprice} = req.body;
  try {
    if (!userId || !productId || !quantity || !totalprice) {
      res.status(400).json({message: 'All fields are required'});
      return;
    }
    const [newOrder]: any = await dbconnection.query('INSERT INTO orders (userId,productId,quantity,totalprice) VALUES (?,?,?,?)', [
      userId,
      productId,
      quantity,
      totalprice,
    ]);

    res.status(200).json({
      message: 'Order inserted successfully',
    });
  } catch (error) {
    res.status(500).json({message: 'Error in inserting orders', error});
    return;
  }
};

//get the order and user information in same query
export const getAllInfo = async (req: Request, res: Response) => {
  try {
    const allorderanduserinfo = await dbconnection.query('SELECT * FROM orders as o JOIN users as u ON o.userId = u.id');
    if (!allorderanduserinfo) {
      res.status(404).json({message: 'No orders found'});
      return;
    }
    res.status(200).json({
      message: 'All the orders',
      numberOfOrders: allorderanduserinfo.length,
      allOrders: allorderanduserinfo[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting orders'});
    return;
  }
};
