
let selectOptions = new Map([
    ['Type_of_Draft_License',['Active','InActive','Applied']],
    ['Draft_Excide_License_Status',['Yes','No','Applied']],
    ['Deposit_Amount__c',['Cheque','NEFT','RTGS']]
]);

// let kycDraft = {}
// let draftSignup = {}
initializeDraftSignUp = () =>{
    createDraftSignUpKYC();
    createDraftSignUpSecurity();
    if(isReadOnly){
        disabledFields();
    }
}

const createDraftSignUpKYC = () =>{
    const mappingFieldLabel = new Map([
        ['GST','GST'],
        ['PAN','PAN'],
        ['TIN','TIN'],
        ['VAT_Registration_Number','VAT'],
        ['FirstName','Owner First Name'],
        ['LastName','Owner Last Name'],
        ['AadharNumber','Owner Aadhaar'],
        ['Address','Owner Residential Address'],
        ['ExciseCode','Excise License Number'],
        ['shippingStreet','Outlet Shipping Address'],
        ['Billing_Street','Outlet Billing Address'],
        ['accountName','Outlet Name'],
        ['Type_of_Draft_License','Type of Draft License'],
        ['Draft_Excide_License_Status','Draft License Status'],
        ['Draft_License_Number','Draft License Number'],
        ['Estimated_Date_of_Approval','Estimated Date of Approval'],
        ['MobilePhone','Owner Phone'],
        ['Email','Owner Email']
    ]);

    const draftField = ['GST','PAN','TIN','VAT_Registration_Number','FirstName','LastName','Email','MobilePhone','Address','AadharNumber',
                        'ExciseCode','shippingStreet','Billing_Street','accountName',
                    'Draft_Excide_License_Status','Type_of_Draft_License','Estimated_Date_of_Approval','Draft_License_Number'];

    let tmp = '';
    for(let i of draftField){
        tmp +=`
            <div class="row ${i}" ${i==='Estimated_Date_of_Approval'&&draftSignup['Draft_Excide_License_Status']&&draftSignup['Draft_Excide_License_Status']==='Applied' ? '' : `${i==='Estimated_Date_of_Approval' ? 'style="display:none"' : ''}`  }>
                <div class="col-xs-6">
                    <label class="form-label ${i === 'PAN' || i === 'VAT' || i === 'TIN' || i === 'Owner_Aadhaar' || i === 'Type_of_Draft_License' || i === 'Draft_License_Number' ? '' : 'required'}">
                        ${mappingFieldLabel.get(i)}
                    </label>
                </div>
                <div class="col-xs-6">
                    ${i === 'Type_of_Draft_License' || i === 'Draft_Excide_License_Status' ?
                         createSelectOption(i,draftFields.has(i) ? draftSignup[i] : contactFields.has(i) ? contactRec[i] : kycDraft[i],selectOptions.get(i)) :
                         createInputField(i)}
                </div>
            </div>
        `;
    }

    $('#kycInfo').append(tmp);
};
let draftFields = new Set(['Deposit_Amount__c','Cheque_NEFT_RTGS_Number__c','Request_Waiver__c']);
let contactFields = new Set(['Deposit_Amount__c','Cheque_NEFT_RTGS_Number__c','Request_Waiver__c']);


const createDraftSignUpSecurity = () =>{
    const mappingFieldLabel = new Map([
        ['Deposit_Amount__c','Deposit Amount'],
        ['Cheque_NEFT_RTGS_Number__c','Cheque/NEFT/RTGS Number'],
        ['Request_Waiver__c','Request Waiver']
    ]);

    const draftField = ['Deposit_Amount__c','Cheque_NEFT_RTGS_Number__c','Request_Waiver__c'];

    let tmp = '';
    for(let i of draftField){
        tmp +=`
            <div class="row " >
                <div class="col-xs-6">
                    <label class="form-label">
                        ${mappingFieldLabel.get(i)}
                    </label>
                </div>
                <div class="col-xs-6">
                    ${i === 'Deposit_Amount__c' ?
                    createInputField(i,draftSignup[i] ? draftSignup[i] : '',true) +' '+createSelectOption('Deposit_Type__c',draftSignup['Deposit_Type__c'] ? draftSignup['Deposit_Type__c']  : '',selectOptions.get(i)) : i === 'Request_Waiver' ?
                    createInputField(i,draftSignup[i] ? draftSignup[i] : '') : createInputField(i,draftSignup[i] ? draftSignup[i] : '')
                         }
                </div>
            </div>
        `;
    }

    $('#secInfo').append(tmp);
};



