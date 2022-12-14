


let stockDetail = [];
let items = [];
let itemsBackend = [];
let imageMap = new Map();
let itemValueMap = new Map();
let productSelectedTotal = new Set();
initializeProduct = (itemList, imagesMap) => {
  items = itemList;
  itemsBackend = itemList;
  imageMap = imagesMap;
  itemsBackend.forEach(ele => {
    itemValueMap.set(ele.Product__c, ele);
  });
  getProduct();


};



let productSelected = new Set();
getProduct = () => {
  // let listOfProd = getProductback();
  $('#products').empty();
  let tmp = '';
  for (var i = 0; i < items.length; i++) {
    if (!productSelectedTotal.has(items[i].Product__c)) {
      if (productSelected.has(items[i].Product__c)) {
        tmp += '<div class="col-xs-12" background="antiquewhite" style="padding:3%;">';
      }
      else {
        tmp += '<div class="col-xs-12" style="padding:3%;">';
      }

      let body = '';
      // body += '    <p  >INR ' + (items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0) + '</p>';
      const key = `${i}-${items[i].Product__c}`;
      if (imageMap.has(items[i].Product__c)) {
        tmp += createCard(`data:image/png;base64, ${imageMap.get(items[i].Product__c)}`, i, (items[i].Product__c ? (items[i].Product__r.Display_Name__c) : ''), body, "productClicked(this)", key);
      }
      else {
        tmp += createCard(``, i, (items[i].Product__c ? (items[i].Product__r.Display_Name__c) : ''), body, "productClicked(this)", key);
      }
      tmp += '</div>';
    }


    //  tmp+='<tr class="product" data-id='+items[i].Product__c+' data-name='+(items[i].Product__c ? (items[i].Product__r.Display_Name__c) : '')+' data-mrp='+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'>';
    //  tmp+='<td>'+(items[i].Product__c ? (items[i].Product__r.Display_Name__c) : '')+'</td>';
    //  tmp+='<td>'+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'</td>';
    //  tmp+='<td>'+(items[i].Product__c ? (items[i].Product__r.Size_ID__r ? (items[i].Product__r.Size_ID__r.UOM_of_Primary_Conversion__c) : '' ) : '' )+'</td>';     
    //  tmp+='</tr>';
  }

  $('#products').append(tmp);

  //  $(".product").click(function(){
  //   var product = {}; 
  //      product ["Item_Master"] = $(this).attr('data-id');
  //      product ["name"] = $(this).attr('data-name');
  //      product ["mrp"] = $(this).attr('data-mrp');

  //      product["Quantity"] = 0;
  //      addProduct(product);
  //  });

};

const productClicked = (event) => {
  let index = $(event).attr('data-index');
  const key = `${index}-${items[index].Product__c}`;

  if (productSelected.has(items[index].Product__c)) {
    productSelected.delete(items[index].Product__c);
    $(`#${key}`).css('background', 'transparent');
  }
  else {
    $(`#${key}`).css('background', 'antiquewhite');
    productSelected.add(items[index].Product__c);
  }

};




$("#searchValue").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  items = itemsBackend.filter(ele => {
    let displayName = (ele.Product__c ? (ele.Product__r.Display_Name__c) : '');
    displayName = displayName.toLowerCase();
    return (displayName.indexOf(value) > -1);
  });
  getProduct();
});


createCard = (img, index, title, body, eventListner, key) => {
  var tmp = '';

  tmp += '<div class="media" id="' + key + '" data-index=' + index + ' onclick="' + eventListner + '">';
  tmp += '  <div class="media-left">';
  tmp += '    <img src="' + img + '" class="media-object" style="height: 9rem;width: 4rem;">';
  tmp += '  </div>';
  tmp += '  <div class="media-body">';
  tmp += '    <h4 class="media-heading">' + title + '</h4>';
  tmp += '    <p>' + body + '</p>';
  tmp += '  </div>';
  tmp += '</div>';

  return tmp;
};

