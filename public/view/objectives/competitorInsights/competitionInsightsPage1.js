const fieldTypeMap = new Map([
  ['Contract_Type', 'picklist'],
  ['Contract_Type_Text', 'text'],
  ['Contract_Period', 'picklist'],
  ['Contract_Period_Text', 'text'],
  ['Market_Share_Mass', 'slider'],
  ['Market_Share_Mass_Text', 'text'],
  ['Market_Share_Premium', 'slider'],
  ['Market_Share_Premium_Text', 'text'],
  ['Competitor_Name', 'text'],
  ['Competitor_Name_Title', 'text'],
  ['show_option', 'checkbox'],
]);
const fieldLabel = new Map([
  ['Contract_Type_Text', 'Contract Type'],
  ['Market_Share_Mass_Text', 'Market Share Mass'],
  ['Market_Share_Premium_Text', 'Market Share Premium'],
  ['Competitor_Name_Title_Text', 'Competitor Name'],
  ['show_option', 'checkbox'],
  ['Contract_Period_Text', 'Contract Period'],
]);
const picklistValues = new Map([
  ['Contract_Type', ["Market Share", "Fixed Volume"]],
  ['Contract_Period', ['Quarterly', 'Annual']]
]);
const zoneWiseValues = ['Competitor_Name_Title', 'Competitor_Name', 'show_option', 'Contract_Type_Text', 'Contract_Type', 'Contract_Period_Text', 'Contract_Period', 'Market_Share_Mass_Text', 'Market_Share_Mass', 'Market_Share_Premium', 'Market_Share_Premium_Text'];

const competitorLableChange = new Map([
  ['UB','UB'],
  ['ABI','ABI'],
  ['Carlsberg','Carlsberg'],
  ['Craft','Craft'],
]);

// let competitorVolume = [
//   {
//     Competitor_Name :'UB',
//     show_panel : false
//   },{
//     Competitor_Name :'ABI',show_panel : false
//   },{
//     Competitor_Name :'Carlsberg',show_panel : false
//   },{
//     Competitor_Name :'Craft',show_panel : false
//   },{
//     Competitor_Name :'White Owl',show_panel : false
//   },{
//     Competitor_Name :'Simba',show_panel : false
//   }
// ];

const formRender = () => {
  console.log(competitorVolume)
  $('#competitorVolume').empty('');
  let tmp = '';

  for (let i = 0; i < competitorVolume.length; i++) {
    if(i<=3){
      tmp += '<div class="row " style="margin-top:5%;">';
    }
    else{
      if(competitorVolume[i].show_option){
        tmp += '<div class="row '+competitorVolume[i].Competitor_Name+'" style="margin-top:5%;">';
      }
      else{
        tmp += '<div class="row '+competitorVolume[i].Competitor_Name+'" style="margin-top:5%;display:none;">';
      }
      
    }
    // tmp += '<div class="col-xs-6" style="color: #ed2228;"><p>Competitor Name</p>';
    // tmp += '</div>';
    tmp += '<div class="col-xs-6" style="color: #ed2228;">' + (competitorLableChange.has(competitorVolume[i].Competitor_Name) ?competitorLableChange.get(competitorVolume[i].Competitor_Name) :competitorVolume[i].Competitor_Name);
    // tmp += '<div class="col-xs-6" style="color: #ed2228;">' + competitorVolume[i].Competitor_Name;
    tmp += '</div>';
    tmp += '<div class="col-xs-6">' + createCheckBox(`${i}-show_option`, '', "checkboxListner(this)", (competitorVolume[i]['show_option'] ? competitorVolume[i]['show_option'] : false));
    tmp += '</div>';
    tmp += '</div>';
    if (competitorVolume[i].Competitor_Name !== 'Craft') {
      tmp += zoneWiseForm(`${i}-show_option_panel`, competitorVolume[i], i);
    }
    
  }
  $('#competitorVolume').append(tmp);
  isCraftEnabled(competitorVolume[3].show_option);
};
rangeSlider = (inputId, value) => {
  let slider = document.getElementById(inputId);
  let output = document.getElementById(`quantity${inputId}`);
  let backId = document.getElementById(`backColor${inputId}`);
  const index = inputId.split('-')[0];
  
  competitorVolume[index][inputId.split('-')[1]] = slider.value;
  // let backgnd = document.getElementById(backCol);
  output.innerHTML = slider.value + '%';
  backId.style.width = slider.value + '%';

  // slider.oninput = function() {
  //   if(this.value == "50")
  //   {
  //     output.innerHTML = this.value+'+'; 
  //   }
  //   else{
  //     output.innerHTML = this.value;
  //   }
  // }
};

