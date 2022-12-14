

function openNav() {
    document.getElementById("sideNav").style.left = "0px";
    document.getElementById("sideNav").style.boxShadow = "rgb(0, 0, 0) 0 0 13px 6px";
    document.getElementById("backdraw").style.left = "0";
}


var sideNav = document.getElementById("backdraw");

window.onclick = function (event) {
    var navBar = document.getElementById("sideNav");
    if (event.target == sideNav) {
        navBar.style.left = "-250px";
        navBar.style.boxShadow = "0px 0px 0px 0px #000000";
        document.getElementById("backdraw").style.left = "-100%";
    }
};
// $(document).ready(function(){
//     let $a = $(".sidenav a");
//     for (var i = 0; i < 5; i += 6) {
//         var $div = $("<div/>", {
//             class: 'inside-nav'
//         });
//         $a.slice(i, i + 5).wrapAll($div);
//     }
// });


showNotification = (data) =>{
    if(!$('#notification').length)
    {
        let tmp = `
            <div id='notification' style="display: block;">
                <span></span>
                <a href="#" class="close-notify">X</a>
            </div>
        `;

        $('body').append(tmp);
    }
    $("#notification").fadeIn("slow");
    $("#notification span").html(data.message);
    $("#notification a.close-notify").click(function() {
        $("#notification").fadeOut("slow");
        return false;
    });
    setTimeout(() => {
        $("#notification").fadeOut("slow");
    },3000);
};

// Loader JS
createLoader = () =>{
    let tmp = '';
    if($('#loader-main').length === 0){
        tmp +='<div id="loader-main">';
        tmp +='<div class="loader1" >Loading...</div>';
        tmp +='</div>';    
        $('#app').append(tmp);
    }
    
};


createModalPopUp = () =>{
    let tmp = '';

    
    tmp +='<div id="logoutModal" class="modal fade" role="dialog">';
    tmp +='     <div class="modal-dialog">';
    tmp +='         <div class="modal-content">';
    tmp +='             <div class="modal-header">';
    tmp +='                 <button type="button" class="close" data-dismiss="modal">&times;</button>';
    tmp +='             </div>';
    tmp +='             <div class="modal-body text-center">';
    tmp +='                 <h5>Are you sure you want to log out? All un-synced data will be lost.</h5>';
    tmp +='             </div>';
    tmp +='             <div class="modal-footer text-center">';
    tmp +='                 <button type="button" onclick="clearAll()" class="btn btn-danger">Yes</button>';
    tmp +='                 <button type="button" class="btn btn-success" data-dismiss="modal">No</button>';
    tmp +='             </div>';
    tmp +='         </div>';
    tmp +='     </div>';
    tmp +='</div>';


    $('#app').append(tmp);
};

createModalPopUp();

const fetchCurrentDateIdStr = () => {
    return (new Date().toDateString());
};



const checkErrorGeolocation = (e) => {
    switch(e.code) {
        case 1:
            showNotification({message: 'User denied the request for Geolocation.'});
          //x.innerHTML = "User denied the request for Geolocation."
          //Display notification using above message;
          break;
        case 2:
            showNotification({message: 'Location information is unavailable.'});
            alert('Location information is unavailable.');
          //x.innerHTML = "Location information is unavailable."
          //Display notification using above message;
          break;
        case 3:
            showNotification({message: 'The request to get user location timed out.'});
            
          //x.innerHTML = "The request to get user location timed out."
          //Display notification using above message;
          break;
        default:
            showNotification({message: 'An unknown error occurred.'});
            
          //x.innerHTML = "An unknown error occurred."
          //Display notification using above message;
          break;
      }
      $('#loader-main').css('display','none');
      
     
      
  //return false;// Display custom error message on front page 
};


const getCurrentLocationHelper = ()=> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 12000,
            maximumAge: 0
        });
    });
};

//  Bottom Bar Code Start ========================================================================


