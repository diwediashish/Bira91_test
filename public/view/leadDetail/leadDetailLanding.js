



slickSlider = () => {
    $('.silder').slick({
        centerMode: true,
        slidesToShow: 2,
        autoplay: false,
        dots: true,
        infinite: false,
        arrows: false,
        adaptiveHeight: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1 
                }
      },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1
                }
      }
    ]
    });
    $('.silder').on('afterChange', function() {
        var dataId = $('.slick-current').attr("data-slick-index");    
        console.log(dataId);
        if(dataId == 1)
        {
            $('#sliderInfo').css('display','block');
        }    
        else{
            $('#sliderInfo').css('display','none');
        }
    });
  };
  var xCoordStart,
  yCoordStart,
  xSlideTrigger = 10,
  slickElement = $(".silder")

slickElement.bind('touchstart', function (e){
xCoordStart = e.originalEvent.touches[0].clientX;
yCoordStart = e.originalEvent.touches[0].clientY;
});

slickElement.bind('touchend', function (e){
var xCoordEnd = e.originalEvent.changedTouches[0].clientX;
var yCoordEnd = e.originalEvent.changedTouches[0].clientY;

var deltaX = Math.abs(xCoordEnd - xCoordStart)
var deltaY = Math.abs(yCoordEnd - yCoordStart)

if(deltaX > deltaY){  
  if(xCoordStart > xCoordEnd + xSlideTrigger){
    slickElement.slick('slickNext');
  }
  else if(xCoordStart < xCoordEnd + xSlideTrigger){
    slickElement.slick('slickPrev');
  }
}

});



showSliderData = () => {
    let billedArray = [];
    
    if(accountRec.L1M_Billed_Liquids__c){
        billedArray = billedArray.concat(billedLiquidsArrayGenerator(accountRec.L1M_Billed_Liquids__c,'billed_green'));
    }
    if(accountRec.L3M_Billed_Liquids__c){
        billedArray = billedArray.concat(billedLiquidsArrayGenerator(accountRec.L3M_Billed_Liquids__c,'billed_yellow'));
    }
    if(accountRec.Ever_Billed_Liquids__c){
        billedArray = billedArray.concat(billedLiquidsArrayGenerator(accountRec.Ever_Billed_Liquids__c,'billed_red'));
    }
    if(accountRec.Never_Billed_Liquids__c){
        billedArray = billedArray.concat(billedLiquidsArrayGenerator(accountRec.Never_Billed_Liquids__c,'billed_grey'));
    }
    
    
    let tmp = '';
    if (accountRec) {
        tmp += '  <div class="item backColor">';
        tmp += '        <div class="sales-avg text-center">';
        tmp += '            <p>MTD Premium</p>';
        tmp += '<h5>'+             (accountRec.MTD_Sales_Premium__c ? Math.round(parseFloat(accountRec.MTD_Sales_Premium__c)) : 'NA')+'</h5>';
        tmp += '        </div>';
        tmp += '        <div class="sales-avg text-center">';
        tmp += '            <p>MTD Overall</p>';
        tmp += '<h5>'+             (accountRec.MTD_Sales__c ? Math.round(parseFloat(accountRec.MTD_Sales__c)):'NA')+'<h5>';
        tmp += '        </div>';
        tmp += '        <div class="sales-avg text-center">';
        tmp += '            <p>L3M Premium Avg</p>';
        tmp += '<h5>'+             (accountRec.L3M_Sales_Avg_Premium__c ? Math.round(parseFloat(accountRec.L3M_Sales_Avg_Premium__c)) : 'NA')+'<h5>';
        tmp += '        </div>';
        tmp += '        <div class="sales-avg text-center">';
        tmp += '            <p>L3M Overall Avg</p>';
        tmp += '<h5>'+             (accountRec.L3M_Sales_Avg__c ? Math.round(parseFloat(accountRec.L3M_Sales_Avg__c)) : 'NA')+'</h5>';
        tmp += '        </div>';
        tmp += '  </div>';
        
            tmp +='<div class="item" id="billedSlider">';
            if(billedArray.length>0){
                for(var i = 0;i < billedArray.length;i++){
                    tmp+='<div class="billed '+billedArray[i].Class+'"><p>'+billedArray[i].Name+'</p>';
                    tmp+='</div>';
                }
                for(var j=0;j<(9-billedArray.length);j++){
                    tmp+='<div class="billed" style="vertical-align:bottom;"> &nbsp;';
                    tmp+='</div>';
                }

                // tmp +='    <p class="legends billed_green">Last 1M Billed </p>';
                // tmp +='    <p class="legends billed_yellow">Last 3M Billed</p>';
                // tmp +='    <p class="legends billed_red">Ever Billed</p>';
                // tmp +='    <p class="legends billed_grey">Never Billed</p>';
                
               
            }
            else{
                tmp += '<h4>No information found on Masters! Contact System Administrator.</h4>';
            }
            
            tmp +='</div>';
            
        $('#accountSlider').prepend(tmp);
       
        
        slickSlider();
        let tool = '';
        tool+='<div class="tooltip" id="sliderInfo"><img src="/media/icons/info.png"/>';
        tool+='  <span class="tooltiptext"><p class="legends billed_green">Last 1M Billed </p><p class="legends billed_yellow">Last 3M Billed</p><p class="legends billed_red">Ever Billed</p><p class="legends billed_grey">Never Billed</p></span>';
        tool+='</div>';
        $('#accountSlider').append(tool);
    }
  
  }; 

    
const billedLiquidsArrayGenerator = (values,className ) => {
    let tempArr = [];
    for(let i of values.split(',')){
        tempArr.push({
            Name : i,
            Class : className
        });

    }
    return tempArr;
};
