import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

function Profileinfo({member}){
    return(
        <>
        <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center shadow-md">
          <img src={member.profileImage} alt={member.name} className="h-36 w-36 rounded-full" />
            <h2 className="mt-4 font-semibold text-lg">{member.name}</h2>
            <div className="flex flex-col mt-8 gap-3 items-center">
              <button className="bg-black text-white px-2 py-1 rounded hover:text-yellow-500">{member.domain}</button>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:text-neutral-800">{member.year}</button>
            </div>
            <div className="mt-8">
            <FaRegEdit className="h-9 w-auto"/>
            </div>
            
            <div className="mt-8 mb-2 space-x-4 flex text-2xl text-gray-700 gap-2 h-8">
              {/* Icons */}
              <a href={member.socialMedia.linkedin}><FaLinkedin className="h-7 w-auto" /></a>
                <a href={member.socialMedia.twitter}><FaSquareXTwitter className="h-7 w-auto" /></a>
                <a href={member.socialMedia.github}><FaGithub className="h-7 w-auto" /></a>
                <a href={member.socialMedia.facebook}><FaFacebookSquare className="h-7 w-auto" /></a>
                <a href={member.socialMedia.instagram}><FaInstagram className="h-7 w-auto" /></a>
            </div>
          </div>
        </>
    )
}

export default Profileinfo;