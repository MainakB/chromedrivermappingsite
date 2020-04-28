import React from "react";
import DefaultDataTable from "./components/defaultDataTable";

function App() {
  //Use  when changes done FOR inputDefaultText
  // const [inputDefaultText, setInputDefaultText] = React.useState(""); // Use inputDefaultText when changes done
  // const [inputDefaultText, setInputDefaultText] = React.useState("");

  // const handleInputChange = (event) => {
  //   setInputDefaultText(event.target.value);
  // };

  // const onChromeVersionSubmnit = () => {
  //   console.log("Submitted");
  // };

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
