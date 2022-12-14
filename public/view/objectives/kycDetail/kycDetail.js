

let kycDetail;
let accountId;
let eventObjectiveId;


const setFormValue = () => {
  let kycFormId = ["PAN", "Sales_Tehsil", "Sales_District", "License_Type",
    "License_Number", "License_Name", "GST", "TIN", "Central_Sales_Tax_Number",
    "VAT_Registration_Number", "IFSC_Code","Bank_Account_Name","Bank_Address", "Bank_Account_Number", "Registration_Certificate_File", "Parternership_Deed_File", "Tin_Vat_Certicate_File", "Gst_Registration_Certificate_File", "License_Copy_File", "Front_Fascade_File", "Pan_Card_File", "Billing_Street", "Billing_Postal_Code", "Billing_City", 'sameAsBilling','Temporarily_Closed',"Parent_Account_Name","Estimated_Monthly_Premium_Mass_Sales","Estimated_Monthly_Premium_Mass_Sales","Craft_Monthly_Mass_Volume","Craft_Monthly_Premium_Volume","UB_Monthly_Mass_Volume","UB_Monthly_Premium_Volume","ABI_Monthly_Mass_Volume","ABI_Monthly_Premium_Volume","Carlsberg_Monthly_Mass_Volume","Carlsberg_Monthly_Premium_Volume"];

  for (let i of kycFormId) {

    if (i.indexOf('File') > -1) {

      if (kycDetail[i]) {

        $('.' + i).css('color', '#5cb85c');
      }
    }
    else {
      if (i === 'sameAsBilling'|| i==='Temporarily_Closed') {
         $('#' + i).prop('checked', kycDetail[i] ? kycDetail[i] : false);
      }
      else {
        $('#' + i).val(kycDetail[i] ? kycDetail[i] : '');
      }

    }

  }
};



const initailizeKYC = () => {

  //    kycDetail = await getItemFromStore('kycDetail',generatedId);
  //    prefilledaluesAccount(await getItemFromStore('account',accountId));

  //formInitialization();
  setFormValue();
  //pickListConstruct();
  $('#billingState').val(accountRec.BillingState);
  $('#billingCountry').val(accountRec.BillingCountry);
  ownerPanelCreation();
  personPanelCreation();
};

const formInitialization = () => {
  for (let i in kycDetail) {
    if (i.includes('File')) {
      fileAttachedBackgroundChange(i);
    }
    else if (i !== 'ownerTitle' && i !== 'contactTitle') {
      inputTextValue(i);
    }
  }
};


const inputTextValue = (key) => {
  let ele = document.querySelector(`#${key}`);
  if (ele) {
    ele.value = kycDetail[key];
    let outerDiv = document.querySelector(`#${key}Div`);
    if (outerDiv)
      outerDiv.classList.add('is-dirty');
  }

};

const prefilledaluesAccount = (account) => {
  // Billing State 
  let billingState = document.querySelector('#billingState');
  billingState.value = account.BillingState;
  // Billing Country
  let billingCountry = document.querySelector('#billingCountry');
  billingCountry.value = account.BillingCountry;

};

const pickListConstruct = () => {
  let titleOwner = document.querySelector('#titleOwner');
  titleOwner.appendChild(createPickListKYC(['Mr.', 'Ms.', 'Mrs.'], ['Mr.', 'Ms.', 'Mrs.'], kycDetail.Owner_Title ? kycDetail.Owner_Title : '', 'Title', 'Owner_Title', pickListListener));
  let titleContact = document.querySelector('#titleContact');
  titleContact.appendChild(createPickListKYC(['Mr.', 'Ms.', 'Mrs.'], ['Mr', 'Ms', 'Mrs'], kycDetail.Contact_Title ? kycDetail.Contact_Title : '', 'Title', 'Contact_Title', pickListListener));
};

const formListener = (event) => {
  kycDetail[event.id] = event.value;
  decimalValidator();
};

