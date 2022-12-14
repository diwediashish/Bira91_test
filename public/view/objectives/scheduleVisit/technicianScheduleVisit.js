let selectedInstallation = {};
let isValid = false;
let draftInstallationId;


let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
$("#Select_Date").attr("min", today);

const machineTypeValues = (machineIds = new Set()) => {
    let machineIdsArr = Array.from(machineIds);
    let tmp = '';
    for(let i of machineIdsArr){
        tmp += `<option value='${i}'>${i}</option>`;
    }
    $('#MachineId').append(tmp);
};

const handleSelectHandler = (ele) => {
    const id = $(ele).attr('id');
    if(id==='MachineId'){
        typeOfEventOptionAvailable($(ele).val());
    }
};

const typeOfEventOptionAvailable = (value) => {
    
    if(machineIdStatus.has(value)){
        let tmpObj = machineIdStatus.get(value);
        selectedInstallation = tmpObj;
        if(tmpObj.DeveloperName==='Draft_Sign_Up'){
            // showNotification({message : 'Draft Signup request of the current Machine Id is pending!'});
            // isValid = false;
            typeOfEventOptionsRender(['Pre-Installation']);
            draftInstallationId = tmpObj.recordId;
            isValid = true;
        }
        // else if(tmpObj.DeveloperName==='Draft_Sign_Up'&&tmpObj.status==='Rejected'){
        //     showNotification({message : 'Draft Signup request of the current Machine Id is rejected so cannot create visit for the same!'});
        //     isValid = false;
        // }
        // else if(tmpObj.DeveloperName==='Pre_Installation'&&tmpObj.status==='Approved'){
        //     showNotification({message : `Item not yet delivered, so cannot create visit for the same!`});
        //     isValid = false;
        // }
        // else if(tmpObj.DeveloperName==='Pre_Installation'&&tmpObj.status==='Rejected'){
        //     // typeOfEventOptionsRender(['Pre-Installation']);
        //     showNotification({message : `Sign up Rejected. Please ask the Sales user to create new `});
        //     draftInstallationId = tmpObj.signUpId;
        //     isValid = true;
        // }
        else if(tmpObj.DeveloperName==='Pre_Installation'){
            typeOfEventOptionsRender(['Installation']);
            draftInstallationId = tmpObj.recordId;
            isValid = true;
        }
        // else if(tmpObj.DeveloperName==='Pre_Installation'){
        //     showNotification({message : `Current Pre Installation status is on ${tmpObj.status}, so cannot create visit for the same!`});
        //     isValid = false;
        // }
        else if(tmpObj.DeveloperName==='Not_Installed'){
            typeOfEventOptionsRender(['Installation']);
            draftInstallationId = tmpObj.preInstallaId;
            isValid = true;
        }
        else if(tmpObj.DeveloperName==='Partially_Done'){
            typeOfEventOptionsRender(['Installation']);
            draftInstallationId = tmpObj.preInstallaId;
            isValid = true;
        }
        // else if(tmpObj.DeveloperName==='Partially_Done'&&tmpObj.status!=='Delivered'){
        //     showNotification({message : `Item not yet delivered, so cannot create visit for the same!`});
        //     isValid = false;
        // }
        // else if(tmpObj.DeveloperName==='Draft_Pull_Out'&&tmpObj.status==='Pullout initiated'){
        //     typeOfEventOptionsRender(['Draft Pullout']);
        //     draftInstallationId = tmpObj.recordId;
        //     isValid = true;
        // }
        else if(tmpObj.DeveloperName==='Draft_Pull_Out'&&tmpObj.status==='PullOut Done'){
            showNotification({message : `Pull Out Done, so cannot create visit for the same!`});
            isValid = false;
        }
        else if(tmpObj.DeveloperName==='Installed'){
            draftInstallationId = tmpObj.recordId;
            typeOfEventOptionsRender(['Draft Sanitization','Draft Preventive Maintenance','Machine Commissioning','Training']);
            isValid = true;
        }
        
        
    }

    if(isValid){
        $('#submitBtn').css('display','inline-block');
    }
    else{
        $('#submitBtn').css('display','none');
    }
};
const typeOfEventOptionsRender = (optionsArr =[]) => {
    let tmp = '';
    $('#Event').html('');
    for(let i of optionsArr){
        tmp += `<option value='${i}'>${i}</option>`;
    }
    $('#Event').append(tmp);
};