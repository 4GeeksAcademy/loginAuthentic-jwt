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
		navigate("/login")
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

				<Link to="/private">
					<span className="nav-link btn-primary text-white">Private</span>
				</Link>
				
				{!store.token ?
				<>
						<ul className="navbar-nav ms-md-auto gap-2 ">

							<li className="nav-item">
							<Link to="/signup">
								<button className="nav-link btn-primary" aria-current="page">Sign Up</button>
							</Link>
							</li>

							<li className="nav-item">
							<Link to="/login">
								<button className="nav-link btn-primary" href="/login">Log In</button>
							</Link>
							</li>
						</ul>
				</>
				:
				<>
							<li>
								<button onClick={handleLogout} className="nav-link btn-danger">Log out</button>
							</li>
						
				</>
			}
				</div>
			
		</nav>
	);
};
