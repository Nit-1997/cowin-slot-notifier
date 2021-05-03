# How to use

- install nodejs 
- npm install
- create .env file and add required details
- Add values for EMAIL , PASS env variables these are the credentials of the gmail account you want to use to send email
- If using gmail , create a password for your gmail account using this:-  https://support.google.com/accounts/answer/185833?hl=en&authuser=1
- node app.js & (To run this as a background process)

# sample .env file format
```
EMAIL=xyz@gmail.com
PASS=ascascjkhaskcjhas 
PERSON="abc@gmail.com"
```
**NOTE : - hashed password needs to be generated from your gmail account**


# Create your custom  obj that can track a list of districts using district_id
```
let person = {
          districts : [314], // to find your target district ids open sample.html
          email : process.env.PERSON, //from .env file
          age : 18 //min age
        }
```

![alt text](https://github.com/Nit-1997/cowin-slot-notifier/blob/main/screen.png?raw=true)

# How to Find district ID added (open sample.html to map your target districts)
![alt text](https://github.com/Nit-1997/cowin-slot-notifier/blob/main/district.png?raw=true)
