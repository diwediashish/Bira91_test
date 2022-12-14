let orderRecord;
initializeOrderFrontEnd = orderRec => {
  orderRecord = orderRec;

  orderRecord.products.forEach(ele => {
    selectedProductTotal.add(ele.Item_Name);
  });
  showProducts();
  getProduct();
  
};
let items;
let itemImages;
let backendItems;
let selectedProduct = new Set();
let selectedProductTotal = new Set();
let productMap = new Map();
let productIdMap = new Map();
initializeProductsFrontEnd = (products, images) => {
  items = products;
  items.forEach(ele => {
    productMap.set(ele.Id, ele);
    productIdMap.set(ele.Product__c, ele);
  });
  itemImages = images;
  backendItems = products;
  getProduct();
};

// $('#salesOrder').change(function(){

//   var $option = $(this).find('option:selected');
//   var value = $option.val();
//   initializeOrder(value);
//   // var params = new window.URLSearchParams(window.location.search);
//   // var EventObjectiveId = params.get('EventObjectiveId');
//   // var accountId = params.get('accountId');

//   // salesOrder = EventObjectiveId+'-'+accountId+'-'+value;

//   $('.btn-section').css('display','block');
//   //  getProducts = fetchSalesOrderKey(strParam);

// });

getProduct = () => {
  // let listOfProd = getProductback();
  let tmp = "";

  $("#productList").html("");
  $(".table").css("display", "block");
  if (items.length > 0) {
    for (var i = 0; i < items.length; i++) {
      // tmp+='<tr  data-priceMasterId='+(items[i].Id)+' data-itemId='+(items[i].Product__c)+' data-name="'+(items[i].Product__c ? (items[i].Product__r.Display_Name__c) : '')+'" data-mrp='+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'>';
      // tmp+='<td><form><div class="checkbox"><label><input type="checkbox"></label></div></form></td>';
      // tmp+='<td>'+(items[i].Product__c? items[i].Product__r.Display_Name__c : '')+'</td>';
      // tmp+='<td>'+(items[i].Total_Billing_Price__c ? items[i].Total_Billing_Price__c : 0)+'</td>';
      // tmp+='<td>'+(items[i].Product__c ? (items[i].Product__r.Size_ID__r ? (items[i].Product__r.Size_ID__r.UOM_of_Primary_Conversion__c) : '' ) : '' )+'</td>';
      // tmp+='</tr>';
      if (!selectedProductTotal.has(items[i].Product__c)) {
        if (selectedProduct.has(items[i].Id)) {
          tmp +=
            '<div class="product col-xs-12" style="padding:3%;background: antiquewhite;"  data-priceMasterId=' +
            items[i].Id +
            " data-itemId=" +
            items[i].Product__c +
            ' data-name="' +
            (items[i].Product__c ? items[i].Product__r.Display_Name__c : "") +
            '" data-mrp=' +
            (items[i].Total_Billing_Price__c
              ? items[i].Total_Billing_Price__c
              : 0) +
            ">";
        } else {
          tmp +=
            '<div class="product col-xs-12" style="padding:3%;"  data-priceMasterId=' +
            items[i].Id +
            " data-itemId=" +
            items[i].Product__c +
            ' data-name="' +
            (items[i].Product__c ? items[i].Product__r.Display_Name__c : "") +
            '" data-mrp=' +
            (items[i].Total_Billing_Price__c
              ? items[i].Total_Billing_Price__c
              : 0) +
            ">";
        }
        tmp += '<div class="media">';
        if (itemImages && itemImages.has(items[i].Product__c)) {
          tmp +=
            '<div class="media-left"><a ><img class="media" style="width:4rem;height:9rem" src="data:image/png;base64, ' +
            itemImages.get(items[i].Product__c) +
            '" ></a>';
        } else {
          tmp +=
            '<div class="media-left"><a ><img class="media" style="width:4rem;height:9rem"  ></a>';
        }

        tmp += "</div>";
        tmp += '<div class="media-body">';
        tmp +=
          '<h4 class="media-heading">' +
          (items[i].Product__c ? items[i].Product__r.Display_Name__c : "") +
          "</h4>";
        tmp +=
          "<p>INR " +
          (items[i].Total_Billing_Price__c
            ? items[i].Total_Billing_Price__c
            : 0) +
          "</p>";
        tmp +=
          "<p> " +
          (items[i].Product__c
            ? items[i].Product__r.Size_ID__r
              ? items[i].Product__r.Size_ID__r.UOM_of_Primary_Conversion__c
              : ""
            : "") +
          "</p>";
        tmp += "</div>";
        tmp += "</div>";
        tmp += "</div>";
      }
    }
    $("#productList").append(tmp);
  } else {
    tmp = '<div class="text-center">No product found!</div>';

    $("#productList").html(tmp);
  }

  $(".product").click(function() {
    if (selectedProduct.has($(this).attr("data-priceMasterId"))) {
      selectedProduct.delete($(this).attr("data-priceMasterId"));
      $(this).css("background", "transparent");
    } else {
      selectedProduct.add($(this).attr("data-priceMasterId"));
      $(this).css("background", "antiquewhite");
    }

    // var product = {};
    // product ["name"] = $(this).attr('data-name');
    // product ["Amount"] = $(this).attr('data-mrp');
    // product["Item_Name"] = $(this).attr('data-itemId');
    // product["Price_Master"] = $(this).attr('data-priceMasterId');
    // orderRecord.products.push(product);
  });
};