const picklistHandler = (event) => {
  
  const value = $(event).prop('value');
  const id = $(event).attr('id');
  const index = id.split('-')[0];
  competitorVolume[index][id.split('-')[1]] = value;
  if (id.split('-')[1] === 'Contract_Period') {
    calculateDates(value, index);
  }
  if (id.split('-')[1] === 'Contract_Type') {
    if (value === 'Market Share') {

      $(`.${index}-Contract_Type`).css('display', 'block');
      $(`.${index}-Contract_Period`).css('display', 'none');
      $(`.${index}-Contract_Period_panel`).css('display', 'block');
      competitorVolume[index][`Cases_Per_Quarter`] = null;
      $(`#${index}-Cases_Per_Quarter`).prop('value', '');
    }
    else if (value === 'Fixed Volume') {
      if (competitorVolume[index]['Contract_Period']) {
        $(`.${index}-Contract_Period`).css('display', 'block');

      }
      $(`.${index}-Contract_Type`).css('display', 'none');
      $(`.${index}-Contract_Period_panel`).css('display', 'block');
      competitorVolume[index][`Market_Share_Mass`] = null;
      competitorVolume[index][`Market_Share_Premium`] = null;
    }
    else {
      //$(`.${index}-Contract_Period`).css('display', 'none');
      $(`.${index}-Contract_Type`).css('display', 'none');
      $(`.${index}-Contract_Period_panel`).css('display', 'none');
      competitorVolume[index][`Market_Share_Mass`] = null;
      competitorVolume[index][`Market_Share_Premium`] = null;
      competitorVolume[index][`Cases_Per_Quarter`] = null;

    }
  }


};

const calculateDates = (value, index) => {
  if (value) {
    if (competitorVolume[index]['Contract_Type'] === 'Fixed Volume') {
      $(`.${index}-Contract_Period`).css('display', '');
    }

    $(`.${index}-Contract_Period_Date`).css('display', '');
    if (value == 'Annual') {
      let todayDate = new Date();
      competitorVolume[index]['Start_Date'] = new Date();
      $(`#${index}-Start_Date`).prop('value', todayDate.toISOString().substring(0, 10));
      todayDate.setFullYear(todayDate.getFullYear() + 1);
      competitorVolume[index]['End_Date'] = todayDate;
      $(`#${index}-End_Date`).prop('value', todayDate.toLocaleString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        }));
    }
    else {
      let todayDate = new Date();
      competitorVolume[index]['Start_Date'] = new Date();
      $(`#${index}-Start_Date`).prop('value', todayDate.toISOString().substring(0, 10));
      todayDate.setMonth(todayDate.getMonth() + 3);
      
      competitorVolume[index]['End_Date'] = new Date(todayDate);
      $(`#${index}-End_Date`).prop('value', todayDate.toLocaleString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        }));
    }
  }
  else {
    $(`.${index}-Contract_Period`).css('display', 'none');
    competitorVolume[index]['Cases_Per_Quarter'] = '';
    $(`#${index}-Cases_Per_Quarter`).prop('value', '');
    $(`.${index}-Contract_Period_Date`).css('display', 'none');
    competitorVolume[index]['Start_Date'] = null;
    competitorVolume[index]['End_Date'] = null;
    $(`#${index}-Start_Date`).prop('value', '');
    $(`#${index}-End_Date`).prop('value', '');
  }


};

