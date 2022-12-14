

let leadCreate = {};
let clusterMap = new Map();
let clusterList = [];
let clusterMaster = [];
let stateList = [];
let stateMaster = [];
let marketList = [];
let districtMaster = [];
let districtList = [];
let marketMaster = [];
let stateMap = new Map();
let countryId ;
let clusterNameIdMap = new Map();
let stateDistrictMap = new Map();
let clusterMarketMap = new Map();
let divisionClusterMap = new Map();
const initializeLeadCreate = async() => {
    let states = await getItemFromStore('utility','stateClusterMapping');
    stateList = states.stateClusterList;
    // State List Sorting
    stateMaster = stateList;
    stateList.forEach(ele => {
        if(ele.Name === 'India' && ele.RecordType.DeveloperName === 'Country'){
            countryId = ele.Id;
        }
        if(ele.RecordType.DeveloperName === 'District'){
            if(stateDistrictMap.has(ele.State__c)){
                let tempArr = stateDistrictMap.get(ele.State__c);
                tempArr.push({Name : ele.Name,Id : ele.Id});
                stateDistrictMap.set(ele.State__c,tempArr);
            }
            else{
                stateDistrictMap.set(ele.State__c,[{Name : ele.Name,Id : ele.Id}]);
            }
        }
        if(ele.RecordType.DeveloperName === 'State'){
            stateMap.set(ele.Id,ele.Name);
            if(ele.Cluster_State_Mappings__r){
                ele.Cluster_State_Mappings__r.records.forEach(eleCluster => {
                    clusterNameIdMap.set(eleCluster.Cluster__c,eleCluster.Cluster__r.Name);
                });
                clusterMap.set(ele.Id,ele.Cluster_State_Mappings__r.records);
            }
        }
        
    });
    let territoryRecords = (await getItemFromStore('utility','territoryRecords')).territoryRecords;
    for(let i of territoryRecords){
         if(i.RecordType.DeveloperName === 'Market'){
            if(clusterMarketMap.has(i.Business_Hierarchy__c)){
                let tempArr = clusterMarketMap.get(i.Business_Hierarchy__c);
                tempArr.push({Name : i.Name,Id : i.Id});
                clusterMarketMap.set(i.Business_Hierarchy__c,tempArr);
            }
            else{
                clusterMarketMap.set(i.Business_Hierarchy__c,[{Name : i.Name,Id : i.Id}]);
            }
         }
         if(i.RecordType.DeveloperName === 'Cluster'){
            divisionClusterMap.set(i.Id,i.Division__c);
         }
    }
    stateList = states.stateClusterList.filter(ele => {
        return ele.RecordType.DeveloperName === 'State';
    });
    stateMaster = stateList;
    showState();
    showCluster();
    showDistrict();
    showMarket();
};


const handleSubmitRequest =async () => {
    let divisionId = divisionClusterMap.get(leadCreate['Cluster__c']);
    leadCreate['Division__c'] = divisionId;
    leadCreate['Billing_Country__c'] = countryId;
    let territoryRecords = (await getItemFromStore('utility','territoryRecords')).territoryRecords;
    for(let i of territoryRecords){
        if(i.RecordType.DeveloperName === 'Division'){
            if(divisionId === i.Id){
                leadCreate['Zone__c'] = i.Zone__c;
                break;
            }
        }
    }
    await writeData('leadsync',leadCreate);
    await adhocRequest({sObjectName : 'lead'});
    
};
initializeLeadCreate();