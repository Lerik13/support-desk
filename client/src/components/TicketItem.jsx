import { Link } from "react-router-dom";

function TicketItem({ticket, productName}) {

	return (
		<div className="ticket">
			<div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
			<div>{productName}</div>
			<div className={`status status-${ticket.status}`}>
				{ticket.status}
			</div>
			<Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
				View
			</Link>
		</div>
	)
}

export default TicketItem