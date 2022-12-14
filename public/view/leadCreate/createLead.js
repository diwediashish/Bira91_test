

let channelMap = new Map([
    ["On-Premise", ["Hotel", "General"]],
    ["Off-Premise", ["Retail Account", "Wholesaler"]],
    ["Institutional", ["Military", "Airlines", "Railways", "Cruise Ships", "Stadiums", "Duty Free"]],
    ["Temporary Event", ["None"]]
]);



let subChannelMap = new Map([
    ["Hotel", ["Resorts", "Hostels", "Guesthouses", "Home-Stays", "Cottages", "Villas", "Bed-and-Breakfasts", "Luxury Hotels", "Business Hotels", "Economy Hotels"]],
    ["General", ["Restaurant", "Bar", "Club"]],
    ["Retail Account", ["Modern Trade", "Convenience Store", "Gas-Station", "Drug Store", "Liquor Shop", "Wine & Beer Shop", "Home Distributor", "Diplomatic Store"]],
    ["Wholesaler", ["Modern Trade", "Convenience Store", "Gas-Station", "Drug Store", "Liquor Shop", "Wine & Beer Shop", "Home Distributor", "Diplomatic Store"]],
    ["Military", ["Canteen Store Department - On", "Canteen Store Department - Off"]],
    ["Airlines", ["Airlines"]],
    ["Railways", ["Railways"]],
    ["Cruise Ships", ["Cruise Ships"]],
    ["Stadiums", ["Stadiums"]],
    ["Duty Free", ["Duty Free"]],
    ["None",["Food Festival","Exhibition","Music Festival","Others"]]
]);





const handleChannel = (ele) =>{
    let value = ele.value;
    let tmp = '';
    let id = $(ele).attr('id');
    $('#Sub_Channel__c').html('');
    if(channelMap.has(value))
    {
        let subChannels = channelMap.get(value);
        tmp = '<option value="">--None--</option>'
        for(let i = 0;i<subChannels.length;i++)
        {
            tmp += `
                <option value="${subChannels[i]}">${subChannels[i]}</option>
            `;
        }

        if(value === 'Temporary Event'){
            $('#Sub_Channel__c').attr('disabled',true);
            $('#Sub_Channel__c').append(tmp);
            $('#Sub_Channel__c').val('None');
            $('#Type__c').html('');
            let type = '';
            let typeOption = subChannelMap.get('None');
            type = '<option value="">--None--</option>'
        
            for(let i =0;i< typeOption.length;i++)
            {
                type += `
                <option value="${typeOption[i]}">${typeOption[i]}</option>
            `; 
            }
            $('#Type__c').attr('disabled',false);
            $('#Type__c').append(type);
        }else{
            $('#Sub_Channel__c').attr('disabled',false);
            $('#Sub_Channel__c').append(tmp);
            $('#Type__c').attr('disabled',true);
            $('#Type__c').html('');
        }

    }
    else{
        $('#Sub_Channel__c').attr('disabled',true);  
        $('#Type__c').attr('disabled',true);
        $('#Type__c').html('');
    }
    leadCreate[id] = value;
};




const handleSubChannel = (ele) =>{
    let value = ele.value;
    let id = $(ele).attr('id');
    let tmp = '';
    $('#Type__c').html('');
    if(subChannelMap.has(value))
    {
        let type = subChannelMap.get(value);
        tmp = '<option value="">--None--</option>'
        for(let i = 0;i<type.length;i++)
        {
            tmp += `
                <option value="${type[i]}">${type[i]}</option>
            `;
        }

        $('#Type__c').attr('disabled',false);
        $('#Type__c').append(tmp);
    }
    else{
        $('#Type__c').attr('disabled',true);  
    }
    
};
const resetInputs = () =>{
    $('#Name').val('');
    $('#Phone').val('');
    $('#Website').val('');
    $('#Beer_Selection__c').val('');
    $('#Channel__c').val('');
    $('#Sub_Channel__c').val('');
    $('#Type__c').val('');
    $('#Competitor_Non_Premium_Sales__c').val('');
    $('#Competitor_Premium_Sales__c').val('');
    $('#BillingStreet').val('');
    $('#Sales_District__c').val('');
    $('#Billing_State_Geo__c').val('');
    $('#Email__c').val('');
    $('#Excise_Code__c').val('');
    $('#GST__c').val('');
    $('#Local_Sales_Tax_Number__c').val('');
    $('#QCO_Flag__c').prop('ckecked',false);
    $('#Monthly_Sales_CE__c').val('');
    $('#Quaterly_Sales_CE__c').val('');
    $('#Cluster__c').val('');
}

