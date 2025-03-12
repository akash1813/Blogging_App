const {validateToken} = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){

    return (req,res,next) =>{
        const tokenCookieValue = req.cookies[cookieName];      // use {npm i cookie-parser} middleware
        if(!tokenCookieValue){
           return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch(error){}

       return next();
    
    }
}

module.exports = {
    checkForAuthenticationCookie,
}