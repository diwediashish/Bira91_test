let draftPreInstallation = {};
let kycDraft = null;
let isReadOnly = false;
let eventTaggedDraftInstallation;
let underTheTableMap = new Map([
    ['Mini Lady','2x2x3'],
    ['R 60','2.5x4.5x3'],
    ['HE 90','2.5x4.5x3'],
    ['Tip Tap','2.5x4.5x3'],
    ['Beer Cooler','2.5x4.5x3'],
    ['Counter Top 17 L and 50 L','2.5x4.5x3'],
    ['Event Cooler','2.5x4.5x3'],
    ['HE 120 Two Way','2.5x5x3'],
    ['HE 120 Four Way','2.5x5x3'],
]);
let overTheTableMap = new Map([
    ['Mini Lady','2x2x3'],
    ['R 60','1x1x1.5'],
    ['HE 90','1x1x1.5'],
    ['Tip Tap','1x1x1.5'],
    ['Beer Cooler','1x1x1.5'],
    ['Counter Top 17 L and 50 L','1x1x1.5'],
    ['Event Cooler','1x1x1.5'],
    ['HE 120 Two Way','2x2x2'],
    ['HE 120 Four Way','2x2x2'],
]);
const initializePreInstallationFunc = async () => {
    let utility = await getItemFromStore('utility','event');
    accountRec = utility.account;
    
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
    draftPreInstallation = await getItemFromStore('draftPreInstallation',key);
    showAccount();
    
    if(draftPreInstallation&&draftPreInstallation['Kyc_App_Id__c']){
        kycDetail = await getItemFromStore('kycDetail',draftPreInstallation['Kyc_App_Id__c']);
    }
    if(!draftPreInstallation){
        draftPreInstallation = {
            Location_of_Draft_machine__c : utility.event.Draft_Installation__r.Location_of_Draft_machine__c,
        };
    }
    else{
        if(draftPreInstallation.isCheckedOut === true)
        {
            isReadOnly = true;
            showNotification({message : 'Page is opened in read only mode!'});
        }
    }
    eventTaggedDraftInstallation = utility.event.Draft_Installation__r;
    kycDetailForm(utility.event);
    getAllPreFilledVal(utility.event);
    await fetchProductInitialization(utility.event);
    initializePreInstalltion();
    preFillSalesRequisitonFields(utility.event);
    if(draftPreInstallation['Recommended_Machine_type__c']){
        renderPostCreationForm();
        showSummarySection(preInstallationForm);
    }
    
};

const renderPostCreationForm = () => {
    $('#Recommended_Machine_type__c').val(draftPreInstallation['Recommended_Machine_type__c'] ?draftPreInstallation['Recommended_Machine_type__c']  : '' );
    $('#Recommended_Tower_Type__c').val(draftPreInstallation['Recommended_Tower_Type__c'] ?draftPreInstallation['Recommended_Tower_Type__c']  : '' );
    $('#Over_the_counter_space_required__c').val(draftPreInstallation['Over_the_counter_space_required__c'] ?draftPreInstallation['Over_the_counter_space_required__c']  : '' );
    $('#Under_the_counter_space_required__c').val(draftPreInstallation['Under_the_counter_space_required__c'] ?draftPreInstallation['Under_the_counter_space_required__c']  : '' );
    $('#Location_of_Draft_machine__c').val(draftPreInstallation['Location_of_Draft_machine__c'] ?draftPreInstallation['Location_of_Draft_machine__c']  : '' );
    $('#Reason_for_Change__c').val(draftPreInstallation['Reason_for_Change__c'] ?draftPreInstallation['Reason_for_Change__c']  : '' );
    for(let i in draftPreInstallation){
        if(typeof draftPreInstallation[i] === 'boolean'&&draftPreInstallation[i]){
            $(`.${i}`).css('display','block');
            $(`#${i}`).prop('checked',true);
        }
        
    }
};


