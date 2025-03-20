import "./Table.css";
import api from "../../services/api.js";
import { useState, useEffect } from "react";
import trash from "../../assets/trash.svg";
import plus from "../../assets/plus.svg";
import edit from "../../assets/edit.svg";
import minus from "../../assets/minus.png";

function Table({ bebidas, getBebidas }) {
  async function deleteBebida(id) {
    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir esta bebida?"
    );

    if (isConfirmed) {
      await api.delete(`/bebidas/${id}`);
      getBebidas();
    }
  }

  async function addBebida(id, quantityBebida) {
    await api.put(`/bebidas/${id}`, {
      quantity: quantityBebida + 1,
    });
    getBebidas();
  }

  async function removeBebida(id, quantityBebida) {
    await api.put(`/bebidas/${id}`, {
      quantity: quantityBebida - 1,
    });
    getBebidas();
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
                  <img
                    onClick={() => deleteBebida(bebida.id)}
                    src={trash}
                    alt=""
                  />
                  <img src={edit} alt="" />
                  <img
                    onClick={() => addBebida(bebida.id, bebida.quantity)}
                    src={plus}
                    alt=""
                  />
                  <img
                    src={minus}
                    onClick={() => removeBebida(bebida.id, bebida.quantity)}
                    alt=""
                  />
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
