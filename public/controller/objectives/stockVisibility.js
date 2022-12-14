let stockVisbility = {};
const initializeStockVisibility = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    stockVisbility = await getItemFromStore('stockVisibility',key);
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    let kegIds = await initializeGetProduct();
    if(!stockVisbility){
        let defaultAddedProduct = new Set();
        let recordTypeName = '';
        if(((accountRec.RecordType.DeveloperName).toLowerCase()).indexOf('on') > -1){
            recordTypeName = 'On_Premise';
        }
        else if((accountRec.RecordType.DeveloperName).toLowerCase().indexOf('off') > -1 ){
            recordTypeName = 'Off_Premise_Retail_Account';
        }
        else{
            recordTypeName = 'Others';
        }
        stockVisbility = {
            stockVisibilityChilds : [],
            accountId : accountId ,
            recordTypeName : recordTypeName,
            App_Id : key,
            Created_Date : new Date()
        }; 
        if(accountRec.Retail_Depletion1__r){
            let retailDepletionArr = accountRec.Retail_Depletion1__r.records;
            retailDepletionArr = retailDepletionArr.filter(ele => {
                return ele.Last_180_Days__c;
            });
            

            retailDepletionArr.forEach(ele => {
                if((itemValueMap.has(ele.Item__c)&&!defaultAddedProduct.has(ele.Item__c) )){
                    defaultAddedProduct.add(ele.Item__c);
                    kegIds.delete(ele.Item__c);
                    const productSelected = itemValueMap.get(ele.Item__c);
                    let product = {
                        name : (productSelected.Product__c ? (productSelected.Product__r.Display_Name__c) : ''),
                        mrp : (productSelected.Total_Billing_Price__c ? productSelected.Total_Billing_Price__c : 0),
                        Item_Master : (productSelected.Product__c),
                        Quantity : 0
                    };
                    stockVisbility.stockVisibilityChilds.push(product);
                }
            });
            
            
        }
        kegIds.forEach((key,value) => {
            if((itemValueMap.has(value)&&!defaultAddedProduct.has(value) )){
                defaultAddedProduct.add(value);
                
                const productSelected = itemValueMap.get(value);
                let product = {
                    name : (productSelected.Product__c ? (productSelected.Product__r.Display_Name__c) : ''),
                    mrp : (productSelected.Total_Billing_Price__c ? productSelected.Total_Billing_Price__c : 0),
                    Item_Master : (productSelected.Product__c),
                    Quantity : 0
                };
                stockVisbility.stockVisibilityChilds.push(product);
            }
        });
         
    }
    stockVisbility.stockVisibilityChilds.forEach(ele => {
        productSelectedTotal.add(ele.Item_Master);
    });
    
    stockDetail = stockDetail.concat(stockVisbility.stockVisibilityChilds);
    productList = productList.concat(stockVisbility.stockVisibilityChilds);
    showProducts();
    showAccount();
};

const initializeGetProduct = async () => {
    let items = await readAllData('itemMaster');
    let kegsId = new Set();
    items = items.filter(ele => {
        if(ele.Has_Keg_Item__c){
            kegsId.add(ele.Product__c);
        }
        return (ele.State__r&&accountRec.BillingState&&ele.State__r.Name===accountRec.BillingState);
    });
    let itemImages = await readAllData('itemMasterImages');
    let imagesMap = new Map();
    itemImages.forEach(ele => {
        imagesMap.set(ele.picId,ele.base64Image);
    });
    initializeProduct(items,imagesMap);
    return kegsId;
};

const getProductData = async () => {
    stockVisbility.stockVisibilityChilds = stockDetail;
    stockVisbility.isSynced = false;
    stockVisbility.Event_Id = fetchCurrentDateIdStr()+'-'+accountRec.Id;
    stockVisbility.Daily_Tracker = fetchCurrentDateIdStr();
    stockVisbility.Last_Modified = new Date();
    const position  = await getCurrentLocationHelper();
    stockVisbility.Geolocation_Latitude = position.coords.latitude;
    stockVisbility.Geolocation_Longitude = position.coords.longitude;
    await writeData('stockVisibility',stockVisbility);
    window.location.href = `visibilityChiller.html?EventObjectiveId=${stockVisbility.Event_Objective}&accountId=${accountRec.Id}`;
};


initializeStockVisibility();