$("#searchValue").on("keyup", function() {
  let value = $(this)
    .val()
    .toLowerCase();

  items = backendItems.filter((ele, index) => {
    let isValid = true;
    let displayName = ele.Product__c ? ele.Product__r.Display_Name__c : "";
    displayName = displayName.toLowerCase();
    if (value && ele.Product__c && displayName.indexOf(value) == -1) {
      isValid = false;
    }
    if (selectedProductTotal.has(ele.Product__c)) {
      isValid = false;
    }
    return isValid;
  });
  getProduct();
});



showProducts = () => {
  $("#listOfItem").empty();
  let productList = orderRecord.products;
  var tmp = "";
  for (var i = 0; i < productList.length; i++) {
    tmp += '<div class="item">';
    tmp += '  <div class="item-content">';
    if (productList[i]["ItemImages"]) {
      tmp +=
        '   <img class="productImage" src="' +
        productList[i]["ItemImages"] +
        '"  style="vertical-align:top;"/>';
    } else if (itemImages && itemImages.has(productList[i].Item_Name)) {
      tmp +=
        '   <img class="productImage" src="data:image/png;base64, ' +
        itemImages.get(productList[i].Item_Name) +
        '"  style="vertical-align:top;"/>';
    } else {
      // When no image is found
    }
    tmp += '   <div class="desp">';
    tmp +=
      '    <p class="product-name" data-priceMaster="' +
      productList[i].Price_Master +
      '" data-itemId="' +
      productList[i].Item_Name +
      '">' +
      productList[i].name +
      "</p>";
    tmp +=
      '    <p class="product-mrp" data-amount=' +
      productList[i].Amount +
      " >&#x20B9; " +
      productList[i].Amount +
      "</p>";
    tmp += "   </div>";
    tmp += "  </div>";
    tmp += '  <div class="item-quantity">';
    tmp += '	<div class="button-container" style="margin-top:17%;">';
    tmp += '<button class="cart-btn cart-qty-minus" type="button" onclick="decrementQtn(this)"  data-index="'+i+'" value="-">-</button>';
    tmp += '<input type="number" pattern="[0-9]*" id="cases" name="qty" class="qty" maxlength="3" data-index="'+i+'"  max="100" value="'+(productList[i].Cases ? productList[i].Cases : 0 ) +'" onkeyup="handleQuantityChange(this)" class="input-text qty" data-quantity="'+productList[i].Cases+'"  />';
    
    tmp += '<button class="cart-btn cart-qty-plus" onclick="incrementQtn(this)" data-index="'+i+'" type="button" value="+">+</button>';
    tmp += '</div>';
    tmp += "  </div>";
    tmp += "</div>";
  }

  $("#listOfItem").prepend(tmp);
};

