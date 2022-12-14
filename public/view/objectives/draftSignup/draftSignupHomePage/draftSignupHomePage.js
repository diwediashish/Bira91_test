
const mapOfRequisitionFieldLabel = new Map([
    ['Number__c','Number of Taps Required'],
    ['Estimated_Monthly_Draft_Volume_20_L_Keg__c','Estimated Monthly Draft Volume'],
    ['Reason_for_asking_more_taps__c','Reason For Asking More Taps'],
    ['Outlet_requires_B9_machine__c','Does Outlet Require B9 Machine'],
    ['Outlet_requires_B9_taps__c','Does Outlet Require B9 Taps'],
    ['Does_Outlet_Need_Mobile_Troley__c','Does Outlet Need Mobile Troley'],
    ['Recommended_Machine_Type_Sales__c','Recommended Machine Type'],
    ['Recommended_Tower_Type_Sales__c','Recommended Tower Type'],
    ['Over_The_Counter_Space_Required__c','Over The Counter Space Required'],
    ['Under_The_Counter_Space_Required__c','Under The Counter Space Required'],
    ['Location_of_Draft_Machine__c','Location of Draft Machine'],
    ['Confirmed_with_the_outlet_owner_for_inst__c','Confirmed With the Outlet Owner for Installation'],

    ['Installation_Date__c','Installation Date'],
    ['Pullout_Date__c','Pullout Date'],
    ['Type_of_Event__c','Type Of Event'],
    ['Number_Of_Attendees__c','Number Of Attendees'],
    ['Custom_Bar_Required__c','Custom Bar Required'],
    ['Size_of_Bar_in_sq_feet__c','Size Of Bar (in Sq. Feet)'],
    ['Number_of_machines_required__c','Number Of Machine Required'],
    ['Estimated_Draft_Volume__c','Estimated Monthly Draft Volume'],
    ['Recommended_Machine_Type_Sales__c','Recommended Machine Type'],
    ['Recommended_Tower_Type_Sales__c','Recommended Tower Type'],
    ['Confirmed_with_the_event_head_for_instal__c','Confirmed With the Event Head for Installation'],
    ['Location_Of_Draft_Machine_Others__c','In case of Others Please mention']
]);



const selectOptions = new Map([
    ['Reason_for_asking_more_taps__c',['Image-led','Beer-led outlet','High potential to grow','Outlet wants wide variety','New outlet']],
    ['Over_The_Counter_Space_Required__c',['Available','Not Available']],
    ['Under_The_Counter_Space_Required__c',['Available','Not Available']],
    ['Type_of_Event__c',['Beer Led','Music Led','Food Led','Community Led','Shopping Festival','Family Function','Others']],
    ['Number__c',['1','2','4']],
    ['Location_of_Draft_Machine__c',['Bar Counter','Separate Table','Others']]
]);

const selectOptionsDisplay = new Map([
    ['Number__c',['1 tap','2 tap' , '4 tap']]
]);
// draftSignUpReq ={Type_of_Requisiton__c : false,Outlet_requires_B9_machine__c:'No',Outlet_requires_B9_taps__c : 'No'}
initializeDraftHomePage = () =>{
    let tmp = `
        <div class="row">
            <div class="col-xs-7">
                <label>Temporary Installation</label>
            </div>
            <div class="col-xs-5">
            ${createToggleField('Temporary_Requisition__c',draftSignUpReq['Type_of_Requisiton__c']==='Temporary')}
            </div>
        </div>
    `;

    $('#temp-Req').append(tmp);

    if($('#Temporary_Requisition__c').prop('checked')){
        createTemporaryReq();
    }
   else{
    createPermanentReq();
   }

   if(isReadOnly){
        disabledFields();
   }
   if(accountRec.Beacon_Flag__c){
    $('#Number__c').val('4');
    $('#Number__c').prop('disabled','true');
   }
   
    $('#Number__c').prop('disabled','true');
}


let Liquid_Type__c = {
    
};

