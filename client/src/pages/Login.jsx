import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import {login, reset} from '../features/auth/authSlice'

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const {email, password} = formData

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		//Redirect when logged in
		if (isSuccess || user) {
			navigate('/')
		}

		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password
		}

		dispatch(login(userData))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please login to get support</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input 
							type="email"
							className="form-control"
							id='email'
							name='email'
							value={email}
							onChange={onChange}
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className="form-group">
						<input 
							type="password"
							className="form-control"
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter your password'
							required
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

export default Login