// let accountRec = {
//     "Id": "0015D00000cDkdjQAC",
//     "Account_Status__c": "Permanently Closed",
//     "Average_Velocity_of_Kegs__c": 0,
//     "BIRA_ID__c": "BI-147",
//     "Beacon_Flag__c": true,
//     "Beer_Selection__c": "Premium",
//     "BillingCity": "Temp",
//     "BillingCountry": "India",
//     "BillingPostalCode": "Temp",
//     "BillingState": "Delhi",
//     "BillingStreet": "Temp",
//     "Bira_Segment__c": "C",
//     "Channel__c": "On-Premise",
//     "Contacts": {
//         "records" : [
//             {
//                 "Id": "0035D00001GXwZyQAL",
//                 "Decision_Maker__c": false,
//                 "Facebook_Fan__c": true,
//                 "FirstName": "Kavita",
//                 "LastName": "Owner",
//                 "Loyalty_Enabled__c": false,
//                 "MailingCountry": "India",
//                 "MailingStreet": "13 A Surendra Nagar",
//                 "Name": "Kavita Owner",
//                 "Salutation": "Mr.",
//                 "Phone" : 123455666,
//                 "Role__c" : "Outlet Manager",
//                 "PAN_Attached__c":true,
//                 "Contact_Method__c":"Phone",
//                 "Aadhar_Attached__c":false
//             }
//         ]
//     }
// }


const initializeContact = async() => {
  
        for(let i in contactRec){
         
            if(i==='Account'){
                $(`#${i}`).prop("value",contactRec[i]['Name']);
            }
            else if(typeof contactRec[i] ==='boolean'){
                $(`#${i}`).prop("checked",contactRec[i]);
            }
            else{
                $(`#${i}`).prop("value",contactRec[i] ? contactRec[i] : "");
            }
             
            
            if(i ==='PAN_Attached__c' && contactRec[i] === true){
                $('.contactPANNumberFile').css('color','rgb(92, 184, 92)');
                console.log('ssdd');
            }

            if(i ==='Aadhar_Attached__c' && contactRec[i] === true){
                $('.contactAadharNumberFile').css('color','rgb(92, 184, 92)');
            }
        }
    
    showAlertModal();
};
  

showAlertModal = () => {
    let phoneVal = $('#Phone').val();
    let addressVal = $('#MailingAddress').val();
    let aadhaarVal = $('#Aadhaar_Number__c').val();
    let panVal = $('#PAN_Number__c').val();
    let roleVal = $('#Role__c').val();

    let tmp = '';
    if(roleVal != null && roleVal.includes('Owner')){
        if(phoneVal == null || phoneVal == ''){
            tmp += '<li>Phone </li>';
           
        }
        if(addressVal == null || addressVal == ''){
            tmp += '<li>Residential Address</li>';
           
        }
        if(aadhaarVal == null || aadhaarVal == ''){
            tmp += '<li>Aadhar Number</li>';
            
        }
        if(contactRec['Aadhar_Attached__c'] == false){
            tmp += '<li> Aadhar Attachment </li>';
        }

        if(panVal == null || panVal == ''){
            tmp += '<li> PAN Number </li>';
           
        }
        if(contactRec['PAN_Attached__c'] == false){
            tmp += '<li> PAN Attachment </li>';
        }
   }
    if(tmp != ''){
        $('#contactAlert ul').append(tmp);
        $('#contactAlert').modal('show');
    }
}



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
  
    contactRec[key] = await toBase64(fileInput);
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
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
  
    contactRec[key] = await toBase64(compressedFile);
    fileAttachedBackgroundChange(key);
  
};


const pickListValueCreation = () => {
    let personContactListValue = ['Outlet Owner','General Manager', 'Restaurant Manager', 'Chef', 'House Keeping', 'Accounts Manager', 'Cashier', 'Captain', 'F&B Manager', 'Outlet Manager', 'Purchase Manager', 'Bar Manager', 'Bar Tender', 'Waiter/Clerk'];
    $('#Role__c').empty();
    let tmp = '';
    tmp += '<option value="" disabled selected>Please Select Role</option>';
    
      personContactListValue.forEach(ele => {
        tmp += '<option>' + ele + '</option>';
      });
    $('#Role__c').append(tmp);
};


  handleSaveContact = () =>{

    contactRec["Name"] = $('#Name').val();
    contactRec["Role__c"] = $('#Role__c').val();
    contactRec["Account"] = $('#Account').val();
    contactRec["Active__c"] = $('#Active__c').prop('checked');
    contactRec["Contact_Method__c"] = $('#Contact_Method__c').val();
    contactRec["Aadhaar_Number__c"] = $('#Aadhaar_Number__c').val();
    contactRec["PAN_Number__c"] = $('#PAN_Number__c').val();
    contactRec["Department"] = $('#Department').val();
    contactRec["Loyalty_Enabled__c"] = $('#Loyalty_Enabled__c').prop('checked');
    contactRec["Facebook_Fan__c"] = $('#Facebook_Fan__c').prop('checked');
    contactRec["Age__c"] = $('#Age__c').val();
    contactRec["Phone"] = $('#Phone').val();
    contactRec["Email"] = $('#Email').val();
    contactRec["Address"] = $('#MailingAddress').val();
    contactRec["Work_Email__c"] = $('#Work_Email__c').val();
    contactRec["Decision_Maker__c"] = $('#Decision_Maker__c').prop('checked');
    contactRec["Favorite_Destination_s__c"] = $('#Favorite_Destination_s__c').val();
    contactRec["Favorite_Restaurant_s__c"] = $('#Favorite_Restaurant_s__c').val();
    contactRec["Favorite_Hotel_s__c"] = $('#Favorite_Hotel_s__c').val();
    contactRec["Referred_By__c"] = $('#Referred_By__c').val();
    contactRec["Level__c"] = $('#Level__c').val();
    contactRec["MobilePhone"] = $('#MobilePhone').val();
    if($('#PAN_Number__c').val()){
      var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;  
      if(!regex.test($('#PAN_Number__c').val())){      
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
    if($('#Aadhaar_Number__c').val()){
      var regex = "[0-9]{12}";
      if(!($('#Aadhaar_Number__c').val()).match(regex)){
        $('.aadharConReq').css('display','block');  
        alert('Aadhar Number is invalid');
        return ; 
      }
      else{
        $('.aadharConReq').css('display','none'); 
      }
    }
    handleSaveSubmitContact();
    
  };

pickListValueCreation();