const showState = () =>{
    $('#listOfStates').empty('');
    let tmp = '';
    if(stateList.length>0){
        for(let i=0;i<stateList.length;i++)
        {
            tmp +=`
                <div class="cluster" onclick="selectState(this)" data-name="${stateList[i].Id}">
                    <b>${stateList[i].Name}</b>
                  
                </div>
            `;
        }
      }
      else{
        tmp +=`
        <div class="alert alert-info" role="alert">
        No State found!
      </div>
            `;
      }

    $('#listOfStates').append(tmp);
};


const showDistrict = () =>{
    $('#listOfDistrict').empty('');
    let tmp = '';
    if(districtList.length>0){
        for(let i=0;i<districtList.length;i++)
        {
            tmp +=`
                <div class="cluster" onclick="selectDistrict(this)" data-districtName="${districtList[i].Name}" data-name="${districtList[i].Id}">
                    <b>${districtList[i].Name}</b>
                  
                </div>
            `;
        }
      }
      else{
        tmp +=`
        <div class="alert alert-info" role="alert">
        No district found for the selected State . Please select some other district and try again! 
      </div>
            `;
      }

    $('#listOfDistrict').append(tmp);
};



const showMarket = () =>{
    $('#listOfMarket').empty('');
    let tmp = '';
    if(marketList.length>0){
        for(let i=0;i<marketList.length;i++)
        {
            tmp +=`
                <div class="cluster" onclick="selectMarket(this)" data-name="${marketList[i].Id}" data-marketName="${marketList[i].Name}" >
                    <b>${marketList[i].Name}</b>
                  
                </div>
            `;
        }
      }
      else{
        tmp +=`
        <div class="alert alert-info" role="alert">
        No Market found for the selected Cluster . Please select some other Cluster and try again! 
      </div>
            `;
      }

    $('#listOfMarket').append(tmp);
};

const showCluster = () =>{
    $('#listOfCluster').empty('');
    let tmp = '';
    if(clusterList.length>0){
        for(let i=0;i<clusterList.length;i++)
        {
            tmp +=`
                <div class="cluster" onclick="selectCluster(this)" data-name="${clusterList[i].Cluster__c}">
                    <b>${clusterList[i].Cluster__r.Name}</b>
                    
                </div>
            `;
        }
    }
    else{
        tmp += `<div class="alert alert-info" role="alert">
        No Cluster found for the selected State . Please select some other state and try again! 
      </div>`;
    }

    $('#listOfCluster').append(tmp);
};

const handleCheckbox =(ele) =>{
    let value = $(ele).prop('checked');
    leadCreate['QCO_Flag__c'] = value;
}

const selectCluster = (ele) =>{
    let value = $(ele).attr('data-name');
    $('#Cluster__c').val(clusterNameIdMap.get(value));
    $('#showCluster').modal('hide');
    leadCreate['Cluster__c'] = value;
    marketList = clusterMarketMap.has(value) ? clusterMarketMap.get(value) : [];
    marketMaster = marketList;
    showMarket();
};

const selectState = (ele) =>{
    let value = $(ele).attr('data-name');
    $('#Billing_State_Geo__c').val(stateMap.get(value));
    $('#stateList').modal('hide');
    leadCreate['Billing_State_Geo__c'] = value;
    leadCreate['BillingState'] = stateMap.get(value);
    $('#Sales_District__c').val('');
    
    $('#Cluster__c').val('');
    $('#Market__c').val('');
    
    leadCreate['Cluster__c'] = '';
    clusterList = clusterMap.has(value) ? clusterMap.get(value) : [];
    clusterMaster = clusterList;
    districtList = stateDistrictMap.has(value) ? stateDistrictMap.get(value) : [];
    districtMaster = districtList;
    showCluster();
    showDistrict();
};

