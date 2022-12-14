
let draftInstallation = {};
let isReadOnly = false;
let typeOfRequest = {
    Sanitization : 'Sanitization',
    default : 'default',
    PM : 'PM',
    Pullout : 'Pullout'

} ;
let typeValue = typeOfRequest.default;
let numberOfTaps = 0;
let utility;
const draftInstallationRequisitionInitialize = async () => {
    utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    showAccount();
    let urlParam = new URLSearchParams(window.location.search);
    if(urlParam.has('sanitizationType')){
        typeValue = typeOfRequest.Sanitization;
    }
    else if(urlParam.has('PMType')){
        typeValue = typeOfRequest.PM;
    }
    else if(urlParam.has('pullout')){
        typeValue = typeOfRequest.Pullout;
    }
    if(typeValue===typeOfRequest.Sanitization){
        const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'Sanitization';
        draftInstallation = await getItemFromStore('draftSanitization',key);
        
    }
    else if(typeValue===typeOfRequest.PM){
        const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'PM';
        draftInstallation = await getItemFromStore('preventiveMaintainance',key);
    }
    else if(typeValue===typeOfRequest.Pullout){
        const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__r.Draft_Installation__c;
        draftInstallation = await getItemFromStore('draftPullout',key);
        if(!draftInstallation){
            draftInstallation ={};
        }
    }
    else{
        const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
        draftInstallation = await getItemFromStore('draftInstallation',key);
    }
    if(draftInstallation.items && draftInstallation.isCheckedOut === true){
        isReadOnly = true;
    }
    await fetchProductInitialization(utility);
    initializeDraftAdditional();
    if(isReadOnly){
        renderPostCreationForm();
    }
    showSummarySection();
    
};

const renderPostCreationForm = () => {
    isReadOnly = true;
    showNotification({message : 'Page is opened in read only mode!'});
    for(let i in draftInstallation){
        if(typeof draftInstallation[i] === 'boolean'&&draftInstallation[i]){
            $(`.${i}`).css('display','block');
            $(`#${i}`).prop('checked',true);
        }
        
    }
};
//let draftSection = new Set(['Machine Model','Clamp Required','Coupler Type','Fittings','Hard Grade Pipe','Python Pipe','CO2 Regulator Type','CO2 Regulator Wrench Type','Tower Model','CO2 Cylinder Type','Drip Tray']);
const fetchProductInitialization = async (utility) => {
    let draftItems
    draftItems = draftInstallation.items ? draftInstallation.items  :  await fetchRecordsUsingIndex('nonBeerItems','RecordType.DeveloperName','Draft') ;
    console.log(draftItems)
    let sectionMap = new Map();
    let key;
    if(typeValue===typeOfRequest.Sanitization){
        key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'Sanitization';
        
    }
    else if(typeValue===typeOfRequest.PM){
        key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c+'PM';
       
    }
    else if(typeValue===typeOfRequest.Pullout){
        key = utility.event.Draft_Installation__r.App_Id__c;//fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__r.Draft_Installation__c;
       
    }
    else{
        key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
        
    }
    let productQuantityMap = await previousQuantityTotal();
    let draftSection = new Set();
    for(let i of draftItems) {
        draftSection.add(i.Draft_Section__c);
    }
    for(let i of draftItems){
        if(draftSection.has(i.Draft_Section__c) && i.Draft_Section__c){    
            if(sectionMap.has(i.Draft_Section__c)){
                let prevQty = productQuantityMap.has(i.Product__c ?i.Product__c  : i.Id) ? productQuantityMap.get(i.Product__c ?i.Product__c  : i.Id) : 0;
                let qty = i.Quantity__c ?i.Quantity__c  : 0;

                let tmpObject = sectionMap.get(i.Draft_Section__c);
                tmpObject.items.push({
                    App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+(i.Product__c ?i.Product__c  : i.Id)+'-'+utility.event.Id,
                    Draft_Installation_App_Id__c : key,
                    Quantity__c : i.Quantity__c ?i.Quantity__c  : 0 ,
                    Product__c : i.Product__c ?i.Product__c  : i.Id,
                    preQuan : productQuantityMap.has(i.Product__c ?i.Product__c  : i.Id) ? productQuantityMap.get(i.Product__c ?i.Product__c  : i.Id) : 0,
                    ProductName : i.ProductName ?i.ProductName : i.Name,
                    Draft_Section__c : i.Draft_Section__c,
                    Pullout_Quantity__c : prevQty - qty,
                    Missing_Damaged__c : i.Missing_Damaged__c ?i.Missing_Damaged__c : null,
                    Record_Type_Helper__c : 'Draft_Line_Item',
                  //  Record_Type_Helper__c : (typeValue === typeOfRequest.Pullout || typeValue === typeOfRequest.default) ? 'Draft_Line_Item' : 'Maintainence',
                });
            }
            else{
                let prevQty = productQuantityMap.has(i.Product__c ?i.Product__c  : i.Id) ? productQuantityMap.get(i.Product__c ?i.Product__c  : i.Id) : 0;
                let qty = i.Quantity__c ?i.Quantity__c  : 0;
                let tmpObject = {
                    type : i.Draft_Section__c,
                    typeId : i.Draft_Section__c.replace(/ /g,"_")+'__c',
                    items : [
                        {
                            App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+(i.Product__c ?i.Product__c  : i.Id)+'-'+utility.event.Id,
                            Draft_Installation_App_Id__c : key,
                            Quantity__c :i.Quantity__c ?i.Quantity__c  : 0 ,
                            preQuan : productQuantityMap.has(i.Product__c ?i.Product__c  : i.Id) ? productQuantityMap.get(i.Product__c ?i.Product__c  : i.Id) : 0,
                            Product__c : i.Product__c ?i.Product__c  : i.Id,
                            ProductName : i.ProductName ?i.ProductName : i.Name,
                            Draft_Section__c : i.Draft_Section__c,
                            Pullout_Quantity__c : prevQty - qty,
                            Missing_Damaged__c : i.Missing_Damaged__c ?i.Missing_Damaged__c : null ,
                            Record_Type_Helper__c : 'Draft_Line_Item',
                            //Record_Type_Helper__c : (typeValue === typeOfRequest.Pullout || typeValue === typeOfRequest.default) ? 'Draft_Line_Item' : 'Maintainence',
                        }
                    ]
                };
                sectionMap.set(i.Draft_Section__c,tmpObject); 
            }
        }
    }
    draftInstallation.items = [];
    for(let [key,value] of sectionMap){
        draftInstallation.items.push(value);
    }

  // console.log(draftInstallation.items)

    for(let i of draftInstallation.items){
      if(typeValue === typeOfRequest.Pullout){
        i['items'] = i['items'].filter((obj) => obj.preQuan !== 0)
      }
    }

  //  console.log(draftInstallation.items)
    
}