const createPermanentReq = () =>{
    let signUpFields = ['Liquid_Type__c','Number__c', 'Estimated_Monthly_Draft_Volume_20_L_Keg__c',
        'Outlet_requires_B9_machine__c','Outlet_requires_B9_taps__c', 'Does_Outlet_Need_Mobile_Troley__c', 'Recommended_Machine_Type_Sales__c',
        'Recommended_Tower_Type_Sales__c', 'Over_The_Counter_Space_Required__c', 'Under_The_Counter_Space_Required__c',
        'Location_of_Draft_Machine__c', 'Confirmed_with_the_outlet_owner_for_inst__c','Reason_for_asking_more_taps__c'];
    
    let tmp = '';
    $('#draft-signUp').html('');
    for(let i of signUpFields){

        if(i !== 'Liquid_Type__c' &&i !== 'Over_The_Counter_Space_Required__c' && i !== 'Under_The_Counter_Space_Required__c'){
            tmp +=`
            <div class="row ${i}-rowDiv ${i==='Recommended_Machine_Type_Sales__c' ? 'show-Outlet_requires_B9_machine__c' : i==='Recommended_Tower_Type_Sales__c' ? 'show-Outlet_requires_B9_taps__c' : ''}"
            ${(i==='Recommended_Machine_Type_Sales__c' && draftSignUpReq['Outlet_requires_B9_machine__c'] === 'No' ? 'style="display:none"' : '')}
            ${(i==='Recommended_Tower_Type_Sales__c' && draftSignUpReq['Outlet_requires_B9_taps__c'] === 'No' ? 'style="display:none"' : '')}
            >

                <div class="${i==='Confirmed_with_the_outlet_owner_for_inst__c' ? 'col-xs-7' : 'col-xs-6'}">
                    ${mapOfRequisitionFieldLabel.get(i)}
                </div>
                <div class="${i==='Confirmed_with_the_outlet_owner_for_inst__c' ? 'col-xs-5' : 'col-xs-6'}">
                    ${
                        ( i === 'Recommended_Machine_Type_Sales__c' || i === 'Recommended_Tower_Type_Sales__c') ?
                        createTextArea(i,draftSignUpReq[i] ? draftSignUpReq[i] : null) : 
                        (i === 'Does_Outlet_Need_Mobile_Troley__c' || i === 'Outlet_requires_B9_machine__c' || i === 'Outlet_requires_B9_taps__c') ?
                        createRadioField(i,draftSignUpReq[i] ?draftSignUpReq[i] : null ) :
                        (i === 'Estimated_Monthly_Draft_Volume_20_L_Keg__c') ? createQuantityInput(i,draftSignUpReq[i] ?draftSignUpReq[i] : 0 ) :
                        // (i === 'Location_of_Draft_Machine__c') ? createTextArea(i,draftSignUpReq[i] ? draftSignUpReq[i] : null) :
                        
                        (i === 'Number__c' ||i === 'Reason_for_asking_more_taps__c' || i === 'Location_of_Draft_Machine__c') ? createSelectOption(i,draftSignUpReq[i] ? draftSignUpReq[i] :null,selectOptions.get(i),(selectOptionsDisplay.has(i) ? selectOptionsDisplay.get(i) : selectOptions.get(i))) :
                        createToggleField(i,draftSignUpReq[i]?draftSignUpReq[i] : null)
                    }
                </div>
            </div>
        `
        }else if(i === 'Liquid_Type__c')
        {
            tmp += createLiquidType(Liquid_Type__c);
        }
        else{
            tmp += `
                <div class="row ${i==='Under_The_Counter_Space_Required__c' ? 'show-Outlet_requires_B9_machine__c' : 'show-Outlet_requires_B9_taps__c'}"
                ${(i==='Under_The_Counter_Space_Required__c' && draftSignUpReq['Outlet_requires_B9_machine__c'] === 'No' ? 'style="display:none"' : '')}
                ${(i==='Over_The_Counter_Space_Required__c' && draftSignUpReq['Outlet_requires_B9_taps__c'] === 'No' ? 'style="display:none"' : '')} 
                >
                    <div class="col-xs-3">${mapOfRequisitionFieldLabel.get(i)}</div>
                    <div class="col-xs-3 no-padd" style="margin-top: 20px;">
                        ${createInputField(i,draftSignUpReq[i] ? draftSignUpReq[i] : null,(i==='Under_The_Counter_Space_Required__c' ||i==='Over_The_Counter_Space_Required__c' ? true : false ))}
                    </div>
                    <div class="col-xs-4 no-padd" style="margin-top: 20px;">
                        ${createSelectOption((i==='Under_The_Counter_Space_Required__c' ? 'Under_the_counter_space_available_2__c' : (i==='Over_The_Counter_Space_Required__c' ? 'Over_the_counter_space_available__c' : i)  ),draftSignUpReq[(i==='Under_The_Counter_Space_Required__c' ? 'Under_the_counter_space_available_2__c' : (i==='Over_The_Counter_Space_Required__c' ? 'Over_the_counter_space_available__c' : i)  )] ? draftSignUpReq[(i==='Under_The_Counter_Space_Required__c' ? 'Under_the_counter_space_available_2__c' : (i==='Over_The_Counter_Space_Required__c' ? 'Over_the_counter_space_available__c' : i)  )] : null,selectOptions.get(i),(selectOptionsDisplay.has(i) ? selectOptionsDisplay.get(i) : selectOptions.get(i)))}
                    </div>
                    <div class="col-xs-2" style="margin-top: 20px;">
                        ${createImageCapture((i==='Under_The_Counter_Space_Required__c' ? 'Under_the_counter_space_available_File' : (i==='Over_The_Counter_Space_Required__c' ? 'Over_the_counter_space_available_File' : i)  ),(i==='Under_The_Counter_Space_Required__c' ? draftSignUpReq['Under_the_counter_space_available_File'] : (i==='Over_The_Counter_Space_Required__c' ? draftSignUpReq['Over_the_counter_space_available_File'] : null)  ))}
                    </div>
                </div>
            
            `;
        }
    }

    $('#draft-signUp').append(tmp);
    if(!draftSignUpReq['Reason_for_asking_more_taps__c']){
        $('.Reason_for_asking_more_taps__c-rowDiv').css('display','none');
    }
    else{
        $('.Reason_for_asking_more_taps__c-rowDiv').css('display','block');
    }

    $('#Under_the_counter_space_available_2__c').val('Available');
    $('#Over_the_counter_space_available__c').val('Available');
    locationForOthersCheck();
    hideFieldPostFormGeneration();
};


