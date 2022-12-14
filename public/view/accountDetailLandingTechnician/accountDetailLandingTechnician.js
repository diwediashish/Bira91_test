const handleInstallation = () => {
    let urlParam = new URLSearchParams(window.location.search);
    window.location.href = '/view/objectives/technicianInstallation/technicianInstallationHomePage.html?accountId='+urlParam.get('accountId');
};


const handleScheduleEvents = () => {
    let urlParam = new URLSearchParams(window.location.search);
    window.location.href = '/view/objectives/scheduleVisit/technicianScheduleVisit.html?accountId='+urlParam.get('accountId')+(urlParam.has('eventId') ? '&eventId='+urlParam.get('eventId') : '');
};

const handleCompetitorInsights = () => {
  let urlParam = new URLSearchParams(window.location.search);
    window.location.href = '/view/objectives/competitorInsightTechnician/competitorInsights.html?accountId='+urlParam.get('accountId')+(urlParam.has('eventId') ? '&eventId='+urlParam.get('eventId') : '');
};
const handleMaintainence = () => {
    window.location.href = '/view/objectives/technicianMaitainence/draftMaintainenceHomePage.html';
};

const handlePullout = () => {
    window.location.href = '/view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.html?pullout=true';
};
const salesOrder = () => {
    window.location.href = `/view/objectives/salesOrder/salesOrderLanding.html?accountId=${accountRec.Id}`;
};

const handlePageRedirect =async (value) => {
    const recordTypeName = accountRec.RecordType.DeveloperName;
    if (recordTypeName === "Distributor_Warehouse") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Distributor") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "On_Premise_General") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Consumer") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Institutional_Off_Premise") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Institutional_On_Premise") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Non_beer_Warehouse") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Off_Premise_Outlet") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "On_Premise_Hotel") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Supplier") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Temporary_Event") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html?Id=" +
            accountRec.Id;
        }
      } else if (recordTypeName === "Wholesaler") {
        if (value === "Home") {
            let nonSales = await isTechnicianAuditorFuncHelper();
            if(nonSales.isAudit){
                window.location.href =
                "/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId=" +
                accountRec.Id;
            }
            else if(nonSales.isSales){
                window.location.href =
                "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=" +
                accountRec.Id;
            }
            else if(nonSales.isTech){
                window.location.href =
                "/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId=" +
                accountRec.Id;
            }
          
        } else if (value === "Related") {
          window.location.href =
            "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html?Id=" +
            accountRec.Id;
        } else if (value === "Detail") {
          window.location.href =
            "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html?Id=" +
            accountRec.Id;
        } else if (value === "Media") {
          window.location.href =
            "/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html?Id=" +
            accountRec.Id;
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