export default async function getSubscriptionObject(email:string){
    
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      //deregister all service workers
      // navigator.serviceWorker.getRegistrations().then(registrations => {
      //   registrations.forEach(registration => {
      //     registration.unregister();
      // })});
        // Register a service worker
        navigator.serviceWorker.register("/service-worker.js",{scope: '/'})
          .then(registration => {
            // Request permission to show notifications
            registration.update().then(()=>{
            return registration.pushManager.getSubscription()
              .then(subscription => {
                if (subscription) {
                  // Subscription exists, send it to the server
                  // console.log(subscription);
                  addSubscriptionToServer(subscription, email);
                } else {
                  // Subscription doesn't exist, subscribe the user
                  return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
                  })
                    .then(newSubscription => {
                      // Send the new subscription to the server
                        // console.log(newSubscription);
                      addSubscriptionToServer(newSubscription, email);
                    });
                }
              });
            });
          })
          .catch(error => {
            console.error('Error occurred while registering service worker:', error);
          });

        }
}

async function addSubscriptionToServer(subscription:PushSubscription, email:string){
    
    const data = {"email":email, "subscription":subscription};
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        await fetch(serverURL+'/userDetails/addSubscription', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            // return true;
        }catch(err){
            console.log(err);
            // return false;
        }
}