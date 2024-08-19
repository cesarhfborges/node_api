import express from "express";

const router = express.Router();

router.get<{}, any>('', async (req, res) => {
  // const usuarios = await usuariosRepository.find();
  res.status(200).json([]);
});

export default router;