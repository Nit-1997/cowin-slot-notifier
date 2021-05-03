# How to use

- install nodejs on your system 
- In the terminal type ```npm install```
- create .env file and add required details (sample provided below)
- EMAIL and PASS are the credentials of a bot gmail account that you will use to send emails
- Create a hash password for your bot gmail account using this :- https://support.google.com/accounts/answer/185833?hl=en&authuser=1 (plain text passwords won't work)
- in app.js > main function update the person object (sample provided below)
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
          districts : [314], // to find your target district ids open https://nit-1997.github.io/cowin-slot-notifier/
          email : process.env.PERSON, //from .env file
          age : 18 //min age
        }
```

![alt text](https://github.com/Nit-1997/cowin-slot-notifier/blob/main/screen.png?raw=true)

# How to Find district ID added (open https://nit-1997.github.io/cowin-slot-notifier/ to map your target districts)
![alt text](https://github.com/Nit-1997/cowin-slot-notifier/blob/main/district.png?raw=true)
