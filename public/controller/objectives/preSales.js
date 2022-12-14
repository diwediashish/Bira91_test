
const initializeShowAccount = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    showAccount();
    await initializePreSampling();
};

let preSales  = {};
let interested = [];
let samplingDone = [];
const initializePreSampling =async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    preSales = await getItemFromStore('productSampling',key);
    
    
    if(!preSales){
        let variantMap = await fetchVariants();
        let preSalesChildArr = [];
        variantMap.forEach((value,key) =>{
            preSalesChildArr.push({
                Any_other_feedback : null,
                Aroma : false,
                Bitterness  :false,
                Liked : false,
                Mouth_Feel : false,
                Quantity : null,
                SKU : null,
                Type : null,
                Variant_Layer : key,
                Variant_name : value
            });  
        });
        preSales = {
            preSalesChild : preSalesChildArr,
            accountId : accountId ,
            App_Id : key,
            Created_Date : new Date(),
        }; 
        
    }
    initializePreSales();
};
const fetchVariants = async() => {
    let variantMap = new Map(); 
    let priceMaster = await readAllData('itemMaster');
    let clusterLiquidMapping = await getItemFromStore('utility','clusterLiquid');
    let liquidSet = new Set();
    clusterLiquidMapping.clusterLiquids.forEach(ele => {
        if(ele.Cluster__c===accountRec.Cluster__c){
            liquidSet.add(ele.Liquid__c);
        }
    });
    
    priceMaster.forEach(ele => {
        
        if(ele.Liquid_Id__c&&liquidSet.has(ele.Liquid_Id__c)){
            
            variantMap.set(ele.Liquid_Id__c,ele.Liquid_Name__c);
        }
    });
    return variantMap;
};
const submit = () => {
    if(!isLiquidEmpty){
        window.location.href = `/view/objectives/salesOrder/salesOrderLanding.html?accountId=${accountRec.Id}&presalesId=${preSales.App_Id}`;
    }
    else{
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
    }
    else if(recordTypeName==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id;
    }
    }
    
    
};

handlePreSalesSubmit =async () => {
    if(isLiquidEmpty){
        submit();
        return;
    }

    for(let i of preSales.preSalesChild){
        if((i.Type === 'Sampling' || i.Type === 'Tasting') && !i.Quantity){
            showNotification({message : 'Quantity cannot be zero'});
            return;
        }else if(i.Type === 'Tasting' && !i.Liked){
            let checkSuggestion = false;
            if(i.Aroma){
                checkSuggestion = true;
            }
            if(i.Bitterness){
                checkSuggestion = true;
            }
            if(i.Mouth_Feel){
                checkSuggestion = true;
            }
            if(i.Any_other_feedback){
                checkSuggestion = true;
            }

            if(!checkSuggestion){
                showNotification({message : `Reason for not liking ${i.Variant_name} is required`});
                return;
            }
        }
    }
    preSales.isSynced = false;
    preSales.Event_Id = fetchCurrentDateIdStr()+'-'+accountRec.Id;
    preSales.Daily_Tracker = fetchCurrentDateIdStr();
    preSales.Last_Modified = new Date();
    const position  = await getCurrentLocationHelper();
    preSales.Geolocation_Latitude = position.coords.latitude;
    preSales.Geolocation_Longitude = position.coords.longitude;
    await writeData('productSampling',preSales);
    submit();
};



initializeShowAccount();