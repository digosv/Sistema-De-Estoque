import express from "express";
import cors from "cors";
import bebidaRoutes from "./routes/bebidasRoutes.js";

const app = express();
const PORT = process.env.PORT || 9563;

app.use(express.json());
app.use(cors());

// Rotas
app.use("/bebidas", bebidaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Rodando na porta ${PORT}`);
});