const pickListListener = (event) => {
  const key = event.target.lang;
  const value = event.target.dataset.val;
  kycDetail[key] = value;
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

const handleSaveNext = async () => {
  await writeData('kycDetail', kycDetail);

};

var kycData = {};
getAllKYCData = () => {

  kycData["Owner_Title"] = $('#Owner_Title').val();
  kycData["Owner_First_Name"] = $('#Owner_First_Name').val();
  kycData["Owner_Last_Name"] = $('#Owner_Last_Name').val();
  kycData["Owner_Address"] = $('#Owner_Address').val();
  //    
  kycData["Contact_Title"] = $('#Contact_Title').val();
  kycData["Contact_First_Name"] = $('#Contact_First_Name').val();
  kycData["Contact_Last_Name"] = $('#Contact_Last_Name').val();

  kycData["Sales_Tehsil"] = $('#Sales_Tehsil').val();
  kycData["Sales_District"] = $('#Sales_District').val();
  kycData["License_Type"] = $('#License_Type').val();
  kycData["License_Number"] = $('#License_Number').val();

  kycData["Billing_Street"] = $('#Billing_Street').val();
  kycData["Billing_Postal_Code"] = $('#Billing_Postal_Code').val();
  kycData["Billing_City"] = $('#Billing_City').val();

  kycData["GST"] = $('#GST').val();
  kycData["TIN"] = $('#TIN').val();
  kycData["Central_Sales_Tax_Number"] = $('#Central_Sales_Tax_Number').val();
  kycData["VAT_Registration_Number"] = $('#VAT_Registration_Number').val();
  kycData["IFSC_Code"] = $('#IFSC_Code').val();
  kycData["Bank_Account_Name"] = $('#Bank_Account_Name').val();
  kycData["Bank_Address"] = $('#Bank_Address').val();
  kycData["Bank_Account_Number"] = $('#Bank_Account_Number').val();
  kycData["PAN"] = $('#PAN').val();
  //    
  kycDetail = {
    ...kycDetail,
    ...kycData
  };
 // // console.log(kycDetail);
    saveKycDetail();
};


handlePageRedirect = async (value) => {
  kycData["Owner_Title"] = $('#Owner_Title').val();
  kycData["Owner_First_Name"] = $('#Owner_First_Name').val();
  kycData["Owner_Last_Name"] = $('#Owner_Last_Name').val();
  kycData["Owner_Address"] = $('#Owner_Address').val();
  //    
  kycData["Contact_Title"] = $('#Contact_Title').val();
  kycData["Contact_First_Name"] = $('#Contact_First_Name').val();
  kycData["Contact_Last_Name"] = $('#Contact_Last_Name').val();

  kycData["Sales_Tehsil"] = $('#Sales_Tehsil').val();
  kycData["Sales_District"] = $('#Sales_District').val();
  kycData["License_Type"] = $('#License_Type').val();
  kycData["License_Number"] = $('#License_Number').val();

  kycData["Billing_Street"] = $('#Billing_Street').val();
  kycData["Billing_Postal_Code"] = $('#Billing_Postal_Code').val();
  kycData["Billing_City"] = $('#Billing_City').val();

  kycData["GST"] = $('#GST').val();
  kycData["TIN"] = $('#TIN').val();
  kycData["Central_Sales_Tax_Number"] = $('#Central_Sales_Tax_Number').val();
  kycData["VAT_Registration_Number"] = $('#VAT_Registration_Number').val();
  kycData["IFSC_Code"] = $('#IFSC_Code').val();
  kycData["Bank_Account_Name"] = $('#Bank_Account_Name').val();
  kycData["Bank_Address"] = $('#Bank_Address').val();
  kycData["Bank_Account_Number"] = $('#Bank_Account_Number').val();
  kycData["PAN"] = $('#PAN').val();
  //    
  kycDetail = {
    ...kycDetail,
    ...kycData
  };
  await writeData('kycDetail', kycDetail);
  const recordTypeName = accountRec.RecordType.DeveloperName;

  if (recordTypeName === 'Distributor_Warehouse') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Distributor') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'On_Premise_General') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Consumer') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Institutional_Off_Premise') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Institutional_On_Premise') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Non_beer_Warehouse') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Off_Premise_Outlet') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'On_Premise_Hotel') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Supplier') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Temporary_Event') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Wholesaler') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Lead') {
    if (value === 'Home') {
      window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/leadDetail/leadDetailRelated.html?leadId=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/leadDetail/leadDetail.html?leadId=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/leadDetail/leadDetailMedia.html?leadId=' + accountRec.Id;
    }

  }
};



checkBoxChangeHandler = (ele) => {
  const key = $(ele).attr('id');
  const val = $(ele).prop('checked');
  kycDetail[key] = val;
  if(key==='sameAsBilling'){
    shippingAddressField(kycDetail['sameAsBilling']);
  }
};