let draftSection = new Set(['Machine Model','Clamp Required','Coupler Type','Fittings','Hard Grade Pipe','Python Pipe','CO2 Regulator Type','CO2 Regulator Wrench Type','Tower Model','CO2 Cylinder Type']);
const preFillSalesRequisitonFields = (event) => {
    $('#Display_Machine_Id__c').val(event.Draft_Installation__r ? event.Draft_Installation__r.Display_Machine_Id__c : '' );
    if(draftPreInstallation.Recommended_Machine_type__c){
        if(!draftPreInstallation.Recommended_Machine_type__c)
        {
            $('#Recommended_Machine_Type_Sales__c').parent().parent().parent().css('display','none');
        }else{
            $('#Recommended_Machine_Type_Sales__c').val(draftPreInstallation.Recommended_Machine_type__c);
        }
    }
    else{
        if(!event.Draft_Installation__r.Recommended_Machine_Type_Sales__c)
        {
            $('#Recommended_Machine_Type_Sales__c').parent().parent().parent().css('display','none');
        }else{
            $('#Recommended_Machine_Type_Sales__c').val(event.Draft_Installation__r ? event.Draft_Installation__r.Recommended_Machine_Type_Sales__c : '' );
            let rows = $('#Recommended_Machine_Type_Sales__c').val().split('/').length;
            $('#Recommended_Machine_Type_Sales__c').prop('rows', rows > 2 ? rows : '3');
        }        
    }
    if(draftPreInstallation.Recommended_Tower_Type__c){
        if(!draftPreInstallation.Recommended_Tower_Type__c)
        {
            $('#Recommended_Tower_Type_Sales__c').parent().parent().parent().css('display','none');
        }else{
            $('#Recommended_Tower_Type_Sales__c').val(draftPreInstallation.Recommended_Tower_Type__c);
        }
    }
    else{
        if(!event.Draft_Installation__r.Recommended_Tower_Type_Sales__c)
        {
            $('#Recommended_Tower_Type_Sales__c').parent().parent().parent().css('display','none');
        }else{
            $('#Recommended_Tower_Type_Sales__c').val(event.Draft_Installation__r ? event.Draft_Installation__r.Recommended_Tower_Type_Sales__c : '' );
            let rows = $('#Recommended_Tower_Type_Sales__c').val().split('/').length;
            $('#Recommended_Tower_Type_Sales__c').prop('rows', rows > 2 ? rows : '3');
        }  
    }
    

    // If Already Created then dont run below
    if(draftPreInstallation.Over_the_counter_space_required__c){
        //$('#Over_the_counter_space_required__c').val(draftPreInstallation.Over_the_counter_space_required__c);
        if(!draftPreInstallation.Over_the_counter_space_required__c)
        {
            $('#Over_the_counter_space_required__c').parent().parent().parent().css('display','none');
        }else{
            $('#Over_the_counter_space_required__c').val(draftPreInstallation.Over_the_counter_space_required__c);
        }
    }
    else{
        if(!event.Draft_Installation__r.Over_the_counter_space_required__c)
        {
            $('#Over_the_counter_space_required__c').parent().parent().parent().css('display','none');
        }else{
            $('#Over_the_counter_space_required__c').val(event.Draft_Installation__r ? event.Draft_Installation__r.Over_the_counter_space_required__c : '' );
        }
    }
    if(draftPreInstallation.Under_the_counter_space_required__c){
        // $('#Under_the_counter_space_required__c').val(draftPreInstallation.Under_the_counter_space_required__c);
        if(!draftPreInstallation.Under_the_counter_space_required__c)
        {
            $('#Under_the_counter_space_required__c').parent().parent().parent().css('display','none');
        }else{
            $('#Under_the_counter_space_required__c').val(draftPreInstallation.Under_the_counter_space_required__c);
        }
    }
    else{
        if(!event.Draft_Installation__r.Under_the_counter_space_required__c)
        {
            $('#Under_the_counter_space_required__c').parent().parent().parent().css('display','none');
        }
        else{
            $('#Under_the_counter_space_required__c').val(event.Draft_Installation__r ? event.Draft_Installation__r.Under_the_counter_space_required__c : '' );
        }
    }
    if(draftPreInstallation.Location_of_Draft_machine__c){
        $('#Location_of_Draft_machine__c').val(draftPreInstallation.Location_of_Draft_machine__c);
    }
    else{
        $('#Location_of_Draft_machine__c').val(event.Draft_Installation__r ? event.Draft_Installation__r.Location_of_Draft_machine__c : '' );
    }

    if(draftPreInstallation.Confirmed_with_the_outlet_owner_for_inst__c != null){
        $('#Confirmed_with_the_outlet_owner_for_inst__c').prop('checked',draftPreInstallation.Confirmed_with_the_outlet_owner_for_inst__c);
    }else{
        $('#Confirmed_with_the_outlet_owner_for_inst__c').prop('checked',event.Draft_Installation__r ? event.Draft_Installation__r.Confirmed_with_the_outlet_owner_for_inst__c : '');
    }
};

