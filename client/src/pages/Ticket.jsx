import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {FaPlus} from 'react-icons/fa'
import { getTicket, closeTicket, openTicket, editDescription } from '../features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesReset, editNote, deleteNote } from '../features/notes/noteSlice'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal';
import { getProduct, getProductOfTicket } from "../features/products/productSlice";
import { FaEdit } from 'react-icons/fa'

const customStyles = { // for Modal
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
Modal.setAppElement('#root');

function Ticket() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalText, setModalText] = useState('');
	const [modalPurpose, setModalPurpose] = useState('create note'); // by default Modal window open for Creating Note, 'edit note', 'edit description'
	const [noteId, setNoteId] = useState(null);

	const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
	const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

	const {product} = useSelector((state) => state.products)
	const productName = product ? product.name : 'not exists'
	
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {ticketId} = useParams()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		dispatch(getTicket(ticketId))
		dispatch(getNotes(ticketId))
		dispatch(getProductOfTicket(ticketId))

		// eslint-disable-next-line
	}, [isError, message, ticketId]);

	const onTicketClose = () => {
		if (window.confirm('Are you sure you want to close the ticket?') === true) {
			dispatch(closeTicket(ticketId))
			toast.success('Ticket closed')
			navigate('/tickets')
		}
	}

	const onTicketOpen = () => {
		if (window.confirm('Are you sure you want to reopen the ticket?') === true) {
			dispatch(openTicket(ticketId))
			toast.success('Ticket reopened')
			navigate('/tickets')
		}
	}

	// Open/Close modal
	const openModalForAddNote = () => {
		setModalPurpose('create note')
		setModalIsOpen(true)
	}
	const openModalForEditNote = (id, txt) => {
		setModalPurpose('edit note')
		setNoteId(id)
		setModalText(txt)
		setModalIsOpen(true)
	}
	const closeModal = () => {
		setModalText('')
		setModalIsOpen(false)
	}

	// Submit - by default: Create Note, if (isEditNote) Edit Note, if (isEditDescription) Edit Description
	const onNoteSubmit = (e) => {
		e.preventDefault()
		switch (modalPurpose) {
			case 'edit note':
				dispatch(editNote({noteText: modalText, ticketId, noteId}))
				break;
			case 'edit description':
				dispatch(editDescription({description: modalText, ticketId}))
				break;
			default:
				dispatch(createNote({noteText: modalText, ticketId}))
		}
		closeModal()
	}

	// Delete note
	const removeNote = (id) => {
		if (window.confirm('Are you sure you want to remove note?') === true) {
			dispatch(deleteNote({ticketId, noteId: id}))
		}
	}

	//Edit description
	const editDescriptionText = () => {
		setModalPurpose('edit description')		
		setModalText(ticket.description)
		setModalIsOpen(true)
	}

	if (isLoading || notesIsLoading) {
		return <Spinner />
	}

	if (isError) {
		return <h3>Something went wrong</h3>
	}

	return (
		<div className='ticket-page'>
			<header className="ticket-header">
				<BackButton url='/tickets' />
				<h2>
					<span className='color-lighter'>Ticket ID:</span> {ticket._id}
					<span className={`status status-${ticket.status}`}>{ticket.status}</span>
				</h2>
				<h3>
					<span className='color-lighter'>Date Submitted:</span> {new Date(ticket.createdAt).toLocaleString('en-US')}
				</h3>
				<h3>
					<span className='color-lighter'>Product:</span> {productName}
				</h3>
				<hr />
				<div className="ticket-desc">
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
					{ticket.status !== 'closed' && (
						<div className="desc-btns">
							<button onClick={editDescriptionText} className='btn-note btn-edit'>
								<FaEdit />
							</button>
						</div>
					)}
				</div>
				<h2>Notes</h2>
			</header>

			{ticket.status !== 'closed' && (
				<button className="btn" onClick={openModalForAddNote}><FaPlus/> Add Note</button>
			)}

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Edit modal text'>
				<h2>
					{(modalPurpose === 'edit description') 
					? 'Edit description' 
					: ((modalPurpose === 'edit note') ? 'Edit note' : 'Add note') }
				</h2>
				<button className="btn-close" onClick={closeModal}>X</button>
				<form onSubmit={onNoteSubmit}>
					<div className="form-group">
						<textarea 
							name="modalText"
							id="modalText"
							className='form-control modal-control'
							placeholder={(modalPurpose === 'edit description') ? 'Description of issue' : 'Note text'}
							value={modalText}
							onChange={(e) => setModalText(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button type='submit' className="btn">Submit</button>
					</div>
				</form>
			</Modal>
			
			{notes.map((note) => (
				<NoteItem 
					key={note._id}
					note={note}
					isEdited={ticket.status !== 'closed'}
					editHandler={() => {openModalForEditNote(note._id, note.text)}}
					deleteHandler={() => {removeNote(note._id)}}
				/>
			))}

			{ticket.status === 'closed' ? (
				<button className="btn btn-block btn-open" onClick={onTicketOpen}>
					Reopen Ticket
				</button>
			) : (
				<button className="btn btn-block btn-danger" onClick={onTicketClose}>
					Close Ticket
				</button>
			)}
		</div>
	)
}

export default Ticket