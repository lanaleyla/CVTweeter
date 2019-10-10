import { createHttpClient } from '../utils/http-client';
import { getConfig } from '../utils/config';

const client = createHttpClient(`http://localhost:${getConfig('PORT', 3000)}`);

export function callTest() {

    // client.get('/api/members')
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })

    // client.get('/api/members/5d9bab77c9c1db21c009d232')
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
        
    // client.get('/api/tweets')
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.log(error);
    // })

    //   client.delete('api/tweets/5d9bab77c9c1db21c009d235')
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.log(error);
    // })

}