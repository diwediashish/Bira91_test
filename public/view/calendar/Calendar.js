let events = [
    

];

let tasks = [
   
];

let meeting = [
   
];
let calendar;
let reqDate;
let masterEvents;
let masterTasks;
let masterMeeting;

const initializeCalenderData = async() => {
    let calendarPanel = document.querySelector('#calendar');
    masterEvents = events;
    masterTasks= tasks;
    masterMeeting = meeting;
    calendarPanel.innerHTML = '';
    let calenderData = [];
    for(let ele of events){
        let accountDetail = await getItemFromStore('account',ele.Account__c);
        let tempObj = {
            accountId : ele.Account__c,
            accountName : accountDetail ?accountDetail.Name : 'Account Not Synced for this Event', 
            eventName : ele.Name,
            calendar : 'Work',
            color : 'yellow',
            date : formatDate(ele.Start_date_and_time__c)
        };
        calenderData.push(tempObj);
    }
    for(let ele of tasks){
        let accountDetail = await getItemFromStore('account',ele.WhatId);
        const tempObj = {
              accountId : ele.WhatId,
              accountName : accountDetail ?accountDetail.Name : 'Account Not Synced for this Task', 
              eventName : ele.Subject,
              calendar : 'Work',
              color : 'task',
              date : formatDate(ele.ActivityDate)
          };
          calenderData.push(tempObj);
    }
    
    for(let ele of meeting){
        //let accountDetail = await getItemFromStore('account',ele.WhatId);
        const tempObj = {
             // accountId : ele.WhatId,
            //  accountName : accountDetail ?accountDetail.Name : 'Account Not Synced for this Task', 
              eventName : ele.Subject,
              calendar : 'Work',
              color : 'meeting',
              description : ele.Description,
              date : formatDate(ele.StartDateTime),
              endDate : formatDate(ele.EndDateTime),
          };
          calenderData.push(tempObj);
    }
    

    calendar = new Calendar('#calendar', calenderData);
    
    reqDate = formatDate(new Date());
        
    showVisits(filterData(events,masterEvents,reqDate));
    showTasks(filterData(tasks,masterTasks,reqDate));
    showMeetings(filterMeetingData(meeting,masterMeeting,reqDate));
    // $('.day').click( async function(){
    //     await adhocDateRequest(calendar.todaysDate);
            
    //     reqDate = formatDate(new Date(calendar.todaysDate));
        

    //       showVisits(filterData(events,masterEvents,reqDate));
    //       showTasks(filterData(tasks,masterTasks,reqDate));
    // });
    
};

const getDate = async (date) =>{
    reqDate = formatDate(new Date(date));
    $('#pjp').empty();
    if((new Date()).setHours(0,0,0,0)===(new Date(calendar.todaysDate).setHours(0,0,0,0))){
        $('#pjp').html("Today's Visits");
        $('#task').html("Today's Tasks");
        $('#todaysMeet').html("Today's Meeting");
    }
    else{
        $('#pjp').html("Visits");
        $('#task').html("Tasks");
        $('#todaysMeet').html('Meetings');
    }
    showVisits(filterData(events,masterEvents,reqDate));
    showTasks(filterTaskData(tasks,masterTasks,reqDate));
    showMeetings(filterMeetingData(meeting,masterMeeting,reqDate));
    await adhocDateRequest(calendar.todaysDate);
};

const filterData = (data,masterData,dateFilter) =>{
    
    data = masterData.filter((ele) => {
        let isValid = true;
        if (formatDate(new Date(ele.Start_date_and_time__c)) && dateFilter) {
          if (
            formatDate(new Date(ele.Start_date_and_time__c)).toLowerCase().indexOf(dateFilter.toLowerCase()) < 0
          ) {
            isValid = false;
          }
        }
        return isValid;
    });

    return data;
};
const filterTaskData = (data,masterData,dateFilter) =>{
    
    data = masterData.filter((ele) => {
        let isValid = true;
        if (formatDate(new Date(ele.ActivityDate)) && dateFilter) {
          if (
            formatDate(new Date(ele.ActivityDate)).toLowerCase().indexOf(dateFilter.toLowerCase()) < 0
          ) {
            isValid = false;
          }
        }
        return isValid;
    });

    return data;
}

