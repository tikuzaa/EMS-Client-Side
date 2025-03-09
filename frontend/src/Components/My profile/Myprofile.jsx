import { useParams } from "react-router-dom";
import Projects from "./Projects";
import Attendance from "./Attendance";
import Information from "./Information";
import Profileinfo from "./Profileinfo";

const Myprofile = ({ members }) => {
  const { id } = useParams();
  const memberId = parseInt(id);
  const member = members.find(member => member.id === memberId);

  if (!member) {
    return <div className="text-center text-red-500 text-lg">Member not found</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 sm:p-6 rounded-lg min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <div className="p-4 space-y-6">
          <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-semibold">My Profile</h1>
            <button className="text-red-500 bg-red-100 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition">
              Delete Account
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Profileinfo member={member} />

            <div className="grid gap-6 ">
              <Information member={member} />
              <Projects ID={memberId} />
            </div>
          </div>

          <Attendance />
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
