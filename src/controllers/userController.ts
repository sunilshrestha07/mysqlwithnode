import {Request, Response} from 'express';
import dbconnection from '../db/dbconnect';

//get all the users form the db
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await dbconnection.query('SELECT * FROM users');
    if (!allUsers) {
      res.status(404).json({message: 'No users found'});
      return;
    }

    res.status(200).json({
      message: 'All the users',
      numberOfUsers: allUsers.length, // Fixed typo
      allUsers: allUsers[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting users'});
    return;
  }
};

//insert into the database
export const insertUser = async (req: Request, res: Response) => {
  const {username, email, password} = req.body;
  try {
    if (!username || !email || !password) {
      res.status(404).json({message: 'All fields are required'});
      return;
    }

    const [newUser]: any = await dbconnection.query('INSERT INTO users (username,email,password) VALUES (?, ?, ?)', [username, email, password]);

    if (newUser.affectedRows === 0) {
      res.status(404).json({message: 'User not inserted'});
      return;
    }

    res.status(200).json({
      message: 'User inserted successfully',
    });
  } catch (error) {
    res.status(500).json({message: 'Error in inserting users'});
    return;
  }
};

//get specific users
export const specificUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await dbconnection.query('SELECT * FROM users WHERE id = ?', [id]);
    res.status(200).json({
      message: 'User found',
      user: user[0],
    });
  } catch (error) {
    res.status(500).json({message: 'Error in getting users'});
    return;
  }
};

//delete specific user
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const [user]: any = await dbconnection.query('DELETE FROM users WHERE id=?', [id]);
    if (user.affectedRows === 0) {
      res.status(404).json({message: 'User not deleted'});
      return;
    }

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({message: 'Error in deleting users', error});
    return;
  }
};

//update specific user
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {username, email, password} = req.body;
  let updateFields = [];
  let updateValues = [];

  //if username is provide then only update the username
  if (username) {
    updateFields.push('username');
    updateValues.push(username);
  }
  //if email is provide then only update the email
  if (email) {
    updateFields.push('email');
    updateValues.push(email);
  }
  //if password is provide then only update the password
  if (password) {
    updateFields.push('password');
    updateValues.push(password);
  }
  try {
    const [updateUser]: any = await dbconnection.query(`UPDATE users SET ${updateFields.join(' = ?, ')} = ? WHERE id = ?`, [...updateValues, id]);
    if (updateUser.affectedRows === 0) {
      res.status(404).json({message: 'User not updated'});
      return;
    }

    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    res.status(500).json({message: 'Error in updating users', error});
    return;
  }
};
