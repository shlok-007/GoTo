export default function getSubscriptionObject(email:string){
    
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        // Register a service worker
        navigator.serviceWorker.register("/service-worker.js",{scope: '/'})
          .then(registration => {
            // Request permission to show notifications
            return registration.pushManager.getSubscription()
              .then(subscription => {
                if (subscription) {
                  // Subscription exists, send it to the server
                  console.log(subscription);
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
          })
          .catch(error => {
            console.error('Error occurred while registering service worker:', error);
          });

        }
}

async function addSubscriptionToServer(subscription:PushSubscription, email:string){
    
    const data = {"email":email, "subscription":subscription};
    try{
        await fetch('http://localhost:5000/userDetails/addSubscription', {
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