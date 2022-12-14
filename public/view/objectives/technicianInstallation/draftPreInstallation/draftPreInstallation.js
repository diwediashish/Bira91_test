
let preInstallationForm = [
//    {
//     type: "Machine Model",
//     typeId: "Machine_Model__c",
//     items : [
//         {
//             App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-01t1s000000WcK4AAK-a0D1s000001xM4VEAU",
// Draft_Installation_App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-a0j1s000000Hvh9AAC",
// Draft_Section__c: "Machine Model",
// ProductName: "BIRA91 Counter-top Cooler - Safari Super 17L",
// Product__c: "01t1s000000WcK4AAK",
// Quantity__c: 0,
//         },
//         {
//             App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-01t1s000000WcK5AAK-a0D1s000001xM4VEAU",
// Draft_Installation_App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-a0j1s000000Hvh9AAC",
// Draft_Section__c: "Machine Model",
// ProductName: "BIRA91 Counter-top Cooler - Safari Hyper 50L",
// Product__c: "01t1s000000WcK5AAK",
// Quantity__c: 0
//         }
//     ]
//    },
//    {
//     type: "Coupler Type",
//     typeId: "Coupler_Type__c",
//     items : [
//         {
//             App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-01t1s000000WcKLAA0-a0D1s000001xM4VEAU",
// Draft_Installation_App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-a0j1s000000Hvh9AAC",
// Draft_Section__c: "Coupler Type",
// ProductName: "BIRA91 Antoine S Type Keg Coupler w 2JG Fitting",
// Product__c: "01t1s000000WcKLAA0",
// Quantity__c: 0
//         },
//         {
//             App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-01t1s000000WcKNAA0-a0D1s000001xM4VEAU",
// Draft_Installation_App_Id__c: "Wed Oct 21 2020-0015D00000cU7U9QAK-a0j1s000000Hvh9AAC",
// Draft_Section__c: "Coupler Type",
// ProductName: "BIRA91 M-matic S Type  Coupler w 2JG Fitting",
// Product__c: "01t1s000000WcKNAA0",
// Quantity__c: 0
//         }
//     ]
//    }
];

// draftPreInstallation = {
//     Over_the_counter_space_required_File : null
// };
// isReadOnly = false;

// let events = {
//     Account__c: "0015D00000cU72jQAC",
// Account__r: {Beer_Selection__c: null, L3M_Billed_Liquids__c: null, Name: "11728 Sri Balaji Bar & Restaurant", Account_Status__c: "Active"},
// Actual_End_Visit__c: null,
// Actual_Start_Visit__c: null,
// App_Id__c: "Sat Oct 24 2020-0015D00000cU72jQAC-Pre-Installation",
// Check_In__Latitude__s: null,
// Check_In__Longitude__s: null,
// Completed__c: false,
// Draft_Installation__c: "a0j1s000000HwzhAAC",
// Draft_Installation__r: {Recommended_Machine_Type_Sales__c: "R 60/ HE 90/ Tip Tap (2)/ Beer Cooler/ Counter Top 17L and 50 L (2)/ Event Cooler (2)", Recommended_Tower_Type_Sales__c: "2 Way Smash/2 Way shield with faucet / 2 way shiel…ck font / 2 way flute / 2 way Lucky / 2 way snake", Display_Machine_Id__c: "DR-22342", Over_the_counter_space_required__c: "1x1x1.5"}
// }

let kycDetail = {
    
}
let selectOptions = new Map([
    ['Recommended_Machine_type__c' ,['Mini Lady','R 60','HE 120 Two Way','HE 90','Tip Tap','Beer Cooler','Counter Top 17 L and 50 L','Event Cooler','HE 120 Four Way']],
    ['Recommended_Tower_Type__c' ,['1 Way Shield Tower','2 Way Smash','4 way Falcon Tower with Faucets','2 Way Shield with faucet','2 Way Shield with Black Font','2 Way Flute','2 Way Lucky','2 Way Snake','4 Way Falcon with Debi Tap','4 way falcon tower']],
    ['Location_of_Draft_machine__c',['Bar Counter','Separate Table','Others	']]
]);

let setOfSummaryClass = new Set();
let setOfMachineType = new Set();
let setOfTowerType = new Set();
let overTheCounter;
let underTheCounter;
let draftLocation;

initializePreInstalltion = () =>{
    createPreInstalltionSection();
    creatKYCSection();
    if(isReadOnly){
        $('#TIN').attr('disabled',true);
        $('#PAN').attr('disabled',true);
    }

    
}

