
exports.fetchEvents = async (req,res) => {
    try{
        const sfConnection = req.conn;
        let tasks = req.body.tasks;
        const syncDateTime = req.syncDateTime;
        let events = null;
        let standardEvents = null;
        let stateClusterMappingArr = [];
        let territoryRecords;
        let draftInstallationPendingApproval;
        if(tasks.length>0){
            tasks = tasks.map(ele => {
                delete ele.Unique_Identifier__c;
                return ele;
              });
            const taskUpdate = tasks.filter(ele =>  ele.Id);
            const taskInsert = tasks.filter(ele =>  !ele.Id);
            await sfConnection.sobject('Task').insert(taskInsert);
            await sfConnection.sobject('Task').update(taskUpdate);
            
        }
        if(req.body.nonSales.isTech ){
            events = await sfConnection.query(`SELECT Check_In__latitude__s,Check_In__longitude__s,End_date_and_time__c,Start_date_and_time__c,Name,Account__c,Id,Account__r.Beer_Selection__c,Account__r.L3M_Billed_Liquids__c,Account__r.Name,Account__r.Account_Status__c,Account__r.BillingStreet,Account__r.BillingCity,Account__r.BillingPostalCode,Account__r.BillingState,Account__r.BillingCountry,Account__r.Beacon_Flag__c,Account__r.QCO_Flag__c,Account__r.Bira_Segment__c,Account__r.Id,Account__r.Industry_Segment__c,Account__r.Industry_Segment_Mass__c,Account__r.Draft_Ready__c,Account__r.Channel__c,Account__r.L1M_Billed_Liquids__c,Account__r.Recent_Retail_Depletion__c,Completed__c,Actual_Start_Visit__c,Actual_End_Visit__c,Type__c,Draft_Installation__c, Draft_Installation__r.Recent_Preventive_Maintenance_Date__c, Draft_Installation__r.Recent_Sanitization_Date__c, Draft_Installation__r.Confirmed_with_the_outlet_owner_for_inst__c,Draft_Installation__r.Recommended_Machine_Type_Sales__c,Draft_Installation__r.Recommended_Tower_Type_Sales__c,Draft_Installation__r.Display_Machine_Id__c,Draft_Installation__r.Over_the_counter_space_required__c,Draft_Installation__r.Under_the_counter_space_required__c,Draft_Installation__r.Location_of_Draft_machine__c,Draft_Installation__r.KYC__r.Tin_Number__c,Draft_Installation__r.KYC__r.PAN_number__c,Draft_Installation__r.Machine_Id_Not_Sign_Up__c,Draft_Installation__r.Recommended_Machine_type__c,Draft_Installation__r.Number__c,Draft_Installation__r.Recommended_Tower_Type__c,Draft_Installation__r.Draft_Sign_up__c,Draft_Installation__r.Draft_Sign_up__r.Number__c,Draft_Installation__r.Draft_Sign_up__r.Active_Liquids__c,Draft_Installation__r.App_Id__c,Draft_Installation__r.Draft_Installation__c,App_Id__c,Draft_Installation__r.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c,Draft_Installation__r.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c FROM Event__c WHERE Start_date_and_time__c>=LAST_90_DAYS AND Type__c!=null AND RecordType.DeveloperName='Technician' AND OwnerId='${req.conn.userInfo.id}' ORDER BY Start_date_and_time__c DESC`);
        }
        else if(req.body.nonSales.isAudit){
            events = await sfConnection.query(`SELECT Check_In__latitude__s,Check_In__longitude__s,End_date_and_time__c,Start_date_and_time__c,Name,Account__c,Id,Account__r.Beer_Selection__c,Account__r.L3M_Billed_Liquids__c,Account__r.Name,Account__r.Account_Status__c,Account__r.BillingStreet,Account__r.BillingCity,Account__r.BillingPostalCode,Account__r.BillingState,Account__r.BillingCountry,Account__r.Beacon_Flag__c,Account__r.QCO_Flag__c,Account__r.Bira_Segment__c,Account__r.Id,Account__r.Industry_Segment__c,Account__r.Industry_Segment_Mass__c,Account__r.Draft_Ready__c,Account__r.Channel__c,Account__r.L1M_Billed_Liquids__c,Account__r.Recent_Retail_Depletion__c,Completed__c,Actual_Start_Visit__c,Actual_End_Visit__c,Type__c,Draft_Installation__c,Draft_Installation__r.Recommended_Machine_Type_Sales__c,Draft_Installation__r.Recommended_Tower_Type_Sales__c,Draft_Installation__r.Display_Machine_Id__c,Draft_Installation__r.Over_the_counter_space_required__c,Draft_Installation__r.Under_the_counter_space_required__c,Draft_Installation__r.Location_of_Draft_machine__c,Draft_Installation__r.KYC__r.Tin_Number__c,Draft_Installation__r.KYC__r.PAN_number__c,Draft_Installation__r.Machine_Id_Not_Sign_Up__c,Draft_Installation__r.Recommended_Machine_type__c,Draft_Installation__r.Recommended_Tower_Type__c,Draft_Installation__r.Draft_Sign_up__c,Draft_Installation__r.Draft_Sign_up__r.Active_Liquids__c,Draft_Installation__r.App_Id__c,Draft_Installation__r.Draft_Installation__c,App_Id__c FROM Event__c WHERE Start_date_and_time__c>=LAST_90_DAYS AND Type_of_Visit__c!=null AND RecordType.DeveloperName='Auditor' AND OwnerId='${req.conn.userInfo.id}' ORDER BY Start_date_and_time__c DESC`);
        }
        else{
            events = await sfConnection.query(`SELECT Type_of_Visit__c,Check_In__latitude__s,Check_In__longitude__s,End_date_and_time__c,Start_date_and_time__c,Name,Account__c,Id,Account__r.Beer_Selection__c,Account__r.L3M_Billed_Liquids__c,Account__r.Name,Account__r.Account_Status__c,Account__r.BillingStreet,Account__r.BillingCity,Account__r.BillingPostalCode,Account__r.BillingState,Account__r.BillingCountry,Account__r.Beacon_Flag__c,Account__r.QCO_Flag__c,Account__r.Bira_Segment__c,Account__r.Id,Account__r.Industry_Segment__c,Account__r.Industry_Segment_Mass__c,Account__r.Draft_Ready__c,Account__r.Channel__c,Account__r.L1M_Billed_Liquids__c,Account__r.Recent_Retail_Depletion__c,Completed__c,Actual_Start_Visit__c,Actual_End_Visit__c,Type__c,Draft_Installation__r.Payment_Status__c,Draft_Installation__r.Display_Machine_Id__c,Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Machine_type__c, Draft_Pullout__r.Draft_Pre_Installation__r.Recommended_Tower_Type__c, Draft_Pullout__r.Draft_Sign_up__r.Number__c, Draft_Pullout__r.Draft_Sign_up__r.Recommended_Machine_Type_Sales__c, Draft_Pullout__r.Draft_Sign_up__r.Recommended_Tower_Type_Sales__c, Draft_Pullout__r.Draft_Sign_up__r.Location_of_Draft_machine__c, Account__r.Cluster__r.Name,Draft_Pullout__r.App_Id__c   FROM Event__c WHERE Start_date_and_time__c>=LAST_90_DAYS AND RecordType.DeveloperName='Salesperson' AND OwnerId='${req.conn.userInfo.id}'  ORDER BY Start_date_and_time__c DESC `);
            draftInstallationPendingApproval = await sfConnection.query(`SELECT Account__c, Account__r.Channel__c, Account__r.Account_Status__c, Account__r.Name, Account__r.L1M_Billed_Liquids__c, Account__r.L3M_Billed_Liquids__c, Account__r.Recent_Retail_Depletion__c, Account__r.Beer_Selection__c, Account__r.Bira_Segment__c, Account__r.Industry_Segment__c, Account__r.Industry_Segment_Mass__c, Account__r.Beacon_Flag__c, Account__r.Draft_Ready__c, Account__r.QCO_Flag__c, Draft_Sign_up__r.Recommended_Machine_Type_Sales__c, Draft_Sign_up__r.Recommended_Tower_Type_Sales__c, Recommended_Tower_Type__c, Recommended_Machine_type__c, Over_the_counter_space_required__c, Under_the_counter_space_required__c, Location_of_Draft_machine__c, Reason_for_Change__c, Id, App_Id__c, Status__c, Machine_Id_Not_Sign_Up__c, Confirmed_with_the_outlet_owner_for_inst__c, RecordType.Name FROM Draft_Installation__c WHERE Status__c ='Submitted to SO' AND Draft_Sign_up__r.CreatedBy.Id='${req.conn.userInfo.id}' `); 
        }

        standardEvents = await sfConnection.query(`Select Id,WhatId,StartDateTime, Description, EndDateTime, Location, Subject from Event WHERE StartDateTime>=LAST_90_DAYS AND Custom_Event__c=null AND OwnerId='${req.conn.userInfo.id}' ORDER BY StartDateTime DESC`);

        let taskList = await sfConnection.query('SELECT WhatId,Priority,Subject,Description,ActivityDate,Status,Id,OwnerId FROM Task WHERE ActivityDate>=LAST_90_DAYS  ORDER BY ActivityDate DESC');
        taskList = taskList.records.map(ele => {
            ele.Unique_Identifier__c = ele.Id;
            return ele; 
        });
        if(req.body.nonSales.isSales){
            let stateClusterMapping = await sfConnection.query(`SELECT Name,Id,RecordType.DeveloperName,Country__c,District__c,State__c,(SELECT Cluster__r.Name, Cluster__c FROM Cluster_State_Mappings__r ORDER BY Cluster__r.Name) FROM Geo_Hierarchy__c   ORDER BY Name`);
            let isCompleted = false;
            isCompleted = stateClusterMapping.done;
            stateClusterMappingArr = stateClusterMappingArr.concat(stateClusterMapping.records);
            while(!isCompleted){
                
                let queryLocator = stateClusterMapping.nextRecordsUrl;
                isCompleted = stateClusterMapping.done;
                if(!isCompleted){
                    stateClusterMapping = await  sfConnection.queryMore(queryLocator);
                    stateClusterMappingArr = stateClusterMappingArr.concat(stateClusterMapping.records);
                }
            }
            territoryRecords = await sfConnection.query(`SELECT Name,Id,RecordType.DeveloperName,Division__c,Zone__c,Business_Hierarchy__c FROM Cluster__c  ORDER BY Name`);
        }
        res.status(200).json({isError : false,isAuth : true,events :events ?  events.records : [],taskList : taskList,stateClusterMapping : stateClusterMappingArr.length>0 ? stateClusterMappingArr :[],territoryRecords : territoryRecords ? territoryRecords.records : [],draftInstallationPendingApproval : draftInstallationPendingApproval ? draftInstallationPendingApproval.records : [], standardEvents : standardEvents ? standardEvents.records : [] });
    }
    catch(e){
        console.log(e);
        res.status(500).json({isError : true,isAuth : true,message : 'Error occurred'});
    } 
};

