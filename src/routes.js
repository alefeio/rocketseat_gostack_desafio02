import { Router } from 'express'
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'
import DeliverymanController from './app/controllers/DeliverymanController'
import FileController from './app/controllers/FileController'
import OrderController from './app/controllers/OrderController'

import authMiddlewares from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig);

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)

routes.put('/users', UserController.update)

routes.post('/recipients', RecipientController.store)
routes.put('/recipients/:id', RecipientController.update)

routes.get('/deliverymans', DeliverymanController.index)
routes.post('/deliverymans', DeliverymanController.store)
routes.put('/deliverymans/:id', DeliverymanController.update)
routes.delete('/deliverymans/:id', DeliverymanController.delete)

routes.post('/orders', OrderController.store)

routes.post('/files', upload.single('file'), FileController.store)

export default routes
