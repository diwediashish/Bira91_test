const initializeFileViewer =async () => {
    let urlParam = new URLSearchParams(window.location.search);
    const id = urlParam.get('id');
    base64 = (await getItemFromStore('sellingTools',id));
    
    initializeFile();
};

initializeFileViewer();