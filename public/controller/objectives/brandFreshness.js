let brandFreshness = {};
let liquidIdMap = new Map();
const initializebrandFreshness =(async () => {
    let utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'brandFreshnessHygiene';
    brandFreshness = await getItemFromStore('auditorObjective',key);
    if(!brandFreshness){
        brandFreshness ={
            App_Id__c : key,
            Record_Type_Helper__c : 'Audit_Brand_Freshness_and_Hygiene_Audit',
        };
    }
    else{
        brandFreshnessItems = brandFreshness.brandFreshnessItems;
    }
    await activeLiquidPackSize();
    initializeBrandFreshnessUIHelper();
})();

const activeLiquidPackSize =async () => {
    let activeItems = await readAllData('itemMaster');
    let liquidName = new Set();
    let packSizeName = new Set();
    for(let i of activeItems){
        if(accountRec.BillingState === i.State__r.Name){
            if(i.Liquid_Name__c){
                liquidName.add(i.Liquid_Name__c);
                liquidIdMap.set(i.Liquid_Name__c,i.Liquid_Id__c);
            }
            if(i.Pack_Size__c){
                packSizeName.add(i.Pack_Size__c);
            }
        }
    }
    selectOptions.set('Brand_Name',Array.from(liquidName));
    selectOptions.set('Pack_Size__c',Array.from(packSizeName));
};

const submitForm = async () => {
    for(let i of brandFreshnessItems){
        if(liquidIdMap.has(i.Brand_Name)){
            i.Liquid_Name__c = liquidIdMap.get(i.Brand_Name);
            i.Brand_Name__c = i.Brand_Name;
            if(!i.Manufacturing_Date__c){
                showNotification({message : 'Manufacturing Date is Mandatory'});
                return;
            }
        }
    }
    brandFreshness.brandFreshnessItems = brandFreshnessItems;
    await writeData('auditorObjective',brandFreshness);
    cancelForm();
};
const cancelForm = () => {
    window.location.href = '/view/objectives/brandFreshness/hygiene.html?accountId='+accountRec.Id;
};