let fieldMap = new Map([
    ['Equipment_in_working_condition_after__c','Equipment in working condition'],
    ['Tower_visibility_condition_after__c','Tower visibility condition'],
    ['Equipment_in_Original_position_after__c','Equipment in Original position'],
    ['All_Assets_in_Good_Condition_after__c','Assets Condition'],
    ['Is_Bira91_TapHandle_in_goodcondton_after__c','Bira91 Tap Handle Condition'],
    ['Is_Medallion_in_after__c','Medallion Condition'],
    ['Beer_pouring_happening_properly_after__c','Proper Beer Pouring'],
    ['LED_Sign_Tower_being_lit_after__c','LED Sign/ Tower being lit?'],
    ['Machine_Exterior_clean_or_not_after__c','Machine Exterior Cleanliness'],
    ['Beer_cold_or_not_after__c','Beer Coolness'],
    ['Brand_Freshness_and_Taste_after__c','Brand Freshness and Taste'],
    ['Leakage_after__c','Leakage'],
    ['Is_Pitcher_in_stock_after__c','Pitcher'],
    ['Is_Barmat_in_stock_after__c','Barmat'],
    ['Are_Glasses_in_stock_after__c','Glasses'],
    ['Signage_in_stock_after__c','Signage'],
    ['Is_Sanitization_required_after__c','Is Sanitization required ?'],
    ['Need_Replacement_of_any_item__c','Need Replacement of any item?']
]);

