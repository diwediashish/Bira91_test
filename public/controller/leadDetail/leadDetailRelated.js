let productMap = new Map();
const initializeLeadRelatedPage =async () => {
    let urlParams = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('lead',urlParams.get('leadId'));
    let retailDepletions = [];
    if(accountRec.Retail_Depletion1__r&&accountRec.Retail_Depletion1__r.records){
        
        retailDepletions = accountRec.Retail_Depletion1__r.records.map(ele => {
            console.log(ele);
            if(ele.Item__c){
                ele.Item__c = ele.Item__r.Display_Name__c;
            }
            return ele;
        });
    }
    let salesOrders = await fetchRecordsUsingIndex('salesOrderBackend','Account__c',accountRec.Id);
    if(salesOrders){
        salesOrderMap(salesOrders);
    }
    retailDepletion((accountRec.Retail_Depletion1__r ?accountRec.Retail_Depletion1__r.records : null ));
    showContacts((accountRec.Contacts ?accountRec.Contacts.records : null ));
    salesOrder(salesOrders);
    stockVisibility(accountRec.Stock_Visibility_Survey__r ?accountRec.Stock_Visibility_Survey__r.records : [] );
    preSalesSampling(accountRec.Product_Pre_Sales_Sampling__r ?accountRec.Product_Pre_Sales_Sampling__r.records : [] );
    events(await fetchRelatedEvents());
    
    showAccount();
};


const fetchRelatedEvents  = async () => {
    let events = await fetchRecordsUsingIndex('events','Account__c',accountRec.Id);
    
    return events;
};


const salesOrderMap = (salesOrders)=> {
    salesOrders.forEach(ele => {
        if(ele.Sales_Order__r){
            productMap.set(ele.Id,ele.Sales_Order__r.records);
        }
        
    });
};
initializeLeadRelatedPage();