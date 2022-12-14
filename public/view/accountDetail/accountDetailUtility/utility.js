
accountRec = {
};


const objectiveArray = ['Sales Order','Stock/Visibility Survey','Pre-Sales','Competition Insights','KYC and Classification','POSM Requisition','Draft Sign-Up','Draft Pullout'];
const functionalityDeveloped = new Map([
    ['Sales Order',true],
    ['Stock/Visibility Survey',true],
    ['Pre-Sales',true],
    ['Competition Insights',true],
    ['KYC and Classification',true],
    ['POSM Requisition',true],
    ['Draft Sign-Up',true],
    ['Draft Pullout',true],
]);


const objectiveOrder = new Map ([
    ['Sales Order',1],
    ['Stock/Visibility Survey',2],
    ['Pre-Sales',3],
    ['Competition Insights',4],
    ['KYC and Classification',5],
    ['POSM Requisition',6],
    ['Draft Sign-Up',6],
    ['Draft Pullout',7]
]);
const objectiveLabel = new Map([
    ['Sales Order','Sales Order'],
    ['Stock/Visibility Survey','Stock & Visibility'],
    ['Pre-Sales','Pre-Sales'],
    ['Competition Insights','Competition Insights'],
    ['KYC and Classification','KYC'],
    ['POSM Requisition','POSM Requisition'],
    ['Draft Sign-Up','Draft Sign-Up'],
    ['Draft Pullout','Draft Pullout']
]);


