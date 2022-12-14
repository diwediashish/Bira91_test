const initializeLeadMediaPage =async () => {
    let urlParams = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('lead',urlParams.get('leadId'));
    showAccount();
    await fetchMedia(accountRec.Id);
};

const fetchMedia = async(accountId) => {
    showLoaderSpinner();
    if(navigator.onLine){
        
        let loginData = await loginDataFetch();
    let res = await fetch('/mediaList',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            username : loginData[0].username,
            password : loginData[0].password,
            accountId : accountId
        })
    });
    let resJson = await res.json();
    if(resJson.isError){
        console.log(resJson.message);
        // Add Notification method here
    }
    else if(resJson.isError===false){
        if(!resJson.isAuth){
            clearAll();
        }
        else{
            
            if(resJson.images.length>0){
                displayMediaCard(resJson.images);
            }
            else{
                let temp = '<div style="text-align:center">';
                temp += 'No Images Found!';
                temp += '</div>';
                $("#photosPanel").append(temp);
            }
            
        }
        
    }
    else{
        console.log(e);
        // Add Notification method here
        }
    }
    else{
        let temp = '<div style="text-align:center">';
                temp += 'You are not online!';
                temp = '</div>';
                $("#photosPanel").append(temp);
    }
    
    hideLoaderSpinner();
};
initializeLeadMediaPage();