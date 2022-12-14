let machineCommissioning = null;
let isReadOnly = false;
let utility;
const initializeMachineCommissioning = async () => {
    utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'-Machine_Commissioning';
    machineCommissioning = await getItemFromStore('machineCommissioning',key);
    
    if(machineCommissioning){
        renderPrepopulatedForm();
        if(machineCommissioning.isCheckedOut === true){
            isReadOnly = true;
            initializeMachine();
            showNotification({message : 'Page is opened in Read Only Mode'});
        }
    }
    else{
        machineCommissioning ={};
    }
    
};

const renderPrepopulatedForm = () => {
    for(let i in machineCommissioning){
        if(typeof machineCommissioning[i]==='boolean'&&machineCommissioning[i]){
            $(`#${i}`).prop('checked',true);
        }
    }
};

const handleSubmit =async () => {
    if(isReadOnly){
        redirectBackToHomePage();
        return;
    }
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'-Machine_Commissioning';
    machineCommissioning = {
        ...machineCommissioning,
        App_Id__c : key,
        Draft_Installation__c : utility.event.Draft_Installation__c ? utility.event.Draft_Installation__c : null,
        Account__c : accountRec.Id,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
        Record_Type_Helper__c : 'Machine_Commissioning',
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        isCheckedOut : false,
        Event_Custom__c  :utility.event.Id,
    };
    // Commit to IndexedDB
    await writeData('machineCommissioning',machineCommissioning);
    redirectBackToHomePage();
};

initializeMachineCommissioning();