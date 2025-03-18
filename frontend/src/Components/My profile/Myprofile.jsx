import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Utils/axiosConfig"; // Import the configured Axios instance
import Projects from "./Projects";
import Attendance from "./Attendance";
import Information from "./Information";
import Profileinfo from "./Profileinfo";

const Myprofile = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await API.get(`/api/members/${userId}`); // Use API instance
        setMember(response.data);
        console.log("member data:", member);
      } catch (err) {
        setError("Member not found");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]); // Re-fetch when ID changes

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  console.log() // logging for testing purposes 
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 sm:p-6 rounded-lg min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <div className="p-4 space-y-6 flex flex-col w-full items-center">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <h1 className="text-2xl sm:text-3xl font-semibold">My Profile</h1>
            <button className="text-red-500 bg-red-100 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition">
              Delete Account
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Profileinfo memberId={member._id} />

            <div className="grid gap-6">
              <div className="w-full overflow-hidden">
                <Information member={member} />
              </div>
              <div className="w-full overflow-hidden">
                <Projects id={member._id} />
              </div>
            </div>
          </div>

          <Attendance />
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
