createLoader = () =>{
  if($('#loader-main').length === 0){
    let tmp = '';
    tmp +='<div id="loader-main" style="display:none;">';
    tmp +='<div class="loader1" >Loading...</div>';
    tmp +='</div>';    

    $('#app').append(tmp);
  }
};
createLoader();

showLoaderSpinner = () => {
    $('#loader-main').css('display', 'block');
  };
  
  hideLoaderSpinner = () => {
    $('#loader-main').css('display', 'none');
  };