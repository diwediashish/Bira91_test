// Last Visit data fetched check if new 5 competitor childs have been created then make dummy craft show_option = true accordingly


const fetchAccounts = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    accountRec = await getItemFromStore('account', accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    showAccount();
    overallDataGeneration();
    
    await contractedVolumeDataGeneration();
    calNonContracted();
    createVolumeDashboard();
};
let competitorInsight = {};
let competitorVolume = [];
const initializeInsights = async () => {
    await fetchAccounts();
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    competitorInsight = await getItemFromStore('competitorInsight', key);
    if (!competitorInsight) {
        let tempInsight = await fetchPreviousVisitData(accountId);
        if (tempInsight) {
            competitorInsight = {
                ...tempInsight,
                App_Id: key,
                Created_Date: new Date(),
            };
        }
        else {
            competitorInsight = {
                accountId: accountId,
                App_Id: key,
                Competitor_Volume: createZone(),
                Created_Date: new Date(),
            };
        }

    }
    competitorVolume = competitorInsight.Competitor_Volume;

    formRender();
};
const competitorBuckets = ["UB", "ABI", "Carlsberg", "Craft", "White Owl", "Simba","White Rhino", "Hopper", "Witlinger", "Others",];
const createZone = () => {
    let arr = [];
    competitorBuckets.forEach((ele, index) => {
        let temp = {
            Competitor_Name: ele,
            ['show_option']: false
        };
        arr.push(temp);
    });
    return arr;
};

handleFormSubmit = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    competitorInsight.Competitor_Volume = competitorVolume;
    competitorInsight.Last_Modified = new Date();
    competitorInsight.isSynced = false;
    competitorInsight.Event_Id = fetchCurrentDateIdStr() + '-' + accountId;
    competitorInsight.Daily_Tracker = fetchCurrentDateIdStr();
    const position = await getCurrentLocationHelper();
    competitorInsight.Geolocation_Latitude = position.coords.latitude;
    competitorInsight.Geolocation_Longitude = position.coords.longitude;
    await writeData('competitorInsight', competitorInsight);
    window.location.href = `/view/objectives/competitorInsights/competitionInsightsPage2.html?accountId=${accountId}`;
};

const fetchPreviousVisitData = async (dealerId) => {
    let competitorInsightPrevious = await getItemFromStore('recentCompetitorInsightDealerWise', dealerId);
    let isReset = true;
    if(competitorInsightPrevious){

        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let insightYear= new Date(competitorInsightPrevious.Last_Modified).getFullYear();
        let insightMonth = new Date(competitorInsightPrevious.Last_Modified).getMonth();
        if(currentMonth === insightMonth && currentYear === insightYear){
            isReset = false;
        }
    }
    if (competitorInsightPrevious) {
        competitorInsightPrevious.Competitor_Volume = competitorVolumen(competitorInsightPrevious.Competitor_Volume,isReset);
        if (accountRec.Channel__c === 'On-Premise') {
            competitorInsightPrevious.Visibility_On_Premise = visibility(competitorInsightPrevious.Visibility_On_Premise,isReset);
            delete competitorInsightPrevious.Visibility_Off_Premise;
        }
        else {
            delete competitorInsightPrevious.Visibility_On_Premise;
            competitorInsightPrevious.Visibility_Off_Premise = visibility(competitorInsightPrevious.Visibility_Off_Premise,isReset);
        }
        if (accountRec.QCO_Flag__c) {
            competitorInsightPrevious.Promotions_QCO = promotions(competitorInsightPrevious.Promotions_QCO,isReset);
            delete competitorInsightPrevious.Promotions_On_Premise;
            delete competitorInsightPrevious.Promotions_Off_Premise;
        }
        else if (accountRec.Channel__c === 'On-Premise') {
            competitorInsightPrevious.Promotions_On_Premise = promotions(competitorInsightPrevious.Promotions_On_Premise,isReset);
            delete competitorInsightPrevious.Promotions_QCO;
            delete competitorInsightPrevious.Promotions_Off_Premise;
        }
        else {
            competitorInsightPrevious.Promotions_Off_Premise = promotions(competitorInsightPrevious.Promotions_Off_Premise,isReset);
            delete competitorInsightPrevious.Promotions_On_Premise;
            delete competitorInsightPrevious.Promotions_QCO;
        }
        return competitorInsightPrevious;
    }
    else {
        return null;
    }
};

