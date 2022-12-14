
let accountName = document.querySelector('#accountName');
let tabletInfo = document.querySelector('#tabletInfo');

const initalizeDetail =  () => {
    informationSection();
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
                gridCol.appendChild(checkBoxCreation(i,salesSummaryFieldLabelMap.get(i),null,accountRec[i],true));
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


handlePageRedirect = async(page) => {
    if(page ==='Detail'){
        window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id='+accountRec.Id;
    }
    else if(page ==='Related'){
        window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id='+accountRec.Id;
    }
    else if(page ==='Home'){
        let nonSales = await isTechnicianAuditorFuncHelper();
        if(nonSales.isSales)
            window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
        else if(nonSales.isAudit)
            window.location.href ='/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+accountRec.Id;
        else if(nonSales.isTech)
            window.location.href ='/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+accountRec.Id;
        
    }
    else{
        window.location.href ='/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id='+accountRec.Id;
    }
};