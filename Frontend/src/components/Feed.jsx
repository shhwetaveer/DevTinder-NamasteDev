import { use, useEffect } from "react";
import UserCards from "./UserCards"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () =>{
    if (feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed",{
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res.data);

    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(() =>{
    getFeed();
  },[]);
  return (
    feed && (
    <div className="flex justify-center my-10">

      <UserCards user={feed[5]}/>
    </div>
    )
  )
}

export default Feed;