const shippingAddressField = (sameAsBilling) => {
  if (!sameAsBilling) {
    let tmp = '';
    tmp += '<div class="col-sm-5 col-xs-10 shippingAdd">';
    tmp += '<div class="form-group" id="shippingStreetDiv">';
    tmp += '<label class="control-label" for="shippingStreet">Shipping Address</label>';
    tmp += '<textarea class="form-control" type="text" rows= "3" id="shippingStreet" onkeyup="formListener(this)" value="' + (kycDetail['shippingStreet'] ? kycDetail['shippingStreet'] : '') + '" lang="shippingStreet" >' + (kycDetail['shippingStreet'] ? kycDetail['shippingStreet'] : '') + '</textarea>';

    tmp += '</div>';
    tmp += '</div>';
    tmp += '<div class="col-sm-5 col-xs-10 shippingAdd">';
    tmp += '<div class="form-group" id="shippingPostalCodeDiv">';
    tmp += '<label class="control-label" for="shippingPostalCode">Shipping Postal Code</label>';

    tmp += '<input class="form-control" lang="Shipping_Postal_Code" type="text" id="shippingPostalCode" value="' + (kycDetail['shippingPostalCode'] ? kycDetail['shippingPostalCode'] : '') + '" onkeyup="formListener(this)">';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '<div class="col-sm-5 col-xs-10 shippingAdd">';
    tmp += '<div class="form-group" id="shippingCityDiv">';
    tmp += '<label class="control-label" for="shippingCity">Shipping City</label>';
    tmp += '<input class="form-control" lang="Shipping_City" type="text" id="shippingCity" onkeyup="formListener(this)" value="' + (kycDetail['shippingCity'] ? kycDetail['shippingCity'] : '') + '">';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '<div class="col-sm-5 col-xs-10 shippingAdd">';
    tmp += '<div class="form-group" id="shippingStateDiv">';
    tmp += '<label class="control-label" for="shippingState">Shipping State</label>';
    // tmp += '<input class="form-control" data-target="#stateList" data-toggle="modal" type="text" id="shippingState" onkeyup="formListener(this)" value="' + (kycDetail['shippingState'] ? kycDetail['shippingState'] : '') + '"  >';
    tmp += '<div data-toggle="modal" data-target="#stateList">';
    tmp += '   <input type="text" class="form-control" id="shippingState" readonly onkeyup="formListener(this)" value="' + (kycDetail['shippingState'] ? kycDetail['shippingState'] : '') + '"  >';
    tmp += '   <button class="shiipingState-search"><i class="fa fa-search"></i></button>';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '<div class="col-sm-5 col-xs-10 shippingAdd">';
    tmp += '<div class="form-group" id="shippingCountryDiv">';
    tmp += '<label class="control-label" for="shippingCountry">Shipping Country</label>';
    tmp += '<input class="form-control" type="text" id="shippingCountry" onkeyup="formListener(this)" value="' + (kycDetail['shippingCountry'] ? kycDetail['shippingCountry'] : '') + ' "  >';

    tmp += '</div>';
    tmp += '</div>';

    $('#statutory').append(tmp);
  }
  else {
    kycDetail['shippingCountry'] = null;
    kycDetail['shippingState'] = null;
    kycDetail['shippingCity'] = null;
    kycDetail['shippingPostalCode'] = null;
    kycDetail['shippingStreet'] = null;
    
    kycDetail['Shipping_State_Geo'] = null;
    $('.shippingAdd').css('display', 'none');
  }





};

let isContactCreation = true;
let selectedContactIndex = -1;
let contactType = null;
let newCon = {};

