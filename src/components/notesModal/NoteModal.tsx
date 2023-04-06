import React from 'react'
import { MenuDropDown, MenuDropdownItem } from '../menuDropdown/menuDropdown'
import styles from './NoteModal.module.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { AddNote, DeleteNote, UpdateNote } from '../../graphql/types/graphql-global-types'
import { INote } from '../../graphql/types/ApiTypes'
// import { useCompanyContext } from '../../context/companyContext/CompanyContainer'

const NOTES_MENU_DROPDOWN: MenuDropdownItem[] = [
  { title: 'Edit', icon: <EditIcon /> },
  { title: 'Delete', icon: <DeleteIcon />, color: '#E94545' },
]
export interface INotesModal {
  notes: INote[]
  logId: string
  handleModalClose: () => void
  addNewNote: (note: AddNote) => void
  updateNote: (note: UpdateNote, index: number, noteText: string) => void
  deleteNote: (note: DeleteNote, index: number) => void
}

const NOTE_TYPE = {
  ADD: 'Add',
  EDIT: 'Edit',
  DELETE: 'Delete',
}
// const userId = '61b05225a7d552209815bd69'
// const getFirstUserId = (users: IUser[]) => {
//   if (users.length > 0) {
//     return users[0]._id
//   }

//   return ''
// }

export const NotesModal: React.FC<INotesModal> = ({
  notes,
  logId,
  handleModalClose,
  addNewNote,
  updateNote,
  deleteNote,
}): React.ReactElement => {
  // const { users } = useCompanyContext()
  const [editSelectedNote, setEditSelectedNote] = React.useState(-1)
  const [noteText, setNoteText] = React.useState('') //add
  const [noteTextEdit, setNoteTextEdit] = React.useState('') //edit

  const handleOptionSelect = (option: number, index: number) => {
    switch (option) {
      case 1: // Delete
        handleDeleteNote(index)
        break
      case 0: //Edit
        setNoteTextEdit(notes[index].note)
        setEditSelectedNote(index)
        break
      default:
        break
    }
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
    switch (type) {
      case NOTE_TYPE.ADD:
        setNoteText(event.target.value)
        break
      case NOTE_TYPE.EDIT:
        setNoteTextEdit(event.target.value)
        break
      default:
        break
    }
  }

  const handleNoteSubmit = (type: string) => {
    switch (type) {
      case NOTE_TYPE.ADD:
        handleAddNote()
        break
      case NOTE_TYPE.EDIT:
        handleEditNote()
        break
      default:
        break
    }
  }

  const handleDeleteNote = (index: number) => {
    const noteToBeDeleted = notes[index]

    const payload: DeleteNote = {
      logId: logId,
      noteId: noteToBeDeleted.id,
    }

    deleteNote(payload, index)
    handleModalClose()
  }

  const handleAddNote = async () => {
    const noteToAdd = noteText
    const payload: AddNote = {
      note: noteToAdd,
      logId: logId,
    }
    addNewNote(payload)
    handleModalClose()
  }

  const handleEditNote = async () => {
    const noteTobeEditted = notes[editSelectedNote]
    const payload: UpdateNote = {
      logId: logId,
      noteId: noteTobeEditted.id,
      note: noteTextEdit,
    }

    updateNote(payload, editSelectedNote, noteTextEdit)
    setEditSelectedNote(-1)
    setNoteTextEdit('')
    handleModalClose()
  }

  const messageBody = () => {
    return notes.map((note, index) => (
      <React.Fragment key={index}>
        <div className={styles['name-container']}>
          <p className={styles['name']}>{note?.username || '-'}</p>
          <p className={styles['name-date']}>{new Date(note.editedAt).toDateString()}</p>
          <MenuDropDown options={NOTES_MENU_DROPDOWN} onChange={handleOptionSelect} selectedItem={index} />
        </div>
        {index === editSelectedNote ? (
          textAreaBody(noteTextEdit, NOTE_TYPE.EDIT)
        ) : (
          <p className={styles['message-text']}>{note.note}</p>
        )}
      </React.Fragment>
    ))
  }

  const textAreaBody = (value: string, type: string) => (
    <div className={styles['text-area-container']}>
      <textarea
        placeholder="Type here, 100 characters max "
        defaultValue={value}
        onChange={(e) => handleNoteChange(e, type)}
      />
      <img
        src={value.length ? '/images/AddNote.svg' : '/images/send-note.svg'}
        style={{ cursor: value.length ? 'pointer' : 'not-allowed' }}
        onClick={() => value.length && handleNoteSubmit(type)}
      />
    </div>
  )

  return (
    <div className={styles['container']}>
      {notes.length ? (
        <div className={styles['message-container']}>{messageBody()}</div>
      ) : (
        <span className={styles['note--header']}>Notes</span>
      )}
      <div className={styles['message-textbox-container']}>{textAreaBody(noteText, NOTE_TYPE.ADD)}</div>
    </div>
  )
}
