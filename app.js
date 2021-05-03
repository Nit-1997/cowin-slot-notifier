var  nodemailer     = require("nodemailer")
   , axios          = require("axios")
   , moment         = require("moment")
   , data           = require("./data")
   , fs             = require('fs').promises
   , cron = require('node-cron')


require('dotenv').config()


let notify = async(person , slotDetails)=>{
    try{
        console.log("mailer")
        //console.log(slotDetails)
        let rows = ``
        for (i=0;i<slotDetails.length;i++){
             let row = `<tr>
                      <td>`+slotDetails[i].name+`</td>
                      <td>`+slotDetails[i].district_name+`</td>
                      <td>`+slotDetails[i].pincode+`</td>
                      <td>`+slotDetails[i].vaccine+`</td>
                      <td>`+slotDetails[i].fee+`</td>
                    </tr>
                     `
             rows = rows + row       
        }
        let html = `
          <html>
            <head>
                <title>Test-email</title>
                <style>
                    #tests {
                        font-family: Verdana, Helvetica, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                    }


                    #tests td, #tests th {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }

                    #tests tr:nth-child(even){background-color: #f2f2f2;}

                    #tests tr:hover {background-color: #ddd;}

                    #tests th {
                        padding-top: 12px;
                        padding-bottom: 12px;
                        text-align: left;
                        background-color: #023b52;
                        color: white;
                    }

                    .additionalStyles{
                        font-family: Verdana, Helvetica, sans-serif;
                    }
                </style>
            </head>
            <body>

        
            <h3 class="additionalStyles"> Available Slots </h3>


            <table id="tests">
                <tr>
                    <th>Center-Name</th>
                    <th>District</th>
                    <th>Pincode</th>
                    <th>Vaccine</th>
                    <th>Fee</th>
                </tr>
                 `+rows+`
            </table>
            
            </body>
            </html>

        `

        await fs.writeFile('body.html', html)

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL, 
              pass: process.env.PASS 
            },
          });

    
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: person.email, // list of receivers
            subject:'Vaccine slot available', // Subject line
            text: 'For clients with plaintext support only',
            html: await fs.readFile('body.html'),
          });

       console.log(info)
    }catch(error){
       console.log(error)
   //    throw error   
    }
 
}


let checkSlots = async(person,date)=>{
   try{
    
    for(i = 0 ; i < person.districts.length ; i++ ) {
       let config = {
          method: 'get',
          url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+person.districts[i]+'&date='+date,
          headers: {
              'accept': 'application/json',
              'Accept-Language': 'hi_IN'
          }
        }

       response = await axios(config)
       let sessions = response.data.sessions;
       let validSlots = sessions.filter(slot => slot.min_age_limit <= person.age &&  slot.available_capacity > 0)
       console.log({date:date, validSlots: validSlots.length})
       if(validSlots.length > 0) {
                  await notify(person,validSlots);
       }       
     }  
   }catch(error){
       console.log(error)
   //    throw error
   }
}


let fetchNext10Days = async()=>{
    let dates = [];
    let today = moment();
    for(let i = 0 ; i < 10 ; i ++ ){
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(1, 'day');
    }
    return dates;
}

let checkAvailability = async(person)=>{
    let datesArray = await fetchNext10Days();
    datesArray.forEach(async(date) => {
        await checkSlots(person,date)
    })
}




let main = async()=>{
    try {

        let person = {
          districts : [720,730,725,721],
          email : process.env.PERSON, // email of the person
          age : 18 //minimum tracking age
        }

       cron.schedule('*/1 * * * *', async () => {
             checkAvailability(person)
       });
    } catch (e) {
        console.log('an error occured: ' + JSON.stringify(e, null, 2));
       // throw e
    }
}

main()