let promotionArray = [
  // {
  //   Competitor_Name :'UB',
  //   show_panel : true,'Gift_with_Purchase' : true,'Cashback' : false,'Sweepstakess' : true

  // },{
  //   Competitor_Name :'ABI',show_panel : false,'Gift_with_Purchase' : true,'Cashback' : false,'Sweepstakess' : true
  // },{
  //   Competitor_Name :'Carlsberg',show_panel : false
  // },{
  //   Competitor_Name :'Craft',show_panel : false
  // },{
  //   Competitor_Name :'White Owl',show_panel : false
  // },{
  //   Competitor_Name :'Simba',show_panel : false
  // }
];
// let displayConditionStr = 'Off-Premise'
let fieldLabelMap = new Map([
  ['Food_Combo','Food Combo'],
  ['Special_Price','Special Price'],
  ['Exclusive_Events','Exclusive Events'],
  ['Gift_with_Purchase','Gift with Purchase'],
  ['Cocktail_Led_Promotion','Cocktail Promotion'],
  ['Cashback','Cash Back'],
  ['Sweepstakess','Sweepstakess']
]);

let competitorNameNChannel = new Map([
  ['UB',['On-Premise','Off-Premise','QCO']],
  ['ABI',['On-Premise','Off-Premise','QCO']],
  ['Carlsberg',['On-Premise','Off-Premise','QCO']],
  ['White Owl',['On-Premise','Off-Premise','QCO']],
  ['Simba',['On-Premise','Off-Premise','QCO']],
  ['White Rhino',['On-Premise','Off-Premise','QCO']],
  ['Hopper',['On-Premise','Off-Premise','QCO']],
  ['Witlinger',['On-Premise','Off-Premise','QCO']],
  ['Others',['On-Premise','Off-Premise','QCO']]
]);

let channelNPromotion = new Map([
  ['On-Premise',['Food_Combo','Special_Price','Exclusive_Events','Gift_with_Purchase','Cocktail_Led_Promotion']],
  ['QCO',['Food_Combo','Special_Price','Exclusive_Events','Gift_with_Purchase','Cocktail_Led_Promotion']],
  ['Off-Premise',['Gift_with_Purchase','Cashback','Sweepstakess']]
]);

const createCompetitorPage = () =>{
  let competitorName = [];
  for(let i=0;i<promotionArray.length;i++)
  {
    competitorName.push(promotionArray[i].Competitor_Name);
  }
  let temp = '';

  for(let i of competitorName)
  {
    if(i){
      
    
    let rowId = competitorName.indexOf(i)+'-'+i.split(' ')[0];
    temp +=`
    <div class="media ${competitorName.indexOf(i) > 3 ?'Craft':''}">
      <div class="media-body">
        <h4 class="media-heading" style="display:inline-block;width:44%;font-weight:700;font-size: 16px;">${i}</h4>
        <label class="switch">
        <input type="checkbox" id="${rowId}" ${promotionArray[competitorName.indexOf(i)].show_panel ? 'checked' : ''}  onchange="showPromotionHandler(this)">
        <span class="slider round" style="margin-top: -2px;"></span>
    </label>
        `
        if(competitorNameNChannel.has(i))
        {
          
          for(let j of competitorNameNChannel.get(i))
          {
             for(let k of channelNPromotion.get(j))
             {
               if(displayConditionStr === j)
               {

                temp +=`
                    
                  <div class="row ${rowId} ${j}" style="margin-top:10px; ${promotionArray[competitorName.indexOf(i)].show_panel ? 'display:block' :''}">
                    <div class="col-xs-5" style="padding-top:8px">
                       ${fieldLabelMap.get(k)}
                    </div>
                    <div class="col-xs-4">
                        <label class="switch">
                            <input type="checkbox" ${promotionArray[competitorName.indexOf(i)][k] ? 'checked' : ''} id="${k}" class="${i}"
                                onchange="checkBoxChangeHandler(this)">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="col-xs-3" style="height:28px">
                        <div class="image-upload form-group ${i}-${k}" style="${promotionArray[competitorName.indexOf(i)][k] ?'display: block' : 'display :none'}">
                            <label for="${competitorName.indexOf(i)}-${k}_File">
                                <i class="fa fa-camera ${competitorName.indexOf(i)}-${k}_File"  style="${promotionArray[competitorName.indexOf(i)][`${k}_File`] ? 'color:#5cb85c' : ''}"  aria-hidden="true"></i>
                                
                            </label>
                            <input id="${competitorName.indexOf(i)}-${k}_File" lang="" value="${promotionArray[competitorName.indexOf(i)][`${k}_File`]}"  onchange="fileInput(this)"  capture="camera"   accept="image/*" type="file"/>
                        </div>
                    </div>
                  </div>
                `;
              }
             }
          }
        }
      
    temp +=`</div>
         </div>
     `;
     }
  }

  $('#InsightPanel').append(temp);

  if(promotionArray[3].show_panel){
    $(`.Craft`).css('display','block')
  }else{
    $(`.Craft`).css('display','none')
  }
  $(`.Craft`).css('margin-left','0');
}



