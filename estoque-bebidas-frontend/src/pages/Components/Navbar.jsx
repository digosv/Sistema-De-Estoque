import "./Navbar.css";
import bene from "../../assets/bene.jpg";
import { useRef } from "react";
import api from "../../services/api.js";
import { Modal } from "../Components/Modal.jsx";
import { useState } from "react";

function Navbar({ onBebidaAdded }) {
  const [modelOpen, setModelOpen] = useState(false);

  const handleButtonClick = () => {
    setModelOpen(false);
  };

  async function handleSubmite() {
    try {
      await addBebida();
      handleButtonClick();
      onBebidaAdded();
      alert("bebida adicionada com sucesso!");
    } catch (error) {
      alert("Alguma informação incorreta ou faltando. ", error);
    }
  }

  const inputNameBebida = useRef();
  const inputCategoryBebida = useRef();
  const inputQuantityBebida = useRef();

  async function addBebida() {
    await api.post("/bebidas", {
      name: inputNameBebida.current.value,
      category: inputCategoryBebida.current.value,
      quantity: inputQuantityBebida.current.value,
    });
  }

  return (
    <div>
      <div className="header">
        <img src={bene} alt="" className="bene" />
        <nav className="">
          <ul className="nav_links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Estoque</a>
            </li>
            <li>
              <a href="#" onClick={() => setModelOpen(true)}>
                Adicionar
              </a>
            </li>
          </ul>
        </nav>
        <a href="#">
          <button className="btnnavbar">Contact</button>
        </a>
      </div>
      {modelOpen && (
        <Modal
          onSubmit={handleSubmite}
          onCancel={handleButtonClick}
          onClose={handleButtonClick}
        >
          <h1 className="titlemodal">Adicione a Bebida</h1>
          <input type="text" placeholder="Nome: " ref={inputNameBebida} />
          <input
            type="text"
            placeholder="Categoria: "
            ref={inputCategoryBebida}
          />
          <input
            type="number"
            placeholder="Quantidade: "
            ref={inputQuantityBebida}
          />
        </Modal>
      )}
    </div>
  );
}

export default Navbar;