let productList = [];
showProducts = () => {
  $('#listOfItem').empty();
  var tmp = '';
  for (var i = 0; i < productList.length; i++) {
    tmp += '<div class="item" id="' + productList[i].id + '">';
    tmp += '  <div class="item-content">';
    if (imageMap.has(productList[i].Item_Master)) {
      tmp += '   <img  src="data:image/png;base64, ' + imageMap.get(productList[i].Item_Master) + '"/>';
    }
    else {
      tmp += '   <img />';
    }

    tmp += '   <div class="desp">';
    tmp += '    <p class="product-name">' + productList[i].name + '</p>';
    // tmp += '    <p class="product-mrp">INR ' + productList[i].mrp + '</p>'
    // tmp+='    <p data-index="'+i+'" onclick="deleteProduct(this)"><i class="fas fa-trash-alt"></i></p>';
    tmp += '   </div>';
    tmp += '  </div>';

    tmp += '<div class="slidecontainer">';
    // tmp+='<div class="text-center" ><p data-index="0" onclick="deleteProduct(this)"><i class="fas fa-trash-alt"></i></p></div>';
    tmp += '	<div class="button-container" style="margin-top:17%;">';
    tmp += '<button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)"  data-index="'+i+'" value="-">-</button>';
    tmp += '<input type="number" pattern="[0-9]*" name="qty" class="qty" maxlength="3"  max="100" value="'+productList[i].Quantity+'" onkeyup="handleQuantityChange(this)" class="input-text qty" data-quantity="'+productList[i].Quantity+'" data-mrp="'+productList[i].mrp+'" data-itemName= "'+productList[i].name+'" data-index="'+i+'" data-Id="'+productList[i].Item_Master+'" />';
    
    tmp += '<button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="'+i+'" type="button" value="+">+</button>';
    tmp += '</div>';
    tmp += '</div>';

    tmp += '</div>';
  }

  $('#listOfItem').prepend(tmp);
  //addListenerToProduct();
};
const deleteProduct = (event) => {
  const index = $(event).attr('data-index');
  productSelectedTotal.delete(stockDetail[index].Item_Master);
  productList.splice(index, 1);
  stockDetail.splice(index, 1);
  showProducts();
};

rangeSlider = (inputId, quantityId, id) => {
  let slider = document.getElementById(inputId);
  let output = document.getElementById(quantityId);
  // let backgnd = document.getElementById(backCol);
  output.innerHTML = slider.value;

  slider.oninput = function () {

    if (this.value == "50") {
      output.innerHTML = this.value + '+';
    }
    else {
      output.innerHTML = this.value;
    }
    $(this).siblings("div").css("width", this.value * 2 + '%');
  }
};

const handleProductClose = () => {
  let products = [];
  for (let i of productSelected.entries()) {

    let itemV = itemValueMap.get(i[0]);
    if (!productSelectedTotal.has(itemV.Product__c)) {
      products.push({
        Item_Master: itemV.Product__c,
        name: (itemV.Product__c ? (itemV.Product__r.Display_Name__c) : ''),
        mrp: (itemV.Total_Billing_Price__c ? itemV.Total_Billing_Price__c : 0),
        Quantity: 0
      });
      productSelectedTotal.add(itemV.Product__c);
    }

  }
  productList = productList.concat(products);
  stockDetail = stockDetail.concat(products);
  productSelected.clear();
  getProduct();
  showProducts();
};

addListenerToProduct = () => {
  $('.item').each(function () {
    let inputId = $(this).children().find("input").attr("id");
    let quantityId = $(this).children().find("span").attr("id");
    let id = $(this).attr("id");
    rangeSlider(inputId, quantityId, id);
  });
};






getQuantity = (a) => {

  const itemId = a.attr('data-Id');
  const index = a.attr('data-index');
  const itemName = a.attr('data-itemName');
  const mrp = a.attr('data-mrp');
  stockDetail[index].Item_Master = itemId;
  stockDetail[index].Item_Master = itemId;
  stockDetail[index].Quantity = parseFloat(event.target.value);
  stockDetail[index].name = itemName;
  stockDetail[index].mrp = mrp;
  //stockDetail.push(new stockDetailfUNCT(a.attr('data-Id'), event.target.value))

};


handlePageRedirect = async (value) => {
  stockVisbility.stockVisibilityChilds = stockDetail;
  stockVisbility.isSynced = false;
  stockVisbility.Event_Id = fetchCurrentDateIdStr() + '-' + accountRec.Id;
  stockVisbility.Daily_Tracker = fetchCurrentDateIdStr();
  stockVisbility.Last_Modified = new Date();
  const position = await getCurrentLocationHelper();
  stockVisbility.Geolocation_Latitude = position.coords.latitude;
  stockVisbility.Geolocation_Longitude = position.coords.longitude;
  await writeData('stockVisibility', stockVisbility);
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
incrementQtn = (ele) => {
  var $n = $(ele)
    .parent(".button-container")
    .find(".qty");
    let value = 0;
    var amount = Number($n.val());
    if (amount > 999) {
      value = 999;
     
    }
    else{
      value = Number($n.val()) + 1;
      
    }
    let index = $n.attr('data-index');
    stockDetail[index].Quantity = value;
    $n.val(value);
};


decrementQtn = (ele) => {
  var $n = $(ele)
    .parent(".button-container")
    .find(".qty");
    let value = 0;
  var amount = Number($n.val());
  if (amount > 0) {
    
    value = amount -1;
  }
  let index = $n.attr('data-index');
  stockDetail[index].Quantity = value;
  $n.val(value);

};

handleQuantityChange = (ele) => {
  let val = $(ele).val();
  let index = $(ele).attr('data-index');
  if(val<0){
    $(ele).val(0);
    stockDetail[index].Quantity = 0;
    return;
  }
  if(val >999){
    $(ele).val(999);
    stockDetail[index].Quantity = 999;
    return;
  }
  stockDetail[index].Quantity = val;
};