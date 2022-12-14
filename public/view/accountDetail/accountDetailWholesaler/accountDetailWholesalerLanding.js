// var listOfAccount = {
//     userData: {
//             "id": "",
//             "name": "Account recordtype is Distributor when user is Sales Rep",
//             "Account_Status__c": "Temporarily Closed",
//             "BillingStreet": "null",
//             "BillingCity": "null",
//             "BillingPostalCode": "null",
//             "BillingState": "null",
//             "BillingCountry": "null",
//             "Beacon_Flag__c": false,
//             "QCO_Flag__c": true,
//             "Draft_Ready__c": true,
//             "Channel__c": "On Premise",
//             "L1M_Billed_Liquids__c": "Beer",
//             "Recent_Retail_Depletion__c": "dfgrg",
//             "Industry_Segment__c": "P0",
//             "Sub_Channel__c": "Hotel",
//             "Bira_Segment__c":"B",
//             "Size_Format__c":"Large",
//             "Location__c":"Inside Airport",
//             "BIRA_ID__c":1213344
//  }
// };

// var objective = {
//  eventList : [{
//     "Id": "a0E5D000003nwzOUAQ",
//     "Completed__c": false,
//     "Type__c": "Product Introduction"
//  },
//  {
//     "Id": "a0E5D000003nwzTUAQ",
//     "Completed__c": false, 
//     "Type__c": "Stock/Visibility Survey"
//  },
//  {
//     "Id": "a0E5D000003nwzPUAQ",
//     "Completed__c": false,
//     "Type__c": "Competition Insights"
//  },
//  {
//     "Id": "a0E5D000003nwzRUAQ",
//     "Completed__c": false,
//     "Type__c": "KYC and Classification",
//  },
//  {
//     "Id": "a0E5D000003nwzUUAQ",
//     "Completed__c": false,
//     "Type__c": "Sales Order"
//  }]   
// }

// var relatedList = {
//     retailList : [{
//        "Name" : "INV-12334",
//        "Date__c" : "12/01/2020",
//        "Item__c":"White P",
//        "Physical_Cases__c" : 7
//     },
//     {
//         "Name" : "INV-12334",
//         "Date__c" : "12/01/2020",
//         "Item__c":"White P",
//         "Physical_Cases__c" : 7
//     },
//     {
//         "Name" : "INV-12334",
//         "Date__c" : "12/01/2020",
//         "Item__c":"White P",
//         "Physical_Cases__c" : 7
//     },
//     {
//         "Name" : "INV-12334",
//         "Date__c" : "12/01/2020",
//         "Item__c":"White P",
//         "Physical_Cases__c" : 7
//     },
//     {
//         "Name" : "INV-12334",
//         "Date__c" : "12/01/2020",
//         "Item__c":"White P",
//         "Physical_Cases__c" : 7
//     }],
    
//     contactList : [{
//         "Name" : "Test 1",
//         "Role__c" : "General Manager",
//         "MobilePhone":123456678,
//      },
//      {
//         "Name" : "Test 1",
//         "Role__c" : "General Manager",
//         "MobilePhone":3566767565,
//      },
//      {
//         "Name" : "Test 1",
//         "Role__c" : "General Manager",
//         "MobilePhone":6799765,
//      },
//      ]
// }




showObjectives = (objective,currentEventChecked) =>{
    if(objective){
        let disableOptions = false;
        if(currentEventChecked==='isCompleted' ||currentEventChecked==='differentEvent' ){
            $('.check-in').attr('disabled',true);
            $('.check-out').attr('disabled',true);
            disableOptions = true;
        }
        else if(currentEventChecked==='currentEvent'){
            $('.check-in').attr('disabled',true);
        }
        else if(currentEventChecked==='noEvent'){
            $('.check-out').attr('disabled',true);
            disableOptions = true;
        }
        var btn ='';
        for (var i = 0; i < objective.Event_Objectives__r.records.length; i++) {
            btn+='<div class="event">';
            btn+='  <button type="button" class="btn btn-default" disabled='+disableOptions+'>'+objective.Event_Objectives__r.records[i].Type__c;
            btn+='  </button>';
            btn+='</div>';
        }

        $('#listofEvent').prepend(btn);
    }
    else{
        $('.check-in').html('');
        let temp = '<div style="text-align:center">';
        temp += 'No Events on today!';
        temp += '</div>';
        $('#listofEvent').html(temp);
        $('.check-out').html('');
    }
};


showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};



handlePageRedirect = async(page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isSales)
            window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id;
        else if(nonSales.isAudit)
            window.location.href ='/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountRec.Id;
        else if(nonSales.isTech)
            window.location.href ='/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
        
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id='+accountRec.Id;
    }
};