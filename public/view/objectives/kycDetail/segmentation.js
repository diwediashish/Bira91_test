
let kycDetail = {};
let recordTypeWiseField;
let recordType;
let fieldType;
let fieldLabel;
let pickListValues;
let changeValue = null;
let changeId = '';
const setFormValue = () => {
  let segmentationId = ["Channel", "Sub_Channel", "Beacon_Flag", "QCO_Flag",
    "Type", "Ocassion", "Draft_Ready", "Cuisine", "Size_Format",
    "Outdoor_Seating", "Location", "No_of_Rooms", "Star_Rating", "No_of_Banquets",
    "Minibar_Available", "Zomato_Cost_for_2", "Other_Entertainment", "Pool_Side", "Beer_Selection"];

  for (let i of segmentationId) {
    $('#' + i).val(kycDetail[i]);
  }
}

initializeSegmentation = () => {

  recordWiseFields();
};


const recordWiseFields = () => {
  recordType = accountRec.RecordType.DeveloperName;
  recordTypeWiseField = new Map([
    ['On_Premise_Hotel', ['Channel', 'Sub_Channel', 'Beacon_Flag', 'QCO_Flag', 'Type', 'Cuisine', 'Outdoor_Seating', 'Pool_Side', 'Location', 'Beer_Selection', 'No_of_Rooms', 'Star_Rating', 'No_of_Banquets', 'Minibar_Available', 'Zomato_Cost_for_2', 'Other_Entertainment']],
    ['On_Premise_General', ['Channel', 'Sub_Channel', 'Beacon_Flag', 'QCO_Flag', 'Type', 'Ocassion', 'Size_Format', 'Outdoor_Seating', 'Pool_Side', 'Location', 'Beer_Selection', 'Zomato_Cost_for_2', 'Other_Entertainment']],
    ['Off_Premise_Outlet', ['Channel', 'Sub_Channel', 'Beacon_Flag', 'QCO_Flag', 'Type', 'Size_Format', 'Location', 'Beer_Selection']],
    ['Institutional_On_Premise', ['Channel', 'Sub_Channel', 'Beacon_Flag', 'QCO_Flag', 'Type', 'Location', 'Beer_Selection']],
    ['Institutional_Off_Premise', ['Channel', 'Sub_Channel', 'Beacon_Flag', 'QCO_Flag', 'Type', 'Location', 'Beer_Selection']],
    ['Temporary_Event', ['Channel', 'Sub_Channel', 'Type']],
    ['Distributor', ['Beacon_Flag', 'QCO_Flag']],
    ['Distributor_Warehouse', ['Beacon_Flag', 'QCO_Flag']],
    ['Lead', ['Channel', 'Sub_Channel', 'QCO_Flag', 'Type', 'Ocassion', 'Cuisine', 'Outdoor_Seating', 'Pool_Side', 'Location', 'Beer_Selection', 'No_of_Rooms', 'Star_Rating', 'No_of_Banquets', 'Minibar_Available', 'Zomato_Cost_for_2', 'Other_Entertainment' , 'Size_Format']]// Added for Lead Segmentation Page 
  ]);
  fieldType = new Map([
    ['Channel', 'Picklist'],
    ['Sub_Channel', 'Picklist'],
    ['Beacon_Flag', 'Checkbox'],
    ['QCO_Flag', 'Checkbox'],
    ['Type', 'Picklist'],
    ['Ocassion', 'Picklist'],
    ['Draft_Ready', 'Checkbox'],
    ['Cuisine', 'Picklist'],
    ['Size_Format', 'Picklist'],
    ['Outdoor_Seating', 'Checkbox'],
    ['Location', 'Picklist'],
    ['No_of_Rooms', 'Number'],
    ['Star_Rating', 'Picklist'],
    ['No_of_Banquets', 'Number'],
    ['Minibar_Available', 'Checkbox'],
    ['Zomato_Cost_for_2', 'Picklist'],
    ['Other_Entertainment', 'MultiPicklist'],
    ['Pool_Side', 'Checkbox'],
    ['Beer_Selection', 'Picklist'],
  ]);
  fieldLabel = new Map([
    ['Channel', 'Channel'],
    ['Sub_Channel', 'Sub Channel'],
    ['Beacon_Flag', 'Beacon'],
    ['QCO_Flag', 'QCO'],
    ['Type', 'Type'],
    ['Ocassion', 'Occasion'],
    ['Draft_Ready', 'Draft Ready'],
    ['Cuisine', 'Cuisine'],
    ['Size_Format', 'Size'],
    ['Outdoor_Seating', 'Outdoor Seating'],
    ['Location', 'Location'],
    ['No_of_Rooms', 'No of Rooms'],
    ['Star_Rating', 'Star Rating'],
    ['No_of_Banquets', 'No of Banquets'],
    ['Minibar_Available', 'Minibar Available'],
    ['Zomato_Cost_for_2', 'Zomato Cost for 2'],
    ['Other_Entertainment', 'Other Entertainment'],
    ['Pool_Side', 'Pool Side'],
    ['Beer_Selection', 'Lead Beer Selection'],
  ]);
  pickListValues = {
    On_Premise_Hotel: {
      Channel: ['On-Premise'],
      Sub_Channel: {
        'On-Premise': ['Hotel']
      },
      Type: {
        'Hotel': ['Resorts', 'Hostels', 'Guesthouses', 'Home-Stays', 'Cottages', 'Villas', 'Bed-and-Breakfasts', 'Luxury Hotels', 'Business Hotels', 'Economy Hotels']
      },
      Ocassion: ['NA'],
      Cuisine: ['Indian', 'Barbeque', 'Asian - Chinese', 'Asian - Japanese', 'Asian - Thai', 'Asian - Korean', 'Italian / Mediterranean', 'Mexican / Latin American', 'Multi Cuisine', 'Pizza / Burger', 'Salad bar/ Health conscious outlets', 'Others'],
      Location: ['Inside Mall', 'Commercial Street', 'On a Major Intersection', 'Office Complex', 'Residential Area', 'Transit Hub', 'Inside Railway Station', 'Inside Airport', 'Inside Bus Station', 'Inside Metro Station', 'Highway/Upcountry', 'Educational Institute', 'Hospital'],
      Star_Rating: ['1', '2', '3', '4', '5', '6', '7'],
      Zomato_Cost_for_2: ['Luxury', 'Premium'],
      Other_Entertainment: ['Sports Bar', 'Comedy Club', 'Cocktail Led', 'Wine Led', 'Spirit Led'],
      Beer_Selection: ['Premium', 'Boom']
    },
    On_Premise_General: {
      Channel: ['On-Premise'],
      Sub_Channel: {
        'On-Premise': ['General']
      },
      Type: {
        'General': ['Restaurant', 'Bar', 'Club']
      },
      Ocassion: ['Beer-Led', 'Community Club', 'Music Led', 'Food Led', 'Casual', 'Co-Working Space', 'Airport Lounge', 'Banquet Hall', 'Casino', 'Shack', 'Retail Extension', 'Permit Room'],
      Cuisine: [],
      Size_Format: ['Large', 'Small'],
      Location: ['Inside Mall', 'Commercial Street', 'On a Major Intersection', 'Office Complex', 'Residential Area', 'Transit Hub', 'Inside Railway Station', 'Inside Airport', 'Inside Bus Station', 'Inside Metro Station', 'Highway/Upcountry', 'Educational Institute', 'Hospital'],
      Star_Rating: ['NA'],
      Zomato_Cost_for_2: ['Luxury', 'Premium'],
      Other_Entertainment: ['Sports Bar', 'Comedy Club', 'Cocktail Led', 'Wine Led', 'Spirit Led'],
      Beer_Selection: ['Premium', 'Boom']
    },
    Off_Premise_Outlet: {
      Channel: ['Off-Premise'],
      Sub_Channel: {
        'Off-Premise': ['Retail Account', 'Wholesaler']
      },
      Type: {
        'Retail Account': ['Modern Trade', 'Convenience Store', 'Gas Station', 'Drug Store', 'Liquor Shop', 'Wine & Beer Shop', 'Home Distributor', 'Diplomatic Store'],
        'Wholesaler': ['Modern Trade', 'Convenience Store', 'Gas Station', 'Drug Store', 'Liquor Shop', 'Wine & Beer Shop', 'Home Distributor', 'Diplomatic Store']
      },
      Ocassion: ['NA'],
      Cuisine: [],
      Size_Format: ['Large', 'Small'],
      Location: ['Inside Mall', 'Commercial Street', 'On a Major Intersection', 'Office Complex', 'Residential Area', 'Transit Hub', 'Inside Railway Station', 'Inside Airport', 'Inside Bus Station', 'Inside Metro Station', 'Highway/Upcountry', 'Educational Institute', 'Hospital'],
      Star_Rating: ['NA'],
      Zomato_Cost_for_2: [],
      Other_Entertainment: [],
      Beer_Selection: ['Premium', 'Boom']
    },
    Institutional_On_Premise: {
      Channel: ['Institutional'],
      Sub_Channel: {
        'Institutional': ['Military', 'Airlines', 'Railways', 'Cruise Ships', 'Cruise Ships', 'Stadiums', 'Duty Free'],
      },
      Type: {
        'Military': ['Canteen StoreDepartment - On'],
        'Airlines': ['Airlines'],
        'Railways': ['Railways'],
        'Cruise Ships': ['Cruise Ships'],
        'Stadiums': ['Stadiums'],
        'Duty Free': ['Duty Free']
      },
      Ocassion: ['NA'],
      Cuisine: ['Indian', 'Barbeque', 'Asian - Chinese', 'Asian - Japanese', 'Asian - Thai', 'Asian - Korean', 'Italian / Mediterranean', 'Mexican / Latin American', 'Multi Cuisine', 'Pizza / Burger', 'Salad bar/ Health conscious outlets', 'Others'],
      Location: ['Inside Mall', 'Commercial Street', 'On a Major Intersection', 'Office Complex', 'Residential Area', 'Transit Hub', 'Inside Railway Station', 'Inside Airport', 'Inside Bus Station', 'Inside Metro Station', 'Highway/Upcountry', 'Educational Institute', 'Hospital'],
      Star_Rating: ['NA'],
      Size_Format: ['Large', 'Small'],
      Zomato_Cost_for_2: [],
      Other_Entertainment: [],
      Beer_Selection: ['Premium', 'Boom']
    },
    Institutional_Off_Premise: {
      Channel: ['Institutional'],
      Sub_Channel: {
        'Institutional': ['Military', 'Duty Free'],
      },
      Type: {
        'Military': ['Canteen StoreDepartment - Off'],
        'Duty Free': ['Duty Free']
      },
      Ocassion: ['NA'],
      Cuisine: [],
      Location: ['Inside Mall', 'Commercial Street', 'On a Major Intersection', 'Office Complex', 'Residential Area', 'Transit Hub', 'Inside Railway Station', 'Inside Airport', 'Inside Bus Station', 'Inside Metro Station', 'Highway/Upcountry', 'Educational Institute', 'Hospital'],
      Star_Rating: ['NA'],
      Size_Format: ['Large', 'Small'],
      Zomato_Cost_for_2: [],
      Other_Entertainment: [],
      Beer_Selection: ['Premium', 'Boom']
    },
    Temporary_Event: {
      Channel: ['Temporary Event'],
      Sub_Channel: {
        'Temporary Event': ['NA'],
      },
      Type: {
        'NA': ['Food Festival', 'Exhibition', 'Music Festival', 'Others'],
      },
      Ocassion: ['NA'],
      Cuisine: [],
      Location: [],
      Star_Rating: ['NA'],
      Size_Format: [],
      Zomato_Cost_for_2: [],
      Other_Entertainment: [],
      Beer_Selection: []
    },
    Distributor: {
      Channel: ['NA'],
      Sub_Channel: {
        'NA': ['NA'],
      },
      Type: {
        'NA': ['NA'],
      },
      Ocassion: ['NA'],
      Cuisine: [],
      Location: [],
      Star_Rating: ['NA'],
      Size_Format: [],
      Zomato_Cost_for_2: [],
      Other_Entertainment: [],
      Beer_Selection: []
    },
    Distributor_Warehouse: {
      Channel: ['NA'],
      Sub_Channel: {
        'NA': ['NA'],
      },
      Type: {
        'NA': ['Food Festival', 'Exhibition', 'Music Festival', 'Others'],
      },
      Ocassion: ['NA'],
      Cuisine: [],
      Location: [],
      Star_Rating: ['NA'],
      Size_Format: [],
      Zomato_Cost_for_2: [],
      Other_Entertainment: [],
      Beer_Selection: []
    },
    Lead: {
      Channel: ['On-Premise','Off-Premise','Institutional','Temporary Event'],
      Sub_Channel: {
        'On-Premise': ['Hotel','General'],
        'Off-Premise': ['Retail Account', 'Wholesaler'],
        'Institutional': ['Military', 'Airlines', 'Railways', 'Cruise Ships', 'Cruise Ships', 'Stadiums', 'Duty Free'],
        'Temporary Event': ['NA'],
      },
      Type: {
        'Hotel': ['Resorts', 'Hostels', 'Guesthouses', 'Home-Stays', 'Cottages', 'Villas', 'Bed-and-Breakfasts', 'Luxury Hotels', 'Business Hotels', 'Economy Hotels'],
        'General': ['Restaurant', 'Bar', 'Club'],
        'Retail Account': ['Modern Trade', 'Convenience Store', 'Gas Station', 'Drug Store', 'Liquor Shop', 'Wine & Beer Shop', 'Home Distributor', 'Diplomatic Store'],
        'Wholesaler': ['Modern Trade', 'Convenience Store', 'Gas Station', 'Drug Store', 'Liquor Shop', 'Wine & Beer Shop', 'Home Distributor', 'Diplomatic Store'],
        'Military': ['Canteen StoreDepartment - On'],
        'Airlines': ['Airlines'],
        'Railways': ['Railways'],
        'Cruise Ships': ['Cruise Ships'],
        'Stadiums': ['Stadiums'],
        'Duty Free': ['Duty Free'],
        'NA': ['Food Festival', 'Exhibition', 'Music Festival', 'Others'],
      },
      Ocassion: ['Beer-Led','Community Club','Music Led','Food Led','Casual','Co-Working Space','Airport Lounge','Banquet Hall','Casino','Shack','Retail Extension','Permit Room','NA'],
      Cuisine: ['Indian', 'Barbeque', 'Asian - Chinese', 'Asian - Japanese', 'Asian - Thai', 'Asian - Korean', 'Italian / Mediterranean', 'Mexican / Latin American', 'Multi Cuisine', 'Pizza / Burger', 'Salad bar/ Health conscious outlets', 'Others'],
      Location: ['Inside Mall', 'Commercial Street', 'On a Major Intersection', 'Office Complex', 'Residential Area', 'Transit Hub', 'Inside Railway Station', 'Inside Airport', 'Inside Bus Station', 'Inside Metro Station', 'Highway/Upcountry', 'Educational Institute', 'Hospital'],
      Star_Rating: ['1', '2', '3', '4', '5', '6', '7'],
      Zomato_Cost_for_2: ['Luxury', 'Premium'],
      Other_Entertainment: ['Sports Bar', 'Comedy Club', 'Cocktail Led', 'Wine Led', 'Spirit Led'],
      Beer_Selection: ['Premium', 'Boom'],
      Size_Format: ['Large', 'Small'],
    },

  };

  if (recordType === 'On_Premise_Hotel') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'On_Premise_General') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Off_Premise_Outlet') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Temporary_Event') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Distributor') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Distributor_Warehouse') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Institutional_Off_Premise') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Institutional_On_Premise') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
  else if (recordType === 'Lead') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
  }
};