// Fetching item records
exports.itemFetchController = async (req,res) => {
    try{
        let sfConnection = req.conn;
        const syncDateTime = req.syncDateTime;
        let clusterLiquids = null;
        let items = null;
        let top5SKU = [];
        let queryString = 'SELECT Liquid_Name__c,Liquid_Id__c,Has_Keg_Item__c,Product__r.isActive,Id,Product__c,Product__r.Name,Product__r.Display_Name__c,Total_Billing_Price__c,Total_Tax__c,State__r.Name,Product__r.Size_ID__r.Pack_Type__c,Product__r.Size_ID__r.Volume_Unit__c,Product__r.Size_ID__r.UOM_of_Primary_Conversion__c,Variant__c,Product__r.Variant_ID__c,Pack_Size__c,Product__r.Portfolio__c FROM Price_Master__c ';
        if(syncDateTime){
            queryString += ' WHERE LastModifiedDate >= '+syncDateTime;
        }
        items = await sfConnection.query(queryString);
        if(req.body.nonSales.isSales){
            clusterLiquids = await sfConnection.query(`SELECT Cluster__c,Liquid__c,Liquid_Name__c,is_Draft_Available__c FROM Cluster_Liquid_Mapping__c`);
        }
        top5SKU = await sfConnection.query('SELECT Channel__c, Cluster__c, Item_Master__c,Id FROM Top_5_SKU__c');
        res.status(200).json({isError : false,isAuth : true, items : items ? items.records : [],clusterLiquids :clusterLiquids ? clusterLiquids.records : [],top5SKU  : top5SKU ? top5SKU.records : []  });
    }
    catch(e){
        console.log(e);
        res.status(500).json({isError : true,isAuth : true,message : e});
    }
};

