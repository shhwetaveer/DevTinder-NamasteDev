import React, { useState } from 'react'

const EditProfile = () => {
    const [emailId, setEmailId] = useState("");
    const [error, setError] = useState("");

  return (
    <div>
        <div className="flex justify-center my-15">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">First Name: </legend>
                        <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="input" placeholder="Type here" />
                    </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" >Login</button>
                </div>
            </div>
        </div></div>
    </div>
  )
}

export default EditProfile