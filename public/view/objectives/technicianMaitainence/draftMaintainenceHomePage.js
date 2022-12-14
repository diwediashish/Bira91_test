const renderInstallationSubObjectives = (event) => {
    $('.sanitization').prop('disabled',true);
    $('.preventive').prop('disabled',true);
    if(event.Type__c==='Draft Sanitization'){
        $('.sanitization').prop('disabled',false);
    }
    if(event.Type__c==='Draft Preventive Maintenance'){
        $('.preventive').prop('disabled',false);
    }
};


function handleDraftSanitization() {
    window.location.href = '/view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization1.html';    
}

function handlePreventiveMaintainance() {
    window.location.href = '/view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization1.html';    
}


const handleLandingNav = () => {
    window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
};