checkBoxChangeHandler = (a) => {
    let competitorName = $(a).attr('class');
    
    let index = competitorBuckets.indexOf(competitorName);
    
    if (index !== -1) {
      promotionArray[index][$(a).attr('Id')] = $(a).prop('checked');
      
      const idValue = $(a).attr('Id');
      const value = $(a).prop('checked');
      
      const competitorValue = competitorBuckets[index].split(' ').length>1 ?competitorBuckets[index].split(' ')[1] :  competitorBuckets[index];
      
      if(value){
        $(`.${competitorValue}-${idValue}`).css('display','block');
      }
      else{
        $(`.${competitorValue}-${idValue}`).css('display','none');
      }
      
    }
    
};


showPromotionHandler = (ele) =>{
  let id = $(ele).attr('id');
  let index = id.split('-')[0];
  promotionArray[index].show_panel = $(ele).prop('checked');
  if($(ele).prop('checked'))
  {
    $(`.${id}.${displayConditionStr}`).css('display','block');
  }else{
    $(`.${id}.${displayConditionStr}`).css('display','none');
  }

  if($(ele).prop('checked') && id.split('-')[1] === 'Craft')
  {
    $(`.Craft`).css('display','block');
  }else if(!$(ele).prop('checked') && id.split('-')[1] === 'Craft'){
    $(`.Craft`).css('display','none');
  }
}

initializePromotionFrontEnd = (promotionArray) => {
  
  for (let i = 0; i < promotionArray.length; i++) {

    for (let j in promotionArray[i]) {

      if (typeof promotionArray[i][j] === "boolean") {
        //console.log(j);
        const tempArr  = promotionArray[i].Competitor_Name.split(' ');
        $('.' + (tempArr.length > 1 ? tempArr[1] :tempArr[0] )).each(function () {
          const key = $(this).attr("id");
          
          if (key === j) {
            $(this).prop('checked', promotionArray[i][j]);
          }
        });
        if(promotionArray[i][j]){
          $(`.${(tempArr.length > 1 ? tempArr[1] :tempArr[0] )}-${j}`).css('display','block');
        }
       
        
        //console.log($('.'+promotionArray[i].Competitor_Name).find('#'+j));
        //$('.'+promotionArray[i].Competitor_Name).find('#'+j).attr("checked",promotionArray[i][j]);
      }
      
      if(j.includes("File")){
        
        $(`.${i}-${j}`).css('color','#5cb85c');
      }

    }
  }

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
  promotionArray[index][key] = await toBase64(fileInput);
  
  fileAttachedBackgroundChange(index,key);
};

const fileAttachedBackgroundChange = (index,key) => {
  let iconKey = key;
  let icon = $('.'+index+'-'+iconKey );
  icon.css('color','#5cb85c');
};

showPromotions = (promotionsFor) => {
  if (promotionsFor === 'Not_Applicable') {
    $('#InsightPanel').html('');
    let tmp = '<div class="text-center alert alert-warning"> Competitor Visibility is not applicable for this account. Click Save & Next to proceed with Competitor Promotions ';
    $('#InsightPanel').html(tmp);
  }

};

