const accountFields = ["Owner_First_Name","Owner_Last_Name","Owner_Address","Contact_First_Name",
                     "Contact_Last_Name","PAN","Sales_Tehsil","Sales_District","License_Type",
                    "License_Number","License_Name","GST","TIN","Central_Sales_Tax_Number",
                    "VAT_Registration_Number","IFSC_Code","Bank_Account_Name","Bank_Address","Bank_Account_Number","Owner_Title","Contact_Title","Registration_Certificate_File","Parternership_Deed_File","Tin_Vat_Certicate_File","Gst_Registration_Certificate_File","License_Copy_File","Front_Fascade_File","Pan_Card_File","Billing_Street","Billing_Postal_Code","Billing_City","Temporarily_Closed","Estimated_Monthly_Premium_Mass_Sales","ParentId","Craft_Monthly_Mass_Volume","Craft_Monthly_Premium_Volume","UB_Monthly_Mass_Volume","UB_Monthly_Premium_Volume","ABI_Monthly_Mass_Volume","ABI_Monthly_Premium_Volume","Carlsberg_Monthly_Mass_Volume","Carlsberg_Monthly_Premium_Volume"];
let accountMap = new Map();
let parentAccounts = [];
let stateList = []; // Maintaining List of States
let stateMaster = [];// Maintaining List of Master
let stateMap = new Map();// Maintaining List of States Id and Name Map
let reverseStateMap = new Map();// Maintaining List of States Name and Id Map for Same As billing Address functionality
const initializeKYCDetail  = async () => {
    let urlParam = new URLSearchParams(window.location.search);
    const accountId = urlParam.get('accountId');
    
    const eventObjectiveId = urlParam.get('EventObjectiveId');
    const key = `${fetchCurrentDateIdStr()}-${accountId}`;
    kycDetail = await getItemFromStore('kycDetail',key);
    accountRec = await getItemFromStore('account',accountId);
    if(!accountRec){
        accountRec = await getItemFromStore('lead',accountId);
    }
    await initializeStateList();
    if(!kycDetail){
        kycDetail = {
            accountId : accountId,
            Event_Objective : eventObjectiveId,
            App_Id : key ,
            sameAsBilling : true,
            Created_Date : new Date()
        };
        
    }
    let isKycCreated = false;
    for(let i of accountFields){
        if(kycDetail.hasOwnProperty(i)){
            isKycCreated = true;
            break;
        }
    }
    if(!isKycCreated){
        for(let i of accountFields){
            let keyName;
            if(i==='Billing_Street'){
                keyName = 'BillingStreet';
            }
            else if(i==='Billing_Postal_Code'){
                keyName = 'BillingPostalCode';
            }
            else if(i==='Billing_City'){
                keyName = 'BillingCity';
            }
            else if(i==='Billing_City'){
                keyName = 'BillingCity';
            }
            else if(i==='Sales_Tehsil'){
                
                keyName = 'Tehsil__r';
                
            }
            else if(i==='Sales_District'){
                
                keyName = 'District__r';
            }
            else if(i==='Temporarily_Closed'){
                keyName = 'Account_Status__c';
            }
            else if(i==='ParentId'){
                keyName = 'ParentId';
            }
            else{
                keyName = i+'__c';
            }
            
            if(accountRec[keyName]&&!kycDetail[i]){
                
                if(keyName==='District__r'){
                    kycDetail[i] =  accountRec[keyName]['Name'];
                    
                    
                }
                else if(keyName==='Tehsil__r'){
                    kycDetail[i] =  accountRec[keyName]['Name'];
                    
                }
                else if(keyName==='Account_Status__c'){
                    kycDetail['Temporarily_Closed'] = accountRec.Account_Status__c && accountRec.Account_Status__c==='Temporarily Closed' ? true : false;  
                }
                else if(keyName === 'ParentId'){
                    kycDetail['Parent_Account'] = accountRec['ParentId'];
                    if(accountRec.ParentId){
                        
                        kycDetail['Parent_Account_Name'] = accountMap.has(accountRec.ParentId) ? accountMap.get(accountRec.ParentId).Name : '';
                    }
                }
                else{
                    kycDetail[i] =  accountRec[keyName];
                }
            }
            
        }
    }
    
    showAccount();
    initailizeKYC();
    shippingAddressField(kycDetail['sameAsBilling']);
    showState();
};


const saveKycDetail =async () => {
    
    await writeData('kycDetail',kycDetail);
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id='+accountRec.Id;
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

// Initializing state values on UI
const initializeStateList =async () => {
    let states = await getItemFromStore('utility','stateClusterMapping');
    stateList = states.stateClusterList;
    // State List Sorting
    stateMaster = stateList;
    stateList.forEach(ele => {
        if(ele.RecordType.DeveloperName === 'State')
        {
            stateMap.set(ele.Id,ele.Name);
        }
        
    });
    
    
};

initializeKYCDetail();