const createTemporaryReq = () =>{
    let tempReqFields = ['Installation_Date__c','Pullout_Date__c','Type_of_Event__c','Number_Of_Attendees__c',
                        'Custom_Bar_Required__c','Size_of_Bar_in_sq_feet__c','Number_of_machines_required__c',
                        'Does_Outlet_Need_Mobile_Troley__c', 'Estimated_Monthly_Draft_Volume_20_L_Keg__c','Liquid_Type__c','Number__c',
                        'Recommended_Machine_Type_Sales__c','Recommended_Tower_Type_Sales__c','Confirmed_with_the_event_head_for_instal__c'];

    $('#draft-signUp').html('');
    let tmp = '';
    for(let i of tempReqFields){
        
        if(i !== 'Liquid_Type__c' && i !== 'Custom_Bar_Required__c' && i !== 'Does_Outlet_Need_Mobile_Troley__c'){
            tmp +=`
                <div class="row">
                    <div class="${i ==='Confirmed_with_the_event_head_for_instal__c' ? 'col-xs-7':'col-xs-6'}">
                        ${mapOfRequisitionFieldLabel.get(i)}
                    </div>
                    <div class="${i ==='Confirmed_with_the_event_head_for_instal__c' ? 'col-xs-5':'col-xs-6'}">
                        ${
                            (i === 'Installation_Date__c' || i === 'Pullout_Date__c') ? 
                            createDateTimeField(i,draftSignUpReq[i] ? new Date(draftSignUpReq[i]).toISOString().substring(0, 10) : '') : 
                            ((i === 'Type_of_Event__c') ? createSelectOption(i,draftSignUpReq[i] ?draftSignUpReq[i] :   null,selectOptions.get(i),(selectOptionsDisplay.has(i) ? selectOptionsDisplay.get(i) : selectOptions.get(i))) :
                            (i === 'Number_Of_Attendees__c' || i === 'Size_of_Bar_in_sq_feet__c' || i === 'Number_of_machines_required__c' || i === 'Estimated_Monthly_Draft_Volume_20_L_Keg__c') ? 
                            createQuantityInput(i,draftSignUpReq[i] ?draftSignUpReq[i] :   0) : (i === 'Number__c'  ? createSelectOption(i,draftSignUpReq[i] ?draftSignUpReq[i] :   null,selectOptions.get(i),(selectOptionsDisplay.has(i) ? selectOptionsDisplay.get(i) : selectOptions.get(i))) :( i === 'Recommended_Machine_Type_Sales__c' || i === 'Recommended_Tower_Type_Sales__c') ?
                            createTextArea(i,draftSignUpReq[i] ?draftSignUpReq[i] :   null,(( i === 'Recommended_Machine_Type_Sales__c' || i === 'Recommended_Tower_Type_Sales__c') ? true:false)) : 
                            createToggleField(i,draftSignUpReq[i] ?draftSignUpReq[i] :   null)) )
                            
                        }
                    </div>
                </div>
            `
        }else if(i === 'Liquid_Type__c')
        {
            tmp += createLiquidType(Liquid_Type__c);
        }else{
            const quantityField = i==='Does_Outlet_Need_Mobile_Troley__c' ? 'Mobile_Trolley_Quantity__c' : 'Custom_Bar_Quantity__c';
            tmp +=`
                <div class="row">
                    <div class="col-xs-4">
                        ${mapOfRequisitionFieldLabel.get(i)}
                    </div>
                    <div class="col-xs-3">
                        ${createToggleField(i,draftSignUpReq[i] ?draftSignUpReq[i] :   null)}
                    </div>
                    <div class="col-xs-5 ${quantityField}" ${draftSignUpReq[i] ?'style="display: block; margin-top: 10px"' : 'style="display: none; margin-top: 10px"' }>${createQuantityInput(quantityField,draftSignUpReq[quantityField] ?draftSignUpReq[quantityField] :   0)}</div>
                
                </div>
            `;
        }
    }

    $('#draft-signUp').append(tmp);
   
};

