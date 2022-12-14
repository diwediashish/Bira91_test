
let accountRec;
const initializeTechnicianLandingPage =async () => {
    let urlParam = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('account',urlParam.get('accountId'));
    showAccount();
    checkDailyTracker();
};

const checkDailyTracker = async () => {
    let dailyTracker = await getItemFromStore('dailyTracker',fetchCurrentDateIdStr());
    if(dailyTracker){
        const eventRec = await getItemFromStore('utility','event');
        if(eventRec&&eventRec.account.Id===accountRec.Id){
            objectivesRender(eventRec.event);
        }
        else{
            objectivesRender(null);
        }
    }
    else{
        $('.checkin').attr('disabled',true);
        $('.checkout').attr('disabled',true);
        $('.installation').css('display','none');
        $('.maintenance').css('display','none');
        $('.competition-insight').css('display','none');
        $('.pullout').css('display','none');
        $('.sales-order').css('display','none');
        $('.schedule-visit').css('display','none');
        let tmp = '' ;
        tmp += '<p class="text-center clickStart"> Click Start on Home Page to begin your visit !</p>';
        $('.installationText').html(tmp);
    }
};




const objectivesRender = async (currentEvent) => {
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
    $('.sales-order').prop('disabled',false);
    
    if(!currentEvent){
        $('.checkin').prop('disabled',false);
        $('.installation').prop('disabled',true);
        $('.maintenance').prop('disabled',true);
        $('.competition-insight').prop('disabled',true);
        $('.pullout').prop('disabled',true);
        $('.checkout').prop('disabled',true);
        await checkedInEventCheckNonSales();
    }
    else{
        $('.checkin').prop('disabled',true);
        $('.checkout').prop('disabled',false);
        $('.competition-insight').prop('disabled',false);
        $('.installation').prop('disabled',true);
        $('.maintenance').prop('disabled',true);
        $('.pullout').prop('disabled',true);
        let typeOfEvent = '';
        if(currentEvent.Type__c==='Installation' || currentEvent.Type__c==='Pre-Installation' ||currentEvent.Type__c==='Machine Commissioning' || currentEvent.Type__c === 'Training'){
            typeOfEvent ='Installation';
        }
        if(currentEvent.Type__c==='Draft Pullout'){
            typeOfEvent ='Draft Pullout';
        }
        if((currentEvent.Type__c === 'Draft Sanitization' || currentEvent.Type__c === 'Draft Preventive Maintenance')){
            typeOfEvent ='Maintenance';
        }
        if(typeOfEvent==='Installation'){
            $('.installation').prop('disabled',false);
        }
        if(typeOfEvent==='Draft Pullout'){
            $('.pullout').prop('disabled',false);
        }
        if(typeOfEvent==='Maintenance'){
            $('.maintenance').prop('disabled',false);
        }
        
    }
};


const checkInFucn =async () => {
    let urlParam = new URLSearchParams(window.location.search);
    if(!urlParam.has('eventId')){
        showNotification({message : 'No Event Selected from home Please select one!'});
        // Code to Popup and then select Event
    }
    else{
        showLoaderSpinner();
        const position = await getCurrentLocationHelper();
        let event = await getItemFromStore('events',urlParam.get('eventId'));
        let utility = {
            sobjectName : 'event',
            account : accountRec,
            event : event,
            eventKey : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+event.Type__c,
        };
        await writeData('utility',utility);
        event = {
            ...event,
            App_Id :fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+event.Type__c, 
            Actual_Start_Visit : new Date(),
            Check_In_Latitude : position.coords.latitude,
            Check_In_Longitude : position.coords.longitude,
            isSynced : false,
            Created_Date : new Date(),
            CheckedIn : true,
        };
        await writeData('eventsSync',event);
        await writeData('events',event);

        hideLoaderSpinner();
        objectivesRender(event);
    }
};
const CheckoutClick = async () => {
    const eventRec = await getItemFromStore('utility','event');
    // let accountRec = eventRec.account;
    // console.log(eventRec.event.Type__c)
    // const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+eventRec.event.Draft_Installation__c;
    
    // if(eventRec.event.Type__c === 'Pre-Installation'){
    //     let draftPreInstallation = await getItemFromStore('draftPreInstallation',key);
    //     console.log(draftPreInstallation)
    //     if(!draftPreInstallation){
    //         showNotification({message : 'Pre-Installation has not been created'});
    //         return;
    //     }
    // }
    
    window.location.href = '/view/objectives/checkout/checkout.html?accountId='+eventRec.account.Id;
};

const checkedInEventCheckNonSales = async() => {
    let eventUtility = await getItemFromStore('utility','event');
    if(eventUtility&&accountRec.Id!==eventUtility.account.Id){
        $('.checkin').attr('disabled',true);
        $('.checkout').attr('disabled',true);
        $('.installation').css('display','none');
        $('.maintenance').css('display','none');
        $('.competition-insight').css('display','none');
        $('.pullout').css('display','none');
        $('.sales-order').css('display','none');
        $('.schedule-visit').css('display','none');
        let tmp = '' ;
        tmp += `<p class="text-center"> Your visit on <a data-eventId="${eventUtility.event.Id}" data-accountId="${eventUtility.account.Id}"   onclick="handleAccountLandingRedirect(this)">${eventUtility.account.Name}</a> is currently in-progress. </p>`;
        $('.installationText').html(tmp);
        
        return false;
    }
    return true;
};

const handleAccountLandingRedirect = (ele) => {
    let accountId = $(ele).attr('data-accountId');
    let eventId = $(ele).attr('data-eventId');
    window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountId+'&eventId='+eventId;
};
initializeTechnicianLandingPage();