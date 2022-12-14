
let accountName = document.querySelector('#accountName');
let tabletInfo = document.querySelector('#tabletInfo');

// let accountRec = {
//     'Name' :'Deepak',
//     'RecordType':'Lead',
//     'Phone':1234567845, 
//     'Website':'',
//     'Beer_Selection__c':'BRROM',
//     'Channel__c':'asd', 
//     'Sub_Channel__c':'fff',
//     'Type__c':'dd',
//     'Competitor_Non_Premium_Sales__c':'fg',
//     'Competitor_Premium_Sales__c':'mf', 
//     'Email__c' : 'sdfgh', 
//     'Excise_Code__c' : 'dfg', 
//     'GST__c' : 'gfd', 
//     'Local_Sales_Tax_Number__c' : 'styu',
//     'QCO_Flag__c' : true,
//     'MTD_Sales__c' : 'dfg', 
//     'QTD_Sales__c' : 'fg',
//     'Cluster__r.Name' : 'Dealer'
// }

const initalizeDetail =  () => {
    showAccount();
    informationSection();
    addressSection();
};

// for Distributor Ware House Information section
const informationSection = () => {
    const informationFieldLabelMap = new Map([
        ['Name', 'Name'],
        ['RecordType', 'Record Type'],
        ['Phone', 'Phone'],
        ['Website','Website'],
        ['Beer_Selection__c','Beer Selection'],
        ['Channel__c', 'Channel'],
        ['Sub_Channel__c','Sub-Channel'],
        ['Type__c', 'Type'],
        ['Monthly_Sales_CE__c','Monthly Sales(CE)'],
        ['Quaterly_Sales_CE__c','Quaterly Sales(CE)'],
        ['Competitor_Non_Premium_Sales__c', 'Monthly Competitor Non-Premium Sales(CE)'],
        ['Competitor_Premium_Sales__c', 'Monthly Competitor Premium Sales(CE)'],
        ['Email__c', 'Email'],
        ['Excise_Code__c', 'Excise Code'],
        ['GST__c', 'GST'],
        ['Local_Sales_Tax_Number__c', 'Local Sales Tax Number'],
        ['QCO_Flag__c','QCO'],
        ['MTD_Sales__c','MTD Sales'],
        ['QTD_Sales__c','QTD Sales'],
        ['Cluster__r','Cluster']
    ]);
    const informationFields = ['Name', 'RecordType', 'Phone', 'Website','Beer_Selection__c','Channel__c', 'Sub_Channel__c', 'Type__c','Quaterly_Sales_CE__c', 'Monthly_Sales_CE__c','Competitor_Non_Premium_Sales__c','Competitor_Premium_Sales__c', 'Email__c', 'Excise_Code__c', 'GST__c', 'Local_Sales_Tax_Number__c','QCO_Flag__c','MTD_Sales__c','QTD_Sales__c','Cluster__r'];
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
            }else if (i === 'Cluster__r') {
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
    
    