const previousQuantityTotal =async () => {
    let productQuantityMap = new Map();
    let utility = await getItemFromStore('utility','event');
    const machineId = (utility.event.Draft_Installation__r.Display_Machine_Id__c).length>(utility.event.Draft_Installation__r.Machine_Id_Not_Sign_Up__c).length ?   utility.event.Draft_Installation__r.Display_Machine_Id__c :utility.event.Draft_Installation__r.Machine_Id_Not_Sign_Up__c;
    let previousDraftItems = await fetchRecordsUsingIndex('draftItems','MachineId__c',machineId);
    for(let i of previousDraftItems){
        if(i.Quantity__c){
            if(productQuantityMap.has(i.Product__c)){
                let quantity = productQuantityMap.get(i.Product__c);
                quantity += i.Quantity__c;
                productQuantityMap.set(i.Product__c,quantity);
            }
            else{
                productQuantityMap.set(i.Product__c,i.Quantity__c);
            }
        }
        
    }
    return productQuantityMap;
};

const submitInstallationRequisition = async () => {
    if(isReadOnly){
        if(typeValue === typeOfRequest.Sanitization ||typeValue===typeOfRequest.PM ){
            window.location.href = '/view/objectives/technicianMaitainence/draftMaintainenceHomePage.html';
        }
        else if(typeValue === typeOfRequest.Pullout){
            window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
        }
        else{
            window.location.href = '/view/objectives/technicianInstallation/technicianInstallationHomePage.html';
        }
        return;
    }
    let tempProduct = [];
    let isValid = true;
    for(let i of draftInstallation.items){
        tempProduct = tempProduct.concat(i.items);
    }
    for(let i of tempProduct){
        if(i.Quantity__c>0&&!i.Missing_Damaged__c){
            showNotification({message : 'Missing/Damage is mandatory where quantity is mentioned!'});
            isValid = false;
            break;
        }
    }

    //console.log(draftInstallation)
    for(let i in draftInstallation){
        for(let j of draftInstallation.items)
        {
            for(let k=0;k< j.items.length;k++){
               // console.log(k,j.items[k],j)
                if(j.items[k].Quantity__c>0&&j.items[k].Missing_Damaged__c){
                    if(!(`${j.typeId}_${k}_File` in draftInstallation)){
                        showNotification({message : 'Image is mandatory where Quantity is mentioned'});
                        return;
                    }
                }
            }
        }
        
    }
    if(!isValid){
        return;
    }
    draftInstallation.items = tempProduct;
    if(typeValue === typeOfRequest.Sanitization){
        await writeData('draftSanitization',draftInstallation);
        window.location.href = '/view/objectives/technicianMaitainence/draftMaintainenceHomePage.html';
    }
    else if(typeValue===typeOfRequest.PM){
        await writeData('preventiveMaintainance',draftInstallation);
        window.location.href = '/view/objectives/technicianMaitainence/draftMaintainenceHomePage.html';
    }
    else if(typeValue === typeOfRequest.Pullout){
        let utility = await getItemFromStore('utility','event');
        draftInstallation = {
            ...draftInstallation,
            Created_Date : new Date(),
            Last_Modified : new Date(),
            App_Created_Date__c : new Date(),
            App_Id__c : utility.event.Draft_Installation__r.App_Id__c,//fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__r.Draft_Installation__c,
            Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
            Event_Custom_Technician__c : utility.event.Id,
            Record_Type_Helper__c : 'Draft_Pull_Out',
            Sales_Request__c : false,
            Account__c : accountRec.Id,
            isSynced : false,
            isCheckedOut : false,
            Status__c : 'PullOut Done',
        }
        await writeData('draftPullout',draftInstallation);
        window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
    }
    else{
        await writeData('draftInstallation',draftInstallation);
        window.location.href = '/view/objectives/technicianInstallation/technicianInstallationHomePage.html';
    }
    
};

draftInstallationRequisitionInitialize();