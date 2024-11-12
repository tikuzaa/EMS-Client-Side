import {useParams} from "react-router-dom";
import Projects from "./Projects";
import Attendance from "./Attendance";
import Information from "./Information";
import Profileinfo from "./Profileinfo";

const Myprofile = ({members})  => {
  
    const { id } = useParams(); // Extracting the ID from the URL params
    const memberId = parseInt(id); // Convert the ID to an integer
    const member = members.find(member => member.id === memberId); // Find the member with the matching ID
    //console.log(member)
    if (!member) {
      return <div>Member not found</div>; 
    }
  return (
    <div className="flex bg-gray-100 p-6 rounded-lg">
      <div className=" bg-white rounded-lg shadow-lg p-4 m-auto">
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <button className="text-red-500 bg-red-100 p-2 rounded-md hover:bg-red-500 hover:text-neutral-100">Delete Account</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          {/* Profile Info */}
          <Profileinfo member = {member}/>

          <div className="grid gap-6 ">
          <Information member = {member}/>  {/* Information Section */}

          
          <Projects ID = {memberId}/>  {/* Projects / Assignments Section */}
          </div>
        </div>


        <Attendance/>  {/* Performance and Attendance Section */}
      </div>
    </div>
    </div>
  );
}

export default Myprofile
