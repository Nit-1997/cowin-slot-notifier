const axios = require("axios")



let parser = async()=>{
	let states = [
        {
            "state_id": 1,
            "state_name": "Andaman and Nicobar Islands"
        },
        {
            "state_id": 2,
            "state_name": "Andhra Pradesh"
        },
        {
            "state_id": 3,
            "state_name": "Arunachal Pradesh"
        },
        {
            "state_id": 4,
            "state_name": "Assam"
        },
        {
            "state_id": 5,
            "state_name": "Bihar"
        },
        {
            "state_id": 6,
            "state_name": "Chandigarh"
        },
        {
            "state_id": 7,
            "state_name": "Chhattisgarh"
        },
        {
            "state_id": 8,
            "state_name": "Dadra and Nagar Haveli"
        },
        {
            "state_id": 37,
            "state_name": "Daman and Diu"
        },
        {
            "state_id": 9,
            "state_name": "Delhi"
        },
        {
            "state_id": 10,
            "state_name": "Goa"
        },
        {
            "state_id": 11,
            "state_name": "Gujarat"
        },
        {
            "state_id": 12,
            "state_name": "Haryana"
        },
        {
            "state_id": 13,
            "state_name": "Himachal Pradesh"
        },
        {
            "state_id": 14,
            "state_name": "Jammu and Kashmir"
        },
        {
            "state_id": 15,
            "state_name": "Jharkhand"
        },
        {
            "state_id": 16,
            "state_name": "Karnataka"
        },
        {
            "state_id": 17,
            "state_name": "Kerala"
        },
        {
            "state_id": 18,
            "state_name": "Ladakh"
        },
        {
            "state_id": 19,
            "state_name": "Lakshadweep"
        },
        {
            "state_id": 20,
            "state_name": "Madhya Pradesh"
        },
        {
            "state_id": 21,
            "state_name": "Maharashtra"
        },
        {
            "state_id": 22,
            "state_name": "Manipur"
        },
        {
            "state_id": 23,
            "state_name": "Meghalaya"
        },
        {
            "state_id": 24,
            "state_name": "Mizoram"
        },
        {
            "state_id": 25,
            "state_name": "Nagaland"
        },
        {
            "state_id": 26,
            "state_name": "Odisha"
        },
        {
            "state_id": 27,
            "state_name": "Puducherry"
        },
        {
            "state_id": 28,
            "state_name": "Punjab"
        },
        {
            "state_id": 29,
            "state_name": "Rajasthan"
        },
        {
            "state_id": 30,
            "state_name": "Sikkim"
        },
        {
            "state_id": 31,
            "state_name": "Tamil Nadu"
        },
        {
            "state_id": 32,
            "state_name": "Telangana"
        },
        {
            "state_id": 33,
            "state_name": "Tripura"
        },
        {
            "state_id": 34,
            "state_name": "Uttar Pradesh"
        },
        {
            "state_id": 35,
            "state_name": "Uttarakhand"
        },
        {
            "state_id": 36,
            "state_name": "West Bengal"
        }
    ]



let combinedData = []

for (let i=0;i<states.length;i++){
//find district id 
    let config = {
        method: 'get',
        url: 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+states[i].state_id,
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'hi_IN'
        }
    };

    response = await axios(config)
    
    let combinedDataObj = {
    	state : states[i].state_name,
    	districts : response.data.districts
    }

    combinedData.push(combinedDataObj)

}

return combinedData

}


let createDistrictTableHtml = async(districtArr)=>{
   let rows = ``

 for (let i=0;i<districtArr.length;i++){
     let row = `<tr>
                      <td>`+districtArr[i].district_id+`</td>
                      <td>`+districtArr[i].district_name+`</td>
                    </tr>
                     `
      rows = rows + row       
  }
   let table = `<table id="tests">
                <tr>
                    <th>district_id</th>
                    <th>District name</th>
                </tr>
                 `+rows+`
            </table>`

    return table        
}



let BuildCombinedHtml = async()=>{
 let combinedData = await parser()


 let AllTables = ``
 for (let i=0;i<combinedData.length;i++){
 	 let table =  await createDistrictTableHtml(combinedData[i].districts)
     let heading = `<h3 class="additionalStyles">`+combinedData[i].state+`</h3>`
     let stateTable = `<div>`+heading+`<br/>`+table+`</div>`
     AllTables = AllTables+stateTable     
  }


let finalHtml = `
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
            <body>`+AllTables+`</body>
            </html>

        `
        console.log(finalHtml)
        return finalHtml
}


BuildCombinedHtml()


  




