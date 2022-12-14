let stockVisbility = {};
const initializeChillerVisibility = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    stockVisbility = await getItemFromStore('stockVisibility',key);
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    showAccount();

    // Checking whether loaded first time 
    let isFetchedFromPreviousVisit = false;
    for(var i in stockVisbility){
        if(fieldDataType.has(i)){
            isFetchedFromPreviousVisit = true;
            break;
        }
    }
    if(!isFetchedFromPreviousVisit){
        await fetchValueFromPreviousVisits();
    }
    // Checking whether loaded first time 
    if(accountRec.Channel__c==='Off-Premise'){
        zoneRender(zoneMasterValue.channel_Off);
    }
    else if(accountRec.Channel__c==='On-Premise'&&accountRec.Draft_Ready__c){
        zoneRender(zoneMasterValue.channel_On_Draft);
    }
    else if(accountRec.Channel__c==='On-Premise'&&accountRec.QCO_Flag__c){
     zoneRender(zoneMasterValue.channel_On_QCO);
     
    }
    else if(accountRec.Channel__c==='On-Premise'){
        zoneRender(zoneMasterValue.channel_On);
    }
    else{
        notAplicablemsg();
    }
    
};
const fetchValueFromPreviousVisits =async() => {
    let previousVisit = await getItemFromStore('recentStockVisibilityDealerWise',accountRec.Id);
    let isReset = true;
    if(previousVisit){
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let stockYear= new Date(previousVisit.Last_Modified).getFullYear();
        let stockMonth = new Date(previousVisit.Last_Modified).getMonth();
        if(currentMonth === stockMonth && currentYear === stockYear){
            isReset = false;
        }
    }
    
    if(previousVisit&&!isReset){
        for(let i in previousVisit){
            if(fieldDataType.has(i)){
                stockVisbility[i] =previousVisit[i];
                if(stockVisbility[i]){
                    stockVisbility[`${i}_File`] = 'IM';
                }
            }
        }
    }
    else{
        return null;
    }
};
// 

const getProductData = async () => {
    stockVisbility.stockVisibilityChilds = stockDetail;
    await writeData('stockVisibility',stockVisbility);
    window.location.href = `visibilityChiller.html?EventObjectiveId=${stockVisbility.Event_Objective}&accountId=${accountRec.Id}`;
};

handleSubmit = async() =>{
    await writeData('stockVisibility',stockVisbility);
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+listOfAccount[accountIndex].Id;
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
    }else if(recordTypeName==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id;
    }
  };
initializeChillerVisibility();