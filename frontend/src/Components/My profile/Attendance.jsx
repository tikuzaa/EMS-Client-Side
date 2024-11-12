import { projectsData } from "../../Data/projectsData";


function Attendance(){
    console.log(projectsData);
    return(
        <>
        <div className="bg-blue-100 rounded-lg p-4 shadow-md h-48">
        <h3 className="font-semibold border-b border-neutral-800 text-center">Performance and Attendance</h3>
          
        </div>
        </>
    )
}

export default Attendance;