events = (eventList) =>{
    $('#events').html('');

    if(eventList.length > 10){
        $('#eventsCount').append(`(10+)`);
    }else{
        $('#eventsCount').append(`(${eventList.length})`);
    }
    if(eventList&&eventList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Subject</th><th>Date</th><th>Completed</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < eventList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td>'+eventList[i].Name+'</td>';
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        row1+=`<td>${eventList[i].Start_date_and_time__c ? new Date(eventList[i].Start_date_and_time__c).toLocaleDateString('en-GB',options) :''}</td>`;
        row1+=`<td>${eventList[i].Completed__c ? '<i class="fas fa-check"></i>' : 'Not Completed'}</td>`;
        table.append(row);
        row.append(row1);
    }
    $('#events').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Events Found!';
        temp += '</div>';
        $('#events').prepend(temp);
    }
    
};


stockVisibility = (stockVisibilityList) =>{
    $('#stockVisibility').html('');

    if(stockVisibilityList.length > 10){
        $('#stockCount').append(`(10+)`);
    }else{
        $('#stockCount').append(`(${stockVisibilityList.length})`);
    }
    if(stockVisibilityList&&stockVisibilityList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Date</th>');
    table.append(trHead);
    trHead.append(tdHead);
   // console.log(stockVisibilityList)
    for(var i = 0; i < stockVisibilityList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td style="color:blue" data-toggle="modal" data-target="#salesOrderModal" onclick=showStockProduct("'+stockVisibilityList[i].Id+'")>'+stockVisibilityList[i].Name+'</td>';
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        row1+='<td>'+ new Date(stockVisibilityList[i].CreatedDate).toLocaleDateString('en-GB',options)+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#stockVisibility').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Stock Visibility Found!';
        temp += '</div>';
        $('#stockVisibility').prepend(temp);
    }
    
};


preSalesSampling = (preSalesSamplingList) =>{
    $('#preSalesSampling').html('');

    if(preSalesSamplingList.length > 10){
        $('#preSalesCount').append(`(10+)`);
    }else{
        $('#preSalesCount').append(`(${preSalesSamplingList.length})`);
    }
    if(preSalesSamplingList&&preSalesSamplingList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th> Date</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < preSalesSamplingList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td style="color:blue" data-toggle="modal" data-target="#salesOrderModal" onclick=showPreSalesProduct("'+preSalesSamplingList[i].Id+'") >'+preSalesSamplingList[i].Name+'</td>';
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        row1+='<td>'+ new Date(preSalesSamplingList[i].CreatedDate).toLocaleDateString('en-GB',options)+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#preSalesSampling').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Pre Sales Sampling Found!';
        temp += '</div>';
        $('#preSalesSampling').prepend(temp);
    }
    
};
posmRequisition = (posmRequisitionList) =>{
    $('#posmRequisition').html('');
   // console.log(posmRequisitionList);
    if(posmRequisitionList.length > 10){
        $('#posmCount').append(`(10+)`);
    }else{
        $('#posmCount').append(`(${posmRequisitionList.length})`);
    }
    if(posmRequisitionList&&posmRequisitionList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Date</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < posmRequisitionList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td  style="color:blue" data-toggle="modal" data-target="#salesOrderModal" onclick=showPOSMProduct("'+posmRequisitionList[i].Id+'")>'+posmRequisitionList[i].Name+'</td>';
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        row1+=`<td>${posmRequisitionList[i].Requisition_Date__c ? new Date(posmRequisitionList[i].Requisition_Date__c).toLocaleDateString('en-GB',options) :''}</td>`;
      //  row1+=`<td>${posmRequisitionList[i].Status__c ? posmRequisitionList[i].Status__c : ''}</td>`;
        
        table.append(row);
        row.append(row1);
    }
    $('#posmRequisition').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No POSM Requisition Found!';
        temp += '</div>';
        $('#posmRequisition').prepend(temp);
    }
    
};
draftRequest = (draftRequestList) =>{
    
    $('#pastDraftRequest').html('');
    
    if(draftRequestList.length > 10){
        $('#draftRequest').append(`(10+)`);
    }else{
        $('#draftRequest').append(`(${draftRequestList.length})`);
    }
    if(draftRequestList&&draftRequestList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Machine Id</th><th>Date</th><th>Status</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < draftRequestList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+=`<td style="color:blue" data-toggle="modal" data-target="#salesOrderModal" onclick="draftItems('${draftRequestList[i].Display_Machine_Id__c}','${draftRequestList[i].Status__c}')">${draftRequestList[i].Display_Machine_Id__c}</td>`;
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        row1+='<td>'+(draftRequestList[i].Requisition_Date__c ? new Date(draftRequestList[i].Requisition_Date__c).toLocaleDateString('en-GB',options) : '')+'</td>';
        // row1+='<td>'+draftRequestList[i].Number__c+'</td>';
        // row1+='<td>'+draftRequestList[i].Deposit_Amount__c+'</td>';
        row1+=`<td>${draftRequestList[i].Status__c ? draftRequestList[i].Status__c :''}</td>`;
        table.append(row);
        row.append(row1);
    }
    $('#pastDraftRequest').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Draft Request Found!';
        temp += '</div>';
        $('#pastDraftRequest').prepend(temp);
    }
       
    
};




