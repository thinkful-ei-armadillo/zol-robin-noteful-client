import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import deleteNote from '../deleteNote';

class NoteInfo extends Component {
    static contextType = NotefulContext;

    getNoteInfo = (noteId) => {
        return this.context.notes.find(note => note.id === noteId)
      }
    
    handleClickDelete = (id, callBack) => {
        deleteNote(id, callBack); 
         this.props.history.push('/');
    }

    render(){
        const { noteId } = this.props.match.params
        const note = this.getNoteInfo(Number(noteId));
        return (
            <div className='note'>
                <h2 className='title'>
                    {note.name}
                </h2>
                <button className='delete-note' onClick={() => this.handleClickDelete(note.id, this.context.deleteNote)}>
                    DELETE
                </button>
                <div className='modified-date'>
                    Modified <span>{note.modified}</span>
                </div>
                <div>{note.content}</div>
            </div>
        )
    }
}

export default NoteInfo