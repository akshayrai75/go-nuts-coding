import React, { useEffect, useState } from "react";
import { ZapparCamera, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import ImgTracking from "./ImgTracking";
import { extractDetails } from "../../utils/extractSubmittedList";
import APIService from "../../utils/APIService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [arInfo, setArInfo] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    // fetch details
    // TODO: need to change the API, hardcoded the userid to get some details
    APIService.getData("member", "087dc60b-b392-4e12-92db-b5fa02c2a56e")
      .then((res) => {
        toast.success("Data received Successfully");
        console.log(res.data);
        const formData = extractDetails(res.data);
        setArInfo(formData);
      })
      .catch((error) => {
        toast.error("Internal server issue, please try again later.");
      });
  }, []);

  return (
    <>
      <ZapparCanvas>
        <ZapparCamera />
        {arInfo.map((info) => (
          <ImgTracking {...info} />
        ))}
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
      <ToastContainer />
    </>
  );
};

export default App;
