let training = null;
let isReadOnly = false;
let utility;
const initializeTraining = async () => {
    utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'-Training';
    training = await getItemFromStore('training',key);
    if(training){
        renderPrepopulatedForm();
        if(training.isCheckedOut === true){
            isReadOnly = true;
            initializeTrainingPage();
            showNotification({message : 'Page is opened in Read Only Mode'});
        }
    }
    else{
        training = {};
    }
};

const renderPrepopulatedForm = () => {
    for(let i in training){
        if(typeof training[i]==='boolean'&&training[i]){
            $(`#${i}`).prop('checked',true);
        }
    }
};

const handleSubmit = async() => {
    if(isReadOnly){
        redirectBackToHomePage();
        return;
    }
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'-Training';
    training = {
        ...training,
        App_Id__c : key,
        Draft_Installation__c : utility.event.Draft_Installation__c ? utility.event.Draft_Installation__c : null,
        Account__c : accountRec.Id,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
        Record_Type_Helper__c : 'Training',
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        isCheckedOut : false,
        Event_Custom__c  :utility.event.Id,
    };
    
    // Commit to IndexedDB
    await writeData('training',training);
    redirectBackToHomePage();
};

initializeTraining();