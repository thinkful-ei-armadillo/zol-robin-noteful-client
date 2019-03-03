import React, {Component} from 'react';
import NotefulContext from '../NotefulContext';
// import { API_ENDPOINT } from '../config';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: ''
    }
  }

  static contextType = NotefulContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const API_ENDPOINT = 'https://secret-oasis-13375.herokuapp.com';
    
    fetch(`${API_ENDPOINT}/api/noteful/folders`, {
      method:'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({folder_name: this.state.folder}),
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      }
      return res.json()})
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push('/');
      })
      .catch(error => console.log(error))
  }

  setFolderName = (folder) => {
    this.setState({
      folder
    })
  }

  render() {
    console.log(this.context)
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label > Folder Name: 
          <input name='folder' type='text' placeholder='folder name'
                  onChange={(event)=> this.setFolderName(event.target.value)} required
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={() => this.props.history.goBack()}>Cancel</button>
      </form>
    )
  }
}