import * as React from 'react'
import Popover from '@mui/material/Popover'
import { NotesModal } from '../notesModal/NoteModal'
import { AddNote, DeleteNote, UpdateNote } from '../../graphql/types/graphql-global-types'
import { NetworkService } from '../../service/networkService'
import { excludeField } from '../../helpers/helpers'
import styles from './NotePopover.module.scss'
import { ILog, INote } from '../../graphql/types/ApiTypes'
import { useLogContext } from '../../context/logContainer/LogContainer'

export enum ILogNoteAction {
  Add,
  Update,
  Delete,
}
interface INotePopover {
  notes: INote[]
  logId: string
}

export const NotesPopover: React.FunctionComponent<INotePopover> = ({ notes, logId }) => {
  const { doLogNoteAction } = useLogContext()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [allNotes, setAllNotes] = React.useState([...notes])
  const addNewNote = async (payload: AddNote) => {
    try {
      const result: ILog = await NetworkService.AddLogNote(payload)
      doLogNoteAction(payload.logId, [...result.notes])
      setAllNotes((prevState: INote[]) => {
        let prev = [...prevState]
        const note = excludeField(result.notes[result.notes.length - 1], '__typename')
        prev = [{ ...note }, ...prev]
        return prev
      })
    } catch (err) {
      console.log('Error While Adding the note', err)
    }
  }

  const updateNote = async (payload: UpdateNote, index: number, noteTextEdit: string) => {
    try {
      const result: ILog = await NetworkService.UpdateLogNote(payload)
      doLogNoteAction(payload.logId, [...result.notes])
      setAllNotes((prevState: INote[]) => {
        const prev = [...prevState]
        prev[index].note = noteTextEdit
        return prev
      })
    } catch (err) {
      console.log('Error while updating the note', err)
    }
  }

  const deleteNote = async (payload: DeleteNote, index: number) => {
    try {
      const noteToBeDeleted = allNotes[index]
      const result: ILog = await NetworkService.DeleteLogsNote(payload)
      doLogNoteAction(payload.logId, [...result.notes])
      setAllNotes((prevState) => prevState.filter((note) => note.id !== noteToBeDeleted.id))
    } catch (err) {
      console.log('Error While Deleting the Note', err)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      {allNotes[0]?.note ? (
        <p style={{ margin: '0' }} onClick={handleClick}>
          {allNotes[0]?.note}
        </p>
      ) : (
        <span className={styles['note--header']} onClick={handleClick}>
          Add Note
        </span>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <NotesModal
          notes={allNotes}
          logId={logId}
          handleModalClose={handleClose}
          addNewNote={addNewNote}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </Popover>
    </div>
  )
}
