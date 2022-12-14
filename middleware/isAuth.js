// SF library for connection and authenticating user
const jsforce = require('jsforce');


module.exports = async (req,res,next) => {
    try{
        let username = req.body.username;
        let password = req.body.password;
        let connectionUrl = process.env.SFURL || 'https://bira91--beastapp.sandbox.my.salesforce.com/';
        const conn = new jsforce.Connection({
            loginUrl : connectionUrl,
            maxRequest : 100
        });
        await conn.login(username,password);
        req.conn = conn;
        next();
    }
    catch(e){
        console.log(e);
        res.status(401).json({isAuth : false,isError : false,message : e});
    }
};
