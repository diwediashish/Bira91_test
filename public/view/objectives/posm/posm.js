let listOfProduct = [
    
];
let STATIC_NO_IMAGE_URL = '/media/images/posm/product-not-available.png';

let masterProduct = [];
let setOfSelectedProd = new Set();
let totalSelectedProd = new Set();
let mapOfProdNId = new Map();

let orderedProduct = [];

initializePOSM = () =>{
    let tmp = '<option value="">--None--</option>';
    masterProduct = listOfProduct;
    let categorySet = new Set();
    listOfProduct.forEach(ele => {
        mapOfProdNId.set(ele.Id, ele);
        categorySet.add(ele.Sub_Channel__c);
        
    });
    
    Array.from(categorySet).forEach(ele => {
      tmp +=`
        <option value="${ele}">${ele}</option>
        `;
    });
    
    showModalProducts();
    showOrderProducts();
    showSummary();
    $('#categories').append(tmp);
};


const showModalProducts = () =>{
    let tmp = '';

    $('#productList').html('');
    if(listOfProduct.length > 0)
    {
        for(let i = 0;i<listOfProduct.length;i++)
        {
          if(!totalSelectedProd.has(listOfProduct[i].Id)){
            tmp +=`
            <div class="row product" id="${listOfProduct[i].Id}" onclick="selectProduct(this)">
                <div class="col-xs-3 no-padd"><img src="${itemImagesMap.has(listOfProduct[i].Id) ? `data:image/png;base64,${itemImagesMap.get(listOfProduct[i].Id)}` : `${STATIC_NO_IMAGE_URL}`}" alt="No Image" height="100px"/></div>
                <div class="col-xs-9">
                    <p>${listOfProduct[i].Name}</p>
                    <p>${listOfProduct[i].Sub_Channel__c}</p>
                </div>
            </div>
        `;
          }
           
        }
    }else{
        tmp = `<div class="alert alert-info" role="alert">
                    No Products found
               </div>`;
    }

    $('#productList').append(tmp);
};

const showOrderProducts = () =>{
    let tmp = '';
    $('#listOfOrderedPOSM').html('');
    if(orderedProduct.length>0){
      for(let i=0;i<orderedProduct.length;i++)
    {
        tmp +=`
        <div class="row" id="${orderedProduct[i].Product__c}">
        <div class="col-xs-6"><img src="${itemImagesMap.has(orderedProduct[i].Product__c) ? `data:image/png;base64,${itemImagesMap.get(orderedProduct[i].Product__c)}` : `${STATIC_NO_IMAGE_URL}`}" alt="No Image" height="100px"/>
        <p>${orderedProduct[i].Name}</p>
                
        </div>
            
            <div class="col-xs-6">
                <div class="button-container" style="margin-top:17%;">
                    <button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)" ${isReadOnly ? 'disabled' : ''}  data-index="${i}" value="-">-</button>
                    <input type="number" pattern="[0-9]" id="cases" name="qty" class="qty" maxlength="3" data-index="${i}" ${isReadOnly ? 'disabled' : ''} max="100" value="${orderedProduct[i].Quantity__c}" onkeydown="if(event.key==='.'){event.preventDefault();}"   onkeyup="handleQuantityChange(this)" class="input-text qty" data-quantity="'+productList[i].Cases+'"  />
                    <button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="${i}" ${isReadOnly ? 'disabled' : ''} type="button" value="+">+</button>
                </div>
            </div>
        </div>
        `;
    }
    }
    else{
      tmp = `<div class="alert alert-info text-center" role="alert">
                    No Products Added!
               </div>`;
    }
    

    $('#listOfOrderedPOSM').append(tmp);
    
};

// const isNumberKey = (evt, obj) =>{

//   var charCode = (evt.which) ? evt.which : event.keyCode
//   var value = obj.value;
//   var dotcontains = value.indexOf(".") != -1;
//   if (dotcontains)
//       if (charCode == 46) return false;
//   if (charCode == 46) return true;
//   if (charCode > 31 && (charCode < 48 || charCode > 57))
//       return false;
//   return true;
// }


const selectProduct = (ele) =>{
    let prodId = $(ele).attr('id');

    if(setOfSelectedProd.has(prodId))
    {
        setOfSelectedProd.delete(prodId);
        $(`#${prodId}`).css('background','');
    }
    else{
        setOfSelectedProd.add(prodId);
        $(`#${prodId}`).css('background','antiquewhite');
    }
};


