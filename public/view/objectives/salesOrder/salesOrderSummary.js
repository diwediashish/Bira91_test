
let orderRecord;
initializeOrderFrontEnd = (orderRec) =>{
  orderRecord = orderRec;
  showProducts();
  //$('.orderType').html(orderRecord.Order_Type);
};   

initializeProductsFrontEnd = () => {

};



showProducts = () =>{
    $('#listOfSummaryProd').empty();
    
      let productList = orderRecord.products;
      var tmp = '';
      let totalAmount = 0;
      for(var i=0;i < productList.length;i++)
      {   
          tmp+='<div class="item">';
          tmp+='  <div class="item-content">';
          if(productList[i]['ItemImages']){
            tmp+='   <img class="productImage" src="'+productList[i]['ItemImages']+'" alt="product image"/>';
          }
          else{
           // When no image is found
          }
          tmp+='   <div class="desp">';
          tmp+='    <p class="product-name" data-priceMaster="'+productList[i].Price_Master+'" data-itemId="'+productList[i].Item_Name+'">'+productList[i].name+'</p>';
          tmp+='    <p class="product-mrp">WSP : INR '+productList[i].Amount+'</p>';
          tmp+='    <p class="product-mrp">Cases :  '+productList[i].Cases+'</p>';
          tmp+='   </div>';
          tmp+='  </div>';
          tmp+='  <div class="total-quantity"> ₹'+productList[i].TotalAmt;
          tmp+='  </div>';
          tmp+='</div>';
          totalAmount += parseFloat(productList[i].TotalAmt);
      }
      $('.totalAmount').html('₹ ' +totalAmount);
      $('#listOfSummaryProd').prepend(tmp); 
      
  };
  
