import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import NotefulContext from './NotefulContext';

// import STORE from './store';
import Folderlist from './components/Folderlist'
import Folder from './components/Folder';
import AddFolder from './components/AddFolder';
import Notelist from './components/Notelist';
import NoteInfo from './components/NoteInfo';
import AddNote from './components/AddNote';
import './App.css';
import NotefulError from './components/notefulError';
// import { API_ENDPOINT } from './config';

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  // =================Update state with get request================
  componentDidMount(){
    const API_ENDPOINT = 'https://secret-oasis-13375.herokuapp.com';
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }

    Promise.all([
        fetch(`${API_ENDPOINT}/api/noteful/folders`, options),
        fetch(`${API_ENDPOINT}/api/noteful/notes`, options)
    ])
    .then(([res1, res2]) => {
      if(res1.ok && res2.ok) return Promise.all([res1.json(), res2.json()])
      else throw new Error(res1.status, res2.status)
    })
    .then(([folders, notes]) => {
      console.log(folders, notes);
      const modifiedFolders = folders.map(folder => {
        return {
          id: folder.id,
          name: folder.folder_name
        }
      })

      const modifiedNotes = notes.map(note => {
        return {
          id: note.id,
          name: note.note_name,
          content: note.content,
          folderId: note.folder_id,
          modified: note.modified_date
        }
      })

      this.setState({ 
        notes: modifiedNotes, 
        folders: modifiedFolders 
      })
    })
    .catch(error => console.log(error))
  }
  // ===============================================================

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    console.log(noteId);
    this.setState({
      notes: newNotes
    })
  }
  
  addFolder = (folder) => {
    const newFolder = {
      id: folder.id,
      name: folder.folder_name
    }
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  addNote = (note) => {
    const newNote = {
      id: note.id,
      name: note.note_name,
      content: note.content,
      folderId: note.folder_id,
      modified: note.modified_date
    }

    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }


  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
    }
    return (

      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <header>
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
          <div className="main">
            <nav className="nav-bar">
              <NotefulError>
                <Route
                  exact
                  path='/'
                  component={Folderlist}
                />
                <Route
                  exact
                  path='/folder/:folderId'
                  component={Folderlist}
                />
                <Route
                  path='/note/:noteId'
                  component={Folder}
                />
                <Route
                  path='/add-folder'
                  component={AddFolder}
                />
                <Route 
                  path='/add-note'
                  component={Folderlist} 
                />
              </NotefulError>
            </nav>
            <main className="main-note">
            <NotefulError>
                <Route
                  exact
                  path='/'
                  component={Notelist}
                />
                <Route
                  path='/folder/:folderId'
                  component={Notelist}
                />
                <Route
                  path='/note/:noteId'
                  component={NoteInfo}
                />
                <Route 
                  path='/add-folder'
                  component={Notelist}
                />                
                <Route 
                  path='/add-note'
                  component={AddNote}
                />
              </NotefulError>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