const filterMeetingData = (data,masterData,dateFilter) =>{
    
    data = masterData.filter((ele) => {
        let isValid = true;
        if (formatDate(new Date(ele.StartDateTime)) && dateFilter) {
          if (
            formatDate(new Date(ele.StartDateTime)).toLowerCase().indexOf(dateFilter.toLowerCase()) < 0
          ) {
            isValid = false;
          }
        }
        return isValid;
    });

    return data;
}


const showVisits =async (events) =>{
    let tmp = '';
    $('#todaysVisit').html('');
    let checkedInEventAccountId = null;
    let checkedInEvent = await getItemFromStore('utility','event');
    if(checkedInEvent){
        checkedInEventAccountId = checkedInEvent.Id;
    }
    if(events.length > 0)
    {
        for(let i=0;i<events.length;i++)
        {
        let accountDetail = await getItemFromStore('account',events[i].Account__c);
        tmp +=`
            <div class="event" id="${events[i].Account__c}">
                ${events[i].Completed__c ? `<img class="event-category" src="/media/icons/accountSegmentation/completed.jpg">` :  checkedInEventAccountId && checkedInEventAccountId===events[i].Account__c ? `<img class="event-category" src="/media/icons/accountSegmentation/inprogress.jpg">` : `<img class="event-category" src="/media/images/homePage/todays-visit.png">`}
                <div class="wrapperDiv">
                    <p>${accountDetail ?accountDetail.Name : 'Account Not Synced for this Event'}</p>
                    <p class="body">Subject : ${events[i].Name}</p>
                </div>
            </div>
            `;
        }
    }else{
        tmp +=`
            <div class="event">
                <div class="wrapperDiv">
                    <h4>No Events</h4>
                </div>
            </div>
            `;
    }

    $('#todaysVisit').append(tmp);
};

const showTasks = async(tasks) =>{
    let tmp = '';
    $('#todaysTask').html('');
    if(tasks.length > 0)
    {
        for(let i=0;i<tasks.length;i++)
        {
        let accountDetail = await getItemFromStore('account',tasks[i].WhatId);
        tmp +=`
            <div class="event" id="${tasks[i].WhatId}">
            ${events[i].Status &&events[i].Status==='Completed' ? `<img class="event-category" src="/media/icons/accountSegmentation/Completed.jpg">` : `<img class="event-category" src="/media/images/homePage/todays-visit.png">`}
                
                <div class="wrapperDiv">
                    <p>${accountDetail ?accountDetail.Name : 'Account Not Synced for this Task'}</p>
                    <p class="body">Subject : ${tasks[i].Subject}</p>
                </div>
            </div>
            `;
        }
    }else{
        tmp +=`
            <div class="event">
                <div class="wrapperDiv">
                    <h4>No Tasks</h4>
                </div>
            </div>
            `;
    }

    $('#todaysTask').append(tmp);
};

const showMeetings = async(meetings) =>{
    let tmp = '';
    $('#todaysMeeting').html('');
    if(meetings.length > 0)
    {
        for(let i=0;i<meetings.length;i++)
        {
            let startDate = new Date(meetings[i].StartDateTime).toLocaleString("en-GB", {
                timeZone : 'UTC',hour: '2-digit', minute: '2-digit',hour12: true
              });

            let endDate = new Date(meetings[i].EndDateTime).toLocaleString("en-GB", {
                timeZone : 'UTC',hour: '2-digit', minute: '2-digit',hour12: true
            });
            
        tmp +=`
            <div class="event" id="${meetings[i].Id}">
            <img class="event-category" src="/media/images/homePage/todays-visit.png">
                <div class="wrapperDiv">
                    <p class="body">Subject : ${meetings[i].Subject}</p>
                    <p class="body">Description : ${meetings[i].Description ? meetings[i].Description : ''}</p>
                    <p class="body">Start Time : ${startDate}</p>   
                    <p class="body">End Time : ${endDate}</p> 
                </div>
            </div>
            `;
        }
    }else{
        tmp +=`
            <div class="event">
                <div class="wrapperDiv">
                    <h4>No Meetings</h4>
                </div>
            </div>
            `;
    }
  
    $('#todaysMeeting').append(tmp);
};


const formatDate =(date) =>  {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
};




//initializeCalenderData(tasks,'Task');









  