const createInputField = (id,value,readOnly = false) =>{

    let tmp = '';
    
    if(id === 'Address' || id === 'Billing_Street' || id === 'shippingStreet'){
        tmp = `
        <div class="form-group">
            <textarea class="form-control" id="${id}" value="${value ? value : ''}"></textarea>
        </div>
        `;
    }else if(id === 'Draft_License_Number' || id === 'Cheque_NEFT_RTGS_Number__c'){
        tmp = `
        <div class="image-upload_NoInput form-group" >
            <input class="form-control" id="${id}" value="${value ? value : ''}"/>

            <div class="camera">
                <label for="${id}_File">
                    <i class="fa fa-camera ${id}_File" ${draftSignup[`${id}_File`] ? 'style="color:#5cb85c"' : ''} aria-hidden="true"></i>                                    
                </label>
                <input id="${id}_File" onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div>
                                        
        `;
    } else if(id === 'Request_Waiver__c'){
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  >
            <span class="slider round"></span>
        </label>
        `;
    }
    else if(id==='Estimated_Date_of_Approval'){
        tmp = `
        <div class="form-group">
            <input class="form-control" type="date"  ${readOnly ? 'disabled' : ''} id="${id}" value="${value ? value : ''}" onchange="handleInputChange(this)"/>
            
        </div>`;
    }
    else if(id==='Email'){
        tmp = `
        <div class="form-group">
            <input class="form-control" type="email" id="${id}" value="${value ? value : ''}" onchange="handleInputChange(this)"/>
            
        </div>`;
    }
    else if(id==='MobilePhone'){
        tmp = `
        <div class="form-group">
            <input class="form-control" type="tel" maxlength="10" id="${id}" value="${value ? value : ''}" onchange="handleInputChange(this)" required/>
            
        </div>`;
    }
    else{
        let errorClass = id.toLowerCase();  
        tmp = `
        <div class="form-group">
            <input class="form-control" ${id == 'AadharNumber' ? 'maxlength="12"' : ''} ${id == 'VAT_Registration_Number' || id == 'TIN' ? 'maxlength="11" type="tel"' : ''}  ${readOnly ? 'disabled' : ''} id="${id}" value="${value ? value : ''}" onkeyup="handleInputChange(this)"/>
            <span class="error ${errorClass}Error">${id != 'AadharNumber' ? id : 'Aadhar Number'} is not in Proper format</span>
        </div>`;
    }
    

    return tmp;
};

const createSelectOption = (id,value,options) =>{
    let tmp =`
       <div class="form-group">
        <select class="form-control" id="${id}" onchange="handleSelectOption(this)">
            <option value="">--Select--</option>
    `;

    for(let i = 0;i<options.length;i++){
        tmp +=`
        <option value="${options[i]}" ${options[i] === value ? 'selected' : ''}>${options[i]}</option>
        `;
    }

    tmp += '</select></div>';

    return tmp;
};

const handleSelectOption = (ele) => {
    let id = $(ele).attr('id');
    let value = $(ele).val();
    if(id==='Draft_Excide_License_Status'&&value==='Applied'){
        $('.Estimated_Date_of_Approval').css('display','block');
    }
    else if(id==='Draft_Excide_License_Status'){
        $('#Estimated_Date_of_Approval').val('');
        $('.Estimated_Date_of_Approval').css('display','none');
    }
};

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


  const fileInput = async (event) => {

    const key = event.id;
    const fileInput = event.files[0];
    var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    const compressedFile = await imageCompression(fileInput, options);
    uploadBase64Value(key, compressedFile);
    
  };
  
  const uploadBase64Value = async (key, fileInput) => {
    if(key==='Draft_License_Number-File'){
        kycDraft[key] = await toBase64(fileInput);
    }
    else{
        draftSignup[key] =  await toBase64(fileInput);
    }
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
  };

  

const disabledFields = () =>{
    $('input').attr('disabled', true);
    $('textarea').attr('disabled', true);
    $('.cart-btn').attr('disabled',true);
    $('select').attr('disabled', true);
    showNotification({message : 'Page is opened in Read - Only Mode'});
}

const handleInputChange = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).val();
    
    if(id === 'GST' && value){
        if(!gstValidator(value)){
            $('.gstError').css('display','block');
        }else{
            $('.gstError').css('display','none');
        }
    }
    else if(id === 'GST'&&!value){
        $('.gstError').css('display','none');
    }

    if(id === 'PAN' && value){
        var regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;    
        if(!regex.test(value)){      
            $('.panError').css('display','block');
        }
        else{
            $('.panError').css('display','none');
        }
    }else if(id === 'PAN' && !value){
        $('.panError').css('display','none');
    }


    if(id === 'TIN' && value){
        var regex = /[0-9]{11}$/;    
    
        if(!regex.test(value)){
            $('.tinError').css('display','block');
        }else{
            $('.tinError').css('display','none');
        }
    }
    else if(id === 'TIN' && !value){
        $('.tinError').css('display','none');
    }
    if(id === 'AadharNumber' && value){
        var regex = /[0-9]{12}$/;
        if(!regex.test(value)){
            $('.aadharnumberError').css('display','block')
        }else{
            $('.aadharnumberError').css('display','none')
        }
    }else if(id === 'AadharNumber' && !value){
        $('.aadharnumberError').css('display','none')
    }
    
}

const gstValidator = (g) => {
    let regTest =  /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(g);
    return regTest
}

// initializeDraftSignUp();