const constructForm = (fields, recordType, pickListValues, fieldType, fieldLabel) => {
  let segmentationPanel = document.querySelector('#segmentationPanel');
  segmentationPanel.innerHTML = '';
  fields.forEach(ele => {

    let gridEle = document.createElement('row');
    gridEle.className = 'col-sm-6 col-xs-12';
    gridEle.id = ele + 'row';
    if (fieldType.get(ele) === 'Picklist' || fieldType.get(ele) === 'MultiPicklist') {
      if (ele === 'Sub_Channel') {
        if (pickListValues[recordType]['Sub_Channel'][kycDetail['Channel']]) {
          const pickListValuesList = pickListValues[recordType]["Sub_Channel"][kycDetail['Channel']];
          gridEle.appendChild(createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), ele, pickListValueChange ,false,true ));
          let modalElement = createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), 'modal' + ele, pickListValueChange, false, false);
          createModalForEdit(ele, modalElement);
        }
        else {
          gridEle.appendChild(createPickListKYC([], [], null, fieldLabel.get(ele), ele, pickListValueChange));
        }
      }
      else if (ele === 'Type') {
        if (pickListValues[recordType]['Type'][kycDetail['Sub_Channel']]) {
          const pickListValuesList = pickListValues[recordType]['Type'][kycDetail['Sub_Channel']];
          gridEle.appendChild(createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), ele, pickListValueChange,false,true));
          let modalElement = createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), 'modal' + ele, pickListValueChange, false, false);
          createModalForEdit(ele, modalElement);
        }
        else {
          gridEle.appendChild(createPickListKYC([], [], null, fieldLabel.get(ele), ele, pickListValueChange));
        }
      }
      else {


        if (ele === 'Other_Entertainment') {
          // const pickListValuesList = pickListValues[recordType][ele];
          // gridEle.appendChild(createPickListKYC(pickListValuesList,pickListValuesList,(kycDetail[ele]?kycDetail[ele] : ''),fieldLabel.get(ele),ele,pickListValueChange,true));
          let formhgp = document.createElement('div');
          formhgp.className = "form-group";
          let label = document.createElement('label');
          label.innerHTML = 'Other Entertainment';
          formhgp.appendChild(label);
          gridEle.appendChild(formhgp);
          const pickListValuesList = pickListValues[recordType][ele];
          // gridEle.appendChild(createPickListKYC(pickListValuesList,pickListValuesList,(kycDetail[ele]?kycDetail[ele] : ''),fieldLabel.get(ele),ele,pickListValueChange,true));
          for (let i = 0; i < pickListValuesList.length; i++) {
            let div = document.createElement('div');
            div.className = "col-xs-6";
            div.appendChild(checkBoxCreation(pickListValuesList[i], pickListValuesList[i], checkBoxChangeHandler, (kycDetail[pickListValuesList[i]] ? kycDetail[pickListValuesList[i]] : false)));
            gridEle.appendChild(div);
          }
        }
        else {
          if (ele === 'Size_Format') {
            let pickListSizeFormatLabel = [];
            if (accountRec.RecordType.DeveloperName === 'On_Premise_General' || accountRec.RecordType.DeveloperName === 'On_Premise_Hotel' || accountRec.RecordType.DeveloperName === 'Institutional_On_Premise') {
              pickListSizeFormatLabel = ['Large (150+ Covers)', 'Small (<150 Covers)'];
            }
            else if (accountRec.RecordType.DeveloperName === 'Lead') {
              pickListSizeFormatLabel = ['Large', 'Small'];
            }
            else {
              pickListSizeFormatLabel = ['Large (500+ sft)', 'Small (< 500 sft)'];
            }
            const pickListValuesList = pickListValues[recordType][ele];
            gridEle.appendChild(createPickListKYC(pickListValuesList, pickListSizeFormatLabel, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), ele, pickListValueChange));
          }
          else {
            const pickListValuesList = pickListValues[recordType][ele];
            if(ele==='Channel' ||ele==='Beer_Selection' || ele==='Zomato_Cost_for_2' ){
              gridEle.appendChild(createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), ele, pickListValueChange,false,true));
              let modalElement = createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), 'modal' + ele, pickListValueChange, false, false);
              createModalForEdit(ele, modalElement);
            }
            else{
              gridEle.appendChild(createPickListKYC(pickListValuesList, pickListValuesList, (kycDetail[ele] ? kycDetail[ele] : ''), fieldLabel.get(ele), ele, pickListValueChange,false,false));
            }
            
            
          }

        }


      }
    }
    else if (fieldType.get(ele) === 'Checkbox') {
      gridEle.appendChild(checkBoxCreationReason(ele, fieldLabel.get(ele), checkBoxChangeHandler, (kycDetail[ele] ? kycDetail[ele] : false)));
      if (ele == 'Beacon_Flag' || ele == 'QCO_Flag') {
        let modalElement = checkBoxCreationReason(`modal${ele}`, fieldLabel.get(ele), checkBoxChangeHandler, (kycDetail[ele] ? kycDetail[ele] : false));
        createModalForEdit(ele, modalElement);
      }
    }
    else if (fieldType.get(ele) === 'Number') {
      gridEle.appendChild(numberFieldCreation(ele, fieldLabel.get(ele), inputFieldChangeHandler, (kycDetail[ele] ? kycDetail[ele] : null)));
    }
    segmentationPanel.appendChild(gridEle);

  });
  $('#Beacon_Flag').attr('disabled', true);
  $('#QCO_Flag').attr('disabled', true);


};


