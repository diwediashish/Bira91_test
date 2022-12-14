

const initializeHomePage = () =>{
    createmaintenanceVisits()
    createPendingInstall();
    createPendingPullout();  
    
}

let accounts =[];

showDropdown = () => {
    $("#searchElement").empty();
    let tmp = '';
    
    for (var i = 0; i < accounts.length; i++) {
  
        tmp += '<li class="account-card" onclick="handleAccountSearchClicked(this)" data-id="'+accounts[i].Id+'"><a>';
        tmp += '<img src="../../media/images/homePage/todays-visit.png"/>';
        tmp += '<div class="accountSearch">'+ accounts[i].Name+'<br/> <span>'+(accounts[i].Channel__c ? accounts[i].Channel__c : '')+'</span>';
        tmp += '</div>';
        tmp += '</a></li>';
    }
  
    $("#searchElement").prepend(tmp);
};

 

  //setup before functions
let typingTimer;                //timer identifier
let doneTypingInterval = 1000;  //time in ms, 5 second for example
let $input = $('#searchValue');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(applyFilter, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});
const applyFilter =async () => {
    var value = $('#searchValue').val().toLowerCase();
    let limit = 5;
    accounts = [];
    
     
    if(value){
        let openCursor = await keyBasedSearchingIndexedDB('account',value.toUpperCase());
        while(accounts.length<limit){
        if((openCursor&&openCursor._request.result===null)||!openCursor ){
            break;
        }
        let valueReturned =await fetchFromCursorAccountListView(openCursor);
        
        if(valueReturned.Name&&(((valueReturned.Name).toLowerCase()).indexOf(value)>-1)){
            accounts.push(valueReturned);
        }
        
        await openCursor.continue();
        
    }
        showDropdown();
        $("#searchElement li").css('display','block');
    }
    else{
        $("#searchElement li").css('display','none');
    }

};

handleAccountSearchClicked = (accountInstance) => {
  const accountId = $(accountInstance).attr('data-id');
  let element ={
      dataset : {
          accountid : accountId
      }
  };
  handleAccountClicked(element);
};
// filterFunction = () => {
//   var input, filter, ul;
//   ul = document.getElementById("searchElement");
//   input = document.getElementById("searchValue");
//   filter = input.value.toUpperCase();
//   li = ul.getElementsByTagName("li");

//   for (var i = 0; i < accountRec.length; i++) {
//       txtValue = li[i].textContent || li[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != '') {
//           li[i].style.display = "block";
//       } else {
//           li[i].style.display = "none";
//       }
//   }

// };


// For Pending Installations
let pendingInstallation = [];

let currentCheckIn;

const createPendingInstall = () =>{
    
    $("#pending-installations").empty();
    let tmp = "";
    if(pendingInstallation.length > 0)
    {
        for(let i of pendingInstallation){
        
          tmp +=  createSection(i,i.Account__r);
        }
    }
    else{
        tmp += `
        <div class="alert" style="text-align:center;">
          <strong>Info!</strong> No Visit Found!
        </div>`;
    }
    
    $("#pending-installations").append(tmp);
}



// For Pending Pullouts
let pendingPullOut = [];

const createPendingPullout = () =>{
    $("#pending-pullouts").empty();
    let tmp1 = "";

    if(pendingPullOut.length > 0)
    {
        for(let i of pendingPullOut){
            
          tmp1 +=  createSection(i,i.Account__r);
        }
    }
    else{
        tmp1 += `
        <div class="alert" style="text-align:center;">
          <strong>Info!</strong> No Visit Found!
        </div>`;
    }

    $("#pending-pullouts").append(tmp1);
}



// For Maintenance Visits
let maintenanceVisits = [];

const createmaintenanceVisits = () =>{
    $("#maintenance-visits").empty();
    let tmp3 = "";
    if(maintenanceVisits.length > 0)
    {
        for(let i of maintenanceVisits){
          tmp3 +=  createSection(i,i.Account__r);
        }
    }else{
        tmp3 += `
        <div class="alert" style="text-align:center;">
          <strong>Info!</strong> No Visit Found!
        </div>`;
    }
    

    $("#maintenance-visits").append(tmp3);
}
handleAccountClicked = async (element) => {
    let accountRec = await getItemFromStore('account',(element.dataset.accountid));
    const nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isTech)
        window.location.href = `/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=${accountRec.Id}`;
    else if(nonSales.isAudit)
        window.location.href = `/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=${accountRec.Id}`;
};

