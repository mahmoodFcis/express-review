
module.exports = function (role) {

    return (req,res,next)=>{

        if(req.user.role==role)
        {
            next();
        }
        else
        {
            res.status(403);
        }
    }



}