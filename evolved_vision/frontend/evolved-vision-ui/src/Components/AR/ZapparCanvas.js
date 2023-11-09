import React, { useState } from "react";
import { ZapparCamera, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import ImgTracking from "./ImgTracking";

const App = () => {
  const [arInfo, setArInfo] = useState([
    {
      header: "camera",
      description: "cam target image",
      targetImage: "https://files.catbox.moe/dhr9y6.zpt",
      color: "blue",
    },
    {
      header: "Dog",
      description: "dog target image",
      targetImage: "https://files.catbox.moe/7x5hfw.zpt",
      color: "red",
    },
    {
      header: "gratisography",
      description: "gratisography target img",
      targetImage: "https://files.catbox.moe/i4ivzf.zpt",
      color: "green",
    },
    {
      header: "Microscope",
      targetImage: "https://files.catbox.moe/nvdpou.zpt",
      description:
        "A microscope is an instrument that can be used to observe small objects, even cells. The image of an object is magnified through at least one lens in the microscope.",
    },
  ]);

  return (
    <ZapparCanvas>
      <ZapparCamera />
      {arInfo.map((info) => (
        <ImgTracking {...info} />
      ))}
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
};

export default App;
