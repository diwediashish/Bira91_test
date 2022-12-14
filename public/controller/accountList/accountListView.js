let accountLists;
let sortKey = 'Industry_Segment__c';
let sortDirection = true;
let openCursor = null;
let limit = 500;
const initializeAccountList =async  () => {
    showLoader();
    await fetchAccountsThroughCursor();
    initializeAccount(sortList('Industry_Segment__c',accountLists));
    sortingFields('segment');
    showListOfAccount();
    applyFilter();
    setTimeout(async() => {
        
        hideLoader();
    },100);
    
};
const fetchAccountsThroughCursor =async () => {
    
    if(!accountLists){
        accountLists = [];
        listOfAccount = [];
    }
    await fetchMoreRecord();
};
const fetchMoreRecord = async () => {
    if(!noMoreRecordLeft()){
        let tempAccount = [];
        showLoader();
        let searchInput = $("#searchValue").val() ? $("#searchValue").val() : null;
        if(searchInput){
            openCursor = await keyBasedSearchingIndexedDB('account',searchInput.toUpperCase());
        }
        else{
            openCursor = await openCursorForStore('account',openCursor ? openCursor.value.Id : null);
        }
        
        let i = 0;
        while(tempAccount.length<limit){
            i++;
            if(noMoreRecordLeft()){
                break;
            }
            let valueReturned = await fetchFromCursorAccountListView(openCursor);
            if(!valueReturned){
                showNotification({message : 'Issue with searching. Please contact System Adminstrator'});
                break;
            }
            try{
                if(filterAccountHelper(valueReturned)){
                    if(valueReturned.RecordType.DeveloperName !== 'Lead')
                    {
                        tempAccount.push(valueReturned);
                    }
                }        
            }
            catch(e){
                console.log(e);
                console.log(openCursor);
            }
            await openCursor.continue();
        }
        // tempAccount = sortList('Industry_Segment__c',tempAccount);
        let currentIndex = accountLists.length;
        accountLists = accountLists.concat(tempAccount);
        listOfAccount = listOfAccount.concat(tempAccount);
        if(!listOfAccount){
            listOfAccount = [];
            accountLists = [];
        }
        showListOfAccount(currentIndex);
       }
       else{
           showNotification({message : 'No more record left to load'});
       }
       setTimeout(async() => {
        
        hideLoader();
    },100);
};
$(window).scroll(async function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        await fetchMoreRecord();
    }
});
const noMoreRecordLeft = () => {
    return openCursor&&openCursor._request.result===null;
};
const filterAccounts = async () => {
    await fetchMoreRecord();   
    
};

