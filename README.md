<h1>Whipser</h1>
A WebVR project made with A-Frame, Google Firebase, and love.

<h2>Firebase</h2>
Whisper uses Google's Firebase for hosting as well as for the storage and database of the whispers.

<h2>How to connect to Firebase</h2>
You can refer to this <a href="https://firebase.google.com/docs/hosting/deploying">link</a> for a more detailed instruction. 
<ol>
  <li>Create or Login to your Google Firebase Account</li>
  <li>Replace the project config with your own configuration</li>
  <li>Initialize database and storage structure</li>
</ol>
<h2>Initialize database and storage</h2>
<h3>Database</h3>
This is used to store the total number of whispers recorded.

1. Create an entry named: 'whisper_count' and initialize it to 0.
2. Change the rules because there is no authentication required to use the app. Take note that everyone can read and write in your database as long as they have access to it. 

Click the Rules tab and changed it to the following:
```javascript
{
 "rules": {
   ".read": true,
   ".write": true
 }
}
```

<h3>Storage</h3>
This stores all the whisper in the custom metadata, it contains the location of the whisperer and the number of times that whisper have been heard. 

1. Create a folder named: 'whispers'.
2. Change the rules because there is no authentication required to use the app. Take note that everyone can read and write in your storage as long as they have access to it. 

Click the Rules tab and changed it to the following:
```javascript
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

<h2>All set, now we're ready to see the app in action.</h2>
<ol>
  <li>Host it locally.</li>
  <li>Host it using Firebase.</li>
</ol>

<h2>Locally</h2>
I personally use <a href="https://github.com/kzahel/web-server-chrome">Web Server for Chrome</a> to serve the
