let isPOSMAllowed = false;
const initializeLeadLandingPage =async () => {
    showLoaderSpinner();
    setTimeout(async () => {
        let urlParams = new URLSearchParams(window.location.search);
        accountRec = await getItemFromStore('lead',urlParams.get('leadId'));
        showAccount();
        showSliderData();
        await initializeObjectivesV2();
        hideLoaderSpinner();
    },1);
    
};

const checkedIn = () => {
    showLoaderSpinner();
    setTimeout(async() => {
        await checkedInFunc();
    },100);
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
      
      hideLoaderSpinner();
      initializeObjectives();
  
  //return false;// Display custom error message on front page 
};


handleObjective = (element) => {
    const objectivetype = element.dataset.objectivetype;
    
    if(objectivetype==='Sales Order'){
        window.location.href = `/view/objectives/salesOrder/salesOrderLanding.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='KYC and Classification'){
        window.location.href = `/view/objectives/kycDetail/segmentation.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Stock/Visibility Survey'){
        window.location.href = `/view/objectives/stockVisibility/stockVisibility.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Competition Insights'){
        window.location.href = `/view/objectives/competitorInsights/competitionInsightsPage1.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Pre-Sales'){
        window.location.href = `/view/objectives/preSales/preSalesLanding.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='POSM Requisition'){
        window.location.href = `/view/objectives/posm/posm.html?accountId=${accountRec.Id}`;
    }
    
};

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
        hideLoaderSpinner();
        showNotification({message:'An unknown error occurred.'+e});
    }
        //return false;// Display custom error message on front page 
};
const checkOut = () => {
    const checkoutAccId = accountRec.Id;
    
    window.location.href = `/view/objectives/checkout/checkout.html?accountId=${checkoutAccId}`;
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
initializeLeadLandingPage();