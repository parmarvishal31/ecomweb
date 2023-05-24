import express from 'express'
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//routes object

const routes = express.Router();
// routes
//REGISTER ROUTE POST METHOD register

routes.post('/register', registerController)

// LOGIN ROUTE  POST METHOD
routes.post('/login', loginController)
// forgot routes

routes.post('/forgot-password', forgotPasswordController)

//test routes
routes.get("/test", requireSignIn, isAdmin, testController);

// protected user routes
routes.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
// protected admin routes
routes.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
//update profile
routes.put("/profile", requireSignIn, updateProfileController);

//orders
routes.get("/orders", requireSignIn, getOrdersController);

//all orders
routes.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
routes.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

export default routes