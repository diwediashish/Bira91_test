
let itemImagesMap = new Map();
let posm = {};
let productCodeMap = new Map();
let gstNo = '';
let billingStreet = '';
let state = '';
let city = '';
let isReadOnly = false;
const initializePOSMController = async() => {
    let urlParam = new URLSearchParams(window.location.search);
    accountRec = await getItemFromStore('account',urlParam.get('accountId'));
    listOfProduct  = await fetchRecordsUsingIndex('nonBeerItems','RecordType.DeveloperName','POSM');
    let posmSetting = (await getItemFromStore('utility','posmSettings')).posmSetting[0];
    let offRecordTypeArr = posmSetting.Off_Premise_Record_Type_Allowed__c ? posmSetting.Off_Premise_Record_Type_Allowed__c.split(',') : [];
    let onRecordTypeArr = posmSetting.On_Premise_Record_Type_Allowed__c ? posmSetting.On_Premise_Record_Type_Allowed__c.split(',') : [];
    let isOnPremise = false;
    let isOffPremise = false;
    
    if(offRecordTypeArr.indexOf(accountRec.RecordType.DeveloperName)>-1 ){
        isOffPremise = true;
    }
    if(onRecordTypeArr.indexOf(accountRec.RecordType.DeveloperName)>-1){
        isOnPremise = true;
    }
    let productCodeString = '';
    if(isOffPremise){
        productCodeString += posmSetting.Off_Premise_POSM_Code__c ?posmSetting.Off_Premise_POSM_Code__c : '' ;
    }
    if(isOnPremise){
        productCodeString += posmSetting.On_Premise_POSM_Code__c ?posmSetting.On_Premise_POSM_Code__c : '' ;
    }

    showAccount();
    await posmProducts(isOnPremise,isOffPremise);
    await initializePOSMProducts(productCodeString);
    await initializeKYC();
    initializePOSM();

};
const initializeKYC =async () => {
    const key = `${fetchCurrentDateIdStr()}-${accountRec.Id}`;
    let kyc = await getItemFromStore('kycDetail',key);
    state = accountRec.BillingState ? accountRec.BillingState : '';
    if(!kyc){
        gstNo = accountRec.GST__c ? accountRec.GST__c : '';
        billingStreet = accountRec.BillingStreet ? accountRec.BillingStreet : '';
        city = accountRec.BillingCity ? accountRec.BillingCity : '';
    }
    else{
        
        posm.KYC_Id__c = kyc.App_Id;
        gstNo = kyc['GST'] ? kyc['GST'] : '';
        billingStreet = kyc['Billing_Street'] ? kyc['Billing_Street'] : '';
        city = kyc['Billing_City'] ? kyc['Billing_City'] : '';
    }
    $('#gstNumber').val(gstNo);
    $('#outletAddress').val(billingStreet);
    $('#state').val(state);
    $('#city').val(city);

};
const initializePOSMProducts =async (productCodeString) => {
    const key = `${fetchCurrentDateIdStr()}-${accountRec.Id}`;
    posm = await getItemFromStore('posm',key);
    if(!posm){
        posm = {
            posmLineItem : fetchTopSKU(productCodeString),
            Outlet__c : accountRec.Id ,
            App_Id__c : key,
            Created_Date : new Date(),
        };
    }
    else{
        if(posm.isCheckedOut === true)
        {
            isReadOnly = true;
            showNotification({message :'POSM record already submitted. Opening in read only mode!'} );
            $('#productAdditionBtn').css('display','none');
            $('#submitBtn').html('Back');
        }
    }
    orderedProduct = posm.posmLineItem;
    orderedProduct.forEach(ele => {
        totalSelectedProd.add(ele.Product__c);
    });

};

const fetchTopSKU = (productCodeString) => {
    let productCodeArr =  productCodeString.split(',');
    let posmLineTemp = [];
    productCodeArr.forEach(ele =>{
        if(productCodeMap.has(ele)){
            totalSelectedProd.add(productCodeMap.get(ele).Id);
            posmLineTemp.push({
                Name : productCodeMap.get(ele).Name,
                Product__c : productCodeMap.get(ele).Id,
                Quantity__c : 0 ,
                App_Id__c	 : `${fetchCurrentDateIdStr()}-${accountRec.Id}-${productCodeMap.get(ele).Id}`,
                Parent_App_Id__c : `${fetchCurrentDateIdStr()}-${accountRec.Id}`,
                Status__c : 'Submitted',
            });
        }
    });
    return posmLineTemp;
};