const fetchProductInitialization = async (event) => {
    let draftItems
    draftItems = draftPreInstallation.items ?draftPreInstallation.items : await fetchRecordsUsingIndex('nonBeerItems','RecordType.DeveloperName','Draft') ;
    let sectionMap = new Map();
    let utility = await getItemFromStore('utility','event');
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c;
    let index = 0;
    for(let i of draftItems){
        // if(draftSection.has(i.Draft_Section__c)){

            if(sectionMap.has(i.Draft_Section__c) && i.Draft_Section__c){
                let tmpObject = sectionMap.get(i.Draft_Section__c);
                tmpObject.items.push({
                    App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+(i.Product__c ?i.Product__c  : i.Id)+'-'+event.Id,
                    Draft_Installation_App_Id__c : key,
                    Quantity__c : i.Quantity__c ?i.Quantity__c  : 0 ,
                    Product__c : i.Product__c ?i.Product__c  : i.Id,
                    ProductName : i.ProductName ?i.ProductName : i.Name,
                    Draft_Section__c : i.Draft_Section__c,
                });
            }
            else if(i.Draft_Section__c){
                
                let tmpObject = {
                    type : i.Draft_Section__c,
                    typeId : i.Draft_Section__c.replace(/ /g,"_")+'__c',
                    id : index,
                    items : [
                        {
                            App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+(i.Product__c ?i.Product__c  : i.Id)+'-'+event.Id,
                            Draft_Installation_App_Id__c : key,
                            Quantity__c :i.Quantity__c ?i.Quantity__c  : 0 ,
                            Product__c : i.Product__c ?i.Product__c  : i.Id,
                            ProductName : i.ProductName ?i.ProductName : i.Name,
                            Draft_Section__c : i.Draft_Section__c,
                        }
                    ]
                };
                sectionMap.set(i.Draft_Section__c,tmpObject); 
                index++;
            }
        // }
    }
    
    preInstallationForm = [];
    for(let [key,value] of sectionMap){
        preInstallationForm.push(value);
    }
    
    
};
const kycDetailForm = (event) => {
    let isValid = false;
    //draftPreInstallation&&(Object.keys( draftPreInstallation)).length===1
    if(event&&!('isSynced' in draftPreInstallation)){
        
        if(event.Draft_Installation__r&&event.Draft_Installation__r.KYC__r){
           if(!event.Draft_Installation__r.KYC__r.PAN_number__c) {
                kycDetail['PAN'] = null;
                isValid = true;
           }
           if(!event.Draft_Installation__r.KYC__r.Tin_Number__c) {
                kycDetail['TIN'] = null;
                isValid = true;
            }
        }
    }
    else{
        
        if(kycDetail && kycDetail['PAN']){
            $('.PAN').css('display','block');
            $('#PAN').val(kycDetail['PAN']);
            isValid = true;
        }
        if(kycDetail && kycDetail['TIN']){
            $('.TIN').css('display','block');
            $('#TIN').val(kycDetail['TIN']);
            isValid = true;
        }
    }
    
    if(!isValid){
        $('.kyc').css('display','none');
    }
};