const filterAccountHelper = (ele) => {
    
    let searchInput = $("#searchValue").val() ? $("#searchValue").val() : null;
    
    let beacon = $('input[name="beacon"]:checked').val() ? $('input[name="beacon"]:checked').val() : null;

    let qco = $('input[name="qco"]:checked').val() ? $('input[name="qco"]:checked').val() : null;
    
    let outletFeatures = [];
    $("input[name='outletFeatures']:checked").each(function () {
        outletFeatures.push($(this).val());
    });
    let channel = [];
    $("input[name='channel[]']:checked").each(function () {
        channel.push($(this).val());
    });


    let subChannel = [];
    $("input[name='subChannel']:checked").each(function () {
        subChannel.push($(this).val());
    });

    let type = [];
    $("input[name='type']:checked").each(function () {
        type.push($(this).val());
    });


    let biraselection = [];
    $("input[name='biraselection']:checked").each(function () {

        biraselection.push($(this).val());

    });

    let premiumClassification = [];
    $("input[name='premiumClassification']:checked").each(function () {
        premiumClassification.push($(this).val());
    });

    let massClassification = [];
    $("input[name='massClassification']:checked").each(function () {
        massClassification.push($(this).val());
    });

    let biraClassification = [];
    $("input[name='biraClassification']:checked").each(function () {
        biraClassification.push($(this).val());
    });
    let size = $('input[name="size"]:checked').val() ? $('input[name="size"]:checked').val() : null;
    

    if (beacon) {

        if (beacon === 'true') {
            beacon = true;
        }
        else {
            beacon = false;
        }
    }
    else {
        beacon = null;
    }
    if (qco) {
        if (qco === 'true') {
            qco = true;
        }
        else {
            qco = false;
        }
    }
    else {
        qco = null;
    }
    
    let filters = {
        channelSet: new Set(channel),
        biraSelectionSet: new Set(biraselection),
        biraClassificationSet: new Set(biraClassification),
        massClassificationSet: new Set(massClassification),
        premiumClassificationSet: new Set(premiumClassification),
        typeSet: new Set(type),
        subChannelSet: new Set(subChannel),
        searchInput: searchInput,
        outletFeatures: new Set(outletFeatures),
        sizeValue : size ,
    };
    if(filters.searchInput){
        
            if(!(ele.Name.toUpperCase()).includes(filters.searchInput.toUpperCase())){
                return false;
            }
        
        
        
        
    }
    if(filters.channelSet.size>0){
        if(ele.Channel__c){
            if(!filters.channelSet.has(ele.Channel__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.subChannelSet.size>0){
        if(ele.Sub_Channel__c){
            if(!filters.subChannelSet.has(ele.Sub_Channel__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.outletFeatures.size>0){
        if(!ele.Pool_Side__c&&!ele.Other_Entertainment__c&&!ele.Outdoor_Seating__c){
            return false;
        }

        if(!ele.Pool_Side__c&&filters.outletFeatures.has('Pool Side')){
             return false;
        }
        if(!ele.Outdoor_Seating__c&&filters.outletFeatures.has('Outdoor Seating')){
            return false;
        }
        if(ele.Other_Entertainment__c){
            let entertainmentArr = ele.Other_Entertainment__c.split(';').filter(ele =>  ele!=='Outdoor Seating' ||ele!=='Pool Side' );
            let isValid = true;
            for(let i of  filters.outletFeatures){
                if(i!=='Pool Side'&&i!=='Outdoor Seating'){
                    let index = entertainmentArr.find(ele => ele===i);
                    if(!index){
                        isValid = false;
                        break;
                    }
                }
                
            }
            if(!isValid){
                return false;
            }
            
        }
        else{
            
            let isValid = true;
            for(let i of  filters.outletFeatures){
                if(i!=='Outdoor Seating' || i !== 'Pool Side'){
                    isValid = false;
                    break;
                }    
            }
            if(!isValid){
                return false;
            }
        }
        
        
    }
    if(filters.biraClassificationSet.size>0){
        if(ele.Bira_Segment__c){
            if(!filters.biraClassificationSet.has(ele.Bira_Segment__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.biraSelectionSet.size>0){
        if(ele.Beer_Selection__c){
            if(!filters.biraSelectionSet.has(ele.Beer_Selection__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.massClassificationSet.size>0){
        if(ele.Industry_Segment_Mass__c){
            if(!filters.massClassificationSet.has(ele.Industry_Segment_Mass__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.premiumClassificationSet.size>0){
        if(ele.Industry_Segment__c){
            if(!filters.premiumClassificationSet.has(ele.Industry_Segment__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.sizeValue){
        if(ele.Size_Format__c){
            if(ele.Size_Format__c!==filters.sizeValue){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(filters.typeSet.size>0){
        if(ele.Type__c){
            if(!filters.typeSet.has(ele.Type__c)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(beacon!==null){
        
        if(beacon !== ele.Beacon_Flag__c){
            return false;
        }
    }

    if(qco!==null){
        
        if(qco !== ele.QCO_Flag__c){
            return false;
        }
    }
    
    return true;

};


const sortList = (key,list,direction) => {
    sortKey = key;
    sortDirection = direction;
    list = list.sort(compare);
    return list;
};

const compare = (a, b) => {
    if(typeof a[sortKey]==='boolean'){
        const bandA =( a[sortKey]);
        const bandB = (b[sortKey]);
        if(sortDirection){
            return (bandA === bandB)? 0 : bandA? -1 : 1;
        }
        else{
            return (bandA === bandB)? 0 : bandA? 1 : -1;
        }
        
    }
    else{
        let comparison = 0;
        // Use toUpperCase() to ignore character casing
        const bandA =( a[sortKey] ?  a[sortKey].toUpperCase() : null);
        const bandB = (b[sortKey] ? b[sortKey].toUpperCase(): null);
        
        if(sortDirection){
            if (bandA > bandB) {
                comparison = 1;
            } else if (bandA < bandB) {
                comparison = -1;
            }
        }
        else{
            if (bandA < bandB) {
                comparison = 1;
            } else if (bandA > bandB) {
                comparison = -1;
            }
        }
        return comparison;
    }
    
  };

  createLoader();
initializeAccountList();