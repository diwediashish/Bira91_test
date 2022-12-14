// let varientName = ['Light','White','Blonde','Strong','Stout','IPA','Boom'];
let skuValues = ['330 ml','500 ml','650 ml'];
let preSalesType = ['Sampling','Tasting'];

// let preSales = {
//     preSalesChild : [
//         {
//             Any_other_feedback: null,
// Aroma: false,
// Bitterness: false,
// Liked: false,
// Mouth_Feel: false,
// Quantity: null,
// SKU: '330 ml',
// Type: null,
// Variant_Layer: "a0S5D000002k46FUAQ",
// Variant_name: "White",
//         },
//         {
//             Any_other_feedback: null,
// Aroma: false,
// Bitterness: true,
// Liked: false,
// Mouth_Feel: false,
// Quantity: null,
// SKU: '330 ml',
// Type: 'Tasting',
// Variant_Layer: "a0S5D000002k46PUAQ",
// Variant_name: "Light",
//         },
//         {
//             Any_other_feedback: null,
// Aroma: false,
// Bitterness: false,
// Liked: false,
// Mouth_Feel: false,
// Quantity: null,
// SKU: '500 ml',
// Type: null,
// Variant_Layer: "a0S5D000002k46jUAA",
// Variant_name: "Stout"
//         },
//         {
//             Any_other_feedback: null,
// Aroma: true,
// Bitterness: false,
// Liked: false,
// Mouth_Feel: true,
// Quantity: null,
// SKU: '330 ml',
// Type: 'Tasting',
// Variant_Layer: "a0S5D000002k46KUAQ",
// Variant_name: "Blonde"
//         }
//     ]
// }

const initializePreSales = () =>{


    createVarientOptions();
};
let isLiquidEmpty = false;
const createVarientOptions = () =>{
    let index = [];
    let tmp = '';

    if(preSales.preSalesChild.length>0){
        for(let i = 0;i<preSales.preSalesChild.length;i++){
            tmp +=`
            <div class="preSalesrow">
                <div class="row" style="margin-bottom: 10px;">
                    <div class="col-xs-7"><label style="font-size: 20px;">${preSales.preSalesChild[i].Variant_name}</label></div>
                    <div class="col-xs-5" ${preSales.preSalesChild[i]['Type']!=='Tasting' ? 'style="display:none"' : '' } ><label>Liked</label>${createCheckBox(`Liked-${preSales.preSalesChild[i].Variant_Layer}-${i}`,null,"handleCheckBox(this)",preSales.preSalesChild[i]['Liked'])}</div>
                </div>
                <div class="row">
                    <div class="col-xs-4" ><label>SKU's</label>${createSelectOption(`SKU-${preSales.preSalesChild[i].Variant_Layer}-${i}`,null,skuValues,"handleSKUoption(this)",preSales.preSalesChild[i]['SKU'])}</div>
                    <div class="col-xs-4" ${!preSales.preSalesChild[i]['SKU'] ? 'style="display:none"' : '' }><label>Type</label>${createSelectOption(`Type-${preSales.preSalesChild[i].Variant_Layer}-${i}`,null,preSalesType,"handleVarientoption(this)",preSales.preSalesChild[i]['Type'])}</div>
                    <div class="col-xs-4" ${!preSales.preSalesChild[i]['Type'] ? 'style="display:none"' : '' }><label>Quantity</label>${createQuantityInput(i,preSales.preSalesChild[i].Quantity)}</div>
                </div>
                <div class="row feedbacks-${i}">

                </div>
            </div>    
            `;
            if(!preSales.preSalesChild[i]['Liked'] && preSales.preSalesChild[i]['Type']==='Tasting'){
               // createFeedbackSection(i);
                index.push(i);
            }
        }
    }
    else{
        isLiquidEmpty = true;   
        tmp += `<div class="alert alert-info" role="alert">No Liquid is found in your cluster. Please contact System administrator!</div>`;
    }
    
    
    $('#preSales').append(tmp);

    if(index != null)
    {
        createFeedbackSection(index);
    }
};


const createFeedbackSection = (index) =>{
    let tmp = '';

    for(let i of index)
    {
        let tmp = '';
        tmp +=`
        <div class="feedback col-xs-12 ${preSales.preSalesChild[i].Variant_Layer}">
            
            <div class="row" style="margin-bottom: 10px">
                <div class="col-xs-8">Mouth Feel</div>
                <div class="col-xs-4">${createCheckBox(`Mouth_Feel-${preSales.preSalesChild[i].Variant_Layer}-${i}`,null,"handleCheckBox(this)",preSales.preSalesChild[i]['Mouth_Feel'])}</div>
            </div>
            <div class="row" style="margin-bottom: 10px">
                <div class="col-xs-8">Aroma</div>
                <div class="col-xs-4">${createCheckBox(`Aroma-${preSales.preSalesChild[i].Variant_Layer}-${i}`,null,"handleCheckBox(this)",preSales.preSalesChild[i]['Aroma'])}</div>
            </div>
            <div class="row" style="margin-bottom: 10px">
                <div class="col-xs-8">Bitterness</div>
                <div class="col-xs-4">${createCheckBox(`Bitterness-${preSales.preSalesChild[i].Variant_Layer}-${i}`,null,"handleCheckBox(this)",preSales.preSalesChild[i]['Bitterness'])}</div>
            </div>
            <div class="row">
                <div class="col-xs-6">Any Other Feedback</div>
                <div class="col-xs-6">
                    <textarea class="form-control" onkeyup="handleFeedbackAdded(this)" rows="3" id="Any_other_feedback-${preSales.preSalesChild[i].Variant_Layer}-${i}">${preSales.preSalesChild[i]['Any_other_feedback'] ?preSales.preSalesChild[i]['Any_other_feedback'] : '' }</textarea>
                </div>
            </div>
        </div>    
        `;

        $(`.feedbacks-${i}`).append(tmp);
        
    }
};

