let starterKitProducts = new Map();// Mapping Product to Starter Kit
let draftSignup;
let posm;
let isReadOnly = false;
let kycDraft;
let setOfActiveLiq = new Set();
const initializeDraftSignUpPOSM =async () =>{
    let urlParam = new URLSearchParams(window.location.search);
    draftSignup = await getItemFromStore('draft_Signup',fetchCurrentDateIdStr()+'-'+urlParam.get('accountId'));
    accountRec = await getItemFromStore('account',urlParam.get('accountId'));
    showAccount();
    if(draftSignup.Type_of_Requisiton__c==='Temporary'){
        isTemporary = true;
    }
    else{
        await fetchStarterKits();
        isTemporary = false;
    }

    for(let i of draftSignup.Active_Liquids__c.split(';'))
    {
        setOfActiveLiq.add(i)
    }

    if(draftSignup['Kyc_App_Id__c']){
        kycDraft = await getItemFromStore('kycDetail',draftSignup['Kyc_App_Id__c']);
    }

    if(draftSignup['POSM_App_Id__c']){
        posm = await getItemFromStore('posm',draftSignup['POSM_App_Id__c']);
      //  await fetchStarterKits();
        //await productFetching(starterKitProducts.get(posm['Starter_Kit__c']));
        constructProductSectionWise();
        $('.btn-submit').css('display','inline-block');
        if(posm.isCheckedOut === true)
        {
            isReadOnly = true;
        }
    }
    else{
        posm = {
            Requisition_Date__c : new Date(),
            Created_Date : new Date(),
            Outlet__c : accountRec.Id ,
            Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
            Billing_State__c : accountRec.BillingState,
            Status__c  : 'Submitted',
            Event_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id,
            posmLineItem : [],
        };
        
        if(!isTemporary){
            $('.btn-submit').css('display','none');
        }
        else{
            await fetchTemporaryProducts();
        }
        
    }
    initialzileDraftPOSM();
};
const fetchTemporaryProducts =async () => {
    let temporaryProduct = await getItemFromStore('utility','draftStarterKit');
    let tempProd =  new Set();
    for(let i of temporaryProduct.draftStarterKit){
        if(i.Starter_Kit__c==='Temporary'){
            tempProd.add(i.Product_Code__c);
        }
    }  
    
    await productFetching(tempProd);
    temporaryPOSMDynamicProduct();

};
const fetchStarterKits =async () => {

    let starterKits = await getItemFromStore('utility','draftStarterKit');
    let starterKitSet = new Set();
    let isLR = await isLimitedReleaseLiquid();
    for(let i of starterKits.draftStarterKit){
        if(i.Starter_Kit__c!=='Temporary'&&i.Starter_Kit__c!=='Beacon Starter Kit'&&i.Starter_Kit__c!=='LR Starter Kit'){
            starterKitSet.add(i.Starter_Kit__c);
            if(starterKitProducts.has(i.Starter_Kit__c)){
                let productSet = starterKitProducts.get(i.Starter_Kit__c);
                productSet.add(i.Product_Code__c);
                starterKitProducts.set(i.Starter_Kit__c,productSet);
            }
            else{
                starterKitProducts.set(i.Starter_Kit__c,new Set().add(i.Product_Code__c));
            }
        }

        if((accountRec.Beacon_Flag__c&&i.Starter_Kit__c==='Beacon Starter Kit')){
            starterKitSet.add(i.Starter_Kit__c);
            if(starterKitProducts.has(i.Starter_Kit__c)){
                let productSet = starterKitProducts.get(i.Starter_Kit__c);
                productSet.add(i.Product_Code__c);
                starterKitProducts.set(i.Starter_Kit__c,productSet);
            }
            else{
                starterKitProducts.set(i.Starter_Kit__c,new Set().add(i.Product_Code__c));
            }
        }
        if((isLR&&i.Starter_Kit__c==='LR Starter Kit')){
            starterKitSet.add(i.Starter_Kit__c);
            if(starterKitProducts.has(i.Starter_Kit__c)){
                let productSet = starterKitProducts.get(i.Starter_Kit__c);
                productSet.add(i.Product_Code__c);
                starterKitProducts.set(i.Starter_Kit__c,productSet);
            }
            else{
                starterKitProducts.set(i.Starter_Kit__c,new Set().add(i.Product_Code__c));
            }
        }
        
    }   
    selectOption.set('Starter_Kit',Array.from(starterKitSet));
};


