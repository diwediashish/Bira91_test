
// let retailDepletionList = [
//     {
//         Date__c: "2020-04-06T00:00:00.000Z",
//         Item__c: "Bira91 Blonde Summer Lager 500ml Cans (24 Can)",
//         Item__r: {Display_Name__c: "Bira91 Blonde Summer Lager 500ml Cans (24 Can)"},
//         Last_90_Days__c: true,
//         Last_180_Days__c: "true",
//         Liquid_Name__c: "Blonde",
//         Name: "a095D000003Jqqu",
//         Physical_Cases__c: 100
//     },
//     {
//         Date__c: "2019-12-24T00:00:00.000Z",
//         Item__c: "Bira91 Blonde Summer Lager 500ml Cans (24 Can)",
//         Item__r: { Display_Name__c: "Bira91 Blonde Summer Lager 500ml Cans (24 Can)"},
//         Last_90_Days__c: false,
//         Last_180_Days__c: "true",
//         Liquid_Name__c: "Blonde",
//         Name: "a095D000003Jqqw",
//         Physical_Cases__c: 100,
//     }
// ];


 retailDepletion = (retailDepletionList) =>{
    $('#retailPanel').html('');
    if(retailDepletionList && retailDepletionList.length > 10){
        $('#countRetail').append(`(10+)`);
    }else{
        $('#countRetail').append(`(${retailDepletionList ? retailDepletionList.length : 0})`);
    }

    if(retailDepletionList){
       
    var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Order Date</th><th>Item</th><th>Quantity</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < retailDepletionList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        row1+='<td>'+new Date(retailDepletionList[i].Date__c).toLocaleDateString('en-US',options)+'</td>';
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
    if(contactList && contactList.length > 10){
        $('#countContact').append(`(10+)`);
    }else{
        $('#countContact').append(`(${contactList ? contactList.length : 0})`);
    }
    if(contactList){
        
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
    if(productsList){
        
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
        $('#countOrder').append(`(${salesOrderList ? salesOrderList.length : 0})`);
    }
    if(salesOrderList&&salesOrderList.length>0){
          
        var table = $('<table></table>').addClass('table table-responsive');
    var trHead = $('<tr></tr>');
    var tdHead = $('<th>Name</th><th>Date</th><th>Amount</th>');
    table.append(trHead);
    trHead.append(tdHead);
    
    for(var i = 0; i < salesOrderList.length;i++){
        var row = $('<tr></tr>');
        var row1 = '';
        
        row1+='<td style="color:blue;" data-toggle="modal" data-target="#salesOrderModal" onclick=showProducts("'+salesOrderList[i].Id+'")>'+salesOrderList[i].Name+'</td>';
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        row1+='<td>'+new Date(salesOrderList[i].CreatedDate).toLocaleDateString('en-US',options)+'</td>';
        row1+='<td>'+salesOrderList[i].Total_Amount__c+'</td>';
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

   
    
   
