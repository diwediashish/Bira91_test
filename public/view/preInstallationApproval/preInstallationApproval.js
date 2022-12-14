

let selectOptions = new Map([
    ['Recommended_Machine_type__c' ,['Mini Lady','R 60','HE 120 Two Way','HE 90','Tip Tap','Beer Cooler','Counter Top 17 L and 50 L','Event Cooler','HE 120 Four Way']],
    ['Recommended_Tower_Type__c' ,['1 Way Shield Tower','2 Way Smash','4 way Falcon Tower with Faucets','2 Way Shield with faucet','2 Way Shield with Black Font','2 Way Flute','2 Way Lucky','2 Way Snake','4 Way Falcon with Debi Tap','4 way falcon tower']],
    ['Location_of_Draft_machine__c',['Bar Counter','Separate Table','Others']]
]);
let isReadOnly = true;

let draftPreInstallation = {}
initializeApproval = () =>{
    createPreInstalltionSection();
}

const createPreInstalltionSection = () =>{
    $('#preInstall').html('');

    let tmp = `
        <div class="row">
            <div class="col-xs-6 label-margin">Account Name</div>
            <div class="col-xs-6 no-padd">${createInputField('Account',accountRec.Name ? accountRec.Name : '' ,'text',true)}</div>
            
        </div>

        <div class="row">
            <div class="col-xs-6 label-margin">Machine Id</div>
            <div class="col-xs-6 no-padd">${createInputField('Display_Machine_Id__c',draftPreInstallation['Machine_Id_Not_Sign_Up__c'] ?draftPreInstallation['Machine_Id_Not_Sign_Up__c'] : '' ,'text',true)}</div>
            
        </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Machine Type</div>
            <div class="col-xs-6 no-padd">${createTextArea('Recommended_Machine_Type_Sales__c',draftPreInstallation['Recommended_Machine_type__c'] ?draftPreInstallation['Recommended_Machine_type__c'] : draftPreInstallation.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c ? draftPreInstallation.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c : '','text',true)}</div>
        </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Tower Type</div>
            <div class="col-xs-6 no-padd">${createTextArea('Recommended_Tower_Type_Sales__c',draftPreInstallation['Recommended_Tower_Type__c'] ?draftPreInstallation['Recommended_Tower_Type__c'] : draftPreInstallation.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c ? draftPreInstallation.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c : '','text',true)}</div>
        </div>
       
        <div class="row">
            <div class="col-xs-6 label-margin">Over the Counter Space Required</div>
            <div class="col-xs-6 no-padd">${createInputField('Over_the_counter_space_required__c',draftPreInstallation['Over_the_counter_space_required__c'] ?draftPreInstallation['Over_the_counter_space_required__c'] : '','text',isReadOnly)}</div>
            </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Under the Counter Space Required</div>
            <div class="col-xs-6 no-padd">${createInputField('Under_the_counter_space_required__c',draftPreInstallation['Under_the_counter_space_required__c'] ?draftPreInstallation['Under_the_counter_space_required__c'] : '','text',isReadOnly)}</div>
        </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Location of Machine</div>
            <div class="col-xs-6">${createSelectOption('Location_of_Draft_machine__c',draftPreInstallation['Location_of_Draft_machine__c'] ?draftPreInstallation['Location_of_Draft_machine__c'] : '',selectOptions.get('Location_of_Draft_machine__c'),isReadOnly)}</div>
            
        </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Reason for Change</div>
            <div class="col-xs-6">${createTextArea('Reason_for_Change__c',draftPreInstallation['Reason_for_Change__c'] ?draftPreInstallation['Reason_for_Change__c'] : '',isReadOnly)}</div>
        </div>
        <div class="row">
            <div class="col-xs-8">Confirmed with the Outlet Owner for Installation</div>
            <div class="col-xs-4">${createToggleField('Confirmed_with_the_outlet_owner_for_inst__c',draftPreInstallation['Confirmed_with_the_outlet_owner_for_inst__c'] ?draftPreInstallation['Confirmed_with_the_outlet_owner_for_inst__c'] : false,isReadOnly)}</div>
        </div>
    `;

    $('#preInstall').append(tmp);
};



const createInputField = (id,value,type,disabled = false) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input type="${type}" ${disabled ? 'disabled' : ''} class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};


const createToggleField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value === true ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)"  ${disabled ? 'disabled' : ''}>
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};




const createImageCapture = (id,value,disabled) =>{

    let tmp = '';

        tmp = `
        <div class="image-upload_NoInput form-group" >
            <div class="camera">
                <label for="${id}" ${value ? 'style="color:#5cb85c"' : ''}>
                    <i class="fa fa-camera ${id}" aria-hidden="true"></i>                                    
                </label>
                <input id="${id}"  ${disabled ? 'disabled' : ''} onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div> `;
    return tmp;
};


const createTextArea = (id,value,disabled) =>{

    let tmp = '';
    let rows = ((id === 'Recommended_Machine_Type_Sales__c' || id === 'Recommended_Tower_Type_Sales__c') && value) ? value.split('/').length : '3';

    tmp = `
        <div class="form-group">
            <textarea rows="${rows ? rows : '2'}" class="form-control"  ${disabled ? 'readonly' : ''} id="${id}" value="${value ? value : ''}">${value ? value : ''}</textarea>
        </div>
        `;
    return tmp;
};

const createSelectOption = (id,value,options,disabled) =>{
    let tmp =`
       <div class="form-group">
        <select class="form-control" ${disabled ? 'disabled' : ''} id="${id}" onchange="handleSelectChange(this)">
            <option value="">--None--</option>
    `;

    for(let i = 0;i<options.length;i++){
        tmp +=`
        <option value="${options[i]}" ${options[i] === value ? 'selected' : ''}>${options[i]}</option>
        `;
    }

    tmp += '</select></div>';

    return tmp;
};

const accountDetail =async () =>{
    
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='On_Premise_General'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Consumer'){
        window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Institutional_Off_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Institutional_On_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Non_beer_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Off_Premise_Outlet'){
        window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='On_Premise_Hotel'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Supplier'){
        window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Temporary_Event'){
        window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    else if(recordTypeName ==='Wholesaler'){
        window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id='+accountRec.Id+'&page=Approval';
    }
    
}



