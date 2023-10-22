import React from "react";
import {
  ZapparCamera,
  ImageTracker,
  ZapparCanvas,
} from "@zappar/zappar-react-three-fiber";

// import img1 from "./assets/cam.zpt";
// import img2 from "./assets/dog.zpt";
// import img3 from "./assets/gratisography.zpt";

const App = () => {
  //   const images = [
  //     "./assets/cam.zpt",
  //     "./assets/dog.zpt",
  //     "./assets/gratisography.zpt",
  //   ];
  return (
    <ZapparCanvas>
      <ZapparCamera />
      {/* target 1 */}
      <ImageTracker
        onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
        onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
        onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
        targetImage={new URL("./assets/cam.zpt", import.meta.url).href}
      >
        <mesh position={[0, 0, -5]}>
          <sphereGeometry />
          <meshStandardMaterial color="green" />
        </mesh>
      </ImageTracker>

      {/* target 2 */}
      <ImageTracker
        onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
        onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
        onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
        targetImage={new URL("./assets/dog.zpt", import.meta.url).href}
      >
        <mesh position={[0, 0, -5]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </ImageTracker>
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
};

export default App;
