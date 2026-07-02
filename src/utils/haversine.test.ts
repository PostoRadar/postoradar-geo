import { describe, it, expect } from "vitest";
import { calcularDistanciaKm } from "./haversine";

describe("calcularDistanciaKm", () => {
  it("retorna 0 quando os dois pontos são iguais", () => {
    const distancia = calcularDistanciaKm(-8.0476, -34.877, -8.0476, -34.877);
    expect(distancia).toBeCloseTo(0, 5);
  });

  it("calcula corretamente a distância entre Recife e Olinda (~6km)", () => {
    // Marco Zero (Recife) -> Praça do Carmo (Olinda), aprox.
    const distancia = calcularDistanciaKm(
      -8.0632,
      -34.8711,
      -8.0089,
      -34.8553
    );
    expect(distancia).toBeGreaterThan(4);
    expect(distancia).toBeLessThan(8);
  });
});