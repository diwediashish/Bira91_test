slickSlider = () => {
    $('.silder').slick({
        centerMode: false,
        slidesToShow: 3,
        autoplay: false,
        dots: true,
        infinite: false,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
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
  
  
  
  let accounts =[];
  
  showDropdown = () => {
      $("#searchElement").empty();
      let tmp = '';
      
      for (var i = 0; i < accounts.length; i++) {
    
          tmp += '<li class="account-card" onclick="handleAccountSearchClicked(this)" data-id="'+accounts[i].Id+'"><a>';
          tmp += '<img src="../../media/images/homePage/todays-visit.png"/>';
          tmp += '<div class="accountSearch">'+ accounts[i].Name+'<br/> <span>'+(accounts[i].Channel__c ? accounts[i].Channel__c : '')+'</span>';
          tmp += '</div>';
          tmp += '</a></li>';
      }
    
      $("#searchElement").prepend(tmp);
    };
  
  	//setup before functions
	let typingTimer;                //timer identifier
	let doneTypingInterval = 1000;  //time in ms, 5 second for example
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
	const applyFilter =async () => {
	    var value = $('#searchValue').val().toLowerCase();
	    let limit = 5;
	    accounts = [];
	    
	     
	    if(value){
	        let openCursor = await keyBasedSearchingIndexedDB('account',value.toUpperCase());
	        while(accounts.length<limit){
            if((openCursor&&openCursor._request.result===null)||!openCursor){
                break;
            }
	        let valueReturned =await fetchFromCursorAccountListView(openCursor);
	        
	        if(valueReturned.Name&&(((valueReturned.Name).toLowerCase()).indexOf(value)>-1)){
	            accounts.push(valueReturned);
	        }
	        
	        await openCursor.continue();
	        
	    }
	        showDropdown();
	        $("#searchElement li").css('display','block');
	    }
	    else{
	        $("#searchElement li").css('display','none');
	    }
	
	};
  
    handleAccountSearchClicked = (accountInstance) => {
      const accountId = $(accountInstance).attr('data-id');
      let element ={
          dataset : {
              accountid : accountId
          }
      };
      handleAccountClicked(element);
    };
  // filterFunction = () => {
  //   var input, filter, ul;
  //   ul = document.getElementById("searchElement");
  //   input = document.getElementById("searchValue");
  //   filter = input.value.toUpperCase();
  //   li = ul.getElementsByTagName("li");
  
  //   for (var i = 0; i < accountRec.length; i++) {
  //       txtValue = li[i].textContent || li[i].innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != '') {
  //           li[i].style.display = "block";
  //       } else {
  //           li[i].style.display = "none";
  //       }
  //   }
  
  // };
  
  
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
  }
  
  const handleDashboardClick = async (event) => {
      let reportDataFetch = await getItemFromStore('utility','report');
      const idName = $(event).attr('id');
      console.log(idName);
    //   if(idName.indexOf('Range')>-1){
    //       window.location = reportDataFetch['loginUrl']+reportDataFetch['Range'];
    //   }   
    //   else{
    //       window.location = reportDataFetch['loginUrl']+reportDataFetch['Volume'];
    //   }
  
    window.location = reportDataFetch['loginUrl']+'00O2w000001wlSE';
  };
  
  showSliderData = (targetnAchieved) => {
      let tmp = '';
      if (targetnAchieved) {
          for (var i = 0; i < targetnAchieved.length; i++) {
              const achievementValue = Math.round(parseFloat((targetnAchieved[i].achievement / (targetnAchieved[i].target === 0 ? 1 : targetnAchieved[i].target)) * 100).toFixed(2));
              tmp += '                   <div class="item" id="'+targetnAchieved[i].reportName+'" onclick="handleDashboardClick(this)" >';
              tmp += '                      <h4 class="text-center">' + targetnAchieved[i].reportName + '</h4>';
              tmp += '                      <div class="target-section">';
              tmp += '                        <div class="details">';           
              tmp += '                          <div class="achieved">';
              tmp += '                            <p>Achieved</p>';
              if(achievementValue>=85&&achievementValue<=100){
                  tmp += '                            <h3 style="color: #FFBF00;">' + Math.round(parseFloat(targetnAchieved[i].achievement).toFixed(2)) + '</h3>';    
              }
              else if(achievementValue>100){
                  tmp += '                            <h3 style="color:green;">' + Math.round(parseFloat(targetnAchieved[i].achievement).toFixed(2)) + '</h3>';    
              }
              else{
                  tmp += '                            <h3>' + Math.round(parseFloat(targetnAchieved[i].achievement).toFixed(2)) + '</h3>';    
              }
              
              
              
              tmp += '                          </div>';
              tmp += '                            <div  class="target">';
              tmp += '                            <p style="color:#696969;font-weight:600;">Target</p>';
              tmp += '                            <h3 style="color:#696969;font-weight:600;">' + Math.round(parseFloat(targetnAchieved[i].target).toFixed(2)) + '</h3>';
              tmp += '                          </div>';
              tmp += '                        </div>';
              tmp += '                        <div class="total">';
              
              if(achievementValue>=85&&achievementValue<=100){
                  tmp += '                          <h2 style="color: #FFBF00;">' +achievementValue + '%</h2>';
              }
              else if(achievementValue>100){
                  tmp += '                          <h2 style="color:green;">' + achievementValue + '%</h2>';
              }
              else{
                  tmp += '                          <h2>' + achievementValue + '%</h2>';    
              }
              tmp += '                        </div>';
              tmp += '                      </div>';
              tmp += '                    </div>';
          }
    
    
          $('#targetNAchieved').prepend(tmp);
  
          slickSlider();
          
      }
    
      
  
    };
    
  
    showTodaysVisit = (todaysVisit,currentCheckIn) => {
        var tmp = '';
        $('#todays-visit').html('');
        for (var i = 0; i < todaysVisit.length; i++) {
            
            tmp += '<li data-accountId='+todaysVisit[i].Id+' onclick=handleAccountClicked(this)>';
            tmp += '    <div class="main-head">';
            let eventStatus = ' <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>';
            
          if(currentCheckIn&&currentCheckIn.account.Id===todaysVisit[i].Id){
              eventStatus = '<img class="" src="/media/icons/accountSegmentation/inprogress.jpg" alt="">';
          }
          else if(todaysVisit[i].Completed__c){
              eventStatus = '<img class="" src="/media/icons/accountSegmentation/completed.jpg" alt="">';
            }
            tmp += '   '+eventStatus+'      <span class="accountName">' + todaysVisit[i].Name + '</span>  <br/>';
              tmp += '      <div class="heading">';
  
            //console.log(todaysVisit[i]);
          //   eventStatus = '<span style="display:none;" class="label label-default">Not Started</span>';
          //   if(todaysVisit[i].Completed__c){
          //     eventStatus = '<span style="display:none;" class="label label-success">Completed</span>';
          //   }
          //   else if(currentCheckIn&&currentCheckIn.Id===todaysVisit[i].eventId){
          //     eventStatus = '<span style="display:none;" class="label label-primary">In-Progress</span>';
          //   }
              // tmp += '       <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>   <span class="accountName">' + todaysVisit[i].Name + '</span>  <br/>';
            if((todaysVisit[i].Channel__c&&todaysVisit[i].Account_Status__c)){
              tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+'<span> | </span>' : 'NA');
              tmp += '         ' + (todaysVisit[i].Account_Status__c ? todaysVisit[i].Account_Status__c : '') + '</p>';
            }
            else{
                if(todaysVisit[i].Channel__c){
                  tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+'</p> ' : 'NA');
                }
                if(todaysVisit[i].Account_Status__c){
                  tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+' </p>' : 'NA');
                }
            }
            if ((todaysVisit[i].L3M_Billed_Liquids__c && todaysVisit[i].L1M_Billed_Liquids__c)) {
                tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].L1M_Billed_Liquids__c ? todaysVisit[i].L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
                tmp += '         ' + (todaysVisit[i].L3M_Billed_Liquids__c ? todaysVisit[i].L3M_Billed_Liquids__c : '') + '</p>';
            }
            else {
                if (todaysVisit[i].L3M_Billed_Liquids__c) {
                    tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].L3M_Billed_Liquids__c ? todaysVisit[i].L3M_Billed_Liquids__c + '</p>' : 'NA');
                }
                if (todaysVisit[i].L1M_Billed_Liquids__c) {
                    tmp += '       <p style="margin-left:3%;">  ' + (todaysVisit[i].L1M_Billed_Liquids__c ? todaysVisit[i].L1M_Billed_Liquids__c : '') + '</p>';
                }
            }
           if(todaysVisit[i].Recent_Retail_Depletion__c){
              tmp += '       <p style="margin-left:3%;">Last Order : ' + (todaysVisit[i].Recent_Retail_Depletion__c? new Date(todaysVisit[i].Recent_Retail_Depletion__c).toLocaleString("en-IN", {
                  day: 'numeric',
                  month: 'short'
              })+'</p>' : '');
           }
           if(todaysVisit[i].Beer_Selection__c === "Boom"){
              tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
          }
  
          if(todaysVisit[i].Beer_Selection__c === "Premium"){
              
              tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
          }
            tmp += '      </div>';
            
            tmp += '       <div class="feat">';
            tmp += '         <div>';
            
            if(todaysVisit[i].Bira_Segment__c != null)
            {   
                if(todaysVisit[i].Bira_Segment__c === "A+"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
                }else if(todaysVisit[i].Bira_Segment__c === "A"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
                }else if(todaysVisit[i].Bira_Segment__c === "B"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
                }else {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
                }
               
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if(todaysVisit[i].Industry_Segment__c != null)
            {
                if(todaysVisit[i].Industry_Segment__c === "P0"){
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment__c === "P1"){
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment__c === "P2"){
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
                }else {
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
                }
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if(todaysVisit[i].Industry_Segment_Mass__c != null)
            {
                if(todaysVisit[i].Industry_Segment_Mass__c === "M0"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment_Mass__c === "M1"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment_Mass__c === "M2"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
                }else {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
                }
                
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            tmp += '         </div>';
          tmp += '       <div >';
      
            if (todaysVisit[i].Beacon_Flag__c === true) {
                
                tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if (todaysVisit[i].Draft_Ready__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';
                
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if (todaysVisit[i].QCO_Flag__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            tmp += '      </div>';
          //   tmp += eventStatus;
            tmp += '         </div>';
            tmp += '       </div>';
         
              
            
            tmp += '    </div>';
            tmp += '</li>';
        }
        if (todaysVisit.length == 0) {
            tmp += '<li>';
            tmp += '<p class="text-center alert"> No Visits for Today</p>';
            tmp += '</li>';
        }
        $('#todays-visit').prepend(tmp);
      };  
    
    
 
    showTodaysVisit = (todaysVisit,currentCheckIn) => {
        var tmp = '';
        $('#todays-visit').html('');
        for (var i = 0; i < todaysVisit.length; i++) {
            
            tmp += '<li data-accountId='+todaysVisit[i].Id+' onclick=handleAccountClicked(this)>';
            tmp += '    <div class="main-head">';
            let eventStatus = ' <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>';
            
          if(currentCheckIn&&currentCheckIn.account.Id===todaysVisit[i].Id){
              eventStatus = '<img class="" src="/media/icons/accountSegmentation/inprogress.jpg" alt="">';
          }
          else if(todaysVisit[i].Completed__c){
              eventStatus = '<img class="" src="/media/icons/accountSegmentation/completed.jpg" alt="">';
            }
            tmp += '   '+eventStatus+'      <span class="accountName">' + todaysVisit[i].Name + '</span>  <br/>';
              tmp += '      <div class="heading">';
  
            //console.log(todaysVisit[i]);
          //   eventStatus = '<span style="display:none;" class="label label-default">Not Started</span>';
          //   if(todaysVisit[i].Completed__c){
          //     eventStatus = '<span style="display:none;" class="label label-success">Completed</span>';
          //   }
          //   else if(currentCheckIn&&currentCheckIn.Id===todaysVisit[i].eventId){
          //     eventStatus = '<span style="display:none;" class="label label-primary">In-Progress</span>';
          //   }
              // tmp += '       <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>   <span class="accountName">' + todaysVisit[i].Name + '</span>  <br/>';
            if((todaysVisit[i].Channel__c&&todaysVisit[i].Account_Status__c)){
              tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+'<span> | </span>' : 'NA');
              tmp += '         ' + (todaysVisit[i].Account_Status__c ? todaysVisit[i].Account_Status__c : '') + '</p>';
            }
            else{
                if(todaysVisit[i].Channel__c){
                  tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+'</p> ' : 'NA');
                }
                if(todaysVisit[i].Account_Status__c){
                  tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].Channel__c ? todaysVisit[i].Channel__c+' </p>' : 'NA');
                }
            }
            if ((todaysVisit[i].L3M_Billed_Liquids__c && todaysVisit[i].L1M_Billed_Liquids__c)) {
                tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].L1M_Billed_Liquids__c ? todaysVisit[i].L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
                tmp += '         ' + (todaysVisit[i].L3M_Billed_Liquids__c ? todaysVisit[i].L3M_Billed_Liquids__c : '') + '</p>';
            }
            else {
                if (todaysVisit[i].L3M_Billed_Liquids__c) {
                    tmp += '       <p style="margin-left:3%;">' + (todaysVisit[i].L3M_Billed_Liquids__c ? todaysVisit[i].L3M_Billed_Liquids__c + '</p>' : 'NA');
                }
                if (todaysVisit[i].L1M_Billed_Liquids__c) {
                    tmp += '       <p style="margin-left:3%;">  ' + (todaysVisit[i].L1M_Billed_Liquids__c ? todaysVisit[i].L1M_Billed_Liquids__c : '') + '</p>';
                }
            }
           if(todaysVisit[i].Recent_Retail_Depletion__c){
              tmp += '       <p style="margin-left:3%;">Last Order : ' + (todaysVisit[i].Recent_Retail_Depletion__c? new Date(todaysVisit[i].Recent_Retail_Depletion__c).toLocaleString("en-IN", {
                  day: 'numeric',
                  month: 'short'
              })+'</p>' : '');
           }
           if(todaysVisit[i].Beer_Selection__c === "Boom"){
              tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
          }
  
          if(todaysVisit[i].Beer_Selection__c === "Premium"){
              
              tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
          }
            tmp += '      </div>';
            
            tmp += '       <div class="feat">';
            tmp += '         <div>';
            
            if(todaysVisit[i].Bira_Segment__c != null)
            {   
                if(todaysVisit[i].Bira_Segment__c === "A+"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
                }else if(todaysVisit[i].Bira_Segment__c === "A"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
                }else if(todaysVisit[i].Bira_Segment__c === "B"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
                }else {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
                }
               
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if(todaysVisit[i].Industry_Segment__c != null)
            {
                if(todaysVisit[i].Industry_Segment__c === "P0"){
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment__c === "P1"){
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment__c === "P2"){
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
                }else {
                    tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
                }
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if(todaysVisit[i].Industry_Segment_Mass__c != null)
            {
                if(todaysVisit[i].Industry_Segment_Mass__c === "M0"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment_Mass__c === "M1"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
                }else if(todaysVisit[i].Industry_Segment_Mass__c === "M2"){
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
                }else {
                    tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
                }
                
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            tmp += '         </div>';
          tmp += '       <div >';
      
            if (todaysVisit[i].Beacon_Flag__c === true) {
                
                tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if (todaysVisit[i].Draft_Ready__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';
                
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            if (todaysVisit[i].QCO_Flag__c === true) {
                tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
            }
            else {
                tmp += '  <span class="name"></span>';
            }
    
            tmp += '      </div>';
          //   tmp += eventStatus;
            tmp += '         </div>';
            tmp += '       </div>';
         
              
            
            tmp += '    </div>';
            tmp += '</li>';
        }
        if (todaysVisit.length == 0) {
            tmp += '<li>';
            tmp += '<p class="text-center alert"> No Visits for Today</p>';
            tmp += '</li>';
        }
        $('#todays-visit').prepend(tmp);
      }; 
  
showPulloutApproval = (pulloutApproval,currentCheckIn) => {
      var tmp = '';
      $('#pullout-approval').html('');
      for (var i = 0; i < pulloutApproval.length; i++) {
       
          tmp += '<li data-accountId='+pulloutApproval[i].Id+' data-eventId='+pulloutApproval[i].eventId+' onclick=handlePulloutApproval(this)>';
          tmp += '    <div class="main-head">';
          let eventStatus = ' <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>';
          
        if(currentCheckIn&&currentCheckIn.account.Id===pulloutApproval[i].Id){
            eventStatus = '<img class="" src="/media/icons/accountSegmentation/inprogress.jpg" alt="">';
        }
        else if(pulloutApproval[i].Completed__c){
            eventStatus = '<img class="" src="/media/icons/accountSegmentation/completed.jpg" alt="">';
          }
          tmp += '   '+eventStatus+'      <span class="accountName">' + pulloutApproval[i].Name + '</span>  <br/>';
            tmp += '      <div class="heading">';

          if((pulloutApproval[i].Channel__c&&pulloutApproval[i].Account_Status__c)){
            tmp += '       <p style="margin-left:3%;">' + (pulloutApproval[i].Channel__c ? pulloutApproval[i].Channel__c+'<span> | </span>' : 'NA');
            tmp += '         ' + (pulloutApproval[i].Account_Status__c ? pulloutApproval[i].Account_Status__c : '') + '</p>';
          }
          else{
              if(pulloutApproval[i].Channel__c){
                tmp += '       <p style="margin-left:3%;">' + (pulloutApproval[i].Channel__c ? pulloutApproval[i].Channel__c+'</p> ' : 'NA');
              }
              if(pulloutApproval[i].Account_Status__c){
                tmp += '       <p style="margin-left:3%;">' + (pulloutApproval[i].Channel__c ? pulloutApproval[i].Channel__c+' </p>' : 'NA');
              }
          }
          if ((pulloutApproval[i].L3M_Billed_Liquids__c && pulloutApproval[i].L1M_Billed_Liquids__c)) {
              tmp += '       <p style="margin-left:3%;">' + (pulloutApproval[i].L1M_Billed_Liquids__c ? pulloutApproval[i].L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
              tmp += '         ' + (pulloutApproval[i].L3M_Billed_Liquids__c ? pulloutApproval[i].L3M_Billed_Liquids__c : '') + '</p>';
          }
          else {
              if (pulloutApproval[i].L3M_Billed_Liquids__c) {
                  tmp += '       <p style="margin-left:3%;">' + (pulloutApproval[i].L3M_Billed_Liquids__c ? pulloutApproval[i].L3M_Billed_Liquids__c + '</p>' : 'NA');
              }
              if (pulloutApproval[i].L1M_Billed_Liquids__c) {
                  tmp += '       <p style="margin-left:3%;">  ' + (pulloutApproval[i].L1M_Billed_Liquids__c ? pulloutApproval[i].L1M_Billed_Liquids__c : '') + '</p>';
              }
          }
         if(pulloutApproval[i].Recent_Retail_Depletion__c){
            tmp += '       <p style="margin-left:3%;">Last Order : ' + (pulloutApproval[i].Recent_Retail_Depletion__c? new Date(pulloutApproval[i].Recent_Retail_Depletion__c).toLocaleString("en-IN", {
                day: 'numeric',
                month: 'short'
            })+'</p>' : '');
         }
         if(pulloutApproval[i].Beer_Selection__c === "Boom"){
            tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
        }

        if(pulloutApproval[i].Beer_Selection__c === "Premium"){
            
            tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
        }
          tmp += '      </div>';
          
          tmp += '       <div class="feat">';
          tmp += '         <div>';
          
          if(pulloutApproval[i].Bira_Segment__c != null)
          {   
              if(pulloutApproval[i].Bira_Segment__c === "A+"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
              }else if(pulloutApproval[i].Bira_Segment__c === "A"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
              }else if(pulloutApproval[i].Bira_Segment__c === "B"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
              }else {
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
              }
             
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if(pulloutApproval[i].Industry_Segment__c != null)
          {
              if(pulloutApproval[i].Industry_Segment__c === "P0"){
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
              }else if(pulloutApproval[i].Industry_Segment__c === "P1"){
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
              }else if(pulloutApproval[i].Industry_Segment__c === "P2"){
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
              }else {
                  tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
              }
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if(pulloutApproval[i].Industry_Segment_Mass__c != null)
          {
              if(pulloutApproval[i].Industry_Segment_Mass__c === "M0"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
              }else if(pulloutApproval[i].Industry_Segment_Mass__c === "M1"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
              }else if(pulloutApproval[i].Industry_Segment_Mass__c === "M2"){
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
              }else {
                  tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
              }
              
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          tmp += '         </div>';
        tmp += '       <div >';
    
          if (pulloutApproval[i].Beacon_Flag__c === true) {
              
              tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if (pulloutApproval[i].Draft_Ready__c === true) {
              tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';
              
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          if (pulloutApproval[i].QCO_Flag__c === true) {
              tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
          }
          else {
              tmp += '  <span class="name"></span>';
          }
  
          tmp += '      </div>';
        //   tmp += eventStatus;
          tmp += '         </div>';
          tmp += '       </div>';
       
            
          
          tmp += '    </div>';
          tmp += '</li>';
      }
      if (pulloutApproval.length == 0) {
          tmp += '<li class="alert">';
          tmp += '<p class="text-center"> No Pullout Approval Found</p>';
          tmp += '</li>';
      }

      $('#pullout-approval').prepend(tmp);
};



showPreInstallApproval = (preInstallApproval) => {
    console.log(preInstallApproval);
    var tmp = '';
    $('#preInstall-approval').html('');
    for (var i = 0; i < preInstallApproval.length; i++) {
     
        tmp += '<li  data-preInstallationId='+preInstallApproval[i].preInstallationId+' onclick=handlePreInstallApproval(this)>';
        tmp += '    <div class="main-head">';
        let eventStatus = ' <img data-toggle="tooltip" data-placement="left" title="Click to open data" src="/media/images/homePage/todays-visit.png"/>';
        
        tmp += '   '+eventStatus+'      <span class="accountName">' + preInstallApproval[i].Name + '</span>  <br/>';
          tmp += '      <div class="heading">';

        if((preInstallApproval[i].Channel__c&&preInstallApproval[i].Account_Status__c)){
          tmp += '       <p style="margin-left:3%;">' + (preInstallApproval[i].Channel__c ? preInstallApproval[i].Channel__c+'<span> | </span>' : 'NA');
          tmp += '         ' + (preInstallApproval[i].Account_Status__c ? preInstallApproval[i].Account_Status__c : '') + '</p>';
        }
        else{
            if(preInstallApproval[i].Channel__c){
              tmp += '       <p style="margin-left:3%;">' + (preInstallApproval[i].Channel__c ? preInstallApproval[i].Channel__c+'</p> ' : 'NA');
            }
            if(preInstallApproval[i].Account_Status__c){
              tmp += '       <p style="margin-left:3%;">' + (preInstallApproval[i].Channel__c ? preInstallApproval[i].Channel__c+' </p>' : 'NA');
            }
        }
        if ((preInstallApproval[i].L3M_Billed_Liquids__c && preInstallApproval[i].L1M_Billed_Liquids__c)) {
            tmp += '       <p style="margin-left:3%;">' + (preInstallApproval[i].L1M_Billed_Liquids__c ? preInstallApproval[i].L1M_Billed_Liquids__c + '<span class=""> , </span>' : 'NA');
            tmp += '         ' + (preInstallApproval[i].L3M_Billed_Liquids__c ? preInstallApproval[i].L3M_Billed_Liquids__c : '') + '</p>';
        }
        else {
            if (preInstallApproval[i].L3M_Billed_Liquids__c) {
                tmp += '       <p style="margin-left:3%;">' + (preInstallApproval[i].L3M_Billed_Liquids__c ? preInstallApproval[i].L3M_Billed_Liquids__c + '</p>' : 'NA');
            }
            if (preInstallApproval[i].L1M_Billed_Liquids__c) {
                tmp += '       <p style="margin-left:3%;">  ' + (preInstallApproval[i].L1M_Billed_Liquids__c ? preInstallApproval[i].L1M_Billed_Liquids__c : '') + '</p>';
            }
        }
       if(preInstallApproval[i].Recent_Retail_Depletion__c){
          tmp += '       <p style="margin-left:3%;">Last Order : ' + (preInstallApproval[i].Recent_Retail_Depletion__c? new Date(preInstallApproval[i].Recent_Retail_Depletion__c).toLocaleString("en-IN", {
              day: 'numeric',
              month: 'short'
          })+'</p>' : '');
       }
       if(preInstallApproval[i].Beer_Selection__c === "Boom"){
          tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/boom-led.png" alt=""></span>';
      }

      if(preInstallApproval[i].Beer_Selection__c === "Premium"){
          
          tmp += '  <span><img class="beerSelection" src="/media/icons/accountSegmentation/premium-led.png" alt=""></span>';
      }
        tmp += '      </div>';
        
        tmp += '       <div class="feat">';
        tmp += '         <div>';
        
        if(preInstallApproval[i].Bira_Segment__c != null)
        {   
            if(preInstallApproval[i].Bira_Segment__c === "A+"){
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a+.png" alt=""></span>';
            }else if(preInstallApproval[i].Bira_Segment__c === "A"){
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/a.png" alt=""></span>';
            }else if(preInstallApproval[i].Bira_Segment__c === "B"){
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/b.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/c.png" alt=""></span>';
            }
           
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if(preInstallApproval[i].Industry_Segment__c != null)
        {
            if(preInstallApproval[i].Industry_Segment__c === "P0"){
                tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p0.png" alt=""></span>';
            }else if(preInstallApproval[i].Industry_Segment__c === "P1"){
                tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p1.png" alt=""></span>';
            }else if(preInstallApproval[i].Industry_Segment__c === "P2"){
                tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p2.png" alt=""></span>';
            }else {
                tmp += '  <span class="name" style="position:relative;top:-1px;" ><img src="../../media/icons/accountSegmentation/p3.png" alt=""></span>';
            }
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if(preInstallApproval[i].Industry_Segment_Mass__c != null)
        {
            if(preInstallApproval[i].Industry_Segment_Mass__c === "M0"){
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m0.png" alt=""></span>';
            }else if(preInstallApproval[i].Industry_Segment_Mass__c === "M1"){
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m1.png" alt=""></span>';
            }else if(preInstallApproval[i].Industry_Segment_Mass__c === "M2"){
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m2.png" alt=""></span>';
            }else {
                tmp += '  <span class="name"><img src="../../media/icons/accountSegmentation/m3.png" alt=""></span>';
            }
            
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        tmp += '         </div>';
      tmp += '       <div >';
  
        if (preInstallApproval[i].Beacon_Flag__c === true) {
            
            tmp += '         <span><img src="../../media/images/homePage/Icons-02.png" alt=""></span>';
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if (preInstallApproval[i].Draft_Ready__c === true) {
            tmp += '         <span><img src="../../media/images/homePage/Icons-04.png" alt=""></span>';
            
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        if (preInstallApproval[i].QCO_Flag__c === true) {
            tmp += '         <span><img src="../../media/images/homePage/Icons-05.png" alt=""></span>';
        }
        else {
            tmp += '  <span class="name"></span>';
        }

        tmp += '      </div>';
      //   tmp += eventStatus;
        tmp += '         </div>';
        tmp += '       </div>';
     
          
        
        tmp += '    </div>';
        tmp += '</li>';
    }
    if (preInstallApproval.length == 0) {
        tmp += '<li class="alert">';
        tmp += '<p class="text-center"> No Pre-Installation Approval Found</p>';
        tmp += '</li>';
    }

    $('#preInstall-approval').prepend(tmp);
  };


    const utilityCheck =async () => {
        let eventCheckedIn = await getItemFromStore('utility','event');
        if(eventCheckedIn){
            return eventCheckedIn.account.Id;
        }
        return 'Not Found';
        
    };


const handlePulloutApproval =async (ele) =>{
        let utilityCheckHelper = await utilityCheck();
        let eventRec = await getItemFromStore('events',$(ele).attr('data-eventId'));
        let pulloutRec = await getItemFromStore('draftPullout',eventRec.Draft_Pullout__r.App_Id__c);
        if(utilityCheckHelper&&utilityCheckHelper ===  eventRec.Account__c && pulloutRec){
            handleAccountClicked({dataset : {accountid :eventRec.Account__c }});
        }
        else if(utilityCheckHelper&&utilityCheckHelper ===  eventRec.Account__c && !pulloutRec){
            window.location.href = '/view/pulloutApproval/pulloutApproval.html?eventId='+$(ele).attr('data-eventId');
        }
        else if(pulloutRec){
            handleAccountClicked({dataset : {accountid :eventRec.Account__c }});
        }
        else{
            let position = await getCurrentLocationHelper();
            const eventSyncKey = fetchCurrentDateIdStr()+'-'+eventRec.Account__c;
            let eventRecV2 = await getItemFromStore('eventsSync',eventSyncKey);
            let accountDetail = await getItemFromStore('account',eventRec.Account__c);
            let utility = {
                sobjectName : 'event',
                account : accountDetail,
            };
            await writeData('utility',utility);
            if(!eventRecV2){
                eventRecV2 = {
                    App_Id : fetchCurrentDateIdStr()+'-'+eventRec.Account__c,
                    Actual_Start_Visit : new Date(),
                    Check_In_Latitude : position.coords.latitude,
                    Check_In_Longitude : position.coords.longitude,
                    Account : eventRec.Account__c,
                    isSynced : false,
                    Created_Date : new Date()
                };
            }
            eventRecV2.CheckedIn = true;
            await writeData('eventsSync',eventRecV2);
            window.location.href = '/view/pulloutApproval/pulloutApproval.html?eventId='+$(ele).attr('data-eventId');
        }
            
}


const handlePreInstallApproval = (ele) =>{
    let preId = $(ele).attr('data-preInstallationId');
    window.location.href = '/view/preInstallationApproval/preInstallationApproval.html?preId='+preId;
}
    
    
  
  
  handleAccountClicked = async (element) => {
      let accountRec = await getItemFromStore('account',(element.dataset.accountid));
      if(!accountRec){
        accountRec = await getItemFromStore('lead',(element.dataset.accountid));
      }
      const recordTypeName = accountRec.RecordType.DeveloperName;
      if(recordTypeName==='Distributor_Warehouse'){
          window.location.href = '/view/accountDetail/accountDetailDistributorWarehouse/accountDetailDistributorWarehouseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName==='Distributor'){
          window.location.href = '/view/accountDetail/accountDetailDistributor/accountDetailDistributorLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='On_Premise_General'){
          window.location.href = '/view/accountDetail/accountDetailOnPremiseGeneral/accountDetailOnPremiseGeneralLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Consumer'){
          window.location.href = '/view/accountDetail/accountDetailConsumer/accountDetailConsumerLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Institutional_Off_Premise'){
          window.location.href = '/view/accountDetail/accountDetailInstitutionalOffPremise/accountDetailInstitutionalOffPremiseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Institutional_On_Premise'){
          window.location.href = '/view/accountDetail/accountDetailInstitutionalOnPremise/accountDetailInstitutionalOnPremiseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Non_beer_Warehouse'){
          window.location.href = '/view/accountDetail/accountDetailNonbeerWarehouse/accountDetailNonbeerWarehouseLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Off_Premise_Outlet'){
          window.location.href = '/view/accountDetail/accountDetailOffPremiseOutlet/accountDetailOffPremiseOutletLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='On_Premise_Hotel'){
          window.location.href = '/view/accountDetail/accountDetailOnPremiseHotel/accountDetailOnPremiseHotelLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Supplier'){
          window.location.href = '/view/accountDetail/accountDetailSupplier/accountDetailSupplierLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Temporary_Event'){
          window.location.href = '/view/accountDetail/accountDetailTemporaryEvent/accountDetailTemporaryEventLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Wholesaler'){
          window.location.href = '/view/accountDetail/accountDetailWholesaler/accountDetailWholesalerLanding.html?Id='+accountRec.Id;
      }
      else if(recordTypeName ==='Lead'){
        window.location.href = '/view/leadDetail/leadDetailLanding.html?leadId='+accountRec.Id;
    }
  };

  
  const renderTodaysTasks = async() => {
    let tasks = await fetchTodaysTasks();
    let tmp = '';
    let loginData =await loginDataFetch();
    let isValid = true;    
    
    $('#todaysVisits').empty();
    if(tasks.length>0){
        for (let ele of tasks){
        
            if(ele.OwnerId === loginData[0].Id){
            let accountRec = await getItemFromStore('account',ele.WhatId);
            
            isValid = false;
            tmp +=`
            <div class="media">
                <div class="media-left" style="font-size:29px;">
                    <i class="fas fa-tasks"></i>
            
                </div>
                <div class="media-body">
                <h4 class="media-heading"><div style="float:left;">${ele.Subject}</div>
                    <div style="text-align:right;"> ${ele.Status==='Open' ? `<i onclick="handleCompleteTask('${ele.Unique_Identifier__c}')" class="fas fa-clipboard-check"></i>` : '<i style="color:green;" class="fas fa-check-square"></i>' }</div>
                </h4>
              <h4><small>Related To : ${accountRec?accountRec.Name : '' } <br/>
                Priority : ${ele.Priority ? ele.Priority : ''}
            </small></h4>
            </div>
          </div>`;
            }
        }
    }
    

    if(isValid){
        tmp += `
        <div class="alert" style="text-align:center;color:grey">
          No Tasks Found
        </div>`;
    }
    $('#todaysVisits').append(tmp);
  };
 
  const renderTodaysMeeting = (standardEventsList) => {
    let tmp = '';
    
    $('#todaysMeeting').empty();
    if(standardEventsList.length>0){
        standardEventsList.forEach(async ele => {
            let startDate = new Date(ele.StartDateTime).toLocaleString("en-GB", {
                timeZone : 'IST',
                hour: '2-digit', minute: '2-digit',hour12: true
              });

            let endDate = new Date(ele.EndDateTime).toLocaleString("en-GB", {
                // day: '2-digit',
                // month: '2-digit',
                // year: 'numeric',
                 timeZone : 'IST',hour: '2-digit', minute: '2-digit',hour12: true
            });
            tmp +=`
            <div class="media" onclick="handleToShowTodaysMeeting('${ele.Id}','${startDate}','${endDate}')">
                <div class="media-left" style="font-size:29px;">
                    <i class="fas fa-tasks"></i>
            
                </div>
                <div class="media-body">
                    <h4 class="media-heading">${ele.Subject}
                    </h4>
                    <div style="text-align:left;"> Start Time : ${startDate}</div>
                    <div style="text-align:left;"> End Time : ${endDate}</div>
                </div>
            </div>
                `;
              
        });
    }
    else{
        tmp += `
        <div class="alert" style="text-align:center;color:grey">
          No Meetings Found
        </div>`;
    }
    $('#todaysMeeting').append(tmp);
  };
 
  handleToShowTodaysMeeting = (Id,startDate,endDate) =>{
    let eventDetails = mappingStandardEventIds.get(Id); 
    $('#todaysMeetingModal .modal-body').html('');
    let tmp = `
        <p><b>Subject</b> : ${eventDetails.Subject}</p>
        <p><b>Start Time</b> : ${startDate ? startDate : ''}</p>
        <p><b>End Time</b> : ${endDate ? endDate : ''}</p>
        <p><b>Location</b> : ${eventDetails.Location ? eventDetails.Location : ''}</p>
        <p><b>Description</b> : ${eventDetails.Description ? eventDetails.Description : ''}</p>
    `;

    $('#todaysMeetingModal .modal-body').append(tmp);

    $('#todaysMeetingModal').modal('show');
  }
  
  handleCompleteTask =async (ele) => {
    let resp = confirm('Are you sure you want to complete the task ?');
    if(resp){
        let taskRecord = await getItemFromStore('taskOriginal',ele);
        if(taskRecord){
            taskRecord.Status = 'Completed';
        await writeData('taskOriginal',taskRecord);
        await writeData('taskSync',taskRecord);
        renderTodaysTasks();
        }
        
    }

  };    
