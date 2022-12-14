const mapOfTieUpFieldLabel = new Map([
    ['Kingfisher','Kingfisher'],
    ['Number_of_Machines','Number of Machines'],
    ['Number_of_Taps','Number of Taps'],
    ['Menu_File','Menu'],
    ['Serviceware','Serviceware'],
    ['Signage','Signage'],
    ['Front_Facade','Front Facade'],
    ['Customized_Branding','Customised Branding'],
    ['Promotion','Promotion'],
    ['Budweiser','Budweiser'],
    ['Carlsberg','Carlsberg'],
    ['Craft','Craft']
]);

let fieldName = ['Kingfisher','Budweiser','Carlsberg','Craft'];
const productTieUp = new Map([
    ['Kingfisher',['Number_of_Machines','Number_of_Taps','Menu_File','Serviceware','Signage','Front_Facade','Customized_Branding','Promotion']],
    ['Budweiser',['Number_of_Machines','Number_of_Taps','Menu_File','Serviceware','Signage','Front_Facade','Customized_Branding','Promotion']],
    ['Carlsberg',['Number_of_Machines','Number_of_Taps','Menu_File','Serviceware','Signage','Front_Facade','Customized_Branding','Promotion']],
    ['Craft',['Number_of_Machines','Number_of_Taps','Menu_File','Serviceware','Signage','Front_Facade','Customized_Branding','Promotion']]
]);
let selectOptions = new Map([
    ['Number_of_Machines',['1','2','3','4','5','6']],
    ['Number_of_Taps',['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']],
]);

initializedDraftTieUp = () =>{
    

    let tmp = '';
    
    for(let i=0;i<fieldName.length; i++)
    {
        if(fieldName[i] === 'Craft' || fieldName[i] === 'Carlsberg' || fieldName[i] === 'Budweiser' || fieldName[i] === 'Kingfisher')
        {
            tmp +=`
            <div class="row">
                <div class="col-xs-6">
                <label>${mapOfTieUpFieldLabel.get(fieldName[i])}</label>
                </div>
                <div class="col-xs-6">
                    ${createToggleField(`${i}-${fieldName[i]}`,Competitor_Tie_up_Draft[i]&&Competitor_Tie_up_Draft[i][fieldName[i]] ?Competitor_Tie_up_Draft[i][fieldName[i]] : false )}
                </div></div>
                <div class="row ${fieldName[i]}" style="display : none;margin: 0px; border: 1px solid #ccc;padding:5px;border-radius:5px">
                <div class="col-xs-12">
                `;
                for(let j of productTieUp.get(fieldName[i]))
                {
                    if(j === 'Serviceware' || j === 'Signage' || j === 'Front_Facade' || j === 'Customized_Branding' || j === 'Promotion')
                    {
                        tmp +=`
                        <div class="row">
                            <div class="col-xs-6">
                            <label>${mapOfTieUpFieldLabel.get(j)}</label>
                            </div>
                            <div class="col-xs-6">
                                ${createRadioField(`${i}-${j}`,Competitor_Tie_up_Draft[i][j]? 'Yes' : 'No')}
                            </div>
                        </div>
                        `;
                    }else if(j === 'Number_of_Machines' || j === 'Number_of_Taps')
                    {
                        tmp +=`
                        <div class="row">
                            <div class="col-xs-6">
                                <label>${mapOfTieUpFieldLabel.get(j)}</label>
                            </div>
                            <div class="col-xs-6">
                                ${createSelectOption(`${i}-${j}`,Competitor_Tie_up_Draft[i][j]? Competitor_Tie_up_Draft[i][j] : null,selectOptions.get(j))}
                            </div>
                        </div>
                        `;
                    }else{
                        tmp +=`
                        <div class="row">
                            <div class="col-xs-6">
                            <label>${mapOfTieUpFieldLabel.get(j)}</label>
                            </div>
                            <div class="col-xs-6">
                                ${createImageCapture(`${i}-${j}`,Competitor_Tie_up_Draft[i][j] ? Competitor_Tie_up_Draft[i][j] : null)}
                            </div>
                        </div>
                        `;
                    }
                }
                
                
            tmp += `</div></div>`;
        }
    }

    $('#draft-tieUp').append(tmp);
    for(let i=0;i<fieldName.length;i++){
        if(Competitor_Tie_up_Draft[i][fieldName[i]]){
            $(`.${fieldName[i]}`).css('display','block');
        }
    }
}

const createRadioField = (id,value) =>{
    let tmp = `
            <div class="radio-group">
                <input type="radio" onchange="handleRadioBtn(this)" id="${id}-yes" ${value === 'Yes' ? 'checked' : ''} value="Yes" name="${id}">
                <label for="${id}-yes">Yes</label>
                <input type="radio" onchange="handleRadioBtn(this)" id="${id}-no" ${value === 'No' ? 'checked' : ''} value="No" name="${id}">
                <label for="${id}-no">No</label>
            </div>    
    `;

    return tmp;
}

const createToggleField = (id,value) =>{

    let tmp = '';
        tmp = `
        <label class="switch">
            <input type="checkbox" id="${id}" ${value ? 'checked' : ''}  onchange="checkBoxChangeHandler(this)">
            <span class="slider round"></span>
        </label>
        `;
    
    return tmp;
};




const createImageCapture = (id,value) =>{

    let tmp = '';
    console.log(value);
        tmp = `
        <div class="image-upload_NoInput form-group" >
            <div class="camera">
                <label for="${id}">
                    <i class="fa fa-camera ${id}" ${value ? "style=color:#5cb85c" : '' }  aria-hidden="true"></i>                                    
                </label>
                <input id="${id}" onchange="fileInput(this)" capture="camera" accept="image/*" type="file"/>
            </div>
        </div> `;
    return tmp;
};

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

const checkBoxChangeHandler = (ele) =>{
    let id = $(ele).attr('id');
    let competitorName = id.split('-')[1];
    let index = id.split('-')[0];
    let value = $(ele).prop('checked');
    
    Competitor_Tie_up_Draft[index][competitorName] = value;
    if(value){
        $(`.${competitorName}`).css('display','block');
    }
    else{
        $(`.${competitorName}`).css('display','none');
    }
};

const handleSelectOption = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).val();
    let fieldName = id.split('-')[1];
    let index = id.split('-')[0];
    Competitor_Tie_up_Draft[index][fieldName] = value;
}

const handleRadioBtn = (ele) =>{
    let id = $(ele).attr('id');
    let value = $(ele).val();
    let fieldName = id.split('-')[1];
    let index = id.split('-')[0];
    Competitor_Tie_up_Draft[index][fieldName] =value === 'Yes' ?true : false ;
}


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
    let fieldName = key.split('-')[1];
    let index = key.split('-')[0];
    Competitor_Tie_up_Draft[index][fieldName] =  await toBase64(fileInput);
    fileAttachedBackgroundChange(key);
  };
  
  const fileAttachedBackgroundChange = (key) => {
    let iconKey = key;
  
    //    let icon = document.querySelector(`#${iconKey}`);
    let icon = $('.' + iconKey);
  
    icon.css('color', '#5cb85c');
  };
