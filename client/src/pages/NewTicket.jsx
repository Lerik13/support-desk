import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getProducts } from "../features/products/productSlice";
import { createTicket, reset } from '../features/tickets/ticketSlice'

function NewTicket() {
	const {user} = useSelector((state) => state.auth)
	const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets)
	const {products} = useSelector((state) => state.products)

	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState(-1);
	const [description, setDescription] = useState('');

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess) {
			dispatch(reset())
			navigate('/tickets')
		}
		
		dispatch(getProducts())

	

		dispatch(reset())
	}, [dispatch, isError, isSuccess, navigate, message]);

	const onSubmit = (e) => {
		e.preventDefault()
		if (product === -1) {
			toast.error('Please select a product')
		} else if(!description) {
			toast.error('Please fill a description field')
		}
		else {
			dispatch(createTicket({product, description}))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<BackButton url='/' />
			<section className="heading">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className="form">
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<input type="text" className="form-control" value={name} disabled />
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Email</label>
					<input type="text" className="form-control" value={email} disabled />
				</div>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="product">Product</label>
						<select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
							<option key={-1} value={-1}>Select a product</option>
							{products.map((p) => (
								<option key={p._id} value={p._id}>{p.name}</option>	
							))}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description of the issue</label>
						<textarea 
							name="description"
							id="description"
							className="form-control"
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default NewTicket