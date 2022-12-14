// Generation Dynamica Navigation Bar
const navigationBarGeneration = () => {
    $('#sideNav').append(`<a href="/view/leadList/leadList.html"><i class="fas fa-user-friends"></i>Leads</a>`);  
    $('#sideNav').append(`<a href="/view/calendar/calendar2.html"><i class="fas fa-calendar-alt"></i>Calendar</a>`);  
    $('#sideNav').append(`<a href="/view/sellingTools/sellingTools.html"><i class="fas fa-toolbox"></i>Selling Tools</a>`);  

};
// Check for Technician and Auditor Guy
const isTechnicianAuditorFuncHelper = async() => {
    let nonSalesCheck = {
        isTech : false,
        isAudit : false,
        isSales : false,
    };
    let loginData = await readAllData('login');
    if(loginData[0].Profile_Name__c.includes('Technician')){
        nonSalesCheck.isTech = true;
    }
    else if(loginData[0].Profile_Name__c.includes('Auditor')){
        nonSalesCheck.isAudit = true;
    }
    else{
        nonSalesCheck.isSales = true;
    }
    return nonSalesCheck;
};


const initialize = async () => {
    navigationBarGeneration();
    let loginData = await loginDataFetch();
    const nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isTech || nonSales.isAudit){
        $('#sideNav a').first().attr('href','/view/homePageTechnician/homePageTechnician.html');
    }
    $('#userName').html(loginData[0].FirstName);

};

initialize();


const syncReminder = async () => {
    
    if (!((window.location.href).indexOf('loading') > -1)) {
        
        let loginData = (await loginDataFetch())[0];
        if (!loginData.syncDateTime) {
            
            let resp = confirm('Syncing not perform within 24 hours !. Do you want to proceed with sync now ? ');
            
            if (resp) {
                window.location.href = '/view/syncPage/loadingPage.html';
            }

        }


        if (loginData.reminderDateTime) {
            let currentDate = (new Date()).getTime();
            let reminderDate = new Date(loginData.reminderDateTime).getTime();
            
            if ((currentDate - reminderDate) > (3600000 * 24)) {
                let resp = confirm('Syncing not perform within 24 hours !. Do you want to proceed with sync now ? ');
                
                if (resp) {
                    window.location.href = '/view/syncPage/loadingPage.html';
                }
                else{
                    let nextReminderSyncTime = new Date();
                    loginData.reminderDateTime = nextReminderSyncTime.setHours(nextReminderSyncTime.getHours()+2);
                    await writeData('login',loginData);
                }
            }
        }
        else {
            let currentDate = (new Date()).getTime();
            let syncDate = new Date(loginData.syncDateTime).getTime();
            if ((currentDate - syncDate) > (3600000 * 24)) {
                let resp = confirm('Syncing not perform within 24 hours !. Do you want to proceed with sync now ? ');
                if (resp) {
                    window.location.href = '/view/syncPage/loadingPage.html';
                }
                else{
                    let nextReminderSyncTime = new Date();
                    loginData.reminderDateTime = nextReminderSyncTime.setHours(nextReminderSyncTime.getHours()+2);
                    await writeData('login',loginData);
                }
            }
        }
    }
    
    
    // $('#sideNav').append(`<a href="/view/accountList/accountListView.html"><i class="fas fa-tv"></i>Accounts</a>`);

};

setTimeout(() => {
    syncReminder();
},3000);


// For Informing that a new version is available
navigator.serviceWorker.addEventListener('controllerchange', () => {
    // This fires when the service worker controlling this page
    // changes, eg a new worker has skipped waiting and become
    // the new active worker.
    alert('A new version is found! Now the page will reload');
    window.location.reload();
  });
  

