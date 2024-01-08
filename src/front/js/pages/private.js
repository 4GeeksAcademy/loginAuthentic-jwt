import React, { useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);

  if (sessionStorage.getItem("token") == null){

  return (
    <>
      
      <h1> This is a private page! To access the content you must be a valid user. Please <Link to="/login">login</Link>!</h1>
    </>
  )
}else{
  return(
  <>
      <div className="row">
          <h1>Welcome to your private page</h1>
      </div>
  </>
)
}
  }
