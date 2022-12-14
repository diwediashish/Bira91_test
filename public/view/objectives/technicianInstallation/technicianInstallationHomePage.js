const renderInstallationSubObjectives =async (event) => {
    $('.pre-installation').prop('disabled',true);
    $('.installation').prop('disabled',true);
    $('.machine-commissioning').prop('disabled',true);
    $('.training').prop('disabled',true);
    $('.pullout').prop('disabled',true);
    $('.checkout').prop('disabled',true);

    if(event.Type__c==='Pre-Installation'){
        $('.pre-installation').prop('disabled',false);
    }
    if(event.Type__c==='Installation'){
        $('.installation').prop('disabled',false);
        if(await installationEventCreationCheck()){
            $('.machine-commissioning').prop('disabled',false);
            $('.training').prop('disabled',false);
        }
        
    }
    if(event.Type__c==='Machine Commissioning'){
        $('.machine-commissioning').prop('disabled',false);
    }
    if(event.Type__c==='Training'){
        $('.training').prop('disabled',false);
    }
    if(event.Type__c==='Draft Pullout'){
        $('.pullout').prop('disabled',false);
    }
};


function PreInstallationClick() {
    window.location.href = '/view/objectives/technicianInstallation/draftPreInstallation/draftPreInstallation.html';    
}

function InstallationClick() {
    window.location.href = '/view/objectives/technicianInstallation/draftInstallation/draftInstallation.html';    
}

function MachineClick() {
    window.location.href = '/view/objectives/technicianInstallation/technicianMachineCommissioning/technicianMachineCommissioning.html';    
}

function TrainingClick() {
    window.location.href = '/view/objectives/technicianInstallation/technicianTraining/technicianTraining.html';    
    
}



const handleLandingNav = () => {
    window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
};