handleSelectedProducts = () =>{
    
    setOfSelectedProd.forEach(id => {
        if(!totalSelectedProd.has(id))
        {
            let item = mapOfProdNId.get((id));
            let product = {
                Name : item.Name,
                Product__c : id,
                Quantity__c : 0 ,
                App_Id__c	 : `${fetchCurrentDateIdStr()}-${accountRec.Id}-${id}`,
                Parent_App_Id__c : `${fetchCurrentDateIdStr()}-${accountRec.Id}`,
                Status__c : 'Submitted'
            };

            orderedProduct.push(product);

            totalSelectedProd.add(id);
        }
    });
    setOfSelectedProd.clear();

    showOrderProducts();
};


handleKYCSubmission = () =>{
    let gst = $('#gstNumber').val();
    let outletAddress = $('#outletAddress').val();
    let city = $('#city').val();

    if(!gst){
        showNotification({message :'GST,City & Outlet Address are Mandatory'});
        return false;
    }else if(!outletAddress){
        showNotification({message : 'GST,City & Outlet Address are Mandatory'});
        return false;
    }else if(!city){
        showNotification({message : 'GST,City & Outlet Address are Mandatory'});
        return false;
    }

   $('#kycModal').modal('hide');
}

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
      
      orderedProduct[index][
        "Quantity__c" 
      ] = value;
      $n.val(value);
      
      showSummary();
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
  
    orderedProduct[index]["Quantity__c"] = value;
    $n.val(value);
    showSummary();
  };
  
  handleQuantityChange = (ele) => {
    let val = $(ele).val();
    var inputName = $(ele).attr("id");
     let index = $(ele).attr('data-index');
    if(val<0){
      $(ele).val(0);
      orderedProduct[index]["Quantity__c"] = 0;
      return;
    }
    if(val >999){
      $(ele).val(999);
      orderedProduct[index]["Quantity__c"] = 999;
  
      return;
    }
    orderedProduct[index]["Quantity__c"] = val;
    showSummary();
  };
  

  const handleProductFilter = () => {
    let productName = $("#searchValue").val();
    let category = $('#categories').val();
    
    listOfProduct = masterProduct.filter((ele) => {
      let isValid = true;
      if (ele.Name && productName) {
        if (ele.Name.toLowerCase().indexOf(productName.toLowerCase()) < 0) {
          isValid = false;
        }
      }
      if (ele.Sub_Channel__c && category && category.length>0) {
        if(category.indexOf(ele.Sub_Channel__c)===-1){
          isValid = false;
         
        }
      }
      return isValid;
    });
    
    showModalProducts(listOfProduct);
  };

  showSummary = () => {
    $("#orderSummaryPage").empty();
    const productLength = orderedProduct.length;
    let tmp =
      '<h4 style="color:black">Cart <span class="price"  style="color:black;float:right" ><i class="fa fa-shopping-cart"></i> <b >' +
      0 +
      "</b></span></h4>";
    let producttableConstruct = '';
    if (productLength === 0) {
      producttableConstruct += '<div class="text-center">No Products added!</div>';
    } else {
  
      
      let noOfProducts = 0;
      let totalNoOfQty = 0 ;
      orderedProduct.forEach(ele => {
        if (ele.Quantity__c && ele.Quantity__c > 0) {
          
          let numQty = 0;
          if (ele.Quantity__c) {
            numQty = parseFloat(ele.Quantity__c);
          } else {
            numQty = 0;
          }
          totalNoOfQty += numQty;
          
          
          producttableConstruct += `<p ><a style="width:80%;display:inline-block;">${ele.Name}</a><span class="text-right" style="width:20%;display:inline-block;color: grey;vertical-align:top;"> ${numQty}</span></p>`;
          noOfProducts++;
        }
      });
      if(noOfProducts===0){
        producttableConstruct += '<div class="text-center">No Products added!</div>';
      }
      else{
        tmp ='<h4 style="color:black">Cart <span class="price" style="color:black;float:right" ><i class="fa fa-shopping-cart"></i> <b >' +
        noOfProducts +
        "</b></span></h4>" ;
        
      }
      tmp += producttableConstruct;
      tmp += "<hr>";
      tmp += `<p><span style="width:80%;display:inline-block;">Total </span> <span class="text-right" style="width:18%;color: grey;vertical-align:top;display:inline-block;"><b> ${totalNoOfQty}</b></span></p>`;
    }
  
    $("#orderSummaryPage").append(tmp);
  };
  


  const handlePOSMCompletion = () => {
    if(isReadOnly){
      handleCancelPOSM();
    }
    else{ 
      $('#kycModal').modal('show');
    }
  };

  