
let accountName = document.querySelector('#accountName');
let tabletInfo = document.querySelector('#tabletInfo');


const initalizeDetail =  () => {
    informationSection();
    salesSummarySection();
    marketInformationSection();   
    statutorynSection();
    creditLimitSection();
    draftSection();
    accountDetail();
    addressSection();
    
    let url_string = window.location.href
    let url = new URL(url_string);
    let page = url.searchParams.get("page");

    if(page === 'Approval')
    {
        $('#backBtn').css('display','block');
        $('.showDropdown').css('opacity','0');
    }else{
        $('#backBtn').css('display','none');
    }
};

// for Distributor Ware House Information section

const informationSection = () => {
    const informationFieldLabelMap = new Map([
        ['Name', 'Name'],
        ['RecordType', 'Record Type'],
        ['Channel__c', 'Channel'],
        ['Account_Status__c', 'Account Status'],
        ['Sub_Channel__c', 'Sub Channel'],
        ['Type__c', 'Type'],
        ['Neighbourhood__c', 'Neighbourhood'],
        ['Phone', 'Phone'],
        ['Ocassion__c', 'Occasion'],
        ['Email__c', 'Email'],
        ['BIRA_ID__c', 'BIRA Id'],
        ['Liquor_Available__c', 'Liquor Available'],
        ['Distributor_Warehouse__r.Name', 'Distributor Warehouse']
    ]);
    const informationFields = ['Name', 'RecordType', 'Channel__c', 'Account_Status__c', 'Sub_Channel__c', 'Phone', 'Type__c', 'Email__c', 'Ocassion__c', 'Liquor_Available__c', 'Neighbourhood__c', 'Distributor_Warehouse__r.Name', 'BIRA_ID__c'];
    let informationPanel = document.querySelector('#informationPanel');
    for (let i of informationFields) {
        if (informationFieldLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';

            if (accountRec[i] === true || accountRec[i] === false) {
                gridCol.appendChild(checkBoxCreation(i,informationFieldLabelMap.get(i),null,accountRec[i],true));
                informationPanel.appendChild(gridCol);
            }
            else{
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = informationFieldLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Distributor_Warehouse__r.Name : '';
            } else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';
            
            inputText.type = 'text';
            
            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            if(i === 'Phone'){
                let anchorTag = document.createElement('a');
                anchorTag.setAttribute('href', 'tel:'+inputText.value);
                anchorTag.appendChild(inputText);
                textFieldOuterWrap.appendChild(anchorTag);
            }

            if(i === 'Email__c'){
                let anchorTag = document.createElement('a');
                anchorTag.setAttribute('href', 'mailto:'+inputText.value);
                anchorTag.appendChild(inputText);
                textFieldOuterWrap.appendChild(anchorTag);
            }
            
            informationPanel.appendChild(gridCol);
        }
        }

    }
}


// Sales Summay section
const salesSummarySection = () => {
    const salesSummaryFieldLabelMap = new Map([
        ['Sales_Type__c', 'Sales Type'],
        ['Imported_Brands__c', 'Imported Brands'],
        ['Size_Format__c', 'Size Format'],
        ['Premium_Brands__c', 'Premium Brands'],
        ['MTD_Sales__c', 'MTD Sales'],
        ['QCO_Flag__c', 'QCO'],
        ['QTD_Sales__c', 'QTD Sales'],
        ['BIRA_Premium_Sales__c', 'BIRA Premium Sales'],
        ['YTD_Sales__c', 'YTD Sales'],
        ['Email__c', 'Email'],
        ['BIRA_ID__c', 'BIRA Id'],
        ['BIRA_Non_Premium_Sales__c', 'BIRA Non Premium Sales'],
        ['Competitor_Premium_Sales__c', 'Competitor Premium Sales'],
        ['Competitor_Non_Premium_Sales__c', 'Competitor Non Premium Sales']
    ]);
    const salesSummaryFields = ['Sales_Type__c', 'Imported_Brands__c', 'Size_Format__c', 'Premium_Brands__c', 'MTD_Sales__c', 'QCO_Flag__c', 'QTD_Sales__c', 'BIRA_Premium_Sales__c', 'YTD_Sales__c', 'BIRA_Non_Premium_Sales__c', 'Competitor_Premium_Sales__c', 'Competitor_Non_Premium_Sales__c'];
    let salesSummaryPanel = document.querySelector('#salesSummary');
    for (let i of salesSummaryFields) {
        if (salesSummaryFieldLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';

            if (accountRec[i] === true || accountRec[i] === false) {
                gridCol.appendChild(checkBoxCreation(i,salesSummaryFieldLabelMap.get(i),null,accountRec[i],true));
                salesSummaryPanel.appendChild(gridCol);
            }
            else{
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = salesSummaryFieldLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');

            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Name : '';
            } else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';

            inputText.type = 'text';
            
            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            
            salesSummaryPanel.appendChild(gridCol);
        }
        }

    }
}



