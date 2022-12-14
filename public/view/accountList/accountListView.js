let listOfAccount;
initializeAccount = (accountLists) => {
    listOfAccount = accountLists;


};
showListOfAccount = (stIndex = 0) => {
    var tmp = '';
    if(stIndex===0){
        $('#listOfAcc').html('');
    }
    
    if (listOfAccount && listOfAccount.length > 0) {
        for (var i = stIndex; i < listOfAccount.length; i++) {
            tmp += '<li class="accountList"  >';
            tmp += '    <div class="main-head" onclick=accountDetail("' + [i] + '")>';
            tmp += '        <span class="accountName">' + listOfAccount[i].Name + '</span> <br/>';
            tmp += '      <div class="heading">';
            // tmp += '        <span class="accountName">' + listOfAccount[i].Name + '</span> <br/>';
            if ((listOfAccount[i].Channel__c && listOfAccount[i].Account_Status__c)) {
                tmp += '       <p style="margin-left:3%;">' + (listOfAccount[i].Channel__c ? listOfAccount[i].Channel__c + '<span class="division"> | </span>' : 'NA');
                tmp += '         ' + (listOfAccount[i].Account_Status__c ? listOfAccount[i].Account_Status__c : '') + '</p>';
            }
            else {
                if (listOfAccount[i].Channel__c) {
                    tmp += '       <p style="margin-left:3%;">' + (listOfAccount[i].Channel__c ? listOfAccount[i].Channel__c + '</p>' : 'NA');
                }
                if (listOfAccount[i].Account_Status__c) {
                    tmp += '       <p style="margin-left:3%;>  ' + (listOfAccount[i].Account_Status__c ? listOfAccount[i].Account_Status__c : '') + '</p>';
                }
            }
            if ((listOfAccount[i].L3M_Billed_Liquids__c && listOfAccount[i].L1M_Billed_Liquids__c)) {
                tmp += '       <p style="margin-left:3%;">' + (listOfAccount[i].L1M_Billed_Liquids__c ? listOfAccount[i].L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
                tmp += '         ' + (listOfAccount[i].L3M_Billed_Liquids__c ? listOfAccount[i].L3M_Billed_Liquids__c : '') + '</p>';
            }
            else {
                
                
                if (listOfAccount[i].L3M_Billed_Liquids__c) {
                    tmp += '       <p style="margin-left:3%;">' + (listOfAccount[i].L3M_Billed_Liquids__c ? listOfAccount[i].L3M_Billed_Liquids__c + '</p>' : 'NA');
                }
                if (listOfAccount[i].L1M_Billed_Liquids__c) {
                    
                    tmp += '       <p style="margin-left:3%;">  ' + (listOfAccount[i].L1M_Billed_Liquids__c ? listOfAccount[i].L1M_Billed_Liquids__c : '') + '</p>';
                }
            }
            if (listOfAccount[i].Recent_Retail_Depletion__c) {
                tmp += '  <p style="margin-left:3%;"> Last Order : ' + (listOfAccount[i].Recent_Retail_Depletion__c ? new Date(listOfAccount[i].Recent_Retail_Depletion__c).toLocaleString("en-IN", {
                    day: 'numeric',
                    month: 'short',
                }) : '');
                tmp += '</p>';
            }
            if(listOfAccount[i].Beer_Selection__c === "Boom"){
                tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
            }

            if(listOfAccount[i].Beer_Selection__c === "Premium"){
                tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
            }
            tmp += '      </div>';
            
            tmp += '       <div class="feat">';
            tmp += '         <div>';
           
            if (listOfAccount[i].Bira_Segment__c != null) {
                if (listOfAccount[i].Bira_Segment__c === "A+") {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
                } else if (listOfAccount[i].Bira_Segment__c === "A") {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
                } else if (listOfAccount[i].Bira_Segment__c === "B") {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
                } else {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
                }

            }
            else {
                    tmp += '  <span class="name"></span>';
            }

            if (listOfAccount[i].Industry_Segment__c != null) {
                if (listOfAccount[i].Industry_Segment__c === "P0") {
                    tmp += '  <span class="name" style="position:relative;top:-1px;"><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
                } else if (listOfAccount[i].Industry_Segment__c === "P1") {
                    tmp += '  <span class="name" style="position:relative;top:-1px;"><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
                } else if (listOfAccount[i].Industry_Segment__c === "P2") {
                    tmp += '  <span class="name" style="position:relative;top:-1px;"><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
                } else {
                    tmp += '  <span class="name" style="position:relative;top:-1px;"><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
                }
            }
            else {
                tmp += '  <span class="name"></span>';
            }

            if (listOfAccount[i].Industry_Segment_Mass__c != null) {
                if (listOfAccount[i].Industry_Segment_Mass__c === "M0") {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
                } else if (listOfAccount[i].Industry_Segment_Mass__c === "M1") {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
                } else if (listOfAccount[i].Industry_Segment_Mass__c === "M2") {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
                } else {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
                }

            }
            else {
                tmp += '  <span class="name"></span>';
            }

            tmp += '         </div>';



            tmp += '         <div>';

            if (listOfAccount[i].Beacon_Flag__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }


            if (listOfAccount[i].Draft_Ready__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }


            if (listOfAccount[i].QCO_Flag__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }

            tmp += '       </div>';
            tmp += '       </div>';

            tmp += '    </div>';
            tmp += '</li>';
        }
        $('#listOfAcc').append(tmp);

        showNotification({ message: 'Total records : ' + listOfAccount.length });
    }
    else {
        showNotification({ message: 'No records Found!' });
    }

};

accountDetail =async (accountIndex) => {
    const recordTypeName = listOfAccount[accountIndex].RecordType.DeveloperName;
    let nonSales = await isTechnicianAuditorFuncHelper();
    if(nonSales.isSales){
        if (recordTypeName === 'Distributor_Warehouse') {
            window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Distributor') {
            window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'On_Premise_General') {
            window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Consumer') {
            window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Institutional_Off_Premise') {
            window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Institutional_On_Premise') {
            window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Non_beer_Warehouse') {
            window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Off_Premise_Outlet') {
            window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'On_Premise_Hotel') {
            window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Supplier') {
            window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Temporary_Event') {
            window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
        else if (recordTypeName === 'Wholesaler') {
            window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id=' + listOfAccount[accountIndex].Id;
        }
    }
    else if(nonSales.isTech){
        window.location.href = '/view/accountDetailLandingTechnician/accountDetailLandingTechnician.html?accountId='+listOfAccount[accountIndex].Id;
    }
    else if(nonSales.isAudit){
        window.location.href = '/view/accountDetailLandingAuditor/accountDetailLandingAuditor.html?accountId='+listOfAccount[accountIndex].Id;
    }
    
};
let channelMap = new Map([
    ["On-Premise", ["Hotel", "General", "Resorts", "Hostels", "Home-Stays", "Bed-and-Breakfasts", "Guesthouses", "Cottages", "Villas", "Luxury-Hotels", "Business-Hotels", "Economy-Hotels", "Restaurant", "Bar", "Club"]],
    ["Off-Premise", ["Retail-Account", "Wholesaler", "Modern-Trade", "Convenience-Store", "Gas-Station", "Drug-Store", "Liquor-Shop", "Wine-and-Beer-Shop", "Home-Distributor", "Diplomatic-Store"]],
    ["Institutional", ["Military", "Airlines", "Railways", "Cruise-Ships", "Stadiums", "Duty-Free", "Canteen-Store-Department-On", "Canteen-Store-Department-Off"]],
    ["Temporary-Event", ["Food-Festival", "Exhibition", "Music-Festival", "Others"]]
]);


let checkBoxLabel = [];
onChangeHandler = (ele) => {
    let channelName = $(ele).prop("value");

    if ($(ele).prop("checked")) {
        checkBoxLabel.push(channelName);
        $("input[name='subChannel']").parent().css("display", "none");
        $("input[name='type']").parent().css("display", "none");
        $("input[name='size']").parent().css("display", "none");
        for (var i = 0; i < checkBoxLabel.length; i++) {


            for (var j = 0; j < channelMap.get(checkBoxLabel[i]).length; j++) {


                if ($("input[type='checkbox']").hasClass(channelMap.get(checkBoxLabel[i])[j])) {

                    $('.' + channelMap.get(checkBoxLabel[i])[j]).parent().css("display", "block");
                }
            }

            if (checkBoxLabel == 'Temporary-Event') {
                $("input[name='size']").parent().css("display", "none");
            }
            else {
                $("input[name='size']").parent().css("display", "block");
            }
        }
    }
    else {
        checkBoxLabel.splice($.inArray(channelName, checkBoxLabel), 1);

        for (var i = 0; i < channelMap.get(channelName).length; i++) {
            $('.' + channelMap.get(channelName)[i]).prop("checked", false);
        }

        if (checkBoxLabel.length > 0) {
            $("input[name='subChannel']").parent().css("display", "none");
            $("input[name='type']").parent().css("display", "none");
            $("input[name='size']").parent().css("display", "none");
            for (var i = 0; i < checkBoxLabel.length; i++) {

                for (var j = 0; j < channelMap.get(checkBoxLabel[i]).length; j++) {
                    if ($("input[type='checkbox']").hasClass(channelMap.get(checkBoxLabel[i])[j])) {
                        $('.' + channelMap.get(checkBoxLabel[i])[j]).parent().css("display", "block");
                    }
                }
                if (checkBoxLabel == 'Temporary-Event') {
                    $("input[name='size']").parent().css("display", "none");
                }
                else {
                    $("input[name='size']").parent().css("display", "block");
                }
            }
        }
        else {
            $("input[name='subChannel']").parent().css("display", "block");
            $("input[name='size']").parent().css("display", "block");
            $("input[name='type']").parent().css("display", "block");
        }
    }

};


let subChannelMap = new Map([
    ["Hotel", ["On-Premise", "Resorts", "Hostels", "Guesthouses", "Home-Stays", "Cottages", "Villas", "Bed-and-Breakfasts", "Luxury Hotels", "Business Hotels", "Economy Hotels"]],
    ["General", ["On-Premise", "Restaurant", "Bar", "Club"]],
    ["Retail-Account", ["Off-Premise", "Modern-Trade", "Convenience-Store", "Gas-Station", "Drug-Store", "Liquor-Shop", "Wine-and-Beer-Shop", "Home-Distributor", "Diplomatic-Store"]],
    ["Wholesaler", ["Off-Premise", "Modern-Trade", "Convenience-Store", "Gas-Station", "Drug-Store", "Liquor-Shop", "Wine-and-Beer-Shop", "Home-Distributor", "Diplomatic-Store"]],
    ["Military", ["Institutional", "Canteen-Store-Department-On", "Canteen-Store-Department-Off"]],
    ["Airlines", ["Institutional", "Airlines"]],
    ["Railways", ["Institutional", "Railways"]],
    ["Cruise-Ships", ["Institutional", "Cruise-Ships"]],
    ["Stadiums", ["Institutional", "Stadiums"]],
    ["Duty-Free", ["Institutional", "Duty-Free"]],
]);


let checkBoxSubLabel = [];
onChangeSubHandler = (ele) => {
    let channelName = $(ele).prop("value");

    if ($(ele).prop("checked")) {
        checkBoxSubLabel.push(channelName);
        $("input[name='type']").parent().css("display", "none");
        $("input[name='channel[]']").parent().css("display", "none");
        $("input[name='size']").parent().css("display", "none");
        for (var i = 0; i < checkBoxSubLabel.length; i++) {

            for (var j = 0; j < subChannelMap.get(checkBoxSubLabel[i]).length; j++) {
                console.log(subChannelMap.get(checkBoxSubLabel[i])[j]);
                if ($("input[type='checkbox']").hasClass(subChannelMap.get(checkBoxSubLabel[i])[j])) {

                    $('.' + subChannelMap.get(checkBoxSubLabel[i])[j]).parent().css("display", "block");
                }
            }
            if (checkBoxSubLabel == 'Hotel') {
                $("input[name='size']").parent().css("display", "none");
            }
            else {
                $("input[name='size']").parent().css("display", "block");
            }
        }
    }
    else {
        checkBoxSubLabel.splice($.inArray(channelName, checkBoxSubLabel), 1);

        for (var i = 0; i < subChannelMap.get(channelName).length; i++) {
            $('.' + subChannelMap.get(channelName)[i]).prop("checked", false);
        }

        if (checkBoxSubLabel.length > 0) {
            $("input[name='type']").parent().css("display", "none");
            $("input[name='channel[]']").parent().css("display", "none");
            $("input[name='size']").parent().css("display", "none");
            for (var i = 0; i < checkBoxSubLabel.length; i++) {
                //console.log('i',subChannelMap.get(checkBoxSubLabel[i]).length);

                for (var j = 0; j < subChannelMap.get(checkBoxSubLabel[i]).length; j++) {
                    // console.log(subChannelMap.get(checkBoxSubLabel[i])[j]);

                    if ($("input[type='checkbox']").hasClass(subChannelMap.get(checkBoxSubLabel[i])[j])) {

                        $('.' + subChannelMap.get(checkBoxSubLabel[i])[j]).parent().css("display", "block");
                    }
                }
                if (checkBoxSubLabel == 'Hotel') {
                    $("input[name='size']").parent().css("display", "none");
                }
                else {
                    $("input[name='size']").parent().css("display", "block");
                }
            }
        }
        else {
            $("input[name='type']").parent().css("display", "block");
            $("input[name='channel[]']").parent().css("display", "block");
            $("input[name='size']").parent().css("display", "block");
        }
    }

};

let typeMap = new Map([
    ["Resorts", ["Hotel", "On-Premise"]],
    ["Hostels", ["Hotel", "On-Premise"]],
    ["Guesthouses", ["Hotel", "On-Premise"]],
    ["Home-Stays", ["Hotel", "On-Premise"]],
    ["Cottages", ["Hotel", "On-Premise"]],
    ["Villas", ["Hotel", "On-Premise"]],
    ["Bed-and-Breakfasts", ["Hotel", "On-Premise"]],
    ["Luxury-Hotels", ["Hotel", "On-Premise"]],
    ["Business-Hotels", ["Hotel", "On-Premise"]],
    ["Economy-Hotels", ["Hotel", "On-Premise"]],
    ["Restaurant", ["General", "On-Premise"]],
    ["Bar", ["General", "On-Premise"]],
    ["Club", ["General", "On-Premise"]],
    ["Modern-Trade", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Convenience-Store", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Gas-Station", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Drug-Store", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Liquor-Shop", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Wine-and-Beer-Shop", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Home-Distributor", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Diplomatic-Store", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Modern-Trade", ["Wholesaler", "Retail-Account", "Off-Premise"]],
    ["Canteen-Store-Department-On", ["Military", "Institutional"]],
    ["Canteen-Store-Department-Off", ["Military", "Institutional"]],
    ["Airlines", ["Airlines", "Institutional"]],
    ["Railways", ["Railways", "Institutional"]],
    ["Cruise-Ships", ["Cruise-Ships", "Institutional"]],
    ["Stadiums", ["Stadiums", "Institutional"]],
    ["Duty-Free", ["Duty-Free", "Institutional"]],
    ["Food-Festival", ["Temporary-Event"]],
    ["Exhibition", ["Temporary-Event"]],
    ["Music-Festival", ["Temporary-Event"]],
    ["Others", ["Temporary-Event"]],
]);


let checkBoxTypeLabel = [];
onChangeTypeHandler = (ele) => {
    let channelName = $(ele).prop("value");
    console.log(channelName);
    if ($(ele).prop("checked")) {
        checkBoxTypeLabel.push(channelName);
        $("input[name='subChannel']").parent().css("display", "none");
        $("input[name='channel[]']").parent().css("display", "none");
        for (var i = 0; i < checkBoxTypeLabel.length; i++) {

            for (var j = 0; j < typeMap.get(checkBoxTypeLabel[i]).length; j++) {
                //  console.log(typeMap.get(checkBoxTypeLabel[i])[j]);
                if ($("input[type='checkbox']").hasClass(typeMap.get(checkBoxTypeLabel[i])[j])) {

                    $('.' + typeMap.get(checkBoxTypeLabel[i])[j]).parent().css("display", "block");
                }
            }
        }
    }
    else {
        checkBoxTypeLabel.splice($.inArray(channelName, checkBoxTypeLabel), 1);
        checkBoxLabel = [];
        checkBoxSubLabel = [];
        for (var i = 0; i < typeMap.get(channelName).length; i++) {
            $('.' + typeMap.get(channelName)[i]).prop("checked", false);
        }

        if (checkBoxTypeLabel.length > 0) {
            $("input[name='subChannel']").parent().css("display", "none");
            $("input[name='channel[]']").parent().css("display", "none");
            for (var i = 0; i < checkBoxTypeLabel.length; i++) {
                // console.log('i',typeMap.get(checkBoxTypeLabel[i]).length);

                for (var j = 0; j < typeMap.get(checkBoxTypeLabel[i]).length; j++) {
                    //  console.log(typeMap.get(checkBoxTypeLabel[i])[j]);

                    if ($("input[type='checkbox']").hasClass(typeMap.get(checkBoxTypeLabel[i])[j])) {

                        $('.' + typeMap.get(checkBoxTypeLabel[i])[j]).parent().css("display", "block");
                    }
                }
            }
        }
        else {
            $("input[name='subChannel']").parent().css("display", "block");
            $("input[name='channel[]']").parent().css("display", "block");
        }
    }

};


clearFilter = () => {
    var inputCheck = $("input:checkbox");
    var inputRadio = $("input:radio");

    for (var i = 0; i < inputCheck.length; i++) {
        $(inputCheck[i]).prop('checked', false);
        $(inputCheck[i]).parent().css('display', 'block');
    }

    for (var i = 0; i < inputRadio.length; i++) {
        $(inputRadio[i]).prop('checked', false);
    }
};

var sortDir = true;
$('.filCom i').css('display', 'none');
sortingFields = (fieldName) => {
    showLoader();
    $('.filCom i').css('display', 'none');
    if (sortDir === true) {
        sortDir = false;
        $("." + fieldName + " .fa-arrow-down").css('display', 'inline-block');
        $("." + fieldName + " .fa-arrow-up").css('display', 'none');
    }
    else {
        sortDir = true;
        $("." + fieldName + " .fa-arrow-down").css('display', 'none');
        $("." + fieldName + " .fa-arrow-up").css('display', 'inline-block');
    }

    setTimeout(() => {
        listOfAccount = sortList(fieldName, listOfAccount, sortDir);
        hideLoader();
    }, 100);
};





showLoader = () => {
    $('#loader-main').css('display', 'block');
};

hideLoader = () => {
    $('#loader-main').css('display', 'none');
};

applyFilter = async() => {
    accountLists = [];
    listOfAccount = [];
    openCursor = null;
    filterAccounts();
    
    
};

//setup before functions
let typingTimer;                //timer identifier
let doneTypingInterval = 3000;  //time in ms, 5 second for example
let $input = $('#searchValue');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(applyFilter, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});
