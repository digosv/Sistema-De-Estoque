import express from "express";
import * as bebidasController from "../controllers/bebidasController.js";

const router = express.Router();

router.get("/", bebidasController.getBebidas);
router.post("/", bebidasController.createBebida);
router.put("/:id", bebidasController.updateBebida);
router.delete("/:id", bebidasController.deleteBebida);

export default router;
