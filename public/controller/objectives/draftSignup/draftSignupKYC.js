
let kycDraft;
let draftSignup;
let contactRec;
let depositAmount = 0;
let isReadOnly = false;
const initializeDraftKYC =async () => {
    let urlParam = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('account',urlParam.get('accountId'));
    await initializeKYCForm();
    initializeDraftSignUp(); 
    showAccount();
    formValuePopulation();
};

const initializeKYCForm = async () => {
    await typeOfDraftLicenses();
    draftSignup = await getItemFromStore('draft_Signup',fetchCurrentDateIdStr()+'-'+accountRec.Id);
    
    if(draftSignup['Kyc_App_Id__c']){
        kycDraft = await getItemFromStore('kycDetail',draftSignup['Kyc_App_Id__c']);
        if(kycDraft.isCheckedOut === true)
        {
            isReadOnly = true;
        }
    }
    else{
        
            kycDraft = {
                GST : accountRec['GST__c'] ? accountRec['GST__c']  : '',
                PAN : accountRec['PAN__c'] ? accountRec['PAN__c']  : '',
                TIN :accountRec['TIN__c'] ? accountRec['TIN__c']  : '',
                VAT_Registration_Number : accountRec['VAT_Registration_Number__c'] ?accountRec['VAT_Registration_Number__c'] :'',
                ExciseCode : accountRec['Excise_Code__c'] ?accountRec['Excise_Code__c'] :'',
                shippingStreet : accountRec['ShippingStreet'] ?accountRec['ShippingStreet'] :'',
                Billing_Street : accountRec['BillingStreet'] ?accountRec['BillingStreet'] :'',
                accountName : accountRec['Name'] ?accountRec['Name'] :'',
                
            };
        
    }
    if(kycDraft.ownerContacts && kycDraft.ownerContacts.length>0){
        contactRec = kycDraft.ownerContacts[0];
    }
    else{
        contactRec = fetchOwnerInformation();
    }
    
};

const formValuePopulation =() => {
    let kycFields = ['GST','PAN','TIN','VAT_Registration_Number','ExciseCode','shippingStreet','Billing_Street','accountName','Type_of_Draft_License','Draft_Excide_License_Status','Draft_License_Number'];
    let draftFields = ['Deposit_Amount__c','Cheque_NEFT_RTGS_Number__c','Request_Waiver__c'];
    let contactFields = ['Address','FirstName','LastName','AadharNumber','Email','MobilePhone'];
    for(let i of kycFields){
        $(`#${i}`).val(kycDraft[i]?kycDraft[i] : '');
    }
    for(let i of draftFields){
        if(i==='Request_Waiver__c'){
            $(`#${i}`).prop('checked',draftSignup[i]?draftSignup[i] : false);
        }
        else{
            $(`#${i}`).val(draftSignup[i]?draftSignup[i] : '');
        }
        
    }
    for(let i of contactFields){
        $(`#${i}`).val(contactRec[i]?contactRec[i] : '');
    }
    $('#Deposit_Amount__c').val(depositAmount);
    if(kycDraft['Draft_License_Number-File']){
        $('.Draft_License_Number_File').css('color','#5cb85c')
    }
    if(draftSignup['Cheque_NEFT_RTGS_Number__c-File']){
        $('.Cheque_NEFT_RTGS_Number__c_File').css('color','#5cb85c')
    }
    
};

const fetchOwnerInformation = () =>{
    let tempContactRec = {};
    for(let i of (accountRec.Contacts ?accountRec.Contacts.records : [])){
        if(i.Decision_Maker__c){
            tempContactRec = i;
            break;
        }
    }
    tempContactRec = {
        Title : tempContactRec.Salutation ?tempContactRec.Salutation : '',
        Address :  tempContactRec.MailingStreet ?tempContactRec.MailingStreet : '' ,
        FirstName : tempContactRec.FirstName ? tempContactRec.FirstName : '',
        LastName : tempContactRec.LastName ? tempContactRec.LastName : '',
        AadharNumber : tempContactRec.Aadhaar_Number__c ? tempContactRec.Aadhaar_Number__c : '',
        Email : tempContactRec.Email ? tempContactRec.Email : '',
        MobilePhone : tempContactRec.MobilePhone ? tempContactRec.MobilePhone : '',
    };
    return tempContactRec;

};
const typeOfDraftLicenses =async () =>{
    let draftTypes = await getItemFromStore('utility','licenseType');
    
    let licenseTypes = draftTypes.licenseTypes.filter(ele => {
        if(ele.DeveloperName === 'Deposit_Amount'){
            depositAmount = parseFloat(ele.License__c);
        }
        return ele.MasterLabel === accountRec.BillingState;
    });
    
    licenseTypes = licenseTypes.map(ele => {
        return ele.License__c;
    });
    selectOptions.set('Type_of_Draft_License', licenseTypes[0].split(','));
};