const checkboxListner = (event) => {

  const value = $(event).prop('checked');
  const id = $(event).attr('id');
  const index = id.split('-')[0];
  if (index !== "3") {
    competitorVolume[index][id.split('-')[1]] = value;
    if (value) {
      $(`.${id}_panel`).css('display', 'block');
    }
    else {
      $(`.${id}_panel`).css('display', 'none');
      competitorVolume[index][`Contract_Type`] = '';
      competitorVolume[index][`Contract_Period`] = '';
      competitorVolume[index][`Market_Share_Mass`] = null;
      competitorVolume[index][`Market_Share_Premium`] = null;
    }
  }
  else{
    
    isCraftEnabled(value);
  }

};

const isCraftEnabled = (value) => {
  let index = "3";
  if(value){
    for(let i =4;i<competitorBuckets.length;i++){
      $(`.${competitorBuckets[i].split(" ")[0]}`).css({'display': 'block','margin-left': '0px'});
      $(`.${competitorBuckets[i].split(" ")[0]}`).find('.form-group').css('margin-left','-7px')
      if(competitorVolume[i]['show_option']){
        $(`.${i}-show_option_panel`).css({'display': 'block','margin-left': '0px'});
      }
      
      
    }
    competitorVolume[index]['show_option'] = value;
    
    
  }
  else{
    for(let i =4;i<competitorBuckets.length;i++){
      $(`.${competitorBuckets[i].split(" ")[0]}`).css('display', 'none');
      $(`.${i}-show_option_panel`).css('display', 'none');
      
    }
    competitorVolume[index]['show_option'] = value;
    
  }
};
const sliderHandler = (event) => {
  const value = $(event).prop('value');
  const id = $(event).attr('id');
  rangeSlider(id, value);
};


