
const soapHelper  = require('../utility/sfSoapHelper');

exports.fetchAccounts = async(req, res) => {
    try {
        let sfConnection = req.conn;
        let contacts = req.body.contacts;
        let leads = req.body.leads;
        
        contacts = contacts.map(ele => {
            if('Account' in ele){
                delete ele.Account;
            }
            if('Address' in ele){
                delete ele.Address;
            }
            if('Age__c' in ele){
                delete ele.Age__c;
            }
            if('Name' in ele){
                delete ele.Name;
            }
            return ele;
        });
        
        if(contacts.length>0)
            await sfConnection.sobject("Contact").update(contacts);
        if(leads.length>0){
            let recordTypeId = await sfConnection.query("SELECT Id FROM RecordType WHERE SobjectType='Account' AND DeveloperName='Lead'");
            leads = leads.map(ele => {
                ele.RecordTypeId = recordTypeId.records[0].Id;
                return ele;
            });

            let resp =  await sfConnection.sobject("Account").insert(leads);
            // Lead Insert Error email handler
            let errorLeads = [];
            let errorMsgs = [];
            resp.forEach((ele,index) => {
                if(!ele.success){
                    errorLeads.push(leads[index]);
                    const errorMsg  =ele.errors[0].message;
                    errorMsgs.push(errorMsg);
                }
                
            });
            if(errorLeads.length>0){
                let errorApexClassBody = {
                    userName : req.body.username,
                    subject : 'Lead Insertion error',
                    records : JSON.stringify(errorLeads),
                    errors : JSON.stringify(errorMsgs),
                    objectType : 'Lead',
                };
                await sfConnection.apex.post('/errorEmailHelperHeroku/',errorApexClassBody);
            }
            
        }
        res.setHeader('Content-Type','application/json');
        let queryString = "Select Account_Name_IndexedDB_Helper__c,Recent_Sanitization_Date__c,Recent_Preventive_Maintenance_Date__c,Quaterly_Sales_CE__c, Monthly_Sales_CE__c, Lead_Status__c,Cluster__c,Cluster__r.Name,UB_Monthly_Mass_Volume__c,UB_Monthly_Premium_Volume__c,ABI_Monthly_Mass_Volume__c,ABI_Monthly_Premium_Volume__c,Carlsberg_Monthly_Mass_Volume__c,Carlsberg_Monthly_Premium_Volume__c,Craft_Monthly_Mass_Volume__c,Craft_Monthly_Premium_Volume__c,Recent_Activity_Comments__c,Recent_Activity_Date_Time__c,IsDeleted,District__r.Name,Tehsil__r.Name,Id,Recent_Retail_Depletion__c,L1M_Billed_Liquids__c,L3M_Billed_Liquids__c,Ever_Billed_Liquids__c,Never_Billed_Liquids__c,MTD_Sales_Premium__c,L3M_Sales_Avg_Premium__c,L3M_Sales_Avg__c,Industry_Segment_Mass__c,Website,Average_Velocity_of_Kegs__c,Name,ParentId,Account_Status__c,Beacon_Flag__c,Beer_Selection__c,BIRA_Non_Premium_Sales__c,BIRA_Premium_Sales__c,Bira_Segment__c,Central_Sales_Tax_Number__c,Channel__c,Close_Reason__c,Competitor_Non_Premium_Sales__c,Competitor_Premium_Sales__c,Corporation_Outlet__c,Credit_Limit__c,Cuisine__c,Current_Outstanding__c,Delivery_Constraints_Details__c,Direct_Billing_Flag__c,Draft_Agreement_Number__c,Draft_Ready__c,Draft_Status__c,Email__c,Excise_Code__c,Flag_for_Customer_on_Hold_Finance_Hold__c,GeoLocation__c,Group_Account_Flag__c,Group_Number__c,Growth_Type__c,GST__c,Hold_Status__c,Imported_Brands__c,Industry_Segment__c,Keg_Stock_Limit__c,KYC_Done__c,Last_Keg_Order_Date__c,License_Name__c,License_Number__c,License_Type__c,Liquor_Available__c,Local_Sales_Tax_Number__c,Location__c,Market_Share__c,Minibar_Available__c,MTD_Sales__c,No_of_Banquets__c,No_of_Rooms__c,Non_Premium_Brands_Share_Bira__c,Non_Premium_Brands_Share_Competitor__c,Number_of_Draft_Machines__c,Ocassion__c,Other_Entertainment__c,Outdoor_Seating__c,PAN__c,PAN_Reference_Number__c,Phone,Pool_Side__c,POSM_ready__c,Preferred_Delivery_Day__c,Preferred_Delivery_Time__c,Premium_Brands__c,Premium_Brands_Share_Bira__c,Premium_Brands_Share_Competitor__c,QCO_Flag__c,QTD_Sales__c,Registered_Name__c,Sales_Type__c,Size_Format__c,Star_Rating__c,Sub_Channel__c,TIN__c,Total_Market_Size_Absolute_Value__c,Total_Market_Size_Sales__c,Type__c,VAT_Registration_Number__c,YTD_Sales__c,Zomato_Cost_for_2__c,RecordType.DeveloperName,RecordType.Name,Neighbourhood__c,BIRA_ID__c,BillingCity,BillingCountry,BillingPostalCode,BillingState,BillingStreet,ShippingCity,ShippingCountry,ShippingPostalCode,ShippingState,ShippingStreet,Distributor_Warehouse__r.Name,Parent.Name,(SELECT Id,MobilePhone,Name,FirstName,LastName,Role__c,Account.Name,Contact_Method__c,Aadhaar_Number__c,Email,Department,Work_Email__c,Decision_Maker__c,Phone,Loyalty_Enabled__c,Favorite_Destination_s__c,Facebook_Fan__c,Favorite_Hotel_s__c,Birthdate,Favorite_Restaurant_s__c,Age__c,Level__c,Referred_By__r.Name,MailingCity,MailingState,MailingCountry,MailingPostalCode,MailingStreet,Salutation FROM Contacts ORDER BY LastModifiedDate),(SELECT Item__c,Item__r.Display_Name__c,Last_90_Days__c,Date__c,Name,Invoice_Amount__c,Liquid_Name__c,Has_Keg_Item__c,Physical_Cases__c,Salesperson__r.Name,Last_180_Days__c FROM Retail_Depletion1__r ORDER BY LastModifiedDate),Estimated_Monthly_Premium_Mass_Sales__c,(SELECT Display_Machine_Id__c,Machine_Id_Not_Sign_Up__c,Recommended_Machine_type__c,Recommended_Machine_Type_Sales__c,Recommended_Tower_Type__c,Recommended_Tower_Type_Sales__c,RecordType.DeveloperName,Status__c,Id,Draft_Pre_Installation__c,Draft_Sign_up__r.Number__c,Draft_Sign_up__c,Draft_Pre_Installation__r.RGP_Number__c,Draft_Sign_up__r.Deposit_Amount__c, Draft_Sign_up__r.Payment_Status__c, Draft_Sign_up__r.Recommended_Machine_type__c,Draft_Sign_up__r.Recommended_Tower_Type__c,Draft_Pre_Installation__r.Recommended_Tower_Type__c,Draft_Pre_Installation__r.Machine_Model_RGP_Number__c,Draft_Pre_Installation__r.Recommended_Machine_type__c,Requisition_Date__c FROM Draft_Installations__r ORDER BY CreatedDate),Technician__c,Technician__r.Name,(SELECT Id,Name,CreatedDate,Chiller_Purity__c FROM Stock_Visibility_Survey__r ORDER BY LastModifiedDate),(SELECT Name,CreatedDate,Id FROM Product_Pre_Sales_Sampling__r ORDER BY LastModifiedDate),(SELECT Requisition_Date__c,Status__c,Name,Id FROM POSM_Requisitions__r) FROM Account WHERE Account_Status__c!='Permanently Closed' ";
        if (req.body.syncDateTime) {
            queryString += "AND LastModifiedDate >= " + req.body.syncDateTime+" ORDER BY LastModifiedDate";
        }
        else{
            queryString += " ORDER BY LastModifiedDate";
        }
        let accountFetching =await sfConnection.query(queryString);
        let isCompleted = false;
        isCompleted = accountFetching.done;
        
        res.write(JSON.stringify(accountFetching.records)+'$$$');
        while(!isCompleted){
            let queryLocator = accountFetching.nextRecordsUrl;
            isCompleted = accountFetching.done;
            if(!isCompleted){
                accountFetching = await  sfConnection.queryMore(queryLocator);
                res.write(JSON.stringify(accountFetching.records )+'$$$');
            }
        }
        await salesOrderRequest(req,res,sfConnection);
        await draftItemsRequest(req,res,sfConnection,req.conn.userInfo.id);
        await posmItems(req,res,sfConnection,req.conn.userInfo.id);
        await preSalesItems(req,res,sfConnection,req.conn.userInfo.id);
        await stockVisibilitItems(req,res,sfConnection,req.conn.userInfo.id);
        
    }
    catch (e) {
        res.write(JSON.stringify([{
            attributes : {
                type : 'error'
            }
        }])+'$$$');
        res.end();
        console.log(e);
    }
    

};
const salesOrderRequest = async (req,res,sfConnection) => {
    let queryString = 'SELECT CreatedDate,Name,IsDeleted,Id,Comment__c,Account__c,Total_Amount__c,Total_Cases__c,(SELECT Amount__c,Cases__c,Item_Name__c,Item_Name__r.Name,Total_Amount__c FROM Sales_Order__r WHERE IsDeleted=false) FROM Sales_Orders__c ';
    if (req.body.syncDateTime) {
        queryString += " WHERE LastModifiedDate >= " + req.body.syncDateTime;
    }
    let orderFetching =await sfConnection.query(queryString);
        let isCompleted = false;
        isCompleted = orderFetching.done;
        res.write(JSON.stringify(orderFetching.records)+'$$$');
        // console.log(isCompleted);
        while(!isCompleted){
            
            let queryLocator = orderFetching.nextRecordsUrl;
            isCompleted = orderFetching.done;
            if(!isCompleted){
                orderFetching = await  sfConnection.queryMore(queryLocator);
                res.write(JSON.stringify(orderFetching.records )+'$$$');
            }
        }
        

};