handleProductDelete = index => {
  let products = orderRecord.products;
  selectedProductTotal.delete(products[index].Item_Name);
  products.splice(index, 1);
  orderRecord.products = products;
  showProducts();
  getProduct();
  showSummary();
};

quantityBtn = (a, IdName) => {
  var $button = a;
  var inputName = $(IdName).attr("id");
  var index = $(a).attr("data-index");

  var oldValue = $button
    .parent()
    .find("#" + inputName)
    .val();
  if (oldValue === "Bottles" || oldValue === "Cases") {
    oldValue = 0;
  }
  if ($button.text() == "+") {
    var newVal = parseFloat(oldValue) + 1;
    orderRecord.products[index][
      inputName === "cases" ? "Cases" : "Bottles"
    ] = newVal;
  } else {
    if (oldValue === "1") {
      newVal = inputName === "cases" ? "0" : "Bottles";
      orderRecord.products[index][
        inputName === "cases" ? "Cases" : "Bottles"
      ] = 0;
    } else if (oldValue === "0" || oldValue === "0") {
      var newVal = oldValue;
      orderRecord.products[index][
        inputName === "cases" ? "Cases" : "Bottles"
      ] = 0;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
        orderRecord.products[index][
          inputName === "cases" ? "Cases" : "Bottles"
        ] = newVal;
      } else if (oldValue == 0) {
        newVal = inputName === "cases" ? "0" : "Bottles";
        orderRecord.products[index][
          inputName === "cases" ? "Cases" : "Bottles"
        ] = 0;
      }
    }
  }
  showSummary();
  $button
    .parent()
    .find("#" + inputName)
    .val(newVal);
};

showSummary = () => {
  $("#orderSummaryPage").empty();
  orderRec.Has_Zero_Quantity_Product = false;
  let countProductHasZeroQty = 0;
  const productLength = orderRecord.products.length;
  
  let tmp =
    '<h4 style="color:black">Cart <span class="price" style="color:black" ><i class="fa fa-shopping-cart"></i> <b >' +
    0 +
    "</b></span></h4>";
  let producttableConstruct = '';
  if (productLength === 0) {
    producttableConstruct += '<div class="text-center">No Products added!</div>';
  } else {

    let totalAmount = 0;
    let noOfProducts = 0;
    let totalNoOfCases = 0 ;
    orderRecord.products.forEach(ele => {
      if (ele.Cases && ele.Cases > 0) {
        let amountValue = 0;
        let numCases = 0;
        if (ele.Cases) {
          
          numCases = parseFloat(ele.Cases);
        } else {
         
          numCases = 0;
        }
        totalNoOfCases += numCases;
        if (ele.Amount) {
          const numAmount = parseFloat(ele.Amount);
          amountValue = numAmount * numCases;
        }
        totalAmount += amountValue;
        producttableConstruct += `<p ><a style="width:60%;display:inline-block;">${ele.name}</a><span class="text-center"  style="width:20%;display:inline-block;color: grey;vertical-align:top;">${numCases}</span><span class="text-right" style="width:20%;display:inline-block;color: grey;vertical-align:top;">₹ ${amountValue}</span></p>`;
        noOfProducts++;
      }
      else{
        countProductHasZeroQty++;
      }
      
    });
    if(noOfProducts===0){
      producttableConstruct += '<div class="text-center">No Products added!</div>';
    }
    else{
      tmp ='<h4 style="color:black">Cart <span class="price" style="color:black" ><i class="fa fa-shopping-cart"></i> <b >' +
      noOfProducts +
      "</b></span></h4>" ;
      
    }
    tmp += producttableConstruct;
    tmp += "<hr>";
    tmp += `<p><span style="width:59%;display:inline-block;">Total </span> <span  class="text-center"  style="width:20%;display:inline-block;color: grey;vertical-align:top;">${totalNoOfCases}</span> <span class="text-right" style="width:18%;color: grey;vertical-align:top;display:inline-block;"><b>₹ ${totalAmount}</b></span></p>`;
    
  }
  if(orderRecord.products.length === countProductHasZeroQty){
    orderRec.Has_Zero_Quantity_Product = true;
  }

  $("#orderSummaryPage").append(tmp);
  
};

