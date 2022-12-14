const initializeAccountDetail = async () => {
    let urlParam = new URLSearchParams(window.location.search);
    let accountId = urlParam.get('Id');
    let accountDetail = await getItemFromStore('account',accountId);
    accountRec = accountDetail;
    initalizeDetail();
    showAccount();
    // Account Detail Page call
    // Account related Page Call Page call
};

const initializeDetail = () => {
    showLoader();
    setTimeout(async () => {
        await initializeAccountDetail();
        
        hideLoader();
    },1);
};
initializeDetail();