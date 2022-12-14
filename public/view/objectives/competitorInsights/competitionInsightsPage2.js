


const competitorLableChange = new Map([
  ['UB','UB'],
  ['ABI','ABI'],
  ['Carlsberg','Carlsberg'],
  ['Craft','Craft'],
]);
const formRender = (channel) => {
    let tmp = '';
    
    for(let i = 0;i<competitorVisibility.length;i++){
       
       // tmp += `<div class="col-xs-6" style="color:#ed2228">Competitor Name</div>`;
       if(i<3||i>3){
         if(i>3){
          tmp += '<div class="row competitor-section '+competitorVisibility[i].Competitor_Name+'" style="display:none;">';
         }
        else{
          tmp += '<div class="row competitor-section '+competitorVisibility[i].Competitor_Name+'" >';
        }
        tmp += `<div class="col-xs-6" style="color:#ed2228;font-size:16px"><b>${(competitorLableChange.has(competitorVisibility[i].Competitor_Name) ?competitorLableChange.get(competitorVisibility[i].Competitor_Name) :competitorVisibility[i].Competitor_Name)}</b></div>`;
        tmp += `<div class="col-xs-6">${createCheckBox(`${i}-show_panel`,'',"checkboxChangeHandler(this)",competitorVisibility[i][`show_panel`]?competitorVisibility[i][`show_panel`] : false )}</div>`;
        if(channel==='On-Premise'){
            if(competitorVisibility[i].show_panel){
                tmp += `<div class="col-xs-12 ${i}-show_panel">`;
            }
            else{
                tmp += `<div class="col-xs-12 ${i}-show_panel" style="display:none;">`;
            }
            tmp +=  onPrem(i);
            tmp += '</div>';
        }
        else{
            if(competitorVisibility[i].show_panel){
                tmp += `<div class="col-xs-12 ${i}-show_panel">`;
            }
            else{
                tmp += `<div class="col-xs-12 ${i}-show_panel" style="display:none;">`;
            }
            tmp +=  offPrem(i);
            tmp += '</div>';
        }
        tmp += '</div>';
       }
       else{
        tmp += '<div class="row competitor-section '+competitorVisibility[i].Competitor_Name+'" >';
        tmp += `<div class="col-xs-6" style="color:#ed2228;font-size:16px"><b>${(competitorLableChange.has(competitorVisibility[i].Competitor_Name) ?competitorLableChange.get(competitorVisibility[i].Competitor_Name) :competitorVisibility[i].Competitor_Name)}</b></div>`;
        tmp += `<div class="col-xs-6">${createCheckBox(`${i}-show_panel`,'',"checkboxChangeHandler(this)",competitorVisibility[i][`show_panel`]?competitorVisibility[i][`show_panel`] : false )}</div>`;
        tmp += '</div>';
        tmp += '</div>';
       }
        
    }
    
    $('#competitorVisibility').append(tmp);
    isCraftEnabled(competitorVisibility[3].show_panel);
};
const isCraftEnabled = (value) => {
  let index = "3";
  if(value){
    for(let i =4;i<competitorBuckets.length;i++){
      $(`.${competitorBuckets[i].split(" ")[0]}`).css({'display': 'block','margin-left': '0px'});
      $(`.${competitorBuckets[i].split(" ")[0]}`).find('.form-group').css('margin-left','0px');
      // $(`.${i}-show_option_panel`).css('display', 'block');
    }
    competitorVisibility[index]['show_panel'] = value;
  }
  else{
    for(let i =4;i<competitorBuckets.length;i++){
      $(`.${competitorBuckets[i].split(" ")[0]}`).css('display', 'none');
      // $(`.${i}-show_option_panel`).css('display', 'none');
    }
    competitorVisibility[index]['show_panel'] = value;
  }
};