// Market Information
const marketInformationSection = () => {
    const marketInformationFieldLabelMap = new Map([
        ['Beer_Selection__c', 'Beer Selection'],
        ['Keg_Stock_Limit__c', 'Keg Stock Limit'],
        ['Market_Share__c', 'Market Share'],
        ['Last_Keg_Order_Date__c', 'Last Keg Order Date'],
        ['Growth_Type__c', 'Growth Type'],
        ['Total_Market_Size_Absolute_Value__c', 'Total Market Size Absolute Value'],
        ['Premium_Brands_Share_Bira__c', 'Premium Brands Share Bira'],
        ['Premium_Brands_Share_Competitor__c', 'Premium Brands Share Competitor'],
        ['Total_Market_Size_Sales__c', 'Total Market Size Sales']
    ]);
    const marketInformationFields = ['Beer_Selection__c', 'Keg_Stock_Limit__c', 'Market_Share__c', 'Last_Keg_Order_Date__c', 'Growth_Type__c', 'Total_Market_Size_Absolute_Value__c', 'Premium_Brands_Share_Bira__c', 'Premium_Brands_Share_Competitor__c', 'Total_Market_Size_Sales__c'];
    let marketSummaryPanel = document.querySelector('#marketSummary');
    for (let i of marketInformationFields) {
        if (marketInformationFieldLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = marketInformationFieldLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Distributor_Warehouse__r.Name : '';
            } else if (i === 'Market_Share__c' || i === 'Premium_Brands_Share_Bira__c' || i === 'Premium_Brands_Share_Competitor__c') {
                inputText.value = accountRec[i] ? accountRec[i] + ' %' : '';
            } else if(i === 'Last_Keg_Order_Date__c'){
                inputText.value = accountRec[i] ? new Date(accountRec[i]).toLocaleString("en-US",{day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',}) : '';
            }else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';

            if (accountRec[i] === true || accountRec[i] === false) {
                inputText.type = 'checkbox';
                inputText.checked = inputText.value;
                inputText.className = 'mdl-checkbox__input';
                inputText.disabled = true;
            } else {
                inputText.type = 'text';
            }
            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            
            marketSummaryPanel.appendChild(gridCol);
        }

    }
}


// Statutory Information 
const statutorynSection = () => {
    const statutoryInformationFieldLabelMap = new Map([
        ['Excise_Code__c', 'Excise Code'],
        ['License_Type__c', 'License Type'],
        ['License_Name__c', 'Licence Name'],
        ['License_Number__c', 'License Number'],
        ['Central_Sales_Tax_Number__c', 'Central Sales Tax Number'],
        ['Industry_Segment__c', 'Industry Segment'],
        ['Local_Sales_Tax_Number__c', 'Local Sales Tax Number'],
        ['Bira_Segment__c', 'BIRA Segment'],
        ['PAN__c', 'PAN'],
        ['PAN_Reference_Number__c', 'PAN Reference Number'],
        ['Hold_Status__c', 'Hold Status'],
        ['Beacon_Flag__c', 'Beacon'],
        ['TIN__c', 'TIN'],
        ['Flag_for_Customer_on_Hold_Finance_Hold__c', 'Customer on Hold'],
        ['VAT_Registration_Number__c', 'VAT Reg. No.'],
        ['GST__c', 'GST']
    ]);
    const statutoryInformationFields = ['Excise_Code__c', 'License_Type__c', 'License_Name__c', 'Beacon_Flag__c', 'License_Number__c', 'Central_Sales_Tax_Number__c', 'Industry_Segment__c', 'Local_Sales_Tax_Number__c', 'Bira_Segment__c', 'Hold_Status__c', 'PAN__c', 'PAN_Reference_Number__c', 'TIN__c', 'Flag_for_Customer_on_Hold_Finance_Hold__c', 'VAT_Registration_Number__c', 'GST__c'];
    let statutoryummaryPanel = document.querySelector('#statutoryInformation');
    for (let i of statutoryInformationFields) {
        if (statutoryInformationFieldLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';

            if (accountRec[i] === true || accountRec[i] === false) {
                gridCol.appendChild(checkBoxCreation(i,statutoryInformationFieldLabelMap.get(i),null,accountRec[i],true));
                statutoryummaryPanel.appendChild(gridCol);
            }
            else{
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = statutoryInformationFieldLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Distributor_Warehouse__r.Name : '';
            } else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';

            inputText.type = 'text';
            

            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            
            statutoryummaryPanel.appendChild(gridCol);
        }
        }

    }
}



