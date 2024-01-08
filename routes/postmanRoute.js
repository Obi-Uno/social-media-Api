const { Router }= require('express');
const postManRouter =Router();
const postmanControllers= require('../controllers/postmanController');

postManRouter.get('/find',postmanControllers.findOne);

postManRouter.get('/find/all',postmanControllers.findAll);

postManRouter.post('/one',postmanControllers.postOne);

postManRouter.post('/many',postmanControllers.postMany);

postManRouter.delete('/delete',postmanControllers.deleteOne);

postManRouter.patch('/update',postmanControllers.patch);

postManRouter.put('/replace',postmanControllers.replace);



module.exports =postManRouter;