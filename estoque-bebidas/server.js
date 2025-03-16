import express from "express";
const port = process.env.PORT || 5000;
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// Retorna Todas As Bebidas, Ou Uma Unica Bebida Com Base Na Pesquisa
app.get("/bebidas", async (req, res) => {
  try {
    let where = {};

    if (req.query.name) where.name = req.query.name;
    if (req.query.category) where.category = req.query.category;
    if (req.query.quantity) where.quantity = Number(req.query.quantity);

    const bebidas = await prisma.bebidas.findMany({ where });

    res.status(200).json(bebidas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao Listar as Bebidas" });
  }
});

// Adiciona Uma Bebida
app.post("/bebidas", async (req, res) => {
  try {
    const novaBebida = await prisma.bebidas.create({
      data: {
        name: req.body.name,
        category: req.body.category,
        quantity: Number(req.body.quantity),
      },
    });
    res.status(201).json(novaBebida);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(401).json({ error: "Bebida Ja Existe" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Edita Uma Bebida Com Base no ID
app.put("/bebidas/:id", async (req, res) => {
  try {
    const nameBebida = req.body.name;
    const nomeExistente = await prisma.bebidas.findUnique({
      where: {
        name: nameBebida,
      },
    });

    if (nomeExistente) {
      return res
        .status(409)
        .json({ message: "Já Existe uma Bebida com esse nome" });
    } else {
      const bebidaAtualizada = await prisma.bebidas.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          category: req.body.category,
          quantity: req.body.quantity,
        },
      });
      res.status(200).json(bebidaAtualizada);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro Ao Atualizar a Bebida" });
  }
});

// Deleta uma Bebida Com Base no Id
app.delete("/bebidas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.bebidas.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Bebida Deletada Com Sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao Deletar Bebida" });
  }
});

// Adiciona Uma Quantidade no Estoque
app.patch("/bebidas/:id/adicionar", async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Quantidade Inválida" });
    }
    const bebida = await prisma.bebidas.update({
      where: { id: req.params.id },
      data: {
        quantity: { increment: req.body.quantity },
      },
    });
    res.status(200).json(bebida);
  } catch (error) {
    res.status(500).json({ error: "Falha em Adicionar Unidades de Bebidas" });
  }
});

// Remove Uma Quantidade no Estoque
app.patch("/bebidas/:id/remover", async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Quantidade Inválida" });
    }
    const bebida = await prisma.bebidas.findUnique({
      where: { id: req.params.id },
    });

    if (!bebida || bebida.quantity < req.body.quantity) {
      return res.status(400).json({ error: "Estoque Insuficiente" });
    }

    const updatedBebida = await prisma.bebidas.update({
      where: { id: req.params.id },
      data: {
        quantity: { decrement: req.body.quantity },
      },
    });
    res.status(200).json(updatedBebida);
  } catch (error) {
    res.status(500).json({ error: "Falha em Remover Unidades de Bebidas" });
  }
});

// Get para estoque baixo
app.get("/estoque-baixo", async (req, res) => {
  try {
    const bebidas = await prisma.bebidas.findMany({
      where: {
        quantity: { lt: 6 },
      },
    });
    res.status(200).json(bebidas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar bebidas em baixo estoque" });
  }
});

app.listen(port, () => {
  console.log(`app esta rodando na porta ${port}`);
});