retailDepletion = (retailDepletionList) =>{
    $('#retailPanel').html('');
    if(retailDepletionList.length > 10){
        $('#countRetail').append(`(10+)`);
    }else{
        $('#countRetail').append(`(${retailDepletionList.length})`);
    }
    if(retailDepletionList&&retailDepletionList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Date</th><th>Item</th><th>Quantity</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < retailDepletionList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        row1+='<td>'+new Date(retailDepletionList[i].Date__c).toLocaleDateString('en-GB',options)+'</td>';
        row1+='<td>'+(retailDepletionList[i].Item__c ?retailDepletionList[i].Item__c : '') +'</td>';
        row1+='<td>'+retailDepletionList[i].Physical_Cases__c+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#retailPanel').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Retail Depletion Found!';
        temp += '</div>';
        $('#retailPanel').prepend(temp);
    }
       
    
};



showContacts = (contactList) =>{
    if(contactList.length > 10){
        $('#countContact').append(`(10+)`);
    }else{
        $('#countContact').append(`(${contactList.length})`);
    }
    if(contactList&&contactList.length>0){
        var table = $('<table class="table table-striped"></table>').addClass('foo');
        var trHead = $('<tr></tr>');
        
        var tdHead = $('<th>Name</th><th>Role</th><th>Mobile</th>');
        table.append(trHead);
        trHead.append(tdHead);
    
    for(var i = 0; i < contactList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+=`<td><a href="/view/contactDetail/contactDetail.html?accountId=${accountRec.Id}&&contactId=${contactList[i].Id}" >${contactList[i].Name}</a></td>`;
        row1+='<td>'+(contactList[i].Role__c ?contactList[i].Role__c : '' )+'</td>';
        row1+='<td>'+(contactList[i].Phone ? contactList[i].Phone :'' )+'</td>';
        table.append(row);
        row.append(row1);
    }    
    $('#contactPanel').append(table);
    }
    else{
        let temp = '<div style="text-align:center">';
        temp += 'No Contacts Found!';
        temp += '</div>';
        $('#contactPanel').prepend(temp);
    }
};

showProducts = (salesOrder) =>{
    //productsList = JSON.parse(productsList);
    let productsList = [];
    if(productMap.has(salesOrder)){
        productsList = productMap.get(salesOrder);
    }
    $('#salesOrderProduct').html('');
    if(productsList&&productsList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Item Name</th><th>Cases</th><th>Amount</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < productsList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+='<td>'+(productsList[i].Item_Name__c ? productsList[i].Item_Name__r.Name : '') +'</td>';
        row1+='<td>'+productsList[i].Cases__c+'</td>';
        row1+='<td>'+productsList[i].Amount__c+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#salesOrderProduct').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Products Found!';
        temp += '</div>';
        $('#salesOrderProduct').prepend(temp);
    }
       
    
};

salesOrder = (salesOrderList) =>{
    $('#salesOrder').html('');

    if(salesOrderList.length > 10){
        $('#countOrder').append(`(10+)`);
    }else{
        $('#countOrder').append(`(${salesOrderList.length})`);
    }
    if(salesOrderList&&salesOrderList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Date</th><th>Cases</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < salesOrderList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td style="color:blue;" data-toggle="modal" data-target="#salesOrderModal" onclick=showProducts("'+salesOrderList[i].Id+'")>'+salesOrderList[i].Name+'</td>';
        var options = {
day: "2-digit",
month: "2-digit",
year: "numeric",
};
        let salesCases = salesOrderList[i].Total_Cases__c ? salesOrderList[i].Total_Cases__c : 0;
        row1+='<td>'+new Date(salesOrderList[i].CreatedDate).toLocaleDateString('en-GB',options)+'</td>';
        row1+='<td>'+salesCases+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#salesOrder').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Sales Order Found!';
        temp += '</div>';
        $('#salesOrder').prepend(temp);
    }
       
    
};


showPOSMProduct =async (posmId) =>{
    //productsList = JSON.parse(productsList);
    
    let productsList = await fetchRecordsUsingIndex('posmItems','POSM_Requisition__c',posmId);
    
    $('#salesOrderProduct').html('');
    if(productsList&&productsList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Item Name</th><th>Quantity</th><th>Status</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < productsList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+='<td>'+(productsList[i].Product__r ? productsList[i].Product__r.Name : '') +'</td>';
        row1+='<td>'+(productsList[i].Quantity__c ? productsList[i].Quantity__c : '0')+'</td>';
        row1+='<td>'+(productsList[i].Status__c ? productsList[i].Status__c : '' )+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#salesOrderProduct').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Products Found!';
        temp += '</div>';
        $('#salesOrderProduct').prepend(temp);
    }
       
    
};