const validateEmail =(email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const submitDraftKYC =async () => {
    
    showLoaderSpinner();
    if(isReadOnly){
        window.location.href = '/view/objectives/draftSignup/draftSignupPOSM/draftSignupPOSM.html?accountId='+accountRec.Id;
        return;
    }
    
    const gst = $('#GST').val();
    const pan = $('#PAN').val();
    const tin = $('#TIN').val();
    const vat = $('#VAT_Registration_Number').val();
    const firstname = $('#FirstName').val();
    const lastname = $('#LastName').val();
    const address = $('#Address').val();
    const aadhar = $('#AadharNumber').val();
    const ExciseCode = $('#ExciseCode').val();
    const shippingStreet = $('#shippingStreet').val();
    const Billing_Street = $('#Billing_Street').val();
    const accountName = $('#accountName').val();
    const Type_of_Draft_License = $('#Type_of_Draft_License').val();
    const Draft_Excide_License_Status = $('#Draft_Excide_License_Status').val();
    const Draft_License_Number = $('#Draft_License_Number').val();
    const Deposit_Amount__c = $('#Deposit_Amount__c').val();
    const Cheque_NEFT_RTGS_Number__c = $('#Cheque_NEFT_RTGS_Number__c').val();
    const Request_Waiver__c = $('#Request_Waiver__c').prop('checked');
    const Deposit_Type__c =  $('#Deposit_Type__c').val();
    const Estimated_Date_of_Approval =  $('#Estimated_Date_of_Approval').val();
    const phone =  $('#MobilePhone').val();
    const email =  $('#Email').val();
    const Draft_License_Number_File = draftSignup['Draft_License_Number_File'] ? draftSignup['Draft_License_Number_File'] : null;// $('#Draft_License_Number_File').val();
    if(!email || !phone || !gst || !firstname || !address || !aadhar || !ExciseCode || !shippingStreet ||!Billing_Street || !accountName || !Draft_Excide_License_Status) {
     //   let showErrorMsg = 'Fill all mandatory (*) fields! <br/>';
        showNotification({message : 'Fill all mandatory (*) fields!'});
        hideLoaderSpinner();       
        return;
    }

    if(!validateEmail(email)){
        showNotification({message : 'Please enter Email in correct format'});
        hideLoaderSpinner();   
        return;
    }

    if(Draft_Excide_License_Status === 'Yes' && !Draft_License_Number && !Draft_License_Number_File)
    {
        showNotification({message : 'Draft License Number is required'});
        hideLoaderSpinner();       
        return;
    }

    if((Draft_Excide_License_Status === 'Applied' || Draft_Excide_License_Status === 'Yes') && !Type_of_Draft_License){
        showNotification({message : 'Draft License type is required'});
        hideLoaderSpinner();       
        return;
    }

    if(Draft_License_Number && !Draft_License_Number_File)
    {
        showNotification({message : 'Draft License Number Image is required'});
        hideLoaderSpinner();       
        return;
    }
    const position  = await getCurrentLocationHelper();
    kycDraft.Geolocation_Latitude = position.coords.latitude;
    kycDraft.Geolocation_Longitude = position.coords.longitude;
    
    kycDraft = {
        GST : gst,
        PAN : pan,
        TIN :tin,
        VAT_Registration_Number : vat,
        ExciseCode : ExciseCode,
        shippingStreet : shippingStreet,
        Billing_Street : Billing_Street,
        accountName : accountName,
        App_Id : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-Draft',
        Type_of_Draft_License : Type_of_Draft_License,
        Draft_Excide_License_Status : Draft_Excide_License_Status,
        Draft_License_Number : Draft_License_Number,
        Draft_License_Number_File : Draft_License_Number_File,
        Estimated_Date_of_Approval : Estimated_Date_of_Approval,
        accountId : accountRec.Id,
        Status : 'Submitted by SP',
        Created_Date : new Date(),
        Last_Modified : new Date(),
        isSynced : true,
        isCheckedOut : false,
        Daily_Tracker : fetchCurrentDateIdStr(),
        ownerContacts : [
            {
                Title : contactRec.Title ? contactRec.Title : 'Mr.',
                FirstName : firstname,
                LastName : lastname ,
                AadharNumber : aadhar,
                Address : address,
                Role : 'Outlet Owner',
                Decision_Maker : true,
                Email : email,
                MobilePhone : phone
            }
        ]
    };
    draftSignup ={
        ...draftSignup,
        Kyc_App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-Draft',
        Deposit_Amount__c : Deposit_Amount__c,
        Cheque_NEFT_RTGS_Number__c : Cheque_NEFT_RTGS_Number__c,
        Request_Waiver__c : Request_Waiver__c,
        Deposit_Type__c : Deposit_Type__c,
        isSynced : true,
    }
    if(draftSignup.Request_Waiver__c){
        draftSignup.Payment_Status__c = 'Pending';
    }
    let isValid = true;
    if(kycDraft['GST']){
        if(!gstValidator(kycDraft['GST'])){
            $('.gstError').css('display','block');
            isValid = false;
        }else{
            $('.gstError').css('display','none');
        }
    }
    else{
        $('.gstError').css('display','none');
    }


    if(kycDraft['PAN']){
        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;    
        if(!regex.test(kycDraft['PAN'])){      
            $('.panError').css('display','block')
            isValid = false;
        }
        else{
            $('.panError').css('display','none');
        }
    }else{
        $('.panError').css('display','none');
    }

    if(kycDraft['TIN']){
        var regex = /[0-9]{11}$/;    
    
        if(!regex.test(kycDraft['TIN'])){
            $('.tinError').css('display','block');
            isValid = false;
        }else{
            $('.tinError').css('display','none');
        }
    }
    else{
        $('.tinError').css('display','none');
    }
    if(aadhar){
        var regex = /[0-9]{12}$/;
        if(!regex.test(aadhar)){
            $('.aadharnumberError').css('display','block');
            isValid = false;
        }else{
            $('.aadharnumberError').css('display','none');
        }
    }else{
        $('.aadharnumberError').css('display','none');
    }
    if(!isValid){
        showNotification({message : 'Please correct all the errors'});
        hideLoaderSpinner();
        return;
    }
    await writeData('draft_Signup',draftSignup);
    await writeData('kycDetail',kycDraft);
    window.location.href = '/view/objectives/draftSignup/draftSignupPOSM/draftSignupPOSM.html?accountId='+accountRec.Id;
    hideLoaderSpinner();
};

initializeDraftKYC();