const selectDistrict = (ele) =>{
    let value = $(ele).attr('data-name');
    let labelVal = $(ele).attr('data-districtName');
    $('#Sales_District__c').val(labelVal);
    $('#districtList').modal('hide');
    leadCreate['District__c'] = value;
    
};

const selectMarket = (ele) =>{
    let labelVal = $(ele).attr('data-marketName'); 
    let value = $(ele).attr('data-name');
    $('#Market__c').val(labelVal);
    $('#showMarket').modal('hide');
    leadCreate['Market__c'] = value;
    
};



const handleInputField = (ele) =>{
    let value = $(ele).val();
    let id = $(ele).attr('id');
    if(id == 'GST__c')
    {
        if(value){
            if(!gstValidator(value))
            {
                $('.gsterror').css('display','block');
            }else{
                $('.gsterror').css('display','none');
            }
        }
        else{
            $('.gsterror').css('display','none');
        }
        
    }

    if(id == 'Email__c')
    {
        if(value){
            if(!validateEmail(value))
            {
                $('.emailerror').css('display','block');
            }else{
                $('.emailerror').css('display','none');
            }  
        }
        else{
            $('.emailerror').css('display','none');
        }
        
    }

    if(id == 'Website'){
        if(value){
            if(!validURL(value)){
                $('.websiteerror').css('display','block');
            }else{
                $('.websiteerror').css('display','none');
            }
        }else{
            $('.websiteerror').css('display','none');
        }
    }
    
    leadCreate[id] = value;
    mtdQtdSalesValidator();
};

const gstValidator = (g) => {
    let regTest = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(g);
    return regTest;
};