const zoneWiseForm = (key, competitor, index) => {

  let fieldKey = '';
  let tmp = '';
  if (!competitor['show_option']) {
    tmp = '<div class="row  ' + key + '"  style="display:none;margin-bottom: 8%;" >';
  }
  else {
    tmp = '<div class="row   ' + key + '" margin-bottom: 8%; >';
  }

  // Contract Type
  tmp += '<div class="col-xs-6">';
  tmp += '<p>Contract Type</p>';
  tmp += '</div>';
  tmp += '<div class="col-xs-6">';
  fieldKey = `${index}-Contract_Type`;
  tmp += createSelectOption(fieldKey, '', ["Market Share", "Fixed Volume"], "picklistHandler(this)", (competitor['Contract_Type'] ? competitor['Contract_Type'] : ''));
  tmp += '</div>';
  let panelSelectContractType = `${index}-Contract_Period_panel`;
  if (competitor[`Contract_Type`]) {
    tmp += `<div class="col-xs-6 ${panelSelectContractType}">`;
  }
  else {
    tmp += `<div class="col-xs-6 ${panelSelectContractType}" style="display:none;">`;
  }

  tmp += '<p>Contract Period</p>';
  tmp += '</div>';
  if (competitor[`Contract_Type`]) {
    tmp += `<div class="col-xs-6 ${panelSelectContractType}">`;
  }
  else {
    tmp += `<div class="col-xs-6 ${panelSelectContractType}" style="display:none;">`;
  }

  fieldKey = `${index}-Contract_Period`;
  tmp += createSelectOption(fieldKey, '', ['Quarterly', 'Annual'], "picklistHandler(this)", (competitor['Contract_Period'] ? competitor['Contract_Period'] : ''));
  tmp += '</div>';
  let displayDate = '';

  if (!competitor[`Contract_Period`]) {
    displayDate = 'style="display:none"';
  }
  tmp += `<div class="col-xs-6 ${index}-Contract_Period_Date" ${displayDate}>`;
  tmp += '<p>Start Date</p>';
  tmp += '</div>';
  tmp += `<div class="col-xs-6 ${index}-Contract_Period_Date" ${displayDate}>`;
  fieldKey = `${index}-Start_Date`;
  let currentDate = new Date();
  let futureDateValid = currentDate.setFullYear(currentDate.getFullYear() + 2);
  let pastDateValid = currentDate.setFullYear(currentDate.getFullYear() - 4);

  tmp += createDateInput(fieldKey, null, "handleStartDateChange(this)", competitor['Start_Date'] ? competitor['Start_Date'].toISOString().substring(0, 10) : '', formatDate(futureDateValid), formatDate(pastDateValid));
  tmp += '</div>';
  tmp += `<div class="col-xs-6 ${index}-Contract_Period_Date" ${displayDate}>`;
  tmp += '<p>End Date</p>';
  tmp += '</div>';
  tmp += `<div class="col-xs-6 ${index}-Contract_Period_Date" ${displayDate}>`;
  fieldKey = `${index}-End_Date`;
  tmp += createInputReadonly(fieldKey, null, null, competitor['End_Date'] ? competitor['End_Date'].toLocaleString("en-GB", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) : '');
  tmp += '</div>';

  let displaySlider = '';
  fieldKey = `${index}-Contract_Type`;
  let panelSlider = fieldKey;
  if (competitor[`Contract_Type`] === 'Market Share') {
    displaySlider = '';
  }
  else {
    displaySlider = 'style="display:none"';

  }

  // Market Share Mass
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';
  tmp += '<p>Market Share Premium (%)</p>';
  tmp += '</div>';
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';
  fieldKey = `${index}-Market_Share_Premium`;
  const sliderValuePremium = (competitor['Market_Share_Premium'] ? competitor['Market_Share_Premium'] : 0);
  // tmp += createRangeSlider(fieldKey, sliderValuePremium, `${sliderValuePremium}%`, "sliderHandler(this)", 0, 100);
  tmp += '<div class="slidecontainer">';
  tmp += '	<div class="button-container">';
  tmp += '<button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)"  data-index="' + fieldKey + '" value="-">-</button>';
  tmp += '<input type="number" pattern="[0-9]*" name="qty" class="qty" maxlength="3"  max="100" value="' + sliderValuePremium + '" onkeyup="handleQuantityChange(this)" class="input-text qty" data-index="' + fieldKey + '"/>';

  tmp += '<button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="' + fieldKey + '" type="button" value="+">+</button>';
  tmp += '</div>';
  tmp += '</div>';
  //console.log(createSelectOption(fieldKey,'',["Market Share", "Fixed Volume"],"picklistHandler(this)",(competitor[fieldKey]? competitor[fieldKey] :'')));
  tmp += '</div>';
  // Market Share Mass
  // Market Share premium
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';
  tmp += '<p>Market Share Mass (%)</p>';
  tmp += '</div>';
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';
  fieldKey = `${index}-Market_Share_Mass`;
  const sliderValueMass = (competitor['Market_Share_Mass'] ? competitor['Market_Share_Mass'] : 0);
  //tmp += createRangeSlider(fieldKey, sliderValuePremium, `${sliderValuePremium}%`, "sliderHandler(this)", 0, 100);
  tmp += '<div class="slidecontainer">';
  tmp += '	<div class="button-container">';
  tmp += '<button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)"  data-index="' + fieldKey + '" value="-">-</button>';
  tmp += '<input type="number" pattern="[0-9]*" name="qty" class="qty" maxlength="3"  max="100" value="' + sliderValueMass + '" onkeyup="handleQuantityChange(this)" class="input-text qty" data-index="' + fieldKey + '"/>';

  tmp += '<button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="' + fieldKey + '" type="button" value="+">+</button>';
  tmp += '</div>';
  tmp += '</div>';
  //console.log(createSelectOption(fieldKey,'',["Market Share", "Fixed Volume"],"picklistHandler(this)",(competitor[fieldKey]? competitor[fieldKey] :'')));
  tmp += '</div>';
  // Market Share Premium
  if (competitor[`Contract_Type`] === 'Fixed Volume' && competitor['Contract_Period']) {
    displaySlider = '';
  }
  else {
    displaySlider = 'style="display:none"';
  }

  fieldKey = `${index}-Contracted_Volume_Premium`;
  panelSlider = `${index}-Contract_Period`;
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';
  tmp += '<p>Contracted Volume Premium (CE)</p>';
  tmp += '</div>';
  tmp += '<div class="margin-btm col-xs-6 ' + panelSlider + '" ' + displaySlider + ' >';

  const contractedVolumePremium = (competitor['Contracted_Volume_Premium'] ? competitor['Contracted_Volume_Premium'] : null);
  tmp += createNumberInput(fieldKey, '', "handleContractedVolumePremium(this)", contractedVolumePremium);
  //console.log(createSelectOption(fieldKey,'',["Market Share", "Fixed Volume"],"picklistHandler(this)",(competitor[fieldKey]? competitor[fieldKey] :'')));
  tmp += '</div>';

  
  fieldKey = `${index}-Contracted_Volume_Mass`;
  panelSlider = `${index}-Contract_Period`;
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';
  tmp += '<p style="margin:0">Contracted Volume Mass (CE)</p>';
  tmp += '</div>';
  tmp += '<div class="col-xs-6 ' + panelSlider + '" ' + displaySlider + '>';

  const contractedVolumeMass = (competitor['Contracted_Volume_Mass'] ? competitor['Contracted_Volume_Mass'] : null);
  tmp += createNumberInput(fieldKey, '', "handleContractedVolumeMass(this)", contractedVolumeMass);
  //console.log(createSelectOption(fieldKey,'',["Market Share", "Fixed Volume"],"picklistHandler(this)",(competitor[fieldKey]? competitor[fieldKey] :'')));
  tmp += '</div>';

  tmp += '</div>';

  return tmp;
};
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

