const soap = require('soap');
const path = require('path');

exports.fetchContentVersion = (req, contentVersionIds, callback) => {

    let url = path.join(__dirname, fetchAppropriateFile(req));
    soap.createClient(url, function (err, client) {
        client.login({ username: req.body.username, password: req.body.password }, function (err, result, raw) {
            var sheader = { SessionHeader: { sessionId: result.result.sessionId } };
            client.addSoapHeader(sheader, "", 'tns', '');
            client.setEndpoint(result.result.serverUrl);
            client.retrieve({ fieldList: 'Id,versionData,Title', sObjectType: 'ContentVersion', id: contentVersionIds }, (err, records) => {
                if (err) {
                    callback([]);
                }
                else {
                    callback(records);
                }
            });
        });
    });
};
let accountDummyList = [];


exports.accountRecordsFetch = (req, res, callback) => {
    
    const syncDateTime = req.body.syncDateTime;
    let url = path.join(__dirname, fetchAppropriateFile(req));
    soap.createClient(url, function (err, client) {
        console.log('\t\tLogging in on Salesforce...', err);
        client.login({ username: req.body.username, password: req.body.password }, async function (err, result) {

            var sheader = { SessionHeader: { sessionId: result.result.sessionId } };
            client.addSoapHeader(sheader, "", 'tns', '');
            client.setEndpoint(result.result.serverUrl);
            let queryString = "Select Cluster__c,UB_Monthly_Mass_Volume__c,UB_Monthly_Premium_Volume__c,ABI_Monthly_Mass_Volume__c,ABI_Monthly_Premium_Volume__c,Carlsberg_Monthly_Mass_Volume__c,Carlsberg_Monthly_Premium_Volume__c,Craft_Monthly_Mass_Volume__c,Craft_Monthly_Premium_Volume__c,Recent_Activity_Comments__c,Recent_Activity_Date_Time__c,IsDeleted,District__r.Name,Tehsil__r.Name,Id,Recent_Retail_Depletion__c,L1M_Billed_Liquids__c,L3M_Billed_Liquids__c,Ever_Billed_Liquids__c,Never_Billed_Liquids__c,MTD_Sales_Premium__c,L3M_Sales_Avg_Premium__c,L3M_Sales_Avg__c,Industry_Segment_Mass__c,Website,Average_Velocity_of_Kegs__c,Name,ParentId,Account_Status__c,Beacon_Flag__c,Beer_Selection__c,BIRA_Non_Premium_Sales__c,BIRA_Premium_Sales__c,Bira_Segment__c,Central_Sales_Tax_Number__c,Channel__c,Close_Reason__c,Competitor_Non_Premium_Sales__c,Competitor_Premium_Sales__c,Corporation_Outlet__c,Credit_Limit__c,Cuisine__c,Current_Outstanding__c,Delivery_Constraints_Details__c,Direct_Billing_Flag__c,Draft_Agreement_Number__c,Draft_Ready__c,Draft_Status__c,Email__c,Excise_Code__c,Flag_for_Customer_on_Hold_Finance_Hold__c,GeoLocation__c,Group_Account_Flag__c,Group_Number__c,Growth_Type__c,GST__c,Hold_Status__c,Imported_Brands__c,Industry_Segment__c,Keg_Stock_Limit__c,KYC_Done__c,Last_Keg_Order_Date__c,License_Name__c,License_Number__c,License_Type__c,Liquor_Available__c,Local_Sales_Tax_Number__c,Location__c,Market_Share__c,Minibar_Available__c,MTD_Sales__c,No_of_Banquets__c,No_of_Rooms__c,Non_Premium_Brands_Share_Bira__c,Non_Premium_Brands_Share_Competitor__c,Number_of_Draft_Machines__c,Ocassion__c,Other_Entertainment__c,Outdoor_Seating__c,PAN__c,PAN_Reference_Number__c,Phone,Pool_Side__c,POSM_ready__c,Preferred_Delivery_Day__c,Preferred_Delivery_Time__c,Premium_Brands__c,Premium_Brands_Share_Bira__c,Premium_Brands_Share_Competitor__c,QCO_Flag__c,QTD_Sales__c,Registered_Name__c,Sales_Type__c,Size_Format__c,Star_Rating__c,Sub_Channel__c,TIN__c,Total_Market_Size_Absolute_Value__c,Total_Market_Size_Sales__c,Type__c,VAT_Registration_Number__c,YTD_Sales__c,Zomato_Cost_for_2__c,RecordType.DeveloperName,RecordType.Name,Neighbourhood__c,BIRA_ID__c,BillingCity,BillingCountry,BillingPostalCode,BillingState,BillingStreet,ShippingCity,ShippingCountry,ShippingPostalCode,ShippingState,ShippingStreet,Distributor_Warehouse__r.Name,Parent.Name,(SELECT Id,Name,FirstName,LastName,Role__c,Account.Name,Contact_Method__c,Aadhaar_Number__c,Email,Department,Work_Email__c,Decision_Maker__c,Phone,Loyalty_Enabled__c,Favorite_Destination_s__c,Facebook_Fan__c,Favorite_Hotel_s__c,Birthdate,Favorite_Restaurant_s__c,Age__c,Level__c,Referred_By__r.Name,MailingCity,MailingState,MailingCountry,MailingPostalCode,MailingStreet,Salutation FROM Contacts ORDER BY LastModifiedDate),(SELECT Item__c,Item__r.Display_Name__c,Last_90_Days__c,Date__c,Name,Invoice_Amount__c,Liquid_Name__c,Physical_Cases__c,Salesperson__r.Name,Last_180_Days__c FROM Retail_Depletion1__r ORDER BY LastModifiedDate),Estimated_Monthly_Premium_Mass_Sales__c,(SELECT Display_Machine_Id__c,Machine_Id_Not_Sign_Up__c,Recommended_Machine_type__c,Recommended_Machine_Type_Sales__c,Recommended_Tower_Type__c,Recommended_Tower_Type_Sales__c,RecordType.DeveloperName,Status__c,Id,Draft_Pre_Installation__c,Draft_Sign_up__c,Draft_Pre_Installation__r.RGP_Number__c,Draft_Sign_up__r.Deposit_Amount__c,Draft_Pre_Installation__r.Recommended_Tower_Type__c,Draft_Pre_Installation__r.Recommended_Machine_type__c FROM Draft_Installations__r ORDER BY CreatedDate),Technician__c,Technician__r.Name FROM Account ";
            if (syncDateTime) {
                queryString += "WHERE LastModifiedDate >= " + syncDateTime;
            }
            client.queryAll({ queryString: queryString }, { batchSize: 2000 }, async (err, result) => {
                if(err){
                    console.log(err);
                    salesOrderFetch(client,syncDateTime,callback,res);
                }
                else{
                    responseWrite(result.result.records, res);
                    let isFinished = result.result.done;
                    if (!isFinished) {
                        let queryLocator = result.result.queryLocator;
                        while (!isFinished) {
                            let response = await queryMorePromiseConversion(client, queryLocator);
                            isFinished = response.result.done;

                            if (!isFinished) {
                                queryLocator = response.result.queryLocator;
                            }

                            responseWrite(response.result.records, res);
                        }
                    }
                    salesOrderFetch(client,syncDateTime,callback,res);
                }
                
                
                //callback();
            });




        });
    });
};

