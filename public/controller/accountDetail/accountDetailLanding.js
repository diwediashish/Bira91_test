
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

let eventRec;
let eventRecV2;
let isPOSMAllowed = false;
let isDraftAllowed = false;
let isPulloutAllowed = false;
const initializeAccountDetail = async () => {
    
    let urlParam = new URLSearchParams(window.location.search);
    let accountId = urlParam.get('Id');
    let accountDetail = await getItemFromStore('account',accountId);
    accountRec = accountDetail;
    let posmSetting = (await getItemFromStore('utility','posmSettings')).posmSetting[0];
    let offRecordTypeArr = posmSetting.Off_Premise_Record_Type_Allowed__c ? posmSetting.Off_Premise_Record_Type_Allowed__c.split(',') : [];
    let onRecordTypeArr = posmSetting.On_Premise_Record_Type_Allowed__c ? posmSetting.On_Premise_Record_Type_Allowed__c.split(',') : [];
    if(offRecordTypeArr.indexOf(accountRec.RecordType.DeveloperName)>-1 ||onRecordTypeArr.indexOf(accountRec.RecordType.DeveloperName)>-1 ){
        isPOSMAllowed = true;
    }
    let draftSetting = (await getItemFromStore('utility','draftSettings')).draftSetting[0];
    if(draftCheck(draftSetting)){
        isDraftAllowed = true;
    }
    checkforPullout();
    showAccount();
    showSliderData();
    // Account Detail Page call
    // Account related Page Call Page call
};

const checkforPullout = () => {
    
    if(accountRec.Draft_Installations__r&&accountRec.Draft_Installations__r.records.length>0){
        for(let i of accountRec.Draft_Installations__r.records){
            if(i.RecordType&&i.RecordType.DeveloperName==='Installed'){
                isPulloutAllowed = true;
                break;
            }
        }
    }
};
const draftCheck = (draftSetting) => {
    
    if((draftSetting.Channel_Allowed__c&&(draftSetting.Channel_Allowed__c.split(',')).indexOf(accountRec.Channel__c)>-1)){
        return true;
    }
    for(let fieldValue of draftSetting.Account_Fields__c.split(',')){
        if(draftCheckHelper(fieldValue)){
            return true;
        }
    }
    return false;
};
const draftCheckHelper = (fieldValuePair) => {
    let field = fieldValuePair.split('=')[0];
    let value = fieldValuePair.split('=')[1];
    if(value==='true'||value==='false'){
        if(!accountRec[field]&&value==='true'){
            return false;
        }
        else if(accountRec[field]&&value==='false'){
            return false;
        }
    }
    else{
        if(accountRec[field]!==value){
            return false;
        }
    }
    
    return true;
};
const initializeObjectives = async () => {
    let urlParam = new URLSearchParams(window.location.search);
    let accountId = urlParam.get('Id');
    let events = await fetchRecordsUsingIndex('events','Account__c',accountId);
    let currentEvent = await getItemFromStore('utility','event');
    events = events.filter(ele => {
        let eventDate = new Date ((ele.Start_date_and_time__c).substring(0,(ele.Start_date_and_time__c).length-2)+':00');
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        return (eventDate.getTime()===currentDate.getTime());
    });
    let currentEventChecked = '';
    if(currentEvent){
        let eventDate = new Date ((currentEvent.Start_date_and_time__c).substring(0,(currentEvent.Start_date_and_time__c).length-2)+':00');
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        if((eventDate.getTime()!==currentDate.getTime())){
            await deleteItemFromData('utility','event');
            currentEvent = null;
        }
    }
    if(currentEvent&&events.length>0){
        if(events[0].Id === currentEvent.Id){
            currentEventChecked = 'currentEvent';
        }
        else{
            currentEventChecked = 'differentEvent';
        }
    }
    else{
        currentEventChecked = 'noEvent';
    }
    if(events[0]&&events[0].Completed__c){
        currentEventChecked = 'isCompleted';
    }
    //fetchMedia(accountId);
    //checkedIn(events[0]);// Dummy method
    showObjectives(events[0],currentEventChecked);
    eventRec = events[0];
    // Cal event display method with 0 index
    // if isCompleted  :  Disable all the options
    // if currentEvent : Disable check in and enable all other Items 
    // if differentEvent : Disable all option
    // if noEvent : Enable check in and disable all other option
    
};

