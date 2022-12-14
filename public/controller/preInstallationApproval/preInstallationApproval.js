let accountRec;
const initializePreInstallationApproval =(async () => {
    let urlParam = new URLSearchParams(window.location.search);
    draftPreInstallation = await getItemFromStore('draftPreInstallationApproval',urlParam.get('preId'));
    accountRec = await getItemFromStore('account',draftPreInstallation.Account__c); // account to be tag

    initializeApproval();
})();


const approve = () => {
    draftPreInstallation.Status__c = 'Approved';
    saveToDB();
};

const reject = () => {
    draftPreInstallation.Status__c = 'Rejected';
    saveToDB();
};
const saveToDB =async () => {
    draftPreInstallation = {
        ...draftPreInstallation,
        isSynced : false,
        
    }
    await writeData('draftPreInstallationApproval',draftPreInstallation);
    // await writeData('draftPreInstallation',draftPreInstallation);
    window.location.href = '/view/homePage/homePage.html'
};