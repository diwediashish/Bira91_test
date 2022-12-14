let orderRec;
const initializeOrder =async () => {
    let urlParams = new window.URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    await initializeProducts();
    //Key for Order type
    let orderKey = `${fetchCurrentDateIdStr()}-${accountId}`;
    orderRec = await getItemFromStore('salesOrderSync',orderKey);
    let defaultAddedProduct = new Set();
    if(!orderRec){
        orderRec = {
            App_Id : orderKey,
            accountId : accountId,
            products : [],
            Created_Date : new Date()
        };
        if(accountRec.Retail_Depletion1__r){
            let retailDepletionArr = accountRec.Retail_Depletion1__r.records;
            retailDepletionArr = retailDepletionArr.filter(ele => {
                return ele.Last_90_Days__c;
            });
            
            retailDepletionArr.forEach(ele => {
                if(productIdMap.has(ele.Item__c)&&!defaultAddedProduct.has(ele.Item__c)){
                    defaultAddedProduct.add(ele.Item__c);
                    const productSelected = productIdMap.get(ele.Item__c);
                    let product = {
                        name : (productSelected.Product__c ? (productSelected.Product__r.Display_Name__c) : ''),
                        Amount : (productSelected.Total_Billing_Price__c ? productSelected.Total_Billing_Price__c : 0),
                        Item_Name : (productSelected.Product__c),
                        Price_Master : productSelected.Id
                    };
                    orderRec.products.push(product);
                }
            });
            
        }
        let top5SKU = await readAllData('top5SKU');
        for(let i of top5SKU){
            if(productIdMap.has(i.Item_Master__c)&&!defaultAddedProduct.has(i.Item_Master__c)){
                let isValid = true;
                if(i.Cluster__c && accountRec.Cluster__c && i.Cluster__c !== accountRec.Cluster__c ){
                    isValid = false;
                }
                if(i.Channel__c && accountRec.Channel__c && i.Channel__c !== accountRec.Channel__c ){
                    isValid = false;
                }
                if(isValid){
                    defaultAddedProduct.add(i.Item_Master__c);
                    const productSelected = productIdMap.get(i.Item_Master__c);
                    let product = {
                        name : (productSelected.Product__c ? (productSelected.Product__r.Display_Name__c) : ''),
                        Amount : (productSelected.Total_Billing_Price__c ? productSelected.Total_Billing_Price__c : 0),
                        Item_Name : (productSelected.Product__c),
                        Price_Master : productSelected.Id
                    };
                    orderRec.products.push(product);
                }
            }
        }

    }
    else{
        $('#salesOrderComment').prop('value',orderRec.Comment);
    }
    
    initializeOrderFrontEnd(orderRec);
    showSummary();

};

const initializeShowAccount = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    showAccount();
};

const initializeProducts =async () => {
    let products = await readAllData('itemMaster');
    products = products.filter(ele => {
        return (ele.State__r&&accountRec.BillingState&&ele.State__r.Name===accountRec.BillingState);
    });
    let productImages = await readAllData('itemMasterImages');
    let productImagesMap = new Map();
    productImages.forEach(ele  => {
        
        productImagesMap.set(ele.picId,ele.base64Image);
    });
    initializeProductsFrontEnd(products,productImagesMap);
};

const saveOrder =async () => {
    showLoaderSpinner();
    orderRec.Last_Modified = new Date();
    orderRec.isSynced = false;
    orderRec.Daily_Tracker = fetchCurrentDateIdStr();
    const position  = await getCurrentLocationHelper();
    orderRec.Geolocation_Latitude = position.coords.latitude;
    orderRec.Geolocation_Longitude = position.coords.longitude;
    await writeData('salesOrderSync',orderRec);
    submit();
};

const submit = async() => {
    const recordTypeName = accountRec.RecordType.DeveloperName;
    const isNonSales = await isTechnicianAuditorFuncHelper();

    let urlParam = new URLSearchParams(window.location.search);
    let bottomBar = urlParam.get('bottomBar');

    if(bottomBar){
        history.go(-1);
        return
    }
    
    if(isNonSales.isTech){
        window.location.href = `/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=${accountRec.Id}`;
        return;
    }
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


const initializeSalesOrderFlowOrder =async () => {
    await initializeShowAccount();
    await initializeOrder();
};


initializeSalesOrderFlowOrder();