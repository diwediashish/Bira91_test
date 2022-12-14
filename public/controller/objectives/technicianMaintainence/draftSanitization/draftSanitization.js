let draftSanitization;
let isReadOnly = false;
let typeOfRequest = {
    sanitization: 'Sanitization',
    PM: 'PM',
};
let typeValue = typeOfRequest.sanitization;
let utility;

const headerFormation = () => {
    if (typeValue === typeOfRequest.PM) {
        $('#page1Header').html('Equipment Condition before PM');
        $('#page2Header').html('Preventive Maintenance Checklist');
        $('#page4Header').html('Equipment Condition after PM');
    }
    else {
        $('#page1Header').html('Equipment Condition before Sanitization');
        $('#page2Header').html('Draft Sanitization checklist');
        $('#page4Header').html('Equipment Condition after Sanitization');
    }
};
const initializeDraftSanitization = (async () => {
    utility = await getItemFromStore('utility', 'event');
    console.log(utility);
    accountRec = utility.account;
    showAccount();
    let key;
    if (utility.event.Type__c !== 'Draft Sanitization') {
        typeValue = typeOfRequest.PM;
    }
    if (typeValue === typeOfRequest.PM) {
        key = fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + 'PM';
    }
    else {
        key = fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + 'Sanitization';
    }
    if (typeValue === typeOfRequest.PM) {
        draftSanitization = await getItemFromStore('preventiveMaintainance', key);
    }
    else {
        draftSanitization = await getItemFromStore('draftSanitization', key);
    }

    let path = window.location.pathname;
    let page = path.split("/").pop();
    if (draftSanitization && draftSanitization[page]) {
        if(draftSanitization.isCheckedOut === true)
        {
            renderReadOnlyCondition();  
        }
    }
    else {
        if (page === 'technicianSanitization1.html') {
            draftSanitization = {
                Equipment_in_working_condition__c: '1',
                Tower_visibility_condition__c: '1',
                All_Assets_in_Good_Condition__c: '1',
                Is_Bira_91_Tap_Handle_in_good_condition__c: '1',
                Beer_pouring_happening_properly_or_not__c : '1',
                Is_Medallion_in__c: '1',
                Machine_Exterior_clean_or_not__c: '1',
                Beer_cold_or_not__c: '1',
                Brand_Freshness_and_Taste__c: '1',
                Is_Sanitization_required__c: 'No',
                Chiller_body_cleaned__c: '1',
                Tower_cleaned__c: '1',
                Concendsor_condition__c: '1',
                Chiller_Water_Quantity__c: '1',
                Chiller_Water_levels__c: '1',
                Compressor_Cleaned__c : '1',
                Condensor_Cleaned__c : '1',
                Beer_Coil_Cleaned__c : '1',
                Clloing_Coils_Cleaned__c : '1',
                Is_Medallion_in_after__c : '1',
                Beer_pouring_happening_properly_after__c : '1',
                Machine_Exterior_clean_or_not_after__c : '1',
                Beer_cold_or_not_after__c : '1',
                Brand_Freshness_and_Taste_after__c : '1',
                Equipment_in_working_condition_after__c : '1',
                Tower_visibility_condition_after__c : '1',
                All_Assets_in_Good_Condition_after__c : '1',
                Is_Bira91_TapHandle_in_goodcondton_after__c : '1',
            };
        }
        else if (page === 'technicianSanitization3.html') {
            await liquidItemsFormation(utility);
        }

    }
    headerFormation();
    initailizeSanitization();


})();

