import {Request, Response} from 'express';

const controllerTest = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: 'This is controller test',
    });
  } catch (error) {
    res.status(500).json({message: 'Error in controller test'});
  }
};

export default controllerTest;