showPreSalesProduct =async (preSalesId) =>{
    //productsList = JSON.parse(productsList);
    let productsList = await fetchRecordsUsingIndex('samplingChilds','Product_Pre_Sales_Sampling__c',preSalesId);
    
    $('#salesOrderProduct').html('');
    if(productsList&&productsList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Liquid</th><th>SKU</th><th>Type</th><th>Quantity</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < productsList.length;i++){
        if(productsList[i].SKU__c && productsList[i].Type__c)
        {
            var row = $('<tr></tr>');
            var row1 = '';
            row1+='<td>'+(productsList[i].Liquid_Layer__r.Name ? productsList[i].Liquid_Layer__r.Name : '') +'</td>';
            row1+='<td>'+(productsList[i].SKU__c ?productsList[i].SKU__c  : '' )+'</td>';
            row1+='<td>'+(productsList[i].Type__c ?productsList[i].Type__c  : '' )+'</td>';
            row1+='<td>'+(productsList[i].Quantity__c ?productsList[i].Quantity__c  : '' )+'</td>';
            table.append(row);
            row.append(row1);
        }
    }
    $('#salesOrderProduct').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Products Found!';
        temp += '</div>';
        $('#salesOrderProduct').prepend(temp);
    }
       
    
};
draftItems =async (draftId,status) =>{
    //productsList = JSON.parse(productsList);
    let productsList = await fetchRecordsUsingIndex('draftItems','MachineId__c',draftId);
    
    $('#salesOrderProduct').html('');
    if(productsList&&productsList.length>0){
    if(status !== 'PullOut Done'){

        var table = $('<table></table>').addClass('table table-responsive');
        var trHead = $('<tr></tr>');
        var tdHead = $('<th>Product Name</th><th>Quantity</th>');
        table.append(trHead);
        trHead.append(tdHead);
        
        for(var i = 0; i < productsList.length;i++){
            if(productsList[i].Product__r){
                var row = $('<tr></tr>');
                var row1 = '';
                row1+='<td>'+(productsList[i].Product__r ? productsList[i].Product__r.Name : '') +'</td>';
                row1+='<td>'+(productsList[i].Quantity__c ?productsList[i].Quantity__c : '' )+'</td>';
            
                table.append(row);
                row.append(row1);
            }
        }
    
    $('#salesOrderProduct').append(table); 
    }else{
        
        var table = $('<table></table>').addClass('table table-responsive');
        var trHead = $('<tr></tr>');
        var tdHead = $('<th>Product Name</th><th>Quantity</th><th>Pullout Quantity</th>');
        table.append(trHead);
        trHead.append(tdHead);
        
        for(var i = 0; i < productsList.length;i++){
            if(productsList[i].Product__r && productsList[i].Pullout_Quantity__c){
                var row = $('<tr></tr>');
                var row1 = '';
                row1+='<td>'+(productsList[i].Product__r ? productsList[i].Product__r.Name : '') +'</td>';
                row1+='<td>'+(productsList[i].Quantity__c ?productsList[i].Quantity__c : '' )+'</td>';
                row1+='<td>'+(productsList[i].Pullout_Quantity__c ?productsList[i].Pullout_Quantity__c : '' )+'</td>';
            
                table.append(row);
                row.append(row1);
            }
        }
    
    $('#salesOrderProduct').append(table); 
    }
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Products Found!';
        temp += '</div>';
        $('#salesOrderProduct').prepend(temp);
    }
       
    
};

showStockProduct = async (stockId) => {
    let productsList = await fetchRecordsUsingIndex('stockChilds','Stock_Visibility_Survey__c',stockId);
    
    $('#salesOrderProduct').html('');
    if(productsList&&productsList.length>0){
        
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Product Name</th><th>Quantity</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < productsList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        row1+='<td>'+(productsList[i].Name ? productsList[i].Name : '')+'</td>';
        row1+='<td>'+(productsList[i].Item_Master__r ? productsList[i].Item_Master__r.Name : '') +'</td>';
        row1+='<td>'+(productsList[i].Quantity__c ? productsList[i].Quantity__c : '')+'</td>';
        table.append(row);
        row.append(row1);
    }
    $('#salesOrderProduct').append(table); 
    }
    else{
        
        let temp = '<div style="text-align:center">';
        temp += 'No Products Found!';
        temp += '</div>';
        $('#salesOrderProduct').prepend(temp);
    }
       
};
   
