exports.postLogin = async (req,res,next) => {
    try{
        let sfConnection = req.conn;
        let username = req.body.username;
        let loginData = await sfConnection.sobject('User')
            .find({
                Username : username
            },{
                Id : 1,
                FirstName : 1,
                Profile_Name__c : 1,
            })
            .limit(1)
            .execute();
        
        
        res.status(200).json({isError : false,isAuth : true,loginData : loginData[0]});
    }
    catch(e){
        console.log(e);
        res.status(500).json({isError : true,isAuth : false,message : e});
    }
}