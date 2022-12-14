

let fieldMap = new Map([
    ['Appearance__c','Appearance / Freshness'],
    ['Aroma__c','Aroma'],
    ['Particles__c','Particles'],
    ['Temperature__c','Temperature'],
    ['Taste__c','Taste'],
    ['Keg_Installation_date__c','Installation Date'],
    ['Keg_Manufacturing_Date__c','Manufacturing Date'],
    ['Keg_Expiry_Date__c','Expiry Date'],
    ['Batch_No__c','Batch Number'],
    ['Kegs_in_Stock__c','Kegs in stock'],
    ['Empty_Kegs__c','Empty Kegs'],
    ['Connected__c','Connected']
]);

// let draftSanitization = {
//     liquidItems : [
//         {Liquid_Name_Helper__c : 'fgh', show_detail:false,Connected__c : true,Appearance__c : '',Aroma__c:'',Particles__c:'',Temperature__c:'',Taste__c:'',
//         Keg_Installation_date__c :null,Kegs_in_Stock__c: null,Batch_No__c: null,Keg_Expiry_Date__c:null,Keg_Manufacturing_Date__c:null
//     }
//     ]
// }
// isReadOnly = false
initailizeSanitization = () =>{
    createProductDetails();
    let tmp = '';
    if(typeValue === 'PM'){
        let date = new Date(utility.event.Draft_Installation__r.Recent_Preventive_Maintenance_Date__c).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            });
        tmp =`
        <div class="form-group">    
            <lable style="width:50%;display:inline-block">Last PM Date</lable>
            <input class="form-control" style="width:48%;display:inline-block" disabled type="text" value="${date}"/>
        </div>
        `;
    }else{
        let date = new Date(utility.event.Draft_Installation__r.Recent_Sanitization_Date__c).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            });
        tmp =`
        <div class="form-group">    
            <lable style="width:50%;display:inline-block">Last Sanitization Date</lable>
            <input class="form-control" style="width:48%;display:inline-block" disabled type="text" value="${date}"/>
        </div>
        `;
    }

    $('#last-date').append(tmp);
};

const createProductDetails = () =>{
    let tmp ='';
    $('#productDetails').html('');
    let ctr = 0;

    if(draftSanitization.liquidItems && draftSanitization.liquidItems.length >0){
        for(let i of draftSanitization.liquidItems){
            tmp += `
            <div class="outer-section" style="border:1px solid #ccc;margin:10px 0;padding:10px;border-radius: 10px">
                <div class="row">
                    <div class="col-xs-6"><h5 style="color:red">${i.Liquid_Name_Helper__c}</h5></div>
                    <div class="col-xs-6">
                        <label class="switch">
                            <input type="checkbox" ${isReadOnly ? 'disabled' : ''} id="${ctr}-show" ${i.show_detail ? 'checked':''} onchange="showProductDetails(this)">
                            <span class="slider round"></span>
                        </label>
                    </div>`;

            for(let j in i){
                
                if(j === 'Appearance__c' || j === 'Aroma__c'
                || j === 'Particles__c' || j === 'Temperature__c' || j === 'Taste__c'){
                    tmp +=`<div class="row ${ctr}-show" style="padding:10px; display:${i.show_detail ? 'block':'none'}">
                        <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                        <div class="col-xs-6">${createRating(`${ctr}-${j}`,draftSanitization.liquidItems[ctr][j] ?draftSanitization.liquidItems[ctr][j] :'1' ,isReadOnly)}</div>
                    </div>`;
                }else if(j === 'Keg_Installation_date__c' || j === 'Keg_Expiry_Date__c' || j === 'Keg_Manufacturing_Date__c'){
                    tmp +=`<div class="row ${ctr}-show" style="padding:10px; display:${i.show_detail ? 'block':'none'}"">
                        <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                        <div class="col-xs-6">${createDateField(`${ctr}-${j}`,draftSanitization.liquidItems[ctr][j] ?draftSanitization.liquidItems[ctr][j] :'',isReadOnly)}</div>
                    </div>`;
                }else if( j === 'Batch_No__c'){
                    tmp +=`<div class="row ${ctr}-show" style="padding:10px; display:${i.show_detail ? 'block':'none'}"">
                        <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                        <div class="col-xs-6">${createInputField(`${ctr}-${j}`,draftSanitization.liquidItems[ctr][j] ?draftSanitization.liquidItems[ctr][j] :null,isReadOnly)}</div>
                    </div>`;
                }else if(j === 'Kegs_in_Stock__c' || j === 'Empty_Kegs__c'){
                    tmp +=`<div class="row ${ctr}-show" style="padding:10px; display:${i.show_detail ? 'block':'none'}"">
                        <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                        <div class="col-xs-6">${createQuantityInput(`${ctr}-${j}`,draftSanitization.liquidItems[ctr][j] ?draftSanitization.liquidItems[ctr][j] :0,isReadOnly)}</div>
                    </div>`;
                }else if(j === 'Connected__c'){
                    tmp +=`<div class="row ${ctr}-show" style="padding:10px; display:${i.show_detail ? 'block':'none'}"">
                        <div class="col-xs-6"><label>${fieldMap.get(j)}</label></div>
                        <div class="col-xs-6">
                        ${createToggleField(`${ctr}-${j}`,draftSanitization.liquidItems[ctr][j] ?draftSanitization.liquidItems[ctr][j] : false,isReadOnly)}
                        </div>
                    </div>`;
                }
                
            }   
            tmp +='</div></div>';
            ctr++;
        }
    }


    $('#productDetails').append(tmp);
}




