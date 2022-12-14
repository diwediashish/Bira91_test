let dailyTracker = {};
let mappingStandardEventIds = new Map();

const initializeHomePageTechnician = async () => {
    const dateId = fetchCurrentDateIdStr();
    dailyTracker = await getItemFromStore('dailyTracker',dateId);
    currentCheckIn = await getItemFromStore('utility','event');
    let standardEvents = await readAllData('standardEvents');
    let standardEventsList = [];
    for(let i of standardEvents){
        let eventDate = new Date (i.StartDateTime);
        let currentDate = new Date();
        // eventDate.setHours(0,0,0,0);
        // currentDate.setHours(0,0,0,0);
        
        if(eventDate.getDate() === currentDate.getDate()){
            standardEventsList.push(i);   
            mappingStandardEventIds.set(i.Id,i);  
        }
    }

    
    if(dailyTracker&&dailyTracker.Start_Coordinates_Latitude&&dailyTracker.End_Coordinates_latitude){
        $('#startDayTime').css('display','none');
        $('#endDayTime').css('display','none');
        $('.panel-content div').css('filter','grayscale(0%)');
    }
    else if((dailyTracker&&dailyTracker.Start_Coordinates_Latitude)){
        $('#startDayTime').css('display','none');
        $('#endDayTime').css('display','block');
        $('.panel-content div').css('filter','grayscale(0%)');
    }
    else{
        $('#startDayTime').css('display','block');
        $('#endDayTime').css('display','none');
        //$('#todays-visit').prepend(tmp);
        $('.panel-content div').css('filter','grayscale(100%)');
    }
    const nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isTech){
        displayTodaysEvent();
    }
    else{
        displayTodaysEventAuditor();
    }
    
    renderTodaysTasks();
    renderTodaysMeeting(standardEventsList);

};

handleEndDayHandler = async () => {
    $('#loader-main').css('display','block');
    dailyTracker = await getItemFromStore('dailyTracker',fetchCurrentDateIdStr());
    const position = await getCurrentLocationHelper();
    dailyTracker.End_Coordinates_latitude = position.coords.latitude;
    dailyTracker.End_Coordinates_longitude = position.coords.longitude;
    dailyTracker.End_Date_Time = new Date();
    dailyTracker.isSynced = false;
    await writeData('dailyTracker',dailyTracker);
    if(navigator.onLine){
        let loginData =await loginDataFetch();
        let nonSales = await isTechnicianAuditorFuncHelper();
        await objectivePushHelper(loginData[0].username,loginData[0].password,loginData[0].syncDateTime,nonSales);
    }
    $('#loader-main').css('display','none');
    initializeHomePageTechnician();
};

const displayTodaysEventAuditor = async () => {
    $('#warehouse').html('Warehouse Quality Check');
    $('#brandFreshness').html('Brand Freshness and Hygiene Audit');
    $('#chemicalCIP').css('display','none');
    $('#maintenance-visits').css('display','none');
    let events = await readAllData('events');
    pendingInstallation = events.filter(ele =>{
        const eventDateFieldValue = (ele.Start_date_and_time__c ?(new Date ((ele.Start_date_and_time__c).substring(0,(ele.Start_date_and_time__c).length-2)+':00')):  ele.Actual_End_Visit) ;
        let eventDate = eventDateFieldValue;
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        
        return ((ele.Type__c === 'Warehouse Quality Check' && eventDate.getTime()===currentDate.getTime() ));
    });
    pendingPullOut = events.filter(ele =>{
        const eventDateFieldValue = (ele.Start_date_and_time__c ?(new Date ((ele.Start_date_and_time__c).substring(0,(ele.Start_date_and_time__c).length-2)+':00')):  ele.Actual_End_Visit) ;
        let eventDate = eventDateFieldValue;
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        return (ele.Type__c === 'Brand Freshness and Hygiene Audit' && eventDate.getTime()===currentDate.getTime());
    });
   
    initializeHomePage();
};
const displayTodaysEvent =async () => {
    let events = await readAllData('events');
    pendingInstallation = events.filter(ele =>{
        let eventDate = new Date ((ele.Start_date_and_time__c).substring(0,(ele.Start_date_and_time__c).length-2)+':00');
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        
        return ((ele.Type__c === 'Installation'||ele.Type__c==='Pre-Installation' ||ele.Type__c==='Machine Commissioning' || ele.Type__c === 'Training' ) && eventDate.getTime()===currentDate.getTime() );
    });
    pendingPullOut = events.filter(ele =>{
        let eventDate = new Date ((ele.Start_date_and_time__c).substring(0,(ele.Start_date_and_time__c).length-2)+':00');
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        return (ele.Type__c === 'Draft Pullout' && (eventDate.getTime()===currentDate.getTime()));
    });
    maintenanceVisits = events.filter(ele =>{
        let eventDate = new Date ((ele.Start_date_and_time__c).substring(0,(ele.Start_date_and_time__c).length-2)+':00');
        let currentDate = new Date();
        eventDate.setHours(0,0,0,0);
        currentDate.setHours(0,0,0,0);
        
        return ((ele.Type__c === 'Draft Sanitization' || ele.Type__c === 'Draft Preventive Maintenance')&&eventDate.getTime()===currentDate.getTime() ) ;
    });
    initializeHomePage();
};
const fetchTodaysTasks = async() => {
    
    let tasks = await readAllData('taskOriginal');
    if(tasks.length>0){
        tasks = tasks.filter(ele => {
            let eventDate =  new Date(ele.ActivityDate).setHours(0,0,0,0);
            let todaysDate = new Date().setHours(0,0,0,0);
            return eventDate === todaysDate;
        });
    }
    
    return tasks;
};
handleStartDayHandler =  () => {
    $('#loader-main').css('display','block');
    dailyTracker = {};
    dailyTracker.Last_Modified = new Date();
    dailyTracker.App_Id = fetchCurrentDateIdStr();
    dailyTracker.isSynced = false;
    dailyTracker.Created_Date = new Date();
    dailyTracker.Start_Date_Time = new Date();

    navigator.geolocation.getCurrentPosition(async(position) => {
        dailyTracker.Start_Coordinates_Latitude = position.coords.latitude;
        dailyTracker.Start_Coordinates_Longitude = position.coords.longitude;
        await deleteItemFromData('utility','event');
        await writeData('dailyTracker',dailyTracker);
        if(navigator.onLine){
            let loginData =await loginDataFetch();
            let nonSales = await isTechnicianAuditorFuncHelper();
            await objectivePushHelper(loginData[0].username,loginData[0].password,loginData[0].syncDateTime,nonSales);
        }
        await deletePreviousObjectiveHelper();
        initializeHomePageTechnician();
        $('#loader-main').css('display','none');
    }, checkErrorGeolocation, {
        enableHighAccuracy: false,
        timeout: 12000,
        maximumAge: 0
    });
};
const eventRedirect = async(eventId) => {
    const eventRec = await getItemFromStore('events',eventId);
    const nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isTech)
        window.location.href = `/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=${eventRec.Account__r.Id}&eventId=${eventRec.Id}`;
    else if(nonSales.isAudit)
        window.location.href = `/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=${eventRec.Account__r.Id}&eventId=${eventRec.Id}`;
    
};
initializeHomePageTechnician();