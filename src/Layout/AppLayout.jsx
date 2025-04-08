import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';
import Header from "@/header";

const AppLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet /> {/* This is required to render child components */}

      {/* Footer section */}
      <div className="footer pl-5 pr-5  text-gray-800 flex justify-between">

        <div className="footer-contact pb-0.5">
          
        <h1 className="text-3xl mb-4 font-bold font-mono ">Shorter</h1>
          <p className="text-gray-500 whitespace-pre-line">
            Every project starts with a chat. Joven leads our client conversations<br/>
            and will be happy to discuss your project. He will also pull in the right<br/>
            people from the team when needed.
          </p>
          <Button className=" bg-green-400 mt-5 cursor-pointer">Tell us about your project</Button>
        </div>

        <div className="footer-inf mr-5 pt-10 pb-10 ">

          <div className="information  mr-5 pt-5 pb-5  space-y-2 ">
          <p><strong>Email:- </strong> <span cl>hariomptu22@gmail.com</span></p>
          <p><strong>Phone:-</strong> <span>1234567890</span></p>
          <p><strong>Address:-</strong> <span>Bangalore, India</span></p>
          </div>
          
          <div className="social-icons text-gray-500 mr-5 space-x-7 cursor-pointer">
            <LinkedInIcon />
            <XIcon />
            <InstagramIcon />
            <PersonIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
