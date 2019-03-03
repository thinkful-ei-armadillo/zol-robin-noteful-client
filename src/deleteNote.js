// import { API_ENDPOINT } from './config';

export default function deleteNote(noteId, callBack){
    const API_ENDPOINT = 'https://secret-oasis-13375.herokuapp.com';
    const options = {
                      method: 'DELETE',
                      headers: {'content-type': 'application/json'}
                    }
    console.log(noteId);
    fetch(`${API_ENDPOINT}/api/noteful/notes/${noteId}`, options)
                    .then(res => {
                        if(res.ok) return res;
                        else throw new Error(res.status)
                    })
                    .then(() => callBack(noteId))
                    .catch(error => console.log(error))
}