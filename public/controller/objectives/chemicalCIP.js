let chemicalCIP = {};

const initializechemicalCIP =(async () => {
    let utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    initializeChemicalCIPUI();;
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'chemicalCIP';
    chemicalCIP = await getItemFromStore('auditorObjective',key);
    if(!chemicalCIP){
        chemicalCIP ={
            Technician_Name : accountRec.Technician__r ?accountRec.Technician__r.Name : 'Technician not found!'   
        };
        $('#Technician_Name').val(chemicalCIP['Technician_Name']);
    }
    else{
        populateFormHelper();
    }
    
})();

const populateFormHelper = () => {
    for(let i in chemicalCIP){
        if(typeof chemicalCIP[i]==='boolean' &&chemicalCIP[i] ){
            $(`#${i}`).prop('checked',true);
        }
        else{
            $(`#${i}`).val(chemicalCIP[i]);
        }
    }
};
const submitForm = async () => {
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'chemicalCIP';
    let utility = await getItemFromStore('utility','event');
    chemicalCIP = {
        ...chemicalCIP,
        Account__c :accountRec.Id,
        App_Id__c : key,
        Outlet__c : accountRec.Id,
        Event_App_Id__c : utility.eventKey,
        Record_Type_Helper__c : 'Audit_Draft_CIP_Audit', 
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        Technician_Name__c : accountRec.Technician__c,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
    };
    await writeData('auditorObjective',chemicalCIP);
    cancelForm();
};
const cancelForm = () => {
    window.location.href = '/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountRec.Id;
};