const createModalForEdit = (ele, innerContent) => {
    
    let text = innerContent.innerHTML;
    
    if (ele == 'Channel' || ele == 'Beacon_Flag' || ele == 'QCO_Flag' || ele == 'Sub_Channel' || ele == 'Type' || ele == 'Beer_Selection' || ele == 'Zomato_Cost_for_2') {
      let tmp = '';

      tmp += '<div id="' + ele + 'modal" class="modal fade reasonChangeModal" role="dialog">';
      tmp += '  <div class="modal-dialog">';
      tmp += '      <div class="modal-content">';
      tmp += '          <div class="modal-header"> ';

      tmp += '              <button type="button" class="close" data-dismiss="modal">&times;</button>';
      tmp += '          </div>';
      tmp += '          <div class="modal-body" style="height:22rem">';
      tmp += '              <div>';
      tmp += '                <h5 class="reasonLabel"><b>Reason for change</b></h5>';
      tmp += '                                        <textarea required class="form-control" placeholder="Add comments here" id="reason' + ele + '" rows="3" value="'+(kycDetail[`Reason_For_${ele}_Change`] ?kycDetail[`Reason_For_${ele}_Change`] : '' )+'">'+(kycDetail[`Reason_For_${ele}_Change`] ?kycDetail[`Reason_For_${ele}_Change`] : '' )+'</textarea>';
      tmp += '                                        <span class="reasonReq">Reason is mandatory for change</span>';
      tmp += '              </div> <br/>';
      tmp += text;
      tmp += '          </div>';
      tmp += '          <div class="modal-footer text-right">';
      tmp += '              <button type="button" class="btn" data-dismiss="modal" onclick="reasonChangeReset()">Close</button>';
      tmp +=                 '<button type="button" class="btn btn-success" onclick="handleReasonForChange()" >Submit</button>';
      tmp += '          </div>';
      tmp += '      </div>';
      tmp += '  </div>';
      tmp += '</div>';

      $('#app').append(tmp);
    }
    $('#modalType').on('change', function() { 
      changeValue = this.value;
      changeId = 'Type';
     });
     $('#modalChannel').on('change', function() { 
      changeValue = this.value;
      changeId = 'Channel';
     });
     $('#modalSub_Channel').on('change', function() { 
      changeValue = this.value;
      changeId = 'Sub_Channel';
     });
     $('#modalBeer_Selection').on('change', function() { 
      changeValue = this.value;
      changeId = 'Beer_Selection';
     });
     $('#modalZomato_Cost_for_2').on('change', function() { 
      changeValue = this.value;
      changeId = 'Zomato_Cost_for_2';
     });
     $('#modalBeacon_Flag').on('change', function() { 
      changeValue = this.checked;
      changeId = 'Beacon_Flag';
      
     });
     $('#modalQCO_Flag').on('change', function() { 
      changeValue = this.checked;
      changeId = 'QCO_Flag';

     });
  };
