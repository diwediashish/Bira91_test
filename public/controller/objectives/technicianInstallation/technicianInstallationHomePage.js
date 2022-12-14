const initializeTechnicianHomePage = async() => {
    const event = await getItemFromStore('utility','event');
    accountRec = event.account;
    showAccount();
    renderInstallationSubObjectives(event.event);
};

const installationEventCreationCheck =async () => {
    const utility = await getItemFromStore('utility','event');
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
    let installation =  await getItemFromStore('draftInstallation',key);
    if(installation){
        if(installation.Record_Type_Helper__c === 'Installed'){
            return true;
        }
    }
    return false;
};

initializeTechnicianHomePage();