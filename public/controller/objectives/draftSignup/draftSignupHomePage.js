



let accountRec;
let draftSignUpReq = {};
let isReadOnly = false;
const draftSignupHomePageIntialization = async() => {
    let urlParam = new URLSearchParams(window.location.search);
    if(urlParam.has('accountId')){
        accountRec = await getItemFromStore('account',urlParam.get('accountId'));
        showAccount(); //  Not working
        await fetchActiveLiquids();
    }
    
};




const fetchActiveLiquids = async () => {
    let liquids = {};
    let clusterWiseActiveLiquids = await getItemFromStore('utility','clusterLiquid');
    if(!accountRec.Cluster__c){
        showNotification({message : "Cluster not defined on the outlet, necessary to get active liquids!"});
        return;
    }
    clusterWiseActiveLiquids.clusterLiquids.forEach(ele => {
        if(ele.Cluster__c===accountRec.Cluster__c && ele.Is_Draft_Available__c){
            liquids[ele.Liquid_Name__c] =false;
        }
    });
    Liquid_Type__c = liquids;
    if(Object.entries(liquids).length !== 0){
        draftSignUpReq = await getItemFromStore('draft_Signup',fetchCurrentDateIdStr()+'-'+accountRec.Id);
        if(!draftSignUpReq){
            draftSignUpReq = {
                'Outlet_requires_B9_machine__c'  : 'Yes',
                'Outlet_requires_B9_taps__c' : 'Yes',
                'Type_of_Requisiton__c' : 'Permanent',
            };
            if(accountRec.Star_Rating__c==='5'&&accountRec.Beacon_Flag__c&&accountRec.Ocassion__c==='Community Club'){
                draftSignUpReq['Does_Outlet_Need_Mobile_Troley__c' ] = 'Yes';
            }        
        }
        else{
            if(draftSignUpReq.isCheckedOut === true)
            {
                isReadOnly = true;
            }
        }
        
    }
    else{
        showNotification({message : "No Active liquids found for the selected cluster!"});
    }
    initializeDraftHomePage();
    
    
};

const hideFieldPostFormGeneration = () => {
    if(accountRec.Star_Rating__c==='5'|| accountRec.Beacon_Flag__c || accountRec.Ocassion__c==='Community Club'){
        $('.Does_Outlet_Need_Mobile_Troley__c-rowDiv').css('display','block');
    }
    else{
        $('.Does_Outlet_Need_Mobile_Troley__c-rowDiv').css('display','none');
    }
    
}

