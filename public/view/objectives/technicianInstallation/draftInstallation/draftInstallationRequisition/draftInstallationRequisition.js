




let kycDetail = {
    Shipping_City : null,
    Craft_Monthly_Premium_Volume__c : null,
    Tin_Vat_Certicate_File : null,
    GST : null
}

let setOfSummaryClass = new Set();

initializeDraftAdditional = () =>{
    createDraftAdditionalSection();
}

const createDraftAdditionalSection = () =>{
    $('#draftAdditional').html('');
    if(typeValue === 'Pullout'){
        $('.summarySec').html('');
        $('.summarySec').append('Summary of Pulled-out Items');
    }
    numberOfTaps = utility.event.Draft_Installation__r.Draft_Sign_up__r.Number__c;
    let tmp = `
    
       ${typeValue === 'Pullout' ? '<h4>Draft Pullout</h4>' : '<h4>Draft Item Requisition</h4>'} 
       <div class="row">
       <div class="col-xs-6"><label>Number of Taps</label></div>
       <div class="col-xs-6">
           <div class="form-group" style="margin-bottom: 23px;">
               <input style="text-align:center" type="text" disabled class="form-control" value="${numberOfTaps ? numberOfTaps : '0'}"/>
           </div>
       </div>
   </div>
     
    `;

    tmp += createItemsWithQuantity();
    if(typeValue === typeOfRequest.Pullout)
        tmp += createMissingKegs();

    $('#draftAdditional').append(tmp);
};



const createItemsWithQuantity = () =>{
    let item = '';

    for(let i of draftInstallation.items){
        item +=`
        <div class="showFormDetail">
            <div class="row">
                <div class="col-xs-8"><h5>${i.type}</h5></div>
                <div class="col-xs-4">${createToggleField(`${i.typeId}`,draftInstallation[i.typeId],isReadOnly)}</div>
            </div>
        `;
        let ctr = 0;
        for(let j of i.items){
            item +=`
            <div class="row ${i.typeId}" style="border-radius: 10px;margin:5px 0 10px;padding:10px 0 ;border:1px solid #ccc;${draftInstallation[i.typeId] ? 'display: block' : 'display: none'}">
                <div class="col-xs-10">${j.ProductName}</div>
                <div class="col-xs-2 no-padd ${i.typeId}-${ctr}" style="${j.Missing_Damaged__c ? 'opacity:1' :'opacity:0'}">${createImageCapture(`${i.typeId}+${ctr}`,draftInstallation[`${i.typeId}_${ctr}_File`] ?draftInstallation[`${i.typeId}_${ctr}_File`] : null,isReadOnly)}</div>
                <div class="col-xs-2 no-padd">${createInputField(`${i.typeId}-${ctr}`,`${j.preQuan ? j.preQuan  : 0}`,'number')}</div>
                <div class="col-xs-5 no-padd">${createSelectOption(`${i.typeId}-${ctr}`,`${j.Missing_Damaged__c ? j.Missing_Damaged__c  : ''}`,['Missing','Damaged'],isReadOnly)}</div>
                <div class="col-xs-5 no-padd ${i.typeId}-${ctr}" style="${j.Missing_Damaged__c ? 'opacity:1' :'opacity:0'};margin-top:11px">${createQuantityInput(`${i.typeId}-${ctr}`,`${j.Quantity__c ? j.Quantity__c : 0}`,isReadOnly)}</div>
            </div>
        `;
            ctr++;
            
        }

        item += '</div>';
    }

    return item;
};


const createInputField = (id,value,type) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input type="${type}" disabled class="form-control" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};

