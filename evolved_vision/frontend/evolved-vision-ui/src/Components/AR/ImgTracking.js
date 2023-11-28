import React, { useState } from "react";
import { ImageTracker } from "@zappar/zappar-react-three-fiber";
import { Html } from "@react-three/drei";

function ImgTracking({ header, description, targetImage, modelAddress }) {
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
      visible={isOverlayVisible}
    >
      <mesh position={[0, 0, -5]}>
        {isOverlayVisible && (
          <Html>
            <div dangerouslySetInnerHTML={{ __html: modelAddress }} />
          </Html>
        )}
      </mesh>
    </ImageTracker>
  );
}

export default ImgTracking;