const setLiquidToTapMapping = (liquidsSelected  ) => {
    let liquidTapMap = new Map([
        [1,'1'],
        [2,'2'],
        [3,'4'],
        
    ]);

    if(accountRec.Beacon_Flag__c === true){
        draftSignUpReq['Number__c']='4';
        $('#Number__c').val('4');
    }
    else if(liquidTapMap.has(liquidsSelected)){
        draftSignUpReq['Number__c']=liquidTapMap.get(liquidsSelected);
        $('#Number__c').val(liquidTapMap.get(liquidsSelected));
    }
    else if(liquidsSelected===0){
        draftSignUpReq['Number__c']=null;
        $('#Number__c').val('');
    }
    else{
        draftSignUpReq['Number__c']='4';
        $('#Number__c').val('4');
    }
    towerRecomendation(draftSignUpReq['Number__c']);
    machineTypeRecomendation(draftSignUpReq['Number__c'],draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']);
};

const kegsToTapSuggestion = (kegsVolumne) => {
    let tapRequired = '';
    let tempArr = [
        {upper_bound : 5,tapRequired : '1'},
        {upper_bound : 10,tapRequired : '2'},
        {upper_bound : 999,tapRequired : '4'},
    ];
    for(let temp of tempArr){
        if(kegsVolumne<=temp.upper_bound){
            tapRequired = temp.tapRequired;
            break;
        }
    }
    return tapRequired;
};

const towerRecomendation = (noOfTaps=draftSignUpReq['Number__c']) => {
    let isValid = draftSignUpReq['Outlet_requires_B9_machine__c'] ==='Yes' ||   draftSignUpReq['Outlet_requires_B9_taps__c'] === 'Yes';
    let requisitionType = draftSignUpReq['Type_of_Requisiton__c'];
    console.log(draftSignUpReq)
    if((noOfTaps==='1'&&isValid && requisitionType ==='Permanent') || (noOfTaps==='1' && requisitionType ==='Temporary')){
        $('#Recommended_Tower_Type_Sales__c').val('1 Way Shield Tower');
        let rows = $('#Recommended_Tower_Type_Sales__c').val().split('/').length;
        $('#Recommended_Tower_Type_Sales__c').prop('rows', rows > 2 ? rows : '3');
        draftSignUpReq['Recommended_Tower_Type_Sales__c']='1 Way Shield Tower';
    }
    else if((noOfTaps==='2'&&isValid && requisitionType ==='Permanent') || (noOfTaps==='2' && requisitionType ==='Temporary')){
        $('#Recommended_Tower_Type_Sales__c').val('2 Way Smash/2 Way shield with faucet / 2 Way Shield with Black Font / 2 Way Flute / 	2 Way Lucky / 2 Way Snake');
        let rows = $('#Recommended_Tower_Type_Sales__c').val().split('/').length;
        $('#Recommended_Tower_Type_Sales__c').prop('rows', rows > 2 ? rows : '3');
        draftSignUpReq['Recommended_Tower_Type_Sales__c']='2 Way Smash/2 Way shield with faucet / 2 Way Shield with Black Font / 2 Way Flute / 	2 Way Lucky / 2 Way Snake';
    }
    else if((noOfTaps==='4'&&isValid && requisitionType ==='Permanent') || (noOfTaps==='4' && requisitionType ==='Temporary')){
        $('#Recommended_Tower_Type_Sales__c').val('4 way Falcon Tower with Faucets / 4 Way Falcon with Debi Tap');
        let rows = $('#Recommended_Tower_Type_Sales__c').val().split('/').length;
        $('#Recommended_Tower_Type_Sales__c').prop('rows', rows > 2 ? rows : '3');
        draftSignUpReq['Recommended_Tower_Type_Sales__c']='	4 way Falcon Tower with Faucets / 4 Way Falcon with Debi Tap';
    }
    else{
        $('#Recommended_Tower_Type_Sales__c').val('');
        draftSignUpReq['Recommended_Tower_Type_Sales__c']=null;
    }
};

const machineTypeRecomendation = (noOfTaps =draftSignUpReq['Number__c'],kegs=draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c'] ?draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c'] : 0 ) => {
    let isValid = draftSignUpReq['Outlet_requires_B9_machine__c'] ==='Yes' ||   draftSignUpReq['Outlet_requires_B9_taps__c'] === 'Yes';
    let requisitionType = draftSignUpReq['Type_of_Requisiton__c'];
    if((noOfTaps==='1'&&isValid&& requisitionType ==='Permanent') || (noOfTaps==='1' && requisitionType ==='Temporary')){
        $('#Recommended_Machine_Type_Sales__c').val('Mini Lady');
        draftSignUpReq['Recommended_Machine_Type_Sales__c']='Mini Lady';
        $('#Over_The_Counter_Space_Required__c').val('2x2x3');
        draftSignUpReq['Over_The_Counter_Space_Required__c']='2x2x3';
        $('#Under_The_Counter_Space_Required__c').val('2x2x3');
        draftSignUpReq['Under_The_Counter_Space_Required__c']='2x2x3';
    }
    else if((noOfTaps!==null&&kegs!==null&&isValid&& requisitionType ==='Permanent') || (noOfTaps!==null&&kegs!==null && requisitionType ==='Temporary')){
        if((kegs>=0&&kegs<31) ){
            if(noOfTaps === '2')
            {
                $('#Recommended_Machine_Type_Sales__c').val('R 60/HE 90/Tip Tap/Beer Cooler/Counter Top 17L and 50 L/Event Cooler');
                let rows = $('#Recommended_Machine_Type_Sales__c').val().split('/').length;
                $('#Recommended_Machine_Type_Sales__c').prop('rows', rows > 2 ? rows : '3');
                draftSignUpReq['Recommended_Machine_Type_Sales__c']='R 60/HE 90/Tip Tap/ Beer Cooler/ Counter Top 17L and 50 L/Event Cooler';
            }else if(noOfTaps === '4'){
                $('#Recommended_Machine_Type_Sales__c').val('R 60/HE 90');
                draftSignUpReq['Recommended_Machine_Type_Sales__c']='R 60/HE 90';
            }
            $('#Over_The_Counter_Space_Required__c').val('1x1x1.5');
            draftSignUpReq['Over_The_Counter_Space_Required__c']='1x1x1.5';
            $('#Under_The_Counter_Space_Required__c').val('2.5x4.5x3');
            draftSignUpReq['Under_The_Counter_Space_Required__c']='2.5x4.5x3';
        }
        else if(kegs>30){
            if(noOfTaps === '2'){
                $('#Recommended_Machine_Type_Sales__c').val('HE 120 Two Way');
                draftSignUpReq['Recommended_Machine_Type_Sales__c']='HE 120 Two Way';
            }else if(noOfTaps === '4'){
                $('#Recommended_Machine_Type_Sales__c').val('HE 120 Four Way');
                draftSignUpReq['Recommended_Machine_Type_Sales__c']='HE 120 Four Way';
            }
            $('#Over_The_Counter_Space_Required__c').val('2x2x2');
            draftSignUpReq['Over_The_Counter_Space_Required__c']='2x2x2';
            $('#Under_The_Counter_Space_Required__c').val('2.5x5x3');
            draftSignUpReq['Under_The_Counter_Space_Required__c']='2.5x5x3';
        }
    }
    else{
        $('#Recommended_Machine_Type_Sales__c').val('');
        draftSignUpReq['Recommended_Machine_Type_Sales__c']=null;
        $('#Over_The_Counter_Space_Required__c').val('');
        draftSignUpReq['Over_The_Counter_Space_Required__c']=null;
        $('#Under_The_Counter_Space_Required__c').val('');
        draftSignUpReq['Under_The_Counter_Space_Required__c']=null;
    }
};