const adhocRequest = async(sobject) => {
    if(navigator.onLine){
        if(sobject.sObjectName === 'lead'){
            let loginData = await loginDataFetch();
            await accountFetch(loginData[0].username,loginData[0].password,loginData[0].syncDateTime);
        }
        if(sobject.sObjectName === 'calendar'){
            
            let loginData = await loginDataFetch();
            // Add Request
            let calendarData = await fetch('/eventTaskDateWise',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : loginData[0].username,
                    password : loginData[0].password,
                    requestDate : sobject.dateValue
                })
            });
            let calendarDataJSON = await calendarData.json();
            showNotification({message :`${calendarDataJSON.tasks.length > 0 ?  `${calendarDataJSON.tasks.length} Tasks` : 'No Tasks' }  and ${calendarDataJSON.events.length > 0 ?  `${calendarDataJSON.events.length} Events` : 'No Events' } Found!`});
            return calendarDataJSON;
            
        }
    }
};
//  Bottom Bar Code Start ========================================================================

const checkForStartDayBottomBar = async() => {
    let x = await getItemFromStore('dailyTracker',fetchCurrentDateIdStr());
    
    return ((await getItemFromStore('dailyTracker',fetchCurrentDateIdStr())));
};

const checkForCheckInBottomBar = async() => {
    let eventUtility = await getItemFromStore('utility','event');
    
    let tmp = null;
    if(eventUtility){
        tmp = '' ;
        tmp += `<p class="text-center"> Your visit on <a data-accountRecordTypeName="${eventUtility.account.RecordType.DeveloperName}" data-accountId="${eventUtility.account.Id}" onclick="handleAccountRedirectBottomBar(this)">${eventUtility.account.Name}</a> is currently in-progress. Please first complete the same and then continue with adhoc requests </p>`;
        
    }
    if(tmp)
    $('#startTripBtnBottomBar').html(tmp) ;
    if(eventUtility)
        return true;
    else
        return false;
};


handleAccountRedirectBottomBar =(ele) => {
    let recordTypeName = $(ele).attr('data-accountRecordTypeName');
    let accountId = $(ele).attr('data-accountId');
    if (recordTypeName === 'Distributor_Warehouse') {
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Distributor') {
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'On_Premise_General') {
        window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Consumer') {
        window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Institutional_Off_Premise') {
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Institutional_On_Premise') {
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Non_beer_Warehouse') {
        window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Off_Premise_Outlet') {
        window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'On_Premise_Hotel') {
        window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Supplier') {
        window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Temporary_Event') {
        window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Wholesaler') {
        window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + accountId;
    }
    else if(recordTypeName==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountId;
    }
};

const fetchAccountListBottomBar = async() => {
    let accountLists = await cursorBasedAccountFetch();
    let leads = await leadSearchHelper();
    accountLists = accountLists.concat(leads);
    listOfAccountBottomBar = accountLists;
    
    return sortListingAccountBottomBar('Industry_Segment__c',accountLists)
};

const leadSearchHelper =async () => {
    let leads = await readAllData('lead');
    let value = $('#accountNameBottomBar').val().toLowerCase();;
    if(!value)
        return leads;
    leads = leads.filter(ele => {
        if(ele.Name&&(((ele.Name).toLowerCase()).indexOf(value)>-1)){
            return true;
        }
        return false;
    });
    return leads;
};

const cursorBasedAccountFetch = async () => {
    let accounts = [];
    let limit = 50;
    let value = $('#accountNameBottomBar').val().toUpperCase();;
    let openCursor = null;
    if(value){
        openCursor = await keyBasedSearchingIndexedDB('account',value);
    }
    else{
        openCursor = await openCursorForStore('account','Account_Name_IndexedDB_Helper__c');
    }
    while(accounts.length<limit){
        if((openCursor&&openCursor._request.result===null)||!openCursor){
            break;
        }
        let valueReturned =await fetchFromCursorAccountListView(openCursor);
        if(valueReturned.Name&&(((valueReturned.Name).toUpperCase()).indexOf(value)>-1)){
            if(bottomIconClicked===iconsBottomBar.posm_requisition&&isPosmAllowedBottomBar(valueReturned)){
                accounts.push(valueReturned);
            }
            else if(bottomIconClicked === iconsBottomBar.book_order){
                accounts.push(valueReturned);
            }
        }
        
        await openCursor.continue();
        
    }
    return accounts;

};

