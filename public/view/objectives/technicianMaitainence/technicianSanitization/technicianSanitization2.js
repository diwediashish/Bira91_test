let fieldMap = new Map([
    ['Chiller_body_cleaned__c','Chiller Body Cleaned'],
    ['Tower_cleaned__c','Tower Cleaned'],
    ['Sanitized_with_hot_water__c','Sanitized with hot water'],
    ['Check_thermostat_setting__c','Check Thermostat Setting'],
    ['Re_circulation_Pump__c','Re-Circulation Pump'],
    ['Fan_motor__c','Fan Motor'],
    ['Concendsor_condition__c','Condenser Condition'],
    ['Compressor_gas__c','Compressor Gas'],
    ['Compressor_head_pressure__c','Compressor Head Pressure'],
    ['Chiller_Water_Quantity__c','Chiller Water Quanlity'],
    ['Chiller_Water_levels__c','Chiller Water Level'],
    ['Ice_bank_formation__c','Ice Bank Formation'],

    ['Output_Pressure__c','Output Pressure'],
    ['Cylinder_Pressure__c','Cylinder Pressure'],
    ['Regulator_Gauges__c','Regulator Gauges'],
    ['CO_2_Leakage__c','Leakage'],
    ['Regulator_Wrench__c','Regulator Wrench'],
    ['Washer__c','Washer'],
    ['Safely_placement__c','Safely Placement'],
    ['O_Ring__c','O-Ring'],
    ['Water_Changed__c','Water Changed'],
    ['Condensor_Cleaned__c','Condensor Cleaned'],
    ['Beer_Coil_Cleaned__c','Beer Coil Cleaned'],
    ['Clloing_Coils_Cleaned__c','Cooling Coils Cleaned'],
    ['Compressor_Cleaned__c','Compressor Cleaned']
]);


initailizeSanitization = () =>{
    creatFlashChiller();
    createCo2Section();  

    
    let tmp = '';
    if(typeValue === 'PM'){
        let date = new Date(utility.event.Draft_Installation__r.Recent_Preventive_Maintenance_Date__c).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            });
    
        tmp =`
        <div class="form-group">    
            <lable style="width:50%;display:inline-block">Last PM Date</lable>
            <input class="form-control" style="width:48%;display:inline-block" disabled type="text" value="${date}"/>
        </div>
        `;
    }else{
        
        let date = new Date(utility.event.Draft_Installation__r.Recent_Sanitization_Date__c).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            });
        tmp =`
        <div class="form-group">    
            <lable style="width:50%;display:inline-block">Last Sanitization Date</lable>
            <input class="form-control" style="width:48%;display:inline-block" disabled type="text" value="${date}"/>
        </div>
        `;
    }

    $('#last-date').append(tmp);
}


const creatFlashChiller = () =>{
    let field = [];
    if(typeValue === 'PM')
    {
        field = ['Chiller_body_cleaned__c','Tower_cleaned__c','Compressor_Cleaned__c','Condensor_Cleaned__c','Beer_Coil_Cleaned__c','Clloing_Coils_Cleaned__c','Water_Changed__c','Sanitized_with_hot_water__c','Check_thermostat_setting__c',
                'Re_circulation_Pump__c','Fan_motor__c','Concendsor_condition__c','Compressor_gas__c',
                'Compressor_head_pressure__c','Chiller_Water_Quantity__c','Chiller_Water_levels__c','Ice_bank_formation__c'];
    }else{
        field = ['Chiller_body_cleaned__c','Tower_cleaned__c','Sanitized_with_hot_water__c','Check_thermostat_setting__c',
                'Re_circulation_Pump__c','Fan_motor__c','Concendsor_condition__c','Compressor_gas__c',
                'Compressor_head_pressure__c','Chiller_Water_Quantity__c','Chiller_Water_levels__c','Ice_bank_formation__c'];
    
    }
    
    
    let tmp = '';
    $('#flashChiller').html('');
    
    for(let i of field){
        if(i === 'Chiller_body_cleaned__c' || i === 'Tower_cleaned__c' 
            || i === 'Concendsor_condition__c' || i === 'Chiller_Water_Quantity__c'
            || i === 'Chiller_Water_levels__c' || i === 'Condensor_Cleaned__c' || i === 'Beer_Coil_Cleaned__c'
            || i === 'Clloing_Coils_Cleaned__c' || i === 'Compressor_Cleaned__c'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-8"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4">${createRating(`${i}`,draftSanitization[i] ?draftSanitization[i] : '1',isReadOnly)}</div>
                    </div>
                `;
            }else{
                tmp +=`
                    <div class="row">
                        <div class="col-xs-8"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4 right-margin-2">${createToggleField(`${i}`,draftSanitization[i] ?draftSanitization[i] : false,isReadOnly)}</div>
                    </div>
                `;
            }
        
    }


    $('#flashChiller').append(tmp);
}


const createCo2Section = () =>{
    let tmp = '';
    let fields = ['Output_Pressure__c','Cylinder_Pressure__c','Regulator_Gauges__c','CO_2_Leakage__c','Regulator_Wrench__c','Washer__c','Safely_placement__c','O_Ring__c'];
    $('#co2').html('');

    for(let i of fields){
        tmp +=`
                <div class="row">
                    <div class="col-xs-8"><label>${fieldMap.get(i)}</label></div>
                    <div class="col-xs-4">${createToggleField(i,draftSanitization[i] ?draftSanitization[i] : false,isReadOnly)}</div>
                </div>
            `;
    }
    $('#co2').append(tmp);
    
}

const createRating = (id,rating,disabled) =>{
    let tmp = `
        
        <div class="rating" id=${id}>
            <input type="radio" id="field1_star-3" ${disabled ? 'disabled' : ''} name="rating" value="3" />
            <label class = "full ${parseFloat(rating)>2 ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-3" for="field1_star-3" onclick="handleRating(this)"></label>
            <input type="radio" id="field1_star-2" ${disabled ? 'disabled' : ''} name="rating" value="2" />
            <label class = "full ${parseFloat(rating)>1 ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-2" for="field1_star-2" onclick="handleRating(this)"></label>
            <input type="radio" id="field1_star-1" ${disabled ? 'disabled' : ''} name="rating" value="1" />
            <label class = "full ${parseFloat(rating)>0 ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-1" for="field1_star-1" onclick="handleRating(this)"></label>
        </div>
    `;

    return tmp;
};


const handleRadioBtn = (ele) =>{
    const id = $(ele).attr('id').split('-')[0];
    const value = $(ele).val();
    draftSanitization[id] = value;
    
};


const createToggleField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" ${disabled ? 'disabled' : ''} id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};



const handleRating = (ele) =>{
    let index = $(ele).attr('for').split('-')[1];
    $(ele).parent().find('label').removeClass('rate');
    draftSanitization[$(ele).closest('div').attr('id')]=index;
    for(let i = 1;i<=parseInt(index); i++){
        $(ele).parent().find(`[data-id = star-${i}]`).addClass('rate')
    }
    
};
const checkBoxChangeHandler = (ele) => {
    const id = $(ele).attr('id');
    const checked = $(ele).prop('checked');
    draftSanitization[id] = checked;
    
};
