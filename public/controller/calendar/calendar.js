const initializeCalendar = async() => {
    events = await readAllData('events');
    tasks = await readAllData('taskOriginal');
    meeting = await readAllData('standardEvents');
    initializeCalenderData();
};
initializeCalendar();

// Adhoc Date Request
const adhocDateRequest =async (dateValue) => {
    const selectedDateValue = new Date(dateValue).setHours(0,0,0,0);
    let loginData = await  loginDataFetch();
    const syncDateTime = new Date(loginData[0].syncDateTime).setHours(0,0,0,0);
    if(syncDateTime){
        const diffDay = (datediff(selectedDateValue,syncDateTime));
        if(diffDay>90){
            showLoaderSpinner();
            let calendarData = await adhocRequest({sObjectName : 'calendar',dateValue :selectedDateValue });
            showVisits(calendarData.events);
            showTasks(calendarData.tasks);
            showMeetings(calendarData.standardEvents);
            hideLoaderSpinner();
        }
    }
    else{
        showLoaderSpinner();
        let calendarData = await adhocRequest({sObjectName : 'calendar',dateValue :selectedDateValue });
        showVisits(calendarData.events);
        showTasks(calendarData.tasks);
        hideLoaderSpinner();
    }
    


};


function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}


accountDetail =async(accountId) => {

    if((new Date(calendar.todaysDate).setHours(0,0,0,0))===(new Date().setHours(0,0,0,0))){
        let accountRec = await getItemFromStore('account',accountId);
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='On_Premise_General'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Consumer'){
        window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Institutional_Off_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Institutional_On_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Non_beer_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Off_Premise_Outlet'){
        window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='On_Premise_Hotel'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Supplier'){
        window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Temporary_Event'){
        window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Wholesaler'){
        window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId='+accountRec.Id;
    }
    }
    else{
        showNotification({message : 'Future and past date visits are view only!'});
    }
    
    
};