// Credit Information 
const creditLimitSection = () => {
    const creditFieldLabelMap = new Map([
        ['Credit_Limit__c', 'Credit Limit'],
        ['Current_Outstanding__c', 'Current Outstanding']

    ]);
    const creditInformationFields = ['Credit_Limit__c', 'Current_Outstanding__c'];
    let creditPanel = document.querySelector('#creditInformation');
    for (let i of creditInformationFields) {
        if (creditFieldLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';

            if (accountRec[i] === true || accountRec[i] === false) {
                gridCol.appendChild(checkBoxCreation(i,creditFieldLabelMap.get(i),null,accountRec[i],true));
                creditPanel.appendChild(gridCol);
            }
            else{
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = creditFieldLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Distributor_Warehouse__r.Name : '';
            } else {
                inputText.value = accountRec[i] ? '₹ ' + accountRec[i] : '';
            }
            inputText.className = 'form-control';
            
            inputText.type = 'text';
            
            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            
            creditPanel.appendChild(gridCol);
        }
        }

    }
}


// Draft Information 
const draftSection = () => {
    const draftLabelMap = new Map([
        ['Draft_Agreement_Number__c', 'Draft Agreement Number'],
        ['Draft_Ready__c', 'Draft Ready'],
        ['Group_Number__c', 'Group Number'],
        ['Group_Account_Flag__c', 'Group Account'],
        ['Number_of_Draft_Machines__c', 'No Of Drafts'],
        ['Draft_Status__c', 'Draft'],

    ]);
    const draftFields = ['Draft_Agreement_Number__c', 'Draft_Ready__c', 'Group_Number__c', 'Group_Account_Flag__c', 'Number_of_Draft_Machines__c', 'Draft_Status__c'];
    let draftPanel = document.querySelector('#draftInformation');
    for (let i of draftFields) {
        if (draftLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';

            if (accountRec[i] === true || accountRec[i] === false) {
                gridCol.appendChild(checkBoxCreation(i,draftLabelMap.get(i),null,accountRec[i],true));
                draftPanel.appendChild(gridCol);
            }
            else{
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = draftLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Distributor_Warehouse__r.Name : '';
            } else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';
            
            inputText.type = 'text';
            
            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            draftPanel.appendChild(gridCol);
        }
        }

    }
}

// Account Details Information 
const accountDetail = () => {
    const accountDetailLabelMap = new Map([
        ['Registered_Name__c', 'Registered Name'],
        ['KYC_Done__c', 'KYC Done'],
        ['Close_Reason__c', 'Close Reason'],
        ['POSM_ready__c', 'POSM Ready'],
        ['Other_Entertainment__c', 'Other Entertainment']

    ]);
    const accountDetailFields = ['Registered_Name__c', 'KYC_Done__c', 'Close_Reason__c', 'POSM_ready__c', 'Other_Entertainment__c'];
    let accountDetailPanel = document.querySelector('#accountDetail');
    for (let i of accountDetailFields) {
        if (accountDetailLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';

            if (accountRec[i] === true || accountRec[i] === false) {
                gridCol.appendChild(checkBoxCreation(i,accountDetailLabelMap.get(i),null,accountRec[i],true));
                accountDetailPanel.appendChild(gridCol);
            }
            else{
            let textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            let inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = accountDetailLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            let inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            } else if (i === 'Distributor_Warehouse__r.Name') {
                inputText.value = accountRec.Distributor_Warehouse__r ? accountRec.Distributor_Warehouse__r.Name : '';
            } else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';

            inputText.type = 'text';

            inputText.readOnly = true;
            
            textFieldOuterWrap.appendChild(inputText);
            
            accountDetailPanel.appendChild(gridCol);
        }
        }

    }
}

