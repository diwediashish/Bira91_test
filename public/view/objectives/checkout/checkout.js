

// let accountRec ={
//     Contacts : [{'Name' : 'Deepak'},{'Name' : 'Ajitesh'}]
// }

// let checkOut = {};

// //let accountRec;
// showAccount = () => {

//     var tmp = '';
//         tmp += '<div class="accountList ' + (accountRec.Channel__c ?accountRec.Channel__c : '' ) + ' '+(accountRec.Location__c ?accountRec.Location__c: '' )+' ' + (accountRec.Size_Format__c ?accountRec.Size_Format__c :'' ) +' ' + (accountRec.Industry_Segment__c ?accountRec.Industry_Segment__c : '' ) + ' ' + (accountRec.Sub_Channel__c? accountRec.Sub_Channel__c : '') + '" data-beacon="'+(accountRec.Beacon_Flag__c ? accountRec.Beacon_Flag__c : '')+'" data-status="'+(accountRec.Account_Status__c ? accountRec.Account_Status__c.charCodeAt() : '')+'" data-qco="'+(accountRec.QCO_Flag__c ?accountRec.QCO_Flag__c : '' )+'" data-segment="'+(accountRec.Bira_Segment__c ? accountRec.Bira_Segment__c.charCodeAt() : '' )+'">';
//         tmp += '    <div class="main-head">';
//         tmp += '      <div class="heading">';
//         tmp += '<span>' + (accountRec.Name ?accountRec.Name : '' ) + '</span> <br/>';
//         tmp += '<p> Bira - ';
//         tmp += '         ' + (accountRec.BIRA_ID__c ? accountRec.BIRA_ID__c : '');
//         tmp += '</p>';
//         tmp += '      </div>';
//         tmp += '       <div class="feat">';
//         tmp += '         <div>';
//         if(accountRec.Industry_Segment_Mass__c != null)
//         {
//             tmp += '  <span class="name">'+accountRec.Industry_Segment_Mass__c+'</span>';
//         }
//         if(accountRec.Bira_Segment__c != null)
//         {
//             tmp += '  <span class="name">'+accountRec.Bira_Segment__c+'</span>';
//         }
//         if(accountRec.Industry_Segment__c != null)
//         {
//             tmp += '  <span class="name">'+accountRec.Industry_Segment__c+'</span>';
//         }
//         tmp += '         </div>';

//         if (accountRec.Beacon_Flag__c === true) {
//             tmp += '         <span><img src="../../../media/images/homePage/Icons-02.png" alt=""></span>';
//         }

//         if (accountRec.Draft_Ready__c === true) {
//             tmp += '         <span><img src="../../../media/images/homePage/Icons-04.png" alt=""></span>';
//         }

//         if (accountRec.QCO_Flag__c === true) {
//             tmp += '         <span><img src="../../../media/images/homePage/Icons-05.png" alt=""></span>';
//         }
//         tmp += '       </div>';

//         tmp += '    </div>';
//         tmp += '</div>';
//     $('#listOfAcc').prepend(tmp);
// };

let checkOut = {};
let contacts;
let contactMap = new Map();
let currentContactSelection = {};
initializeContacts = () => {
    $('#ActivityDate').attr('min',new Date().toISOString().split("T")[0]);
    if (accountRec.Contacts && accountRec.Contacts.records && accountRec.Contacts.records.length > 0) {
        let temp = '';
        
        for (var i = 0; i < accountRec.Contacts.records.length; i++) {
            contactMap.set(i, accountRec.Contacts.records[i].Id);
            temp += '<option value="' + i + '">' + accountRec.Contacts.records[i].Name + '</option>';
        }
        $('#Person_Contacted__c').append(temp);
    }
    //Display contact image
    


};


handleContactClicked = (ele) => {
    const key = $(ele).attr('id');
    const value = $(ele).val();
    
    
    if (contactMap.has(parseFloat(value))) {
        checkOut[key] = contactMap.get(parseFloat(value));
    }
    

};

const checkBoxChangeHandler = () => {
    const key = event.target.id;
    const value = event.target.checked;
    checkOut[key] = value;
};


handleCheckedOut = () => {
    checkOut["Comments__c"] = $('#Comments__c').val();
    checkedOut();

};

