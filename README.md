# How to use

- install nodejs 
- npm install
- create .env file and add required details
- Add values for EMAIL , PASS env variables these are the credentials of the gmail account you want to use to send email
- If using gmail , create a password for your gmail account using this:-  https://support.google.com/accounts/answer/185833?hl=en&authuser=1
- node app.js & (To run this as a background process)

# ADD Your custom person to be tracked
```
let person = {
          districts : [314], // district_id (How to fetch ? mentioned in the code)
          email : process.env.PERSON, //create a entry by name PERSON="<person-email>" this is the email-id where you want to recieve notification
          age : 18 //min age
        }
```

![alt text](https://github.com/Nit-1997/cowin-slot-notifier/blob/main/screen.png?raw=true)