handleSubmit = () =>{
  let isValid = true;
    // let errorString = '';

  let competitorName = '';
  for(let i=0;i< promotionArray.length;i++)
  {
    if(promotionArray[i]['show_panel'] && i != 3){
      let countFalseVal = 0;
      for(let j=0;j<channelNPromotion.get(displayConditionStr).length;j++)
      {
        if(!promotionArray[i]['Competitor_Name'].includes('White')){
        let visibilityVal = $(`.${promotionArray[i]['Competitor_Name']}#${channelNPromotion.get(displayConditionStr)[j]}`).prop('checked');
        if(!visibilityVal){
          countFalseVal++
        }
      }else{
        let visibilityVal = $(`.${promotionArray[i]['Competitor_Name'].split(' ')[1]}#${channelNPromotion.get(displayConditionStr)[j]}`).prop('checked');
        if(!visibilityVal){
          countFalseVal++
        }
      }
      }
      if(countFalseVal === channelNPromotion.get(displayConditionStr).length){
        isValid = false;
        competitorName += ' '+promotionArray[i]['Competitor_Name'];
      
        // break;
      }
    }else if(i=== 3 && promotionArray[i]['show_panel']){
      let j=1;
      let checkTrue = true;
      let comLength = promotionArray.length;
      
      while(checkTrue){
        if((i+j)< comLength)
        {
          if(promotionArray[i+j]['show_panel']){
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
        competitorName += ' '+promotionArray[i]['Competitor_Name'];
      
        // break;
      }
    }
  }
  
    if(!isValid)
    {
      $('#showAlertmsg').modal('show');
      showAlertmsg(`"Please  fill information related to${competitorName} !"`);
      return;
    }

    
    for(let i of promotionArray){
        for(let j in i){
            if(typeof i[j]  === 'boolean'&&i[j]&&j!=='show_panel'){
                if(!i[`${j}_File`]){
                    isValid = false;
                    break;
                    // errorString += j.replace('_'," ")+ ' attachment is missing! ';
                }
            }
        }
        if(!isValid){
            break;
        }
    }
    if(!isValid){
        $('#showAlertmsg').modal('show');
        showAlertmsg("Images are mandatory where elements are present! Press Toggle off if image is not available");
        return;
    }else{
      $('#competitorSubmit').modal('show');
    }
}


handlePageRedirect = async (value) => {
  if (accountRec.QCO_Flag__c) {
    competitorInsight.Promotions_QCO = promotionArray;
  }
  else if (accountRec.Channel__c === 'On-Premise') {
    competitorInsight.Promotions_On_Premise = promotionArray;
  }
  else if (accountRec.Channel__c === 'Off-Premise') {
    competitorInsight.Promotions_Off_Premise = promotionArray;
  }
  
  await writeData('competitorInsight', competitorInsight);
  const recordTypeName = accountRec.RecordType.DeveloperName;

  if (recordTypeName === 'Distributor_Warehouse') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Distributor') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'On_Premise_General') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Consumer') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Institutional_Off_Premise') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Institutional_On_Premise') {

    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Non_beer_Warehouse') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Off_Premise_Outlet') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'On_Premise_Hotel') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Supplier') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=' + accountRec.Id;
    }
    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=' + accountRec.Id;
    }

  }
  else if (recordTypeName === 'Temporary_Event') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=' + accountRec.Id;
    }
  }
  else if (recordTypeName === 'Wholesaler') {
    if (value === 'Home') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + accountRec.Id;
    }
    else if (value === 'Related') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=' + accountRec.Id;
    }
    else if (value === 'Detail') {
      window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=' + accountRec.Id;
    }

    else if (value === 'Media') {
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

// Dashboard Code Below

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


let dashboardPromotion = [
  
]; 


let mapOfElementLabels = new Map([
  ['Food_Combo', 'Food Combo'],
  ['Special_Price','Special Price'],
  ['Exclusive_Events','Exclusive Events'],
  ['Gift_with_Purchase','Gift with Purchase'],
  ['Cocktail_Led_Promotion','Cocktail Promotion']
]);

let setOfCraftVal = new Set();

const createPromotionDashboard = () =>{
  let tmp = '';
  $('#promotionDashboard').html('');

  let tableHead = `
  <div class="item">
  <div class="table-outer">
  <table class="contractedVolume visibility" >
  <tr><td colspan="2" style="font-weight:700; color: red;font-size: 1.25em;">Top Promotions</td></tr>
  
  <tr>
    <th style="width:20%"></th>
    <th style="width:80%"></th>
  </tr>
  `;
tmp = tableHead;

  for(let i=0;i<dashboardPromotion.length;i++)
  {
    
      tmp +='<tr>';
      tmp +='<td class="contVolume">'+dashboardPromotion[i].Competitor_Name+'</td>';
      tmp +='<td class="values">';
      let countVisibility = false;
      for(let j in dashboardPromotion[i])
      {
        if(dashboardPromotion[i][j] && mapOfElementLabels.has(j))
        {
          tmp+= mapOfElementLabels.get(j)+'<span> / </span>';
          countVisibility = true;
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
  $('#promotionDashboard').append(tmp);
  
slickSlider();
};

// createCompetitorPage();