import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { getTickets, reset } from '../features/tickets/ticketSlice'
import TicketItem from "../components/TicketItem";
import { getProducts } from "../features/products/productSlice";

function Tickets() {
	const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)
	const {products} = useSelector((state) => state.products)
	const [productNames, setProductNames] = useState(new Map());
	
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTickets())
		dispatch(getProducts())
		
		for (const [key, value] of Object.entries(products)) {
			setProductNames((prev) => prev.set(value['_id'], value['name']))
		}

		// Unmount
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		};
	}, [dispatch, isSuccess]);

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<BackButton url='/' />
			<h1>Tickets</h1>
			<div className="tickets">
				<div className="ticket-headings">
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets.map((ticket) => (
					<TicketItem key={ticket._id} ticket={ticket} productName={productNames.get(ticket.product)} />
				))}
			</div>
		</>
	)
}

export default Tickets