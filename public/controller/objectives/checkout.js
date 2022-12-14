
const initializeShowAccount = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    accountRec = await getItemFromStore('account', accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    showAccount();
    initializeContacts();
    fetchContactController();
};

const checkedOut = async () => {
    createLoader();
    setTimeout(async () => {
        await checkedOutFunc();
    }, 100);
};

const checkedOutFunc = async () => {
    
    let draftSignUpReq;
    let kycDraft;
    let posmDraft;
    let posm;
    let draftInstallation;
    let draftPreInstallation;
    let machineCommissioning;
    let training;
    let draftPullout;
    let nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isTech){
        let utility = await getItemFromStore('utility','event');
        const eventSyncKey = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Type__c;
        eventRecV2 = await getItemFromStore('eventsSync',eventSyncKey);

        const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
        draftInstallation = await getItemFromStore('draftInstallation',key);
        if(draftInstallation)
        {
            draftInstallation['isCheckedOut'] = true;
            await writeData('draftInstallation',draftInstallation);
        }

        draftPreInstallation = await getItemFromStore('draftPreInstallation',key);
        if(draftPreInstallation)
        {
            const position = await getCurrentLocation();
            draftPreInstallation['Longitude__c'] = position.coords.longitude;
            draftPreInstallation['Latitude__c'] = position.coords.latitude;
            draftPreInstallation['isCheckedOut'] = true;
            await writeData('draftPreInstallation',draftPreInstallation);

            kycDraft = await getItemFromStore('kycDetail',fetchCurrentDateIdStr()+'-'+accountRec.Id+'-Draft-Pre');

            if(kycDraft){
                kycDraft['isSynced'] = false;
                await writeData('kycDetail',kycDraft); 
            }
                
        }

        const machCommkey = key+'-Machine_Commissioning';
        machineCommissioning = await getItemFromStore('machineCommissioning',machCommkey);
        if(machineCommissioning)
        {
            machineCommissioning['isCheckedOut'] = true;
            await writeData('machineCommissioning',machineCommissioning);
        }

        const trainingKey = key+'-Training';
        training = await getItemFromStore('training',trainingKey);
        if(training)
        {
            training['isCheckedOut'] = true;
            await writeData('training',training);
        }


        const draftSanKey = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'Sanitization';
        let draftSanitization = await getItemFromStore('draftSanitization',draftSanKey);
        if(draftSanitization)
        {
            const position = await getCurrentLocation();
            draftSanitization['Longitude__c'] = position.coords.longitude;
             draftSanitization['Latitude__c']= position.coords.latitude;
            draftSanitization['isCheckedOut'] = true;
            await writeData('draftSanitization',draftSanitization);
        }
        const draftPMKey = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'PM';
        let preventiveMaintainance = await getItemFromStore('preventiveMaintainance',draftPMKey);

        if(preventiveMaintainance)
        {
            const position = await getCurrentLocation();
            preventiveMaintainance['Longitude__c'] = position.coords.longitude;
            preventiveMaintainance['Latitude__c'] = position.coords.latitude;
            preventiveMaintainance['isCheckedOut'] = true;
            await writeData('preventiveMaintainance',preventiveMaintainance);
        }
        const draftPullOutKey = utility.event.Draft_Installation__r.App_Id__c ? utility.event.Draft_Installation__r.App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__r.Draft_Installation__c;
        let draftPullOutTech = await getItemFromStore('draftPullout',draftPullOutKey);
        if(draftPullOutTech)
        {
            draftPullOutTech['isCheckedOut'] = true;
            await writeData('draftPullout',draftPullOutTech);
        }
    }
    else if(nonSales.isAudit){
        let utility = await getItemFromStore('utility','event');
        const eventSyncKey = utility.eventKey;
        eventRecV2 = await getItemFromStore('eventsSync', eventSyncKey);
    }
    else if(nonSales.isSales){
        const eventSyncKey = fetchCurrentDateIdStr() + '-' + accountRec.Id;
        eventRecV2 = await getItemFromStore('eventsSync', eventSyncKey);
        
        draftSignUpReq = await getItemFromStore('draft_Signup',eventSyncKey);
        if(draftSignUpReq)
        {

            if(draftSignUpReq['Kyc_App_Id__c'] && draftSignUpReq['POSM_App_Id__c'])
            {
                kycDraft = await getItemFromStore('kycDetail',draftSignUpReq['Kyc_App_Id__c']);
                posmDraft = await getItemFromStore('posm',draftSignUpReq['POSM_App_Id__c']);
                
                if(posmDraft && kycDraft)
                {
                    draftSignUpReq['isCheckedOut'] = true;
                    await writeData('draft_Signup',draftSignUpReq);

                    kycDraft['isCheckedOut'] = true;
                    kycDraft['isSynced'] = false;
                    await writeData('kycDetail',kycDraft);
                    
                    posmDraft['isCheckedOut'] = true;
                    await writeData('posm',posmDraft);
                }
            }
        }

        
        posm = await getItemFromStore('posm', eventSyncKey);
        if(posm)
        {
            posm['isCheckedOut'] = true;
            await writeData('posm',posm);
        }

        if(accountRec.Draft_Installations__r)
        {
            let urlParam = new URLSearchParams(window.location.search);
            let eventRec;
            if(urlParam.get('eventId'))
            {
                eventRec = await getItemFromStore('events',urlParam.get('eventId'));
            }
    
            for(let draftItem of accountRec.Draft_Installations__r.records){
                
                if(draftItem.RecordType.DeveloperName === 'Installed'){
                    let pulloutKey = eventRec ? eventRec.Draft_Pullout__r.App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+draftItem.Id;
                    let pulloutSales = await getItemFromStore('draftPullout',pulloutKey);
                    if(pulloutSales && pulloutSales.Created_Date.getDate() === new Date().getDate()){
                        pulloutSales['isCheckedOut'] = true;
                        await writeData('draftPullout',pulloutSales);
                    }
                }
                
            }
        }
    }
        try{
            if (!eventRecV2.Check_Out_Latitude) {
                const position = await getCurrentLocation();
                eventRecV2.Check_Out_Latitude = position.coords.latitude;
                eventRecV2.Check_Out_Longitude = position.coords.longitude;
                eventRecV2.Actual_End_Visit = new Date();
                }
                eventRecV2.Completed = true;
                await deleteItemFromData('utility', 'event');
                eventRecV2.Person_Contacted = checkOut.Person_Contacted__c;
                eventRecV2.Comments = checkOut.Comments__c;
                eventRecV2.Met_Decision_Maker = checkOut.Met_Decision_Maker__c;
                eventRecV2.CheckedIn = false;
                eventRecV2.contacts = checkOut.contacts;
                eventRecV2.isSynced = false;
                accountRec.Recent_Activity_Comments__c = checkOut.Comments__c;
                accountRec.Recent_Activity_Date_Time__c = new Date();
                await writeData('eventsSync', eventRecV2);
                await writeData('account', accountRec);
                if(!nonSales.isSales){
                    if(!(await actualEventCompletionHelper(eventRecV2.Id))){
                        if(nonSales.isAudit)
                            eventRecV2.Id = eventRecV2.App_Id;
                        eventRecV2.Completed__c = true;
                        await writeData('events',eventRecV2);
                    }
                }
                if (navigator.onLine) {
                    showNotification({ message: 'Device online Syncing data to Server. Please hold On!' });
                    setTimeout(async () => {
                        let loginData = await loginDataFetch();
                        const nonSales =  await isTechnicianAuditorFuncHelper();
                        
                        await objectivePushHelper(loginData[0].username, loginData[0].password,loginData[0].syncDateTime,nonSales);

                        redirectToHomePage();
                    }, 100);
                    //await objectivesSync(loginData[0].username,loginData[0].password);
                }
                else {
                    showNotification({ message: 'Device is offline data saved for Syncing. When back online click on Sync button!' });

                    redirectToHomePage();
                }
            
        }
        catch(e){
            $('#loader-main').css('display','none');
            showNotification({message : 'There is some issue with Location pl try again later!'+e});
            return;
        }
        
    
    

};