const initializeObjectivesV2 = async() => {
    let dailyTracker = await getItemFromStore('dailyTracker',fetchCurrentDateIdStr());
    if(dailyTracker){
        const eventSyncKey = fetchCurrentDateIdStr()+'-'+accountRec.Id;
        eventRecV2 = await getItemFromStore('eventsSync',eventSyncKey);

        if(eventRecV2){
            showObjectivesV2(eventRecV2.CheckedIn);
        }
        else{
            showObjectivesV2(false);
        }
    }
    else{
        $('.check-in').attr('disabled',true);
        $('.check-out').attr('disabled',true);
        let tmp = '' ;
        tmp += '<p class="text-center"> Click Start on Home Page to begin your visit !</p>';
        $('#listofEvent').html(tmp);

    }
    
    
};

const checkedIn = () => {
    createLoader();
    setTimeout(async() => {
        await checkedInFunc();
    },100);
};
// On returning value from this function disable checkIn and enable all other buttons
// const checkedInFunc =async  () => {
//     try{
        
//         navigator.geolocation.getCurrentPosition(success, checkError, {
//             enableHighAccuracy: false,
//             timeout: 6000,
//             maximumAge: 0
//         });
        
//        // return true; // Make checkin disable and others enable
//     }
//     catch(e){
//         console.log(e);
//         $('#loader-main').css('display','none');
//         showNotification({message:'An unknown error occurred.'+e});
//     }
//         //return false;// Display custom error message on front page 
// };
const checkedInFunc =async  () => {
    try{
        
        navigator.geolocation.getCurrentPosition(successV2, checkError, {
            enableHighAccuracy: false,
            timeout: 12000,
            maximumAge: 0
        });
        
       // return true; // Make checkin disable and others enable
    }
    catch(e){
        console.log(e);
        $('#loader-main').css('display','none');
        showNotification({message:'An unknown error occurred.'+e});
    }
        //return false;// Display custom error message on front page 
};


const checkError = (e) => {
    switch(e.code) {
        case 1:
          showNotification({message:'User denied the request for Geolocation.'});
          //x.innerHTML = "User denied the request for Geolocation."
          //Display notification using above message;
          break;
        case 2:
          showNotification({message:'Location information is unavailable.'});
          //x.innerHTML = "Location information is unavailable."
          //Display notification using above message;
          break;
        case 3:
          showNotification({message:'The request to get user location timed out.'});
          //x.innerHTML = "The request to get user location timed out."
          //Display notification using above message;
          break;
        default:
          showNotification({message:'An unknown error occurred.'});
          //x.innerHTML = "An unknown error occurred."
          //Display notification using above message;
          break;
      }
      
      hideLoader();
      
  
  //return false;// Display custom error message on front page 
};
const success = async (position) => {

    eventRec.Check_In_Latitude__s = position.coords.latitude;
    eventRec.Check_In_Longitude__s = position.coords.longitude;
    eventRec.Actual_Start_Visit__c = new Date();
    await writeData('events',eventRec);
    await writeData('eventsSync',eventRec);
    await writeData('utility',{
        ...eventRec,
        sobjectName : 'event'
    });
    
    initializeObjectives();
    $('#loader-main').css('display','none');
};

const successV2 = async(position) => {
    const eventSyncKey = fetchCurrentDateIdStr()+'-'+accountRec.Id;
    eventRecV2 = await getItemFromStore('eventsSync',eventSyncKey);
    let utility = {
        sobjectName : 'event',
        account : accountRec,
    };

    await writeData('utility',utility);
    if(!eventRecV2){
        eventRecV2 = {
            App_Id : fetchCurrentDateIdStr()+'-'+accountRec.Id,
            Actual_Start_Visit : new Date(),
            Check_In_Latitude : position.coords.latitude,
            Check_In_Longitude : position.coords.longitude,
            Account : accountRec.Id,
            isSynced : false,
            Created_Date : new Date()
        };
    }
    eventRecV2.CheckedIn = true;
    
    await writeData('eventsSync',eventRecV2);
    showObjectivesV2(true);
    $('#loader-main').css('display','none');
};
const checkOut = () => {
    const checkoutAccId = accountRec.Id;
    let urlParam = new URLSearchParams(window.location.search);

    if(urlParam.get('eventId'))
    {
        window.location.href = `/view/objectives/checkout/checkout.html?accountId=${checkoutAccId}&eventId=${urlParam.get('eventId')}`;
    }else{
        window.location.href = `/view/objectives/checkout/checkout.html?accountId=${checkoutAccId}`;
    }
};

const initializeLanding = () => {
    showLoader();
    setTimeout(async () => {
        await initializeAccountDetail();
        await initializeObjectivesV2();
        hideLoader();
    },1);
};
initializeLanding();

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