let productJson = [];
getProductData = () => {
  productJson = [];
  $(".item").each(function() {
    var name = $(this)
      .children()
      .find(".product-name")
      .text();
    var cases = $(this)
      .children()
      .find("#cases")
      .val();
    var bottles = $(this)
      .children()
      .find("#bottles")
      .val();
    var amount = $(this)
      .children()
      .find(".product-mrp")
      .attr("data-amount");
    var productImages = $(this)
      .children()
      .find(".productImage")
      .attr("src");
    var itemId = $(this)
      .children()
      .find(".product-name")
      .attr("data-itemId");
    var priceMasterId = $(this)
      .children()
      .find(".product-name")
      .attr("data-priceMaster");
    item = {};
    item["name"] = name;
    if (cases === "Cases") {
      cases = 0;
    }
    if (bottles === "Bottles") {
      bottles = 0;
    }
    item["Cases"] = parseFloat(cases);
    item["Bottles"] = parseFloat(bottles);
    item["Amount"] = amount;
    item["TotalAmt"] = parseFloat(parseFloat(amount) * parseFloat(cases));
    item["Item_Name"] = itemId;
    item["Price_Master"] = priceMasterId;
    item["ItemImages"] = productImages;
    productJson.push(item);
  });

  
  
  orderRecord.products = productJson;
};
handleSelectedProducts = () => {
  for (let i of selectedProduct.entries()) {
    const backendPro = productMap.get(i[0]);

    if (!selectedProductTotal.has(backendPro.Product__c)) {
      let product = {
        name: backendPro.Product__c
          ? backendPro.Product__r.Display_Name__c
          : "",
        Amount: backendPro.Total_Billing_Price__c
          ? backendPro.Total_Billing_Price__c
          : 0,
        Item_Name: backendPro.Product__c,
        Price_Master: backendPro.Id
      };
      orderRecord.products.push(product);
      selectedProductTotal.add(backendPro.Product__c);
    }
  }
  selectedProduct.clear();
  getProduct();
  showProducts();
  showSummary();
};
checkout = async () => {

  if(!checkforPreSalesOrder()){
    getProductData();
    // orderRec.Comment = $("#salesOrderComment").val();
    await saveOrder();
  }
  
};

const checkforPreSalesOrder = () => {
  if(orderRec.Has_Zero_Quantity_Product){
    $('#reasonForNotLiking').modal('show');
    $('#salesOrderSubmit').modal('hide');
    let urlParam = new URLSearchParams(window.location.search);
    if(urlParam.has('presalesId'))
      orderRec.Product_Pre_Sales_Sampling = urlParam.get('presalesId');
    constructReasonNotLikingSelect();
    return true;
  }
  else{
    orderRec['Reasons_for_not_Liking_Product'] = null;
    orderRec['pricing_promotion_discount'] = null;
    orderRec['competition_tie_up'] = null;
    orderRec['operational_feedback'] = null;
    orderRec['Comment'] = null;
    
  }
  return false;
};

const constructReasonNotLikingSelect = () => {
  $('#reasonForNotLikingSelect').empty();
  let options = ["Pricing/ Promotion/ Discount" ,"Competition Tie-up","Operational Feedback","Other" ];
  let tmp = `<select class="form-control" multiple name="" id="reason" onchange="handleReasonSelectOption(this)">`;
  tmp += `<option>--None--</option>`;
  options.forEach(ele => {
    tmp += `<option  value="${ele}">${ele}</option>`;
  });
  tmp  += `</select>`;
  tmp += `<span class="reason showError">This Field is required</span><br/>`;
  $('#reasonForNotLikingSelect').append(tmp);
  $('#reason').val(orderRec.Reasons_for_not_Liking_Product ?orderRec.Reasons_for_not_Liking_Product : [] );                 
  handleReasonSelectOption(orderRec.Reasons_for_not_Liking_Product &&orderRec.Reasons_for_not_Liking_Product.length > 0 ?orderRec.Reasons_for_not_Liking_Product : [] );
          
};

