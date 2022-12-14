let assetMap = new Map();
let draftPullout = {};
let isReadOnly = false;
let eventRec;
let urlParam;

const initializePulloutFunc = (async() => {
    let utility = await getItemFromStore('utility','event');
    urlParam = new URLSearchParams(window.location.search);

    if(urlParam.get('eventId'))
    {
        eventRec = await getItemFromStore('events',urlParam.get('eventId'));
    }
    
    accountRec = utility.account;
    
    showAccount();
    createPullOutHomePage();
    fetchAssetIds();
    if(eventRec){
        $('#Asset_Id').val(eventRec.Draft_Installation__r.Display_Machine_Id__c);
        $('#Asset_Id').attr('readonly',true);
        await handleSelectedAssetId();
    }
})();


// const fetchApprovedPullout = () =>{
//     draftPullout = {
//         Account__c : eventRec.Account__r.Name,
//         Machine_Id__c : eventRec.Draft_Installation__r.Display_Machine_Id__c,
//         Recommended_Machine_type__c : eventRec.Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Machine_type__c,
//         Recommended_Tower_Type__c : eventRec.Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Tower_Type__c,
//         Number__c : eventRec.Draft_Pullout__r.Draft_Sign_up__r.Number__c,
//         Location_of_Draft_machine__c : eventRec.Draft_Pullout__r.Draft_Sign_up__r.Location_of_Draft_machine__c,
//         Cluster_Name__c : eventRec.Account__r.Cluster__r.Name,
//     }
    
//     console.log(draftPullout)
//  //   await writeData('draftPullout',draftPullout);
    
// }

const fetchAssetIds = () => {
    let tmp = '';
    if(accountRec.Draft_Installations__r&&accountRec.Draft_Installations__r.records.length>0){
        for(let i of accountRec.Draft_Installations__r.records){
            if(i.RecordType.DeveloperName==='Installed'){
                console.log(i)
                assetMap.set(i.Machine_Id_Not_Sign_Up__c,i);
                tmp += `<option value='${i.Machine_Id_Not_Sign_Up__c}'>${i.Machine_Id_Not_Sign_Up__c}</option>`;
            }
        }
        if(tmp)
            $('#Asset_Id').append(tmp);
    }
};

const handleSelectedAssetId =async () => {
    const selectedValue = $('#Asset_Id').val();
    let draftData = assetMap.get(selectedValue);
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+draftData.Id;
    draftPullout = await getItemFromStore('draftPullout',key);
    
    if(draftPullout && draftPullout.isCheckedOut === true){
        // Call Readonly Function and Display Notification
        isReadOnly = true;
        $('input').prop('disabled',true);
        $('.isReadOnly').prop('disabled',true);
        $('.btn-submit').prop('disabled',true);
        showNotification({message : 'Page is opened in readonly mode!'});
        for(let i in draftPullout){
            if(typeof draftPullout[i]==='boolean'){
                $(`#${i}`).prop('checked',draftPullout[i]);
            }
            else{
                $(`#${i}`).val(draftPullout[i]);
            }
            if(i === 'Security_Deposit' && !draftPullout[i]){
                $('#Amount').parent().parent().css('display','block');
            }else if(i === 'Security_Deposit' && draftPullout[i]){
                $('#Amount').parent().parent().css('display','none');
            }
        }
    }
    else{
        isReadOnly = false;
        draftPullout = {};
        
        $('#RGP_Number').val(draftData.Draft_Pre_Installation__r ? draftData.Draft_Pre_Installation__r.Machine_Model_RGP_Number__c : '');
        $('#Recommended_Machine_type').val(draftData.Draft_Sign_up__r ? draftData.Draft_Sign_up__r.Number__c  : '');
        $('#Amount').val(draftData.Draft_Sign_up__r ? draftData.Draft_Sign_up__r.Deposit_Amount__c : '');
        draftPullout['RGP_Number'] = draftData.Draft_Pre_Installation__r ? draftData.Draft_Pre_Installation__r.RGP_Number__c : '';
        draftPullout['Recommended_Machine_type'] = draftData.Draft_Pre_Installation__r ? draftData.Draft_Pre_Installation__r.Recommended_Machine_type__c : draftData.Draft_Sign_up__r.Recommended_Machine_type__c ? draftData.Draft_Sign_up__r.Recommended_Machine_type__c : '';
        draftPullout['Amount'] = draftData.Draft_Sign_up__r ? draftData.Draft_Sign_up__r.Deposit_Amount__c : '';
        draftPullout['Asset_Id'] = $('#Asset_Id').val();
        $('#Security_Deposit').prop('checked',draftData.Draft_Sign_up__r ? draftData.Draft_Sign_up__r.Payment_Status__c ==='Payment Received' : false);
        $('#Security_Deposit').prop('disabled',true);
        $('#RGP_Number').prop('disabled',true);
        $('#Recommended_Machine_type').prop('disabled',true);
       
        if($('#Security_Deposit').prop('checked')){
            $('#Amount').parent().parent().parent().css('display','none');
        }else{
            $('#Amount').parent().parent().parent().css('display','block');
        }
    }   
};

const submitForm =async () => {
    if(isReadOnly){
        cancelForm();
        return;
    }
    if(!draftPullout['Asset_Id']){
        showNotification({message : 'Asset Id is mandatory!'})
    }

    if(draftPullout['Pullout_Reason__c'] ==='Others' && !$('#In_case_of_Others__c').val()){
        showNotification({message : 'Reason is mandatory in case of Others'});
        return;
    }
    
    // if($('#RGP_Number').val().split('').length !== 8){
    //     showNotification({message : 'RGP Number should be 8 digit'});
    //     return;
    // }

    if(!$('#Pullout_Date__c').val() || ! draftPullout['Pullout_Reason__c'] || !$('#Recommended_Machine_type').val()){
        showNotification({message : 'Machine Type, RGP Number, Pullout date and Pullout Reason is mandatory!'})
        return;
    }
    else{
        draftPullout['Pullout_Date__c'] = $('#Pullout_Date__c').val();
    }
    const assetData = assetMap.get(draftPullout['Asset_Id']);
    draftPullout = {
        ...draftPullout,
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        isCheckedOut : false,
        App_Id__c : eventRec ? eventRec.Draft_Pullout__r.App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+assetData.Id,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
        Draft_Installation__c : assetData.Id,
        Draft_Pre_Installation__c : assetData.Draft_Pre_Installation__c,
        Draft_Sign_up__c : assetData.Draft_Sign_up__c,
        Event_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id,
        Account__c : accountRec.Id,
        Record_Type_Helper__c : 'Draft_Pull_Out',
        Sales_Request__c : true,
        Status__c :'Pullout initiated',
        In_case_of_Others__c : $('#In_case_of_Others__c').val()
    };
    await writeData('draftPullout',draftPullout);
    cancelForm();
};
const cancelForm = () => {
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+listOfAccount[accountIndex].Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='On_Premise_General'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Consumer'){
        window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Institutional_Off_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Institutional_On_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Non_beer_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Off_Premise_Outlet'){
        window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='On_Premise_Hotel'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Supplier'){
        window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Temporary_Event'){
        window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName ==='Wholesaler'){
        window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
    else if(recordTypeName==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id+'&eventId='+urlParam.get('eventId');
    }
};