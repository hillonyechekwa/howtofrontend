// require('dotenv').config()
// const fetch = require('node-fetch')


// exports.handler = async (event) => {
//     const {name, email} = JSON.parse(event.body)
//     console.log(`Recieved a submission: ${email}`)
//     //add form id here:
//     const form_id = process.env.CK_FORMID
//     const url = `https://api.convertkit.com/v3/forms/${form_id}/subscribe`

//    try{
//        await fetch(url, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify({
//                api_key: process.env.CK_API_KEY,
//                first_name: name,
//                email,
//            }),
//        })
//        .then(res => res.json())
//        .catch(error => {
//            throw new Error(error)
//        });
//        return{
//            statusCode: 301,
//            headers: {
//                Location: '/success/',
//            },
//            body: 'redirecting...',
//        };
//    }catch (error){
//        return{
//         statusCode: 500,
//         body: JSON.stringify(error.message),
//        }
//    }


//     //end of function
// }