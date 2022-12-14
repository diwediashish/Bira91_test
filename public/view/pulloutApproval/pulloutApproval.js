let draftInstallation = {
    'Account__c' : 'abd',
    'Machine_Id__c' : '345',
    'Recommended_Machine_type__c' : 'frds',
    'Recommended_Tower_Type__c' : 'fdjd',
    'Number__c' :'45',
    'Location_of_Draft_machine__c' :'54',
    'Cluster_Name__c':'Delhi'
};
let isReadOnly = true;

let fieldMap = new Map([
    ['Account__c','Account'],['Machine_Id__c','Machine Id'],
    ['Recommended_Machine_type__c','Machine Type'],['Recommended_Tower_Type__c','Tower Type'],
    ['Number__c','Number Of Taps'],['Location_of_Draft_machine__c','Location Of Draft Machine'],
    ['Cluster_Name__c','Cluster']
]);

initializePulloutApproval = () =>{
    showAccount();
    let tmp = '';
    $('#pulloutApproval').html('');

    let field = ['Account__c','Machine_Id__c','Recommended_Machine_type__c','Recommended_Tower_Type__c','Number__c',
                'Location_of_Draft_machine__c','Cluster_Name__c'];

    for(let i of field)
    {
        if(i === 'Recommended_Machine_type__c' || i === 'Recommended_Tower_Type__c')
        {
            tmp += `
                <div class="form-group">
                    <lable>${fieldMap.get(i)}</lable>
                    <textarea class="form-control" ${isReadOnly ? 'disabled' : ''} id="${i}" value="${draftInstallation[i] ? draftInstallation[i] : ''}">${draftInstallation[i] ? draftInstallation[i] : ''}</textarea>
                </div>`;
        }else{
            tmp += createInputField(i,draftInstallation[i],fieldMap.get(i));
        }
    }
    $('#pulloutApproval').append(tmp);

};



const createInputField = (id,value,lable) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <lable>${lable}</lable>
            <input class="form-control" ${isReadOnly ? 'disabled' : ''} id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};

const accountDetail = async() =>{
    let urlParam = new URLSearchParams(window.location.search);
    let eventRec = await getItemFromStore('events',urlParam.get('eventId'));
    let accountRec = await getItemFromStore('account',eventRec.Account__c); // account to be tag

    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id='+accountRec.Id;
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
    
}