const createToggleField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" ${disabled ? 'disabled' : ''} id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};


const createInputField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <input class="form-control" ${disabled ? 'readonly' : ''} onkeyup="handleInputChange(this)" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};

const handleInputChange = (ele) => {
    const id = $(ele).attr('id');
    draftSanitization.liquidItems[id.split('-')[0]][id.split('-')[1]] = $(ele).val();
};


const createDateField = (id,value,disabled) =>{
    let itemName = id.split('-')[1];
    
    let tmp = '';
        tmp = `
        <div class="form-group">
            <input   data-date="" data-date-format="DD/MM/YYYY" class="form-control date-value" type="date" ${disabled || itemName == 'Keg_Expiry_Date__c'? 'readonly' : ''} onchange="handleDateChange(this)" id="${id}" value="${value ? value : ''}"/>
        </div>`;

    return tmp;
};
const handleDateChange = (ele) => {
    const id = $(ele).attr('id');

    ele.setAttribute(
        "data-date",
        moment(ele.value)
        .format( ele.getAttribute("data-date-format") )
    )

    draftSanitization.liquidItems[id.split('-')[0]][id.split('-')[1]] = $(ele).val();
    if(id.split('-')[1]==='Keg_Manufacturing_Date__c'){
        let expiryDate;
        if(accountRec.BillingState==='Delhi'){
            let manufacturingDate = new Date($(ele).val());
            
            expiryDate  = new Date(manufacturingDate.setMonth(manufacturingDate.getMonth()+3));
        }
        else{
            
            let manufacturingDate = new Date($(ele).val());
            
            expiryDate  = new Date(manufacturingDate.setMonth(manufacturingDate.getMonth()+6));
        }
        
        draftSanitization.liquidItems[id.split('-')[0]]['Keg_Expiry_Date__c'] = formatDateExpiryDate(expiryDate);
        
        $(`#${id.split('-')[0]}-Keg_Expiry_Date__c`).val(formatDateExpiryDate(expiryDate));
    }
};
const createQuantityInput = (id,value,disabled) =>{
    let tmp = `
        <div class="button-container" style="margin-top: 13px">
            <button class="cart-btn cart-qty-minus" ${disabled ? 'disabled' : ''} type="button" onclick="decrementQtn(this)" value="-">-</button>
            <input type="number" pattern="[0-9]*" ${disabled ? 'readonly' : ''} id="${id}" name="qty" class="qty" maxlength="3" max="100" value="${value}" onkeyup="handleQuantityChange(this)" class="input-text qty"/>
            <button class="cart-btn cart-qty-plus" ${disabled ? 'disabled' : ''} onclick="incrementQtn(this)" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};


const createRating = (id,rate,disabled) =>{
    
    let tmp = `
        
        <div class="rating" id=${id}>
            <input type="radio" ${disabled ? 'disabled' : ''} id="field1_star-3" name="rating" value="3" />
            <label class = "full ${rate === '3' ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-3" for="field1_star-3" onclick="handleRating(this)"></label>
            <input type="radio" ${disabled ? 'disabled' : ''} id="field1_star-2" name="rating" value="2" />
            <label class = "full ${rate === '3' || rate === '2' ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-2" for="field1_star-2" onclick="handleRating(this)"></label>
            <input type="radio" ${disabled ? 'disabled' : ''} id="field1_star-1" name="rating" value="1" />
            <label class = "full ${rate === '1' || rate === '2' || rate === '3' ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-1" for="field1_star-1" onclick="handleRating(this)"></label>
        </div>
    `;

    return tmp;
};



const handleRating = (ele) =>{
   
    let index = $(ele).attr('for').split('-')[1];
    $(ele).parent().find('label').removeClass('rate');

    for(let i = 1;i<=parseInt(index); i++){
        $(ele).parent().find(`[data-id = star-${i}]`).addClass('rate')
    }
    let prodIndex = $(ele).parent().attr('id').split('-')[0];
    let prodField = $(ele).parent().attr('id').split('-')[1];

    let parentDiv = $(ele).parent().attr('id');
    let rating  = $(`#${parentDiv} .rate`).length
    draftSanitization.liquidItems[prodIndex][prodField] = `${rating}`;
    // products[prodIndex][prodField] = rating;

    
};

const checkBoxChangeHandler = (ele) => {
    const id = $(ele).attr('id');
    const checked = $(ele).prop('checked');
    
    draftSanitization.liquidItems[id.split('-')[0]][id.split('-')[1]] = checked;
};


incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $($n).attr("id");
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
      $n.val(value);
      draftSanitization.liquidItems[inputName.split('-')[0]][inputName.split('-')[1]] = value;
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
    draftSanitization.liquidItems[inputName.split('-')[0]][inputName.split('-')[1]] = value;
   };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
    if(val<0){
      $(ele).val(0);
      return;
    }
    if(val >999){
      $(ele).val(999);
    
      return;
    }
    draftSanitization.liquidItems[inputName.split('-')[0]][inputName.split('-')[1]] = val;
  };

  showProductDetails = (ele) =>{
      let Id = $(ele).attr('id');
      let value = $(ele).prop('checked');

      draftSanitization.liquidItems[Id.split('-')[0]]['show_detail'] = value;
      if(value)
      {
          $(`.${Id}`).css('display','block');
      }
      else{
        $(`.${Id}`).css('display','none');
    }
  }

  


function formatDateExpiryDate(date) {
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
  

//  initailizeSanitization();