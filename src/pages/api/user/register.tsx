import { validateError } from "utils/functions";
import dbConnect  from "utils/mongodb";
import User from "../../../models/User";

import middlewareTokenVerify from "../middlewares/tokenVerify";
const message = require("../../../utils/messages");

dbConnect()

export default async (req, res) => {
    const {method} = req;
    const { authorization } = req.headers;

        try{
            req.body.confirmPassword = undefined

            const user = await User.create(req.body);
            user.password = undefined
            
            return res.status(200).send(message(0, user))
        }catch(error){
            const err = await validateError(error);
            return res.status(400).send(err)
        }
    };
