const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const authenticate=require("../middleware/authentication.middelware");
router.get("/:userId", authenticate,async function (req, res) {

    try {
        var userId = req.param("userId");
        console.log(req.params.userId);

        var users = await User.find({}).select({userName:1,password:1});
        res.status(200).send(users);
    }
    catch (ex) {
        res.status(500).send("an error occurred" + ex);
    }

});

router.post("", async (req, res) => {
    var user = req.body;

    if (user) {
        try {
            var user = new User({ userName: req.body.userName, email: req.body.email, password: req.body.password, isActive: true });
            await user.save();
            console.log(user);
            res.send("user is posted successfully");
        }
        catch (e) {
            console.log(e);
        }



    }


});

router.post("/login", async (req, res) => {
    var user = req.body;

    if (user) {
        try {
            let _user=await User.findOne({userName:user.userName});
            if(!_user)
            {
                res.status(400).send("user name or password are incorrect");

            }
            else if(_user.password==user.password)
           {

             let token=_user.generateAuthToken();
             res.header("x-auth-token",token).send({});
           } 
           else 
           {
            res.status(400).send("user name or password are incorrect");
           }
        }
        catch (e) {
            console.log(e);
        }



    }


});
module.exports = router;