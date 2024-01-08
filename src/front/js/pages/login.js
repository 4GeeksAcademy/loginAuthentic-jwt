import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const loginResult = actions.login(email, password)
        loginResult.then(result => {
            console.log(result)
            if (result === true) {
                navigate("/private")
            }
            
        })
    };

    return (

        <form className="text-center container w-50 d-flex" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {
                (store.token && store.token != "" && store.token != undefined) ?
                navigate("/private")
                    :
                    <div>
                        <div className="row d-flex mt-5 justify-content-center">
                            <div className="form-group col-12">

                                <div className="input-group mt-3">
                                    
                                    <input type="email" placeholder="Enter your email." required value={email}
                                        onChange={(e) => setEmail(e.target.value)} />

                                </div>

                                <div className="input-group mt-3">
                                    <input
                                        type="password" placeholder="Enter your password." required value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    
                                </div>
                            </div>
                        </div>

                        <div className="input-group mt-3">

                        <button type="submit" className="btn-success"> Login </button>
                            
                        </div>
                    </div>
            }
        </form>
    );
};