const queryMorePromiseConversion = (client, queryLocator) => {
    return new Promise((resolve, reject) => {

        client.queryMore({ queryLocator: queryLocator }, { batchSize: 2000 }, (err, result) => {
            if (err) {
                reject('Issue with Query More fetch');
            }
            else {
                resolve(result);
            }
        });
    });

};

const responseWrite = (records, res) => {
    accountDummyList = accountDummyList.concat(records);

    if (records) {
        records.forEach(ele => {
            res.write(JSON.stringify(ele) + '$,$,$');
        });
    }

};




const salesOrderFetch = (client, syncDateTime, callback, res) => {
    let queryString = 'SELECT CreatedDate,Name,IsDeleted,Id,Comment__c,Account__c,Total_Amount__c,(SELECT Amount__c,Cases__c,Item_Name__c,Item_Name__r.Name,Total_Amount__c FROM Sales_Order__r WHERE IsDeleted=false) FROM Sales_Orders__c';
    if (syncDateTime) {
        queryString += " WHERE LastModifiedDate >= " + syncDateTime;
    }
    client.queryAll({ queryString: queryString }, { batchSize: 2000 }, async (err, result) => {
        res.write('&,&,&');
        responseWrite(result.result.records, res);
        let isFinished = result.result.done;
        if (!isFinished) {
            let queryLocator = result.result.queryLocator;
            while (!isFinished) {
                let response = await queryMorePromiseConversion(client, queryLocator);
                isFinished = response.result.done;

                if (!isFinished) {
                    queryLocator = response.result.queryLocator;
                }

                responseWrite(response.result.records, res);
            }
        }
        callback();
    });
};




const fetchAppropriateFile = (req) => {
    if ((req.get('host')) === ('salesapp-development.herokuapp.com')) {
        return 'wsdl.xml';
    }
    else if ((req.get('host')) === ('beastmode91.herokuapp.com')) {
        return 'preprodwsdl.xml';
    }
    else if ((req.get('host')) === ('beast91.herokuapp.com')) {
        return 'prodwsdl.xml';
    }
    else if ((req.get('host')) === ('beast91-clone-app.herokuapp.com')) {
        return 'prodwsdl.xml';
    }
    else if ((req.get('host')) === ('bira91-test.herokuapp.com')) {
        return 'sandbox.xml';
    }
    else if ((req.get('host')) === ('localhost:3400')) {
        return 'sandbox.xml';
    }
    else {
        return 'prodwsdl.xml';
    }
};


exports.fetchContentFileBase64Data = async(contentVersionId,req) => {

    return new Promise((resolve,reject) => {
        let url = path.join(__dirname,fetchAppropriateFile(req) );
    
    soap.createClient(url, function (err, client) {
        console.log('\t\tLogging in on Salesforce...', err);
        client.login({ username: req.body.username, password: req.body.password }, function (err, result, raw) {
            
            var sheader = { SessionHeader: { sessionId: result.result.sessionId } };
            client.addSoapHeader(sheader, "", 'tns', '');
            client.setEndpoint(result.result.serverUrl);
            
            client.retrieve({ fieldList: 'versionData', sObjectType: 'ContentVersion', id: [contentVersionId] }, (err, records) => {
                if (err) {
                    console.log(err);
                    reject([]);
                }
                else {
                    resolve(records);
                }
            });
        });
         });
    });

    
};