const validURL =(str)=> {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

const handleToggleHandler = (ele) => {
    leadCreate[$(ele).attr('id')] = $(ele).prop('checked');
};  
const nameValidator = () => {
    if(!leadCreate.Name  ){
        $('.nameError').css('display','block');
        return false;
    }
    $('.nameError').css('display','none');
    return true;
};

const mtdQtdSalesValidator = () => {
    let isValid = true;
    let regex = '^[0-9]+(\.[0-9]{1,4})?$'; // 4decimal precision check
    if(leadCreate['Monthly_Sales_CE__c']){
        const regexExp = RegExp(regex);
        isValid = regexExp.test(leadCreate['Monthly_Sales_CE__c']);
        if(regexExp.test(leadCreate['Monthly_Sales_CE__c'])){
            $('.mtderror').css('display','none');
        }
        else{
            $('.mtderror').css('display','block');
        }

    }
    else{
        $('.mtderror').css('display','none');
    }
    if(leadCreate['Quaterly_Sales_CE__c']){
        const regexExp= RegExp(regex);
        isValid = regexExp.test(leadCreate['Quaterly_Sales_CE__c']);
        if(regexExp.test(leadCreate['Quaterly_Sales_CE__c'])){
            $('.qtderror').css('display','none');
        }
        else{
            $('.qtderror').css('display','block');
        }
        
    }
    else{
        $('.qtderror').css('display','none');
    }

    if(leadCreate['Competitor_Non_Premium_Sales__c']){
        const regexExp= RegExp(regex);
        isValid = regexExp.test(leadCreate['Competitor_Non_Premium_Sales__c']);
        if(regexExp.test(leadCreate['Competitor_Non_Premium_Sales__c'])){
            $('.cnpsError').css('display','none');
        }
        else{
            $('.cnpsError').css('display','block');
        }
        
    }
    else{
        $('.cnpsError').css('display','none');
    }

    if(leadCreate['Competitor_Premium_Sales__c']){
        const regexExp= RegExp(regex);
        isValid = regexExp.test(leadCreate['Competitor_Premium_Sales__c']);
        if(regexExp.test(leadCreate['Competitor_Premium_Sales__c'])){
            $('.cpsError').css('display','none');
        }
        else{
            $('.cpsError').css('display','block');
        }
        
    }
    else{
        $('.cpsError').css('display','none');
    }
    return isValid;

};

const addressAndDistrictValidator = () => {
    let isValid = true;
    if(!leadCreate.BillingStreet  ){
        $('.billingAddressError').css('display','block');
        isValid = false;
    }
    else{
        $('.billingAddressError').css('display','none');
    }
    if(!leadCreate.District__c  ){
        $('.districtError').css('display','block');
        isValid = false;
    }
    else{
        $('.districtError').css('display','none');
    }

    if(!leadCreate.Cluster__c  ){
        $('.clusterError').css('display','block');
        isValid = false;
    }
    else{
        $('.clusterError').css('display','none');
    }


    if(!leadCreate.Market__c  ){
        $('.marketError').css('display','block');
        isValid = false;
    }
    else{
        $('.marketError').css('display','none');
    }


    
    return isValid;
};

const stateValidator = () => {
    if(!leadCreate.BillingState){
        $('.stateError').css('display','block');
        return false;
    }
    $('.stateError').css('display','none');
    return true;
};
const validateEmail =(email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const handleSubmitLeadCreationForm = async() => {
    let loginData = await loginDataFetch();
    leadCreate['BillingCountry'] = 'India';
    leadCreate['Created_by_Salesperson__c'] = loginData[0].Id;
    leadCreate['Lead_Status__c'] = 'Lead Created';
    leadCreate['Account_Status__c'] = 'Unbilled';
    leadCreate['Sub_Channel__c'] = $('#Sub_Channel__c').val();
    leadCreate['Channel__c'] = $('#Channel__c').val();
    leadCreate['Type__c'] = $('#Type__c').val();
    let isValid = true;
    if(!nameValidator()){
        showNotification({message : 'Fill all mandatory fields'});
        isValid = false;
    }
    if(!stateValidator()){
        showNotification({message : 'Fill all mandatory fields'});
        isValid = false;
    }

    if(leadCreate.GST__c&&!gstValidator(leadCreate.GST__c)){
        showNotification({message : 'GST format is incorrect'});
        isValid = false;
    }
    
    if(leadCreate.Email__c&&!validateEmail(leadCreate.Email__c)){
        showNotification({message : 'Email format is incorrect'});
        isValid = false;
    }
    if(!addressAndDistrictValidator()){
        showNotification({message : 'Fill all mandatory fields!'});
        isValid = false;
    }
    if(!mtdQtdSalesValidator()){
        showNotification({message : 'Only 4 digits are allowed in Competitor Premium sales, Competitor Non-premium sales, MTD and QTD Sales'});
        isValid = false;
    }
    if(isValid){
        // Submit Method
        showLoaderSpinner();
        await handleSubmitRequest();
        
        showNotification({message :'Lead is created and is pending for Approval'});
        setTimeout(() => {
            hideLoaderSpinner();    
            handleLeadRedirect();
        },2000);
        
    }
    else{
        
    }
};

const handleLeadRedirect = () => {
    window.location.href = '/view/leadList/leadList.html';
};


const handleClusterSearch = (ele) =>{
    let value = $(ele).val();
    clusterList = clusterMaster.filter((ele) => {
        let isValid = true;
        if (ele.Cluster__r.Name && value) {
          if (ele.Cluster__r.Name.toLowerCase().indexOf(value.toLowerCase()) < 0) {
            isValid = false;
          }
        }
        return isValid;
    });

    showCluster();
    
};


// Search for States
const handleStateSearch = (ele) =>{
    
    let value = $(ele).val();
    stateList = stateMaster.filter((ele) => {
        let isValid = true;
        if (ele.Name && value) {
          if (ele.Name.toLowerCase().indexOf(value.toLowerCase()) < 0) {
            isValid = false;
          }
        }
        return isValid;
    });

   showState();
    
};

// Search for States
const handleDistrictSearch = (ele) =>{
    
    let value = $(ele).val();
    districtList = districtMaster.filter((ele) => {
        let isValid = true;
        if (ele.Name && value) {
          if (ele.Name.toLowerCase().indexOf(value.toLowerCase()) < 0) {
            isValid = false;
          }
        }
        return isValid;
    });

   showDistrict();
    
};

// Search for States
const handleMarketSearch = (ele) =>{
    
    let value = $(ele).val();
    marketList = marketMaster.filter((ele) => {
        let isValid = true;
        if (ele.Name && value) {
          if (ele.Name.toLowerCase().indexOf(value.toLowerCase()) < 0) {
            isValid = false;
          }
        }
        return isValid;
    });

   showMarket();
    
};



