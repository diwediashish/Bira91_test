
let selectOptions = new Map([
    ['Total_Shelf_Life__c',['90 days','180 days	','360 days	']],
    ['Plant_Name__c',['Maksi','Nagpur','Kovuur','Mysore']]
]);

let brandFreshnessItems = [];

initializeBrandFreshnessUIHelper = () =>{
    let tmp = '';
    
    tmp +=`
        <h4>Brand Freshness</h4>
        <table>
            <tr>
                <td><label>Brand Name</label></td>
                <td><label>Pack Size</label></td>
                <td></td>
            </tr>
            <tr>
                <td>${createSelectOption('Brand_Name',null,selectOptions.get('Brand_Name'))}</td>
                <td>${createSelectOption('Variant',null,selectOptions.get('Pack_Size__c'))}</td>
                <td><button class="btn btn-default" onclick="handleAddItem()">Add</button></td>
            </tr>
        </table>

    `;

    $('#brand-freshness').append(tmp);
    createBrandItemSection(brandFreshnessItems);
}


const createSelectOption = (id,value,options) =>{
    let tmp =`
       <div class="form-group">
        <select class="form-control" id="${id}" onchange="handleSelectOption(this)">
            <option value="">--None--</option>
    `;

    for(let i = 0;i<options.length;i++){
        tmp +=`
        <option value="${options[i]}" ${options[i] === value ? 'selected' : ''}>${options[i]}</option>
        `;
    }

    tmp += '</select></div>';

    return tmp;
};


const createInputField = (id,value,type,readonly) =>{

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    let tmp = '';
        tmp = `
        <div class="form-group">
            <input class="form-control" ${type === 'date' ? `max=${today}` : ''} ${readonly ? 'readonly' : ''} type="${type}" id="${id}" value="${value ? value : ''}" onchange="handleInputChange(this)"/>
        </div>`;

    return tmp;
};

const handleSelectOption = (ele) =>{
    let index = $(ele).attr('id').split('-')[0];

    if($(ele).attr('id').split('-')[1])
    {
        let name = $(ele).attr('id').split('-')[1];
        let value = $(ele).val();

        brandFreshnessItems[index][name] = value; 
    }
};


const handleInputChange = (ele) =>{
    let index = $(ele).attr('id').split('-')[0];
    let name = $(ele).attr('id').split('-')[1];
    let value = $(ele).val();

    brandFreshnessItems[index][name] = value;  

    if(name === 'Manufacturing_Date__c')
    {
        const date1 = new Date();
        const date2 = new Date(value);
        const diffTime = Math.abs(date1 - date2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        $(`#${index}-Total_Age_Days__c`).val(diffDays);
        brandFreshnessItems[index]['Total_Age_Days__c'] = diffDays;  

    }
};

const handleDelete = (index) =>{
    brandFreshnessItems.splice(index,1);
    createBrandItemSection(brandFreshnessItems);
}

const handleAddItem = () =>{

    if(!$('#Brand_Name').val()  || !$('#Variant').val()){
        showNotification({message : 'Please Select Liquid and Pack Size'});
        return;
    }
    for(let i of brandFreshnessItems){
        if(i.Brand_Name===$('#Brand_Name').val()&&i.Pack_Size__c===$('#Variant').val()){
            showNotification({message : 'Selected liquid and Pack Size already added. Please select new combination!'});
            return;
        }
    }
    let brandItem;
    const key = fetchCurrentDateIdStr()+'-'+accountRec.Id+'-'+'brandFreshnessHygiene';
    brandItem = {
        Brand_Name : $('#Brand_Name').val(),
        Pack_Size__c : $('#Variant').val(),
        Batch_No__c : '',
        Plant_Name__c : '',
        Manufacturing_Date__c : '',
        Total_Shelf_Life__c : '',
        Total_Age_Days__c : '',
        App_Id__c : key+'-'+$('#Brand_Name').val()+'-'+$('#Variant').val(),
        Record_Type_Helper__c  : 'Brand_Freshness',
        Draft_Installation_App_Id__c : key,
    }

    brandFreshnessItems.push(brandItem);
    createBrandItemSection(brandFreshnessItems);
}

const createBrandItemSection = (items) =>{
    let tmp = '';
    
    $('#brand-items').html('');
    for(let i = 0;i< items.length; i++)
    {
        tmp +=`
            <div class="item">
                <div class="row">
                    <div class="col-xs-6"><label>Brand Name</label></div>
                    <div class="col-xs-6">${createInputField(`${i}-Brand_Name`,items[i].Brand_Name,'text',true)}</div>
                </div>
                <div class="row">
                    <div class="col-xs-6"><label>Pack Size</label></div>
                    <div class="col-xs-6">${createInputField(`${i}-Pack_Size__c`,items[i].Pack_Size__c,'text',true)}</div>
                </div>
                <div class="row">
                    <div class="col-xs-6"><label>Batch No. </label></div>
                    <div class="col-xs-6">${createInputField(`${i}-Batch_No__c`,items[i].Batch_No__c,'text',false)}</div>
                </div>
                <div class="row">
                    <div class="col-xs-6"><label>Plant Name</label></div>
                    <div class="col-xs-6">${createSelectOption(`${i}-Plant_Name__c`,items[i].Plant_Name__c,selectOptions.get('Plant_Name__c'))}</div>
                </div>
                <div class="row">
                    <div class="col-xs-6"><label>Manufacturing Date</label></div>
                    <div class="col-xs-6">${createInputField(`${i}-Manufacturing_Date__c`,items[i].Manufacturing_Date__c,'date',false)}</div>
                </div>
                <div class="row">
                    <div class="col-xs-6"><label>Total Shelf Life</label></div>
                    <div class="col-xs-6">${createSelectOption(`${i}-Total_Shelf_Life__c`,items[i].Total_Shelf_Life__c,selectOptions.get('Total_Shelf_Life__c'))}</div>
                </div>
                <div class="row">
                    <div class="col-xs-6"><label>Total Age (Days)</label></div>
                    <div class="col-xs-6">${createInputField(`${i}-Total_Age_Days__c`,items[i].Total_Age_Days__c,'text',true)}</div>
                </div>
                <div class="row text-right">
                    <div class="col-xs-12">
                    <button class="btn btn-danger" onclick="handleDelete(${i})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }

    $('#brand-items').append(tmp);
}