const draftItemsRequest = async (req,res,sfConnection,userId) => {
    
    let queryString = `SELECT Quantity__c,Pullout_Quantity__c, Product__c, Product__r.Name, Draft_Installation__r.Account__c, Draft_Processes__r.Account__c, MachineId__c, Draft_Installation__c,Draft_Processes__c, Id, Status__c FROM Draft_Items__c `;
    if (req.body.syncDateTime) {
        queryString += "  WHERE ( LastModifiedDate >= " + req.body.syncDateTime+")";
    }
    let orderFetching =await sfConnection.query(queryString);
        let isCompleted = false;
        isCompleted = orderFetching.done;
        res.write(JSON.stringify(orderFetching.records)+'$$$');
        // console.log(isCompleted);
        while(!isCompleted){
            
            let queryLocator = orderFetching.nextRecordsUrl;
            isCompleted = orderFetching.done;
            if(!isCompleted){
                orderFetching = await  sfConnection.queryMore(queryLocator);
                res.write(JSON.stringify(orderFetching.records )+'$$$');
            }
        }
        
};

const posmItems = async (req,res,sfConnection,userId) => {
    let queryString = `SELECT Id, Product__c, Product__r.Name, POSM_Requisition__c, Quantity__c, Status__c, POSM_Requisition__r.Outlet__c FROM POSM_Line_Item__c `;
    if (req.body.syncDateTime) {
        queryString += "  WHERE ( LastModifiedDate >= " + req.body.syncDateTime+")";
    }
    let orderFetching =await sfConnection.query(queryString);
        let isCompleted = false;
        isCompleted = orderFetching.done;
        res.write(JSON.stringify(orderFetching.records)+'$$$');
        // console.log(isCompleted);
        while(!isCompleted){
            
            let queryLocator = orderFetching.nextRecordsUrl;
            isCompleted = orderFetching.done;
            if(!isCompleted){
                orderFetching = await  sfConnection.queryMore(queryLocator);
                res.write(JSON.stringify(orderFetching.records )+'$$$');
            }
        }
        
};

