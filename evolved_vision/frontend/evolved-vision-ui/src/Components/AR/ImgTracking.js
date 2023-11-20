import React, { useState } from "react";
import { ImageTracker } from "@zappar/zappar-react-three-fiber";
import { Html } from "@react-three/drei";

function ImgTracking({ header, description, targetImage, color }) {
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
        {isOverlayVisible && (
          <Html>
            <div
              style={{
                border: "2px solid #000",
                borderRadius: "10px",
                paddingLeft: "20px",
                maxWidth: "1000px",
                width: "800px",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <h1>{header}</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "black" }}>{description}</p>
                <img
                  src="https://files.catbox.moe/yb1jn9.jpg" // placeholder image/ replace with actual images
                  alt="Placeholder overlay"
                  style={{ maxWidth: "50%", marginTop: "20px" }}
                />
              </div>
            </div>
            <meshStandardMaterial color={color} />
          </Html>
        )}
      </mesh>
    </ImageTracker>
  );
}

export default ImgTracking;
