let machineIdStatus = new Map();

let draftInstallationOrder = new Map(
    [
        ['Draft_Sign_Up',1],
        ['Pre_Installation',2],
        ['Not_Installed',3],
        ['Partially_Done',4],
        ['Installated',5],
        ['Draft_Pull_Out',6],
        
    ]
)
const initializeScheduleVisit =async () => {
    let urlParam = new URLSearchParams(window.location.search);
    let accountId = urlParam.get('accountId');
    accountRec = await getItemFromStore('account',accountId);
    showAccount();

    if(urlParam.has('installatedRedirect')){
        installationRedirectHandler();
    }
    else{
        $('#submitBtn').css('display','none');
        if(!accountRec.Draft_Installations__r){
            showNotification({message : 'No Machine type available. Either the data is stale or no Draft Machine is available on this account'});
            $('#submitBtn').css('display','none');
        }
        fetchMachineIds();
    }
    
};

const installationRedirectHandler = () => {
    let urlParam = new URLSearchParams(window.location.search);
    let tmp = '';
    tmp = `<option value='Installation' selected>Installation</option>`;
    $('#Event').append(tmp);
    $('#Event').val('Installation');
    $('#Event').prop('disabled',true);
    tmp = `<option value='${(urlParam.has('machineNo') ? urlParam.get('machineNo') : 'Not Found')}' selected>${(urlParam.has('machineNo') ? urlParam.get('machineNo') : 'Not Found')}</option>`;
    $('#MachineId').append(tmp);
    $('#MachineId').val((urlParam.has('machineNo') ? urlParam.get('machineNo') : 'Not Found'));
    $('#MachineId').prop('disabled',true);
    draftInstallationId = urlParam.has('preInstallationId') ? urlParam.get('preInstallationId') : null;
};
const fetchMachineIds = () => {
    let machineIdStr = new Set();
    let draftRequisitions = accountRec.Draft_Installations__r.records.map(ele => {
        ele.sNo = draftInstallationOrder.get(ele.RecordType.DeveloperName);
        return ele;
    });
    // draftRequisitions = draftRequisitions.sort(arrangeRequisitions);
    for(let i of draftRequisitions ){
        if(i.RecordType.DeveloperName==='Draft_Sign_Up'){
            if(i.Status__c !== 'Rejected'){
                machineIdStr.add(i.Display_Machine_Id__c);
                machineIdStatus.set(i.Display_Machine_Id__c,{
                    DeveloperName : i.RecordType.DeveloperName,
                    status : i.Status__c,
                    recordId : i.Id,
                    signUpId : i.Draft_Sign_up__c,
                    preInstallaId : i.Draft_Pre_Installation__c,
                });
            }
            
        }
        else if(i.RecordType.DeveloperName==='Installed' || i.RecordType.DeveloperName==='Pre_Installation' ||i.RecordType.DeveloperName==='Draft_Pull_Out' || i.RecordType.DeveloperName==='Not_Installed' || i.RecordType.DeveloperName === 'Partially_Done' ){
            if(i.Status__c !== 'Rejected'){
                machineIdStr.add(i.Machine_Id_Not_Sign_Up__c);
                machineIdStatus.set(i.Machine_Id_Not_Sign_Up__c,{
                    DeveloperName : i.RecordType.DeveloperName,
                    status : i.Status__c,
                    recordId : i.Id,
                    signUpId : i.Draft_Sign_up__c,
                    preInstallaId : i.Draft_Pre_Installation__c,
                });
            }
            
        }
        
    }
    machineTypeValues(machineIdStr);
    
};




const postSubmittionRedirection = () => {
    let urlParam = new URLSearchParams(window.location.search);
    if(urlParam.has('installatedRedirect')){
        window.location.href = `/view/objectives/technicianInstallation/technicianInstallationHomePage.html`;
    }
    else{
        window.location.href = `/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=${urlParam.get('accountId')}${urlParam.has('eventId') ? '&eventId='+urlParam.get('eventId') : ''}`;
    }
    
};

const submitScheduleEvent = async() => {
    const machineId = $('#MachineId').val();
    const eventType = $('#Event').val();
    const dateSelected = $('#Select_Date').val();
    const timeSelected = $('#Time').val();
    const newTime = timeSelected;
  //  const eventDate = new Date(dateSelected +' '+newTime);
    const eventDate = new Date(dateSelected);
    
    if(!machineId || !eventType || !dateSelected){
        showNotification({message : 'All fields are mandatory!'});
        return;
    }
    let scheduleVisit = {
        Account__c : accountRec.Id,
        App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+eventType,
        End_date_and_time__c : eventDate,
        Start_date_and_time__c : eventDate,
        Type__c : eventType,
        Type_of_Visit__c : 'Planned',
        Status__c : 'New',
        Draft_Installation__c : draftInstallationId,
        Name : `${eventType} at ${accountRec.Name}`,
    };
    
    await writeData('scheduleVisit',scheduleVisit);
    postSubmittionRedirection();
};
function arrangeRequisitions(a, b) {
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

initializeScheduleVisit();