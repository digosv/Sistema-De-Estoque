import Navbar from "../Components/Navbar";
import Table from "../Components/Table";
import "./App.css";
import { useState, useEffect, use } from "react";
import api from "../../services/api.js";

function App() {
  const [bebidas, setBebidas] = useState([]);

  async function getBebidas() {
    const response = await api.get("/bebidas");
    setBebidas(response.data);
  }

  useEffect(() => {
    getBebidas();
  }, []);

  return (
    <>
      <div className="container">
        <Navbar getBebidas={getBebidas} />
        <Table bebidas={bebidas} getBebidas={getBebidas} />
      </div>
    </>
  );
}

export default App;