const checkboxChangeHandler = (event) => {
    const id = $(event).attr('id');
    const value = $(event).prop('checked');
    const index = id.split('-')[0];
    const key = id.split('-')[1];
    if(index!=='3'){
      competitorVisibility[index][key] = value;
      if(value){
          
          $(`.${id}`).css('display','block');
      }
      else{
          $(`.${id}`).css('display','none');
      }
    }
    else{
      isCraftEnabled(value);
    }
    
};
const numberChangeHandler = (event) => {
    const value = $(event).prop("value");
    const key = $(event).attr("id").split('-')[1];
    const index = $(event).attr("id").split('-')[0];
    competitorVisibility[index][key] = value;
    
};
const onPrem = (index) => {
  let tmp ='';
  
  tmp += '<div class="row">'
  tmp += '<div class="col-xs-6" style="padding-top:3%">';
  tmp += 'Front Facade';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Front_Facade','','handleCheckboxChange(this)',(competitorVisibility[index].Front_Facade ? competitorVisibility[index].Front_Facade : false));
  tmp += '</div>';
  if(competitorVisibility[index].Front_Facade){
    tmp += '<div class="col-xs-2">';
    tmp += `<div class="${index}-Front_Facade" style="margin-top:-4px;">
  ${createImgInput((index+'-Front_Facade_File'),'',(competitorVisibility[index].Front_Facade_File ? competitorVisibility[index].Front_Facade_File : null) ,"fileInput(this)",true)}
  </div>`;
  tmp += '</div>';
  }
  else{
    tmp += '<div class="col-xs-2">';
    tmp += `<div class="${index}-Front_Facade" style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-Front_Facade_File'),'',(competitorVisibility[index].Front_Facade_File ? competitorVisibility[index].Front_Facade_File : null) ,"fileInput(this)",true)}
  </div>`;
  tmp += '</div>';
  }
  tmp += '</div>';
  tmp += '<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%">';
  tmp += 'Led Signage';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Led_Signage','','handleCheckboxChange(this)',(competitorVisibility[index].Led_Signage ? competitorVisibility[index].Led_Signage : false));
  tmp += '</div>';
  if(competitorVisibility[index].Led_Signage){
    
    tmp += `<div class="col-xs-2" ><div class="${index}-Led_Signage"  style="margin-top:-4px;">
  ${createImgInput((index+'-Led_Signage_File'),'',(competitorVisibility[index].Led_Signage_File ? competitorVisibility[index].Led_Signage_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2" ><div class="${index}-Led_Signage"  style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-Led_Signage_File'),'',(competitorVisibility[index].Led_Signage_File ? competitorVisibility[index].Led_Signage_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  tmp += '</div>';
  tmp += '<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%" >';
  tmp += 'Draft';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Draft','','handleCheckboxChange(this)',(competitorVisibility[index].Draft ? competitorVisibility[index].Draft : false));
  tmp += '</div>';
  if(competitorVisibility[index].Draft){
    tmp += `<div class="col-xs-2"><div class="${index}-Draft" style="margin-top:-4px;">
    ${createImgInput((index+'-Draft_File'),'',(competitorVisibility[index].Draft_File ? competitorVisibility[index].Draft_File : null) ,"fileInput(this)",true)}
    </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2"><div class="${index}-Draft" style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-Draft_File'),'',(competitorVisibility[index].Draft_File ? competitorVisibility[index].Draft_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  tmp += '</div>';

  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%" >';
  tmp += 'Customized Branding';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Customized_Branding','','handleCheckboxChange(this)',(competitorVisibility[index].Customized_Branding ? competitorVisibility[index].Customized_Branding : false));
  tmp += '</div>';
  if(competitorVisibility[index].Customized_Branding){
    tmp += `<div class="col-xs-2" ><div class="${index}-Customized_Branding" style="margin-top:-4px;">
  ${createImgInput((index+'-Customized_Branding_File'),'',(competitorVisibility[index].Customized_Branding_File ? competitorVisibility[index].Customized_Branding_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2"> <div class="${index}-Customized_Branding" style="margin-top:-4px;display:none;">
    ${createImgInput((index+'-Customized_Branding_File'),'',(competitorVisibility[index].Customized_Branding_File ? competitorVisibility[index].Customized_Branding_File : null) ,"fileInput(this)",true)}
    </div></div>`;
  }
  tmp +='</div>';
  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%" >';
  tmp += 'Menu Listing';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Menu_Listing','','handleCheckboxChange(this)',(competitorVisibility[index].Menu_Listing ? competitorVisibility[index].Menu_Listing : false));
  tmp += '</div>';
  if(competitorVisibility[index].Menu_Listing){
    tmp += `<div class="col-xs-2" > <div class="${index}-Menu_Listing"  style="margin-top:-4px;">
  ${createImgInput((index+'-Menu_Listing_File'),'',(competitorVisibility[index].Menu_Listing_File ? competitorVisibility[index].Menu_Listing_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2" > <div class="${index}-Menu_Listing"  style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-Menu_Listing_File'),'',(competitorVisibility[index].Menu_Listing_File ? competitorVisibility[index].Menu_Listing_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  tmp+= '</div>';

  return tmp;
};


const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const fileInput = async (event) => {

  const key = $(event).attr('id').split('-')[1];
  const index = $(event).attr('id').split('-')[0];
  const fileInput = $(event).prop('files')[0];
  
  var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    
  const compressedFile = await imageCompression(fileInput, options);
  uploadBase64Value(index,key,compressedFile);    
};

const uploadBase64Value = async (index,key,fileInput) => {
  competitorVisibility[index][key] = await toBase64(fileInput);
  console.log(competitorVisibility);
  fileAttachedBackgroundChange(index,key);
};

const fileAttachedBackgroundChange = (index,key) => {
  let iconKey = key;
  let icon = $('.'+index+'-'+iconKey);
  icon.css('color','#5cb85c');
};

const radioGroupHandler = (ele) => {
    
    const name = $(ele).attr('name');
    const key =  $(ele).attr('id').split('-')[1];
    const arrRadio = radioOptions.get('offprem');
    console.log(key);
    arrRadio.forEach(ele => {
        if(key!==ele){
            competitorVisibility[name][ele] = false;
        }
        else{
            competitorVisibility[name][ele] = true;
        }
    });
    console.log(competitorVisibility);
    
    
};
const handleCheckboxChange = (event) => {
    const key =  $(event).attr('id').split('-')[1];
    const index = $(event).attr('id').split('-')[0];
    const value = $(event).prop('checked');
    competitorVisibility[index][key] = $(event).prop('checked');
    if(value){
      $(`.${index}-${key}`).css('display','block');
    }
    else{
      $(`.${index}-${key}`).css('display','none');
    }
};
const radioOptions  = new Map([
    ['offprem',['Front_Facade','Indoor_Shelf','Outdoor_Window','Cooler']],
]);
const offPrem = (index) => {
  let tmp ='';
  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" >';
  tmp += 'Front Facade';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Front_Facade','','handleCheckboxChange(this)',(competitorVisibility[index].Front_Facade ? competitorVisibility[index].Front_Facade : false));
  tmp += '</div>';
  if(competitorVisibility[index].Front_Facade){
    tmp += '<div class="col-xs-2">';
    tmp += `<div class="${index}-Front_Facade" style="margin-top:-4px;">
  ${createImgInput((index+'-Front_Facade_File'),'',(competitorVisibility[index].Front_Facade_File ? competitorVisibility[index].Front_Facade_File : null) ,"fileInput(this)",true)}
  </div>`;
  tmp += '</div>';
  }
  else{
    tmp += '<div class="col-xs-2">';
    tmp += `<div class="${index}-Front_Facade" style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-Front_Facade_File'),'',(competitorVisibility[index].Front_Facade_File ? competitorVisibility[index].Front_Facade_File : null) ,"fileInput(this)",true)}
  </div>`;
  tmp += '</div>';
  }
  tmp += '</div>';
  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" >';
  tmp += 'Led Signage';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Led_Signage','','handleCheckboxChange(this)',(competitorVisibility[index].Led_Signage ? competitorVisibility[index].Led_Signage : false));
  tmp += '</div>';
  if(competitorVisibility[index].Led_Signage){
      
    tmp += `<div class="col-xs-2" ><div class="${index}-Led_Signage"  style="margin-top:-4px;">
  ${createImgInput((index+'-Led_Signage_File'),'',(competitorVisibility[index].Led_Signage_File ? competitorVisibility[index].Led_Signage_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2" ><div class="${index}-Led_Signage"  style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-Led_Signage_File'),'',(competitorVisibility[index].Led_Signage_File ? competitorVisibility[index].Led_Signage_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  tmp += '</div>';
  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%" >';
  tmp += 'VisiCooler';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-VisiCooler','','handleCheckboxChange(this)',(competitorVisibility[index].VisiCooler ? competitorVisibility[index].VisiCooler : false));
  tmp += '</div>';
  if(competitorVisibility[index].VisiCooler){
    tmp += `<div class="col-xs-2"><div class="${index}-VisiCooler" style="margin-top:-4px;">
    ${createImgInput((index+'-VisiCooler_File'),'',(competitorVisibility[index].VisiCooler_File ? competitorVisibility[index].VisiCooler_File : null) ,"fileInput(this)",true)}
    </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2"><div class="${index}-VisiCooler" style="margin-top:-4px;display:none;">
  ${createImgInput((index+'-VisiCooler_File'),'',(competitorVisibility[index].VisiCooler_File ? competitorVisibility[index].VisiCooler_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  tmp +='</div>';
  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%" >';
  tmp += 'Indoor Shelf';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Indoor_Shelf','','handleCheckboxChange(this)',(competitorVisibility[index].Indoor_Shelf ? competitorVisibility[index].Indoor_Shelf : false));
  tmp += '</div>';
  if(competitorVisibility[index].Indoor_Shelf){
    tmp += `<div class="col-xs-2" ><div class="${index}-Indoor_Shelf" style="margin-top:-4px;">
  ${createImgInput((index+'-Indoor_Shelf_File'),'',(competitorVisibility[index].Indoor_Shelf_File ? competitorVisibility[index].Indoor_Shelf_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2"> <div class="${index}-Indoor_Shelf" style="margin-top:-4px;display:none;">
    ${createImgInput((index+'-Indoor_Shelf_File'),'',(competitorVisibility[index].Indoor_Shelf_File ? competitorVisibility[index].Indoor_Shelf_File : null) ,"fileInput(this)",true)}
    </div></div>`;
  }
  tmp += '</div>';
  tmp +='<div class="row">';
  tmp += '<div class="col-xs-6" style="padding-top:3%" >';
  tmp += 'Customized Branding';
  tmp += '</div>';
  tmp += '<div class="col-xs-4" style="margin-top:2%;">';
  tmp += createCheckBox(index+'-Customized_Branding','','handleCheckboxChange(this)',(competitorVisibility[index].Customized_Branding ? competitorVisibility[index].Customized_Branding : false));
  tmp += '</div>';
  if(competitorVisibility[index].Customized_Branding){
    tmp += `<div class="col-xs-2" ><div class="${index}-Customized_Branding" style="margin-top:-4px;">
  ${createImgInput((index+'-Customized_Branding_File'),'',(competitorVisibility[index].Customized_Branding_File ? competitorVisibility[index].Customized_Branding_File : null) ,"fileInput(this)",true)}
  </div></div>`;
  }
  else{
    tmp += `<div class="col-xs-2"> <div class="${index}-Customized_Branding" style="margin-top:-4px;display:none;">
    ${createImgInput((index+'-Customized_Branding_File'),'',(competitorVisibility[index].Customized_Branding_File ? competitorVisibility[index].Customized_Branding_File : null) ,"fileInput(this)",true)}
    </div></div>`;
  }
  tmp += '</div>';
  return tmp;
};
const notApplicable = () => {
    let tmp = '';
    tmp += '<div class="text-center alert alert-warning"> Competitor Visibility is not applicable for this account. Click Save & Next to proceed with Competitor Promotions ';
    $('#competitorVisibility').append(tmp);
    $('#visibilityDashboard').css('display','none');
};

const handleCompetitorSubmit = async() =>{
  let isValid = true;
  let promotionMap = new Map([
    ['On-Premise',['Front_Facade','Led_Signage','Draft','Customized_Branding','Menu_Listing']],
    ['Off-Premise',['Front_Facade','Led_Signage','VisiCooler','Indoor_Shelf','Customized_Branding']]
  ]);

  let channel = accountRec.Channel__c;
  let competitorName = '';

for(let i=0;i< competitorVisibility.length;i++)
{
  if(competitorVisibility[i]['show_panel'] && i != 3){
    let countFalseVal = 0;
    for(let j=0;j<promotionMap.get(channel).length;j++)
    {
      let visibilityVal = $(`#${i}-${promotionMap.get(channel)[j]}`).prop('checked');
      if(!visibilityVal){
        countFalseVal++
      }
    }
    if(countFalseVal === promotionMap.get(channel).length){
      isValid = false;
      competitorName += ' '+competitorVisibility[i]['Competitor_Name'];
    
      // break;
    }
  }else if(i=== 3 && competitorVisibility[i]['show_panel']){
    let j=1;
    let checkTrue = true;
    let comLength = competitorVisibility.length;
    
    while(checkTrue){
      if((i+j)< comLength)
      {
        if(competitorVisibility[i+j]['show_panel']){
          checkTrue = false;
          break;
        }
        j++;
      }else{
        break;
      }
    }

    if(checkTrue){
      isValid = false;
      competitorName += ' '+competitorVisibility[i]['Competitor_Name'];
    
      // break;
    }
  }
}

  if(isValid)
  {
    await handleSubmitForm();
  }else{
    $('#showAlertmsg').modal('show');
    showAlertmsg(`"Please  fill information related to${competitorName} !"`);
  }
}

handlePageRedirect = async (value) => {
  if(accountRec.Channel__c==='On-Premise'){
    competitorInsight.Visibility_On_Premise = competitorVisibility;
}
else{
    competitorInsight.Visibility_Off_Premise = competitorVisibility;
}
console.log(competitorVisibility);
await writeData('competitorInsight',competitorInsight);
    const recordTypeName = accountRec.RecordType.DeveloperName;
  
    if (recordTypeName === 'Distributor_Warehouse') {
      if(value==='Home'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + accountRec.Id;
      }
      else if(value==='Related'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=' + accountRec.Id;
      }
      else if(value==='Media'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=' + accountRec.Id;
      }
      else if(value==='Detail'){
        window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=' + accountRec.Id;
      }
      
  }
  else if (recordTypeName === 'Distributor') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=' + accountRec.Id;
    }
      
  }
  else if (recordTypeName === 'On_Premise_General') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=' + accountRec.Id;
    }
     
  }
  else if (recordTypeName === 'Consumer') {
    
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=' + accountRec.Id;
    }
     
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Institutional_Off_Premise') {
    
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=' + accountRec.Id;
    }
     
  }
  else if (recordTypeName === 'Institutional_On_Premise') {
    
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=' + accountRec.Id;
    }
     
  }
  else if (recordTypeName === 'Non_beer_Warehouse') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=' + accountRec.Id;
    }
      
  }
  else if (recordTypeName === 'Off_Premise_Outlet') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=' + accountRec.Id;
    }
     
  }
  else if (recordTypeName === 'On_Premise_Hotel') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=' + accountRec.Id;
    }
     
  }
  else if (recordTypeName === 'Supplier') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=' + accountRec.Id;
    }
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=' + accountRec.Id;
    }
     
  }
  else if (recordTypeName === 'Temporary_Event') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=' + accountRec.Id;
    }
    
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=' + accountRec.Id;
    } 
  }
  else if (recordTypeName === 'Wholesaler') {
    if(value==='Home'){
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + accountRec.Id;
    }
    else if(value==='Related'){
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=' + accountRec.Id;
    }
    else if(value==='Detail'){
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=' + accountRec.Id;
    }
    
    else if(value==='Media'){
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id=' + accountRec.Id;
    } 
     
  }
  else if (recordTypeName === 'Lead') {
    if (value === 'Home') {
      window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/leadDetail/leadDetailRelated.html?leadId=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/leadDetail/leadDetail.html?leadId=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/leadDetail/leadDetailMedia.html?leadId=' + accountRec.Id;
    }

  }
  };


  // Dashboard Code below
  slickSlider = () => {
    $('.competitorDashboard').slick({
        centerMode: true,
        slidesToShow: 2,
        autoplay: false,
        dots: true,
        infinite: false,
        arrows: false,
        adaptiveHeight: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1 
                }
      },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1
                }
      }
    ]
    });
  };
  

