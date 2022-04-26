import {useSelector} from 'react-redux'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

function NoteItem({note, isEdited, editHandler, deleteHandler}) {
	const {user} = useSelector((state) => state.auth)

	return (
		<div className="note" style={{
			backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
			color: note.isStaff ? '#fff' : '#000'
		}}>
			<h5>
				Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
			</h5>
			<p>{note.text}</p>
			<div className="note-date">{new Date(note.createdAt).toLocaleString('en-US')}</div>
			{ isEdited && !note.isStaff && (
				<div className="note-btns">
					<div>
						<button onClick={editHandler} className='btn-note btn-edit'><FaEdit /></button>
						<button onClick={deleteHandler} className='btn-note btn-delete'><FaTrashAlt /></button>
					</div>
				</div>
			)}
		</div>
	)
}

export default NoteItem