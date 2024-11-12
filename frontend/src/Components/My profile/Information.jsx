


function Information({member}){
    return(
        <>
        <div className="bg-blue-100 rounded-lg p-4 space-y-2 shadow-md">
            <h3 className="font-semibold border-b border-neutral-800 pb-1">Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Department:</span> {member.department}</p>
              <p><span className="font-semibold">Academic Year:</span> {member.year}</p>
              <p><span className="font-semibold">Email:</span> {member.email}</p>
              <p><span className="font-semibold">Phone:</span> {member.phnumber}</p>
            </div>
        </div>
        </>
    )
}

export default Information;