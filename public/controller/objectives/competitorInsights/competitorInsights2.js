const fetchAccounts = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    await visibilityDataGeneration();// Dashboard Data Generation for UI
    createVisibilityDashboard(); // Dashboard UI rendering based on the data generated above
    showAccount();
    initializeInsights();
};
let competitorInsight = {};
let competitorVisibility = [];
const initializeInsights =async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    
    competitorInsight = await getItemFromStore('competitorInsight',key);
    if((!accountRec.Channel__c)||(accountRec.Channel__c&&!(accountRec.Channel__c==='On-Premise'||accountRec.Channel__c==='Off-Premise'))){
        notApplicable();
    }
    else{
        if(accountRec.Channel__c==='On-Premise'){
            if(!competitorInsight.Visibility_On_Premise){
                competitorInsight.Visibility_On_Premise = competitorsValue(false);
            }
            competitorVisibility = competitorInsight.Visibility_On_Premise ;
            
        }
        else {
            if(!competitorInsight.Visibility_Off_Premise){
                competitorInsight.Visibility_Off_Premise = competitorsValue(true);
            }
            competitorVisibility = competitorInsight.Visibility_Off_Premise ;
            
        }
        formRender(accountRec.Channel__c);
        
    }
    
};

const competitorBuckets = ["UB", "ABI", "Carlsberg", "Craft", "White Owl","Simba", "White Rhino", "Hopper", "Witlinger", "Others",];
const competitorsValue = (offPremise) => {
    let arr = [];
    competitorBuckets.forEach(ele => {
        if(offPremise){
            arr.push({
                Competitor_Name : ele,
                show_panel : false,
                
            });
        }
        else{
            arr.push({
                Competitor_Name : ele,
                show_panel : false,
    
            });
        }
    });
    return arr;
};

const handleSubmitForm =async () => {
    let isValid = true;
    // let errorString = '';
    for(let i of competitorVisibility){
        console.log(i);
        if(i.show_panel){
            for(let j in i){
                if(!(j.includes('show'))&&typeof i[j]  ==='boolean' &&i[j]){
                    if(!i[`${j}_File`]){
                        isValid = false;
                        break;
                        // errorString += j.replace('_'," ")+ ' attachment is missing! ';
                    }
                }
            }
        }
        else{
            for(let j in i){
                if(!(j.includes('show'))&&typeof i[j]  ==='boolean' &&i[j]){
                    i[j] = false;
                    i[`${j}_File`] = '';
                }
            }
        }
        
        if(!isValid){
            break;
        }
    }
    if(!isValid){
        $('#showAlertmsg').modal('show');
        showAlertmsg('Images are mandatory where elements are present! Press Toggle off if image is not available');
        return;
    }
    if(accountRec.Channel__c==='On-Premise'){
        competitorInsight.Visibility_On_Premise = competitorVisibility;
    }
    else{
        competitorInsight.Visibility_Off_Premise = competitorVisibility;
    }
    
    await writeData('competitorInsight',competitorInsight);
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    
    window.location.href = `/view/objectives/competitorInsights/competitionInsightsPage3.html?accountId=${accountId}`;
};
const showAlertmsg = (alertMsg) =>{
    $('#showAlertmsg .modal-body h5').empty();
    $('#showAlertmsg .modal-body h5').append(alertMsg);
  };
fetchAccounts();


// Dashboard Code Below
const visibilityDataGeneration = async () => {
    let competitorInsightLastData =  await getItemFromStore('recentCompetitorInsightDealerWise',accountRec.Id);
    let competitorInsightsTempMap = new Map();
    if(competitorInsightLastData){
        let visibilityTempArr = [];
        if(accountRec.Channel__c==='On-Premise'){
            visibilityTempArr = competitorInsightLastData.Visibility_On_Premise ;
        }
        else if(accountRec.Channel__c==='Off-Premise'){
            visibilityTempArr = competitorInsightLastData.Visibility_Off_Premise ;
        }

        visibilityTempArr.forEach(ele => {
            if(ele.Competitor_Name==='Carlsberg' ||ele.Competitor_Name==='UB' || ele.Competitor_Name==='ABI'  ){
                if(!competitorInsightsTempMap.has(ele.Competitor_Name)){
                    competitorInsightsTempMap.set(ele.Competitor_Name,{
                        Competitor_Name : ele.Competitor_Name,
                        Draft : ele.Draft,
                        Led : ele.Led_Signage,
                        Customized_Branding : ele.Customized_Branding,
                        Indoor_Shelf : ele.Indoor_Shelf,
                        Front_Facade : ele.Front_Facade,
                        VisiCooler : ele.VisiCooler,
                        Menu_Listing : ele.Menu_Listing,
                    });
                }
            }
            else if(ele.Competitor_Name==='Simba' || ele.Competitor_Name==='White Owl' || ele.Competitor_Name==='White Rhino'|| ele.Competitor_Name==='Hopper' || ele.Competitor_Name==='Witlinger'|| ele.Competitor_Name==='Others' ){
                if(competitorInsightsTempMap.has('Craft')){
                    let tempEle = competitorInsightsTempMap.get('Craft');
                    tempEle.Draft = ele.Draft ?ele.Draft :  tempEle.Draft;
                    tempEle.Led = ele.Led_Signage ?ele.Led_Signage :  tempEle.Led;
                    tempEle.Customized_Branding = ele.Customized_Branding ?ele.Customized_Branding :  tempEle.Customized_Branding;
                    tempEle.Indoor_Shelf = ele.Indoor_Shelf ?ele.Indoor_Shelf :  tempEle.Indoor_Shelf;
                    tempEle.Front_Facade = ele.Front_Facade ?ele.Front_Facade :  tempEle.Front_Facade;
                    tempEle.VisiCooler = ele.VisiCooler ?ele.VisiCooler :  tempEle.VisiCooler;
                    tempEle.Menu_Listing = ele.Menu_Listing ? ele.Menu_Listing :tempEle.Menu_Listing;
                    competitorInsightsTempMap.set('Craft',tempEle);
                }
                else{
                    competitorInsightsTempMap.set('Craft',{
                        Competitor_Name : 'Craft',
                        Draft : ele.Draft,
                        Led : ele.Led_Signage,
                        Customized_Branding : ele.Customized_Branding,
                        Indoor_Shelf : ele.Indoor_Shelf,
                        Front_Facade : ele.Front_Facade,
                        VisiCooler : ele.VisiCooler,
                        Menu_Listing : ele.Menu_Listing,
                    });
                }
            }
        });
    }
    const allCompetitorList = ['UB','ABI','Carlsberg','Craft'];
    for(let i=0;i<allCompetitorList.length;i++){
        if(competitorInsightsTempMap.has(allCompetitorList[i])){
            dashboardVisibility.push(
                competitorInsightsTempMap.get(allCompetitorList[i])
            );
        }
        else{
            dashboardVisibility.push({
                Competitor_Name : allCompetitorList[i],
                Draft : false,
                Led : false,
                Customized_Branding : false,
                Indoor_Shelf : false,
                Front_Facade : false,
                VisiCooler : false,
                Menu_Listing : false,
            });
        }
     }
     
};