const competitorVolumen = (volumeArr,isReset) => {
    let isCrafEnabled = false;
    let tempVolumneArray = [];
    for (let i = 0; i < competitorBuckets.length > 0; i++) {
        if (competitorBuckets[i] !== 'Craft') {
            let insightValue = { show_option: false, Competitor_Name: competitorBuckets[i] };
            if(!isReset){
                for (let j = 0; j < volumeArr.length > 0; j++) {
                    let isBreak = false;
                    if (competitorBuckets[i] === volumeArr[j].Competitor_Name) {
                        isBreak = true;
                        if(volumeArr[j].Contract_Type){
                            if (j > 2) {
                                isCrafEnabled = true;
                            }
                        }
                        insightValue = {
                            ...insightValue,
                            ...volumeArr[j],
                            show_option : volumeArr[j].Contract_Type ? true : false,
                            Start_Date : volumeArr[j].Start_Date ? new Date(volumeArr[j].Start_Date) : null,
                            End_Date : volumeArr[j].End_Date ? new Date(volumeArr[j].End_Date) : null,
                        };
                    }
                    
                    if (isBreak) {
                        break;
                    }
                }
            }
            
            tempVolumneArray.push(insightValue);
        }


    }
    
    // volumeArr = volumeArr.map((ele, index) => {
    //     ele.Start_Date = ele.Start_Date ? new Date(ele.Start_Date) : null;
    //     ele.End_Date = ele.End_Date ? new Date(ele.End_Date) : null;
    //     if (ele.Contract_Type) {
    //         ele.show_option = true;
    //         if (index > 3) {
    //             isCrafEnabled = true;
    //         }
    //     }
    //     else {
    //         ele.show_option = false;
    //     }
    //     return ele;
    // });
    // for (let i = volumeArr.length - 1; i < 9; i++) {
    //     volumeArr.push({
    //         show_option: false,
    //         Competitor_Name: competitorBuckets[i + 1],
    //     });
    // }
    if (isCrafEnabled) {
        tempVolumneArray.splice(3, 0, { show_option: true, Competitor_Name: 'Craft' });
    }
    else {
        tempVolumneArray.splice(3, 0, { show_option: false, Competitor_Name: 'Craft' });
    }
    return tempVolumneArray;
};

