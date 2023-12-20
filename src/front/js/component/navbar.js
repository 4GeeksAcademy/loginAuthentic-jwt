import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const [selectValue, setSelectValue] = useState("");

	const navigate = useNavigate();

	const handleSelectChange = (event) => {
		setSelectValue(event.target.value);
	}

	const handleLogout = (event) => {
		actions.logout()
		navigate("/")
	}


	useEffect(() => {
		if (store.token) {
			actions.getUserDetails()
		}
	}, []);
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token ? 
					<>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-md-auto gap-2 ">

							<li className="nav-item rounded pe-3">
								<a className="nav-link active" aria-current="page" href="/signup">Sign Up</a>
							</li>

							<li className="nav-item rounded">
								<a className="nav-link" href="/login">Log In</a>
							</li>
						</ul>
					</div>
				</>
					 : 
					 <>
						<button onClick= {() => actions.logout()}className="btn btn-primary">Log out</button>
					</>
					}
				</div>
			</div>
		</nav>
	);
};
