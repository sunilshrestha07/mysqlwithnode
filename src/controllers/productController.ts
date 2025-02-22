import {Request, Response} from 'express';
import dbconnection from '../db/dbconnect';

//get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await dbconnection.query('SELECT * FROM products');
    if (!allProducts) {
      res.status(404).json({message: 'No products found'});
      return;
    }

    res.status(200).json({
      message: 'All the products',
      numberOfProducts: allProducts.length,
      allProducts: allProducts[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting products'});
    return;
  }
};

//get specific products
export const getSpecificProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const [specificProduct]: any = await dbconnection.query('SELECT * FROM products WHERE id = ?', [id]);

    if (specificProduct.length === 0) {
      res.status(404).json({message: 'Product not found'});
      return;
    }
    res.status(200).json({
      message: 'Product found',
      specificProduct: specificProduct[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting products'});
    return;
  }
};

//delete specific product
export const deleteSpecificProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const [specificProduct]: any = await dbconnection.query('DELETE FROM products WHERE id = ?', [id]);

    if (specificProduct.affectedRows === 0) {
      res.status(404).json({message: 'Product not found'});
      return;
    }
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting products'});
    return;
  }
};

//insert new product
export const insertProduct = async (req: Request, res: Response) => {
  const {name, price, stock} = req.body;
  try {
    if (!name || !price || !stock) {
      res.status(404).json({message: 'All fields are required'});
      return;
    }
    const newProduct = await dbconnection.query('INSERT INTO product (name,price,stock) VALUES (?,?,?', [name, price, stock]);

    res.status(200).json({
      message: 'Product inserted successfully',
      newProduct,
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting products'});
    return;
  }
};

//update the product
export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {name, price, stock} = req.body;
  let updateFields = [];
  let updateValuse = [];

  if (name) {
    updateFields.push('name');
    updateValuse.push(name);
  }
  if (price) {
    updateFields.push('price');
    updateValuse.push(price);
  }
  if (stock) {
    updateFields.push('stock');
    updateValuse.push(stock);
  }

  try {
    const [updatedProduct]: any = await dbconnection.query(`UPDATE product SET ${updateFields.join(' = ?,')} =? WHERE id = ?`, [...updateValuse, id]);

    if (updatedProduct.affectedRows === 0) {
      res.status(404).json({message: 'Product not updated'});
      return;
    }

    res.status(200).json({
      message: 'Product updated successfully',
      updateProduct: updatedProduct[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting products'});
    return;
  }
};