const inputFieldChangeHandler = (event) => {
  const key = event.target.id;
  const value = event.target.value;
  kycDetail[key] = value;
};
const handleReasonForChange = () => {
  if(changeValue!=null){
    if(kycDetail[changeId]!==changeValue&&!$(`#reason${changeId}`).val()){
      $('.reasonReq').css('display','block');
      return;
  }
  console.log(changeId,changeValue,pickListValues['Lead'])

  if(recordType == 'Lead' && changeId ==='Channel'){
     $('#modalSub_Channel').html('');
     $('#Sub_Channel').html('');
    let key;
    let options ='<option value="">--Please Select--</option>';
    for(key of pickListValues['Lead']['Sub_Channel'][changeValue]){
        options +=`<option value="${key}">${key}</option>`;
    }
    $('#modalSub_Channel').append(options);
    $('#Sub_Channel').append(options);

  }else if(recordType == 'Lead' && changeId ==='Sub_Channel'){
    $('#modalType').html('');
    $('#Type').html('');
   let key;
   let options ='<option value="">--Please Select--</option>';
   for(key of pickListValues['Lead']['Type'][changeValue]){
       options +=`<option value="${key}">${key}</option>`;
   }
   $('#modalType').append(options);
   $('#Type').append(options);

 }

    kycDetail[changeId] = changeValue;
    kycDetail[`Reason_For_${changeId}_Change`] = $(`#reason${changeId}`).val();
    if(changeId == 'Channel' || changeId == 'Sub_Channel' || changeId == 'Type' || changeId == 'Beer_Selection' || changeId == 'Zomato_Cost_for_2'){
      valueReflectDisabledUI(false,changeId,changeValue);
    }
    else{
      valueReflectDisabledUI(true,changeId,changeValue);
    }
  }

  $('.reasonReq').css('display','none');
  $(`.modal`).modal('hide');
  reasonChangeReset();
};

