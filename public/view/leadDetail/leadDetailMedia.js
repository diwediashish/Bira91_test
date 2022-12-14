
const displayMediaCard = (mediaArr) => {
    let temp = '';
    console.log('Display Media Card');
    for(let i of mediaArr){
        temp = '<div class="col-sm-4 col-xs-6">';
        temp += '<div card="card"  >';
        temp += '<img  style="width:100%" src="data:image/png;base64, '+i.VersionData+'" alt="'+i.Title+'">';
        temp += '<div class="card-body">';
        temp += '<div class="card-text">'+i.Title+'</div>';
        temp += '</div>';
        temp += '</div>';
        temp += '</div>';
        $("#photosPanel").append(temp);
    }   
};
