const initializeSellingToolsListView = async() => {
    let url = new URLSearchParams(window.location.search);
    fileList = await fetchRecordsUsingIndex('sellingTools','Selling_Tools_Type__c',url.get('id'));
    fileList = fileList.map(ele => {
        if(!ele.Title.toLowerCase().includes('preview')){
            delete ele.VersionData;
            return ele;
        }else{
            return ele;
        }
    });
    initializeMethod();
};

initializeSellingToolsListView();