const reasonChangeReset = () => {
  $('.reasonReq').css('display','none');
  changeId = null;
  changeValue = null;
};
const valueReflectDisabledUI = (isCheckbox,fieldId,fieldValue) => {
  if(isCheckbox){
    $(`#${fieldId}`).prop('checked',fieldValue);
  }
  else{
    $(`#${fieldId}`).prop('value',fieldValue);
  }
};
const checkBoxChangeHandler = (event) => {
  const key = event.target.id;
  const value = event.target.checked;
  kycDetail[key] = value;
};

const pickListValueChange = (event) => {
  console.log(event);
  const value = $(event.target).val();
  const key = event.target.id;
  kycDetail[key] = value;
  if (key === 'Channel' || key === 'Sub_Channel') {
    constructForm(recordTypeWiseField.get(recordType), recordType, pickListValues, fieldType, fieldLabel);
    //  componentHandler.upgradeDom();
  }
};




handlePageRedirect = async (value) => {
  kycDetail.Last_Modified = new Date();
  kycDetail.isSynced = false;
  kycDetail.Daily_Tracker = fetchCurrentDateIdStr();
  const position = await getCurrentLocationHelper();
  kycDetail.Geolocation_Latitude = position.coords.latitude;
  kycDetail.Geolocation_Longitude = position.coords.longitude;

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