const preSalesItems = async (req,res,sfConnection,userId) => {
    let queryString = `SELECT Id, Product_Pre_Sales_Sampling__c, Product_Pre_Sales_Sampling__r.Account__c, Quantity__c, Type__c, SKU__c, Liquid_Layer__r.Name FROM Product_Pre_Sales_Sampling_Child__c  `;
    if (req.body.syncDateTime) {
        queryString += "  WHERE ( LastModifiedDate >= " + req.body.syncDateTime+")";
    }
    let orderFetching =await sfConnection.query(queryString);
        let isCompleted = false;
        isCompleted = orderFetching.done;
        res.write(JSON.stringify(orderFetching.records)+'$$$');
        // console.log(isCompleted);
        while(!isCompleted){
            
            let queryLocator = orderFetching.nextRecordsUrl;
            isCompleted = orderFetching.done;
            if(!isCompleted){
                orderFetching = await  sfConnection.queryMore(queryLocator);
                res.write(JSON.stringify(orderFetching.records )+'$$$');
            }
        }
        
};
const stockVisibilitItems = async (req,res,sfConnection,userId) => {
    let queryString = `SELECT Id, Item_Master__r.Name, Quantity__c, Name, Stock_Visibility_Survey__c, Stock_Visibility_Survey__r.Account__c FROM Stock_Visibility_Survey_Child__c `;
    if (req.body.syncDateTime) {
        queryString += "  WHERE ( LastModifiedDate >= " + req.body.syncDateTime+")";
    }
    let orderFetching =await sfConnection.query(queryString);
        let isCompleted = false;
        isCompleted = orderFetching.done;
        res.write(JSON.stringify(orderFetching.records)+'$$$');
        // console.log(isCompleted);
        while(!isCompleted){
            
            let queryLocator = orderFetching.nextRecordsUrl;
            isCompleted = orderFetching.done;
            if(!isCompleted){
                orderFetching = await  sfConnection.queryMore(queryLocator);
                res.write(JSON.stringify(orderFetching.records )+'$$$');
            }
        }
        res.end();
        
};
exports.fetchMedia = async (req, res) => {
    let sfConnection = req.conn;

    try {
        let body = {accountId : req.body.accountId };


        let contentVersionIds = await sfConnection.apex.put('/Images/',body);
        require('../utility/sfSoapHelper').fetchContentVersion(req, contentVersionIds, (arr) => {
            res.status(200).json({isError : false,isAuth : true,images :( arr ? arr.result : [])});
        });
        
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ isError: false, isAuth: true, images: [] });
    }
};