initailizeSanitization = () =>{
    creatEquipmentCondition(); 

    
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

const creatEquipmentCondition = () =>{
    let field = [];

    if(typeValue === 'PM')
    {
        field = ['Is_Medallion_in_after__c','Beer_pouring_happening_properly_after__c','LED_Sign_Tower_being_lit_after__c',
        'Machine_Exterior_clean_or_not_after__c','Beer_cold_or_not_after__c','Brand_Freshness_and_Taste_after__c','Leakage_after__c','Need_Replacement_of_any_item__c'];
    
    }else{
        field = ['Equipment_in_working_condition_after__c','Tower_visibility_condition_after__c','All_Assets_in_Good_Condition_after__c',
                'Is_Bira91_TapHandle_in_goodcondton_after__c','Is_Medallion_in_after__c','Beer_pouring_happening_properly_after__c',
            'LED_Sign_Tower_being_lit_after__c','Machine_Exterior_clean_or_not_after__c','Beer_cold_or_not_after__c','Brand_Freshness_and_Taste_after__c','Leakage_after__c','Need_Replacement_of_any_item__c'];
    
    }
   
    let tmp = '';
    $('#equipCondition').html('');
    
    for(let i of field){
        if(i === 'Equipment_in_working_condition_after__c' || i === 'Tower_visibility_condition_after__c' 
            || i === 'Is_Bira91_TapHandle_in_goodcondton_after__c' || i === 'Is_Medallion_in_after__c'
            || i === 'Machine_Exterior_clean_or_not_after__c' || i === 'All_Assets_in_Good_Condition_after__c'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4">${createRating(`${i}`,draftSanitization[`${i}`] ?draftSanitization[`${i}`] : '1' ,isReadOnly)}</div>
                        <div class="col-xs-3 top-margin">${createImageCapture(`${i}`,draftSanitization[`${i}_File`] ?draftSanitization[`${i}_File`] : null ,isReadOnly)}</div>
                    </div>
                `;
            }else if(i === 'Equipment_in_Original_position_after__c' || i === 'Leakage_after__c' || i === 'Need_Replacement_of_any_item__c'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-7 right-margin">${createToggleField(`${i}`,draftSanitization[i] ?draftSanitization[i] : false ,isReadOnly)}</div>
                    </div>
                `;
            }else if(i === 'Beer_cold_or_not_after__c' || i === 'Brand_Freshness_and_Taste_after__c' || i === 'Beer_pouring_happening_properly_after__c'){
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-7">${createRating(`${i}`,draftSanitization[i] ? draftSanitization[i] : '1',isReadOnly)}</div>
                    </div>
                `;
            }else{
                tmp +=`
                    <div class="row">
                        <div class="col-xs-5"><label>${fieldMap.get(i)}</label></div>
                        <div class="col-xs-4 top-margin">${createToggleField(`${i}`,draftSanitization[i] ?draftSanitization[i] : false ,isReadOnly)}</div>
                        <div class="col-xs-3 top-margin">${createImageCapture(`${i}`,draftSanitization[`${i}_File`] ?draftSanitization[`${i}_File`] : null ,isReadOnly)}</div>
                    </div>
                `;
            }
        
    }


    $('#equipCondition').append(tmp);
}


const createSalesVisibility = () =>{
    let tmp = '';
    let fields = ['Is_Pitcher_in_stock_after__c','Is_Barmat_in_stock_after__c','Are_Glasses_in_stock_after__c','Signage_in_stock_after__c','Is_Sanitization_required_after__c'];
    $('#salesVisibility').html('');

    for(let i of fields){
        if(i !== 'Is_Sanitization_required_after__c'){
            tmp +=`
                <div class="row">
                    <div class="col-xs-6">${fieldMap.get(i)}</div>
                    <div class="col-xs-3 top-margin">${createToggleField(i,draftSanitization[i] ?draftSanitization[i] : false )}</div>
                    <div class="col-xs-3">${createImageCapture(i,draftSanitization[`${i}_File`] ?draftSanitization[`${i}_File`] : null )}</div>
                </div>
            `;
        }else{
            tmp +=`
                <div class="row">
                    <div class="col-xs-6">${fieldMap.get(i)}</div>
                    <div class="col-xs-6">${createRadioField(i,draftSanitization[i] ?draftSanitization[i] : false )}</div>
                </div>
            `;
        }
    }
    $('#salesVisibility').append(tmp);
}

const createRating = (id,rating, disabled) =>{
    let tmp = `
        
        <div class="rating" id=${id}>
            <input type="radio" ${disabled ? 'disabled' : ''} id="field1_star-3" name="rating" value="3" />
            <label class = "full ${parseFloat(rating)>2 ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-3" for="field1_star-3" onclick="handleRating(this)"></label>
            <input type="radio" ${disabled ? 'disabled' : ''} id="field1_star-2" name="rating" value="2" />
            <label class = "full ${parseFloat(rating)>1 ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-2" for="field1_star-2" onclick="handleRating(this)"></label>
            <input type="radio" ${disabled ? 'disabled' : ''} id="field1_star-1" name="rating" value="1" />
            <label class = "full ${parseFloat(rating)>0 ? 'rate' : ''}" style="pointer-events : ${disabled ? 'none' : ''}" data-id="star-1" for="field1_star-1" onclick="handleRating(this)"></label>
        </div>
    `;

    return tmp;
};



const createRadioField = (id,value,disabled) =>{
    let tmp = `
            <div class="radio-group">
                <input type="radio" ${disabled ? 'disabled' : ''} onchange="handleRadioBtn(this)" id="${id}-yes" ${value === 'Yes' ? 'checked' : ''} value="Yes" name="${id}">
                <label for="${id}-yes">Yes</label>
                <input type="radio" ${disabled ? 'disabled' : ''} onchange="handleRadioBtn(this)" id="${id}-no" ${value === 'No' ? 'checked' : ''} value="No" name="${id}">
                <label for="${id}-no">No</label>
            </div>    
    `;

    return tmp;
}


const handleRadioBtn = (ele) =>{
    const id = $(ele).attr('id').split('-')[0];
    const value = $(ele).val();
    draftSanitization[id] = value;
    
}

const createToggleField = (id,value,disabled) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" ${disabled ? 'disabled' : ''} id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round" style="${id == 'Equipment_in_Original_position_after__c' || id == 'Leakage_after__c' || id == 'Need_Replacement_of_any_item__c' ? 'left:95px': ''}"></span>
        </label>
        `;
    
    return tmp;
};




const createImageCapture = (id,value,disabled) =>{

    let tmp = '';

        tmp = `
        <div class="image-upload_NoInput form-group" >
            <div class="camera">
                <label for="${id}_File">
                    <i class="fa fa-camera ${id}_File" ${value ? 'style=color:#5cb85c' : ''} aria-hidden="true"></i>                                    
                </label>
                <input id="${id}_File" ${disabled ? 'disabled' : ''} onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div> `;
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




const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


  const fileInput = async (event) => {
    const key = event.id;
    const fileInput = event.files[0];
    var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    const compressedFile = await imageCompression(fileInput, options);
    uploadBase64Value(key, compressedFile);
    
  };
  
  const uploadBase64Value = async (key, fileInput) => {
    draftSanitization[key] =  await toBase64(fileInput);
    draftSanitization[key+'_Name'] = fieldMap.has(key.replace('_File','')) ?fieldMap.get(key.replace('_File','')) : 'No Name Found!' ;
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
  };