const visibility = (visibilityArr,isReset) => {

    let isCrafEnabled = false;
    let tempVisibleArray = [];
    for (let i = 0; i < competitorBuckets.length > 0; i++) {
        if (competitorBuckets[i] !== 'Craft') {
            let insightValue = { show_panel: false, Competitor_Name: competitorBuckets[i] };
            if(!isReset){
                for (let j = 0; j < visibilityArr.length > 0; j++) {
                    let isBreak = false;
                    if (competitorBuckets[i] === visibilityArr[j].Competitor_Name) {
                        isBreak = true;
                        for (let i in visibilityArr[j]) {
                            if (typeof visibilityArr[j][i] === 'boolean' && visibilityArr[j][i]) {
                                insightValue[i] = true;
                                insightValue[i + "_File"] = 'IM';
                                insightValue.show_panel = true;
                                if (j > 2) {
                                    isCrafEnabled = true;
                                }
                            }
    
                        }
                    }
                    
                    if (isBreak) {
                        break;
                    }
                }
            }
            
            tempVisibleArray.push(insightValue);
        }


    }
    // visibilityArr = visibilityArr.map((ele,index) => {
    //     for(let i in ele){
    //         if( typeof ele[i] ==='boolean'&&ele[i]){

    //             ele[i+"_File"] = 'IM';
    //             ele.show_panel = true;
    //             if(index>3){
    //                 isCrafEnabled = true;
    //             }
    //         }

    //     }
    //     if(!ele.show_panel){
    //         ele.show_panel = false;
    //     }
    //     return ele;
    // });
    // for(let i = tempVisibleArray.length-1;i<9;i++){
    //     tempVisibleArray.push({
    //         show_panel : false,
    //         Competitor_Name : competitorBuckets[i+1],
    //     });
    // }
    if (isCrafEnabled) {
        tempVisibleArray.splice(3, 0, { show_panel: true, Competitor_Name: 'Craft' });
    }
    else {
        tempVisibleArray.splice(3, 0, { show_panel: false, Competitor_Name: 'Craft' });
    }
    return tempVisibleArray;
};
const promotions = (promotionArr,isReset) => {

    let isCrafEnabled = false;
    let tempVisibleArray = [];
    for (let i = 0; i < competitorBuckets.length > 0; i++) {
        if (competitorBuckets[i] !== 'Craft') {
            let insightValue = { show_panel: false, Competitor_Name: competitorBuckets[i] };
            if(!isReset){
                for (let j = 0; j < promotionArr.length > 0; j++) {
                    let isBreak = false;
                    if (competitorBuckets[i] === promotionArr[j].Competitor_Name) {
                        isBreak = true;
                        for (let i in promotionArr[j]) {
                            if (typeof promotionArr[j][i] === 'boolean' && promotionArr[j][i]) {
                                insightValue[i] = true;
                                insightValue[i + "_File"] = 'IM';
                                insightValue.show_panel = true;
                                if (j > 2) {
                                    isCrafEnabled = true;
                                }
                            }
    
                        }
                    }
                    
                    if (isBreak) {
                        break;
                    }
                }
            }
            
            tempVisibleArray.push(insightValue);
        }


    }

    if (isCrafEnabled) {
        tempVisibleArray.splice(3, 0, { show_panel: true, Competitor_Name: 'Craft' });
    }
    else {
        tempVisibleArray.splice(3, 0, { show_panel: false, Competitor_Name: 'Craft' });
    }
    // promotionArr = promotionArr.map((ele, index) => {
    //     if(!isReset){
    //         for (let i in ele) {
    //             if (typeof ele[i] === 'boolean' && ele[i]) {
    //                 ele[i + "_File"] = 'IM';
    //             }
    //         }
            

    //     }
    //     return ele;
    // });
    // for (let i = promotionArr.length - 1; i < 10; i++) {
    //     promotionArr.push({
    //         Competitor_Name: competitorBuckets[i + 1],
    //     });
    // }
    // promotionArr.splice(3, 0, { Competitor_Name: 'Craft' });

    return tempVisibleArray;
};

initializeInsights();


