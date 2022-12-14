let wareHouseQualityCheck = {};

const initializeWareHouseQualityCheck =(async () => {
    let utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    initializeWarehouse();
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'wareHouseQualityCheck';
    wareHouseQualityCheck = await getItemFromStore('auditorObjective',key);
    if(!wareHouseQualityCheck){
        wareHouseQualityCheck ={};
    }
    else{
        populateFormHelper();
    }
    
})();

const populateFormHelper = () => {
    for(let i in wareHouseQualityCheck){
        if(typeof wareHouseQualityCheck[i]==='boolean' &&wareHouseQualityCheck[i] ){
            $(`#${i}`).prop('checked',true);
        }
    }
};
const submitForm = async () => {
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'wareHouseQualityCheck';
    let utility = await getItemFromStore('utility','event');
    wareHouseQualityCheck = {
        ...wareHouseQualityCheck,
        Account__c :accountRec.Id,
        App_Id__c : key,
        Outlet__c : accountRec.Id,
        Event_App_Id__c : utility.eventKey,
        Record_Type_Helper__c : 'Audit_Warehouse_Quality_Checks', 
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
    };
    await writeData('auditorObjective',wareHouseQualityCheck);
    cancelForm();
};
const cancelForm = () => {
    window.location.href = '/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountRec.Id;
};