handleStartDateChange = (ele) => {
  const id = $(ele).attr('id');

  
  ele.setAttribute(
    "data-date",
    moment(ele.value)
    .format( ele.getAttribute("data-date-format") )
)

  const index = id.split('-')[0];
  competitorVolume[index]['Start_Date'] = new Date($(ele).val());
  let endDate = new Date($(ele).val());
  if (competitorVolume[index]['Contract_Period'] === 'Annual') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
  else {
    endDate.setMonth(endDate.getMonth() + 3);
  }


  competitorVolume[index]['End_Date'] = endDate;
  $(`#${index}-End_Date`).prop("value", endDate.toLocaleString("en-GB", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }));
};

handleContractedVolumeMass = (event) => {
  let id = $(event).attr('id');
  if($(event).val().indexOf('.')!=-1){         
    if($(event).val().split(".")[1].length > 2){                
      if( isNaN( parseFloat( event.value ) ) ) {
        competitorVolume[id.split('-')[0]]['Contracted_Volume_Mass']= null;  
        return; 
      }
        event.value = parseFloat(event.value).toFixed(4);
    }  
  }
  competitorVolume[id.split('-')[0]]['Contracted_Volume_Mass'] = $(event).val();

};
handleContractedVolumePremium = (event) => {
  let id = $(event).attr('id');
  if($(event).val().indexOf('.')!=-1){         
    if($(event).val().split(".")[1].length > 2){                
        if( isNaN( parseFloat( event.value ) ) ) {
          competitorVolume[id.split('-')[0]]['Contracted_Volume_Premium'] = null;  
          return; 
        }
        event.value = parseFloat(event.value).toFixed(4);
        
    }  
  }
  competitorVolume[id.split('-')[0]]['Contracted_Volume_Premium'] = $(event).val();

};