const createLiquidType = (liquidTypes ) =>{
    let selectedLiquids =new Set( draftSignUpReq['Active_Liquids__c'] ? draftSignUpReq['Active_Liquids__c'].split(';') : null);
    let liq = '<div class="row text-center">';
    for(let i in liquidTypes){
        liq += `<button onClick="handleLiquidType(this)" data-name="${i}" class="btn-custom btn-secondary btn ${selectedLiquids.has(i) ? 'btn-selected' : ''}">${i}</button>`;
    }
    liq +='</div>'

    return liq;
}

const createRadioField = (id,value) =>{
    
    let tmp = `
            <div class="radio-group">
                <input type="radio" onchange="handleRadioBtn(this)" id="${id}-yes" ${value === 'Yes' ? 'checked' : ''} value="Yes" name="${id}">
                <label for="${id}-yes">Yes</label>
                <input type="radio" onchange="handleRadioBtn(this)" id="${id}-no" ${value === 'No' ? 'checked' : ''} value="No" name="${id}">
                <label for="${id}-no">No</label>
            </div>    
    `;

    return tmp;
}


const createInputField = (id,value,isReadOnly) =>{
    let tmp = '';
    if(id === 'Recommended_Tower_Type_Sales__c' || id === 'Recommended_Machine_Type_Sales__c')
    {
        tmp = `
        <div class="form-group">
            <textarea class="form-control" ${isReadOnly ? 'disabled' : ''} id="${id}" value="${value ? value : ''}">${value ? value : ''}</textarea>
        </div>`;
    }else{
        
        tmp = `
        <div class="form-group">
            <input class="form-control" ${isReadOnly ? 'disabled' : ''} id="${id}" value="${value ? value : ''}"/>
        </div>`;
    }    
    return tmp;
};