const actualEventCompletionHelper =async (Id) => {
    let events = await readAllData('events');
    let tempEvent = null;
    let eventFound = false;
    for(let i of events){
        if(i.Id ===Id){
            tempEvent = i;
            break;
        }
    }
    if(tempEvent){
        eventFound = true;
        tempEvent.Completed__c = true;
        await writeData('events',tempEvent);
    }
    return eventFound;
};

const syncingServerData = async () => {
    let loginData = await loginDataFetch();
    await objectivesSync(loginData[0].username, loginData[0].password);
};

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 12000,
            maximumAge: 0
        });
    });
};

const fetchContactController = async () => {
    let nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isTech){
        let utility = await getItemFromStore('utility','event');
        const eventSyncKey = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Type__c;
        eventRecV2 = await getItemFromStore('eventsSync',eventSyncKey);
    }
    else if(nonSales.isAudit){
        let utility = await getItemFromStore('utility','event');
        const eventSyncKey = utility.eventKey;
        eventRecV2 = await getItemFromStore('eventsSync', eventSyncKey);
    }
    else{
        const eventSyncKey = fetchCurrentDateIdStr() + '-' + accountRec.Id;
        eventRecV2 = await getItemFromStore('eventsSync', eventSyncKey);
    }
    checkOut = {
        ...checkOut,
        contacts: eventRecV2.contacts ? eventRecV2.contacts : [],
    };
    
    renderContactsList();
};

// Redirection to home page
const redirectToHomePage = async() => {
    const nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isSales){
        window.location.href = '/view/homePage/homePage.html';
    }
    else{
        window.location.href = '/view/homePageTechnician/homePageTechnician.html';    
    }
    
};

initializeShowAccount();

