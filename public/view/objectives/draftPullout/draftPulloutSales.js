let mapOfFieldLabel = new Map([
    ['Recommended_Machine_type','Number of Taps'],
    ['Asset_Id','Asset Id'],
    ['RGP_Number','RGP Number'],
    ['Pullout_Reason__c','Pullout Reason'],
    ['In_case_of_Others__c','In case of Others'],
    ['Pullout_Date__c','Pullout Date'],
    ['Machine_in_good_condition__c','Machine in good condition'],
    ['Tower_in_good_condition__c','Tower in good condition'],
    ['Number_of_Kegs_Filled_Empty__c','Number of Kegs(filled + empty)'],
    ['Security_Deposit','Security Deposit'],
    ['Amount','Amount']
]);

const selectOptions = new Map([
    ['Pullout_Reason__c',['Not Meeting Enough Volume','Competitor Tie-up','Outlet Getting Closed','Outlet Undergoing Renovation','	Change in Draft Machine','Ownership has changed','Others']],
    ['Asset_Id',[]]
]);

const createPullOutHomePage = () =>{
    let fieldName = ['Asset_Id','Recommended_Machine_type','RGP_Number','Pullout_Reason__c','In_case_of_Others__c','Pullout_Date__c',
                    'Machine_in_good_condition__c','Tower_in_good_condition__c','Number_of_Kegs_Filled_Empty__c','Security_Deposit','Amount'];
    $('#pulloutForm').html('');
    let tmp = '<h4>Draft Pullout</h4>';
    
    for(let i of fieldName)
    {
        if(i === 'Asset_Id'  || i === 'Pullout_Reason__c')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createSelectOption(i,null,selectOptions.get(i),isReadOnly)}</div>
            </div>
            `;
        }
        else if(i === 'Recommended_Machine_type' || i ==='In_case_of_Others__c')
        {
            tmp +=`
            <div class="row ${i}">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createInputField(i,null,'text',isReadOnly)}</div>
            </div>
            `;
        }
        else if( i ==='RGP_Number' || i ==='Amount')
        {
            tmp +=`
            <div class="row" style="${i ==='Amount' ? 'display: none':''}">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createInputField(i,null,'number',i ==='Amount' ? true :  isReadOnly)}</div>
            </div>
            `;
        }else if(i ==='Machine_in_good_condition__c' || i === 'Tower_in_good_condition__c' || i === 'Security_Deposit')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createToggleField(i,false,isReadOnly)}</div>
            </div>
            `;
        }else if(i === 'Pullout_Date__c')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createInputField(i,null,'date',isReadOnly)}</div>
            </div>
            `;
        }else
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6"><label>${mapOfFieldLabel.get(i)}</label></div>
                <div class="col-xs-6">${createQuantityInput(i,0,isReadOnly)}</div>
            </div>
            `;
        }
    }


    $('#pulloutForm').append(tmp);
    $('.In_case_of_Others__c').css('display','none')
    $('.slider').css('top','13px');
}

const createInputField = (id,value,type,disabled) =>{

    let tmp = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd
        tmp = `
        <div class="form-group">
            <input ${type === 'date' ? 'data-date="" data-date-format="DD/MM/YYYY"': ''} min="${today}" type="${type}" ${disabled ? 'disabled' : ''} class="form-control ${type === 'date' ? 'date-value' : ''}" id="${id}" value="${value ? value : ''}"
            ${type === 'date' ? 'onchange="handleDateChange(this)"' : ''}
            />
        </div>`;

    return tmp;
};


const createToggleField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" ${disabled ? 'disabled' : ''} id="${id}" ${value === 'true' ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)" >
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};


const createQuantityInput = (id,value,disabled) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus isReadOnly" ${disabled ? 'disabled' : ''} data-name="${id}" type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" ${disabled ? 'disabled' : ''} id="${id}" name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus isReadOnly" ${disabled ? 'disabled' : ''} data-name="${id}" onclick="incrementQtn(this)" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};


const createSelectOption = (id,value,options,disabled) =>{
    let tmp =`
       <div class="form-group">
        <select onchange="handleSelectChange(this)" ${disabled ? 'disabled' : ''} class="form-control isReadOnly" id="${id}">
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


const handleDateChange = (ele) => {
    const id = $(ele).attr('id');

    ele.setAttribute(
        "data-date",
        moment(ele.value)
        .format( ele.getAttribute("data-date-format") )
    )

}

const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).prop('checked');
    draftPullout[id] = value;
};
const handleSelectChange = async(ele) => {
    const id = $(ele).attr('id');
    if(id==='Asset_Id'){
        await handleSelectedAssetId();
    }

    if(id==='Pullout_Reason__c' && $(ele).val() ==='Others'){
        $('.In_case_of_Others__c').css('display','block');
    }else{
        $('.In_case_of_Others__c').css('display','none');
    }
    if(!isReadOnly){
        draftPullout[id] = $(ele).val();
    }
    
};



incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let id = $(ele).attr('data-name');
      let fieldName = id.split('-')[0];
      let index = id.split('-')[1];
      
      let value = 0;
      var inputName = $(ele).attr("id");
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      draftPullout[fieldName] = value;
      $n.val(value);
};
  
  
decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      
      let id = $(ele).attr('data-name');
      let fieldName = id.split('-')[0];
      let index = id.split('-')[1];
      
      let value = 0;
      var inputName = $(ele).attr("id");
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    draftPullout[fieldName] = value;
    $n.val(value);

};
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    let fieldName = inputName.split('-')[0];
    let index = inputName.split('-')[1];
    draftPullout[fieldName] = val;
    if(val<0){
      $(ele).val(0);
      draftPullout[fieldName] = 0;
      return;
    }
    if(val >999){
      $(ele).val(999);
      draftPullout[fieldName] = 999;
      return;
    }

};