const createDateTimeField = (id,value) =>{

    let tmp = '';
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    if(dd<10){
    dd='0'+dd
    } 
    if(mm<10){
    mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
        tmp = `
        <div class="form-group">
            <input type='date' data-date="" min=${today} data-date-format="DD/MM/YYYY" class="form-control date-value" onchange="handleDateTimeField(this)" id="${id}" value="${value ? value : ''}"/>
    </div>
        `;

    return tmp;
};


const createToggleField = (id,value) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round ${id === 'Confirmed_with_the_outlet_owner_for_inst__c' || id === 'Confirmed_with_the_event_head_for_instal__c' ? 'confirmedCheck' : ''}"></span>
        </label>
        `;
    
    return tmp;
};




const createImageCapture = (id,value) =>{

    let tmp = '';

        tmp = `
        <div class="image-upload_NoInput form-group" >
            <div class="camera">
                <label for="${id}">
                    <i class="fa fa-camera ${id}" ${value ? 'style="color:#5cb85c"' : ''} aria-hidden="true"></i>                                    
                </label>
                <input id="${id}" onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div> `;
    return tmp;
};


const createTextArea = (id,value) =>{

    let rows = ((id === 'Recommended_Machine_Type_Sales__c' || id === 'Recommended_Tower_Type_Sales__c') && value) ? value.split('/').length : '3';

    let tmp = '';
    
    tmp = `
    ${id === 'Location_Of_Draft_Machine_Others__c' ? '<div class="col-xs-8"><label>In case of Others Please mention</label></div>' : ''}
            
        <div class="form-group">
            <textarea rows=${rows > 2 ? rows : '3'} onkeyup="handleInputChange(this)" ${id === 'Recommended_Machine_Type_Sales__c' || id === 'Recommended_Tower_Type_Sales__c' ? 'disabled' : ''}  class="form-control" id="${id}" value="${value ? value : ''}">${value ? value : ''}</textarea>
        </div>
        `;
    return tmp;
};

const createSelectOption = (id,value,options,displayOptions) =>{
    
    let tmp =`
       <div class="form-group">
        <select class="form-control" id="${id}" onchange="handleSelectOptionChange(this)" >
            <option value="">--None--</option>
    `;

    for(let i = 0;i<options.length;i++){
        tmp +=`
        <option value="${options[i]}" ${options[i] === value ? 'selected' : ''}>${displayOptions[i]}</option>
        `;
    }

    tmp += '</select></div>';

    return tmp;
};

const createQuantityInput = (id,value) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="${id}" name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};

const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).prop('checked');


    if(value && (id === 'Custom_Bar_Required__c' || id === 'Does_Outlet_Need_Mobile_Troley__c')){
        const quantityField = id==='Does_Outlet_Need_Mobile_Troley__c' ? 'Mobile_Trolley_Quantity__c' : 'Custom_Bar_Quantity__c';
        $(`.${quantityField}`).css('display','block');
    }else if(id === 'Custom_Bar_Required__c' || id === 'Does_Outlet_Need_Mobile_Troley__c'){
        const quantityField = id==='Does_Outlet_Need_Mobile_Troley__c' ? 'Mobile_Trolley_Quantity__c' : 'Custom_Bar_Quantity__c';
        $(`.${quantityField}`).css('display','none');
    }

    if(value && id === 'Temporary_Requisition__c'){
        for(let i in draftSignUpReq){
            delete draftSignUpReq[i];
        }
        createTemporaryReq();
        callDateTimePicker();
        
        draftSignUpReq['Type_of_Requisiton__c'] ='Temporary';
        $('.btn-custom').removeClass('btn-selected');
        $('#Number__c').prop('disabled','true');
    }else if(id === 'Temporary_Requisition__c'){
        for(let i in draftSignUpReq){
            delete draftSignUpReq[i];
        }
        createPermanentReq();
        
        draftSignUpReq['Type_of_Requisiton__c'] ='Permanent';
        $('#Outlet_requires_B9_machine__c-yes').prop('checked',true);
        draftSignUpReq['Outlet_requires_B9_machine__c'] = 'Yes';
        $('#Outlet_requires_B9_taps__c-yes').prop('checked',true);
        draftSignUpReq['Outlet_requires_B9_taps__c'] = 'Yes';
        if(accountRec.Beacon_Flag__c){
            $('#Number__c').val('4');
            $('#Number__c').prop('disabled','true');
        }   
        $('#Number__c').prop('disabled','true');
        $('.btn-custom').removeClass('btn-selected');
    }
    else if(id === 'Does_Outlet_Need_Mobile_Troley__c'){
        draftSignUpReq['Does_Outlet_Need_Mobile_Troley__c'] =value ? 'Yes' : 'No';
    }
    else{
        draftSignUpReq[id] = value;
    }
    
};


const handleLiquidType = (ele) =>{
    if(!draftSignUpReq.Active_Liquids__c){
        draftSignUpReq.Active_Liquids__c = null;
    }
    let temp = draftSignUpReq.Active_Liquids__c ? draftSignUpReq.Active_Liquids__c.split(';') : [];
    
    if(temp.indexOf($(ele).attr('data-name'))>-1){
        temp.splice(temp.indexOf($(ele).attr('data-name')),1); 
    }
    else{
        temp.push($(ele).attr('data-name')); 
    }
    if(!$(ele).hasClass('btn-selected')){
        $(ele).addClass('btn-selected')
    }else{
        $(ele).removeClass('btn-selected')
    }
    draftSignUpReq.Active_Liquids__c = temp.join(';');
    setLiquidToTapMapping(temp.length);
};

const handleRadioBtn = (ele) =>{
    draftSignUpReq[$(ele).attr('id').split('-')[0]] = $(ele).val();
    if($(ele).attr('id').split('-')[0]==='Outlet_requires_B9_machine__c' ||($(ele).attr('id').split('-')[0]==='Outlet_requires_B9_taps__c' )){
        machineTypeRecomendation();
        towerRecomendation();
    }

    let id = $(ele).attr('id').split('-')[0];
    let value = $(ele).val();
    if(id === 'Outlet_requires_B9_machine__c' || id === 'Outlet_requires_B9_taps__c')
    {
        value === 'Yes' ? $(`.show-${id}`).css('display','block') : $(`.show-${id}`).css('display','none');
        if(value === 'Yes'){
            $(`.show-${id} select`).val('Available');
        }else{
           let selectedVal = $(`.show-${id} select`).attr('id');
           $(`.show-${id} select`).val('');
          // console.log(selectedVal)
           draftSignUpReq[selectedVal] = '';
         //  console.log(draftSignUpReq)
        }
    }
}

incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $($n).attr("id");
      var qty = Number($n.val());
    //   if (qty > 999) {
    //     value = 999;
       
    //   }
    //   else{
        value = Number($n.val()) + 1;
        
    //  }
      

      draftSignUpReq[inputName] = value;
    if(inputName === 'Estimated_Monthly_Draft_Volume_20_L_Keg__c')
        machineTypeRecomendation(draftSignUpReq['Number__c'],parseFloat(draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']));
      $n.val(value);
     };
  
  
  decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $($n).attr("id");
      
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    draftSignUpReq[inputName] = value;
    if(inputName === 'Estimated_Monthly_Draft_Volume_20_L_Keg__c')
        machineTypeRecomendation(draftSignUpReq['Number__c'],parseFloat(draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']));
    $n.val(value);
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    
    if(val<0){
      $(ele).val(0);
      val = 0;
    }
    // if(val >999){
    //   $(ele).val(999);
    //   val = 999;
      
    // }
    draftSignUpReq[inputName] = val;
    if(inputName === 'Estimated_Monthly_Draft_Volume_20_L_Keg__c')
        machineTypeRecomendation(draftSignUpReq['Number__c'],parseFloat(draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']));
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
    draftSignUpReq [key] =  await toBase64(fileInput);
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
  };

  
  
const callDateTimePicker = () =>{
    
    $(".datetimepicker1").datetimepicker({
        format : 'DD-MMM-YYYY hh:mm:ss',
        defaultDate: new Date()
    });

}

const handleSelectOptionChange = (ele) => {
    const value =  $(ele).val();
    
    draftSignUpReq[$(ele).attr('id')] =value;
    if($(ele).attr('id')==='Number__c'){
        towerRecomendation(draftSignUpReq[$(ele).attr('id')]);
        machineTypeRecomendation(draftSignUpReq[$(ele).attr('id')],draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']);
    }
    if($(ele).attr('id')==='Under_the_counter_space_available_2__c' ||$(ele).attr('id')==='Over_the_counter_space_available__c' ){
        if($(ele).attr('id')==='Under_the_counter_space_available_2__c'&&value==='Available'&&!draftSignUpReq['Under_the_counter_space_available_File']){
            $(`.Under_the_counter_space_available_File`).css('color', '#ed2228');
        }
        else if($(ele).attr('id')==='Under_the_counter_space_available_2__c'&&value!=='Available'&&!draftSignUpReq['Under_the_counter_space_available_File']){
            $(`.Under_the_counter_space_available_File`).css('color', '');
        }
        if($(ele).attr('id')==='Over_the_counter_space_available__c'&&value==='Available'&&!draftSignUpReq['Over_the_counter_space_available_File']){
            $(`.Over_the_counter_space_available_File`).css('color', '#ed2228');
        }
        else if($(ele).attr('id')==='Over_the_counter_space_available__c'&&value!=='Available'&&!draftSignUpReq['Over_the_counter_space_available_File']){
            $(`.Over_the_counter_space_available_File`).css('color', '');
        }
    }
    if($(ele).attr('id')==='Location_of_Draft_Machine__c'){
        locationForOthersCheck();
    }
    
};  
const locationForOthersCheck = () => {
    if(draftSignUpReq['Location_of_Draft_Machine__c'] && draftSignUpReq['Location_of_Draft_Machine__c'] === 'Others'){
        tmp = createTextArea(`Location_Of_Draft_Machine_Others__c`,draftSignUpReq['Location_Of_Draft_Machine_Others__c'] ? draftSignUpReq['Location_Of_Draft_Machine_Others__c'] : '');
        $('.Location_of_Draft_Machine__c-rowDiv').append(tmp);
    }else{
        $('#Location_Of_Draft_Machine_Others__c').css('display','none');
    }
};

const handleInputChange = (ele) => {
    const value = $(ele).val();
    const id = $(ele).attr('id');
    draftSignUpReq[id] = value;
    
};
const disabledFields = () =>{
    $('input').attr('disabled', true);
    $('textarea').attr('disabled', true);
    $('.cart-btn').attr('disabled',true);
    $('select').attr('disabled', true);
    $('.btn-custom').attr('disabled', true);
    showNotification({message : 'Page is opened in Read - Only Mode'});
};

const handleDateTimeField = (ele) =>{
    // if (!ele.value.match(/[0-9]/)) {
    //     ele.value = ele.value.replace(/[^0-9]/g, '');
    // }
    console.log(ele)
    // ele.setAttribute(
    //     "data-date",
    //     moment(ele.value, "YYYY-MM-DD")
    //     .format( ele.getAttribute("data-date-format") )
    // )
}

// initializeDraftHomePage()