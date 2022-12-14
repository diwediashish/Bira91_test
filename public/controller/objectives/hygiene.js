let brandFreshness = {};

const initializebrandFreshness =(async () => {
    let utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    initializehygieneAudit();
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'brandFreshnessHygiene';
    brandFreshness = await getItemFromStore('auditorObjective',key);
    populateFormHelper();
})();

const populateFormHelper = () => {
    for(let i in brandFreshness){
        if(typeof brandFreshness[i]==='boolean' &&brandFreshness[i] ){
            $(`#${i}`).prop('checked',true);
        }
        else{
            $(`#${i}`).val(brandFreshness[i]);
        }
    }
};
const submitForm = async () => {
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'brandFreshnessHygiene';
    let utility = await getItemFromStore('utility','event');
    brandFreshness = {
        ...brandFreshness,
        Account__c :accountRec.Id,
        App_Id__c : key,
        Outlet__c : accountRec.Id,
        Event_App_Id__c : utility.eventKey,
        Record_Type_Helper__c : 'Audit_Brand_Freshness_and_Hygiene_Audit', 
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
    };
    await writeData('auditorObjective',brandFreshness);
    cancelForm();
};
const cancelForm = () => {
    window.location.href = '/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountRec.Id;
};