const handleCompetitorVolumeSubmit = async() =>{
  let isValid = true;
  let competitorName = '';

  for(let i=0;i<competitorVolume.length;i++){
    if(competitorVolume[i]['show_option'] && i != 3)
    {
      if(!$(`#${i}-Contract_Type`).val()){
        isValid = false;
        competitorName += ' '+competitorVolume[i]['Competitor_Name'];

      }else if(!$(`#${i}-Contract_Period`).val()){
        isValid = false;
        competitorName += ' '+competitorVolume[i]['Competitor_Name'];
      }

      if($(`#${i}-Contract_Type`).val() === 'Fixed Volume' && (!$(`#${i}-Contracted_Volume_Premium`).val() || !$(`#${i}-Contracted_Volume_Mass`).val())){
        isValid = false;
        competitorName += ' '+competitorVolume[i]['Competitor_Name'];
      }

    }else if(i=== 3 && competitorVolume[i]['show_option']){
      let j=1;
      let checkTrue = true;
      let comLength = competitorVolume.length;
      
      while(checkTrue){
        if((i+j)< comLength)
        {
          if(competitorVolume[i+j]['show_option']){
            checkTrue = false;
            break;
          }
          j++;
        }else{
          break;
        }
      }
  
      if(checkTrue){
        isValid = false;
        competitorName += ' '+competitorVolume[i]['Competitor_Name'];
        // break;
      }

    }
  }

  if(isValid)
  {
   await handleFormSubmit();
  }else{
    $('#showAlertmsg').modal('show');
    $('#showAlertmsg h5').html('')
    $('#showAlertmsg h5').append(`"Please  fill information related to${competitorName} !"`);
  }
}


