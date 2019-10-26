import React from "react";
import InputChromeBrowserVersion from "./components/inputChromeBrowserVersion";
import DefaultDataTable from "./components/defaultDataTable";

function App() {
  const [inputDefaultText, setInputDefaultText] = React.useState("");

  const handleInputChange = event => {
    setInputDefaultText(event.target.value);
  };

  const onChromeVersionSubmnit = () => {
    console.log("Submitted");
  };

  return (
    <div className="App">
      <h1 className="app-header dark" style={{ textAlign: "center" }}>
        Chrome Browser - Chromedriver Mapping
      </h1>
      {/* <InputChromeBrowserVersion
        handleInputChange={handleInputChange}
        inputDefaultValue={inputDefaultText}
      /> */}
      <DefaultDataTable />
    </div>
  );
}

export default App;
