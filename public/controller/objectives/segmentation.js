const initializeKYCDetail  = async () => {
    let urlParam = new URLSearchParams(window.location.search);
    const accountId = urlParam.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    kycDetail = await getItemFromStore('kycDetail',key);
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    if(!kycDetail){
        kycDetail = {
            accountId : accountId,
            App_Id : key,
            Created_Date : new Date()
        };
        const fieldsArr = ['Channel','Sub_Channel','Beacon_Flag','QCO_Flag','Type','Ocassion','Draft_Ready','Cuisine','Size_Format','Outdoor_Seating','Location','No_of_Rooms','Star_Rating','No_of_Banquets','Minibar_Available','Zomato_Cost_for_2','Other_Entertainment','Pool_Side','Beer_Selection'];
        for(let i of fieldsArr){
            if(!kycDetail[i]){
                if(accountRec[i+'__c']){
                    if(i==='Other_Entertainment'){
                        let arr = accountRec[i+'__c'].split(';');
                        for(let k of arr){
                            kycDetail[k] = true;
                        }
                        
                    }
                    else{
                        kycDetail[i] = accountRec[i+'__c'];
                    }
                    
                }
            }
            
        } 
    }
    
   
    showAccount();
    initializeSegmentation();
};

const saveSegmentation =async () => {
    const otherEntainmentSet = new Set(['Sports Bar', 'Comedy Club', 'Cocktail Led', 'Wine Led', 'Spirit Led']);
    handleOtherEntertainment(otherEntainmentSet);
    kycDetail.Last_Modified = new Date();
    kycDetail.isSynced = false;
    kycDetail.Daily_Tracker = fetchCurrentDateIdStr();
    const position  = await getCurrentLocationHelper();
    kycDetail.Geolocation_Latitude = position.coords.latitude;
    kycDetail.Geolocation_Longitude = position.coords.longitude;
    await writeData('kycDetail',kycDetail);
    let urlParam = new URLSearchParams(window.location.search);
    const eventObjectiveId = urlParam.get('EventObjectiveId');
    window.location.href = `/view/objectives/kycDetail/kycDetail.html?EventObjectiveId=${eventObjectiveId}&accountId=${accountRec.Id}`;
    
    
};

const handleOtherEntertainment = (otherEntainmentSet) => {
    let otherEntertainmentArr = [];
    for(let i in kycDetail){
        if(otherEntainmentSet.has(i)&&kycDetail[i]){
            otherEntertainmentArr.push(i);
        }
    }
    kycDetail['Other_Entertainment'] = otherEntertainmentArr;
};


initializeKYCDetail();