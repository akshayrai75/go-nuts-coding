import React, { useState } from "react";
import { ImageTracker } from "@zappar/zappar-react-three-fiber";

function ImgTracking({ targetImage, color }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  return (
    <ImageTracker
      onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
      onNotVisible={(anchor) => {
        setIsOverlayVisible(false);
        console.log(`Not visible ${anchor.id}`);
      }}
      onVisible={(anchor) => {
        setIsOverlayVisible(true);
        console.log(`Visible ${anchor.id}`);
      }}
      targetImage={targetImage}
      // incase of local url
      // targetImage={new URL(url, document.baseURI).href}
      visible={isOverlayVisible}
    >
      <mesh position={[0, 0, -5]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </ImageTracker>
  );
}

export default ImgTracking;
