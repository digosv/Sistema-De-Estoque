import Navbar from "../Components/Navbar";
import Table from "../Components/Table";
import "./App.css";
import { useState } from "react";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <div className="container">
        <Navbar onBebidaAdded={handleRefresh} />
        <Table refreshTrigger={refreshTrigger} />
      </div>
    </>
  );
}

export default App;