const renderContactsList = () => {
    let tmp = '';
    $('#contactList').empty();
    if (checkOut.contacts.length > 0) {
        checkOut.contacts.forEach((ele,index) => {
            tmp += `<div class="media">
        <div class="media-left">
          <img src="/media/images/checkout/contact.png" class="media-object" style="width:30px">
        </div>
        <div class="media-body">
          <h4 class="media-heading"><div style="float:left;">${ele.contactFirstName}</div><div style="text-align:right;"><i onclick="handleEditContacts('${index}')" class="fas fa-edit"></i></div></h4>
          <h4><small>Role : ${ele.contactRole ? ele.contactRole : ''}<br/>
          Phone 1 : ${ele.contactPhone1}</small></h4>
          
        </div>
      </div> `;
        });

    }
    else {
        tmp += `
        <div class="alert alert-info text-center" style="margin-top:2%;">
          <strong>Info!</strong>  No Contact Created.
        </div>
        `;
    }
    $('#contactList').append(tmp);
};


handleVisitingSave = async (ele) => {
    const key = $(ele).attr('id');
    const fileInput = $(ele).prop('files')[0];
    var options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };
    const compressedFile = await imageCompression(fileInput, options);

    currentContactSelection[key] = await toBase64(compressedFile);
    fileAttachedBackgroundChange(key);

};

const handleEditContacts = (index) =>{
    currentContactSelection = checkOut.contacts[index];
    $('#contactCreation').modal('show');
    populateContactModal();
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
    if (key === 'Front_Fascade_File') {
        navigator.geolocation.getCurrentPosition(position => {
            kycDetail.Geolocation_Latitude = position.coords.latitude;
            kycDetail.Geolocation_Longitude = position.coords.longitude;
            uploadBase64Value(key, compressedFile);
        });
    }
    else {
        uploadBase64Value(key, compressedFile);
    }

};

const uploadBase64Value = async (key, fileInput) => {

    kycDetail[key] = await toBase64(fileInput);
    fileAttachedBackgroundChange(key);
};

const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;

    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);

    icon.css('color', '#5cb85c');
};

