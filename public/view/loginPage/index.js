

let username = document.querySelector('#username');
let password = document.querySelector('#password');
let deferredPrompt;
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
      
    });
    
window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
});
}


//Validate UserName and Password

validateForm = () => {
    var email = username.value;
    var pass = password.value;
    var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email_regex.test(email) == false) {
        $('.uservalidate').css('display', 'block');
        return false;
    } else {
        $('.uservalidate').css('display', 'none');
        $('#loginBtn').attr('disabled',true);
        $('.loader').css('display','block');
        
    }
    
    if(deferredPrompt){
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
             storeData();
            deferredPrompt = null;
          });
    }
    else{
        // alert('Add the app to home screen for native experience!');
        storeData();
    } 
  
};


loginRedirect = async () => {
    let res = await isAuthorized();
    
    if(res){
        window.location.href = '/view/splashScreen/splashScreen.html'; 
    }
    
};


showNotification = (data) =>{
    $("#notification").fadeIn("slow");
    $("#notification span").html(data.message);
    $("#notification a.close-notify").click(function() {
        $("#notification").fadeOut("slow");
        return false;
    });
};

storeData = async () =>{
    
        let usernameValue = username.value;
        let passwordValue = password.value;
        let res = await isAuth(usernameValue,passwordValue);
        $('#loginBtn').attr('disabled',false);
        
    if(res){
        window.location.href = '/view/splashScreen/splashScreen.html?syncRequired=true'; 
    }
    else{
        $('.loader').css('display','none');
        data = {
            message : 'Username or Password is incorrect !'
        };
        showNotification(data);

    }
    
    
};
loginRedirect();


