function Information({ member }) {
    return (
      <div className="bg-blue-100 px-2 w-full overflow-x-hidden rounded-lg py-4 space-y-4 shadow-md  flex-wrap ">
        <h3 className="text-lg font-semibold border-b border-neutral-800 pb-2">Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Department:</span> {member.department}
          </p>
          <p>
            <span className="font-semibold">Academic Year:</span> {member.year}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {member.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {member.phnumber}
          </p>
        </div>
      </div>
    );
  }
  
  export default Information;
  