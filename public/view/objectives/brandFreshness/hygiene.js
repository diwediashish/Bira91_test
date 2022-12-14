let hygieneAuditField = ["Clean_Tower__c","Clean_Faucet__c","Clean_Coupler__c","Clean_Drip_Tray__c",
"Clean_Liquid_Free_from_Floaters_Debris__c","Clean_Refrigeration_unit_amp_its_worki__c",
"Clean_Surroundings__c",
"Shrink_Wrapping_of_Uncoupled_Coupler__c",
"Co2_Pressure_Gauge_display_working__c",
"Kegs_Storage_Conditions__c",
"Clean_Dispensing_Area__c",
"Storage_Temperature__c",
];

let mapOfFieldLabel = new Map([
    ["Clean_Tower__c","Clean Tower"],
    ["Clean_Faucet__c","Clean Faucet"],
    ["Clean_Coupler__c","Clean Coupler"],
    ["Clean_Drip_Tray__c","Clean Drip Tray"],
    ["Clean_Liquid_Free_from_Floaters_Debris__c","Clean Liquid(Free from Floaters/Debris)"],
    ["Clean_Refrigeration_unit_amp_its_worki__c","Clean Refrigeration unit & its working"],
    ["Clean_Surroundings__c","Clean Surroundings"],
    ["Shrink_Wrapping_of_Uncoupled_Coupler__c","Shrink Wrapping of Uncoupled Coupler"],
    ["Co2_Pressure_Gauge_display_working__c","Co2 Pressure Gauge display working"],
    ["Kegs_Storage_Conditions__c","Kegs Storage Conditions"],
    ["Clean_Dispensing_Area__c","Clean Dispensing Area"],
    ["Storage_Temperature__c","Storage Temperature"],
]);

initializehygieneAudit = () =>{
    createHygieneAudit();
};

const createHygieneAudit = () =>{
    let tmp = '';

    $('#hygieneAudit').html('');
    for(let i = 0;i <hygieneAuditField.length; i++)
    {
        if(hygieneAuditField[i] != 'Kegs_Storage_Conditions__c')
        {
        tmp += `
        
            <div class="col-xs-7">
                <label>${mapOfFieldLabel.get(hygieneAuditField[i])}</label>
            </div>
            <div class="col-xs-5">
                <label class="switch">
                    <input type="checkbox" value="" id="${hygieneAuditField[i]}" onchange="checkBoxChangeHandler(this)">
                    <span class="slider round"></span>
                </label>
            </div>
        `;

    }else{ 

            tmp +=`
            <div class="col-xs-7">
                <label>${mapOfFieldLabel.get(hygieneAuditField[i])}</label>
            </div>
            <div class="col-xs-5">
                
                <select class="form-control" id="${hygieneAuditField[i]}" onchange="handleSelectOptionChange(this)" style="margin: 0 0 25px;">
                    <option value="">--None--</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Poor">Poor</option>
                    <option value="Very Poor">Very Poor</option>
                    </select>
                
            </div>
            `
        }
    }
    $('#hygieneAudit').append(tmp);
};

const checkBoxChangeHandler = (ele) =>{
    brandFreshness[$(ele).attr('id')] = $(ele).prop('checked');
};

const handleSelectOptionChange =(ele) =>{
    brandFreshness[$(ele).attr('id')] = $(ele).val();
}