const validateEmail =(email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

handleContactSave = () => {

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
    //  alert('Email is invalid');
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
  newCon = {
    ...newCon,
    'Title': $('#contactTitle')[0].value,
    'FirstName': $('#contactFirstName').val(),
    'LastName': $('#contactLastName').val(),
    'Address': $('#contactAddress').val(),
    'Phone1': $('#contactPhone1').val(),
    'Phone2': $('#contactPhone2').val(),
    'Email': $('#contactEmail').val(),
    'BirthDate': $('#contactBirthDate').val() ? new Date($('#contactBirthDate').val()) : null,
    'Aniversary': $('#contactAniversary').val() ? new Date($('#contactAniversary').val()) : null,
    'Role': $('#contactRole').val(),
    'AadharNumber': $('#contactAadharNumber').val(),
    'PANNumber': $('#contactPANNumber').val(),
  };
  if (!newCon.Title || !newCon.FirstName || !newCon.LastName || !newCon.Phone1) {
    return;
  }
  if (isContactCreation) {

    if (!kycDetail[contactType]) {
      kycDetail[contactType] = [];
    }
    kycDetail[contactType].push(newCon);

  }
  else {
    
    kycDetail[contactType][selectedContactIndex] = newCon;
  }

  isContactCreation = true;
  selectedContactIndex = -1;
  contactType = null;
  newCon = {};
  $('#ownerCreation').modal('hide');
  personPanelCreation();
  ownerPanelCreation();
  // $('#ownerCreation').css('display','none');
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

  newCon[key] = await toBase64(compressedFile);
  fileAttachedBackgroundChange(key);

};

handleCreateContactInitiate = (type) => {
  contactType = type;
  pickListValueCreation(type);
  isContactCreation = true;
  selectedContactIndex = -1;
  newCon = {};
  if(type === 'ownerContacts')
  {
    $('.decisionMaker').css('display','block');  
    $('.decisionMaker label').css('width','100%');
    $('.decisionMaker label').css('text-align','left'); 
  }else{
    $('.decisionMaker').css('display','none');
  }
  
  $('#contactTitle').prop('value', '');
  $('#contactFirstName').prop('value', '');
  $('#contactLastName').prop('value', '');
  $('#contactAddress').prop('value', '');
  $('#contactPhone1').prop('value', '');
  $('#contactEmail').prop('value', '');
  $('#contactPhone2').prop('value', '');
  $('#contactBirthDate').prop('value', '');
  $('#contactAniversary').prop('value', '');
  $('#contactRole').prop('value', '');
  $('#contactAadharNumber').prop('value', '');
  $('#contactPANNumber').prop('value', '');
  $('.VisitingCard').css('color', '');
  $('.contactAadharNumberFile').css('color', '');
  $('.contactPANNumberFile').css('color', '');
};

handleEditContactInitiate = (ele) => {
  newCon = {};
  let type = $(ele).attr('data-type');
  let index = $(ele).attr('data-index');
  isContactCreation = false;
  contactType = type;
  pickListValueCreation(type);
  selectedContactIndex = index;
  const contactValue = kycDetail[contactType][selectedContactIndex];
  $('#contactTitle').prop('value', contactValue['Title']);
  $('#contactFirstName').prop('value', contactValue['FirstName']);
  $('#contactLastName').prop('value', contactValue['LastName']);
  $('#contactAddress').prop('value', contactValue['Address']);
  $('#contactPhone1').prop('value', contactValue['Phone1']);
  $('#contactEmail').prop('value', contactValue['Email']);
  $('#contactPhone2').prop('value', contactValue['Phone2']);
  $('#contactBirthDate').prop('value', contactValue['BirthDate'] ? contactValue['BirthDate'].toISOString().substring(0, 10) : '');
  $('#contactAniversary').prop('value', contactValue['Aniversary'] ? contactValue['Aniversary'].toISOString().substring(0, 10) : '');
  $('#contactRole').prop('value', contactValue['Role']);
  $('#contactAadharNumber').prop('value', contactValue['AadharNumber']);
  $('#contactPANNumber').prop('value', contactValue['PANNumber']);
  newCon = contactValue;
  if (contactValue['VisitingCard']) {
    fileAttachedBackgroundChange('VisitingCard');
  }
  else {
    $('.VisitingCard').css('color', '');
  }
  if (contactValue['contactAadharNumberFile']) {
    fileAttachedBackgroundChange('contactAadharNumberFile');
  }
  else {
    $('.contactAadharNumberFile').css('color', '');
  }
  if (contactValue['contactPANNumberFile']) {
    fileAttachedBackgroundChange('contactPANNumberFile');
  }
  else {
    $('.contactPANNumberFile').css('color', '');
  }
};

const pickListValueCreation = (type) => {
  let ownerPickListValue = ['Outlet Owner'];
  let personContactListValue = ['General Manager', 'Restaurant Manager', 'Chef', 'House Keeping', 'Accounts Manager', 'Cashier', 'Captain', 'F&B Manager', 'Outlet Manager', 'Purchase Manager', 'Bar Manager', 'Bar Tender', 'Waiter/Clerk'];
  $('#contactRole').empty();
  let tmp = '';
  tmp += '<option value="" disabled selected>Please Select Role</option>';
  if (type === 'ownerContacts') {
    ownerPickListValue.forEach(ele => {
      tmp += '<option>' + ele + '</option>';
    });

  }
  else {
    personContactListValue.forEach(ele => {
      tmp += '<option>' + ele + '</option>';
    });
  }
  $('#contactRole').append(tmp);
};

const ownerPanelCreation = () => {
  if (!kycDetail['ownerContacts']) {
    kycDetail['ownerContacts'] = [];
  }
  let tmp = '';
  $('#ownerPanel').html('');
  const ownerContacts = kycDetail['ownerContacts'];
  if (ownerContacts.length > 0) {
    for (let i = 0; i < ownerContacts.length; i++) {
      tmp += '<li>';
      tmp += '  <div class="contact-name" data-index="' + i + '" data-type="ownerContacts" data-toggle="modal" data-target="#ownerCreation" onclick="handleEditContactInitiate(this)"><i class="fas fa-pencil-alt"></i>' + ownerContacts[i].FirstName + ' ' + ownerContacts[i].LastName;
      tmp += '  </div>';

      tmp += '<table>';
      tmp += '  <tr class="contact-detail">';
      tmp += '    <th> Phone : </th>';
      tmp += '    <td class="text-left">' + ownerContacts[i].Phone1 + '</td>';
      tmp += '  </tr>';
      tmp += '</table>';
      tmp += '</li>';
    }
  }
  else {
    tmp += '<div class="alert alert-warning text-center" role="alert">No Owner contacts created !</div>';
  }
  $('#ownerPanel').append(tmp);
};


const personPanelCreation = () => {
  if (!kycDetail['personContacts']) {
    kycDetail['personContacts'] = [];
  }
  let tmp = '';
  $('#personPanel').html('');
  const personContacts = kycDetail['personContacts'];
  if (personContacts.length > 0) {
    for (let i = 0; i < personContacts.length; i++) {
      tmp += '<li>';
      tmp += '  <div class="contact-name" data-index="' + i + '" data-type="personContacts" data-toggle="modal" data-target="#ownerCreation" onclick="handleEditContactInitiate(this)"><i class="fas fa-pencil-alt"></i>' + personContacts[i].FirstName + ' ' + personContacts[i].LastName;
      tmp += '  </div>';
      tmp += '<table>';
      tmp += '  <tr class="contact-detail">';
      tmp += '    <th> Phone1 : </th>';
      tmp += '    <td class="text-left">' + personContacts[i].Phone1 + '</td>';
      tmp += '  </tr>';
      tmp += '</table>';
      tmp += '</li>';
    }
  }
  else {
    tmp += '<div class="alert alert-warning text-center" role="alert">No Person contacts created !</div>';
  }
  $('#personPanel').append(tmp);
};

showContacts = () => {
  $('#contactList').html('');
  let tmp = '';
  if (accountRec.Contacts && accountRec.Contacts.records) {
    let contactList = accountRec.Contacts.records;

    for (var i = 0; i < contactList.length; i++) {
      tmp += '<li onclick="handleContactDetailPage(this)" data-contactId="' + contactList[i].Id + '" data-accountId="' + accountRec.Id + '">';
      tmp += '  <div class="contact-name" >' + contactList[i].Salutation + ' ' + contactList[i].Name;
      tmp += '  </div>';
      tmp += '<table>';
      tmp += '  <tr class="contact-detail">';
      tmp += '    <th> Phone : </th>';
      tmp += '    <td class="text-left">' + (contactList[i].Phone ? contactList[i].Phone : '') + '</td>';
      tmp += '  </tr>';
      tmp += '</table>';
      tmp += '</li>';

    }

  }
  else {
    tmp += '<div style="margin-top: 11%;margin-right: 13%;" class="alert alert-warning text-center" role="alert">No Contacts found on this account!</div>';
  }


  $('#contactList').append(tmp);
};

$("#searchValue").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#contactList li").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

handleContactDetailPage = (ele) => {

  const contactId = $(ele).attr('data-contactId');
  const accountId = $(ele).attr('data-accountId');
  window.location.href = `/view/contactDetail/contactDetail.html?accountId=${accountId}&&contactId=${contactId}`;
};

const handleSubmitModal = () => {
  let isValid = true;
  let errortString = '';
  if(kycDetail['TIN']){
    var regex = /[0-9]{11}$/;    
    if(!regex.test(kycDetail['TIN'])){      
      $('.tinReq').css('display','block');  
      isValid = false;
      errortString += ' TIN No is Invalid! ';
    }
    
  }
  if(kycDetail['PAN']){
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;       
    if(!regex.test(kycDetail['PAN'].toUpperCase())){      
      $('.panReq').css('display','block');  
      isValid = false;
      errortString += ' PAN No is Invalid! ';
    }
    
  }
  if(kycDetail['GST']){
    
    if(!gstValidator(kycDetail['GST'])){      
      $('.gstReq').css('display','block');  
      isValid = false;
      errortString += ' GST No is Invalid! ';
    }
    
  }

  if($('#IFSC_Code').val()){
    let ifscCode = $('#IFSC_Code').val();

    var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;    
    if (!ifscCode.match(reg)) {  
      isValid = false;
      errortString += ' Invalid IFSC Code! ';  
    }
  }

  if($('#IFSC_Code').val() && (!$('#Bank_Account_Name').val() || !$('#Bank_Address').val())){
    isValid = false;
    errortString += ' Bank Name and Address is mandatory. Click on "Search" after entering IFSC Code. ';
  }
  if($('#Estimated_Monthly_Premium_Mass_Sales').val() != null && $('#Estimated_Monthly_Premium_Mass_Sales').val() != ''){
    $('#requireEst').css('display','none');

    
  }else{
    isValid = false;
    errortString += ' Estimated Monthly Premium Mass Sales is mandatory ! ';
    $('#requireEst').css('display','block');
    
  }
  if(!decimalValidator()){
    isValid = false;
    errortString += 'Please fix errors before submitting the form';
  }
  if(!isValid){
    showNotification({message : errortString});

    return;
  }
  $('#kycSubmit').modal('show');
};
const handleFetchAccount = async() => {
  await fetchParentAccounts();
};
const renderParentAccountList = () => {
  let tmp='';
  $('.groupAccountList').empty();
  if(parentAccounts.length>0){
    tmp += '<ul class="list-group">';
    parentAccounts.forEach(ele => {
        tmp += `<li class="list-group-item" data-accountId="${ele.Id}" onclick="handleParentAccountValue(this)">${ele.Name}</li>`;
    });
    tmp += ' </ul>';
  }
  else{
    tmp +=`<div class="alert alert-info" dis>
    <strong>Info!</strong> No Accounts Found.
</div>`;
  }
  $('.groupAccountList').append(tmp);
};
	//setup before functions
	let typingTimer;                //timer identifier
	let doneTypingInterval = 1000;  //time in ms, 5 second for example
	let $input = $('#searchValue');
	
	//on keyup, start the countdown
	$input.on('keyup', function () {
	  clearTimeout(typingTimer);
	  typingTimer = setTimeout(fetchParentAccounts, doneTypingInterval);
	});
	
	//on keydown, clear the countdown 
	$input.on('keydown', function () {
	  clearTimeout(typingTimer);
	});
	const handleParentSearchAcc = (ele) => {
	  const val = $(ele).prop('value');
	  if(parentAccounts.length>0){
	    parentAccounts = parentAccounts.filter(ele => {
	      if((ele.Name).toLowerCase().indexOf((val).toLowerCase())>-1){
	        return true;
	      }
	      return false;
	    });
	    renderParentAccountList();
	  }
	};
	
	const handleParentAccountValue = async(ele) => {
	  const accountId = $(ele).attr('data-accountId');
	  kycDetail.Parent_Account = accountId;
	  kycDetail.Parent_Account_Name = (await getItemFromStore('account',accountId)).Name;
	  $('#groupAccounts').modal('hide');
	  $('#Parent_Account_Name').prop('value',kycDetail.Parent_Account_Name);
	};
	
	const fetchParentAccounts =async () => {
	  let searchKey = $('#searchValue').val();
	  let openCursor = null;  
	  if(searchKey){
	    openCursor = await keyBasedSearchingIndexedDB('account',searchKey.toUpperCase());
	  }
	  else{
	      openCursor = await openCursorForStore('account',openCursor ? openCursor.value.Id : null);
	  }
	  let limit = 200;
	  parentAccounts = [];
	  
	  while(parentAccounts.length<limit){
      if((openCursor&&openCursor._request.result===null)||!openCursor){
	      break;
	    }
	    let valueReturned = await fetchFromCursorAccountListView(openCursor);
	    
	    if(searchKey){
	      if(valueReturned.Name&&(valueReturned.Name).toLowerCase().indexOf((searchKey).toLowerCase())>-1){
	        parentAccounts.push(valueReturned);  
	      }
	    }
	    else{
	      parentAccounts.push(valueReturned);
	    }
	    
	    await openCursor.continue();
	  }
	  renderParentAccountList();
	};
	


$(".panNumber").keyup(function () {      
  var inputvalues = $(this).val().toUpperCase();    
  if(inputvalues){
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;    
    if(!regex.test(inputvalues)){      
    // $(".panNumber").val("");    
    // alert("invalid PAN no");    
    $('.panReq').css('display','block');  
    return regex.test(inputvalues);    
    }  
  }  
    $('.panReq').css('display','none');  
});      


$(".gstNumber").keyup(function () {    

  var inputvalues = $(this).val();   
  
    if(inputvalues){
      
        
    if(!gstValidator(inputvalues)){      
    // $(".gstNumber").val("");    
      
    // alert("invalid GST no");  
    $('.gstReq').css('display','block');  
      return ;    
      }    
    }     
  
    $('.gstReq').css('display','none');  
}); 
const gstValidator = (g) => {
  let regTest =  /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(g);
  
  return regTest
}

$(".tinNumber").keyup(function () {      
  var inputvalues = $(this).val();    
  if(inputvalues){  
    var regex = /[0-9]{11}$/;    
    if(!regex.test(inputvalues)){      
    // $(".tinNumber").val("");    
    // alert("invalid TIN no");    
    $('.tinReq').css('display','block');  
    return regex.test(inputvalues);    
    }    
  }
    $('.tinReq').css('display','none');  
}); 



// State filter function
// Search for States
const handleStateSearch = (ele) =>{
    
  let value = $(ele).val();
  stateList = stateMaster.filter((ele) => {
      let isValid = true;
      if (ele.Name && value) {
        if (ele.Name.toLowerCase().indexOf(value.toLowerCase()) < 0) {
          isValid = false;
        }
      }
      return isValid;
  });

 showState();
  
};

// Displaying List of States on UI

const showState = () =>{
  $('#listOfStates').empty('');
  let tmp = '';
  if(stateList.length>0){
    for(let i=0;i<stateList.length;i++)
    {
      if(stateList[i].RecordType.DeveloperName === 'State')
        {
        tmp +=`
            <div class="state" onclick="selectState(this)" data-name="${stateList[i].Id}">
                <b>${stateList[i].Name}</b>
              
            </div>
        `;
        }
    }
  }
  else{
    tmp +=`
    <div class="alert alert-info" role="alert">
    No State found!
  </div>
        `;
  }

  $('#listOfStates').append(tmp);
};


// Selecting a particular State and closing modal window
const selectState = (ele) =>{
  let value = $(ele).attr('data-name');
  $('#shippingState').val(stateMap.get(value));
  $('#stateList').modal('hide');
  kycDetail['shippingState'] = stateMap.get(value);
  kycDetail['Shipping_State_Geo'] = value;

};

const decimalValidator = () => {
  let isValid = true;
  let regex = '^[0-9]+(\.[0-9]{1,4})?$'; // 4decimal precision check
  
  if($('#Estimated_Monthly_Premium_Mass_Sales').val()){
    const regexExp = RegExp(regex);
    isValid = regexExp.test($('#Estimated_Monthly_Premium_Mass_Sales').val());
    if(regexExp.test($('#Estimated_Monthly_Premium_Mass_Sales').val())){
        $('.estError').css('display','none');
    }
    else{
        $('.estError').css('display','block');
    }

}
else{
    $('.estError').css('display','none');
}


  if($('#UB_Monthly_Mass_Volume').val()){
      const regexExp = RegExp(regex);
      isValid = regexExp.test($('#UB_Monthly_Mass_Volume').val());
      if(regexExp.test($('#UB_Monthly_Mass_Volume').val())){
          $('.ubMMV').css('display','none');
      }
      else{
          $('.ubMMV').css('display','block');
      }

  }
  else{
      $('.ubMMV').css('display','none');
  }


  if($('#UB_Monthly_Premium_Volume').val()){
      const regexExp = RegExp(regex);
      isValid = regexExp.test($('#UB_Monthly_Premium_Volume').val());
      if(regexExp.test($('#UB_Monthly_Premium_Volume').val())){
          $('.ubMPV').css('display','none');
      }
      else{
          $('.ubMPV').css('display','block');
      }

  }
  else{
      $('.ubMPV').css('display','none');
  }


  if($('#ABI_Monthly_Mass_Volume').val()){
    const regexExp = RegExp(regex);
    isValid = regexExp.test($('#ABI_Monthly_Mass_Volume').val());
    if(regexExp.test($('#ABI_Monthly_Mass_Volume').val())){
        $('.abiMMV').css('display','none');
    }
    else{
        $('.abiMMV').css('display','block');
    }

}
else{
    $('.abiMMV').css('display','none');
}


if($('#ABI_Monthly_Premium_Volume').val()){
  const regexExp = RegExp(regex);
  isValid = regexExp.test($('#ABI_Monthly_Premium_Volume').val());
  if(regexExp.test($('#ABI_Monthly_Premium_Volume').val())){
      $('.abiMPV').css('display','none');
  }
  else{
      $('.abiMPV').css('display','block');
  }

}
else{
  $('.abiMPV').css('display','none');
}

if($('#Carlsberg_Monthly_Mass_Volume').val()){
  const regexExp = RegExp(regex);
  isValid = regexExp.test($('#Carlsberg_Monthly_Mass_Volume').val());
  if(regexExp.test($('#Carlsberg_Monthly_Mass_Volume').val())){
      $('.carlMMV').css('display','none');
  }
  else{
      $('.carlMMV').css('display','block');
  }

}
else{
  $('.carlMMV').css('display','none');
}

if($('#Carlsberg_Monthly_Premium_Volume').val()){
  const regexExp = RegExp(regex);
  isValid = regexExp.test($('#Carlsberg_Monthly_Premium_Volume').val());
  if(regexExp.test($('#Carlsberg_Monthly_Premium_Volume').val())){
      $('.carlMPV').css('display','none');
  }
  else{
      $('.carlMPV').css('display','block');
  }

}
else{
  $('.carlMPV').css('display','none');
}

if($('#Craft_Monthly_Mass_Volume').val()){
  const regexExp = RegExp(regex);
  isValid = regexExp.test($('#Craft_Monthly_Mass_Volume').val());
  if(regexExp.test($('#Craft_Monthly_Mass_Volume').val())){
      $('.craftMMV').css('display','none');
  }
  else{
      $('.craftMMV').css('display','block');
  }

}
else{
  $('.craftMMV').css('display','none');
}

if($('#Craft_Monthly_Premium_Volume').val()){
  const regexExp = RegExp(regex);
  isValid = regexExp.test($('#Craft_Monthly_Premium_Volume').val());
  if(regexExp.test($('#Craft_Monthly_Premium_Volume').val())){
      $('.craftMPV').css('display','none');
  }
  else{
      $('.craftMPV').css('display','block');
  }

}
else{
  $('.craftMPV').css('display','none');
}

  return isValid;

};


handleIFSCField = (ele) =>{
  let val = $(ele).val();

  var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;    
  if (val.match(reg)) {    
    $('.ifscReq').css('display','none');    
  }    
  else {    
   $('.ifscReq').css('display','block');   
   $('#Bank_Account_Name').val("");
   $('#Bank_Address').val("");
          
  }    
  
}

handleSearchAccount = async() =>{
  // api url
  let ifscCode = $('#IFSC_Code').val();


  var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;    
  if (ifscCode.match(reg)) {    
    $('.ifscReq').css('display','none');
    let api_url = `https://ifsc.razorpay.com/${ifscCode}`;
    await getapi(api_url);
    return true;    
  }    
  else {    
   $("#IFSC_Code").val("");    
   $('.ifscReq').css('display','block');    
   return false;    
  }    
  
}

// Defining async function
const getapi = async (url) =>{

  try{
    const response = await fetch(url);
    let data = await response.json();
      
    if(data === 'Not Found'){
      $('.ifscReq').css('display','block');
    }else{
      $('#Bank_Account_Name').val(data.BANK);
      $('#Bank_Address').val(data.ADDRESS);
      $('.ifscReq').css('display','none');
    }
}
catch(e){
  console.log(e);
  alert('Please check the Internet')
}
 
}