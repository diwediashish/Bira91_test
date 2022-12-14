let isTemporary = false;
let selectOption = new Map([
    ['Starter_Kit',['Yes','No','Applied']]
]);


let listOfItems = {
    
};

initialzileDraftPOSM = () =>{
    if(isTemporary){
        createTemporaryPOSM();
    }
    else{
        createPOSMforPermanent(); 
        productRendering();    
    }
    if(isReadOnly){
        disabledFields();
    }
};

const createPOSMforPermanent = () =>{
    let tmp = '';
    $('#showPOSMDraft').html('');

    tmp = `
    <div class="row">
        <div class="col-xs-4">
            <label>Starter Kit</label>
        </div>
        <div class="col-xs-8 no-padd">
            ${createSelectOption('Starter_Kit__c',posm['Starter_Kit__c'] ?posm['Starter_Kit__c'] : null,selectOption.get('Starter_Kit'))}
        </div>
        
    </div>
    
    `;

    // <div class="row">
    //     <div class="col-xs-8">
    //         <label>
    //             Displays List of Items and Respective Quantities in the Selected SKU
    //         </label>
    //     </div>
    // </div>
    

    $('#showPOSMDraft').append(tmp);

};

const productRendering = () => {
    $('#showPOSMItem').html('');
    let tmp = createItemsWithQuantity(listOfItems);
    $('#showPOSMItem').append(tmp);
};

const createItemsWithQuantity = (itemList) =>{
    let item = '';

    for(let i in itemList){
        item += `<div class="row">
                    <div class="col-xs-12"><h5>${i}</h5></div>     
                </div>`;
        for(let j= 0;j< itemList[i].length;j++){
        //    console.log(j,itemList[i][j])
            item += `
            <div class="row">
                <div class="col-xs-7">
                    ${itemList[i][j].Name}
                </div>
                <div class="col-xs-5">
                    ${createQuantityInput(`${itemList[i][j].Product__c+'-'+itemList[i][j].index}`,itemList[i][j].Quantity__c ?itemList[i][j].Quantity__c : 0 )}
                </div>
            </div>
        `;
        }
        
    }

    return item;
};

const createTemporaryPOSM = () =>{
    
let salesRequisitionField = ['Bar_Setup__c','Number_of_Bars__c','Size_of_Bar_in_feet__c','Back_Drop_Required__c','Customized_Branding__c'];

let mapOfFieldLabel = new Map([
    ['Bar_Setup__c','Bar Set-up'],
    ['Number_of_Bars__c','Number of Bars'],
    ['Size_of_Bar_in_feet__c','Size of Bar(in feet)'],
    ['Back_Drop_Required__c', 'Back drop Required'],
    ['Disposable_Glass','Disposable Glass'],
    ['MakePlay_Signage','MakePlay Signage'],
    ['LR_Signage','LR Signage'],
    ['Bottle_Opener','Bottle Opener'],
    ['Bira91_Bar_Mats','Bira91 Bar Mats'],
    ['Customized_Branding__c','Customized Branding']
]);
$('#showPOSMDraft').html();

let tmp = '';
    // tmp =`
    //     <div class="row">
    //         <div class="col-xs-12">
    //             <h5>Point of Sales Requisition</h5>
    //         </div>
    //     </div>
    // `;

    for(let i=0;i<salesRequisitionField.length;i++){
        
        if(salesRequisitionField[i] !== 'Bar_Setup__c' && salesRequisitionField[i] !== 'Customized_Branding__c')
       {
           
         tmp +=`
        <div class="row">
            <div class="col-xs-7">
                ${mapOfFieldLabel.get(salesRequisitionField[i])}
            </div>
            <div class="col-xs-5">
                ${createQuantityInput(salesRequisitionField[i],posm[salesRequisitionField[i]] ?posm[salesRequisitionField[i]] : 0 )}
            </div>
        </div>
        `
    }else{

        tmp +=`
        <div class="row">
            <div class="col-xs-7">
                ${mapOfFieldLabel.get(salesRequisitionField[i])}
            </div>
            <div class="col-xs-5">
                ${createToggleField(salesRequisitionField[i],posm[salesRequisitionField[i]] ?posm[salesRequisitionField[i]] : false)}
            </div>
        </div>
        `
      }
    }
    $('#showPOSMDraft').append(tmp);

}

const temporaryPOSMDynamicProduct = () =>{
    
    let tmpStr = '';
    for(let i=0;i<posm.posmLineItem.length;i++){
        tmpStr +=`
        <div class="row">
            <div class="col-xs-7">
                ${posm.posmLineItem[i].Name}
            </div>
            <div class="col-xs-5">
                ${createQuantityInput(posm.posmLineItem[i].Product__c+'-'+i,posm.posmLineItem[i].Quantity__c ?posm.posmLineItem[i].Quantity__c :  0)}
            </div>
        </div>`; 
    }
    
    
    $('#showPOSMItem').html();
    $('#showPOSMItem').append(tmpStr);
    
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



const createSelectOption = (id,value,options) =>{
    let tmp =`
       <div class="form-group">
        <select class="form-control" onchange="handleSelectChange(this)" id="${id}">
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




const createToggleField = (id,value) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};

const checkBoxChangeHandler = (ele) => {
    const id = $(ele).prop('id');
    const value = $(ele).prop('checked');
    posm[id] = value;
};


incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $($n).attr("id");
      var qty = Number($n.val());

      let itemName;

      if(inputName.split('-')[1]){
        itemName = posm.posmLineItem[inputName.split('-')[1]].Name;
      }

      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      
    if(itemName && (itemName.includes('Tap Handles') || itemName.includes('Tap Handle'))){
      
        if(value > 1){
          showNotification({message : 'Tap Handles cannot be ordered greater than 1'});
          return;
        }
    }    
    $n.val(value);
    if(inputName.split('-').length>1){
        posm.posmLineItem[inputName.split('-')[1]].Quantity__c = value;
      }
      else{
        posm[inputName.split('-')[0]]=value;
      }
      

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
    $n.val(value);
    
    if(inputName.split('-').length>1){
        posm.posmLineItem[inputName.split('-')[1]].Quantity__c = value;
      }
      else{
        posm[inputName.split('-')[0]]=value;
      }
      
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    let itemName;
    if(inputName.split('-')[1]){
        itemName = posm.posmLineItem[inputName.split('-')[1]].Name;
    }
    let value = val;   
   
    if(itemName &&itemName.includes('Tap Handles')){
        if(value > 1){
          showNotification({message : 'Tap Handles cannot be ordered greater than 1'});
          $(ele).val(1);
          return;
        }
    }    

    if(val<0){
      $(ele).val(0);
      value = 0;
      return;
    }
    if(val >999){
      $(ele).val(999);
      value = 999;
      return;
    }

    if(inputName.split('-').length>1){
        posm.posmLineItem[inputName.split('-')[1]].Quantity__c = value;
      }
      else{
        posm[inputName.split('-')[0]]=value;
      }
      console.log(posm)
  };
  


const handleSelectChange = async(ele) => {
    const id = $(ele).prop('id');
    posm[id] = $(ele).val();
    if(posm[id]){
        $('.btn-submit').css('display','inline-block');
    }
    else{
        $('.btn-submit').css('display','none');
    }
    await productFetching(starterKitProducts.get(posm[id]));
    constructProductSectionWise();
};  

const disabledFields = () =>{
    $('input').attr('disabled', true);
    $('textarea').attr('disabled', true);
    $('.cart-btn').attr('disabled',true);
    $('select').attr('disabled', true);
    showNotification({message : 'Page is opened in Read - Only Mode'});
}