const liquidItemsFormation = async(utility) => {
    let key;
    if (typeValue === typeOfRequest.PM) {
        key = fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + 'PM';
    }
    else {
        key = fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + 'Sanitization';
    }
    let items = [];
    let liquidArr = new Set();
    let liquidArrKeg = new Set();
    let itemMasterList = await readAllData('itemMaster');
    for (let i of itemMasterList) {
        if (i.Has_Keg_Item__c) {
            liquidArrKeg.add(i.Liquid_Name__c);
        }
    }
    if(accountRec.Retail_Depletion1__r && accountRec.Retail_Depletion1__r.totalSize > 0){
        for(let i of accountRec.Retail_Depletion1__r.records){
            // if(i.Liquid_Name__c && i.Last_90_Days__c && liquidArrKeg.has(i.Liquid_Name__c)){
            //     liquidArr.add(i.Liquid_Name__c);
            // }
            if(i.Liquid_Name__c && i.Last_90_Days__c && i.Has_Keg_Item__c){
                liquidArr.add(i.Liquid_Name__c);
            }
        }
    }
    
    if (liquidArr.size > 0) {
        for (let i of liquidArr.values()) {
            items.push({
                Liquid_Name_Helper__c: i,
                Connected__c : false, 
                Appearance__c: '1',
                Aroma__c: '1',
                Particles__c: '1',
                Temperature__c: '1',
                Taste__c: '1',
                Keg_Installation_date__c: null,
                Keg_Manufacturing_Date__c: null,
                Keg_Expiry_Date__c: null,
                Batch_No__c: null,
                Kegs_in_Stock__c: 0,
                Empty_Kegs__c: 0,
                App_Id__c: fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + '-' + i,
                Draft_Installation_App_Id__c: key,
                Record_Type_Helper__c: 'Maintainence',
                show_detail : false,
                
            });
        }
        draftSanitization.liquidItems = items;
        
    }
    else {
        showNotification({ message: 'No Kegs Billed in L3M!' });
    }
};

const renderReadOnlyCondition = () => {
    showNotification({ message: 'Page is opened in readOnly mode!' });
    isReadOnly = true;

    // More code for readOnly
};


const submitForm = async () => {
    if (isReadOnly) {
        redirectToSecondPage();
        return;
    }
    let path = window.location.pathname;
    let page = path.split("/").pop();
    if (page === 'technicianSanitization1.html') {
        let utility = await getItemFromStore('utility', 'event');
        let key;
        if (typeValue === typeOfRequest.PM) {
            key = fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + 'PM';
        }
        else {
            key = fetchCurrentDateIdStr() + '-' + accountRec.Id + '-' + utility.event.Draft_Installation__c + 'Sanitization';
        }

        draftSanitization = {
            ...draftSanitization,
            Daily_Tracker_App_Id__c: fetchCurrentDateIdStr(),
            Account__c: accountRec.Id,
            App_Id__c: key,
            Draft_Installation__c: utility.event.Draft_Installation__c,
            Draft_Sign_Up__c: utility.event.Draft_Installation__r.Draft_Sign_up__c,
            Outlet__c: accountRec.Id,
            Event_Custom__c: utility.event.Id,
            Record_Type_Helper__c: typeValue === typeOfRequest.PM ? 'Preventive_Maintainence' : 'Sanitization',
            Created_Date: new Date(),
            Last_Modified: new Date(),
            App_Created_Date__c: new Date(),
            isSynced: false,
            isCheckedOut : false,
        }

    }
    draftSanitization[page] = true;
    if (typeValue === typeOfRequest.PM) {
        await writeData('preventiveMaintainance', draftSanitization);
    }
    else {
        await writeData('draftSanitization', draftSanitization);
    }

    redirectToSecondPage();
};
const redirectToSecondPage = () => {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    
    
    if (page === 'technicianSanitization1.html') {
        if (typeValue === typeOfRequest.sanitization) {
            if(draftSanitization.Is_Sanitization_required__c === 'Yes'){
                window.location.href = '/view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization2.html';
            }
            else{
               // showNotification({message : 'Sanitization not required selected! '});
                window.location.href = '/view/objectives/technicianMaitainence/draftMaintainenceHomePage.html';
            }
        }
        else{
            window.location.href = '/view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization2.html';
        }
    }
    if (page === 'technicianSanitization2.html') {
        window.location.href = '/view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization3.html';
    }
    if (page === 'technicianSanitization3.html') {
        window.location.href = '/view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization4.html';
    }
    if (page === 'technicianSanitization4.html') {
        if (!draftSanitization['Need_Replacement_of_any_item__c']) {
            window.location.href = '/view/objectives/technicianMaitainence/draftMaintainenceHomePage.html';
        }
        else {
            if (typeValue === typeOfRequest.PM) {
                window.location.href = '/view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.html?PMType=true';
            }
            else {
                window.location.href = '/view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.html?sanitizationType=true';
            }
        }


    }

};


