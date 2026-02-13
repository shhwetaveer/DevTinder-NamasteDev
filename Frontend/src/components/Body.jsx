import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);

    const fetchUser = async() => {
        if (userData) return;
        try{
            const user = await axios.get(BASE_URL + "/profile/view",
            {withCredentials: true,
            } );
            dispatch(addUser(user.data));
        }catch(err){
            if(err.status ===401){
                navigate("/login");
            }
            console.log(err);
        }
    };

    useEffect(() => {
            fetchUser();
    },[]);
    return (    
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
            </div>
    );
};

export default Body;