showAccount = () => {
    
    var tmp = '';
        tmp += '<div class="accountList  '+(accountRec.Location__c ?accountRec.Location__c: '' )+' ' + (accountRec.Size_Format__c ?accountRec.Size_Format__c :'' ) +' ' + (accountRec.Industry_Segment__c ?accountRec.Industry_Segment__c : '' ) + ' ' + (accountRec.Sub_Channel__c? accountRec.Sub_Channel__c : '') + '" data-beacon="'+(accountRec.Beacon_Flag__c ? accountRec.Beacon_Flag__c : '')+'" data-status="'+(accountRec.Account_Status__c ? accountRec.Account_Status__c.charCodeAt() : '')+'" data-qco="'+(accountRec.QCO_Flag__c ?accountRec.QCO_Flag__c : '' )+'" data-segment="'+(accountRec.Bira_Segment__c ? accountRec.Bira_Segment__c.charCodeAt() : '' )+'">';
        tmp += '    <div class="main-head">';
        tmp += '      <div class="heading">';
        tmp += '<span>' + (accountRec.Name ?accountRec.Name : '' ) + '</span> <br/>';
        tmp += '<p> ';
        tmp += '         ' + (accountRec.Neighbourhood__c ? accountRec.Neighbourhood__c : '');
        tmp += '</p>';
        tmp += '      </div>';
        tmp += '       <div class="feat">';
        tmp += '         <div>';
        
        if(accountRec.Bira_Segment__c != null)
        {   
            if(accountRec.Bira_Segment__c === "A+"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/a+.png" alt=""></span>';
            }else if(accountRec.Bira_Segment__c === "A"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/a.png" alt=""></span>';
            }else if(accountRec.Bira_Segment__c === "B"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/b.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/c.png" alt=""></span>';
            }
           
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if(accountRec.Industry_Segment__c != null)
        {
            if(accountRec.Industry_Segment__c === "P0"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/p0.png" alt=""></span>';
            }else if(accountRec.Industry_Segment__c === "P1"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/p1.png" alt=""></span>';
            }else if(accountRec.Industry_Segment__c === "P2"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/p2.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/p3.png" alt=""></span>';
            }
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if(accountRec.Industry_Segment_Mass__c != null)
        {
            if(accountRec.Industry_Segment_Mass__c === "M0"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/m0.png" alt=""></span>';
            }else if(accountRec.Industry_Segment_Mass__c === "M1"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/m1.png" alt=""></span>';
            }else if(accountRec.Industry_Segment_Mass__c === "M2"){
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/m2.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="/media/icons/accountSegmentation/m3.png" alt=""></span>';
            }
            
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        tmp += '         </div>';
        
        if (accountRec.Beacon_Flag__c === true) {
            tmp += '         <span><img src="/media/images/homePage/Icons-02.png" alt=""></span>';
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if (accountRec.Draft_Ready__c === true) {
            tmp += '         <span><img src="/media/images/homePage/Icons-04.png" alt=""></span>';
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if (accountRec.QCO_Flag__c === true) {
            tmp += '         <span><img src="/media/images/homePage/Icons-05.png" alt=""></span>';
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        tmp += '       </div>';
        
        tmp += '    </div>';
        tmp += '</div>';
    $('#listOfAcc').prepend(tmp);
};



handleObjective = (element) => {
    const objectivetype = element.dataset.objectivetype;
    console.log(objectivetype);
    if(objectivetype==='Sales Order'){
        window.location.href = `/view/objectives/salesOrder/salesOrderLanding.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='KYC and Classification'){
        window.location.href = `/view/objectives/kycDetail/segmentation.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Stock/Visibility Survey'){
        window.location.href = `/view/objectives/stockVisibility/stockVisibility.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Competition Insights'){
        window.location.href = `/view/objectives/competitorInsights/competitionInsightsPage1.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Pre-Sales'){
        window.location.href = `/view/objectives/preSales/preSalesLanding.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='POSM Requisition'){
        window.location.href = `/view/objectives/posm/posm.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Draft Sign-Up'){
        window.location.href = `/view/objectives/draftSignup/draftSignupHomePage/draftSignupHomePage.html?accountId=${accountRec.Id}`;
    }
    else if(objectivetype==='Draft Pullout'){
        window.location.href = `/view/objectives/draftPullout/draftPulloutSales.html`;
    }
};

// showObjectives = (objective,currentEventChecked) =>{

//     if(objective){
//         let objectiveSortArr = objective.Event_Objectives__r.records.map(ele => {
//             ele.sNo = objectiveOrder.get(ele.Type__c);
//             return ele;
//         });
//         objectiveSortArr.sort(compare);
        
//         $('#listofEvent').html('');
//         let disableOptions = false;
//         if(currentEventChecked==='isCompleted' ||currentEventChecked==='differentEvent' ){
//             $('.check-in').attr('disabled',true);
//             $('.check-out').attr('disabled',true);
//             disableOptions = true;
//         }
//         else if(currentEventChecked==='currentEvent'){
//             $('.check-in').attr('disabled',true);
            
//         }
//         else if(currentEventChecked==='noEvent'){
//             $('.check-out').attr('disabled',true);
            
//             disableOptions = true;
//         }
//         var btn ='';
//         for (var i = 0; i < objectiveSortArr.length; i++) {
//             //console.log(objective.Event_Objectives__r.records[i]);
//             btn+='<div class="event">';
//             if(!functionalityDeveloped.get(objectiveSortArr[i].Type__c)&&!disableOptions){
//                 btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveSortArr[i].Type__c+'" data-objectiveId="'+objectiveSortArr[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveSortArr[i].Type__c);
//             }
//             else{
//                 btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveSortArr[i].Type__c+'" data-objectiveId="'+objectiveSortArr[i].Id+'" class="btn btn-default" '+(disableOptions ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveSortArr[i].Type__c);
//             }
//             btn+='  </button>';
//             btn+='</div>';
//         }
        
//         $('#listofEvent').prepend(btn);
//     }
//     else{
//         $('.check-in').html('');
//         let temp = '<div style="text-align:center">';
//         temp += 'No Objectives for today!';
//         temp += '</div>';
//         $('#listofEvent').html(temp);
//         $('.check-out').html('');
//     }
// };

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.sNo;
    const bandB = b.sNo;
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
const showObjectivesV2 =async (checkedIn) => {
    if(checkedIn){
        $('.check-in').attr('disabled',true);
        $('.check-out').attr('disabled',false);
    }
    else{
        $('.check-in').attr('disabled',false);
        $('.check-out').attr('disabled',true);
    }
    $('#listofEvent').empty('');
    let btn = '';
    let isValid = await checkedInEventCheck();
    if(!isValid){
        return;
    }
    for (var i = 0; i < objectiveArray.length; i++) {
        
        //console.log(objective.Event_Objectives__r.records[i]);
        btn+='<div class="event">';
        
        if(!functionalityDeveloped.get(objectiveArray[i])){
            btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'"  class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
            
        }
        else{
            if(!checkedIn&&(objectiveArray[i]==='Competition Insights' || objectiveArray[i]==='Stock/Visibility Survey'|| objectiveArray[i]==='Pre-Sales'|| objectiveArray[i]==='POSM Requisition' || objectiveArray[i]==='Draft Sign-Up' || objectiveArray[i]==='Draft Pullout')){
                if(objectiveArray[i]==='POSM Requisition' || objectiveArray[i]==='Draft Sign-Up' || objectiveArray[i]==='Draft Pullout'){
                    if(isPOSMAllowed &&objectiveArray[i]==='POSM Requisition' ){
                        btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                    }
                    if(isDraftAllowed&&objectiveArray[i]==='Draft Sign-Up' ){
                        btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                    }
                    if(isPulloutAllowed&&objectiveArray[i]==='Draft Pullout' ){
                        
                        btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                    }
                    
                }
                else {
                    btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(true ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                }
            }
            else{
                if(objectiveArray[i]==='POSM Requisition' || objectiveArray[i]==='Draft Sign-Up' || objectiveArray[i]==='Draft Pullout'){
                    if(isPOSMAllowed &&objectiveArray[i]==='POSM Requisition' ){
                        btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(false ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                    }
                    else if(isDraftAllowed&&objectiveArray[i]==='Draft Sign-Up' ){
                        btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(false ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                    }
                    if(isPulloutAllowed&&objectiveArray[i]==='Draft Pullout' ){
                        btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(false ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                    }
                }
                else{
                    btn+='  <button style="white-space: pre-wrap;"  data-objectiveType="'+ objectiveArray[i]+'" data-objectiveId="'+objectiveArray[i].Id+'" class="btn btn-default" '+(false ? 'disabled' : '')+' onclick=handleObjective(this)>'+objectiveLabel.get(objectiveArray[i]);
                }
                
            }
            
        }
        btn+='  </button>';
        btn+='</div>';
        
    }
    
    $('#listofEvent').prepend(btn);
    activityDateCommentsRender();
};

const activityDateCommentsRender = () => {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit', };
    $('.visitdateAndComment').empty();
    let btn = '';
    btn += `<div style="margin-top: -47%;"><div class="form-group" >
    <label class="control-label" for="activityDate">Recent Activity Date</label>
    <input class="form-control" type="text" id="activityDate" disabled value="${accountRec.Recent_Activity_Date_Time__c ? (new Date(accountRec.Recent_Activity_Date_Time__c)).toLocaleString('en-GB',options) : ''}">
  </div><div class="form-group" >
  <label class="control-label" for="activityComments">Recent Activity Comments</label>
  <textarea class="form-control" type="text" id="activityComments" disabled>${accountRec.Recent_Activity_Comments__c ? ((accountRec.Recent_Activity_Comments__c)) : ''}</textarea>
  
</div></div>`;
    $('.visitdateAndComment').prepend(btn);
};

const checkedInEventCheck = async() => {
    let eventUtility = await getItemFromStore('utility','event');
    if(eventUtility&&accountRec.Id!==eventUtility.account.Id){
        $('.check-in').attr('disabled',true);
        $('.check-out').attr('disabled',true);
        let tmp = '' ;
        tmp += `<p class="text-center"> Your visit on <a data-accountRecordTypeName="${eventUtility.account.RecordType.DeveloperName}" data-accountId="${eventUtility.account.Id}" onclick="handleAccountLandingRedirect(this)">${eventUtility.account.Name}</a> is currently in-progress. </p>`;
        $('#listofEvent').html(tmp);
        return false;
    }
    return true;
};





const checkBoxCreation = (key,label,eventListener,checked,disabled) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'form-group';
    let checkLabel = document.createElement('label');
    checkLabel.className = 'control-label switch';
    checkLabel.innerHTML = label;
    checkLabel.for = key;
    let checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.id = key;
    checkInput.className = 'form-control';
    checkInput.checked = checked;
    checkInput.disabled = disabled;
    let checkSpan = document.createElement('span');
    checkSpan.className = 'slider round';

    if(eventListener){
        checkInput.addEventListener('change',eventListener); 
    }
    checkLabel.appendChild(checkInput);
    checkLabel.appendChild(checkSpan);
    outerDiv.appendChild(checkLabel);
   
    return outerDiv;
};


handleAccountLandingRedirect =(ele) => {
    
    let recordTypeName = $(ele).attr('data-accountRecordTypeName');
    
    let accountId = $(ele).attr('data-accountId');
    
    if (recordTypeName === 'Distributor_Warehouse') {
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Distributor') {
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'On_Premise_General') {
        window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Consumer') {
        window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Institutional_Off_Premise') {
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Institutional_On_Premise') {
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Non_beer_Warehouse') {
        window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Off_Premise_Outlet') {
        window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'On_Premise_Hotel') {
        window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Supplier') {
        window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Temporary_Event') {
        window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + accountId;
    }
    else if (recordTypeName === 'Wholesaler') {
        window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + accountId;
    }
    else if(recordTypeName==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountId;
    }
};