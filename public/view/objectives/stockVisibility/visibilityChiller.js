


const zoneMasterValue = {
  channel_Off: {
    ZoneLabel: ['Zone 1 : Entrance',  ' Zone 2 : Cooler', ' Zone 3 : Shelf'],
    ZoneValue: ['Zone_1', 'Zone_3', 'Zone_4', ],
    Zone_1: ['Z_1_Facade_Signage', 'Z_1_One_way_Vision',],
    Zone_2: ['Z_2_Bira_91_LED_Signage'],
    Zone_3: ['Z_3_Planogram_adherence', 'Z_3_Chiller_Purity', 'Z_3_Chiller_restocking'],
    Zone_4: ['Z_4_Planogram_Compliance', 'Z_4_SKU_Placement_vs_Competition']
  },
  channel_On: {
    ZoneLabel: ['Zone 1 : Entrance', 'Zone 2 : Bar', 'Zone 3 : Table'],
    ZoneValue: ['Zone_1', 'Zone_2', 'Zone_3'],
    Zone_1: ['Z_1_Easel_Stand_promoting_offer'],
    Zone_2: ['Z_3_Coaster','Z_3_Glassware','Z_2_Bar_Mats'],
    Zone_3: ['Z_3_Menu_Listing', 'Z_3_Table_Tent'],
  },
  channel_On_Draft: {
    ZoneLabel: ['Zone 1 : Entrance', 'Zone 2 : Bar', 'Zone 3 : Table','Zone 4 : Draft'],
    ZoneValue: ['Zone_1', 'Zone_2', 'Zone_3','Zone_4'],
    Zone_1: ['Z_1_Easel_Stand_promoting_offer'],
    Zone_2: [ 'Z_3_Coaster'],
    Zone_3: ['Z_3_Menu_Listing', 'Z_3_Table_Tent'],
    Zone_4: ['Z_2_Tap_Handles', 'Z_2_Medallions','Z_2_Pitcher','Z_2_Growler','Z_3_Glassware','Empty_Kegs','Z_2_Bar_Mats'],
  },
  channel_On_QCO: {
    ZoneLabel: ['Zone 1 : Entrance', 'Zone 2 : Table'],
    ZoneValue: ['Zone_1', 'Zone_3'],
    Zone_1: ['Z_1_Facade'],
    Zone_2: ['Z_2_Bira_91_LED_Signage'],
    Zone_3: ['Z_3_Menu_Listing'],
  }
};
const fieldDataType = new Map([
  ['Z_1_Facade_Signage', 'checkbox'],
  ['Empty_Kegs','checkbox'],
  ['Z_2_Bar_Mats','checkbox'],
  ['Z_1_Facade_Signage_File', 'file'],
  ['Z_2_Bira_91_LED_Signage', 'checkbox'],
  ['Z_2_Bira_91_LED_Signage_File', 'file'],
  ['Z_3_Planogram_adherence', 'checkbox'],
  ['Z_3_Planogram_adherence_File', 'file'],
  ['Z_3_Chiller_Purity', 'picklist'],
  ['Z_3_Chiller_Purity_File', 'file'],
  ['Z_3_Chiller_restocking', 'checkbox'],
  ['Z_3_Chiller_restocking_File', 'file'],
  ['Z_4_Planogram_Compliance', 'checkbox'],
  ['Z_4_Planogram_Compliance_File', 'file'],
  ['Z_4_SKU_Placement_vs_Competition', 'checkbox'],
  ['Z_4_SKU_Placement_vs_Competition_File', 'file'],
  ['Z_1_Easel_Stand_promoting_offer', 'checkbox'],
  ['Z_1_Easel_Stand_promoting_offer_File', 'file'],
  ['Z_1_Facade', 'checkbox'],
  ['Z_1_Facade_File', 'file'],
  ['Z_2_Growler', 'checkbox'],
  ['Z_2_Growler_File', 'file'],
  ['Z_2_Pitcher', 'checkbox'],
  ['Z_2_Pitcher_File', 'file'],
  ['Z_2_Medallions', 'checkbox'],
  ['Z_2_Medallions_File', 'file'],
  ['Z_2_Tap_Handles', 'checkbox'],
  ['Z_2_Tap_Handles_File', 'file'],
  ['Z_2_Bucket', 'checkbox'],
  ['Z_2_Bucket_File', 'file'],
  ['Z_2_Bira_91_LED_Signage', 'checkbox'],
  ['Z_2_Bira_91_LED_Signage_File', 'file'],
  ['Z_3_Menu_Listing', 'checkbox'],
  ['Z_3_Menu_Listing_File', 'file'],
  ['Z_3_Menu_Price_Aligned_to_Competitor', 'checkbox'],
  ['Z_3_Menu_Price_Aligned_to_Competitor_File', 'file'],
  ['Z_3_Coaster', 'checkbox'],
  ['Z_3_Coaster_File', 'file'],
  ['Z_3_Table_Tent', 'checkbox'],
  ['Z_3_Table_Tent_File', 'file'],
  ['Z_3_Glassware', 'checkbox'],
  ['Z_3_Glassware_File', 'file'],
  ['Z_1_One_way_Vision', 'checkbox'],
  ['Z_1_One_way_Vision_File', 'file'],
  ['VisiCooler', 'checkbox'],
  ['VisiCooler_File', 'file'],
  ['Empty_Kegs_File','file'],
  ['Z_2_Bar_Mats_File','file'],
]);
const labelMaping = new Map([
  ['Z_1_Facade_Signage', 'Facade'],
  ['Empty_Kegs','Empty Kegs'],
  ['Z_2_Bar_Mats','Bar Mats'],
  ['Z_1_Facade', 'Facade'],
  ['Z_1_One_way_Vision', 'One-way vision'],
  ['Z_2_Bira_91_LED_Signage', 'Bira 91 LED'],
  ['Z_1_Easel_Stand_promoting_offer', 'Easel Stand'],
  ['Z_2_Growler', 'Growler'],
  ['Z_2_Pitcher', 'Pitcher'],
  ['Z_2_Medallions', 'Medallions'],
  ['Z_2_Tap_Handles', 'Tap Handles'],
  ['Z_2_Bucket', 'Bucket'],
  ['Z_2_Bira_91_LED_Signage', 'Bira 91 LED'],
  ['Z_3_Planogram_adherence', 'Planogram adherence'],
  ['Z_3_Chiller_Purity', 'Chiller Purity'],
  ['Z_3_Chiller_restocking', 'Chiller restocking'],
  ['Z_3_Menu_Listing', 'Menu Listing'],
  ['Z_3_Menu_Price_Aligned_to_Competitor', 'Menu Price aligned to competitors'],
  ['Z_3_Coaster', 'Coasters'],
  ['Z_3_Table_Tent', 'Tent Card'],
  ['Z_3_Glassware', 'Glassware'],
  ['Z_4_Planogram_Compliance', 'Planogram Adherence'],
  ['Z_4_SKU_Placement_vs_Competition', 'SKU Placement vs Competition'],
  ['VisiCooler', 'VisiCooler'],
]);

