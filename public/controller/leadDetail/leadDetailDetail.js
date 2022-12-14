const initializeLeadDetailPage =async () => {
    let urlParams = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('lead',urlParams.get('leadId'));
    showAccount();
    initalizeDetail();
};
initializeLeadDetailPage();