const isLimitedReleaseLiquid =async () => {
    let isLR = false;
    if(draftSignup['Active_Liquids__c']){
        let beerItems = await readAllData('itemMaster');
        let lrLiquidSet = new Set();
        for(let i of beerItems){
            if(i.Product__r.Portfolio__c==='Limited Release'){
                lrLiquidSet.add(i.Liquid_Name__c);
            }
        }
        
        for(let i of draftSignup['Active_Liquids__c'].split(';')){
            if(lrLiquidSet.has(i)){
                isLR = true;
                break;
            }
        }
    }
    return isLR;
    
};

const productFetching = async(productCodes = new Set()) => {
    
    let nonBeerItems = await readAllData('nonBeerItems');
    let posmLineTemp = [];
    for(let i of nonBeerItems){
        
        if(i.ProductCode&&productCodes.has(i.ProductCode)){
            if(i.Name.includes('Tap Handles') && setOfActiveLiq.has(i.Liquid_Layer__r.Name)){
                posmLineTemp.push({
                    Name : i.Name,
                    Product__c : i.Id,
                    Quantity__c : 0 ,
                    App_Id__c	 : `${fetchCurrentDateIdStr()}-${accountRec.Id}-${i.Id}`,
                    Parent_App_Id__c : `${fetchCurrentDateIdStr()}-${accountRec.Id}-Draft`,
                    Sub_Channel__c : i.Sub_Channel__c,
                    Status__c : 'Submitted',
                });
            }
            else if(!i.Name.includes('Tap Handles')){ 
                posmLineTemp.push({
                    Name : i.Name,
                    Product__c : i.Id,
                    Quantity__c : 0 ,
                    App_Id__c	 : `${fetchCurrentDateIdStr()}-${accountRec.Id}-${i.Id}-Draft`,
                    Parent_App_Id__c : `${fetchCurrentDateIdStr()}-${accountRec.Id}-Draft`,
                    Sub_Channel__c : i.Sub_Channel__c,
                    Status__c : 'Submitted',
                });
            }
        }
    }
    
    posm.posmLineItem = posmLineTemp  ;
    
};

const constructProductSectionWise = () => {
    listOfItems = {};
    let ctr = 0;
    for(let i of posm.posmLineItem){
        if(listOfItems[i.Sub_Channel__c]){
            let tempProduct = listOfItems[i.Sub_Channel__c];
            i.index = ctr;
            tempProduct.push(i);
            listOfItems[i.Sub_Channel__c] = tempProduct;

        }
        else{
            i.index = ctr;
            listOfItems[i.Sub_Channel__c] = [i];
        }
        ctr++;
    }
    productRendering();
};

const generateAgreement =async () => {
    if(!checkForTapHandles()){
        showNotification({message : 'Tap handles selected more than the Taps'}); 
        return;
    }
    if(isReadOnly){
        handleRedirectDraft();
        return;
    }
    if(!isTemporary){
        if(!posm['Starter_Kit__c']){
            showNotification({message : 'Starter Kit'})
            return;
        }
    }
    showLoaderSpinner();
    showNotification({message : 'Draft request is submitted for Approval!'});
    const position  = await getCurrentLocationHelper();
    posm.Geolocation__latitude__s = position.coords.latitude;
    posm.Geolocation__longitude__s = position.coords.longitude;
    posm.isSynced = false;
    posm.isCheckedOut = false;
    posm.Billing_State__c = accountRec.BillingState;
    posm.Event_Id__c = fetchCurrentDateIdStr()+'-'+accountRec.Id;
    posm.Status__c = 'Submitted';
    posm.Daily_Tracker_App_Id__c = fetchCurrentDateIdStr();
    posm.App_Id__c = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-Draft';
    draftSignup['POSM_App_Id__c'] = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-Draft';
    draftSignup['isSynced'] = false;
    //kycDraft['isSynced'] = false;
    await writeData('posm',posm);
    await writeData('kycDetail',kycDraft);
    await writeData('draft_Signup',draftSignup);
    setTimeout(() => {
        handleRedirectDraft();
    },1000)
    
};

const checkForTapHandles = () => {
    let ctr = 0 ;
    for(let i of posm.posmLineItem){
        if(i.Name.includes('Tap Handles') ||  i.Name.includes('Tap Handle')){
            ctr += parseFloat(i.Quantity__c);
        }
    }
    if(ctr > parseFloat(draftSignup.Number__c)){
        return false;
    }
    return true;
};
const handleRedirectDraft = () => {
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
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
};
initializeDraftSignUpPOSM();