const helpTextMap = new Map([
  ['Z_1_Facade_Signage','1) Glow sign board<br/> 2) ACP (Aluminum Composite panel)<br/> 3) Non-lit signboard'],
  ['Z_2_Bira_91_LED_Signage','1) Make Play<br/> 2) Fish Eye <br/>3) BSL<br/> 4) Boom LED'],
  ['Z_4_SKU_Placement_vs_Competition','1) BSL to the right of Budweiser<br/> 2) Boom to the right of Tuborg<br/> 3) Strong to the right of Bud Magnum'],
  ]);
const pickListValues = new Map([
  ['Z_3_Chiller_Purity', ['Low', 'Medium', 'High']]

]);
const zoneRender = (formValues) => {

  let tmp = '';
  $('#formDisplay').empty();
    tmp +='<div class="col-xs-12">';
    tmp += '<div class="card">';
    tmp += '<div class="card-body">';
    tmp += '<div class="form-group row">';
    tmp += '<div class="col-xs-7">';
    tmp += '<p>' + labelMaping.get('Z_2_Bira_91_LED_Signage');
    if (helpTextMap.has('Z_2_Bira_91_LED_Signage')) {
      tmp += createHelpText(helpTextMap.get("Z_2_Bira_91_LED_Signage"));
    }
    tmp += '</p>';

    tmp += '</div>';

    tmp += '<div class="col-xs-3">';
    tmp += createCheckBox('Z_2_Bira_91_LED_Signage', '', "checkboxHandler(this)", stockVisbility['Z_2_Bira_91_LED_Signage'] ? stockVisbility['Z_2_Bira_91_LED_Signage'] : false);
    tmp += '</div>';
    if (stockVisbility['Z_2_Bira_91_LED_Signage']) {
      tmp += '<div class="col-xs-1" id="Z_2_Bira_91_LED_Signage_File_Panel"  >';
    }
    else {
      tmp += '<div class="col-xs-1" id="Z_2_Bira_91_LED_Signage_File_Panel"  style="display:none" >';
    }
    tmp += createImgInput(('Z_2_Bira_91_LED_Signage_File'), '', stockVisbility['Z_2_Bira_91_LED_Signage_File'], "fileInput(this)", true);
    tmp += '</div>';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '</div>';
    tmp += '</div>';
  

  for (let i = 0; i < formValues.ZoneLabel.length; i++) {
    tmp += '<div class ="col-xs-12">';
    tmp += '<div class="card">';
    tmp += '<div class="card-header">';
    tmp += '<h5 class="text_header"><b>' + formValues.ZoneLabel[i];
    tmp += '</b></h5>';// Header close
    tmp += '</div>';// Card header close
    tmp += '<div class="card-body">';
    tmp += '<div class="form-group row">';
    for (let j = 0; j < formValues[formValues.ZoneValue[i]].length; j++) {
      if (formValues[formValues.ZoneValue[i]][j] !== 'Z_2_Bira_91_LED_Signage') {
        if (formValues[formValues.ZoneValue[i]][j] === 'Z_3_Chiller_Purity') {
          tmp += '<div class="col-xs-5">';
        }
        else {
          tmp += '<div class="col-xs-7">';
        }
        if (labelMaping.has(formValues[formValues.ZoneValue[i]][j])) {
          tmp += '<p>' + labelMaping.get(formValues[formValues.ZoneValue[i]][j]);

          if (helpTextMap.has(formValues[formValues.ZoneValue[i]][j])) {
            tmp += createHelpText(helpTextMap.get(formValues[formValues.ZoneValue[i]][j]));
          }
          tmp += '</p>';
        }
        else {
          console.log(formValues.ZoneValue[i]);
          console.log(formValues[formValues.ZoneValue[i]][j]);
          tmp += '<p>No Name Found</p>';
        }
        tmp += '</div>';

        if (fieldDataType.has(formValues[formValues.ZoneValue[i]][j])) {
          if (fieldDataType.get(formValues[formValues.ZoneValue[i]][j]) === 'checkbox') {
            tmp += '<div class="col-xs-3">';
            tmp += createCheckBox((formValues[formValues.ZoneValue[i]][j]), '', "checkboxHandler(this)", stockVisbility[(formValues[formValues.ZoneValue[i]][j])] ? stockVisbility[(formValues[formValues.ZoneValue[i]][j])] : false);
            tmp += '</div>';
          }
          else if (fieldDataType.get(formValues[formValues.ZoneValue[i]][j]) === 'picklist') {
            tmp += '<div class="col-xs-5" style="margin-bottom: 14px;margin-top:-9px;padding: 0;">';
            tmp += createSelectOption(formValues[formValues.ZoneValue[i]][j], '', pickListValues.get(formValues[formValues.ZoneValue[i]][j]), "pickListChangeHandler(this)", stockVisbility[formValues[formValues.ZoneValue[i]][j]]);
            tmp += '</div>';
          }
          if (fieldDataType.get(formValues[formValues.ZoneValue[i]][j] + '_File') === 'file') {
            if (stockVisbility[(formValues[formValues.ZoneValue[i]][j])]) {
              tmp += '<div class="col-xs-1" id="' + (formValues[formValues.ZoneValue[i]][j] + '_File_Panel') + '"  >';
            }
            else {
              tmp += '<div class="col-xs-1" id="' + (formValues[formValues.ZoneValue[i]][j] + '_File_Panel') + '" style="display:none" >';
            }
            tmp += createImgInput((formValues[formValues.ZoneValue[i]][j] + '_File'), '', (stockVisbility[(formValues[formValues.ZoneValue[i]][j]) + '_File']), "fileInput(this)", true);
            tmp += '</div>';

          }
        }
        else {
          tmp += '<label class="switch col-xs-3">';
          tmp += createCheckBox((formValues[formValues.ZoneValue[i]][j]), '', checkboxHandler, stockVisbility[(formValues[formValues.ZoneValue[i]][j])] ? stockVisbility[(formValues[formValues.ZoneValue[i]][j])] : false);
          tmp += '</label>';
        }
      }


    }
    tmp += '</div>';// Form group closed
    tmp += '</div>'; // Card body closed
    tmp += '</div>';//Card closed
    tmp += '</div>'; // col xs closed
  }
  $('#formDisplay').prepend(tmp);
};
const checkboxHandler = (event) => {
  const id = $(event).attr('id');
  const checked = $(event).prop('checked');
  stockVisbility[id] = checked;
  const fileId = `${id}_File`;
  if (fieldDataType.has(fileId)) {
    const filePanel = `${fileId}_Panel`;
    if (checked) {

      $(`#${filePanel}`).css('display', 'block');
    }
    else {
      $(`#${filePanel}`).css('display', 'none');
      stockVisbility[fileId] = null;
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

  const key = $(event).attr('id');
  const fileInput = $(event).prop('files')[0];

  var options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  const compressedFile = await imageCompression(fileInput, options);
  uploadBase64Value(key, compressedFile);


};

const uploadBase64Value = async (key, fileInput) => {
  stockVisbility[key] = await toBase64(fileInput);
  fileAttachedBackgroundChange(key);
};

const fileAttachedBackgroundChange = (key) => {
  let iconKey = key;
  let icon = $('.' + iconKey);
  icon.css('color', '#5cb85c');
};

const pickListChangeHandler = (event) => {
  const id = $(event).attr('id');
  const value = $(event).prop('value');
  const fileId = `${id}_File`;
  stockVisbility[id] = value;
  console.log(value);
  if (fieldDataType.has(fileId)) {
    const filePanel = `${fileId}_Panel`;
    if (value) {

      $(`#${filePanel}`).css('display', 'block');
    }
    else {
      $(`#${filePanel}`).css('display', 'none');
      stockVisbility[fileId] = null;
    }
  }

};

const notAplicablemsg = () => {
  $('#notApplicableMsg').css('display', 'block');
};


handlePageRedirect = async (value) => {
  await writeData('stockVisibility', stockVisbility);
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
      window.location.href = '/view/leadDetail/leadDetailDetail.html?leadId=' + accountRec.Id;
    }

    else if (value === 'Media') {
      window.location.href = '/view/leadDetail/leadDetailMedia.html?leadId=' + accountRec.Id;
    }

  }
};


$('#stockBtn').on('click', function () {
  let isValid = true;
  for (let i in stockVisbility) {
    if (typeof stockVisbility[i] === 'boolean' && stockVisbility[i]) {
      if (!stockVisbility[`${i}_File`]) {
        isValid = false;
        break;
      }
    }
  }
  if (!isValid) {
    $('#stockSubmit .modal-body').html('Images are mandatory where elements are present! Press Toggle off if image is not available');
    $('.modal-footer .btn-success').css('display', 'none');
    $('.modal-footer .btn-danger').html('Close');
  }
  else {
    $('.modal-footer .btn').css('display', '');
    $('#stockSubmit .modal-body').html('Are you sure you want to submit ? ');
    $('.modal-footer .btn-danger').html('No');
  }

});