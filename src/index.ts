import * as express from "express";
import { authRouter } from "./routers/authRouter";
import bodyParser = require("body-parser");
import { authenticateMiddleware } from "./middleware/authentication.middleware";
import { authorizationMiddleware } from "./middleware/authorization.middleware";
import { userRouter } from "./routers/userRouter";
import { reimbursementRouter } from "./routers/reimbursementRouter";
import * as fileUpload from "express-fileupload"
export const jwtkey  = process.env['SUPER_SECRET_CODE']


const app = express();



app.use(fileUpload());


app.use(bodyParser.json())
// login router gives the token with userId and userRol inside validated for 1 hour

// {
//     "username": "username",
//     "password": "password"
//  }
app.post('/api/login',authRouter)

//retrict the access to any route of our domain if you are not authenticated
app.use('',authenticateMiddleware)

//redirect to usersRouter
app.use('/api/users',userRouter);

//redirect to reimburstmentRouter
app.use('/api/reimbursement',reimbursementRouter);

app.use('/',(req,res)=>{
    res.status(501)
    res.json({
        message:'This url was not implemented in this API'
    })
})


app.listen(9050, ()=>{
    console.log('app has started');
})