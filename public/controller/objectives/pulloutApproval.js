const intializePulloutApproval = ( async () => {
    let urlParam = new URLSearchParams(window.location.search);
    console.log(urlParam.get('eventId'));
    if(urlParam.get('eventId')){
        let eventRec = await getItemFromStore('events',urlParam.get('eventId'));
        draftInstallation = {
            Account__c : eventRec.Account__r.Name,
            Machine_Id__c : eventRec.Draft_Installation__r.Display_Machine_Id__c,
            Recommended_Machine_type__c : eventRec.Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Machine_type__c ? eventRec.Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Machine_type__c : eventRec.Draft_Pullout__r.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c ? eventRec.Draft_Pullout__r.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c : '',
            Recommended_Tower_Type__c : eventRec.Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Tower_Type__c ? eventRec.Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Tower_Type__c : eventRec.Draft_Pullout__r.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c ? eventRec.Draft_Pullout__r.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c : '',
            Number__c : eventRec.Draft_Pullout__r.Draft_Sign_up__r.Number__c,
            Location_of_Draft_machine__c : eventRec.Draft_Pullout__r.Draft_Sign_up__r.Location_of_Draft_machine__c,
            Cluster_Name__c : eventRec.Account__r.Cluster__r.Name,
        }
        initializePulloutApproval();
    }
    else{
        showNotification({message : 'Event Id not found. Please contact System administrator!'});
        $('#pulloutApproval').html('');
    }
})();


handleApprove = async() =>{
    let urlParam = new URLSearchParams(window.location.search);
    let eventRec = await getItemFromStore('events',urlParam.get('eventId'));
    // let draftPullout = {
    //     Created_Date : new Date(),
    //     Last_Modified : new Date(),
    //     App_Created_Date__c : new Date(),
    //     isSynced : false,
    //     App_Id__c : eventRec.Draft_Pullout__r.App_Id__c,
    //     Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
    //     Event_Id__c : fetchCurrentDateIdStr()+'-'+eventRec.Account__c,
    //     Record_Type_Helper__c : 'Draft_Pull_Out',
    //     Status__c :'Pullout initiated',
    //     Sales_Request__c : true,
        
    // }
    // await writeData('draftPullout',draftPullout);
    // let accountRec = await getItemFromStore('account',eventRec.Account__c);
  //  cancelForm(accountRec);
    window.location.href = '/view/objectives/draftPullout/draftPulloutSales.html?eventId='+urlParam.get('eventId');
};
const handleReject =  async () => {
    let rejectReason = $('#reject').val();

    if(!rejectReason){
        showNotification({ message: 'Reason for Rejection is mandatory' });
                    
        return
    }
    let urlParam = new URLSearchParams(window.location.search);
    let eventRec = await getItemFromStore('events',urlParam.get('eventId'));
    let draftPullout = {
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : false,
        App_Id__c : eventRec.Draft_Pullout__r.App_Id__c,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
        Event_Id__c : fetchCurrentDateIdStr()+'-'+eventRec.Account__c,
        Record_Type_Helper__c : 'Draft_Pull_Out',
        Status__c :'Pullout Rejected by SO',
        Sales_Request__c : true,
        Sales_Pullout_Reason__c : $('#reject').val() 
    }
    await writeData('draftPullout',draftPullout);
    let accountRec = await getItemFromStore('account',eventRec.Account__c);
    cancelForm(accountRec);
};
const cancelForm = (accountRec) => {
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+listOfAccount[accountIndex].Id;
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