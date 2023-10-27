import React, { useState } from "react";
import { ZapparCamera, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import ImgTracking from "./ImgTracking";

const App = () => {
  const [arInfo, setArInfo] = useState([
    {
      description: "cam target image",
      targetImage: "https://files.catbox.moe/dhr9y6.zpt",
      color: "blue",
    },
    {
      description: "dog target image",
      targetImage: "https://files.catbox.moe/7x5hfw.zpt",
      color: "red",
    },
    {
      description: "gratisography target img",
      targetImage: "https://files.catbox.moe/i4ivzf.zpt",
      color: "green",
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
