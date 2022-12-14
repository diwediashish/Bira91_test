
const initializeMachine = () =>{
    if(isReadOnly)
    {   
        $('.isReadOnly').prop('disabled',isReadOnly);
    }
}


const checkBoxChangeHandler = (ele) => {
    const id = $(ele).attr('id') ;
    const checkedValue = $(ele).prop('checked');
    machineCommissioning[id] =  checkedValue;
};


const redirectBackToHomePage = () => {
    window.location.href = '/view/objectives/technicianInstallation/technicianInstallationHomePage.html';
};
