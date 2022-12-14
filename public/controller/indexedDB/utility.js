
var objectStore;
var dbPromise = idb.open('bira91', 2, function (db) {
  if (!db.objectStoreNames.contains('login')) {
    db.createObjectStore('login', { keyPath: 'username' });
  }
  if (!db.objectStoreNames.contains('account')) {
    var objectStoreAccount = db.createObjectStore('account', { keyPath: 'Id' });
    objectStoreAccount.createIndex('Name', 'Name', { unique: false });
    objectStoreAccount.createIndex('Account_Name_IndexedDB_Helper__c', 'Account_Name_IndexedDB_Helper__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('lead')) {
    var objectStoreLead = db.createObjectStore('lead', { keyPath: 'Id' });
    objectStoreLead.createIndex('Name', 'Name', { unique: false });
  }
  if (!db.objectStoreNames.contains('leadsync')) {
    db.createObjectStore('leadsync', { keyPath: 'Id', autoIncrement: true });
  }
  if (!db.objectStoreNames.contains('contactsync')) {
    db.createObjectStore('contactsync', { keyPath: 'Id' });
  }
  if (!db.objectStoreNames.contains('contact')) {
    db.createObjectStore('contact', { keyPath: 'Id' });

  }
  if (!db.objectStoreNames.contains('utility')) {
    db.createObjectStore('utility', { keyPath: 'sobjectName' });
  }
  if (!db.objectStoreNames.contains('events')) {
    var objectStoreEvent = db.createObjectStore('events', { keyPath: 'Id' });
    objectStoreEvent.createIndex('Account__c', 'Account__c', { unique: false });
    objectStoreEvent.createIndex('Start_date_and_time__c', 'Start_date_and_time__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('eventsSync')) {
    db.createObjectStore('eventsSync', { keyPath: 'App_Id' });
  }
  if (!db.objectStoreNames.contains('standardEvents')) {
    db.createObjectStore('standardEvents', { keyPath: 'Id' });
  }
  if (!db.objectStoreNames.contains('salesOrderSync')) {
    db.createObjectStore('salesOrderSync', { keyPath: 'App_Id' });
  }
  if (!db.objectStoreNames.contains('stockVisibility')) {
    db.createObjectStore('stockVisibility', { keyPath: 'App_Id' });
  }
  // if (!db.objectStoreNames.contains('draftSurvey')) {
  //   db.createObjectStore('draftSurvey', { keyPath: 'App_Id' });
  // }
  if (!db.objectStoreNames.contains('productSampling')) {
    db.createObjectStore('productSampling', { keyPath: 'App_Id' });
  }
  if (!db.objectStoreNames.contains('itemMaster')) {
    db.createObjectStore('itemMaster', { keyPath: 'Id' });
  }
  if (!db.objectStoreNames.contains('itemMasterImages')) {
    db.createObjectStore('itemMasterImages', { keyPath: 'picId' });
  }
  if (!db.objectStoreNames.contains('kycDetail')) {
    db.createObjectStore('kycDetail', { keyPath: 'App_Id' });
  }
  if (!db.objectStoreNames.contains('competitorInsight')) {
    db.createObjectStore('competitorInsight', { keyPath: 'App_Id' });
  }
  if (!db.objectStoreNames.contains('dailyTracker')) {
    db.createObjectStore('dailyTracker', { keyPath: 'App_Id' });
  }

  if (!db.objectStoreNames.contains('recentCompetitorInsightDealerWise')) {
    db.createObjectStore('recentCompetitorInsightDealerWise', { keyPath: 'accountId' });
  }
  if (!db.objectStoreNames.contains('recentStockVisibilityDealerWise')) {
    db.createObjectStore('recentStockVisibilityDealerWise', { keyPath: 'accountId' });
  }

  if (!db.objectStoreNames.contains('taskOriginal')) {
    db.createObjectStore('taskOriginal', { keyPath: 'Unique_Identifier__c' });
  }
  if (!db.objectStoreNames.contains('taskSync')) {
    
    db.createObjectStore('taskSync', { keyPath: 'Unique_Identifier__c' });
  }
  if (!db.objectStoreNames.contains('salesOrderBackend')) {
    let objectStoreEvent = db.createObjectStore('salesOrderBackend', { keyPath: 'Id' });
    objectStoreEvent.createIndex('Account__c', 'Account__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('sellingTools')) {
    
    let objectStoreEvent = db.createObjectStore('sellingTools', { keyPath: 'Id' });
    objectStoreEvent.createIndex('Selling_Tools_Type__c', 'Selling_Tools_Type__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('nonBeerItems')) {
    
    let objectStoreEvent = db.createObjectStore('nonBeerItems', { keyPath: 'Id' });
    objectStoreEvent.createIndex('RecordType.DeveloperName', 'RecordType.DeveloperName', { unique: false });
  }
  if (!db.objectStoreNames.contains('posm')) {
    db.createObjectStore('posm', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('draft_Signup')) {
      db.createObjectStore('draft_Signup', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('draftPreInstallation')) {
    db.createObjectStore('draftPreInstallation', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('draftInstallation')) {
    db.createObjectStore('draftInstallation', { keyPath: 'App_Id__c' });
  }

  if (!db.objectStoreNames.contains('scheduleVisit')) {
    db.createObjectStore('scheduleVisit', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('machineCommissioning')) {
    db.createObjectStore('machineCommissioning', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('training')) {
    db.createObjectStore('training', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('draftSanitization')) {
    db.createObjectStore('draftSanitization', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('preventiveMaintainance')) {
    db.createObjectStore('preventiveMaintainance', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('draftPullout')) {
    db.createObjectStore('draftPullout', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('auditorObjective')) {
    db.createObjectStore('auditorObjective', { keyPath: 'App_Id__c' });
  }
  if (!db.objectStoreNames.contains('draftItems')) {
    let objectStoreEvent = db.createObjectStore('draftItems', { keyPath: 'Id' });
    objectStoreEvent.createIndex('MachineId__c', 'MachineId__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('posmItems')) {
    let objectStoreEvent = db.createObjectStore('posmItems', { keyPath: 'Id' });
    objectStoreEvent.createIndex('POSM_Requisition__c', 'POSM_Requisition__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('stockChilds')) {
    let objectStoreEvent = db.createObjectStore('stockChilds', { keyPath: 'Id' });
    objectStoreEvent.createIndex('Stock_Visibility_Survey__c', 'Stock_Visibility_Survey__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('samplingChilds')) {
    let objectStoreEvent = db.createObjectStore('samplingChilds', { keyPath: 'Id' });
    objectStoreEvent.createIndex('Product_Pre_Sales_Sampling__c', 'Product_Pre_Sales_Sampling__c', { unique: false });
  }
  if (!db.objectStoreNames.contains('draftPreInstallationApproval')) {
    db.createObjectStore('draftPreInstallationApproval', { keyPath: 'Id' });
  }
  if (!db.objectStoreNames.contains('top5SKU')) {
    db.createObjectStore('top5SKU', { keyPath: 'Id' });
  }
});



function writeData(st, data) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.put(data);
      return tx.complete;
    });
}

function writeDataAll(st, data) {
  return dbPromise
    .then((db) => {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      for (let i of data) {
        store.put(i);
      }
      return tx.complete;
    });
}

function readAllData(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    });
}

	
const openCursorForStore = async(st,key) =>{
  let db = await dbPromise;
  let tx = await db.transaction(st, 'readonly');
  let store = tx.objectStore(st);
  let indexTemp = store.index('Account_Name_IndexedDB_Helper__c');
  let cursorRequest;
  if(key){
    let keyRangeValue = IDBKeyRange.lowerBound(key,false);
    cursorRequest = await indexTemp.openCursor();
  } 
  else{
    cursorRequest = await indexTemp.openCursor();
  }
  
  return cursorRequest;
}

const keyBasedSearchingIndexedDB = async(st,searchTerm) =>{
  let db = await dbPromise;
  let tx = db.transaction(st, 'readonly');
  let store = tx.objectStore(st);
  let indexTemp = store.index('Account_Name_IndexedDB_Helper__c');
  let keyRangeValue = IDBKeyRange.bound(searchTerm,'\uffff'+searchTerm+'\uffff');
  let cursorRequest =  await indexTemp.openCursor(keyRangeValue);
  return cursorRequest;
};

const fetchFromCursor = async (openCursor) => {
  let valueReturn = null;
  if(openCursor){
      valueReturn = openCursor.value;  
      await openCursor.continue(); 
  }
  return valueReturn;
};

const fetchFromCursorAccountListView = async (openCursor) => {
  let valueReturn = null;
  
  if(openCursor){
    valueReturn = openCursor.value;  
  }
  return valueReturn;
};

const objectStoreCount = async(st) => {
  let db = await dbPromise;
  let tx = db.transaction(st, 'readonly');
  let store = tx.objectStore(st);
  let countRequest =await  store.count();
  return countRequest;
};


const clearAllData = async (st) => {
  let values = await readAllData(st);
  if (values.length > 0) {
    let db = await dbPromise;
    var tx = db.transaction(st, 'readwrite');
    var store = tx.objectStore(st);
    store.clear();
    return tx.complete;
  }
  return;

};
const getItemFromStore = async (st, id) => {
  let db = await dbPromise;
  let tx = db.transaction(st, 'readonly');
  let store = tx.objectStore(st);
  let ele = await store.get(id);
  return ele;
};



function deleteItemFromData(st, id) {
  dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
    });
}



function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

const fetchSortedResult = async (st, key) => {
  let res = [];
  let db = await dbPromise;
  let tx = await db.transaction(st, 'readonly');
  let store = tx.objectStore(st);
  let index = store.index(key);
  let cursorRequest = await index.openCursor();
  while (cursorRequest) {
    res.push(cursorRequest.value);
    cursorRequest = await cursorRequest.continue();

  }
  return res;

};


const fetchRecordsUsingIndex = async (st, key, searchKey) => {
  let db = await dbPromise;
  let tx = await db.transaction(st, 'readonly');
  let store = tx.objectStore(st);
  let index = store.index(key);
  let request = await index.openCursor(IDBKeyRange.only(searchKey));
  let events = [];
  while (request) {
    events.push(request.value);
    request = await request.continue();
  }
  return events;

};

// Un-install and install helper
const deleteDatabase = async () => {

  //await navigator.serviceWorker.unregister();
  if ('serviceWorker' in navigator) {
    let registrations = await navigator.serviceWorker.getRegistrations();
    for (let i = 0; i < registrations.length; i++) {
      registrations[i].unregister();
    }
  }
  let cachesList = await caches.keys();
  for(let i=0;i<cachesList.length;i++){
    await  caches.delete(cachesList[i]);
  }
await window.indexedDB.deleteDatabase('bira91');
};

// http redirection 
if (!(location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }
}

