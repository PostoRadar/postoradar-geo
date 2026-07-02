import { Router, Request, Response } from "express";
import { ordenarPorProximidadeSchema, PostoComDistancia } from "../types";
import { calcularDistanciaKm } from "../utils/haversine";

export const geoRouter = Router();

/**
 * POST /geo/ordenar
 *
 * Recebe a localização do usuário + a lista de postos (vinda da API
 * principal) e devolve a mesma lista ordenada por proximidade, com a
 * distância em km calculada. Opcionalmente filtra por raio.
 *
 * Este serviço é stateless: não consulta banco nenhum, só calcula.
 */
geoRouter.post("/geo/ordenar", (req: Request, res: Response) => {
  const parsed = ordenarPorProximidadeSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      erro: "Payload inválido",
      detalhes: parsed.error.flatten(),
    });
  }

  const { latitude, longitude, raioKm, postos } = parsed.data;

  let postosComDistancia: PostoComDistancia[] = postos.map((posto) => ({
    ...posto,
    distanciaKm: calcularDistanciaKm(
      latitude,
      longitude,
      posto.latitude,
      posto.longitude
    ),
  }));

  if (raioKm !== undefined) {
    postosComDistancia = postosComDistancia.filter(
      (p) => p.distanciaKm <= raioKm
    );
  }

  postosComDistancia.sort((a, b) => a.distanciaKm - b.distanciaKm);

  return res.status(200).json({ postos: postosComDistancia });
});

geoRouter.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", servico: "postoradar-geo" });
});