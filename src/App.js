import React from "react";
import Upload from "./components/upload";
import FileList from "./components/FileList";

function App() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        KMRL Invoice Dashboard
      </h2>
      <Upload />
      {/* <FileList /> */}
    </div>
  );
}

export default App;
