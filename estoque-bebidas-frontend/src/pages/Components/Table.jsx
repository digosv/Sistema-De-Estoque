import "./Table.css";
import api from "../../services/api.js";
import { useState, useEffect } from "react";
import trash from "../../assets/trash.svg";
import plus from "../../assets/plus.svg";
import edit from "../../assets/edit.svg";

function Table() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    getBebidas();
  }, []);

  async function getBebidas() {
    const bebidasFromApi = await api.get("/bebidas");

    setBebidas(bebidasFromApi.data);
  }

  return (
    <div className="divtable">
      <main className="table">
        <section className="table_header">
          <h1>Estoque</h1>
        </section>
        <section className="table_body">
          <table>
            <thead>
              <tr className="trfix">
                <th>id</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Criado</th>
                <th>Funções</th>
              </tr>
            </thead>
            {bebidas.map((bebida) => (
              <tbody>
                <tr>
                  <td>{bebida.id}</td>
                  <td>{bebida.name}</td>
                  <td>{bebida.category}</td>
                  <td>{bebida.quantity}</td>
                  <td>{bebida.createdAt}</td>
                  <img src={trash} alt="" />
                  <img src={edit} alt="" />
                  <img src={plus} alt="" />
                </tr>
              </tbody>
            ))}
          </table>
        </section>
      </main>
    </div>
  );
}

export default Table;