const posmProducts = async (isOnPremise,isOffPremise) => {
    
    listOfProduct  = await fetchRecordsUsingIndex('nonBeerItems','RecordType.DeveloperName','POSM');
    listOfProduct = listOfProduct.filter(ele => {
        productCodeMap.set(ele.ProductCode,ele);
        if(ele.Channel_On_Off__c==='On / Off'){
            return true;
        }
        if(isOffPremise&&ele.Channel_On_Off__c!=='Off'){
            return false;
        }
        if(isOnPremise&&ele.Channel_On_Off__c!=='On'){
            return false;
        }
        return true;
    });
    let itemImages = await readAllData('itemMasterImages');
    itemImages.forEach(ele => {
        itemImagesMap.set(ele.picId,ele.base64Image);
    });
    
};

const handleSubmitPOSM = async () => {
    showLoaderSpinner();
    const gstNoTemp = $('#gstNumber').val();
    const outletAddTemp = $('#outletAddress').val();
    const cityTemp = $('#city').val();

    let kycId = '';
    if(!gstNoTemp || !outletAddTemp || !cityTemp){
        hideLoaderSpinner();
        showNotification({message :'GST,City & Outlet Address are Mandatory for POSM'} );
        return;
    }
    if(!gstValidator(gstNoTemp)){
        hideLoaderSpinner();
        showNotification({message :'Incorrect GST Format'} );
        return;
    }
    $('#kycModal').modal('hide');
    if(gstNoTemp!==gstNo || outletAddTemp!==billingStreet || cityTemp!==city){
        kycId = await kycCreationUpdation();   
        posm.KYC_Id__c = kycId ?kycId : null;
    }
    
   
    posm.posmLineItem = orderedProduct;
    const position  = await getCurrentLocationHelper();
    posm.Geolocation__latitude__s = position.coords.latitude;
    posm.Geolocation__longitude__s = position.coords.longitude;
    posm.isSynced = false;
    
    posm.Billing_State__c = accountRec.BillingState;
    posm.Requisition_Date__c = new Date();
    posm.Daily_Tracker_App_Id__c = fetchCurrentDateIdStr();
    posm.Status__c = 'Submitted';
    let urlParam = new URLSearchParams(window.location.search);
    if(urlParam.has('bottomBar')){
        posm.Event_Id__c = null;
        posm.isCheckedOut = true;
    }
    else{
        posm.Event_Id__c = fetchCurrentDateIdStr()+'-'+accountRec.Id;
        posm.isCheckedOut = false;
    }
    await writeData('posm',posm);
    showNotification({message :'POSM is submitted for Approval!'} );
    setTimeout(() => {
        handleCancelPOSM();
    },2000)
    

};
const gstValidator = (g) => {
    let regTest = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(g);

    return regTest
};
const kycCreationUpdation = async() => {
    const gstNoTemp = $('#gstNumber').val();
    const outletAddTemp = $('#outletAddress').val();
    const cityTemp = $('#city').val();
    const key = `${fetchCurrentDateIdStr()}-${accountRec.Id}`;
    let kycDetail = await getItemFromStore('kycDetail',key);
    if(!kycDetail){
        kycDetail = {
            accountId : accountRec.Id,
            App_Id : key ,
            sameAsBilling : true,
            Created_Date : new Date(),

        };
        
        const accountFields = ["Owner_First_Name","Owner_Last_Name","Owner_Address","Contact_First_Name",
                     "Contact_Last_Name","PAN","Sales_Tehsil","Sales_District","License_Type",
                    "License_Number","License_Name","GST","TIN","Central_Sales_Tax_Number",
                    "VAT_Registration_Number","Bank_Account_Name","Bank_Account_Number","Owner_Title","Contact_Title","Registration_Certificate_File","Parternership_Deed_File","Tin_Vat_Certicate_File","Gst_Registration_Certificate_File","License_Copy_File","Front_Fascade_File","Pan_Card_File","Billing_Street","Billing_Postal_Code","Billing_City","Temporarily_Closed","Estimated_Monthly_Premium_Mass_Sales","ParentId","Craft_Monthly_Mass_Volume","Craft_Monthly_Premium_Volume","UB_Monthly_Mass_Volume","UB_Monthly_Premium_Volume","ABI_Monthly_Mass_Volume","ABI_Monthly_Premium_Volume","Carlsberg_Monthly_Mass_Volume","Carlsberg_Monthly_Premium_Volume",'Channel','Sub_Channel','Beacon_Flag','QCO_Flag','Type','Ocassion','Draft_Ready','Cuisine','Size_Format','Outdoor_Seating','Location','No_of_Rooms','Star_Rating','No_of_Banquets','Minibar_Available','Zomato_Cost_for_2','Other_Entertainment','Pool_Side','Beer_Selection'];
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
                        let accountDetail = await getItemFromStore('account',accountRec.ParentId);
                        kycDetail['Parent_Account_Name'] = accountDetail ? accountDetail.Name : '';
                    }
                }
                else if(i==='Other_Entertainment'){
                    let arr = accountRec[i+'__c'].split(';');
                    for(let k of arr){
                        kycDetail[k] = true;
                    }
                }
                else{
                    kycDetail[i] =  accountRec[keyName];
                }
            }
            
        }
        
    }
    kycDetail['GST'] = gstNoTemp; 
    kycDetail['Billing_Street'] = outletAddTemp;
    kycDetail['Billing_City'] = cityTemp;
    kycDetail['isSynced'] = false;
    kycDetail['isCheckedOut'] = false;
    kycDetail['Status'] = 'Submitted by SP';
    kycDetail.Daily_Tracker = fetchCurrentDateIdStr();
    kycDetail.Last_Modified = new Date();
    const position  = await getCurrentLocationHelper();
    kycDetail.Geolocation_Latitude = position.coords.latitude;
    kycDetail.Geolocation_Longitude = position.coords.longitude;
    await writeData('kycDetail',kycDetail);
    return key;
};
const handleCancelPOSM = () => {
    const recordTypeName = accountRec.RecordType.DeveloperName;

    
    let urlParam = new URLSearchParams(window.location.search);
    let bottomBar = urlParam.get('bottomBar');

    if(bottomBar){
        history.go(-1);
        return
    }

    if(recordTypeName==='Distributor_Warehouse'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
    }
    else if(recordTypeName==='Distributor'){
        window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+listOfAccount[accountIndex].Id;
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
// handlePageRedirect = async (value) => {
   
  
//     const recordTypeName = accountRec.RecordType.DeveloperName;
  
//     if (recordTypeName === "Distributor_Warehouse") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Distributor") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "On_Premise_General") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Consumer") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Institutional_Off_Premise") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Institutional_On_Premise") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Non_beer_Warehouse") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Off_Premise_Outlet") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "On_Premise_Hotel") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Supplier") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Temporary_Event") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=" +
//           accountRec.Id;
//       }
//     } else if (recordTypeName === "Wholesaler") {
//       if (value === "Home") {
//           let nonSales = await isTechnicianAuditorFuncHelper();
//           if(nonSales.isAudit){
//               window.location.href =
//               "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isSales){
//               window.location.href =
//               "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=" +
//               accountRec.Id;
//           }
//           else if(nonSales.isTech){
//               window.location.href =
//               "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
//               accountRec.Id;
//           }
        
//       } else if (value === "Related") {
//         window.location.href =
//           "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Detail") {
//         window.location.href =
//           "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=" +
//           accountRec.Id;
//       } else if (value === "Media") {
//         window.location.href =
//           "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id=" +
//           accountRec.Id;
//       }
//     }
//     else if (recordTypeName === 'Lead') {
//       if (value === 'Home') {
//         window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id;
//       }
//       else if (value === 'Related') {
//         window.location.href = '/view/leadDetail/leadDetailRelated.html?leadId=' + accountRec.Id;
//       }
//       else if (value === 'Detail') {
//         window.location.href = '/view/leadDetail/leadDetail.html?leadId=' + accountRec.Id;
//       }
//       else if (value === 'Media') {
//         window.location.href = '/view/leadDetail/leadDetailMedia.html?leadId=' + accountRec.Id;
//       }
  
//     }
//   };
initializePOSMController();