let dashboardVisibility = [
  
]; 


let mapOfElementLabels = new Map([
  ['Front_Facade', 'Front Facade'],
  ['Draft','Draft'],
  ['Led','LED Signage'],
  ['Customized_Branding','Customized Branding'],
  ['VisiCooler','Visi Cooler'],
  ['Indoor_Shelf','Indoor Shelf'],
  ['Menu_Listing','Menu Listing']
]);

let setOfCraftVal = new Set();

const createVisibilityDashboard = () =>{
  let tmp = '';
  $('#visibilityDashboard').html('');

  let tableHead = `
  <div class="item">
  <div class="table-outer">
  <table class="contractedVolume visibility" >
  <tr><td colspan="2" style="font-weight:700; font-size: 1.25em;color: red">Visibility Elements</td></tr>
  
  <tr>
    <th style="width:20%"></th>
    <th style="width:80%"></th>
  </tr>
  `;
tmp = tableHead;

  for(let i=0;i<dashboardVisibility.length;i++)
  {
    
      tmp +='<tr>';
      tmp +='<td class="contVolume">'+dashboardVisibility[i].Competitor_Name+'</td>';
      tmp +='<td class="values">';
      let countVisibility = false
      
      for(let j in dashboardVisibility[i])
      {
        if(dashboardVisibility[i][j] && mapOfElementLabels.has(j))
        {
          tmp+= mapOfElementLabels.get(j)+'<span> / </span>';
          countVisibility = true
        }
        // else{
        //   countVisibility++;
        // }
      }
      if(!countVisibility){
        tmp+= '-'
      } 
      tmp +='</td>';
      tmp +='</tr>';
    }
  

 

  tmp +='</table>';
  tmp +='</div>';
  tmp +='</div>';

  $('#visibilityDashboard').append(tmp);
  
slickSlider();
};

const showCraftData = () =>{
  let tmp = '';
  for(let i=4;i<dashboardVisibility.length;i++)
  {
    
    for(let j in dashboardVisibility[i])
      {
        if(dashboardVisibility[i][j] && mapOfElementLabels.has(j))
        {
          setOfCraftVal.add(j);
        }
      }
  }

  if(setOfCraftVal.size>0)
  {
    tmp +='<tr>';
    tmp +='<td class="contVolume">Craft</td>';
    tmp +='<td class="values">';
    setOfCraftVal.forEach(craft => {
      tmp += mapOfElementLabels.get(craft)+'<span> / </span>';
    });
    tmp +='</td>';
    tmp +='</tr>';
  }  
  
  return tmp;
}