const getAllPreFilledVal = (event) =>{
    if(event.Draft_Installation__r.Recommended_Machine_Type_Sales__c)
    {
        let machineType = event.Draft_Installation__r.Recommended_Machine_Type_Sales__c.split('/');
        for(let i=0;i<machineType.length;i++)
        {
            setOfMachineType.add(machineType[i].trim());
        }
    }

    if(event.Draft_Installation__r.Recommended_Tower_Type_Sales__c)
    {
        
        let towerType = event.Draft_Installation__r.Recommended_Tower_Type_Sales__c.split('/');
        for(let i=0;i<towerType.length;i++)
        {
            setOfTowerType.add(towerType[i].trim());
        }
    }

    if(event.Draft_Installation__r.Over_the_counter_space_required__c){
        overTheCounter = event.Draft_Installation__r.Over_the_counter_space_required__c;
    }
    if(event.Draft_Installation__r.Under_the_counter_space_required__c){
        underTheCounter = event.Draft_Installation__r.Under_the_counter_space_required__c;
    }
    
    if(event.Draft_Installation__r.Location_of_Draft_machine__c){
        draftLocation = event.Draft_Installation__r.Location_of_Draft_machine__c;
    }
}

const createPreInstalltionSection = () =>{
    $('#preInstall').html('');
    let tmp = `
        <h4>Draft Sign-Up</h4>
        <div class="row">
            <div class="col-xs-5 label-margin">Machine Id</div>
            <div class="col-xs-7 no-padd">${createInputField('Display_Machine_Id__c',null,'text',true)}</div>
            
        </div>
        <div class="row">
            <div class="col-xs-5 label-margin">Machine Type</div>
            <div class="col-xs-5 no-padd">${createTextArea('Recommended_Machine_Type_Sales__c',null,'text',true)}</div>
            <div class="col-xs-2"><div class="edit" onclick="openModalPopUp(this)" data-name="Machine-Type"><i class="far fa-edit"></i></div></div>
        </div>
        <div class="row">
            <div class="col-xs-5 label-margin">Tower Type</div>
            <div class="col-xs-5 no-padd">${createTextArea('Recommended_Tower_Type_Sales__c',null,'text',true)}</div>
            <div class="col-xs-2"><div class="edit"  onclick="openModalPopUp(this)" data-name="Tower-Type"><i class="far fa-edit"></i></div></div>
        </div>
       
        <div class="row">
            <div class="col-xs-5 label-margin">Over the Counter Space Required</div>
            <div class="col-xs-5 no-padd">${createInputField('Over_the_counter_space_required__c',null,'text',isReadOnly)}</div>
            <div class="col-xs-2">${createImageCapture('Over_the_counter_space_required_File',draftPreInstallation['Over_the_counter_space_required_File'],isReadOnly)}</div>
        </div>
        <div class="row">
            <div class="col-xs-5 label-margin">Under the Counter Space Required</div>
            <div class="col-xs-5 no-padd">${createInputField('Under_the_counter_space_required__c',null,'text',isReadOnly)}</div>
            <div class="col-xs-2">${createImageCapture('Under_the_counter_space_required_File',draftPreInstallation['Under_the_counter_space_required_File'],isReadOnly)}</div>
        </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Location of Machine</div>
            <div class="col-xs-6">${createSelectOption('Location_of_Draft_machine__c',null,selectOptions.get('Location_of_Draft_machine__c'),isReadOnly)}</div>
            
        </div>
        <div class="row">
            <div class="col-xs-6 label-margin">Reason for Change</div>
            <div class="col-xs-6">${createTextArea('Reason_for_Change__c',draftPreInstallation['Reason_for_Change__c'],isReadOnly)}</div>
        </div>
        <div class="row">
            <div class="col-xs-8">Confirmed with the Outlet Owner for Installation</div>
            <div class="col-xs-4">${createToggleField('Confirmed_with_the_outlet_owner_for_inst__c',draftPreInstallation['Confirmed_with_the_outlet_owner_for_inst__c'],isReadOnly)}</div>
        </div>
        <div class="row">
            <div class="col-xs-12"><h4 class="draft">Pre Installation Form</h4></div>
        </div>
    `;

    tmp += createItemsWithQuantity(preInstallationForm);
    
    showSummarySection(preInstallationForm);
    $('#preInstall').append(tmp);
};



