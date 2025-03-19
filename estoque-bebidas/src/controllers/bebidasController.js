import * as bebidaService from "../services/bebidaService.js";

export const getBebidas = async (req, res) => {
  try {
    const bebidas = await bebidaService.listarBebidas(req.query);
    res.status(200).json(bebidas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar bebidas" });
  }
};

export const createBebida = async (req, res) => {
  try {
    const bebidaData = {
      name: req.body.name,
      category: req.body.category,
      quantity: Number(req.body.quantity),
    };
    const novaBebida = await bebidaService.adicionarBebida(bebidaData);
    res.status(201).json(novaBebida);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBebida = async (req, res) => {
  try {
    const bebidaData ={ 
      name: req.body.name,
      category: req.body.category,
      quantity: Number(req.body.quantity)
    }
    const bebidaAtualizada = await bebidaService.editarBebida(
      req.params.id,
      bebidaData
    );
    res.status(200).json(bebidaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a bebida" });
  }
};

export const deleteBebida = async (req, res) => {
  try {
    await bebidaService.deletarBebida(req.params.id);
    res.status(200).json({ message: "Bebida Deletada Com Sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao Deletar bebida" });
  }
};
