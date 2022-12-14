let listLeadMaster = [];
const fetchLeadData = async() => {
    showLoaderSpinner();
    setTimeout(async() => {
        listLeadMaster =await readAllData('lead'); 
        initializeLead (sortList('Industry_Segment__c',listLeadMaster));
        sortingFields('segment');
        applyFilter();
        hideLoaderSpinner();
    },1000);
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

const filterAccounts = (filters,beacon,qco) => {
    
    listOfLead = listLeadMaster.filter(ele => {
        
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
        // if(filters.outletFeatures.size>0){
        //     if(!ele.Pool_Side__c&&!ele.Other_Entertainment__c&&!ele.Outdoor_Seating__c){
        //         return false;
        //     }
            
        //     if(ele.Pool_Side__c){
        //         console.log('Account Name',ele.Name);
        //     }
        //     if(!ele.Pool_Side__c&&filters.outletFeatures.has('Pool Side')){
        //          return false;
        //     }
        //     if(!ele.Outdoor_Seating__c&&filters.outletFeatures.has('Outdoor Seating')){
        //         return false;
        //     }
        //     if(ele.Other_Entertainment__c){
        //         let entertainmentArr = ele.Other_Entertainment__c.split(';').filter(ele =>  ele!=='Outdoor Seating' ||ele!=='Pool Side' );
        //         let isValid = true;
        //         for(let i of  filters.outletFeatures){
        //             if(i!=='Pool Side'&&i!=='Outdoor Seating'){
        //                 let index = entertainmentArr.find(ele => ele===i);
        //                 if(!index){
        //                     isValid = false;
        //                     break;
        //                 }
        //             }
                    
        //         }
        //         if(!isValid){
        //             return false;
        //         }
                
        //     }
        //     else{
                
        //         let isValid = true;
        //         for(let i of  filters.outletFeatures){
        //             if(i!=='Outdoor Seating' || i !== 'Pool Side'){
        //                 isValid = false;
        //                 break;
        //             }    
        //         }
        //         if(!isValid){
        //             return false;
        //         }
        //     }
            
            
        // }
        // if(filters.biraClassificationSet.size>0){
        //     if(ele.Bira_Segment__c){
        //         if(!filters.biraClassificationSet.has(ele.Bira_Segment__c)){
        //             return false;
        //         }
        //     }
        //     else{
        //         return false;
        //     }
        // }
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
    });
    
    initializeLead(listOfLead);
    // Call display method again;
};

fetchLeadData();