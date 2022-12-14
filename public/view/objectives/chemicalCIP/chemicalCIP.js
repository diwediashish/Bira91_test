let hygieneAuditField = [
    "Pre_Rinse_10_Min__c",
    "Chemical_Hold_20_Min__c",
    "Chemical_Rinse_Till_Liquid_Clean__c",
    "Hot_Water_Step__c",
    "Warehouse_Lighting__c",
    "Hot_Water_Temperature_80_85degree__c",
    "Normal_Water_Rinsing__c",
    "Residual_Check_from_PH_Paper__c",
    "All_Necessary_Tools_available_with_Techn__c",
    "Cleaning_Brushes_Avaialble__c",
    "Safety_Glasses_Available__c",
    "Safety_Surgical_Gloves_Available__c",
    "Technician_Name",
    "Service_Feedback__c",
];

let mapOfFieldLabel = new Map([
    ["Pre_Rinse_10_Min__c","Pre Rinse- 10 Min"],
    ["Chemical_Hold_20_Min__c","Chemical Hold- 20 Min"],
    ["Chemical_Rinse_Till_Liquid_Clean__c","Chemical Rinse Till Liquid Clean"],
    ["Hot_Water_Step__c","Hot Water Step"],
    ["Warehouse_Lighting__c","Warehouse Lighting"],
    ["Hot_Water_Temperature_80_85degree__c","Hot Water Temperature- 80-85 degree"],
    ["Normal_Water_Rinsing__c","Normal Water Rinsing"],
    ["Residual_Check_from_PH_Paper__c","Residual Check from PH Paper"],
    ["All_Necessary_Tools_available_with_Techn__c","All Necessary Tools available with Technician"],
    ["Cleaning_Brushes_Avaialble__c","Cleaning Brushes Available ?"],
    ["Safety_Glasses_Available__c","Safety Glasses Available"],
    ["Safety_Surgical_Gloves_Available__c","Safety Surgical Gloves Available?"],
    ["Technician_Name","Technician Name"],
    ["Service_Feedback__c","Service Feedback"]
]);

initializeChemicalCIPUI = () =>{
    createHygieneAudit();
};

const createHygieneAudit = () =>{
    let tmp = '';

    $('#chemicalCIP').html('');
    for(let i = 0;i <hygieneAuditField.length; i++)
    {
        tmp += `
        
            <div class="col-xs-7">
                <label>${mapOfFieldLabel.get(hygieneAuditField[i])}</label>
            </div>
            <div class="col-xs-5">
            ${hygieneAuditField[i]==='Technician_Name' ? createInputField(hygieneAuditField[i],null,true)  : hygieneAuditField[i]==='Service_Feedback__c' ? createSelectOption(hygieneAuditField[i],null,['Good','Bad','Scope for Improvement'])  : `<label class="switch">
            <input type="checkbox" value="" id="${hygieneAuditField[i]}" onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>` }
                
            </div>
        `;
    }
    $('#chemicalCIP').append(tmp);
};


const createInputField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <div class="form-group">
            <textarea class="form-control" ${disabled ? 'disabled' : ''}  id="${id}" value="${value ? value : ''}"></textarea>
        </div>`;

    return tmp;
};

const createSelectOption = (id,value,options) =>{
    let tmp =`
       <div class="form-group">
        <select class="form-control" onchange="handleSelectChange(this)" id="${id}">
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

const handleSelectChange =(ele) => {
    chemicalCIP[$(ele).attr('id')] = $(ele).val();
};
const checkBoxChangeHandler = (ele) =>{
    chemicalCIP[$(ele).attr('id')] = $(ele).prop('checked');
};