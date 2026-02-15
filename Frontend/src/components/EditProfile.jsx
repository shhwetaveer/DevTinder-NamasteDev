import React, { useState } from 'react'
import UserCards from './UserCards';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");
    const [gender, setGender] = useState(user.gender || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");

        if (!gender) {
    setError("Please select gender");
    return;
  }

        const payload = {
            firstName,
            lastName,
            age: Number(age),
            photoURL,
            gender,
            skills
        };

        console.log("SENDING:", payload);

        try {
            const res = await axios.patch(
                BASE_URL + "profile/edit",
                payload,
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data));

        } catch (err) {
            console.log("ERROR RESPONSE:", err.response?.data);
            setError(err.response?.data);
        }
    };


    return (
        <div className="flex justify-center my-15">
            <div>
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">First Name: </legend>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                        className="input" />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Last Name: </legend>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                        className="input" />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Photo URL: </legend>
                                    <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)}
                                        className="input" />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Age: </legend>
                                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                                        className="input" />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Gender: </legend>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="select select-bordered w-full max-w-xs">
                                        <option value="" disabled>Choose Gender</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Skills: </legend>
                                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
                                        className="input" />
                                </fieldset>
                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div></div>
            </div>
            <UserCards user={{ firstName, lastName, age, photoURL, gender, skills }} />
        </div>)
}

export default EditProfile;