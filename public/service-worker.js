importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');



// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting()
workbox.core.clientsClaim()


workbox.precaching.precacheAndRoute([
  {
    "url": "controller/accountDetail/accountDetailDetail.js",
    "revision": "32f17affcea910a8822d0b3b0343e338"
  },
  {
    "url": "controller/accountDetail/accountDetailLanding.js",
    "revision": "385e945046154f6897b8ffad96386127"
  },
  {
    "url": "controller/accountDetail/accountDetailLandingAuditor.js",
    "revision": "cf98a464ae09721f486821942895f84d"
  },
  {
    "url": "controller/accountDetail/accountDetailLandingTechnician.js",
    "revision": "4c1f7842fff0867f272ad65f0c330689"
  },
  {
    "url": "controller/accountDetail/accountDetailMedia.js",
    "revision": "2a3192d04d9c100adeefa1aa02593d7a"
  },
  {
    "url": "controller/accountDetail/accountDetailRelated.js",
    "revision": "bc5a664adc865984703a4ff03b30cbb6"
  },
  {
    "url": "controller/accountList/accountListView.js",
    "revision": "caa5bbd12954f64931c0e55836271eaa"
  },
  {
    "url": "controller/calendar/calendar.js",
    "revision": "d1c69e3d31d9fb42f6eb6fb6df75be27"
  },
  {
    "url": "controller/contactDetail/contactDetail.js",
    "revision": "3d5974858784ca07c2e92079fc1285b7"
  },
  {
    "url": "controller/globalJS/globalJS.js",
    "revision": "705d17e27e2ad11840f68ed95cf28bc2"
  },
  {
    "url": "controller/homePage/homePage.js",
    "revision": "92d3ea2380c068ad490419297742b5e5"
  },
  {
    "url": "controller/homePage/homePageTechnician.js",
    "revision": "e711ac00fb892db42b54fa1fa2b20c49"
  },
  {
    "url": "controller/indexedDB/idb.js",
    "revision": "edfbee0bb03a5947b5a680c980ecdc9f"
  },
  {
    "url": "controller/indexedDB/utility.js",
    "revision": "2db4a20468bc9ac8ab4782087e9a13a8"
  },
  {
    "url": "controller/leadCreate/leadCreate.js",
    "revision": "f4106019289be966e7fc06895f6c3863"
  },
  {
    "url": "controller/leadDetail/leadDetailDetail.js",
    "revision": "670691c3b3047680339253bcf8b1f86d"
  },
  {
    "url": "controller/leadDetail/leadDetailLanding.js",
    "revision": "5995648b550af3edf8cb2039e3e3c3aa"
  },
  {
    "url": "controller/leadDetail/leadDetailMedia.js",
    "revision": "caec9be73a0639ea10beaa91cbb8685e"
  },
  {
    "url": "controller/leadDetail/leadDetailRelated.js",
    "revision": "7d5ee9f786ff810a63a927159906adcd"
  },
  {
    "url": "controller/leadList/leadList.js",
    "revision": "1dadc0b9a22956a2404887e81879b1fb"
  },
  {
    "url": "controller/loginPage/loginPage.js",
    "revision": "4e67d1ae4842b97f6f0262ff57f6a8d4"
  },
  {
    "url": "controller/objectives/brandFreshness.js",
    "revision": "d1609dcfd2c42ea22be8da28e1adc3e1"
  },
  {
    "url": "controller/objectives/checkout.js",
    "revision": "0b1aeec01d925c237edfa1842c990143"
  },
  {
    "url": "controller/objectives/chemicalCIP.js",
    "revision": "ed6fdb785d07aee676eba472c1f76750"
  },
  {
    "url": "controller/objectives/chillerVisibility.js",
    "revision": "76f950de378a8272574844dac0b2d5cd"
  },
  {
    "url": "controller/objectives/competitorInsights/competitorInsights1.js",
    "revision": "8073527ef962e4e5cd12c4187d1ca012"
  },
  {
    "url": "controller/objectives/competitorInsights/competitorInsights2.js",
    "revision": "217e96320b9b40a20729e15deb9161a2"
  },
  {
    "url": "controller/objectives/competitorInsights/competitorInsights3.js",
    "revision": "7df88caaee0d12839c4fbce06e1b6bec"
  },
  {
    "url": "controller/objectives/competitorInsightsTechnician.js",
    "revision": "2f9ec9c2e4df42997a0236e8aa87b95d"
  },
  {
    "url": "controller/objectives/draftPulloutSales.js",
    "revision": "3bcd860ea00fcefce936065188b1a846"
  },
  {
    "url": "controller/objectives/draftSignup/draftSignupHomePage.js",
    "revision": "a50291779af7c3aff99bcd7725b6c671"
  },
  {
    "url": "controller/objectives/draftSignup/draftSignupKYC.js",
    "revision": "e67c6f5676a3ad2988fdb42cc637d4e1"
  },
  {
    "url": "controller/objectives/draftSignup/draftSignupPOSM.js",
    "revision": "96762b0938ab956cd783b094ea16c570"
  },
  {
    "url": "controller/objectives/hygiene.js",
    "revision": "e5fb322f95ace901820b734612feb994"
  },
  {
    "url": "controller/objectives/kycDetail.js",
    "revision": "c938e7117ddeae3ee31221c8c38920b8"
  },
  {
    "url": "controller/objectives/posm.js",
    "revision": "ea231993fff92d46586ebcf9c64fa2fe"
  },
  {
    "url": "controller/objectives/preSales.js",
    "revision": "8ec482d2429d7016f253df0ed79fb92a"
  },
  {
    "url": "controller/objectives/pulloutApproval.js",
    "revision": "612cd96aff7ba6a3a447cf35677353b6"
  },
  {
    "url": "controller/objectives/salesOrder.js",
    "revision": "3089074ccae3fd54f496548ec9a87556"
  },
  {
    "url": "controller/objectives/segmentation.js",
    "revision": "9c114bf57b011df15071225fad67c3a7"
  },
  {
    "url": "controller/objectives/stockVisibility.js",
    "revision": "832f1c1785dd714511c0076478c1206b"
  },
  {
    "url": "controller/objectives/technicianInstallation/draftInstallation/draftInstallation.js",
    "revision": "00766493a2a731a3fb8b5f882fa780d9"
  },
  {
    "url": "controller/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.js",
    "revision": "07fa660ca4d58160d24e76829bc5ad50"
  },
  {
    "url": "controller/objectives/technicianInstallation/draftPreInstallation/draftPreInstallation.js",
    "revision": "a7947ace7e057d091e33917eef24bf9b"
  },
  {
    "url": "controller/objectives/technicianInstallation/technicianInstallationHomePage.js",
    "revision": "bf710c378d4561b2625925288e3596af"
  },
  {
    "url": "controller/objectives/technicianInstallation/technicianMachineCommissoning.js",
    "revision": "9a4f96f81bc18ed33886c193cf93b7bd"
  },
  {
    "url": "controller/objectives/technicianInstallation/technicianTraining.js",
    "revision": "a07bef6346be661452a8f01b5ade7245"
  },
  {
    "url": "controller/objectives/technicianMaintainence/draftSanitization/draftSanitization.js",
    "revision": "0a63e7bb77b7052186bfaaffa3486959"
  },
  {
    "url": "controller/objectives/technicianMaintainence/technicianMaintainenceHomePage.js",
    "revision": "053cd115220a3d1fece653b6d95d14f9"
  },
  {
    "url": "controller/objectives/technicianScheduleVisit.js",
    "revision": "c23f3edcb15ffa078624f8d429af0292"
  },
  {
    "url": "controller/objectives/warehouseQualityCheck.js",
    "revision": "cb0f5635d550af21c55882b0671c4b42"
  },
  {
    "url": "controller/preInstallationApproval/preInstallationApproval.js",
    "revision": "0b2bfb40e9a90c119a9b61346634c269"
  },
  {
    "url": "controller/sellingToolsListView/fileViewer.js",
    "revision": "869e583485d12c963bb6e53d73f49cac"
  },
  {
    "url": "controller/sellingToolsListView/sellingToolsListView.js",
    "revision": "0ed00fd8bacf87a4de47aa571592265d"
  },
  {
    "url": "controller/sync/sync.js",
    "revision": "45c82c6f4332aeea442ce5121a3bed84"
  },
  {
    "url": "index.html",
    "revision": "57416563e16abb5bd74e05e57058d696"
  },
  {
    "url": "manifest.json",
    "revision": "c6b697ee8647bcc806fbcc338950991d"
  },
  {
    "url": "media/icons/accountSegmentation/a.png",
    "revision": "cb0177ec2f805b669160de62a3a118f7"
  },
  {
    "url": "media/icons/accountSegmentation/a+.png",
    "revision": "0fd36fa25fa7a7099afea5d74566c09b"
  },
  {
    "url": "media/icons/accountSegmentation/b.png",
    "revision": "7f2cd3852ce6d0e7244f1709a54b82b9"
  },
  {
    "url": "media/icons/accountSegmentation/boom-led.png",
    "revision": "03f05b41916ce548129e80096a97744b"
  },
  {
    "url": "media/icons/accountSegmentation/c.png",
    "revision": "6224688a038d2cb8227d6cc0b4988e0b"
  },
  {
    "url": "media/icons/accountSegmentation/m0.png",
    "revision": "fdc2e2c9ba246f0703565ced4f299f04"
  },
  {
    "url": "media/icons/accountSegmentation/m1.png",
    "revision": "e2a3123ada611dbebf759a245a3eca24"
  },
  {
    "url": "media/icons/accountSegmentation/m2.png",
    "revision": "46131b03527f525db18be5eb2c955d50"
  },
  {
    "url": "media/icons/accountSegmentation/m3.png",
    "revision": "19a7d831540523f28aa91808260762bf"
  },
  {
    "url": "media/icons/accountSegmentation/p0.png",
    "revision": "8b51e5bc3c6a54c20b4c41d8de3ff55a"
  },
  {
    "url": "media/icons/accountSegmentation/p1.png",
    "revision": "68738081d48f5b1afb7ca3fc2302c443"
  },
  {
    "url": "media/icons/accountSegmentation/p2.png",
    "revision": "0f170eefbc63d8674925d8c2142cf9e2"
  },
  {
    "url": "media/icons/accountSegmentation/p3.png",
    "revision": "b247c913bb572893e2d33a6ae64f6f58"
  },
  {
    "url": "media/icons/accountSegmentation/premium-led.png",
    "revision": "a96bca8dc5ae8f4c816db26133feda95"
  },
  {
    "url": "media/icons/filter.png",
    "revision": "6fc861577b2f3ec0ae76fb94209fef65"
  },
  {
    "url": "media/icons/fliter2.png",
    "revision": "00a603b2ce1e4323c9f7a070f4d4e064"
  },
  {
    "url": "media/icons/info.png",
    "revision": "dfd728a4eaf77245b7e3128f1f51c786"
  },
  {
    "url": "media/icons/loginPage/biraLogo.png",
    "revision": "376b1f02e41565dbabfbd6565422710d"
  },
  {
    "url": "media/icons/logo/Icons-12.png",
    "revision": "cd1c7f29e833a52393be1d566b6a405a"
  },
  {
    "url": "media/icons/manifest2/app-icon-144x144.png",
    "revision": "07d805841b95a505f811b4d9c3cfa420"
  },
  {
    "url": "media/icons/manifest2/app-icon-192x192.png",
    "revision": "8d68af2e5d3ebf921925096d669e1ada"
  },
  {
    "url": "media/icons/manifest2/app-icon-256x256.png",
    "revision": "491ad5ce6d022d5c133e0db5802fd136"
  },
  {
    "url": "media/icons/manifest2/app-icon-384x384.png",
    "revision": "1376218b85005d4e7ba7a9384d24d422"
  },
  {
    "url": "media/icons/manifest2/app-icon-48x48.png",
    "revision": "46368ed0ab4d7474d731bada6b6f431a"
  },
  {
    "url": "media/icons/manifest2/app-icon-512x512.png",
    "revision": "9186fb7d66f5da617866e4b94bf84f3a"
  },
  {
    "url": "media/icons/manifest2/app-icon-96x96.png",
    "revision": "da05ec09134fb61cc506d76dc6759f48"
  },
  {
    "url": "media/icons/manifest2/apple-icon-114x114.png",
    "revision": "4544c925b2befb19d0ac9f42690450eb"
  },
  {
    "url": "media/icons/manifest2/apple-icon-120x120.png",
    "revision": "19ee40f36ebebd7e5dba2d625b9b26e2"
  },
  {
    "url": "media/icons/manifest2/apple-icon-144x144.png",
    "revision": "07d805841b95a505f811b4d9c3cfa420"
  },
  {
    "url": "media/icons/manifest2/apple-icon-152x152.png",
    "revision": "3177472e1ec8423362e03c5f722d92b5"
  },
  {
    "url": "media/icons/manifest2/apple-icon-180x180.png",
    "revision": "e04f49dd3e74af0f029a2da6a81db63b"
  },
  {
    "url": "media/icons/manifest2/apple-icon-57x57.png",
    "revision": "fb67e87f6519cd67dcf5582d905dfc6d"
  },
  {
    "url": "media/icons/manifest2/apple-icon-60x60.png",
    "revision": "a73a3322b99fa73d7d87c1c4047258c1"
  },
  {
    "url": "media/icons/manifest2/apple-icon-72x72.png",
    "revision": "6958db290bd9cd6528d2abc3afb7c26a"
  },
  {
    "url": "media/icons/manifest2/apple-icon-76x76.png",
    "revision": "1fff1e5b0e901740d74f2bbb88c7db9d"
  },
  {
    "url": "media/icons/video.png",
    "revision": "68d8294616709586fb7165840981f06d"
  },
  {
    "url": "media/images/checkout/contact.png",
    "revision": "4ae81df46bb187a8ba151371d955a6b7"
  },
  {
    "url": "media/images/homePage/histrogram.png",
    "revision": "e7182d4b1f08fa9293a7dfdfe8abad58"
  },
  {
    "url": "media/images/homePage/histrogram1.png",
    "revision": "2766f27b8a78c8ea33bbdd1d7cf6f06d"
  },
  {
    "url": "media/images/homePage/Icons-02.png",
    "revision": "ea12db30fec346e2af853234d84511e4"
  },
  {
    "url": "media/images/homePage/Icons-04.png",
    "revision": "390f27e6e6e3b002fa441f3efb00ae09"
  },
  {
    "url": "media/images/homePage/Icons-05.png",
    "revision": "81d29a75d9c121fea3b17cd251df4919"
  },
  {
    "url": "media/images/homePage/pie1.png",
    "revision": "6d05f51433d7ed892c9fe896920322de"
  },
  {
    "url": "media/images/homePage/rsz_icons-07-old.png",
    "revision": "2f6795dc254627fac17f76fc0a5e9e51"
  },
  {
    "url": "media/images/homePage/rsz_icons-07.png",
    "revision": "97d7f37d4d3fb0365895a3091ae67cf3"
  },
  {
    "url": "media/images/homePage/rsz_icons-08-old.png",
    "revision": "59fbe7ebd6d4650413ba163c8010e92c"
  },
  {
    "url": "media/images/homePage/rsz_icons-08.png",
    "revision": "ea3f8ce59b43e7f70a96f865174ea314"
  },
  {
    "url": "media/images/homePage/rsz_icons-09-old.png",
    "revision": "d205d5d5386730ed0f18173c2bf8298c"
  },
  {
    "url": "media/images/homePage/rsz_icons-09.png",
    "revision": "87699344a0ef1d0dacf2c6777c04731a"
  },
  {
    "url": "media/images/homePage/rsz_icons-10-old.png",
    "revision": "49d304720e0d1f010fdbf1938726f552"
  },
  {
    "url": "media/images/homePage/rsz_icons-10.png",
    "revision": "3322f0ca878c17c53302541e3728d30f"
  },
  {
    "url": "media/images/homePage/todays-visit.png",
    "revision": "50fc8ca3c839eb389c8606cbf1daf8fa"
  },
  {
    "url": "media/images/homePage/upcoming-meetings.png",
    "revision": "545ce2a5f781d9cc977a4ecf023dee6c"
  },
  {
    "url": "media/images/loginPage/banner.png",
    "revision": "6c780570507bdddd3a0baf8fcaf96e9d"
  },
  {
    "url": "media/images/loginPage/Beast-03.png",
    "revision": "d30c93c94c03b16fa9b33235a976b370"
  },
  {
    "url": "media/images/loginPage/Beast-04.png",
    "revision": "3595807208988aaf4de0d7fb49573fc9"
  },
  {
    "url": "media/images/loginPage/splash.png",
    "revision": "e553984dc9befb3bae897e7ff5346ab2"
  },
  {
    "url": "media/images/loginPage/splash1.png",
    "revision": "7c21abd15b6437098592d5acbedaa28c"
  },
  {
    "url": "media/images/posm/product-not-available.png",
    "revision": "e3cb3f98f48d86fd48da88e6931fdd7f"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumer.css",
    "revision": "3492998faa36b31b658fcb16ab92f2f8"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.html",
    "revision": "af43234122c0612964093c57316fda9d"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerDetail.js",
    "revision": "c4b1904f620819b55c7575fa43e595ef"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html",
    "revision": "3eaa00ee0ec83ca164e4bd6567a70c73"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.js",
    "revision": "7ad46e771ca6e915f62f338954272671"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.html",
    "revision": "97bce6c0ed74c3db84d109fe3dc8a480"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerMedia.js",
    "revision": "08c5b12d5687950d48abf45d75733d86"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.html",
    "revision": "6065e1ab0301a9860fea137173553f03"
  },
  {
    "url": "view/accountDetail/accountDetailConsumer/accountDetailConsumerRelated.js",
    "revision": "f5e223575c5fd07aa7a8087cfe9d9129"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributor.css",
    "revision": "60492a22756f97510b363a7972f1cb53"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.html",
    "revision": "00563446143653544da06293c39512b0"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorDetail.js",
    "revision": "5824c44bec27540710b29170c5f8baf1"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html",
    "revision": "00b915c1b17e30eb1bb18c60c9314979"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.js",
    "revision": "7dd3778841c99893f161b4188524cb9f"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.html",
    "revision": "2b4bd610adbd76e81afbbe39d0304f0d"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorMedia.js",
    "revision": "8a2f027a0e7d6dcc076538a207179be2"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.html",
    "revision": "1030c8dd057fef33bbd831a90130d76d"
  },
  {
    "url": "view/accountDetail/accountDetailDistributor/accountDetailDistributorRelated.js",
    "revision": "ba6f80049222670de6a08fea18837357"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouse.css",
    "revision": "88c17d9708ebfc397e28982f67de10bb"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.html",
    "revision": "f65a395ef67aabf113f12d7ae11f9757"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseDetail.js",
    "revision": "59a01b46717f54f2faaa3b0c8eb95485"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html",
    "revision": "7d99b2dd9bf0f63f9f9d72f7d9a0b9ef"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.js",
    "revision": "299df75ebc6972a04e077708f856beb3"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.html",
    "revision": "c9c99dec96e7cddc1c189ac1a18305dc"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseMedia.js",
    "revision": "00a2efc7513ed429a18a69fb9978506d"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.html",
    "revision": "b486cf8ee7c4a53b4e2573968c1006d8"
  },
  {
    "url": "view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseRelated.js",
    "revision": "93fa99ee6743ea47ced202e8591911d0"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremise.css",
    "revision": "52363104e31e03f81a3505056795115a"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.html",
    "revision": "2afb15d271c8ab2d260bcf6783a2aee2"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseDetail.js",
    "revision": "d7af7bc848a39d365c0eed17286f168a"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html",
    "revision": "c0f47f0768f1b9fcec8f21584150a62e"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.js",
    "revision": "4bd3a6cb0f75b166d2e5e1e3356b88f4"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.html",
    "revision": "b6f2066104fb8bf68e7f63525a5d8e24"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseMedia.js",
    "revision": "02acd63b3f4d36fadb8fe976cf387ab1"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.html",
    "revision": "a8b5faf4ea6603a0ccca144d16d19cd8"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseRelated.js",
    "revision": "a69c1b8eee8f02a6ced5c7f870e09e58"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremise.css",
    "revision": "3869fb00ddd7a79385b2a8d0ad82910c"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.html",
    "revision": "91a9b41c39f861e5561ee7a7d6853952"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseDetail.js",
    "revision": "82b546cf25354b8a4e7b99af525b241d"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html",
    "revision": "81727baf5b7692a9c1f5c2aa90fa32fa"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.js",
    "revision": "6c13b589045f6e4236656f415bde0fd5"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.html",
    "revision": "f1878284538c6e1457ebecde3b2b70ee"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseMedia.js",
    "revision": "94fb64f168025217fe89a9cc55230c09"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.html",
    "revision": "28bedeaa612cd649fcb6ac7196912d22"
  },
  {
    "url": "view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseRelated.js",
    "revision": "1112829a65e9dc0efb1272a62d72c638"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouse.css",
    "revision": "822dc178ad9a9d70d474fa59b9605c36"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.html",
    "revision": "eaed09712169dc29c60feff7f6d0a932"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseDetail.js",
    "revision": "c3203285ff1f53f777d78418fd161551"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html",
    "revision": "648127a7b97f43cea0592ce08824878d"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.js",
    "revision": "0d825da185b41e291684efd8c8500e78"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.html",
    "revision": "0ede5303e94b35feb8d741a18b1741d2"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseMedia.js",
    "revision": "95832993ea687445d9f7961f80476e56"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.html",
    "revision": "894b9acf4728a424b3f131d2662dcd7e"
  },
  {
    "url": "view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseRelated.js",
    "revision": "776475609fe20399c513340fcb9b78e1"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutlet.css",
    "revision": "9444ea8d7a9896018343650f3c75b680"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.html",
    "revision": "e065973a96c87c3035c02042bf4c617a"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletDetail.js",
    "revision": "733a91eb9622ba8bd6dfac8063cc794e"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html",
    "revision": "c0b560fedc310702a26ea325da0a1502"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.js",
    "revision": "e5709d01e4075d77500d99c9032b6caa"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.html",
    "revision": "5fe95baf9a48345870e48fa3519c291b"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletMedia.js",
    "revision": "16ffcebd78ebee63f46f5206d7327c25"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.html",
    "revision": "b6ebf12943f8be4922d269ddbe22ea32"
  },
  {
    "url": "view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletRelated.js",
    "revision": "74c1418c1b73eac00c9cb0a3dd426ed7"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneral.css",
    "revision": "6a3851a509581b982d9a4f30d8e37014"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.html",
    "revision": "aeb020e2ad923b8e9011e26c4a33886e"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralDetail.js",
    "revision": "10470092674822de6eb3430dcddc15e2"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html",
    "revision": "5195f0c7c2176f18fece7deffaadfe4e"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.js",
    "revision": "6c32f87c09f8b884a8bdf326348ad744"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.html",
    "revision": "04adb79e7c277091c33e766de28823c2"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralMedia.js",
    "revision": "00bf841445d1eb6058a62c466e58b39d"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.html",
    "revision": "20312f212d646672e66caf3a3f0f4e6d"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralRelated.js",
    "revision": "cd7fed1eef248fb00c1b4e2cb2e6e625"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotel.css",
    "revision": "1b144cc7cb5c0791917f1f76562167fe"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.html",
    "revision": "b837cc7dc5ab745276b4d41481d0fde6"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelDetail.js",
    "revision": "460ea201662b14f7c61ec5d0f447ac4d"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html",
    "revision": "28dd362543f06e4bb95269149575c81d"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.js",
    "revision": "ae67d07797b4d1cd8001bf9b1adbdc99"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.html",
    "revision": "3099426a84730442678c4a2a5e00858e"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelMedia.js",
    "revision": "afdcb060019e646aaaffb46aa85d4af0"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.html",
    "revision": "faf7abc1aa0550f569ae8b554d4e55fc"
  },
  {
    "url": "view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelRelated.js",
    "revision": "43093d71258976006c0f15149003426b"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.html",
    "revision": "4f17a07f4a7e332559ad57d9193b8966"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierDetail.js",
    "revision": "dddb9dce3ccbdf9c362b965ef46b128f"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierGeneral.css",
    "revision": "158973ae65ffb1abeaaaa5ef167130f3"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html",
    "revision": "193c06bead2abc1ac4737311aeeccc9a"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.js",
    "revision": "6065faa2b93742f988a93c1b312f6a3a"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.html",
    "revision": "a2be498e8ac755f39e969cf143ff655c"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierMedia.js",
    "revision": "7a388eb9865964ee5452b43d1a0e8d84"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.html",
    "revision": "b7c04c579e0371c3fcaae7838038f8b5"
  },
  {
    "url": "view/accountDetail/accountDetailSupplier/accountDetailSupplierRelated.js",
    "revision": "4b700bd1a5b0f22fc7591683c4a8fd57"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEvent.css",
    "revision": "63895f074a8fa7f44613ee26d8aa5b2e"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.html",
    "revision": "49447cddb7f8cf1fa96753bdec96035d"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventDetail.js",
    "revision": "636af27ac46263fe7c54c585b80b0f77"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html",
    "revision": "091f3832e3f45d3a8cb1f801da51c491"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.js",
    "revision": "86379668a196504b5cb1ddbd74bb855a"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.html",
    "revision": "3058d91b57c2ea04e902542ef19a924d"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventMedia.js",
    "revision": "59dd040364805f3f0fd081dfc34101b3"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.html",
    "revision": "a557e7ebfe4c21e775e04874e84ca157"
  },
  {
    "url": "view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventRelated.js",
    "revision": "622beff0558dd66d22e05fe01bf30836"
  },
  {
    "url": "view/accountDetail/accountDetailUtility/relatedUtility.css",
    "revision": "fc653c3d386431b3a692a4ae8adb7c6f"
  },
  {
    "url": "view/accountDetail/accountDetailUtility/relatedUtility.js",
    "revision": "5c1d8aab55ab011ec2b9b5c308264ef3"
  },
  {
    "url": "view/accountDetail/accountDetailUtility/utility.js",
    "revision": "b6a044c4ddb496efb3bfb1662419f158"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesaler.css",
    "revision": "66c9482cd3963ccbec84b6f613f90faf"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.html",
    "revision": "7150e5bab0d9ba9ca75341452cb395c7"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerDetail.js",
    "revision": "742939c4b503fa5d09ac52a6a1a13d4e"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html",
    "revision": "725a3349b589e09006719c2d65594c53"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.js",
    "revision": "9962cf7d7bbba87265fc98aa0da4f088"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.html",
    "revision": "576b5e5c46466a79763003b1ce8bbc06"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerMedia.js",
    "revision": "5ba0a539d630db758a8a2f9cf00847c3"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.html",
    "revision": "e310ced859045db1b3179d2268cc12cb"
  },
  {
    "url": "view/accountDetail/accountDetailWholesaler/accountDetailWholesalerRelated.js",
    "revision": "1b361c88313cfc3ac4c665ad973815ac"
  },
  {
    "url": "view/accountDetailLandingAuditor/accountDetailLandingAuditor.css",
    "revision": "448734185b793ff7facecfe850721bac"
  },
  {
    "url": "view/accountDetailLandingAuditor/accountDetailLandingAuditor.html",
    "revision": "e4c35c1060cdd7a0f47d5ced0af54119"
  },
  {
    "url": "view/accountDetailLandingAuditor/accountDetailLandingAuditor.js",
    "revision": "ff76df6331c7465f1c6f2ebea76108f0"
  },
  {
    "url": "view/accountDetailLandingTechnician/accountDetailLandingTechnician.css",
    "revision": "7207862e140bebb216a35883cc918918"
  },
  {
    "url": "view/accountDetailLandingTechnician/accountDetailLandingTechnician.html",
    "revision": "0d23eb3faff4ced2c6e9f0ca230766ad"
  },
  {
    "url": "view/accountDetailLandingTechnician/accountDetailLandingTechnician.js",
    "revision": "4a77007a998eececbc333d1abdca6820"
  },
  {
    "url": "view/accountList/accountListView.css",
    "revision": "bec65ce89368ac1fa4c51b8a4b0ec30f"
  },
  {
    "url": "view/accountList/accountListView.html",
    "revision": "b691aa7242238162e96fe951ccc2c6e4"
  },
  {
    "url": "view/accountList/accountListView.js",
    "revision": "eadcd1cc8894c8636c38ae610d30360b"
  },
  {
    "url": "view/calendar/calendar.css",
    "revision": "69aeac8c1e3de4c0470e8d7d82d8f236"
  },
  {
    "url": "view/calendar/Calendar.js",
    "revision": "122a34334011aec113f4f22b25dbbec7"
  },
  {
    "url": "view/calendar/calendar2.html",
    "revision": "4f1bbc31577e5750267b9d7627f2e154"
  },
  {
    "url": "view/calendar/CalendarLibrary.js",
    "revision": "aa0f361a973d42a994ebf56653a8b54c"
  },
  {
    "url": "view/contactDetail/contactDetail.css",
    "revision": "c4649101ed2f3acdd7f6cf7b4a23f424"
  },
  {
    "url": "view/contactDetail/contactDetail.html",
    "revision": "5d19983176acdd694c9fdc4afee75b3d"
  },
  {
    "url": "view/contactDetail/contactDetail.js",
    "revision": "a76a5a7de3a3ba3ddd1f2d5e54a7df2c"
  },
  {
    "url": "view/dashboard/dashboard.html",
    "revision": "7d50a6ee976893a738f6a3eca031e9a4"
  },
  {
    "url": "view/globalCSS/bootstrap.min.css",
    "revision": "5057f321f0dc85cd8da94a0c5f67a8f4"
  },
  {
    "url": "view/globalCSS/inhousestyle.css",
    "revision": "a756a55188a87e4e03c8c5460d463d5d"
  },
  {
    "url": "view/globalCSS/spinner.css",
    "revision": "13064d66b89ebfc7ee8583a19b9bfb94"
  },
  {
    "url": "view/globalJS/bootstrap.min.js",
    "revision": "04c84852e9937b142ac73c285b895b85"
  },
  {
    "url": "view/globalJS/jquery-3.4.1.min.js",
    "revision": "a6b6350ee94a3ea74595c065cbf58af0"
  },
  {
    "url": "view/globalJS/main.js",
    "revision": "f701bc3360c21eaffdcbb556e1374470"
  },
  {
    "url": "view/globalJS/spinner.js",
    "revision": "19b8f6db4aabda5e66d3acd4f6c20bbf"
  },
  {
    "url": "view/globalJS/utility.js",
    "revision": "8e920895f0c3c56cf1d3ae32011a950f"
  },
  {
    "url": "view/homePage/homePage.css",
    "revision": "2e6866b888fc0d453b4d94fd1af0f6ec"
  },
  {
    "url": "view/homePage/homePage.html",
    "revision": "1c5a4da7fb72805992bc37e1b1eda682"
  },
  {
    "url": "view/homePage/homePage.js",
    "revision": "f76e20f8d4bbf6ce89080881856c1819"
  },
  {
    "url": "view/homePageTechnician/homePageTechnician.css",
    "revision": "6609f197496666eb8e9711b30ff5699c"
  },
  {
    "url": "view/homePageTechnician/homePageTechnician.html",
    "revision": "bcdbd22afc2f9f3d6f8d6f62eb1ec1f7"
  },
  {
    "url": "view/homePageTechnician/homePageTechnician.js",
    "revision": "7ad44c532837eb63c9447994bdb6cf87"
  },
  {
    "url": "view/leadCreate/createLead.css",
    "revision": "dc95bf6b15065604148459babbd563ea"
  },
  {
    "url": "view/leadCreate/createLead.html",
    "revision": "f6bfb92c32f8d3ab5209b2dd89bac438"
  },
  {
    "url": "view/leadCreate/createLead.js",
    "revision": "88454fbdb4d142d52d1d28509f399630"
  },
  {
    "url": "view/leadDetail/leadDetail.css",
    "revision": "045beeba63a8f738dce4bd38c22d7599"
  },
  {
    "url": "view/leadDetail/leadDetail.html",
    "revision": "009313a04227a94f05167f31a7d0b3a4"
  },
  {
    "url": "view/leadDetail/leadDetail.js",
    "revision": "ab5c68a7fe639e3fc53f29b454b5db41"
  },
  {
    "url": "view/leadDetail/leadDetailLanding.html",
    "revision": "2840374fbf98e62a9c6b6e67a829aa89"
  },
  {
    "url": "view/leadDetail/leadDetailLanding.js",
    "revision": "9172238dbd96920198fcbf21783327af"
  },
  {
    "url": "view/leadDetail/leadDetailMedia.html",
    "revision": "6aceea89ec5efefddb7e98cf0d7e3a5b"
  },
  {
    "url": "view/leadDetail/leadDetailMedia.js",
    "revision": "a1024788628ccde992e5b5173f0da8ad"
  },
  {
    "url": "view/leadDetail/leadDetailRelated.html",
    "revision": "fdf43eb7c12b65a7d3aa449b134e767e"
  },
  {
    "url": "view/leadDetail/leadDetailRelated.js",
    "revision": "865dc015bde3c4245486f44c1a8049a6"
  },
  {
    "url": "view/leadDetail/leadUtility.js",
    "revision": "514037e76ced91129f04c0b2a38d6af4"
  },
  {
    "url": "view/leadList/leadList.css",
    "revision": "b7bf9b32f3ba04e344791c2c3c88d42b"
  },
  {
    "url": "view/leadList/leadList.html",
    "revision": "887cb20e1e315c37e6a3b61527054401"
  },
  {
    "url": "view/leadList/leadList.js",
    "revision": "9ec8f48cae4491cd4c7a46a670431774"
  },
  {
    "url": "view/loginPage/index.css",
    "revision": "f9e6a524b821cac00125209bc2485ffd"
  },
  {
    "url": "view/loginPage/index.js",
    "revision": "8662e8c837a2546fd22f196878a0db7a"
  },
  {
    "url": "view/objectives/brandFreshness/brandFreshness.css",
    "revision": "f9932dc21f24119f82ba88a83d4606c9"
  },
  {
    "url": "view/objectives/brandFreshness/brandFreshness.html",
    "revision": "f6e661c3772effc2e257aa42eb4c2a8e"
  },
  {
    "url": "view/objectives/brandFreshness/brandFreshness.js",
    "revision": "1ab11008e451104f9de84c07163db588"
  },
  {
    "url": "view/objectives/brandFreshness/hygiene.css",
    "revision": "c41e4cdc5300f4377d196b8fca49efb8"
  },
  {
    "url": "view/objectives/brandFreshness/hygiene.html",
    "revision": "b254014b33e8b484975e069f9a6a6c11"
  },
  {
    "url": "view/objectives/brandFreshness/hygiene.js",
    "revision": "72bad88f24ad30ed37eed7a48efc2f56"
  },
  {
    "url": "view/objectives/checkout/checkout.css",
    "revision": "5072cba45ca8b8585b1cdb5cf562ed81"
  },
  {
    "url": "view/objectives/checkout/checkout.html",
    "revision": "6e48b3aaf1432d942cd6eefb63c936ad"
  },
  {
    "url": "view/objectives/checkout/checkout.js",
    "revision": "b830c4dc8e329d15ef0225acd5e21fa4"
  },
  {
    "url": "view/objectives/chemicalCIP/chemicalCIP.css",
    "revision": "509c22f1ee4d442e4288cb563eadb160"
  },
  {
    "url": "view/objectives/chemicalCIP/chemicalCIP.html",
    "revision": "4c08c8e66d67275d49d386949a44bfe7"
  },
  {
    "url": "view/objectives/chemicalCIP/chemicalCIP.js",
    "revision": "1f8adf3e3f28012ee05d6b73c00b2a8f"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsights.css",
    "revision": "5fc75c2283995208385ed4a4090bfb9f"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsightsPage1.html",
    "revision": "624760235a950f16d54bf24103c15cee"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsightsPage1.js",
    "revision": "83a98c4822d092dafcb8cf7c282f0649"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsightsPage2.html",
    "revision": "70df3798557a9c171a1f87eebc06d96a"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsightsPage2.js",
    "revision": "8285ac94afb2c62785f2defc06b326d5"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsightsPage3.html",
    "revision": "5ac3d7fb668b2217116e364b908e54b1"
  },
  {
    "url": "view/objectives/competitorInsights/competitionInsightsPage3.js",
    "revision": "d3865e7267478c4afc42ca06ec71f574"
  },
  {
    "url": "view/objectives/competitorInsightTechnician/competitorInsights.css",
    "revision": "2637e604ce700809f1c9c24e73a3f0ed"
  },
  {
    "url": "view/objectives/competitorInsightTechnician/competitorInsights.html",
    "revision": "f9caf2d9205692037a70d6f2e518e0dd"
  },
  {
    "url": "view/objectives/competitorInsightTechnician/competitorInsights.js",
    "revision": "54feddb064a610b2f655f523d7ce9882"
  },
  {
    "url": "view/objectives/draftPullout/draftPulloutSales.css",
    "revision": "ca120c432cb737fa025e9a9419123682"
  },
  {
    "url": "view/objectives/draftPullout/draftPulloutSales.html",
    "revision": "587d474c7eec858d25303650ea091a8e"
  },
  {
    "url": "view/objectives/draftPullout/draftPulloutSales.js",
    "revision": "0d8021ff267c5e020c76219b8f3e20ce"
  },
  {
    "url": "view/objectives/draftSignup/draftSignup.css",
    "revision": "ccfff72d6315ddbc274cab318506bb14"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupHomePage/draftSignupHomePage.css",
    "revision": "1bacbc6ffb9620a476754b4a4d8c08c3"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupHomePage/draftSignupHomePage.html",
    "revision": "ee13be354e5857e456a268d16ce26e58"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupHomePage/draftSignupHomePage.js",
    "revision": "0cefcf7cbcb54182a02a966a2736a7fe"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupKYC/draftSignupKYC.css",
    "revision": "cc2df6483d78de3e56b78e8844a97b20"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupKYC/draftSignupKYC.html",
    "revision": "c3485857445f1ae77d7fb60a5aea2f25"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupKYC/draftSignupKYC.js",
    "revision": "f2e0479a2a0d778068db87d1c8ed20e8"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupPOSM/draftSignupPOSM.css",
    "revision": "2ec9476dac2bc3fc79e0f5900d7c7c3b"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupPOSM/draftSignupPOSM.html",
    "revision": "268c8850a498ee25a2d286de04eb35fc"
  },
  {
    "url": "view/objectives/draftSignup/draftSignupPOSM/draftSignupPOSM.js",
    "revision": "4bd7dd4ca57840a4eea82607b782286e"
  },
  {
    "url": "view/objectives/kycDetail/kycDetail.css",
    "revision": "7fcec80953b2a7fd0c25c034d9fc4773"
  },
  {
    "url": "view/objectives/kycDetail/kycDetail.html",
    "revision": "a06ec9741d9c54b6a974b6d9f629e8f4"
  },
  {
    "url": "view/objectives/kycDetail/kycDetail.js",
    "revision": "80b2811520515a828c4cdc6cebe5e653"
  },
  {
    "url": "view/objectives/kycDetail/picklistUtility.js",
    "revision": "6aa9d59044fd0a38710eb6a3fdf8e965"
  },
  {
    "url": "view/objectives/kycDetail/segmentation.html",
    "revision": "a119f3578a41e9ff14ebd3a8a0e01866"
  },
  {
    "url": "view/objectives/kycDetail/segmentation.js",
    "revision": "42ee39d9fcbae8e9ab16633503047230"
  },
  {
    "url": "view/objectives/posm/posm.css",
    "revision": "3197f3a41574af169c1c1c6c29cdf019"
  },
  {
    "url": "view/objectives/posm/posm.html",
    "revision": "052ddce1667143461f018fe429446755"
  },
  {
    "url": "view/objectives/posm/posm.js",
    "revision": "7f4c73ec4ff06881e297e7ce26719ed1"
  },
  {
    "url": "view/objectives/preSales/preSalesInside/preSalesInside.css",
    "revision": "64282898f9ac62fcfb048de31778082d"
  },
  {
    "url": "view/objectives/preSales/preSalesInside/preSalesInside.html",
    "revision": "e5368643205ba8d9622166b5992c796f"
  },
  {
    "url": "view/objectives/preSales/preSalesInside/preSalesInside.js",
    "revision": "c466de9fd76b93b3eb26580a1ae3b97d"
  },
  {
    "url": "view/objectives/preSales/preSalesLanding.css",
    "revision": "da044231d24e487b960f79cc5c31ba27"
  },
  {
    "url": "view/objectives/preSales/preSalesLanding.html",
    "revision": "7f1a8e3873c086f935fcf0487667c57a"
  },
  {
    "url": "view/objectives/preSales/preSalesLanding.js",
    "revision": "aff38abced428705137a4657f7546cd4"
  },
  {
    "url": "view/objectives/salesOrder/salesOrder.css",
    "revision": "b524be17d020d76f129b4947cb91ac40"
  },
  {
    "url": "view/objectives/salesOrder/salesOrder.js",
    "revision": "47d91e98f56daef5ac5e1060c7f022c4"
  },
  {
    "url": "view/objectives/salesOrder/salesOrderLanding.html",
    "revision": "52b23616d549312e8f636def29f80ac3"
  },
  {
    "url": "view/objectives/salesOrder/salesOrderSummary.html",
    "revision": "46a5d3ad452977debee7375b656e328c"
  },
  {
    "url": "view/objectives/salesOrder/salesOrderSummary.js",
    "revision": "d408c7029d32506ca3cae8c762fea1d5"
  },
  {
    "url": "view/objectives/scheduleVisit/technicianScheduleVisit.css",
    "revision": "273f8f51b5931f56502a957504e2de51"
  },
  {
    "url": "view/objectives/scheduleVisit/technicianScheduleVisit.html",
    "revision": "5a1d1fa3ee9f23d645f663e5cfc2ed5e"
  },
  {
    "url": "view/objectives/scheduleVisit/technicianScheduleVisit.js",
    "revision": "1e434f814b293a818204799bf7d06ef6"
  },
  {
    "url": "view/objectives/stockVisibility/stockVisibility.css",
    "revision": "5a3054bc9aa6bc2e93e9c34878be5980"
  },
  {
    "url": "view/objectives/stockVisibility/stockVisibility.html",
    "revision": "5bd79770f8f47aefd5534f310a126a65"
  },
  {
    "url": "view/objectives/stockVisibility/stockVisibility.js",
    "revision": "7a163878cab4eca75a45bf796b9e7809"
  },
  {
    "url": "view/objectives/stockVisibility/visibilityChiller.css",
    "revision": "5c446733ecc7f72e115cefc9bb2a1cd5"
  },
  {
    "url": "view/objectives/stockVisibility/visibilityChiller.html",
    "revision": "ac9673ce81c74c3a98f6182e6320856b"
  },
  {
    "url": "view/objectives/stockVisibility/visibilityChiller.js",
    "revision": "c161bba651c189a2edfa484c987402e6"
  },
  {
    "url": "view/objectives/technicianInstallation/draftInstallation/draftInstallation.css",
    "revision": "81ae2638e40473e9434f79458fad92a9"
  },
  {
    "url": "view/objectives/technicianInstallation/draftInstallation/draftInstallation.html",
    "revision": "ec015f28e1ac36315775fce9c6723103"
  },
  {
    "url": "view/objectives/technicianInstallation/draftInstallation/draftInstallation.js",
    "revision": "0bc86c76a769a4b0d7641aabe6feb26c"
  },
  {
    "url": "view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.css",
    "revision": "fe2ae6a451656c7485b3a42b94468af9"
  },
  {
    "url": "view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.html",
    "revision": "452370c8378d49b52906ba70fa6fa463"
  },
  {
    "url": "view/objectives/technicianInstallation/draftInstallation/draftInstallationRequisition/draftInstallationRequisition.js",
    "revision": "4b0a53a99e88e75fd93a3505bdaa28ac"
  },
  {
    "url": "view/objectives/technicianInstallation/draftPreInstallation/draftPreInstallation.css",
    "revision": "17a900424cabc77cbef78b681f2630f9"
  },
  {
    "url": "view/objectives/technicianInstallation/draftPreInstallation/draftPreInstallation.html",
    "revision": "dc931a4f02c844d1e87b12cc56540459"
  },
  {
    "url": "view/objectives/technicianInstallation/draftPreInstallation/draftPreInstallation.js",
    "revision": "3fbc4d396dc92c412f6e5d39621796e6"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianInstallationHomePage.css",
    "revision": "f4b901a22d969f8b740ec1ff5c1e10e9"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianInstallationHomePage.html",
    "revision": "62af83ffca3dd630918228f27073fdd2"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianInstallationHomePage.js",
    "revision": "2d6b4635466ce9ea6e73e4cc4c5894a7"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianMachineCommissioning/technicianMachineCommissioning.css",
    "revision": "ed217130e7306cb1545188344a7ca674"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianMachineCommissioning/technicianMachineCommissioning.html",
    "revision": "ee8dcbe289f40677a9cafca4a471db0c"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianMachineCommissioning/technicianMachineCommissioning.js",
    "revision": "c90c7320c0ef9e4219a21e1ff4e1c983"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianTraining/technicianTraining.css",
    "revision": "09ca3742efe28bc3c63d654ac2d49bf7"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianTraining/technicianTraining.html",
    "revision": "63ae30ddefa3f5b163c2164c2d69344f"
  },
  {
    "url": "view/objectives/technicianInstallation/technicianTraining/technicianTraining.js",
    "revision": "0ab7bc49acdaf53315ceb41d60999ada"
  },
  {
    "url": "view/objectives/technicianMaitainence/draftMaintainenceHomePage.css",
    "revision": "edc0befcf08eb3d1aa4b82793ebd748a"
  },
  {
    "url": "view/objectives/technicianMaitainence/draftMaintainenceHomePage.html",
    "revision": "b2c94f6d4a565a367742c0a8be3daa17"
  },
  {
    "url": "view/objectives/technicianMaitainence/draftMaintainenceHomePage.js",
    "revision": "d0e2afbf0620e3780ce6ac14467fe59f"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization.css",
    "revision": "8f4e22044c363365e31e17b36c34105d"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization1.html",
    "revision": "a0ee0a3a36a76fe88bda5abf48425999"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization1.js",
    "revision": "cac2c188af4a7789b9b5921ba6ba768d"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization2.html",
    "revision": "a4405a2f0d6291d9a0fd05a7dda8aed1"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization2.js",
    "revision": "d64ad4d002bed634aa2ff7f16168b9b0"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization3.html",
    "revision": "a4df80c7ea8f05b350f1be315d47e8bd"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization3.js",
    "revision": "9deb404af8a1f49e4bf4ee2135ac762c"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization4.html",
    "revision": "e8e84b98d11d9a9499ecd70da565a34e"
  },
  {
    "url": "view/objectives/technicianMaitainence/technicianSanitization/technicianSanitization4.js",
    "revision": "a5ea130a3bd65337a1838003ad720e2d"
  },
  {
    "url": "view/objectives/warehouseQualityCheck/warehouseQualityCheck.css",
    "revision": "cfa6b53d3968575cac5418dc76ba6660"
  },
  {
    "url": "view/objectives/warehouseQualityCheck/warehouseQualityCheck.html",
    "revision": "d1984f456fb9041c7a0cf24e5faa2093"
  },
  {
    "url": "view/objectives/warehouseQualityCheck/warehouseQualityCheck.js",
    "revision": "d68f59d996966e9a04daf6451e146379"
  },
  {
    "url": "view/preInstallationApproval/preInstallationApproval.css",
    "revision": "8341f0c3b3ece29bd0005b112baaf126"
  },
  {
    "url": "view/preInstallationApproval/preInstallationApproval.html",
    "revision": "723fff65088c3d52abd68f20d2bf7846"
  },
  {
    "url": "view/preInstallationApproval/preInstallationApproval.js",
    "revision": "781ac9193b99694e8d6d74c4e99cefb6"
  },
  {
    "url": "view/pulloutApproval/pulloutApproval.css",
    "revision": "3349ea9e9021ca2c2476bbc2fbf00b92"
  },
  {
    "url": "view/pulloutApproval/pulloutApproval.html",
    "revision": "dfdbb4264381acd232797aae84d983b1"
  },
  {
    "url": "view/pulloutApproval/pulloutApproval.js",
    "revision": "2ce4461b27a2ea23f45d6a808299530d"
  },
  {
    "url": "view/sellingTools/sellingTools.css",
    "revision": "8138b9464deb572e9aaefeb35591b1a9"
  },
  {
    "url": "view/sellingTools/sellingTools.html",
    "revision": "9e58b41b827b8e3d0ebd821cbaf80504"
  },
  {
    "url": "view/sellingTools/sellingTools.js",
    "revision": "0ac4bac55faf685b89b29a52ac7c3554"
  },
  {
    "url": "view/sellingToolsListView/fileViewer.html",
    "revision": "427738097c5c00b94c722fee7c549264"
  },
  {
    "url": "view/sellingToolsListView/fileViewer.js",
    "revision": "92ae6340a3aedc2c48e373fc0feeb47d"
  },
  {
    "url": "view/sellingToolsListView/sellingToolsListView.css",
    "revision": "76b5a5d3c83361e6de7f5d77b1e3364e"
  },
  {
    "url": "view/sellingToolsListView/sellingToolsListView.html",
    "revision": "5d2b16f745287e4c060d9613e209a7c0"
  },
  {
    "url": "view/sellingToolsListView/sellingToolsListView.js",
    "revision": "65da2327c15de8fd29ea49caad817860"
  },
  {
    "url": "view/splashScreen/splashScreen.html",
    "revision": "a2f51272fdd52f6e36bbd5feb19af1ad"
  },
  {
    "url": "view/syncPage/loadingPage.css",
    "revision": "bbcd12e31493836b83c4d0a34250baf5"
  },
  {
    "url": "view/syncPage/loadingPage.html",
    "revision": "5f8548977cf085b6cc873b1127cd5773"
  },
  {
    "url": "view/syncPage/loadingPage.js",
    "revision": "4dd346330c9ec75efaa32604067a88dd"
  }
],{

ignoreURLParametersMatching: [/.*/]

});


const cacheFirst = ({url,event}) => {
  let cdnSet = new Set();
  cdnSet.add('/media/icons/manifest/app-icon-144x144.png');
  cdnSet.add('https://use.fontawesome.com/releases/v5.3.1/css/all.css');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css');
  cdnSet.add('https://cdn.jsdelivr.net/npm/browser-image-compression@latest/dist/browser-image-compression.js');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
  cdnSet.add('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js');
  cdnSet.add('//mozilla.github.io/pdf.js/build/pdf.js');
  
  return (cdnSet.has(url.href));
};


const cacheOnly = ({url,event}) => {

};


const staleWhileRevalidate = ({url,event}) => {
  
};

workbox.routing.registerRoute(cacheFirst,
  new workbox.strategies.CacheFirst());
