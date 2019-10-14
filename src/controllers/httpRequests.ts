import { createHttpClient } from '../utils/http-client';
import { getConfig } from '../utils/config';

const client = createHttpClient(`http://localhost:${getConfig('PORT', 3000)}`);

export function callTest() {

    // let loginp=false;
    // client.post('/api/auth/register', { json: { id: '', email: 'roni@gmail.com', userName: 'roni', password: '123', image: '' } })
    //     .then((data) => {
    //        // loginp = { email:data[0].email, password:data[0].password};
    //         loginp=true;
    //     })
    //     .catch(err => console.log(err))
    // //,{id:'',email:'roni@gmail.com',userName:'roni',password:'123',image:''}

    // function me() {
    //     client.post('api/auth/login', { json: { email: "roni@gmail.com", password: "123" } })
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    // if(loginp)
    //     me();

    // client.get('/api/tweets')
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })

    // client.get('/api/tweets/5da2048f067af55dc849c885')
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //     })
    //   client.delete('api/tweets/5d9bab77c9c1db21c009d235')
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.log(error);
    // })

}