const validateEmail =(email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const handleSaveContact = () => {
    if($('#contactPANNumber').val()){
        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;  
        if(!regex.test($('#contactPANNumber').val().toUpperCase())){      
          // $(".panNumber").val("");    
          // alert("invalid PAN no");    
          $('.panConReq').css('display','block');  
          alert('PAN Number is invalid');
          return ;    
          }
          else{
            $('.panConReq').css('display','none');  
          }  
      
      }

      if($('#contactEmail').val()){
          if(!validateEmail($('#contactEmail').val())){
            $('.emailConReq').css('display','block');  
         //   alert('Email is invalid');
            return ;    
            }
            else{
              $('.emailConReq').css('display','none');  
            }  
      }

      if($('#contactAadharNumber').val()){
        var regex = "[0-9]{12}";
        if(!($('#contactAadharNumber').val()).match(regex)){
          $('.aadharConReq').css('display','block');  
          alert('Aadhar Number is invalid');
          return ; 
        }
        else{
          $('.aadharConReq').css('display','none'); 
        }
      }
    
    const contactTitle = $('#contactTitle').val();
    const contactFirstName = $('#contactFirstName').val();
    const contactLastName = $('#contactLastName').val();
    const contactPhone1 = $('#contactPhone1').val();
    const contactPhone2 = $('#contactPhone2').val();
    const contactEmail = $('#contactEmail').val();
    const contactResidentialAddress = $('#contactResidentialAddress').val();
    const contactBirthDate = $('#contactBirthDate').val() ? new Date($('#contactBirthDate').val()) : null;
    const contactAniversary = $('#contactAniversary').val() ? new Date($('#contactAniversary').val()) : null;
    const contactRole = $('#contactRole').val();
    const contactAadharNumber = $('#contactAadharNumber').val();
    const contactPANNumber = $('#contactPANNumber').val();


    if(!contactTitle|| !contactFirstName || !contactLastName || !contactPhone1){
        return;
    }
    $('#contactCreation').modal('hide');
    if (currentContactSelection.id!=null) {
        currentContactSelection = {
            ...currentContactSelection,
            contactFirstName,
            contactLastName,
            contactPhone1,
            contactPhone2,
            contactEmail,
            contactResidentialAddress,
            contactBirthDate,
            contactAniversary,
            contactRole,
            contactAadharNumber,
            contactPANNumber,
            contactTitle,

        };
        checkOut.contacts.splice(currentContactSelection.id,1,currentContactSelection);
        
    }
    else {
        currentContactSelection = {
            ...currentContactSelection,
            id: checkOut.contacts.length === 0 ? checkOut.contacts.length : checkOut.contacts.length ,
            contactFirstName,
            contactLastName,
            contactPhone1,
            contactPhone2,
            contactEmail,
            contactBirthDate,
            contactResidentialAddress,
            contactAniversary,
            contactRole,
            contactAadharNumber,
            contactPANNumber,
            contactTitle
        };
        checkOut.contacts.push(currentContactSelection);
        

    }
    currentContactSelection = {};
    renderContactsList();

};
const handleCreateContact = () => {
    currentContactSelection = {};
    populateContactModal();
};
const populateContactModal = () => {
   
    $('#contactTitle').prop('value',currentContactSelection.contactTitle ?currentContactSelection.contactTitle : "" );
   $('#contactFirstName').prop('value',currentContactSelection.contactFirstName ?currentContactSelection.contactFirstName : null );
   $('#contactLastName').prop('value',currentContactSelection.contactLastName ?currentContactSelection.contactLastName : null );
   $('#contactPhone1').prop('value',currentContactSelection.contactPhone1 ?currentContactSelection.contactPhone1 : null );
   $('#contactPhone2').prop('value',currentContactSelection.contactPhone2 ?currentContactSelection.contactPhone2 : null );
   $('#contactEmail').prop('value',currentContactSelection.contactEmail ?currentContactSelection.contactEmail : null );
   $('#contactResidentialAddress').prop('value',currentContactSelection.contactResidentialAddress ?currentContactSelection.contactResidentialAddress : null );
   $('#contactBirthDate').prop('value',currentContactSelection.contactBirthDate ?currentContactSelection.contactBirthDate.toISOString().substring(0, 10) : '' );
   $('#contactAniversary').prop('value',currentContactSelection.contactAniversary ?currentContactSelection.contactAniversary.toISOString().substring(0, 10) : '' );
   $('#contactRole').prop('value',currentContactSelection.contactRole ?currentContactSelection.contactRole : "" );
   $('#contactAadharNumber').prop('value',currentContactSelection.contactAadharNumber ?currentContactSelection.contactAadharNumber : null );
   $('#contactPANNumber').prop('value',currentContactSelection.contactPANNumber ?currentContactSelection.contactPANNumber : null );

    if(currentContactSelection['contactAadharNumberFile']){
        fileAttachedBackgroundChange('contactAadharNumberFile');
    }
    else{
        $('.contactAadharNumberFile').css('color', '');
    }
    if(currentContactSelection['contactPANNumberFile']){
        fileAttachedBackgroundChange('contactPANNumberFile');
    }
    else{
        $('.contactPANNumberFile').css('color', '');
    }
    if(currentContactSelection['VisitingCard']){
        fileAttachedBackgroundChange('VisitingCard');
    }
    else{
        $('.VisitingCard').css('color', '');
    }
};

const refreshTaskForm = () => {
    $('#Subject').prop('value','');
    $('#Description').prop('value','');
    $('#Priority').prop('value','Normal');
    let todaysDate = new Date();
    todaysDate.setDate(todaysDate.getDate()+7);
    $('#ActivityDate').prop('value',(todaysDate).toISOString().substring(0, 10) );

    
};

const handleTaskSubmit = async() => {
    
    const Subject = $('#Subject').val();
    const Description = $('#Description').val();
    const Priority = $('#Priority').val();
    const ActivityDate = new Date($('#ActivityDate').val());
    if(!ActivityDate || !Subject){
        return;
    }



    $('#taskCreation').modal('hide');
    let taskRec = {
        Unique_Identifier__c : `${new Date().getTime()}`,
        Subject,
        Description,
        Priority,
        ActivityDate,
        WhatId : accountRec.Id,
        Status : 'Open'
    };
    
    await writeData('taskOriginal',taskRec);
    await writeData('taskSync',taskRec);
};