handlePageRedirect = async (value) => {
  let urlParams = new URLSearchParams(window.location.search);
  const accountId = urlParams.get('accountId');
  competitorInsight.Competitor_Volume = competitorVolume;
  competitorInsight.Last_Modified = new Date();
  competitorInsight.isSynced = false;
  competitorInsight.Event_Id = fetchCurrentDateIdStr() + '-' + accountId;
  competitorInsight.Daily_Tracker = fetchCurrentDateIdStr();
  const position = await getCurrentLocationHelper();
  competitorInsight.Geolocation_Latitude = position.coords.latitude;
  competitorInsight.Geolocation_Longitude = position.coords.longitude;

  await writeData('competitorInsight', competitorInsight);
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

decrementQtn = (ele) => {
  var $n = $(ele)
    .parent(".button-container")
    .find(".qty");
  let value = 0;
  var amount = Number($n.val());
  if (amount > 0) {

    value = amount - 1;
  }
  let index = $n.attr('data-index');
  competitorVolume[index.split('-')[0]][index.split('-')[1]] = value;
  $n.val(value);

};

incrementQtn = (ele) => {
  var $n = $(ele)
    .parent(".button-container")
    .find(".qty");
  let value = 0;
  var amount = Number($n.val());
  if (amount > 100) {
    value = 100;

  }
  else {
    value = Number($n.val()) + 1;

  }
  let index = $n.attr('data-index');
  competitorVolume[index.split('-')[0]][index.split('-')[1]] = value;
  $n.val(value);
};


handleQuantityChange = (ele) => {
  let val = $(ele).val();
  let index = $(ele).attr('data-index');


  if (val < 0) {
    $(ele).val(0);
    competitorVolume[index.split('-')[0]][index.split('-')[1]] = 0;
    return;
  }
  if (val > 100) {
    $(ele).val(100);
    competitorVolume[index.split('-')[0]][index.split('-')[1]] = 100;
    return;
  }
  competitorVolume[index.split('-')[0]][index.split('-')[1]] = parseFloat(val);

};





// Competitor - Volume Dashboard code 
slickSlider = () => {
  $('.competitorDashboard').slick({
      centerMode: true,
      slidesToShow: 2,
      autoplay: false,
      dots: true,
      infinite: false,
      arrows: false,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
      responsive: [
          {
              breakpoint: 769,
              settings: {
                  arrows: false,
                  centerMode: false,
                  slidesToShow: 1 
              }
    },
          {
              breakpoint: 480,
              settings: {
                  arrows: false,
                  centerMode: false,
                  slidesToShow: 1
              }
    }
  ]
  });
};

let nonContractedVol = [];
let overAllDasboard = [
  

];

let contractedVol = [
  

];

const createVolumeDashboard = () =>{
  let tmp = '';
  $('#volumeDashboard').html('');
  tmp += overAllVolume();
  tmp += contractedVolume();
  tmp += nonContractedVolume();

  $('#volumeDashboard').append(tmp);
  
slickSlider();
};

const overAllVolume = () =>{
  let tmp = '';

  let tableHead = `
  <div class="item">
  <div class="table-outer">
  <table class="overAllVol" >
  <tr><td colspan="6" style="font-weight:700; font-size: 1.25em; color: red">Overall Volume (Monthly CE)</td></tr>
  <tr>
    <th colspan="2"></th>
    <th colspan="2">Premium</th>
    <th colspan="2">Mass</th>
  </tr>
  `;
tmp = tableHead;
  console.log(overAllDasboard);
  for(let i=0;i<overAllDasboard.length;i++)
  {
    
    
    tmp +=`
      <tr>
        <td colspan="2" class="prodVolume">${overAllDasboard[i].Name}</td>
        <td>${Math.round(overAllDasboard[i].Premium)}</td>
        <td>${Math.round(overAllDasboard[i].PremiumPer)}%</td>
        <td>${Math.round(overAllDasboard[i].Mass)}</td>
        <td>${Math.round(overAllDasboard[i].MassPer)}%</td>
      </tr>
    `;
  }

  tmp +='</table>';
  tmp +='</div>';
  tmp +='</div>';

  return tmp;
};

const contractedVolume = () =>{
  let tmp = '';

  let tableHead = `
  <div class="item">
  <div class="table-outer">
  <table class="contractedVolume" >
  <tr><td colspan="6" style="font-weight:700; font-size: 1.25em; color: red">Contracted Volume (Monthly CE)</td></tr>
  
  <tr>
    <th colspan="2"></th>
    <th colspan="2">Premium</th>
    <th colspan="2">Mass</th>
  </tr>
  `;
tmp = tableHead;
console.log(contractedVol)
  for(let i=0;i<contractedVol.length;i++)
  {
    
    tmp +=`
      <tr>
        <td colspan="2" class="contVolume">${contractedVol[i].Name}</td>
        <td>${Math.round(contractedVol[i].Premium)}</td>
        <td>${contractedVol[i].PremiumPer ? Math.round(contractedVol[i].PremiumPer)+ '%' : '0%'}</td>
        <td>${Math.round(contractedVol[i].Mass)}</td>
        <td>${contractedVol[i].MassPer ? Math.round(contractedVol[i].MassPer)+ '%' : '0%'}</td>
      </tr>
    `;
  }

  tmp +='</table>';
  tmp +='</div>';
  tmp +='</div>';

  return tmp;
};


const nonContractedVolume = () =>{
  let tmp = '';

  let tableHead = `
  <div class="item">
  <div class="table-outer">
  <table class="noncontractedVolume" >
  <tr><td colspan="6" style="font-weight:700;font-size: 1.25em; color: red">Non Contracted Volume (Monthly CE)</td></tr>
  
  <tr>
    <th colspan="2"></th>
    <th colspan="2">Premium</th>
    <th colspan="2">Mass</th>
  </tr>
  `;
tmp = tableHead;

  for(let i=0;i<nonContractedVol.length;i++)
  {
    
    tmp +=`
      <tr>
        <td colspan="2" class="noncontVolume">${nonContractedVol[i].Name}</td>
        <td>${Math.round(nonContractedVol[i].Premium) }</td>
        <td>${Math.round(nonContractedVol[i].PremiumPer)+'%'}</td>
        <td>${Math.round(nonContractedVol[i].Mass)}</td>
        <td>${Math.round(nonContractedVol[i].MassPer)+'%'}</td>
      </tr>
    `;
  }

  tmp +='</table>';
  tmp +='</div>';
  tmp +='</div>';

  return tmp;
};

// formRender();