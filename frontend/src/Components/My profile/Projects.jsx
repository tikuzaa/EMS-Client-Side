//import React from "react";
import { projectsData } from "../../Data/projectsData";


function displayProjectData(ID){
  console.log(ID)
  const data = [];
  projectsData.forEach((ele)=>{
    ele.team.forEach((e) =>{
      if(e.id === ID){
        data.push(ele);
      }
    })
  })
  console.log(data)
  return(
    <>
    {data.map((project) => (
      <ProjectRow key={project.id} project={project} ID={ID} />
    ))}
    </>
  )
}


function ProjectRow({ project}) {
    return (
        <tr
            key={project.id}
            className="hover:bg-blue-300 transition-colors"
        >
            <td className="p-2 border-b rounded-s-3xl ">{project.name}</td>
            <td className="p-2 border-b">{project.status}</td>
            <td className="p-2 border-b">{project.progress}</td>
            <td className="p-2 border-b rounded-e-3xl">{project.deadline}</td>
        </tr>
    );
}


function Projects({ID}){

    return(
    <>
        <div className="bg-blue-100 rounded-lg p-4 space-y-2 shadow-md">
            <h3 className="font-semibold border-b border-neutral-800 pb-1">Projects/Assignments</h3>
            <table className="w-full border-separate border-spacing-0 text-center">
              <thead>
                <tr className="bg-inherit">
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Progress</th>
                  <th className="p-2">Deadline</th>
                </tr>
              </thead>
              <tbody>
              {/* {data.map((project) => (
                <ProjectRow key={project.id} project={project} ID={ID} />
              ))} */}
              {
                displayProjectData(ID)
              }
              </tbody>
            </table>
        </div>
    </>
    );
}

export default Projects;