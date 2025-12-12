import {Container, Button} from 'react-bootstrap';
import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import HeaderBar from "../components/landing_page/HeaderBar.jsx";
import Footer from '../components/landing_page/Footer.jsx';
import InfoPages from '../components/landing_page/InfoPages.jsx';


export default function LandingPage() {
    const navigate = useNavigate();    
    

    return (
        <div>
        <HeaderBar />
        <video
          className="w-100 landing-video"
          autoPlay
          muted
          loop
        >
          <source
            className="h-100"
            src="https://video.wixstatic.com/video/7477d5_4cd800b3a331403ebfd2297ecf25602d/720p/mp4/file.mp4"
            type="video/mp4"
          />
          </video>


            
            <div className="p-5 border text-center mb-5">

              <h3>Welcome to SJVHS' Gold and White Award Tracker!</h3>
              <br />
              <p>Created so poeple can track their activities and determine if they have received the award!</p>
              <hr></hr>
              <Button size="lg" variant="dark" onClick={(e)=>navigate("/login")}>Log into Account</Button>

            
        </div>
          <InfoPages />
        <Footer />
        </div>
    )
}
