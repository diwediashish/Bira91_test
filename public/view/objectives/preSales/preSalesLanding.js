let accountRec = null;

const handleCompanyClicked = (ele) => {
    
    window.location.href = `/view/sellingToolsListView/sellingToolsListView.html?id=${ele}`;
};


const handlePreSalesClicked = () => {
    let urlParam = new URLSearchParams(window.location.search);
    window.location.href = `/view/objectives/preSales/preSalesInside/preSalesInside.html?accountId=${urlParam.get('accountId')}`;

};


const initializePreSalesLanding = async() => {
    let urlParam = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('account',urlParam.get('accountId'));
    if(!accountRec){
        accountRec = await getItemFromStore('lead',urlParam.get('accountId'));
    }
    console.log(accountRec);
    showAccount();
    
};
initializePreSalesLanding();