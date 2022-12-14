
const initailizeMethod = (event) =>{
    if(event.Draft_Installation__r){
        $('#Machine_Id').val(event.Draft_Installation__r.Machine_Id_Not_Sign_Up__c);
        $('#Machine_Type').val(event.Draft_Installation__r.Recommended_Machine_type__c ? event.Draft_Installation__r.Recommended_Machine_type__c : event.Draft_Installation__r.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c);
        $('#Tower_Type').val(event.Draft_Installation__r.Recommended_Tower_Type__c ? event.Draft_Installation__r.Recommended_Tower_Type__c :event.Draft_Installation__r.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c );
    }
    else{
        showNotification({message : 'Something went wrong! Please contact System Adminstrator!'});
    }
    
    creatSectionForPartiallyDone();
    creatSectionForNotDone();
    if(isReadOnly)
    {
        $('.showReq').css('display','block');
        $('.showInstall').css('display','none');
        
        $('#installedContentModal').html('<p>This machine has been installed successfully, page is opening in read only mode!</p>')
        $('#installedNTested .modal-footer').html('');
    }else{
        $('.showReq').css('display','none');
        $('.showInstall').css('display','block');
    }
};

const creatSectionForPartiallyDone = () =>{
    let tmp = '';
    $('#partialContent').html('');
    tmp += createSelectOption('Partial-Select','Installation Partially Done',null,['Some Items were Damaged','Not Enough Time for Installation']);
    $('#partialContent').append(tmp);
};


const creatSectionForNotDone = () =>{
    let tmp = '';
    $('#notDoneContent').html('');
    tmp += createSelectOption('NotDone-Select','Installation Not Done',null,['Draft Equipment not received from Warehouse','Outlet did not allow Installation at the Scheduled time']);
    $('#notDoneContent').append(tmp);
};



const createSelectOption = (id,label,value,options) =>{
    let tmp =`
       <div class="form-group">
       <label>${label}</label>
        <select class="form-control" id="${id}">
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




const redirectDraftHome = () => {
    window.location.href = '/view/objectives/technicianInstallation/technicianInstallationHomePage.html';
};  
