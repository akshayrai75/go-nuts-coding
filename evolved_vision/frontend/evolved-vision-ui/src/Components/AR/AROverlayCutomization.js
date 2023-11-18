import React, { useState } from "react";

import FroalaEditor from "react-froala-wysiwyg";
// required plugins
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/video.min.js";
// import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/link.min.js";
// stylings
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

function AROverlayCutomization() {
  const [model, setModel] = useState("Example Set");
  const handleModelChange = (event) => {
    setModel(event);
  };
  const toolbarOptions = {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
      ],
    },

    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
    },

    moreRich: {
      buttons: ["insertLink", "insertImage", "insertVideo"],
    },

    moreMisc: {
      buttons: ["undo", "redo"],
      align: "right",
      buttonsVisible: 2,
    },
  };

  // console.log("model", model);

  return (
    <div className="flex">
      <FroalaEditor
        model={model}
        onModelChange={handleModelChange}
        config={{
          toolbarOptions,
          videoMaxSize: 1024 * 1024 * 15,
          heightMax: 300,
          width: 500,
          placeholder: "Edit Me",
          events: {
            "image.inserted": function (img, response) {
              console.log("img", img[0]?.currentSrc, "response", response);
            },
          },
        }}
      />
    </div>
  );
}

export default AROverlayCutomization;
