import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetch(){
    const [posts, setPosts] = useState([])

    useEffect(() =>{

        axios.get('https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=10000', {
                headers: {
                    'X-Parse-Application-Id': 'PMt2m00nC5cTN7QyFYe2jLBFpoKZIfHr84HtkG4e', // This is your app's application id
                    'X-Parse-REST-API-Key': 'FW5kVmVUSIkjlhrCsa2l4rJFsK3XKjPhhjfSl8X0', // This is your app's REST API key
                }
            })
            //.then(res => {res.data.results.forEach(element => console.log(element.Make))}) // this prints all makes
            .then(res => {res.data.results.reduce((accumulator, current) => {
                if (!accumulator.find((item) => item.Make === current.Make)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, []).map(item => item.Make).sort().forEach(item => console.log(item))})
            .catch(err => {console.log(err)})
    })

    return (
        <div>
            <ul>
                {
                    posts.map(post => <li key = {post.data.results.objectId} > {post.data.results.Model} </li>)
                }
            </ul>
        </div>
    )
}

/**
 *  const fetch = require('node-fetch');
 *
 *     (async () => {
 *         const response = await fetch(
 *             'https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=10',
 *             {
 *                 headers: {
 *                     'X-Parse-Application-Id': 'PMt2m00nC5cTN7QyFYe2jLBFpoKZIfHr84HtkG4e', // This is your app's application id
 *                     'X-Parse-REST-API-Key': 'FW5kVmVUSIkjlhrCsa2l4rJFsK3XKjPhhjfSl8X0', // This is your app's REST API key
 *                 }
 *             }
 *         );
 *         const data = await response.json(); // Here you have the data that you need
 *         console.log(JSON.stringify(data, null, 2));
 *     })();
 */



export default DataFetch