const reasonsReRenderHelper = () => {
  $('#reasonForNotLikingSelect').empty();
  let options = ["Pricing/ Promotion/ Discount" ,"Competition Tie-up","Operational Feedback","Other" ];
  let tmp = `<select class="form-control" multiple name="" id="reason" onchange="handleReasonSelectOption(this)">`;
  tmp += `<option value="">--None--</option>`;
  options.forEach(ele => {
    tmp += `<option  value="${ele}">${ele}</option>`;
  });
  tmp  += `</select>`;
  tmp += `<span class="reason showError">This Field is required</span><br/>`;
  $('#reasonForNotLikingSelect').append(tmp);
  $('#reason').val(orderRec.Reasons_for_not_Liking_Product ?orderRec.Reasons_for_not_Liking_Product : [] );                 
};

handleProductRefresh = () => {
  items = backendItems.filter((ele, index) => {
    let isValid = true;
    let displayName = ele.Product__c ? ele.Product__r.Display_Name__c : "";
    displayName = displayName.toLowerCase();
    if (selectedProductTotal.has(ele.Product__c)) {
      isValid = false;
    }
    return isValid;
  });
  getProduct();
};

handlePageRedirect = async (value) => {
  getProductData();
  orderRec.Last_Modified = new Date();
  orderRec.isSynced = false;
  orderRec.Comment = $("#salesOrderComment").val();
  orderRec.Daily_Tracker = fetchCurrentDateIdStr();
  const position = await getCurrentLocationHelper();
  orderRec.Geolocation_Latitude = position.coords.latitude;
  orderRec.Geolocation_Longitude = position.coords.longitude;
  await writeData("salesOrderSync", orderRec);

  const recordTypeName = accountRec.RecordType.DeveloperName;

  if (recordTypeName === "Distributor_Warehouse") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Distributor") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "On_Premise_General") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Consumer") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Institutional_Off_Premise") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Institutional_On_Premise") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Non_beer_Warehouse") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Off_Premise_Outlet") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "On_Premise_Hotel") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Supplier") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Temporary_Event") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=" +
        accountRec.Id;
    }
  } else if (recordTypeName === "Wholesaler") {
    if (value === "Home") {
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isAudit){
            window.location.href =
            "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
            accountRec.Id;
        }
        else if(nonSales.isSales){
            window.location.href =
            "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=" +
            accountRec.Id;
        }
        else if(nonSales.isTech){
            window.location.href =
            "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
            accountRec.Id;
        }
      
    } else if (value === "Related") {
      window.location.href =
        "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=" +
        accountRec.Id;
    } else if (value === "Detail") {
      window.location.href =
        "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=" +
        accountRec.Id;
    } else if (value === "Media") {
      window.location.href =
        "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id=" +
        accountRec.Id;
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
    var inputName = $(ele).attr("id");
    var amount = Number($n.val());
    if (amount > 999) {
      value = 999;
     
    }
    else{
      value = Number($n.val()) + 1;
      
    }
   let index = $n.attr('data-index');
    
    orderRecord.products[index][
      "Cases" 
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
  var amount = Number($n.val());
  if (amount > 0) {
    
    value = amount -1;
  }
  let index = $n.attr('data-index');

  orderRecord.products[index][
     "Cases"
  ] = value;
  $n.val(value);
  showSummary();
};

handleQuantityChange = (ele) => {
  let val = $(ele).val();
  var inputName = $(ele).attr("id");
   let index = $(ele).attr('data-index');
  if(val<0){
    $(ele).val(0);

    orderRecord.products[index][
      "Cases"
    ] = 0;
    return;
  }
  if(val >999){
    $(ele).val(999);
    orderRecord.products[index][
       "Cases"
    ] = 999;

    return;
  }
  orderRecord.products[index][
     "Cases"
  ] = val;
  showSummary();
};




// Reason for not liking Product drop downs 
const subReason = new Map([
  ['Pricing/ Promotion/ Discount',['Landing Price higher than competition','Need better promotion offer','Need longer duration for promotion','Need more Discount']],
  ['Competition Tie-up',['Premium','Mass','Draft','Craft','Overall']],
  ['Operational Feedback',['Stock is not available regularly','Service is not regular',
    'Past issues not settled','Outlet needs more time to decide','Not met decision maker']],  
]);


const subReasonId = new Map([
  ['Pricing/ Promotion/ Discount','pricing_promotion_discount'],
  ['Competition Tie-up','competition_tie_up'],
  ['Operational Feedback','operational_feedback'],
  ['Other','Comment']
]);
const handleReasonSelectOption = (ele) =>{
  
  // if($(ele)&&$(ele).val().length === 0){
  //   $(`.${$(ele).attr('id')}`).css('display','block');
  // }else{
  //   $(`.${$(ele).attr('id')}`).css('display','none');
  // }
  reasonsReRenderHelper();
    let values ;
  try{
    values  = $(ele).val();
    if(!values){
      values = ele;
    }
  }
  catch(e){
    values = ele&&ele.length>0 ? ele : [] ;
  }
    
    $('#subReasons').html('');
  let tmp = '';
  orderRec.Reasons_for_not_Liking_Product = values;
  for(let i = 0;i<values.length;i++)
  {
    if(subReasonId.has(values[i])){
      if(values[i] !== 'Other'){
        
        tmp +=`
          <label>${values[i]}</label>
          <select name="" class="form-control" multiple  onchange="handleSubReasons(this)" id="${subReasonId.get(values[i])}">
          <option value="">--None--</option>
        `;
        for(let j = 0;j<subReason.get(values[i]).length;j++){
          const subReasonSelectedValue = orderRec && orderRec[subReasonId.get(values[i])] ? orderRec[subReasonId.get(values[i])] :'';
          const subReasonSelectedSet = new Set(subReasonSelectedValue.split(';'));
          tmp +=`
            <option ${subReasonSelectedSet.has(subReason.get(values[i])[j]) ? 'selected' : ''}  value="${subReason.get(values[i])[j]}">${subReason.get(values[i])[j]}</option>
          `;
        }
        tmp +='</select>';
        tmp +=`<span class="${subReasonId.get(values[i])} showError">This Field is required</span> <br/>`;
      }else{
        tmp +=`<label>For Other, Enter Reason here...</label>
          <textarea required class="form-control" value="${orderRec.Comment}" id="${subReasonId.get(values[i])}" onkeyup="handleSubReasons(this)" row="3">${orderRec.Comment ? orderRec.Comment : ''}</textarea>
          <span class="${subReasonId.get(values[i])} showError">This Field is required</span><br/>
          `;
  
      }
    }
    
  }

  $('#subReasons').append(tmp);
  
  
  
  

};

const handleSubReasons = (ele) => {
  
  if($(ele).attr('id')==='Comment'){
    orderRec[$(ele).attr('id')] = ($(ele).val());
  }
  else{
    handleReasonSelectOption(orderRec.Reasons_for_not_Liking_Product &&orderRec.Reasons_for_not_Liking_Product.length > 0 ?orderRec.Reasons_for_not_Liking_Product : [] );
    orderRec[$(ele).attr('id')] = ($(ele).val()).join(';');
  }
  

};

const submitPostReasonNotLiking = async() => {
  let isValid = true;
  
  if($('#reason').val().length === 0){
    $(`.reason`).css('display','block');
        isValid = false;
  }


  if(orderRec.Reasons_for_not_Liking_Product && orderRec.Reasons_for_not_Liking_Product.length > 0){
    for(let i of orderRec.Reasons_for_not_Liking_Product){
      if($(`#${subReasonId.get(i)}`).val().length === 0){
        $(`.${subReasonId.get(i)}`).css('display','block');
        isValid = false;
      }
      else{
        $(`.${subReasonId.get(i)}`).css('display','none')
      }
    }
  }

  if(isValid){  
  $('#reasonForNotLiking').modal('hide');
  
  getProductData();
  await saveOrder();
  }
  else{
    showNotification({message : 'Fill all mandatory fields !'});
  }
};