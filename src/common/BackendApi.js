import axios from 'axios';

export function postRant(rant, author) {
    let post = {
        id :{
          timestamp: Date.now() ,
          date: new Date(Date.now()).toLocaleString()
        },
        author: author,
        text: rant
      }
  
      axios.post('http://localhost:8080/posts/', post)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}