import React from "react";
import InputChromeBrowserVersion from "./components/inputChromeBrowserVersion";
import DefaultDataTable from "./components/defaultDataTable";

function App() {
  const [inputDefaultText, setInputDefaultText] = React.useState("");

  const handleInputChange = event => {
    setInputDefaultText(event.target.value);
  };

  return (
    <div className="App">
      <InputChromeBrowserVersion
        handleInputChange={handleInputChange}
        inputDefaultValue={inputDefaultText}
      />
      <DefaultDataTable />
    </div>
  );
}

export default App;
