


const isAuth  = async (username,password) => {
    try{
        let res = await fetch('/userAuth',{
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username : username,
                password : password
            })
        });
        let resJson = await res.json();
        
        if(resJson.isAuth){
            await writeData('login',{
                ...resJson.loginData,
                username : username,
                password : password,
                
            });
        }
        
        return resJson.isAuth;
    }
    catch(e){
        console.log(e);
        return false;
    }
        
};

const isAuthorized = async () =>{
    let loginData = await readAllData('login');
    if(loginData.length>0){
        return true;
    }
    else{
        return false;
    }
};

