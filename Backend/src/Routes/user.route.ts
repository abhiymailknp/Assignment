import { FastifyInstance } from "fastify";
import validateInput from "../Middlewares/userValidation";
import { userSigninController, userSignupController } from "../controller/user.controller";

export const userRoutes  = (app:FastifyInstance,options:any,done:any)=>{

    app.all('/',async(request,reply)=>{
        reply.code(201).send({
            message : "Please signup or signin to test this"
        })
    })

    app.post('/signup',{preHandler : validateInput},userSignupController)
    app.post('/signin',userSigninController)

    done();
}