const sortListingAccountBottomBar = (key,list,direction) => {
    sortKey = key;
    sortDirection = direction;
    list = list.sort(compareAccountsBottomBar);
    return list;
};


const compareAccountsBottomBar = (a, b) => {
    if(typeof a[sortKey]==='boolean'){
        const bandA =( a[sortKey]);
        const bandB = (b[sortKey]);
        if(sortDirection){
            return (bandA === bandB)? 0 : bandA? -1 : 1;
        }
        else{
            return (bandA === bandB)? 0 : bandA? 1 : -1;
        }
        
    }
    else{
        let comparison = 0;
        // Use toUpperCase() to ignore character casing
        const bandA =( a[sortKey] ?  a[sortKey].toUpperCase() : null);
        const bandB = (b[sortKey] ? b[sortKey].toUpperCase(): null);
        
        if(sortDirection){
            if (bandA > bandB) {
                comparison = 1;
            } else if (bandA < bandB) {
                comparison = -1;
            }
        }
        else{
            if (bandA < bandB) {
                comparison = 1;
            } else if (bandA > bandB) {
                comparison = -1;
            }
        }
        return comparison;
    }
    
  };
  let posmSettingBottomBar = null;
  const bottomBarRequestGeneration =async () => {
    const nonSales = await isTechnicianAuditorFuncHelper();
    posmSettingBottomBar = (await getItemFromStore('utility','posmSettings')).posmSetting[0];
    if (!((window.location.href).indexOf('loading') > -1) && (nonSales.isSales || nonSales.isTech)) {
        
        if(Object.keys($('#bottomBarModal')).length===0){
            generateBottomBarModal();
            
        }
        await fetchAccountListBottomBar();
        showAccountBottomBar();
    }
};


const searchBottomBar =async () => {
    await fetchAccountListBottomBar();
    showAccountBottomBar();
    
}


// For Informing that a new version is available
navigator.serviceWorker.addEventListener('controllerchange', () => {
    // This fires when the service worker controlling this page
    // changes, eg a new worker has skipped waiting and become
    // the new active worker.
    alert('A new version is found! Now the page will reload');
    window.location.reload();
  });
  

const handleStartTripBottomBar = async() => {
    $('#loader-main').css('display','block');
    $('#bottomBarModal').modal('hide');
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
            await objectivePushHelper(loginData[0].username,loginData[0].password,nonSales);
        }
        await deletePreviousObjectiveHelper();
        
        $('#loader-main').css('display','none');
        $('#bottomBarModal').modal('show');
        await modalBodyGenerationBottomBar();
    }, (err) => console.log(err), {
        enableHighAccuracy: false,
        timeout: 12000,
        maximumAge: 0
    });  
};

const autoCheckInBottomBar = async (accountRec) => {
    
    const { coords } = await getCurrentPositionBottomBar();
    const { latitude, longitude } = coords;
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
            Check_In_Latitude : latitude,
            Check_In_Longitude : longitude,
            Account : accountRec.Id,
            isSynced : false,
            Created_Date : new Date()
        };
    }
    eventRecV2.CheckedIn = true;
    
    await writeData('eventsSync',eventRecV2);
    
};

const getCurrentPositionBottomBar =(options = {}) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}
const isPosmAllowedBottomBar = (accountRecBottomBar) => {
    let offRecordTypeArr = posmSettingBottomBar.Off_Premise_Record_Type_Allowed__c ? posmSettingBottomBar.Off_Premise_Record_Type_Allowed__c.split(',') : [];
    let onRecordTypeArr = posmSettingBottomBar.On_Premise_Record_Type_Allowed__c ? posmSettingBottomBar.On_Premise_Record_Type_Allowed__c.split(',') : [];
    if(offRecordTypeArr.indexOf(accountRecBottomBar.RecordType.DeveloperName)>-1 ||onRecordTypeArr.indexOf(accountRecBottomBar.RecordType.DeveloperName)>-1 ){
        return true;
    }
    return false;
};

//  Bottom Bar Code End ========================================================================