const createItemsWithQuantity = (itemList) =>{
    let item = '';

    for(let i of itemList){
        item +=`
        <div class="showFormDetail">
            <div class="row">
                <div class="col-xs-8"><h5>${i.type}</h5></div>
                <div class="col-xs-4">${createToggleField(`${i.typeId}`,draftPreInstallation[i.typeId],isReadOnly)}</div>
            </div>
        `;
        let ctr = 0;
        for(let j of i.items){
            item +=`
            <div class="row ${i.typeId}" style="margin-bottom:10px; ${draftPreInstallation[i.typeId] ? 'display: block' :'display: none'}">
                <div class="col-xs-7">${j.ProductName}</div>
                <div class="col-xs-5">${createQuantityInput(`${i.typeId}-${ctr}`,`${j.Quantity__c}`,isReadOnly)}</div>
            </div>
        `;
        ctr++;
        }

        item += '</div>';
    }

    return item;
};


const openModalPopUp = (ele) =>{
    let name = $(ele).attr('data-name');
    if(isReadOnly === true){
        ele.preventDefault();
    }
    if(name === 'Machine-Type')
    {
        $('#editModal .modal-title').html('');
        $('#editModal .modal-title').append('Machine Type');
        $('#editModal .modal-body').html('');
        let tmp = createSelectOption('Recommended_Machine_type__c',null,selectOptions.get('Recommended_Machine_type__c'),false)
        $('#editModal .modal-body').append(tmp);
    }else{
        $('#editModal .modal-title').html('');
        $('#editModal .modal-title').append('Tower Type');
        $('#editModal .modal-body').html('');
        let tmp = createSelectOption('Recommended_Tower_Type__c',null,selectOptions.get('Recommended_Tower_Type__c'),false)
        $('#editModal .modal-body').append(tmp);
    }

    $('#editModal').modal('show');
}


const showSummarySection = (itemList) =>{
    let tmp = ``;
    $('#preInstallSummary').html('');
  
    for(let i of itemList){
      tmp +=`
      <div class="showSummary">
          <div class="row ${i.typeId}" style="${draftPreInstallation[i.typeId] ? 'display: block' :'display: none'}">
              <div class="col-xs-8"><h5>${i.type}</h5></div>
              </div>
      `;

      for(let j of i.items){
          if(j.Quantity__c > 0){
              setOfSummaryClass.add(i.typeId);
          tmp +=`
          <div class="row ${i.typeId}" style="margin-bottom:10px; display : none">
              <div class="col-xs-7" style="color:dodgerblue">${j.ProductName}</div>
              <div class="col-xs-5 text-center">${j.Quantity__c}</div>
          </div>
          `;
        }
      }

      tmp += '</div>';
  }

    $('#preInstallSummary').append(tmp);

    for(let i of setOfSummaryClass){
        $(`.${i}`).css('display','block');
    }
}


const creatKYCSection = () =>{
    if(kycDetail!==null){
        $('.kyc').css('display','block');
    }
    for(let i in kycDetail){
        if(i === 'PAN' || i === 'TIN'){
            $(`.${i}`).css('display','block');
        }
    }
}



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
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)"  ${disabled ? 'disabled' : ''}>
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
    
    tmp = `
        <div class="form-group">
            <textarea class="form-control"  ${disabled ? 'readonly' : ''} id="${id}" value="${value ? value : ''}">${value ? value : ''}</textarea>
        </div>
        `;
    return tmp;
};


const createQuantityInput = (id,value,disabled) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" data-name="${id}" ${disabled ? 'disabled' : ''} type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="${id}" name="qty" ${disabled ? 'disabled' : ''} class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" data-name="${id}" onclick="incrementQtn(this)" ${disabled ? 'disabled' : ''} type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};

const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).prop('checked');
    draftPreInstallation[id] = value;
    if(value){
        $(`.${id}`).css('display','block');
    }else{
        $(`.${id}`).css('display','none');
        
        if(setOfSummaryClass.has(id)){
            setOfSummaryClass.delete(id);
        }
        for(let i of preInstallationForm){
            if(i.typeId===id){
                for(let j=0;j< i.items.length;j++)
                {
                    i.items[j].Quantity__c = 0;
                    $(`#${id}-${j}`).val(0);
                }
            }
        }
    }
     showSummarySection(preInstallationForm);
};

incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let id = $(ele).attr('data-name');
      let fieldName = id.split('-')[0];
      let index = id.split('-')[1];
      
      let value = 0;
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      $n.val(value);
      for(let i of preInstallationForm){
          if(i.typeId===fieldName){
              i.items[index].Quantity__c = value;
              break;
          }
      }
      showSummarySection(preInstallationForm);
     };
  
  
  decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      
      let id = $(ele).attr('data-name');
      let fieldName = id.split('-')[0];
      let index = id.split('-')[1];
      
      let value = 0;
      
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    $n.val(value);
    for(let i of preInstallationForm){
        if(i.typeId===fieldName){
            i.items[index].Quantity__c = value;
            break;
        }
    }
    showSummarySection(preInstallationForm);
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    let fieldName = inputName.split('-')[0];
    let index = inputName.split('-')[1];
   
    if(val<0){
      $(ele).val(0);
      return;
    }
    if(val >999){
      $(ele).val(999);
    
      return;
    }

    for(let i of preInstallationForm){
        if(i.typeId===fieldName){
            i.items[index].Quantity__c = val;
            break;
        }
    }
    
   showSummarySection(preInstallationForm);
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
    draftPreInstallation[key] =  await toBase64(fileInput);
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
    
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
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


