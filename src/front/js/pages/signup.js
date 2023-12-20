import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



export const Signup = () => {
    const { store, actions } = useContext(Context);

    const [signName, setSignName] = useState("");
    const [signEmail, setSignEmail] = useState("");
    const [signPassword, setSignPassword] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const signupResult = actions.signup(signName, signEmail, signPassword)
        signupResult.then(result => {
            if (result === true) {
                navigate("/login")
            }
            else {
                alert("The email you provided is already taken.")
            }
        })
    };


    return (
        <form className="info-wrapper signup-wrapper container w-50 mt-2 py-auto py-5 d-flex flex-column was-validated" onSubmit={handleSubmit}>
            <h2 className="text-white">Signup</h2>
            <div className="row d-flex mt-5 justify-content-center">
                <div className="form-group col-12">
                    <div className="input-group">

                        <input type="text" name="name" required value={signName}
                            onChange={(e) => setSignName(e.target.value)} className="form-control p-2 border-4">
                        </input>


                    </div>

                    <div className="input-group mt-3">

                        <input
                            type="email" name="email" required value={signEmail}
                            onChange={(e) => setSignEmail(e.target.value)} className="form-control p-2 border-4">
                        </input>


                    </div>

                    <div className="input-group mt-3">

                        <input
                            type="password" name="password" required value={signPassword}
                            onChange={(e) => setSignPassword(e.target.value)} className="form-control p-2 border-4">
                        </input>


                    </div>
                </div>
            </div>
            </form>
    );};