// Dashboard Data Backend Generation
const overallDataGeneration = () => {
    let premiumTotal = accountRec['UB_Monthly_Premium_Volume__c'] ? accountRec['UB_Monthly_Premium_Volume__c'] : 0;
    premiumTotal += accountRec['ABI_Monthly_Premium_Volume__c'] ? accountRec['ABI_Monthly_Premium_Volume__c'] : 0;
    premiumTotal += accountRec['Carlsberg_Monthly_Premium_Volume__c'] ? accountRec['Carlsberg_Monthly_Premium_Volume__c'] : 0;
    premiumTotal += accountRec['Craft_Monthly_Premium_Volume__c'] ? accountRec['Craft_Monthly_Premium_Volume__c'] : 0;
    let massTotal = accountRec['UB_Monthly_Mass_Volume__c'] ? accountRec['UB_Monthly_Mass_Volume__c'] : 0;
    massTotal += accountRec['ABI_Monthly_Mass_Volume__c'] ? accountRec['ABI_Monthly_Mass_Volume__c'] : 0;
    massTotal += accountRec['Carlsberg_Monthly_Mass_Volume__c'] ? accountRec['Carlsberg_Monthly_Mass_Volume__c'] : 0;
    massTotal += accountRec['Craft_Monthly_Mass_Volume__c'] ? accountRec['Craft_Monthly_Mass_Volume__c'] : 0;
    
    overAllDasboard.push({
        Name : 'UB',
        Premium : accountRec['UB_Monthly_Premium_Volume__c'] ? accountRec['UB_Monthly_Premium_Volume__c'] : 0,
        Mass : accountRec['UB_Monthly_Mass_Volume__c'] ? accountRec['UB_Monthly_Mass_Volume__c'] : 0,
        PremiumPer : ((accountRec['UB_Monthly_Premium_Volume__c'] ? accountRec['UB_Monthly_Premium_Volume__c'] : 0) / (premiumTotal === 0 ? 1 :premiumTotal ))*100,
        MassPer : ((accountRec['UB_Monthly_Mass_Volume__c'] ? accountRec['UB_Monthly_Mass_Volume__c'] : 0) / (massTotal === 0 ? 1 :massTotal ))*100,
    });
    overAllDasboard.push({
        Name : 'ABI',
        Premium : accountRec['ABI_Monthly_Premium_Volume__c'] ? accountRec['ABI_Monthly_Premium_Volume__c'] : 0,
        Mass : accountRec['ABI_Monthly_Mass_Volume__c'] ? accountRec['ABI_Monthly_Mass_Volume__c'] : 0,
        PremiumPer : ((accountRec['ABI_Monthly_Premium_Volume__c'] ? accountRec['ABI_Monthly_Premium_Volume__c'] : 0) / (premiumTotal === 0 ? 1 :premiumTotal ))*100,
        MassPer : ((accountRec['ABI_Monthly_Mass_Volume__c'] ? accountRec['ABI_Monthly_Mass_Volume__c'] : 0) / (massTotal === 0 ? 1 :massTotal ))*100,
    });
    overAllDasboard.push({
        Name : 'Carlsberg',
        Premium : accountRec['Carlsberg_Monthly_Premium_Volume__c'] ? accountRec['Carlsberg_Monthly_Premium_Volume__c'] : 0,
        Mass : accountRec['Carlsberg_Monthly_Mass_Volume__c'] ? accountRec['Carlsberg_Monthly_Mass_Volume__c'] : 0,
        PremiumPer : ((accountRec['Carlsberg_Monthly_Premium_Volume__c'] ? accountRec['Carlsberg_Monthly_Premium_Volume__c'] : 0) / (premiumTotal === 0 ? 1 :premiumTotal ))*100,
        MassPer : ((accountRec['Carlsberg_Monthly_Mass_Volume__c'] ? accountRec['Carlsberg_Monthly_Mass_Volume__c'] : 0) / (massTotal === 0 ? 1 :massTotal ))*100,
    });
    overAllDasboard.push({
        Name : 'Craft',
        Premium : accountRec['Craft_Monthly_Premium_Volume__c'] ? accountRec['Craft_Monthly_Premium_Volume__c'] : 0,
        Mass : accountRec['Craft_Monthly_Mass_Volume__c'] ? accountRec['Craft_Monthly_Mass_Volume__c'] : 0,
        PremiumPer : ((accountRec['Craft_Monthly_Premium_Volume__c'] ? accountRec['Craft_Monthly_Premium_Volume__c'] : 0) / (premiumTotal === 0 ? 1 :premiumTotal ))*100,
        MassPer : ((accountRec['Craft_Monthly_Mass_Volume__c'] ? accountRec['Craft_Monthly_Mass_Volume__c'] : 0) / (massTotal === 0 ? 1 :massTotal ))*100,
    });
};



