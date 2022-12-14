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
            objectivesRender(eventRec);
        }
        else{
            objectivesRender(null);
        }
    }
    else{
        $('.check-in').attr('disabled',true);
        $('.check-out').attr('disabled',true);
        $('.audit-btn').css('display','none');
        
        let tmp = '' ;
        tmp += '<p class="text-center"> Click Start on Home Page to begin your visit !</p>';
        $('#listofAudit').html(tmp);
    }
};




const objectivesRender = async (currentEvent) => {
    
    if(currentEvent){
        let event = await getItemFromStore('eventsSync',currentEvent.eventKey);
        let eventDate = new Date ((event.Actual_Start_Visit));
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        if((eventDate.getTime()!==currentDate.getTime())){
            await deleteItemFromData('utility','event');
            currentEvent = null;
        }
    }
    if(!currentEvent){
        
        const eventRec = await getItemFromStore('utility','event');
        $('.check-in').prop('disabled',false);
        $('#wareHouseQualityCheck').prop('disabled',true);
        $('#brandFreshness').prop('disabled',true);
        $('#chemicalCIP').prop('disabled',true);
        $('.check-out').prop('disabled',true);
        await checkedInEventCheckNonSales();
    }
    else{
        $('.check-in').prop('disabled',true);
        $('.check-out').prop('disabled',false);
        $('#wareHouseQualityCheck').prop('disabled',false);
        $('#brandFreshness').prop('disabled',false);
        $('#chemicalCIP').prop('disabled',false);
    }
};

const checkedInEventCheckNonSales = async() => {
    let eventUtility = await getItemFromStore('utility','event');
    if(eventUtility&&accountRec.Id!==eventUtility.account.Id){
        $('.check-in').attr('disabled',true);
        $('.check-out').attr('disabled',true);
        let tmp = '' ;
        tmp += `<p class="text-center"> Your visit on <a data-accountId="${eventUtility.account.Id}"   onclick="handleAccountLandingRedirect(this)">${eventUtility.account.Name}</a> is currently in-progress. </p>`;
        $('#listofAudit').html(tmp);
        $('.audit-btn').css('display','none');
        return false;
    }
    return true;
};

const handleAccountLandingRedirect = (ele) => {
    let accountId = $(ele).attr('data-accountId');
    window.location.href = '/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountId;
};

const checkInFucn =async () => {
    let urlParam = new URLSearchParams(window.location.search);
    let event;
    let utility;
    showLoaderSpinner();
    if(!urlParam.has('eventId')){
        const position = await getCurrentLocationHelper();
        utility = {
            sobjectName : 'event',
            account : accountRec,
            eventKey : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'Auditor',
        };
        event = {
            App_Id :fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'Auditor', 
            Actual_Start_Visit : new Date(),
            Check_In_Latitude : position.coords.latitude,
            Check_In_Longitude : position.coords.longitude,
            isSynced : false,
            Created_Date : new Date(),
            CheckedIn : true,
            Account : accountRec.Id,
            Account__c : accountRec.Id,
        };
        
        
    }
    else{
        const position = await getCurrentLocationHelper();
        event = await getItemFromStore('events',urlParam.get('eventId'));
        utility = {
            sobjectName : 'event',
            account : accountRec,
            event : event,
            eventKey : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+event.Type__c,
        };
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
        await writeData('events',event);
    }
        await writeData('eventsSync',event);
        
        await writeData('utility',utility);
        hideLoaderSpinner();
        checkDailyTracker();
};
const CheckoutClick = async () => {
    const eventRec = await getItemFromStore('utility','event');
    window.location.href = '/view/objectives/checkout/checkout.html?accountId='+eventRec.account.Id;
};

initializeTechnicianLandingPage();