const kycSubmittion = async () => {
    if($('#PAN').val()||$('#TIN').val()){
        const position  = await getCurrentLocationHelper();
        kycDraft = {};
        kycDraft.Geolocation_Latitude = position.coords.latitude;
        kycDraft.Geolocation_Longitude = position.coords.longitude;
        
        kycDraft = {
            PAN : $('#PAN').val(),
            TIN :$('#TIN').val(),
            App_Id : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-Draft-Pre',
            accountId : accountRec.Id,
            Created_Date : new Date(),
            Last_Modified : new Date(),
            isSynced : true,
            isCheckedOut : false,
            Status : 'Submitted by SP',
            Daily_Tracker : fetchCurrentDateIdStr(),
            ownerContacts : [
                
            ]
        };
        await writeData('kycDetail',kycDraft);
    }

    
};


const submitDraftPreInstallation = async(isNotChanged) => {
    // if(!$('#Recommended_Machine_type__c').val()||!$('#Recommended_Tower_Type__c').val()){
    //     showNotification({message : 'Machine and Tower Type are mandatory!'});
    //     return;
    // }
    showNotification({message : 'Pre-Installation request is being submitted for Approval!'});
    showLoaderSpinner();
    const machineType = $('#Recommended_Machine_Type_Sales__c').val();
    const towerType = $('#Recommended_Tower_Type_Sales__c').val();
    const underTheTable = $('#Under_the_counter_space_required__c').val();
    const overTheTable = $('#Over_the_counter_space_required__c').val();
    const locationOfMachine = $('#Location_of_Draft_machine__c').val();
    const reasonForChange = $('#Reason_for_Change__c').val();
    const confirmedWithOutletOwner = $('#Confirmed_with_the_outlet_owner_for_inst__c').prop('checked');
    await kycSubmittion();
    let tempProduct = [];
    let utility = await getItemFromStore('utility','event');
    for(let i of preInstallationForm){
        tempProduct = tempProduct.concat(i.items);
    }
    draftPreInstallation = {
        ...draftPreInstallation,
        App_Id__c : fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+utility.event.Draft_Installation__c,
        items : tempProduct,
        Recommended_Machine_type__c : ((machineType.split('/').length>1) ? null : machineType),
        Recommended_Tower_Type__c : ((towerType.split('/').length>1) ? null : towerType),
        Under_the_counter_space_required__c : underTheTable,
        Over_the_counter_space_required__c : overTheTable,
        Kyc_App_Id__c : kycDraft ? kycDraft['App_Id'] : null,
        Location_of_Draft_machine__c : locationOfMachine,
        Reason_for_Change__c : reasonForChange,
        Event_Custom__c : utility.event.Id,
        Draft_Sign_up__c : utility.event.Draft_Installation__c,
        Account__c : accountRec.Id,
        Created_Date : new Date(),
        Last_Modified : new Date(),
        App_Created_Date__c : new Date(),
        isSynced : draftPreInstallation.isCheckedOut ? true : false,
        isCheckedOut : draftPreInstallation.isCheckedOut ? true : false,
        Daily_Tracker_App_Id__c : fetchCurrentDateIdStr(),
        Status__c : isNotChanged ? 'Approved' : 'Submitted to SO',
        Confirmed_with_the_outlet_owner_for_inst__c : confirmedWithOutletOwner,
    };
    await writeData('draftPreInstallation',draftPreInstallation);
    window.location.href = '/view/objectives/technicianInstallation/technicianInstallationHomePage.html?accountId='+accountRec.Id;
};

initializePreInstallationFunc();