const handleSelectChange = (ele) => {
    const value = $(ele).val();
    let id = $(ele).attr('id');
    // draftPreInstallation[$(ele).attr('id')] = value;
    
    // if(overTheTableMap.has(value)){
    //     $('#Over_the_counter_space_required__c').val(overTheTableMap.get(value));
    // }
    // if(underTheTableMap.has(value)){
    //     $('#Under_the_counter_space_required__c').val(underTheTableMap.get(value));
    // }
};

const handleTypeChange = (ele) =>{
    let id = $(ele).parent().parent().find('select').attr('id');
    let value = $(ele).parent().parent().find('select').val();

    draftPreInstallation[$(ele).attr('id')] = value;
    
    if(overTheTableMap.has(value)){
        $('#Over_the_counter_space_required__c').val(overTheTableMap.get(value));
    }
    if(underTheTableMap.has(value)){
        $('#Under_the_counter_space_required__c').val(underTheTableMap.get(value));
    }
    
    if(id === 'Recommended_Machine_type__c' && value)
    {
        $('#Recommended_Machine_Type_Sales__c').val(value);
        $('#editModal').modal('hide');
    }

    if(id === 'Recommended_Tower_Type__c' && value)
    {
        $('#Recommended_Tower_Type_Sales__c').val(value);
        $('#editModal').modal('hide');
    }
}


const handleValidation = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).val();
    
    if(id === 'PAN' && value){
        var regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;    
        if(!regex.test(value)){      
            $('.panReq').css('display','block');
        }
        else{
            $('.panReq').css('display','none');
        }
    }else if(id === 'PAN' && !value){
        $('.panReq').css('display','none');
    }


    if(id === 'TIN' && value){
        var regex = /[0-9]{11}$/;    
    
        if(!regex.test(value)){
            $('.tinReq').css('display','block');
        }else{
            $('.tinReq').css('display','none');
        }
    }
    else if(id === 'TIN' && !value){
        $('.tinReq').css('display','none');
    }
}

const submitPreInstallationHandler = () =>{
    let isValid = true;
    let machineTypeVal = $('#Recommended_Machine_Type_Sales__c').val();
    let towerTypeVal = $('#Recommended_Tower_Type_Sales__c').val();
    let overTheCounterVal = $('#Over_the_counter_space_required__c').val();
    let underTheCounterVal = $('#Under_the_counter_space_required__c').val();
    let draftLocationVal = $('#Location_of_Draft_machine__c').val() ?$('#Location_of_Draft_machine__c').val() : null ;
    let reasonForChange = $('#Reason_for_Change__c').val().trim();
    let ConfirmedWithOutlet = $('#Confirmed_with_the_outlet_owner_for_inst__c').prop('checked');
    // if(machineTypeVal.split('/').length>1 || !towerTypeVal.split('/').length>1 ){
    //     showNotification({message : 'Please select Machine and Tower type in order to proceed!'});
    //     return;
    // }
    if(machineTypeVal && !(machineTypeVal.split('/').length>1) && !setOfMachineType.has(machineTypeVal)){
        isValid = false
    }
    
    if(towerTypeVal && !(towerTypeVal.split('/').length>1) && !setOfTowerType.has(towerTypeVal)){
        isValid = false
    }
    
    if(eventTaggedDraftInstallation.Over_the_counter_space_required__c !== overTheCounterVal && overTheCounterVal){
        isValid = false
    }
    
    if(eventTaggedDraftInstallation.Under_the_counter_space_required__c !== underTheCounterVal && underTheCounterVal){
        isValid = false
    }
    
    if(eventTaggedDraftInstallation.Location_of_Draft_machine__c !== draftLocationVal){
        isValid = false
    }

    if(eventTaggedDraftInstallation.Confirmed_with_the_outlet_owner_for_inst__c !== ConfirmedWithOutlet){
        isValid = false
    }

    if(!isValid && !reasonForChange){
        showNotification({message : 'Reason for change is required'});
    }else{
        submitDraftPreInstallation(isValid);
    }

}

// initializePreInstalltion();