// Address Section
const addressSection = () => {

    // Billing Address
    let addressPanel = document.querySelector('#addressInformation');
    let gridColBilling = document.createElement('div');
    gridColBilling.className = 'col-sm-6 col-xs-12';
    let textFieldOuterWrap = document.createElement('div');
    textFieldOuterWrap.className = 'form-group';
    gridColBilling.appendChild(textFieldOuterWrap);
    let inputLabel = document.createElement('label');
    inputLabel.className = 'control-label';
    inputLabel.innerHTML = 'Billing Address';
    textFieldOuterWrap.appendChild(inputLabel);
    let textareaInput = document.createElement('textarea');
    textareaInput.className = 'form-control';
    textareaInput.type = 'text';
    textareaInput.rows = '3';
    textareaInput.readOnly = true;
    textareaInput.innerHTML = (accountRec.BillingStreet ? accountRec.BillingStreet + ',&#13;&#10;' : '') + (accountRec.BillingCity ? accountRec.BillingCity + ',&#13;&#10;' : '') + (accountRec.BillingState ? accountRec.BillingState + ',&#13;&#10;' : '') + (accountRec.BillingCountry ? accountRec.BillingCountry + '.&#13;&#10;' : '') + (accountRec.BillingPostalCode ? accountRec.BillingPostalCode + '&#13;&#10;' : '');
    textFieldOuterWrap.appendChild(textareaInput);
    addressPanel.appendChild(gridColBilling);

    // Shipping Address
    let gridColShipping = document.createElement('div');
    gridColShipping.className = 'mdl-cell mdl-cell--4-col-tablet mdl-cell--4-col-phone';
    textFieldOuterWrap = document.createElement('div');
    textFieldOuterWrap.className = 'form-group';
    gridColShipping.appendChild(textFieldOuterWrap);
    inputLabel = document.createElement('label');
    inputLabel.className = 'control-label';
    inputLabel.innerHTML = 'Shipping Address';
    textFieldOuterWrap.appendChild(inputLabel);
    textareaInput = document.createElement('textarea');
    textareaInput.className = 'form-control';
    textareaInput.type = 'text';
    textareaInput.rows = '3';
    textareaInput.readOnly = true;
    textareaInput.innerHTML = (accountRec.ShippingStreet ? accountRec.ShippingStreet + ',&#13;&#10;' : '') + (accountRec.ShippingCity ? accountRec.ShippingCity + ',&#13;&#10;' : '') + (accountRec.ShippingState ? accountRec.ShippingState + ',&#13;&#10;' : '') + (accountRec.ShippingCountry ? accountRec.ShippingCountry + '.&#13;&#10;' : '') + (accountRec.ShippingPostalCode ? accountRec.ShippingPostalCode + '&#13;&#10;' : '');
    textFieldOuterWrap.appendChild(textareaInput);
    
    addressPanel.appendChild(gridColShipping);
    const addressFieldLabelMap = new Map([
        ['Location__c', 'Location'],
        ['Geolocation__c', 'Geolocation']
    ]);
    const addressfields = ['Location__c', 'Geolocation__c'];
    for (let i of addressfields) {
        if (addressFieldLabelMap.has(i)) {
            let gridCol = document.createElement('div');
            gridCol.className = 'col-sm-6 col-xs-12';
            textFieldOuterWrap = document.createElement('div');
            textFieldOuterWrap.className = 'form-group';
            gridCol.appendChild(textFieldOuterWrap);
            inputLabel = document.createElement('label');
            inputLabel.className = 'control-label';
            inputLabel.innerHTML = addressFieldLabelMap.get(i);
            textFieldOuterWrap.appendChild(inputLabel);
            inputText = document.createElement('input');
            if (i === 'RecordType') {
                inputText.value = accountRec[i] ? accountRec[i].Name : '';
            }else if(i ==='Geolocation__c' ){
                inputText.value = accountRec[i] ? `${accountRec[i].latitude},${accountRec[i].longitude}` : '';
            } else {
                inputText.value = accountRec[i] ? accountRec[i] : '';
            }
            inputText.className = 'form-control';
            if (accountRec[i] === true || accountRec[i] === false) {
                inputText.type = 'checkbox';
                inputText.checked = inputText.value;
                inputText.className = 'mdl-checkbox__input';
                inputText.disabled = true;
            } else {
                inputText.type = 'text';
            }
            inputText.readOnly = true;
            textFieldOuterWrap.appendChild(inputText);
            
            addressPanel.appendChild(gridCol);
        }

    }
};
    
    
showLoader = () =>{
    $('.loader-div').css('display','block');
};

hideLoader = () =>{
    $('.loader-div').css('display','none');
};


handlePageRedirect =async (page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isSales)
            window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id;
        else if(nonSales.isAudit)
            window.location.href ='/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountRec.Id;
        else if(nonSales.isTech)
            window.location.href ='/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
        
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id='+accountRec.Id;
    }
};