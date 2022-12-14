let utility
let draftInstallation;
let isReadOnly = false;
const initializePreInstallationFunc = async() => {
    utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
    draftInstallation = await getItemFromStore('draftInstallation',key);
    if(draftInstallation && draftInstallation.isCheckedOut === true){
        isReadOnly = true;
        showNotification({message : 'Installation has been done, opening the page in Read-only Mode!'});
        removeActionButton();
    }
    showAccount();
    initailizeMethod(utility.event);
};
const removeActionButton = () => {
    $('#installationPartiallyDoneBtn').css('display','none');
    $('#installationNotDoneBtn').css('display','none');
    $('#installationDoneBtn').css('display','none');
    if(draftInstallation.items){
        $('#damagedItemRequisition').css('display','block');
    }
    
};
const handleRequisitionBtn = () => {
    window.location.href = '/view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.html';
};
const submitForm = async(ele) => {
    if(isReadOnly){
        redirectDraftHome();
        return;
    }
    const submitType = $(ele).attr('name');
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
    let reasonForNotInstallating = null;
    if(submitType==='Partially Installed'&&!$('#Partial-Select').val()){
        showNotification({message : 'Reason for Partially Installed are mandatory!'});
        return;
    }
    else if(submitType==='Partially Installed'){
        reasonForNotInstallating = $('#Partial-Select').val();
    }
    if(submitType==='Not Installed'&&!$('#NotDone-Select').val()){
        showNotification({message : 'Reason for Not Installed are mandatory!'});
        return;
    }
    else if(submitType==='Not Installed'){
        reasonForNotInstallating = $('#NotDone-Select').val();
    }
    if(submitType !== 'Not Installed'){
        let draftItem = await fetchRecordsUsingIndex('draftItems','MachineId__c',utility.event.Draft_Installation__r.Machine_Id_Not_Sign_Up__c);
        let hasItemDelivered = false;
        for(let i of draftItem){
            
            if(i.Status__c === 'Delivered'){
                hasItemDelivered = true;
            }
        }
        if(!hasItemDelivered){
            showNotification({message : 'Items should be delivered in order proceed with Installation!'});
            return;
        }
    }
    let status;
    if(submitType==='Partially Installed'){
        status = 'Partially Done';
    }else if(submitType==='Not Installed'){
        status = 'Installation Not Done'
    }else if(submitType === 'Installed'){
        status = 'Installed';
    }
    
    draftInstallation = {
        Record_Type_Helper__c : submitType,
        App_Id__c : key,
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        Status__c : status,
        isCheckedOut : false,
        Account__c : accountRec.Id,
        Event_Custom__c : utility.event.Id,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
        Draft_Pre_Installation__c : utility.event.Draft_Installation__c ? utility.event.Draft_Installation__c : null,
        Draft_Sign_up__c  :utility.event.Draft_Installation__r ?  utility.event.Draft_Installation__r.Draft_Sign_up__c : null,
        Reasons_for_not_Installed__c : reasonForNotInstallating,
        Recommended_Machine_type__c : utility.event.Draft_Installation__r.Recommended_Machine_type__c,
        Recommended_Tower_Type__c : utility.event.Draft_Installation__r.Recommended_Tower_Type__c
    };

    // Save the record in DB
    await writeData('draftInstallation',draftInstallation);

    
    if(submitType==='Installed'){
        redirectDraftHome();
    }
    else{
        if(reasonForNotInstallating==='Some Items were Damaged'){
            window.location.href = '/view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.html';
        }
        else{
            window.location.href = `/view/objectives/scheduleVisit/technicianScheduleVisit.html?accountId=${accountRec.Id}&installatedRedirect=true&preInstallationId=${utility.event.Draft_Installation__c}&machineNo=${utility.event.Draft_Installation__r.Machine_Id_Not_Sign_Up__c}`
        }
    }
};


initializePreInstallationFunc();