const generateBottomBarModal = () => {
    let tmp = `
    <div class="modal fade" id="bottomBarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title text-center" style="color:white;" id="bottomBarModalHeading" ></h4>
                    
                </div>
                 <div class="modal-body">
                 <div id="startTripBtnBottomBar">
                   
                 </div>
                 <div id="showAccountsBottomBar" style="display: none">
                    
                    <div class="input-icons">
                        <i class="fa fa-search"></i>
                        <input class="input-field-bottombar" id="accountNameBottomBar"  type="text"   placeholder="Search Account Name..." >
                    </div>
        
                        <div id="accountListBottomBar">
        
        
                        </div>
                    </div>
                 </div>
                <div class="modal-footer" style="text-align:right;">
                    <button type="button" class="btn btn-danger"   data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;

    $('body').append(tmp);
        //setup before functions
    let typingTimerBottomBar;                //timer identifier
    let doneTypingIntervalBottomBar = 2000;  //time in ms, 5 second for example
    let $inputBottomBar = $('#accountNameBottomBar');

    //on keyup, start the countdown
    $inputBottomBar.on('keyup', function () {
        clearTimeout(typingTimerBottomBar);
        typingTimerBottomBar = setTimeout(searchBottomBar, doneTypingIntervalBottomBar);
    });
    
    //on keydown, clear the countdown 
    $inputBottomBar.on('keydown', function () {
    clearTimeout(typingTimerBottomBar);
    });
};

const showAccountBottomBar = () => {
    let tmp = "";
    let isAccountVisible = false;
    $("#accountListBottomBar").html('');
    
        if (listOfAccountBottomBar && listOfAccountBottomBar.length > 0) {
            let height = window.innerHeight - 200;
    
            $('#bottomBarModal .modal-body').css('height',`${height}px`)
        

            for (var i = 0; i < listOfAccountBottomBar.length; i++) {
                
                if(bottomIconClicked === iconsBottomBar.posm_requisition&&listOfAccountBottomBar[i].RecordType.DeveloperName!=='Lead'&&isPosmAllowedBottomBar(listOfAccountBottomBar[i])){
                isAccountVisible = true;
                tmp += '<li class="accountList2"  >';
                tmp += '    <div class="main-head" onclick=accountSelectedBottomBar("' + [i] + '")>';
                tmp += '        <span class="accountName">' + listOfAccountBottomBar[i].Name + '</span> <br/>';
                tmp += '      <div class="heading">';
                // tmp += '        <span class="accountName">' + listOfAccount[i].Name + '</span> <br/>';
                if ((listOfAccountBottomBar[i].Channel__c && listOfAccountBottomBar[i].Account_Status__c)) {
                    tmp += '       <p >' + (listOfAccountBottomBar[i].Channel__c ? listOfAccountBottomBar[i].Channel__c + '<span class="division"> | </span>' : 'NA');
                    tmp += '         ' + (listOfAccountBottomBar[i].Account_Status__c ? listOfAccountBottomBar[i].Account_Status__c : '') + '</p>';
                }
                else {
                    if (listOfAccountBottomBar[i].Channel__c) {
                        tmp += '       <p >' + (listOfAccountBottomBar[i].Channel__c ? listOfAccountBottomBar[i].Channel__c + '</p>' : 'NA');
                    }
                    if (listOfAccountBottomBar[i].Account_Status__c) {
                        tmp += '       <p >  ' + (listOfAccountBottomBar[i].Account_Status__c ? listOfAccountBottomBar[i].Account_Status__c : '') + '</p>';
                    }
                }
                
                tmp += '      </div>';
                
              
                tmp += '    </div>';
                tmp += '</li>';
                }
                else if(bottomIconClicked === iconsBottomBar.book_order){
                isAccountVisible = true;
                tmp += '<li class="accountList2"  >';
                tmp += '    <div class="main-head" onclick=accountSelectedBottomBar("' + [i] + '")>';
                tmp += '        <span class="accountName">' + listOfAccountBottomBar[i].Name + '</span> <br/>';
                tmp += '      <div class="heading">';
                // tmp += '        <span class="accountName">' + listOfAccount[i].Name + '</span> <br/>';
                if ((listOfAccountBottomBar[i].Channel__c && listOfAccountBottomBar[i].Account_Status__c)) {
                    tmp += '       <p >' + (listOfAccountBottomBar[i].Channel__c ? listOfAccountBottomBar[i].Channel__c + '<span class="division"> | </span>' : 'NA');
                    tmp += '         ' + (listOfAccountBottomBar[i].Account_Status__c ? listOfAccountBottomBar[i].Account_Status__c : '') + '</p>';
                }
                else {
                    if (listOfAccountBottomBar[i].Channel__c) {
                        tmp += '       <p >' + (listOfAccountBottomBar[i].Channel__c ? listOfAccountBottomBar[i].Channel__c + '</p>' : 'NA');
                    }
                    if (listOfAccountBottomBar[i].Account_Status__c) {
                        tmp += '       <p >  ' + (listOfAccountBottomBar[i].Account_Status__c ? listOfAccountBottomBar[i].Account_Status__c : '') + '</p>';
                    }
                }
                
                tmp += '      </div>';
                
              
                tmp += '    </div>';
                tmp += '</li>';
                }
                
            }
            $("#accountListBottomBar").append(tmp);
        }
        if(!isAccountVisible){
            $("#accountListBottomBar").append(`<div class="alert alert-info" role="alert">No Account Found or Search key not found!</div>`);
        }

};

const iconsBottomBar = {
    book_order : 'Book_Order',
    posm_requisition : 'posm',
};
let listOfAccountBottomBar;
let mainAccountBottomBar;
let bookOrderBottomBar = $('.nav-img').eq(0);
let posmBottomBar = $('.nav-img').eq(1);
let bottomIconClicked = null;
$(posmBottomBar).click(async function(e){
    const nonSales = await isTechnicianAuditorFuncHelper();
    if(!nonSales.isSales){
        e.preventdefault();
    }
    bottomIconClicked = iconsBottomBar.posm_requisition;
    await modalBodyGenerationBottomBar();
});
$(bookOrderBottomBar).click(async function(){
    bottomIconClicked = iconsBottomBar.book_order;
    await modalBodyGenerationBottomBar();
});


const modalBodyGenerationBottomBar = async() => {
    await bottomBarRequestGeneration();
    if(!(await checkForStartDayBottomBar())){
        startDayMessageBottomBar();
        return;
    }
    // if((await checkForCheckInBottomBar())){
    //     showAlreadyCheckInMsg();
    //     return;
    // }
    $("#showAccountsBottomBar").css('display','block');
    $('#startTripBtnBottomBar').css('display','none');
    
    if(bottomIconClicked === iconsBottomBar.book_order){
        $('#bottomBarModalHeading').empty('');
        $('#bottomBarModalHeading').append('Book Order');
        $('#bottomBarModal').modal('show');
    }
    if(bottomIconClicked === iconsBottomBar.posm_requisition){
        $('#bottomBarModalHeading').empty('');
        $('#bottomBarModalHeading').append('POS Request');
        $('#bottomBarModal').modal('show');
    }
    shiftModalToCenter('bottomBarModal',0);
};

const startDayMessageBottomBar = () => {
    // showNotification({message : ''})
    console.log('Start Day');
    shiftModalToCenter('bottomBarModal',100);
    $("#showAccountsBottomBar").css('display','none');
    $('#startTripBtnBottomBar').css('display','block');
    $('#startTripBtnBottomBar').html(`<p><b>Oops!</b> You haven't started your day yet. Please click on  <button type="button" class="start-trip-modal" onclick="handleStartTripBottomBar()">Start Trip</button> to start your day.</p>`);
    $('#bottomBarModal .modal-dialog').css('transform','translate(0,0)')
    $('#bottomBarModal').modal('show');
};
const showAlreadyCheckInMsg = () => {
    console.log('Check in ');
    shiftModalToCenter('bottomBarModal',100);
    $("#showAccountsBottomBar").css('display','none');
    $('#startTripBtnBottomBar').css('display','block');
};



const accountSelectedBottomBar =async (id) =>{
    $('#bottomBarModal').modal('hide');
    if(bottomIconClicked === iconsBottomBar.book_order){
        window.location.href = `/view/objectives/salesOrder/salesOrderLanding.html?accountId=${listOfAccountBottomBar[id].Id}&bottomBar=true`;
    }
    else if(bottomIconClicked === iconsBottomBar.posm_requisition){
        // await autoCheckInBottomBar(listOfAccountBottomBar[id]);
        window.location.href = `/view/objectives/posm/posm.html?accountId=${listOfAccountBottomBar[id].Id}&bottomBar=true`;
    }
    // redirect to detail page
}




const shiftModalToCenter = (id,value) =>{
    $(`#${id} .modal-dialog`).css('transform',`translate(0,${value}%)`);
};

$(document).ready(async function(){
    let loginData = await isTechnicianAuditorFuncHelper();
    if(loginData.isAudit || loginData.isTech){
        $('#sideNav a:contains(Lead)').css('display','none');
    }
});
//  Bottom Bar Code End ========================================================================