const createSection = (event,accountRecord) =>{
    
    let tmp = '';
    tmp += '<li data-accountId='+accountRecord.Id+' data-eventId='+event.Id+' onclick=handleClickedEvent(this)>';
    tmp += '    <div class="main-head">';
    let eventStatus = ' <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>';
  if(currentCheckIn&&currentCheckIn.eventKey==event.App_Id__c){
      eventStatus = '<img class="" src="/media/icons/accountSegmentation/inprogress.jpg" alt="">';
  }
  else if(event.Completed__c){
      eventStatus = '<img class="" src="/media/icons/accountSegmentation/completed.jpg" alt="">';
    }
    //tmp += '   '+eventStatus+'      <span class="accountName">' + event.Name + '</span>  <br/>';
    tmp += '      <div class="heading">';
    tmp += '   '+eventStatus+'      <span class="accountName">' + accountRecord.Name + '</span>';
    tmp += '<p style="margin-left:3%;"><b>Type: </b>'+event.Type__c+'</p>';
    
    if((accountRecord.Channel__c&&accountRecord.Account_Status__c)){
      tmp += '       <p style="margin-left:3%;">' + (accountRecord.Channel__c ? accountRecord.Channel__c+'<span> | </span>' : 'NA');
      tmp += '         ' + (accountRecord.Account_Status__c ? accountRecord.Account_Status__c : '') + '</p>';
    }
    else{
        if(accountRecord.Channel__c){
          tmp += '       <p style="margin-left:3%;">' + (accountRecord.Channel__c ? accountRecord.Channel__c+'</p> ' : 'NA');
        }
        if(accountRecord.Account_Status__c){
          tmp += '       <p style="margin-left:3%;">' + (accountRecord.Channel__c ? accountRecord.Channel__c+' </p>' : 'NA');
        }
    }
    if ((accountRecord.L3M_Billed_Liquids__c && accountRecord.L1M_Billed_Liquids__c)) {
        tmp += '       <p style="margin-left:3%;">' + (accountRecord.L1M_Billed_Liquids__c ? accountRecord.L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
        tmp += '         ' + (accountRecord.L3M_Billed_Liquids__c ? accountRecord.L3M_Billed_Liquids__c : '') + '</p>';
    }
    else {
        if (accountRecord.L3M_Billed_Liquids__c) {
            tmp += '       <p style="margin-left:3%;">' + (accountRecord.L3M_Billed_Liquids__c ? accountRecord.L3M_Billed_Liquids__c + '</p>' : 'NA');
        }
        if (accountRecord.L1M_Billed_Liquids__c) {
            tmp += '       <p style="margin-left:3%;">  ' + (accountRecord.L1M_Billed_Liquids__c ? accountRecord.L1M_Billed_Liquids__c : '') + '</p>';
        }
    }
   if(accountRecord.Recent_Retail_Depletion__c){
      tmp += '       <p style="margin-left:3%;">Last Order : ' + (accountRecord.Recent_Retail_Depletion__c? new Date(accountRecord.Recent_Retail_Depletion__c).toLocaleString("en-IN", {
          day: 'numeric',
          month: 'short'
      })+'</p>' : '');
   }
   if(accountRecord.Beer_Selection__c === "Boom"){
      tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
  }

  if(accountRecord.Beer_Selection__c === "Premium"){
      
      tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
  }
    tmp += '      </div>';
    
    tmp += '       <div class="feat">';
    tmp += '         <div>';
    
    if(accountRecord.Bira_Segment__c != null)
    {   
        if(accountRecord.Bira_Segment__c === "A+"){
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
        }else if(accountRecord.Bira_Segment__c === "A"){
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
        }else if(accountRecord.Bira_Segment__c === "B"){
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
        }else {
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
        }
       
    }
    else {
        tmp += '  <span class="name"></span>';
    }

    if(accountRecord.Industry_Segment__c != null)
    {
        if(accountRecord.Industry_Segment__c === "P0"){
            tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
        }else if(accountRecord.Industry_Segment__c === "P1"){
            tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
        }else if(accountRecord.Industry_Segment__c === "P2"){
            tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
        }else {
            tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
        }
    }
    else {
        tmp += '  <span class="name"></span>';
    }

    if(accountRecord.Industry_Segment_Mass__c != null)
    {
        if(accountRecord.Industry_Segment_Mass__c === "M0"){
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
        }else if(accountRecord.Industry_Segment_Mass__c === "M1"){
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
        }else if(accountRecord.Industry_Segment_Mass__c === "M2"){
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
        }else {
            tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
        }
        
    }
    else {
        tmp += '  <span class="name"></span>';
    }

    tmp += '         </div>';
    tmp += '       <div >';

    if (accountRecord.Beacon_Flag__c === true) {
        
        tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
    }
    else {
        tmp += '  <span class="name"></span>';
    }

    if (accountRecord.Draft_Ready__c === true) {
        tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';   
    }
    else {
        tmp += '  <span class="name"></span>';
    }

    if (accountRecord.QCO_Flag__c === true) {
        tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
    }
    else {
        tmp += '  <span class="name"></span>';
    }

    tmp += '      </div>';
    tmp += '         </div>';
    tmp += '       </div>';
 
      
    
    tmp += '    </div>';
    tmp += '</li>';

    return tmp;
}

const renderTodaysTasks = async() => {
    let tasks = await fetchTodaysTasks();
    let tmp = '';
    let loginData =await loginDataFetch();
    let isValid = true;    
    $('#todaysVisits').empty();
    if(tasks.length>0){
        for (let ele of tasks){
            if(ele.OwnerId === loginData[0].Id){
            isValid = false;
            let accountRec = await getItemFromStore('account',ele.WhatId);
            tmp +=`<div class="media">
            <div class="media-left" style="font-size:29px;">
            <i class="fas fa-tasks"></i>
            </div>
            <div class="media-body">
              <h4 class="media-heading"><div style="float:left;">${ele.Subject}</div>
              <div style="text-align:right;"> ${ele.Status==='Open' ? `<i onclick="handleCompleteTask('${ele.Unique_Identifier__c}')" class="fas fa-clipboard-check"></i>` : '<i style="color:green;" class="fas fa-check-square"></i>' }</div>
              </h4>
              <h4><small>Related To : ${accountRec?accountRec.Name : '' } <br/> Description : ${ele.Description ?ele.Description : '' } <br/>
                Priority : ${ele.Priority ? ele.Priority : ''}
            </small></h4>
            </div>
          </div>`;
            }
        }
    }

    if(isValid){
        tmp += `
        <div class="alert" style="text-align:center;">
          <strong>Info!</strong> No Task Found!
        </div>`;
    }
    $('#todaysVisits').append(tmp);
  };

  const renderTodaysMeeting = (standardEventsList) => {
    let tmp = '';
    
    $('#todaysMeeting').empty();
    if(standardEventsList.length>0){
        standardEventsList.forEach(async ele => {
            let startDate = new Date(ele.StartDateTime).toLocaleString("en-GB", {
                timeZone : 'UTC',hour: '2-digit', minute: '2-digit',hour12: true
              });

            let endDate = new Date(ele.EndDateTime).toLocaleString("en-GB", {
                timeZone : 'UTC',hour: '2-digit', minute: '2-digit',hour12: true
            });
            tmp +=`
            <div class="media" onclick="handleToShowTodaysMeeting('${ele.Id}','${startDate}','${endDate}')">
                <div class="media-left" style="font-size:29px;">
                    <i class="fas fa-tasks"></i>
            
                </div>
                <div class="media-body">
                    <h4 class="media-heading">${ele.Subject}
                    </h4>
                    <div style="text-align:left;"> Start Time : ${startDate}</div>
                    <div style="text-align:left;"> End Time : ${endDate}</div>
                </div>
            </div>
                `;
              
        });
    }
    else{
        tmp += `
        <div class="alert" style="text-align:center;color:grey">
          No Meetings Found
        </div>`;
    }
    $('#todaysMeeting').append(tmp);
  };


  handleToShowTodaysMeeting = (Id,startDate,endDate) =>{
    let eventDetails = mappingStandardEventIds.get(Id); 
    $('#todaysMeetingModal .modal-body').html('');
    let tmp = `
        <p><b>Subject</b> : ${eventDetails.Subject}</p>
        <p><b>Start Time</b> : ${startDate ? startDate : ''}</p>
        <p><b>End Time</b> : ${endDate ? endDate : ''}</p>
        <p><b>Location</b> : ${eventDetails.Location ? eventDetails.Location : ''}</p>
        <p><b>Description</b> : ${eventDetails.Description ? eventDetails.Description : ''}</p>
    `;

    $('#todaysMeetingModal .modal-body').append(tmp);

    $('#todaysMeetingModal').modal('show');
  }


  handleCompleteTask =async (ele) => {
    let resp = confirm('Are you sure you want to complete the task ?');
    if(resp){
        let taskRecord = await getItemFromStore('taskOriginal',ele);
        if(taskRecord){
            taskRecord.Status = 'Completed';
        await writeData('taskOriginal',taskRecord);
        await writeData('taskSync',taskRecord);
        renderTodaysTasks();
        }
        
    }

  };    

const handleClickedEvent =async(ele)  => {
    const eventId = $(ele).attr('data-eventId');
    let event = await getItemFromStore('events',eventId);
    if(currentCheckIn&&currentCheckIn.eventKey!==event.App_Id__c){
        showNotification({message : `Event ${currentCheckIn.account.Account_Name_IndexedDB_Helper__c} is already in progress.Please complete the same before starting another!`});
        return;
    }
    eventRedirect(eventId);
};