const createQuantityInput = (index,quantity) =>{
    let tmp = '';

    tmp +=`
        <div class="button-container">
            <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)"  data-index="${index}" value="-">-</button>
            <input type="number" pattern="[0-9]*" id="Qty-${index}" name="qty" class="qty" maxlength="3" data-index="${index}"  max="100" value="${quantity ? quantity : 0}" onkeyup="handleQuantityChange(this)" class="input-text qty" data-quantity="'+productList[i].Cases+'"  />
            <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="${index}" type="button" value="+">+</button>
        </div>
    `;

    return tmp;
};


const handleVarientoption = (ele) =>{
    let value = $(ele).val();
    let id = $(ele).attr('id').split('-')[1];
    let index = $(ele).attr('id').split('-')[2];
    preSales.preSalesChild[index][$(ele).attr('id').split('-')[0]] = value;
    if(value == 'Tasting'){
        $(`#Liked-${id}-${index}`).prop('checked',true);
        preSales.preSalesChild[index]['Liked'] = true;
        $(`#Liked-${id}-${index}`).parent().parent().parent().css('display','block');
    }
    else{
        $(`#Liked-${id}-${index}`).parent().parent().parent().css('display','none');
    }
    if($(ele).attr('id').split('-')[0]==='Type'&&(value==='Sampling'|| !value)){
        $(`.${id}`).remove();
        feedbackFormReset(index);
    }
    if(value)
    {
        $(`#Qty-${index}`).parent().parent().css('display','block');
    }else{
        $(`#Qty-${index}`).parent().parent().css('display','none');
    }
};

const handleSKUoption = (ele) =>{
    let value = $(ele).val();
    let id = $(ele).attr('id').split('-')[1];
    let index = $(ele).attr('id').split('-')[2];
    preSales.preSalesChild[index][$(ele).attr('id').split('-')[0]] = value;
    if(value)
    {    
        $(`#Type-${id}-${index}`).parent().parent().css('display','block');
    }else{
        $(`#Type-${id}-${index}`).parent().parent().css('display','none');
        $(`#Qty-${index}`).parent().parent().css('display','none');
    }
};

const handleCheckBox = (ele) =>{
    let value = $(ele).prop('checked');
    let id = $(ele).attr('id').split('-')[1];
    let index = $(ele).attr('id').split('-')[2];
    let lastingVal = $(`#Type-${id}-${index}`).val();
    preSales.preSalesChild[index][$(ele).attr('id').split('-')[0]] = value;
    if($(ele).attr('id').split('-')[0]==='Liked'){
        if(!value && lastingVal == 'Tasting'){
            createFeedbackSection(index);
        }else{
            $(`.${id}`).remove();
            feedbackFormReset(index);

        }
    }
    
};

const feedbackFormReset = (index) => {
    preSales.preSalesChild[index]['Mouth_Feel'] = false;
    preSales.preSalesChild[index]['Aroma'] = false;
    preSales.preSalesChild[index]['Bitterness'] = false;
    preSales.preSalesChild[index]['Any_other_feedback'] = null;
};

incrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $(ele).attr("id");
      var qty = Number($n.val());
      if (qty > 999) {
        value = 999;
       
      }
      else{
        value = Number($n.val()) + 1;
        
      }
     let index = $n.attr('data-index');
      preSales.preSalesChild[index].Quantity = value;
      $n.val(value);
      
  };
  
  
  decrementQtn = (ele) => {
    var $n = $(ele)
      .parent(".button-container")
      .find(".qty");
      let value = 0;
      var inputName = $(ele).attr("id");
    var qty = Number($n.val());
    if (qty > 0) {
      value = qty -1;
    }
    let index = $n.attr('data-index');
    preSales.preSalesChild[index].Quantity = value;
    $n.val(value);
  };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
     let index = $(ele).attr('data-index');
    if(val<0){
      $(ele).val(0);
      preSales.preSalesChild[index].Quantity = 0;
     return;
    }
    if(val >999){
      $(ele).val(999);
      preSales.preSalesChild[index].Quantity = 999;
      return;
    }
    preSales.preSalesChild[index].Quantity = val;
    
  };
  
  handleFeedbackAdded = (ele) => {
    let index = $(ele).attr('id').split('-')[2];
    preSales.preSalesChild[index]['Any_other_feedback'] = $(ele).prop('value');
  };


//   initializePreSales();