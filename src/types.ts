import { z } from "zod";

// Um posto, do jeito que a API principal já deve ter esse dado.
// O Geo não guarda posto nenhum, só recebe e calcula.
export const postoSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const ordenarPorProximidadeSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  raioKm: z.number().positive().optional(), // se ausente, não filtra por raio
  postos: z.array(postoSchema).min(1),
});

export type OrdenarPorProximidadeInput = z.infer<
  typeof ordenarPorProximidadeSchema
>;

export type PostoComDistancia = z.infer<typeof postoSchema> & {
  distanciaKm: number;
};