//Fetching images related to the items passed 
exports.itemImagesFetch = async (req,res) => {
    try{
        const syncDateTime = req.body.syncDateTime;
        let sfConnection = req.conn;
        const itemIds = req.body.itemIds;
        let body = {itemIdsString : itemIds,modifiedDate : syncDateTime};
        let apexWrapper = await sfConnection.apex.post('/Images/',body);
        let contentVersionIds = [];
        let itemIdWithContentId = new Map();
        apexWrapper.forEach(ele => {
            contentVersionIds.push(ele.base64Image);
            itemIdWithContentId.set(ele.base64Image,ele.picId);
        });
        
        require('../utility/sfSoapHelper').fetchContentVersion(req, contentVersionIds, (arr) => {
            let itemImagesList = [];
            if(arr){
                arr.result.forEach(ele => {
                    if(itemIdWithContentId.has(ele.Id)){
                        itemImagesList.push({
                            base64Image : ele.VersionData,
                            picId : itemIdWithContentId.get(ele.Id)
                        });
                        
                    }
                });
            }
            res.status(200).json({isError : false,isAuth : true,images :itemImagesList});
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({isError : true,isAuth : true,message : e});
    }
};

exports.objectiveSync = async (req,res) => {
    try{
        let event = req.body.events;
        let kycDetail = req.body.kycDetail;
        let salesOrder = req.body.salesOrder;
        let stockVisibilites = req.body.stockVisibility;
        let sfConnection = req.conn;
        let competitorInsight = req.body.competitorInsight;
        let dailyTracker = req.body.dailyTracker;
        let productSampling = req.body.productSampling;
        let posm = req.body.posm;
        let draftSignup = req.body.draftSignup;
        let draftPreInstallation = req.body.draftPreInstallation;
        let draftItems = [];
        let dealerWiseVisitInfo = {};
        let posmLine = [];
        let filesAttach = [];
        let dealerWiseVisitInfoJSON = '';
        let posmSetting = null;
        let draftStarterKit = null;
        let licenseTypeStateWise = null;
        let scheduleVisits = req.body.scheduleVisit;
        let draftSanitization = req.body.draftSanitization;
        let preventiveMaintenance = req.body.preventiveMaintenance;
        let draftPullout = req.body.draftPullout;
        kycDetail = kycDetail.map(ele => {
            if(!ele.Estimated_Date_of_Approval){
                ele.Estimated_Date_of_Approval = null;
            }
            return ele;
        });
        let body = {
            User_Name : req.body.username,
            stockVisibilites :  JSON.stringify(stockVisibilites),
            SalesOrders : JSON.stringify(salesOrder),
            competitorInsightJSON : JSON.stringify(competitorInsight),
            accountJSON : JSON.stringify(kycDetail),
            dailyTracker : JSON.stringify(dailyTracker),
            eventString : JSON.stringify(event),
            syncDateTime : req.body.syncDateTime,
            productPreSalesSamples  : JSON.stringify(productSampling)
        };
        dealerWiseVisitInfo =  await sfConnection.apex.post('/ObjectivesCheckoutHelper/',body);
        dealerWiseVisitInfoJSON = JSON.parse(dealerWiseVisitInfo);
        
        // Draft Pre Installation
        if(draftPreInstallation.length>0){
            draftPreInstallation = draftPreInstallation.map(ele => {
                draftItems = draftItems.concat(ele.items);
                delete ele.items;
                if(ele['Over_the_counter_space_required_File']){
                    filesAttach.push({
                        base64 : ele['Over_the_counter_space_required_File'],
                        typeOfObjective : 'Draft Pre-Installation',
                        accountId : ele.Account__c,
                        objectiveId : ele.App_Id__c,
                        fieldName : 'Over the Counter Space Available Image (Technician)'
                    });
                }
                if(ele['Under_the_counter_space_required_File']){
                    filesAttach.push({
                        base64 : ele['Under_the_counter_space_required_File'],
                        typeOfObjective : 'Draft Pre-Installation',
                        accountId : ele.Account__c,
                        objectiveId : ele.App_Id__c,
                        fieldName : 'Under the Counter Space Available Image (Technician)'
                    });
                }
                ele.App_Created_Date__c = formatDate(ele.App_Created_Date__c);
                delete ele['Under_the_counter_space_required_File'];
                delete ele['Over_the_counter_space_required_File'];
                return ele;
            });  

        }
        // Draft Pre Installation
        // Draft Sanitization and Preventive Maintenance
        if(draftSanitization&&draftSanitization.length>0){
            draftSanitization = draftSanitization.map(ele => {
                delete ele.isSynced;
                ele.App_Created_Date__c = formatDate(ele.App_Created_Date__c);
                if(ele.items&&ele.items.length>0)
                    draftItems = draftItems.concat(ele.items);
                delete ele.items;
                if(ele.liquidItems&&ele.liquidItems.length>0)
                    draftItems = draftItems.concat(ele.liquidItems);
                delete ele.liquidItems;
                for(let i in ele){
                    if(i.includes('File')){
                        filesAttach.push({
                            base64 : ele[i],
                            typeOfObjective : 'Draft Sanitization',
                            accountId : ele.Account__c,
                            objectiveId : ele.App_Id__c,
                            fieldName : ele[i+'_Name']
                        });
                        delete ele[i];
                        delete ele[i+'_Name'];
                    }
                    
                }
                return ele;
            });
        }
        if(preventiveMaintenance&&preventiveMaintenance.length>0){
            preventiveMaintenance = preventiveMaintenance.map(ele => {
                delete ele.isSynced;
                ele.App_Created_Date__c = formatDate(ele.App_Created_Date__c);
                if(ele.items&&ele.items.length>0)
                    draftItems = draftItems.concat(ele.items);
                delete ele.items;
                if(ele.liquidItems&&ele.liquidItems.length>0)
                    draftItems = draftItems.concat(ele.liquidItems);
                delete ele.liquidItems;
                for(let i in ele){
                    if(i.includes('File')){
                        filesAttach.push({
                            base64 : ele[i],
                            typeOfObjective : 'Preventive Maintenance',
                            accountId : ele.Account__c,
                            objectiveId : ele.App_Id__c,
                            fieldName : ele[i+'_Name']
                        });
                        delete ele[i];
                        delete ele[i+'_Name'];
                    }
                    
                }
                return ele;
            });
        }
        // Draft Sanitization and Preventive Maintenance
        // Draft Pull Out
        if(draftPullout&&draftPullout.length>0){
            draftPullout = draftPullout.map(ele => {
                delete ele.isSynced;
                ele.App_Created_Date__c = formatDate(ele.App_Created_Date__c);
                if(ele.items&&ele.items.length>0)
                    draftItems = draftItems.concat(ele.items);
                delete ele.items;
                for(let i in ele){
                    if(i.includes('File')){
                        filesAttach.push({
                            base64 : ele[i],
                            typeOfObjective : 'Draft Pullout',
                            accountId : ele.Account__c,
                            objectiveId : ele.App_Id__c,
                            fieldName : ele[i+'_Name']
                        });
                        delete ele[i];
                        delete ele[i+'_Name'];
                    }
                    
                }
                return ele;
            });
        }
        // Draft Pull Out
        posm = posm.map(ele => {
            delete ele.isSynced;
            ele.Requisition_Date__c = formatDate(ele.Requisition_Date__c);
            posmLine = posmLine.concat(ele.posmLineItem);
            delete ele.Created_Date;
            delete ele.posmLineItem;
            return ele;
        });
        
        draftSignup = draftSignup.map(ele => {
            if(ele['Over_the_counter_space_available_File']){
                filesAttach.push({
                    base64 : ele['Over_the_counter_space_available_File'],
                    typeOfObjective : 'Draft Installation',
                    accountId : ele.Account__c,
                    objectiveId : ele.App_Id__c,
                    fieldName : 'Over the Counter Space Available Image'
                });
            }
            if(ele['Under_the_counter_space_available_File']){
                filesAttach.push({
                    base64 : ele['Under_the_counter_space_available_File'],
                    typeOfObjective : 'Draft Installation',
                    accountId : ele.Account__c,
                    objectiveId : ele.App_Id__c,
                    fieldName : 'Under the Counter Space Available Image'
                });
            }
            if('Pullout_Date__c' in ele){
                ele['Pullout_Date__c'] = new Date(ele['Pullout_Date__c']);
            }
            if('Installation_Date__c' in ele){
                ele['Installation_Date__c'] = new Date(ele['Installation_Date__c']);
            }
            if('Requisition_Date__c' in ele){
                ele['Requisition_Date__c'] = formatDate(new Date(ele['Requisition_Date__c']));                
            }
            delete ele['Under_the_counter_space_available_File'];
            delete ele['Over_the_counter_space_available_File'];
            return ele;
        });
        
        // Draft Installation
        let draftInstallation = req.body.draftInstallation;
        if(draftInstallation&&draftInstallation.length>0){
            draftInstallation = draftInstallation.map(ele => {
                
                if(ele.items&&ele.items.length>0)
                    draftItems = draftItems.concat(ele.items);
                delete ele.items;
                for(let i in ele){
                    if(i.includes('File')){
                        filesAttach.push({
                            base64 : ele[i],
                            typeOfObjective : 'Draft Installation',
                            accountId : ele.Account__c,
                            objectiveId : ele.App_Id__c,
                            fieldName : ele[i+'_Name']
                        });
                        delete ele[i];
                        delete ele[i+'_Name'];
                    }
                    
                }
                ele.App_Created_Date__c = formatDate(ele.App_Created_Date__c);
                return ele;
            });
        }
        // Draft Installation
        //Brand Freshness and Hygiene Item Addition to draftItem variable
        for(let i of req.body.auditorObjective){
            if(i.Record_Type_Helper__c==='Audit_Brand_Freshness_and_Hygiene_Audit'&&i.brandFreshnessItems){
                draftItems = draftItems.concat(i.brandFreshnessItems);
                delete i.brandFreshnessItems;
            }
        }
        //Brand Freshness and Hygiene Item Addition to draftItem variable
        // Draft Item Filter
        draftItems = draftItems.filter(ele => {
            if('Keg_Expiry_Date__c' in ele && ele['Keg_Expiry_Date__c']){
                    ele['Keg_Expiry_Date__c'] = formatDate(ele['Keg_Expiry_Date__c']);
                    
                    
                }
                if('Pullout_Quantity__c' in ele){
                    return ele;
                }
                
                if('Quantity__c' in ele){
                    return ele.Quantity__c>0;
                }
                else{
                    return true;
                }            
        });
        // Draft Item Filter
        // Draft Processes Helper Function
        let draftProcesses = draftProcessesHelper(req);
        draftProcesses = draftProcesses.concat(draftSanitization);
        draftProcesses = draftProcesses.concat(preventiveMaintenance);
        // Draft Processes Helper Function
        let bodyHelper2 = {
            posmString : JSON.stringify(posm),
            posmItemString : JSON.stringify(posmLine),
            draftInstallationString : JSON.stringify(draftSignup),
            draftPreInstallationStr : JSON.stringify(draftPreInstallation),
            draftItemsStr : JSON.stringify(draftItems),
            filesAttach : JSON.stringify(filesAttach),
            draftInstallationStr : JSON.stringify(draftInstallation),
            draftProcessesStr : JSON.stringify(draftProcesses),
            draftPulloutStr : JSON.stringify(draftPullout)
        };
        await sfConnection.apex.post('/ObjectivesCheckoutHelper2/',bodyHelper2);
        let nonBeerproducts = await sfConnection.query("SELECT Id,RecordType.DeveloperName,ProductCode,Description,Name,QuantityUnitOfMeasure,Channel_On_Off__c,Sub_Channel__c,Type__c,Category__c,Draft_Section__c, Liquid_Layer__r.Name FROM Product2 WHERE (RecordType.DeveloperName='POSM' OR RecordType.DeveloperName='Draft' ) AND IsActive=true ");
        
        if(req.body.nonSales.isSales){
            posmSetting = await sfConnection.query("SELECT Account_Fields__c,DeveloperName,Off_Premise_POSM_Code__c,Off_Premise_Record_Type_Allowed__c,On_Premise_POSM_Code__c,On_Premise_Record_Type_Allowed__c,Channel_Allowed__c FROM POSM__mdt WHERE DeveloperName='POSM_App_Setup' OR DeveloperName='Draft_App_Setting'");
            draftStarterKit = await sfConnection.query("SELECT Starter_Kit__c,Product_Code__c FROM Draft_Starter_Kit__mdt");
            licenseTypeStateWise = await sfConnection.query("SELECT DeveloperName,MasterLabel,License__c FROM Type_of_Licence_State_Wise__mdt ");
            let res = await sfConnection.sobject('Draft_Installation__c').update(req.body.draftPreInstallationApproval);
        }
        
        // Schedule Visit Procedure
        if(scheduleVisits&&scheduleVisits.length>0){
            await sfConnection.sobject('Event__c').create(scheduleVisits);
            
        }
        // Schedule Visit Procedure


        res.status(200).json({isError : false,isAuth : true,competitorInsightJSON :dealerWiseVisitInfoJSON.competitorInsights ,StockVisibilityJSON :dealerWiseVisitInfoJSON.StockVisibilitySurveyWrapper , nonBeerProducts : nonBeerproducts ? nonBeerproducts.records  : []  ,posmSetting : posmSetting ? posmSetting.records : [] ,licenseType : licenseTypeStateWise ? licenseTypeStateWise.records : [] ,draftStarterKit : draftStarterKit ? draftStarterKit.records : []});
    }
    catch(e){
        console.log(e);
        res.status(500).json({isError : true,isAuth : true,message :e});
    }
};


const draftProcessesHelper = (req) => {
    let machineCommissioning = req.body.machineCommissioning;
    let training = req.body.training;
    let auditorObjective = req.body.auditorObjective;
    let draftProcesses = [];
    if(machineCommissioning&&machineCommissioning.length>0){
        draftProcesses = draftProcesses.concat(machineCommissioning);
    }
    if(training&&training.length>0){
        draftProcesses = draftProcesses.concat(training);
    }
    if(auditorObjective&&auditorObjective.length>0){
        draftProcesses = draftProcesses.concat(auditorObjective);
    }
    for(let i of draftProcesses){
        i.App_Created_Date__c  = formatDate(i.App_Created_Date__c);
    }
    return draftProcesses;
};

exports.fetchDayWiseEventsAndTask =async (req,res) => {
    try{
        const fetchedDate = formatDate(req.body.requestDate);
        const sfConnection = req.conn;
        let events = await sfConnection.query(`SELECT Name,Account__c,Id,Account__r.Name,Account__r.Account_Status__c,Start_date_and_time__c FROM Event__c WHERE DAY_ONLY(Start_date_and_time__c)=${fetchedDate} ORDER BY Start_date_and_time__c DESC`);
        let taskList = await sfConnection.query(`SELECT WhatId,Subject,Id,ActivityDate, OwnerId   FROM Task WHERE ActivityDate=${fetchedDate}  ORDER BY ActivityDate DESC`);
        let standardEvents = await sfConnection.query(`Select Id,StartDateTime,WhatId, Description, EndDateTime, Location, Subject from Event WHERE StartDateTime>=LAST_90_DAYS AND Custom_Event__c=null AND OwnerId='${req.conn.userInfo.id}' ORDER BY StartDateTime DESC`);

        res.json({isError : false,isAuth : true,tasks : taskList.records,events : events.records,standardEvents : standardEvents.records});
    }
    catch(e){
        console.log(e);
        res.json({isError : true,isAuth : true,message : e});
    }
        
};
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
