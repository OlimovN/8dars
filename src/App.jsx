import React from "react";
import Select from "./components/Select";
import countries from "./assets/country-currency.json";

function App() {
  return (
    <div className="p-4">
      <Select countries={countries} />
    </div>
  );
}

export default App;