const showSummarySection = () =>{
    let tmp = ``;
    $('#draftAdditionalSummary').html('');
  
    for(let i of draftInstallation.items){
        tmp +=`
        <div class="showSummary">
            <div class="row ${i.typeId}" style="display:none">
                <div class="col-xs-8"><h5>${i.type}</h5></div>
                </div>
        `;
  
        for(let j of i.items){
            if(typeValue === typeOfRequest.Pullout){
                    setOfSummaryClass.add(i.typeId);
                let quantity = 0;    
                    quantity = j.preQuan -j.Quantity__c;
                
                tmp +=`
                <div class="row ${i.typeId}" style="margin-bottom:10px; display : none">
                    <div class="col-xs-9">${j.ProductName}</div>
                    <div class="col-xs-3" style="text-align:center">${quantity}</div>
                </div>
                `;
                
            }else{
                if(j.Quantity__c > 0){
                setOfSummaryClass.add(i.typeId);
                
                tmp +=`
                <div class="row ${i.typeId}" style="margin-bottom:10px; display : none">
                    <div class="col-xs-9">${j.ProductName}</div>
                    <div class="col-xs-3" style="text-align:center">${j.Quantity__c}</div>
                </div>
                `;
                }
            }
        }
  
        tmp += '</div>';
    }

    $('#draftAdditionalSummary').append(tmp);

    for(let i of setOfSummaryClass){
        $(`.${i}`).css('display','block');
    }
};



const createSelectOption = (id,value,options,disabled) =>{
    
    let tmp =`
       <div class="form-group">
        <select class="form-control" ${disabled ? 'disabled' : ''} onchange="handleSelectChange(this)" id="${id}">
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

const handleSelectChange =(ele) => {
    if($(ele).attr('id')==='Report_Missing_Kegs_SKU__c'){
        const value = $(ele).val();
        draftInstallation['Report_Missing_Kegs_SKU__c'] =  value;
    }
    else{
        const typeId = $(ele).attr('id').split('-')[0];
        const index = $(ele).attr('id').split('-')[1];
        const value = $(ele).val();
        if(value){
            let id = $(ele).attr('id');
            $(`.${id}`).css('opacity','1')
        }else{
            let id = $(ele).attr('id');
            $(`.${id}`).css('opacity','0')
        }
        for(let i of draftInstallation.items){
            if(i.typeId===typeId){
                i.items[index].Missing_Damaged__c = value;
                if(!value){
                    i.items[index].Quantity__c = 0;
                }
                break;
            }
        }
    }
    
};




const createImageCapture = (id,value,disabled) =>{
    
    const newkey = id.split('+')[0]+'_'+id.split('+')[1];
    let tmp = '';

        tmp = `
        <div class="image-upload_NoInput form-group" style="margin:0">
            <div class="camera">
                <label for="${id}">
                    <i class="fa fa-camera ${newkey} ${id}" ${value ? 'style="color:#5cb85c"' : ''} aria-hidden="true"></i>                                    
                </label>
                <input id="${id}" ${disabled ? 'disabled':''} onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div> `;
    return tmp;
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
    
    const newKey = key.split('+')[0]+'_'+key.split('+')[1]+'_File';
    draftInstallation[newKey] =  await toBase64(fileInput);
    for(let i of draftInstallation.items){
        if(i.typeId===key.split('+')[0]){
            draftInstallation[newKey+'_Name'] = i.items[key.split('+')[1]].ProductName;
            break;
        }
    }
    fileAttachedBackgroundChange(key.split('+')[0]+'_'+key.split('+')[1]);
    
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
  };





const createToggleField = (id,value,disabled) =>{
    if(typeValue === typeOfRequest.Pullout){
        value = true;
    }
    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" ${disabled ? 'disabled' : ''} id="${id}" ${value ? 'checked' : ''}   onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};





const createQuantityInput = (id,value,disabled) =>{
    let tmp = `
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" data-name="${id}" ${disabled ? 'disabled' : ''} type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="${id}" ${disabled ? 'readonly' : ''} name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" data-name="${id}" ${disabled ? 'disabled' : ''} onclick="incrementQtn(this)" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};



const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).prop('checked');
    draftInstallation[id] = value;
    if(value){
        $(`.${id}`).css('display','block');
    }else{
        $(`.${id}`).css('display','none');
    }

    console.log(draftInstallation)
};

incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let id = $(ele).attr('data-name');
      let fieldName;
      let index;
      let value;
      if($($n).attr('id')!=='Report_Missing_Kegs_Quantity__c'){
        fieldName = id.split('-')[0];
        index = id.split('-')[1];
      }
      value = 0;
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      $n.val(value);
      if($($n).attr('id')==='Report_Missing_Kegs_Quantity__c'){
        draftInstallation['Report_Missing_Kegs_Quantity__c'] = value;
      }
      else{
        for(let i of draftInstallation.items){
            if(i.typeId===fieldName){
               // i.items[index].Quantity__c = value;
                if(typeValue === typeOfRequest.Pullout){
                    if(value > i.items[index].preQuan){
                        $n.val(i.items[index].preQuan);
                        i.items[index].Quantity__c = i.items[index].preQuan;
                        showNotification({message : 'Missing/Damaged cant be more than actual quanttiy'});
                        return;
                    }else{
                        i.items[index].Quantity__c = value;
                
                        i.items[index].Pullout_Quantity__c = i.items[index].preQuan - value;
                    } 
                }else{
                    i.items[index].Pullout_Quantity__c = 0;
                    i.items[index].Quantity__c = value;
                }
                break;
            }
        }
        showSummarySection();
      }
     };
  
  
  decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let fieldName ;
      let index
      let value;
      let id = $(ele).attr('data-name');
      if($($n).attr('id')!=='Report_Missing_Kegs_Quantity__c'){
        fieldName = id.split('-')[0];
        index = id.split('-')[1];
      }
      fieldName = id.split('-')[0];
      index = id.split('-')[1];
      value = 0;
      var inputName = $(ele).attr("id");
        var qty = Number($n.val());
        if (qty > 0) {
        value = qty -1;
        }
        $n.val(value);
        
        if($($n).attr('id')==='Report_Missing_Kegs_Quantity__c'){
            draftInstallation['Report_Missing_Kegs_Quantity__c'] = value;
          }
          else{
            for(let i of draftInstallation.items){
                if(i.typeId===fieldName){
                    i.items[index].Quantity__c = value;
                    if(typeValue === typeOfRequest.Pullout){
                        i.items[index].Pullout_Quantity__c = i.items[index].preQuan - value;
                    }else{
                        i.items[index].Pullout_Quantity__c = 0;
                    }
                    break;
                }
            }
            showSummarySection();
          }
    
    
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    let fieldName ;
    let index;
    let value = val;
    if(inputName!=='Report_Missing_Kegs_Quantity__c'){
        fieldName = inputName.split('-')[0];
        index = inputName.split('-')[1];
      }
   
    if(val<0){
      $(ele).val(0);
      value = 0;
    }
    if(val >999){
      $(ele).val(999);
        value = 999;
    }
    if(inputName==='Report_Missing_Kegs_Quantity__c'){
        draftInstallation['Report_Missing_Kegs_Quantity__c'] = value;
      }
      else{
        for(let i of draftInstallation.items){
            if(i.typeId===fieldName){
                i.items[index].Quantity__c = value;
                break;
            }
        }
        showSummarySection();
      }
  };
  const createMissingKegs = () =>{
    let tmp = '';
    tmp +=`
    <div class="row">
        <div class="col-xs-12"><h4 class="draft">Report Missing Kegs</h4></div>
    </div>
    <div class="row" style="margin:10px 6px;padding:5px;border: 1px solid #ccc; border-radius:5px">
        <div class="col-xs-2"><label>SKU</label></div>
        <div class="col-xs-5">${createSelectOption('Report_Missing_Kegs_SKU__c',draftInstallation['Report_Missing_Kegs_SKU__c'] ? draftInstallation['Report_Missing_Kegs_SKU__c'] : null,['20L','30L'])}</div>
                
        <div class="col-xs-5" style="padding:0; position: relative;top : 11px">${createQuantityInput(`Report_Missing_Kegs_Quantity__c`,draftInstallation['Report_Missing_Kegs_SKU__c'] ? draftInstallation['Report_Missing_Kegs_Quantity__c'] : 0)}</div>
            
    </div>
    `;

    return tmp;
}


  
