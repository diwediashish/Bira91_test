const initializeAccountDetail = async () => {
    let urlParam = new URLSearchParams(window.location.search);
    let accountId = urlParam.get('Id');
    let accountDetail = await getItemFromStore('account',accountId);
    accountRec = accountDetail;
    let retailDepletions = [];
    let contactList = [];
    if(accountRec.Retail_Depletion1__r&&accountRec.Retail_Depletion1__r.records){
        
        retailDepletions = accountRec.Retail_Depletion1__r.records.map(ele => {
            
            if(ele.Item__c){
                ele.Item__c = ele.Item__r.Display_Name__c;
            }
            return ele;
        });
    }
    if(accountRec.Contacts&&accountRec.Contacts.records){
        contactList = accountRec.Contacts.records.map(ele => {
            ele.Phone = ele.MobilePhone || ele.Phone;
        });
    }
    let salesOrders = await fetchRecordsUsingIndex('salesOrderBackend','Account__c',accountRec.Id);
    if(salesOrders){
        salesOrderMap(salesOrders);
    }
    retailDepletion((retailDepletions ?retailDepletions : [] ));
    showContacts((accountRec.Contacts ?accountRec.Contacts.records : [] ));
    salesOrder(salesOrders ?salesOrders : [] );
    draftRequest(draftInstallationFilter());
    events(await fetchRelatedEvents());
    stockVisibility(accountRec.Stock_Visibility_Survey__r ?accountRec.Stock_Visibility_Survey__r.records : [] );
    preSalesSampling(accountRec.Product_Pre_Sales_Sampling__r ?accountRec.Product_Pre_Sales_Sampling__r.records : [] );
    posmRequisition(accountRec.POSM_Requisitions__r ?accountRec.POSM_Requisitions__r.records : [] );
    showAccount();
    // Account Detail Page call
    // Account related Page Call Page call
};
let productMap = new Map();
let posmProductMap = new Map();
let preSalesProductMap = new Map();
const salesOrderMap = (salesOrders)=> {
    salesOrders.forEach(ele => {
        if(ele.Sales_Order__r){
            productMap.set(ele.Id,ele.Sales_Order__r.records);
        }
        
    });
};

const draftInstallationFilter = () => {
    let installations = accountRec.Draft_Installations__r ? accountRec.Draft_Installations__r.records : [];
    installations = installations.filter(ele => {
        return ele.RecordType.DeveloperName==='Draft_Sign_Up'
    });
    return installations;
};

const fetchRelatedEvents  = async () => {
    let events = await fetchRecordsUsingIndex('events','Account__c',accountRec.Id);
    
    return events;
};
 
const initializeDetail = () => {
    showLoader();
    setTimeout(async () => {
        await initializeAccountDetail();
        
        hideLoader();
    },1);
};


initializeDetail();