const handleSubmitDraftSignUpForm =async () => {

    draftSignUpReq['Under_the_counter_space_available_2__c'] = $('#Under_the_counter_space_available_2__c').val();
    draftSignUpReq['Over_the_counter_space_available__c'] = $('#Over_the_counter_space_available__c').val();
    
    if((draftSignUpReq['Outlet_requires_B9_taps__c'] === 'Yes' && draftSignUpReq['Over_the_counter_space_available__c'] === 'Not Available') || (draftSignUpReq['Outlet_requires_B9_machine__c'] ==='Yes' && draftSignUpReq['Under_the_counter_space_available_2__c'] === 'Not Available'))
    {
        showNotification({message : "Over the counter/ Under the counter space should be available to install the Draft!"});
        return;   
    }

    if((draftSignUpReq['Over_the_counter_space_available__c'] === 'Available' && !draftSignUpReq['Over_the_counter_space_available_File']) || (draftSignUpReq['Under_the_counter_space_available_2__c'] === 'Available' && !draftSignUpReq['Under_the_counter_space_available_File']))
    {
        showNotification({message : "If Counter Space is available Image is mandatory!"});
        return;   
    }
    if(!accountRec.Cluster__c){
        showNotification({message : "Cluster not defined on the outlet, necessary to get active liquids!"});
        return;
    }
    if($('#Temporary_Requisition__c').prop('checked') === true){
        draftSignUpReq['Installation_Date__c'] = $('#Installation_Date__c').val();
        draftSignUpReq['Pullout_Date__c'] = $('#Pullout_Date__c').val();
    }
    
    if(isReadOnly){
        window.location.href = '/view/objectives/draftSignup/draftSignupKYC/draftSignupKYC.html?accountId='+accountRec.Id;
        return;
    }
    
    let errorString = '';
    if(!draftSignUpReq['Active_Liquids__c']){
        errorString += 'Active Liquids is mandatory.';
    }
    if(!draftSignUpReq['Number__c']){
        errorString += 'No of Taps is mandatory.';
    }
    if(!draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']){
        errorString += 'Estimated draft volume is mandatory.';
    }
    if(draftSignUpReq['Installation_Date__c']&&draftSignUpReq['Pullout_Date__c']&&(new Date(draftSignUpReq['Installation_Date__c']).getTime()>new Date(draftSignUpReq['Pullout_Date__c']).getTime())){
        errorString += 'Installation Date cannot be greater than Pullout Date.';
    }
    if(errorString){
        showNotification({message : errorString});
        return;
    }

    if(draftSignUpReq['Outlet_requires_B9_machine__c'] === 'No'){
        draftSignUpReq['Recommended_Machine_Type_Sales__c'] = '';
        draftSignUpReq['Under_The_Counter_Space_Required__c'] = '';
        draftSignUpReq['Under_the_counter_space_available_2__c'] = '';
    }

    if(draftSignUpReq['Outlet_requires_B9_taps__c'] === 'No'){
        draftSignUpReq['Recommended_Tower_Type_Sales__c'] = '';
        draftSignUpReq['Over_The_Counter_Space_Required__c'] = '';
        draftSignUpReq['Over_the_counter_space_available__c'] = '';
    }
    
    draftSignUpReq.Event_Id__c = fetchCurrentDateIdStr()+'-'+accountRec.Id;
    draftSignUpReq.Daily_Tracker_App_Id__c = fetchCurrentDateIdStr();
    draftSignUpReq.Status__c = 'Submitted';
    draftSignUpReq.isSynced = true;
    draftSignUpReq.Account__c = accountRec.Id;
    draftSignUpReq.App_Id__c = fetchCurrentDateIdStr()+'-'+accountRec.Id;
    draftSignUpReq.Created_Date = new Date();
    draftSignUpReq.Last_Modified = new Date();
    draftSignUpReq.Requisition_Date__c = new Date();
    draftSignUpReq.isCheckedOut = false;
    
    const tapSuggested = parseFloat(kegsToTapSuggestion(draftSignUpReq['Estimated_Monthly_Draft_Volume_20_L_Keg__c']));
    console.log(tapSuggested);
    console.log(draftSignUpReq['Number__c']);
    if(tapSuggested<parseFloat(draftSignUpReq['Number__c'])){
        if(!draftSignUpReq['Reason_for_asking_more_taps__c'] && draftSignUpReq['Type_of_Requisiton__c'] =='Permanent'){
            showNotification({message : `Minimum Volume Criteria is not met. Please select reason for asking more taps`});
            $('.Reason_for_asking_more_taps__c-rowDiv').css('display','block');
            return;
        }
    }
    if(draftSignUpReq['Outlet_requires_B9_machine__c'] === 'No' && draftSignUpReq['Outlet_requires_B9_taps__c'] === 'No'){
        showNotification({message : `B9 machine or B9 taps is mandatory in order to proceed`});
        return;
    }
    
    await writeData('draft_Signup',draftSignUpReq);
    window.location.href = '/view/objectives/draftSignup/draftSignupKYC/draftSignupKYC.html?accountId='+accountRec.Id;
};

draftSignupHomePageIntialization();