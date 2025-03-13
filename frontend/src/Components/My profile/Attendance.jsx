import { useEffect, useState } from "react";
import API from "../Utils/axiosConfig"; // Import Axios configuration

function Attendance() {
    const [projectsData, setProjectsData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await API.get("/projects"); 
                setProjectsData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="w-full">
            <div className="bg-blue-100 rounded-lg p-4 shadow-md h-48">
                <h3 className="font-semibold border-b border-neutral-800 text-center">
                    Performance and Attendance
                </h3>
            </div>
        </div>
    );
}

export default Attendance;
