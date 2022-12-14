let displayConditionStr;
const fetchAccounts = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }

    await promotionsDataGeneration(); // Data Generation for the dashboards
    createPromotionDashboard();// Dashboard UI Generation based on data generated above
    showAccount();
    initializeInsights();
    
};
const initializeInsights =async () => {
    let urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    competitorInsight = await getItemFromStore('competitorInsight',key);
    if((!accountRec.Channel__c)||(accountRec.Channel__c&&!(accountRec.Channel__c==='On-Premise'||accountRec.Channel__c==='Off-Premise'))){
        displayConditionStr = 'Not_Applicable';
    }
    else{
        if(accountRec.QCO_Flag__c){
            if(!competitorInsight.Promotions_QCO){
                competitorInsight.Promotions_QCO = competitorsValue();
            }
            promotionArray = competitorInsight.Promotions_QCO ;
            displayConditionStr = 'QCO'; 
            
        }
        else if(accountRec.Channel__c==='On-Premise'){
            if(!competitorInsight.Promotions_On_Premise){
                competitorInsight.Promotions_On_Premise = competitorsValue();
            }
            promotionArray = competitorInsight.Promotions_On_Premise ;
            displayConditionStr = 'On-Premise'; 
        }
        else {
            if(!competitorInsight.Promotions_Off_Premise){
                competitorInsight.Promotions_Off_Premise = competitorsValue();
            }
            promotionArray = competitorInsight.Promotions_Off_Premise ;
            displayConditionStr = 'Off-Premise'; 
        }
        createCompetitorPage(promotionArray);
        showPromotions(displayConditionStr);
    }
};

const competitorBuckets = ["UB", "ABI", "Carlsberg", "Craft", "White Owl","Simba", "White Rhino", "Hopper", "Witlinger", "Others",];
const competitorsValue = () => {
    let arr = [];
    competitorBuckets.forEach(ele => {
        arr.push({
            Competitor_Name : ele,
            show_panel : false,
        });
    });
    return arr;
};

handleSubmitPromotions = async() => {
    
    if(accountRec.QCO_Flag__c){
        competitorInsight.Promotions_QCO = promotionArray ;
    }
    else if(accountRec.Channel__c==='On-Premise'){
        competitorInsight.Promotions_On_Premise = promotionArray ;
    }
    else if(accountRec.Channel__c==='Off-Premise') {
        competitorInsight.Promotions_Off_Premise = promotionArray ;
    }
    
    await writeData('competitorInsight',competitorInsight);
 submit();
};


const submit = () => {
    
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='On_Premise_General'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Consumer'){
        window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Institutional_Off_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Institutional_On_Premise'){
        window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Non_beer_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Off_Premise_Outlet'){
        window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='On_Premise_Hotel'){
        window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Supplier'){
        window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Temporary_Event'){
        window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName ==='Wholesaler'){
        window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id;
    }
};
const showAlertmsg = (alertMsg) =>{
    $('#showAlertmsg .modal-body h5').empty();
    $('#showAlertmsg .modal-body h5').append(alertMsg);
  };
fetchAccounts();



// Dashboard Code Below
const promotionsDataGeneration = async () => {
    let competitorInsightLastData =  await getItemFromStore('recentCompetitorInsightDealerWise',accountRec.Id);
    let competitorInsightsTempMap = new Map();
    if(competitorInsightLastData){
        let promotionTempArr = [];
        if(accountRec.QCO_Flag__c){
            promotionTempArr = competitorInsightLastData.Promotions_QCO ;
        }
        else if(accountRec.Channel__c==='On-Premise'){
            promotionTempArr = competitorInsightLastData.Promotions_On_Premise ;
        }
        else if(accountRec.Channel__c==='Off-Premise'){
            promotionTempArr = competitorInsightLastData.Promotions_Off_Premise ;
        }
        
        promotionTempArr.forEach(ele => {
            if(ele.Competitor_Name==='Carlsberg' ||ele.Competitor_Name==='UB' || ele.Competitor_Name==='ABI'   ){
                if(!competitorInsightsTempMap.has(ele.Competitor_Name)){
                    competitorInsightsTempMap.set(ele.Competitor_Name,{
                        Competitor_Name : ele.Competitor_Name,
                        Food_Combo : ele.Food_Combo,
                        Special_Price : ele.Special_Price,
                        Exclusive_Events : ele.Exclusive_Events,
                        Gift_with_Purchase : ele.Gift_with_Purchase,
                        Cocktail_Led_Promotion : ele.Cocktail_Led_Promotion,
                    });
                }
            }
            else if(ele.Competitor_Name==='Simba' || ele.Competitor_Name==='White Owl' ||ele.Competitor_Name==='White Rhino'||ele.Competitor_Name==='Hopper' ||ele.Competitor_Name==='Witlinger'||ele.Competitor_Name==='Others' ){
                if(competitorInsightsTempMap.has('Craft')){
                    let tempEle = competitorInsightsTempMap.get('Craft');
                    tempEle.Food_Combo = ele.Food_Combo ?ele.Food_Combo :  tempEle.Food_Combo;
                    tempEle.Special_Price = ele.Special_Price ?ele.Special_Price :  tempEle.Special_Price;
                    tempEle.Exclusive_Events = ele.Exclusive_Events ?ele.Exclusive_Events :  tempEle.Exclusive_Events;
                    tempEle.Gift_with_Purchase = ele.Gift_with_Purchase ?ele.Gift_with_Purchase :  tempEle.Gift_with_Purchase;
                    tempEle.Cocktail_Led_Promotion = ele.Cocktail_Led_Promotion ?ele.Cocktail_Led_Promotion :  tempEle.Cocktail_Led_Promotion;
                    competitorInsightsTempMap.set('Craft',tempEle);
                }
                else{
                    competitorInsightsTempMap.set('Craft',{
                        Competitor_Name : 'Craft',
                        Food_Combo : ele.Food_Combo,
                        Special_Price : ele.Special_Price,
                        Exclusive_Events : ele.Exclusive_Events,
                        Gift_with_Purchase : ele.Gift_with_Purchase,
                        Cocktail_Led_Promotion : ele.Cocktail_Led_Promotion,
                    });
                }
            }
        });
    }
    const allCompetitorList = ['UB','ABI','Carlsberg','Craft'];
    for(let i=0;i<allCompetitorList.length;i++){
        if(competitorInsightsTempMap.has(allCompetitorList[i])){
            dashboardPromotion.push(
                competitorInsightsTempMap.get(allCompetitorList[i])
            );
        }
        else{
            dashboardPromotion.push({
                Competitor_Name : allCompetitorList[i],
                Food_Combo : false,
                Special_Price : false,
                Exclusive_Events : false,
                Gift_with_Purchase : false,
                Cocktail_Led_Promotion : false,
            });
        }
     }
     
};