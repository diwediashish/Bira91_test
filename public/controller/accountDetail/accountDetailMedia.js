const initializeAccountDetail = async () => {
    let urlParam = new URLSearchParams(window.location.search);
    let accountId = urlParam.get('Id');
    let accountDetail = await getItemFromStore('account',accountId);
    accountRec = accountDetail;
    showAccount();
    await fetchMedia(accountRec.Id);
    // Account Detail Page call
    // Account related Page Call Page call
    let tmp = `<div id="overlay"></div>`;
    $('#app').append(tmp);
};
const fetchMedia = async(accountId) => {
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
            if(resJson.images){
                displayMediaCard(resJson.images);
            }
            else{
                let temp = '<div style="text-align:center">';
                temp += 'No Images Found!';
                temp = '</div>';
                $("#photosPanel").append(temp);
            }
            
        }
    }
    else{
        console.log(e);
        // Add Notification method here
    }

};

// const displayMediaCard = (mediaArr) => {
//     let temp = '';
//     for(let i of mediaArr){
//         temp = '<div class="col-sm-4 col-xs-6">';
//         temp += '<div card="card"  >';
//         temp += '<img  style="width:100%" src="data:image/png;base64, '+i.VersionData+'" alt="'+i.Title+'">';
//         temp += '<div class="card-body">';
//         temp += '<div class="card-text">'+i.Title+'</div>';
//         temp += '</div>';
//         temp += '</div>';
//         temp += '</div>';
//         $("#photosPanel").append(temp);
//     }
    
    

// };
const displayMediaCard = (mediaArr) => {
    let temp = '';
    let mediaMap = new Map();
    for(let i of mediaArr){
        let mediaList = new Array();
        
        if(mediaMap.has(i.Title.split('|')[1]))
        {
            mediaMap.get(i.Title.split('|')[1]).filter((obj) =>{
                mediaList.push(obj);
            });
            mediaList.push(i);
            mediaMap.set(i.Title.split('|')[1],mediaList)
        }
        else if(mediaMap.has('Others'))
        {
            mediaMap.get('Others').filter((obj) =>{
                mediaList.push(obj);
            });
            mediaList.push(i);
            mediaMap.set('Others',mediaList)
        }
        else{
            if(i.Title.split('|').length > 1){
                mediaList.push(i);
                mediaMap.set(i.Title.split('|')[1],mediaList)
            }else{
                mediaList.push(i);
                mediaMap.set('Others',mediaList)
            }
        }
    }
console.log(mediaMap);
    mediaMap.forEach((value,key) =>{
        let collapse;// = '#'+key.trim('').split(' ')[0];
        if(key.trim('').split(' ')[1]){
            collapse = key.trim('').split(' ')[1];
        }else{
            collapse = key.trim('').split(' ')[0];
        }
        temp +=`
        
        <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title" data-toggle="collapse" data-target="#${collapse}">
                ${key}
            </h4>
        </div>

        <div id="${collapse}" class="panel-collapse collapse">
            <div class="panel-body">
                <div class="row"> 
        `;
        for(let i = 0;i<value.length;i++)
        {
            let title = '';
            if(key === 'Competitor Insights'){
                title = value[i].Title.split('|').splice(2,5);
            }else if(key === 'Others'){
                title = value[i].Title; 
            }else{
                title = value[i].Title.split('|').splice(3,5);
            }
            temp += `
            <div class="col-sm-4 col-xs-6">
                <div card="card"  >
                    <img onclick="showPreview(this)" style="width:100px;margin:auto" src="data:image/png;base64, ${value[i].VersionData}" alt="${value[i].Title}">
                <div class="card-body">
                    <div class="card-text">${title}</div>
                </div>
                </div>
            </div>
            `;
        }

        temp +=`
                    </div>
                </div>
            </div>
        </div>`;
    });
    $("#photosPanel").append(temp);                         
};

const showPreview = (ele) =>{
    $('#overlay')
    .css({backgroundImage: `url("${ele.src}")`})
    .addClass('open')
    .one('click', function() { $('#overlay').removeClass('open'); });
};

const initializeMedia = () => {
    showLoader();
    setTimeout(async() => {
        await initializeAccountDetail();
        hideLoader();
    },1);
};

initializeMedia();