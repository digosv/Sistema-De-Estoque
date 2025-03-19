import prisma from "../config/prisma.js";

// Retorna todas as bebidas
export const listarBebidas = async (filtros) => {
  let where = {};

  if (filtros.name) where.name = filtros.name;
  if (filtros.category) where.category = filtros.category;
  if (filtros.quantity) where.quantity = Number(filtros.quantity);

  return await prisma.bebidas.findMany({ where });
};

//Adiciona uma Bebida
export const adicionarBebida = async (dados) => {
  return await prisma.bebidas.create({ data: dados });
};

// Edita uma bebida
export const editarBebida = async (id, dados) => {
  return await prisma.bebidas.update({
    where: { id },
    data: dados,
  });
};

// Remove uma bebida
export const deletarBebida = async (id) => {
  return await prisma.bebidas.delete({
    where: { id },
  });
};
