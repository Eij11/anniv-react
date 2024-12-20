import React, { useState } from "react";
import HoverCanvas from "./components/HoverCanvas";
import Sidebar from "./components/Sidebar";

// import "./App.css";

const App = () => {
  const [triggerSideBar, setTriggerSideBar] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={triggerSideBar ? "col-8" : "col-12"}>
          <HoverCanvas
            trigger={triggerSideBar}
            setTrigger={setTriggerSideBar}
          />
        </div>

        {triggerSideBar && (
          <div className="col-4">
            <Sidebar audioSrc="./audio/PaninindiganKita.mp3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
