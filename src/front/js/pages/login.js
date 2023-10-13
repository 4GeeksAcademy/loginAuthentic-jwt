import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const {email, setEmail} = useState("");
    const {password, setPassword} = useState("");
    const handleClick = () => {

        const opts = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                "email": email,
                "password": password
            })
        }
      fetch('https://upgraded-space-orbit-4j776j77qp7q2799p-3001.app.github.dev/api/token', opts)
            .then(
                resp => {
                    if(resp.status === 200) return resp.json();
                    else alert("There has been some error");
                }
            )
            .then(data => {
                console.log("this came from the back-end", data)
                sessionStorage.setItem("token", data.access_token);
            }
            )
            .catch(error => {
                console.log("There was an error!", error)
            })
    }

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
		<div>
            <input type= "text" placeholder= "email" value={email} onChange={(e) => setEmail (e.target.value)}/>
            <input type= "password" placeholder= "password" value={password} onChange={(e) => setPassword (e.target.value)} />
        <button onClick={handleClick}>Login</button> 
        </div>
		</div>
	);
};
