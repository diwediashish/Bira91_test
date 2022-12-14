let competitorInsights = null;
let Competitor_Tie_up_Draft = null;
const initializeCompetitorInsight =(async () => {
    let urlParam = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('account',urlParam.get('accountId'));
    showAccount();
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'Technician';
    competitorInsights = await getItemFromStore('competitorInsight',key);
    
    if(!competitorInsights){
        competitorInsights = {
            App_Id: key,
            Created_Date: new Date(),
            accountId: accountRec.Id,
        };
        Competitor_Tie_up_Draft = [];
        for(let i=0;i<fieldName.length;i++){
            Competitor_Tie_up_Draft.push({
                Serviceware : false,
                Signage : false,
                Front_Facade : false,
                Customized_Branding : false,
                Promotion : false,
                Competitor_Name : fieldName[i]
            });
            Competitor_Tie_up_Draft[i][fieldName[i]] = false;
        }
        
            
        
    }   
    else{
        Competitor_Tie_up_Draft = competitorInsights.Competitor_Tie_up_Draft;
        
    }
    initializedDraftTieUp();
})();


const submitForm = async() => {
    let utilityEvent = await getItemFromStore('utility','event');
    competitorInsights.Last_Modified = new Date();
    competitorInsights.isSynced = false;
    competitorInsights.Event_Id = fetchCurrentDateIdStr() + '-' + accountRec.Id+ '-'+utilityEvent.event.Type__c;
    competitorInsights.Daily_Tracker = fetchCurrentDateIdStr();
    competitorInsights.Competitor_Tie_up_Draft =Competitor_Tie_up_Draft;
    await writeData('competitorInsight', competitorInsights);
    let urlParam = new URLSearchParams(window.location.search);
    window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id+'&eventId='+urlParam.get('eventId');
};