const contractedVolumeDataGeneration =async () => {
    let competitorInsightPrevious = await getItemFromStore('recentCompetitorInsightDealerWise', accountRec.Id);
    let contractedVolumeCompMap = new Map();
     if(competitorInsightPrevious){
        competitorInsightPrevious.Competitor_Volume.forEach(ele => {
            if(ele.Competitor_Name==='Carlsberg' ||ele.Competitor_Name==='UB' || ele.Competitor_Name==='ABI'   ){
                if(!contractedVolumeCompMap.has(ele.Competitor_Name)){
                    let checkQuarter = ele.Contract_Period === "Quarterly" ? 3 : 12;
                    if(ele.Contract_Type === "Market Share")
                    {
                        contractedVolumeCompMap.set(ele.Competitor_Name,{
                            Name : ele.Competitor_Name,
                            MassPer : Math.round(ele.Market_Share_Mass ? ele.Market_Share_Mass : 0) ,
                            PremiumPer : Math.round(ele.Market_Share_Premium ? ele.Market_Share_Premium : 0),
                            Contract_Type :ele.Contract_Type,
                        });
                    }else{
                        contractedVolumeCompMap.set(ele.Competitor_Name,{
                            Name : ele.Competitor_Name,
                            Mass : Math.round(ele.Contracted_Volume_Mass ? ele.Contracted_Volume_Mass/checkQuarter : 0) ,
                            Premium : Math.round(ele.Contracted_Volume_Premium ? ele.Contracted_Volume_Premium/checkQuarter : 0),
                            Contract_Type :ele.Contract_Type,
                        });
                    }
                    // contractedVolumeCompMap.set(ele.Competitor_Name,{
                    //     Name : ele.Competitor_Name,
                    //     Mass : Math.round(ele.Contracted_Volume_Mass ? ele.Contracted_Volume_Mass/checkQuarter : 0) ,
                    //     Premium : Math.round(ele.Contracted_Volume_Premium ? ele.Contracted_Volume_Premium/checkQuarter : 0),
                    // });
                }
            }
            else if(ele.Competitor_Name==='Simba' || ele.Competitor_Name==='White Owl' ||ele.Competitor_Name==='White Rhino'||ele.Competitor_Name==='Hopper' ||ele.Competitor_Name==='Witlinger'||ele.Competitor_Name==='Others' ){
                let checkQuarter = ele.Contract_Period === "Quarterly" ? 3 : 12;
                   
                if(contractedVolumeCompMap.has('Craft')){
                    if(ele.Contract_Type === 'Market Share')
                    {
                        let tempObj = contractedVolumeCompMap.get('Craft');
                        tempObj.MassPer += Math.round(ele.Market_Share_Mass ? ele.Market_Share_Mass : 0) ;
                        tempObj.PremiumPer += Math.round(ele.Market_Share_Premium ? ele.Market_Share_Premium : 0) ;
                       // tempObj.Contract_Type =ele.Contract_Type;
                        contractedVolumeCompMap.set('Craft',tempObj);
                    }else{
                        let tempObj = contractedVolumeCompMap.get('Craft');
                        tempObj.Mass += Math.round(ele.Contracted_Volume_Mass ? ele.Contracted_Volume_Mass/checkQuarter : 0) ;
                        tempObj.Premium += Math.round(ele.Contracted_Volume_Premium ? ele.Contracted_Volume_Premium/checkQuarter : 0) ;
                      //  tempObj.Contract_Type =ele.Contract_Type;
                        contractedVolumeCompMap.set('Craft',tempObj);
                    }
                }
                else{
                    if(ele.Contract_Type === 'Market Share')
                    {
                        contractedVolumeCompMap.set('Craft',{
                            Name : 'Craft',
                            MassPer : Math.round(ele.Market_Share_Mass ? ele.Market_Share_Mass : 0 ),
                            PremiumPer : Math.round(ele.Market_Share_Premium ? ele.Market_Share_Premium : 0),
                            Mass :0,
                            Premium : 0
                        });
                    }else{
                        contractedVolumeCompMap.set('Craft',{
                            Name : 'Craft',
                            Mass : Math.round(ele.Contracted_Volume_Mass ? ele.Contracted_Volume_Mass/checkQuarter : 0 ),
                            Premium : Math.round(ele.Contracted_Volume_Premium ? ele.Contracted_Volume_Premium/checkQuarter : 0),
                            MassPer : 0,
                            PremiumPer : 0
                        });                        
                    }
                }
            }
            
        });
     } 
     
     const allCompetitorList = ['UB','ABI','Carlsberg','Craft'];
     for(let i=0;i<allCompetitorList.length;i++){
        if(contractedVolumeCompMap.has(allCompetitorList[i])){
            contractedVol.push(
                contractedVolumeCompMap.get(allCompetitorList[i])
            );
        }
        else{
            contractedVol.push({
                Name : allCompetitorList[i],
                Mass : 0,
                Premium : 0
            });
        }
     }
     let massTotal = 0;
     let premiumTotal = 0;
     for(let i of overAllDasboard){
        massTotal += Math.round(i.Mass ? i.Mass : 0);
        premiumTotal += Math.round(i.Premium ? i.Premium : 0);
     }
console.log(contractedVol)
     for(let i of contractedVol){
         if(i.Name !== 'Craft' && i.Contract_Type === 'Fixed Volume'){
            i.MassPer = Math.round((i.Mass / (massTotal ===0 ? 1 : massTotal ))*100);
            i.PremiumPer = Math.round((i.Premium / (premiumTotal ===0 ? 1 : premiumTotal ))*100);
         }else if(i.Name !== 'Craft' && i.Contract_Type === 'Market Share'){
            i.Mass = Math.round((i.MassPer/100) * (massTotal ===0 ? 1 : massTotal ));
            i.Premium = Math.round((i.PremiumPer/100) * (premiumTotal ===0 ? 1 : premiumTotal ));
         }

         if(i.Name === 'Craft'){
             let craftMass,craftPrem,craftMassPer,craftPremiumPer = 0
             craftMass = Math.round((i.MassPer/100) * (massTotal ===0 ? 1 : massTotal ));
             craftPrem = Math.round((i.PremiumPer/100) * (premiumTotal ===0 ? 1 : premiumTotal ));

             craftMassPer = Math.round((i.Mass / (massTotal ===0 ? 1 : massTotal ))*100);
             craftPremiumPer = Math.round((i.Premium / (premiumTotal ===0 ? 1 : premiumTotal ))*100);

             i.Mass += craftMass ? craftMass : 0;
             i.Premium += craftPrem ? craftPrem : 0;
             i.PremiumPer += craftPremiumPer ? craftPremiumPer : 0;
             i.MassPer +=craftMassPer ? craftMassPer: 0 ;
         }
     }
};


const calNonContracted = () =>{
    for(let i=0;i<contractedVol.length;i++)
    {
      if(contractedVol[i].Name == overAllDasboard[i].Name){
        let nonContractObj = {};
        nonContractObj.Name = contractedVol[i].Name;
        nonContractObj.Premium = (overAllDasboard[i].Premium ? overAllDasboard[i].Premium : 0 ) - (contractedVol[i].Premium ? contractedVol[i].Premium : 0);
        nonContractObj.Mass = (overAllDasboard[i].Mass ? overAllDasboard[i].Mass : 0) - (contractedVol[i].Mass ? contractedVol[i].Mass : 0);

        nonContractedVol.push(nonContractObj);
      }

    }
    let massTotal = 0;
     let premiumTotal = 0;
    for(let i of overAllDasboard){
        massTotal += i.Mass ? i.Mass : 0;
        premiumTotal += i.Premium ? i.Premium : 0;
     }
     for(let i of nonContractedVol){
        i.MassPer = Math.round((i.Mass / (massTotal ===0 ? 1 : massTotal ))*100);
        i.PremiumPer = Math.round((i.Premium / (premiumTotal ===0 ? 1 : premiumTotal ))*100);
     }
    
};


