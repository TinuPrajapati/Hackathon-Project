import { useState } from "react";
import axios from "axios";

const FriendRequestButton = ({ friendId }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/request`, {
        friendId,
      },{
        withCredentials:true
      }
    );
        console.log(response)
      if (response.data.success) {
        setRequestSent(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Failed to send request.");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={sendFriendRequest}
      className={`px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 absolute z-10 right-[32%] ${requestSent ? "bg-green-500" : "bg-blue-500"} ${loading ? "opacity-50" : ""}`}
      disabled={requestSent || loading}
    >
      {requestSent ? "Request Sent" : loading ? "Sending..." : "Add Friend"}
    </button>
  );
};

export default FriendRequestButton;
