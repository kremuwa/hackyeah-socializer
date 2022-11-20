# Next.js + Firebase Setup
Full Starter Code for Next.js and Firebase 👤 `next-firebase-auth` + 🗃 Firestore + 🔔 Messaging.

> ## Demo: [next-firebase-starter.vercel.app](https://next-firebase-starter.vercel.app)

## What's Provided?
* Firebase Authentication Setup
* Private and Login Pages
* Automatically set new users in `users` collection 
* Firebase Client and Admin SDK Init
* Clean Project Structure (Functions, references for Firestore)
* SSR / SSG via Firestore Data
* Enable Firebase Cloud Messaging 
* FCM Service Worker Setup
* Tailwind CSS
* Module path aliases


## ✅ Getting Started

Install dependencies `npm install`

* ### 🏡 Environment Vaiables
    Refer [`.env.local.example`](https://github.com/shreyas-jadhav/next-firebase-starter/blob/main/env.local.example) and rename after adding your own variables.

* ### 🔓 Private and Login Pages
    Refer [`pages/dashboard.js`](https://github.com/shreyas-jadhav/next-firebase-starter/blob/main/pages/dashboard.js) for private page (Authentication Required). And [`pages/login.js`](https://github.com/shreyas-jadhav/next-firebase-starter/blob/main/pages/login.js) for login page.

* ### 🔑 Setting Custom Auth Providers
    Refer [`components/elements/firebaseAuth.js`](https://github.com/shreyas-jadhav/next-firebase-starter/blob/main/components/elements/FirebaseAuth.js) file to add more Providers. 

* ### 📄 Adding users into firestore collection
    Refer - [`components/elements/firebaseAuth.js` callbacks](https://github.com/shreyas-jadhav/next-firebase-starter/blob/29bc5278439e8fe98c932b067ffc55ca91b48677/components/elements/FirebaseAuth.js#L32)

* ### 💻 SSR / SSG using Firestore Data
    Use Admin SDK's Firestore Functions: [utils/firebase/firestore/fsAdminFunctions.js](https://github.com/shreyas-jadhav/next-firebase-starter/blob/main/utils/firebase/firestore/fsAdminFunctions.js) for server operations. 

    **Note:** Do not use these for Client Side.

* ### 🚚 Module Path Aliases
    Refer [jsconfig.json](https://github.com/shreyas-jadhav/next-firebase-starter/blob/29bc5278439e8fe98c932b067ffc55ca91b48677/jsconfig.json#L5) 

* ### 👩‍🏭 Firebase Cloud Messaging service worker
    Refer [firebase-messaging-sw.js](https://github.com/shreyas-jadhav/next-firebase-starter/blob/main/public/firebase-messaging-sw.js)

## Additional Docs
* `next-firebase-auth` library [documentation](https://github.com/gladly-team/next-firebase-auth) (Great Library ♥)
* [Firebase Official Documentation](https://firebase.google.com/docs/firestore)


<a href="https://www.buymeacoffee.com/Shreyas"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Shreyas&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

<a href="https://www.freepik.com/free-vector/cute-sloth-sleeping-pillow-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_26259303.htm#query=sleepinglemur&position=0&from_view=search&track=sph?log-in=google">Image by catalyststuff</a> on Freepik
<a href="https://www.freepik.com/free-vector/happy-birthday-greeting-card-with-cute-giraffe_7264014.htm#query=happy%20giraffe&position=14&from_view=keyword">Image by lesyaskripak</a> on Freepik
