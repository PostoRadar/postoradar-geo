/**
 * Calcula a distância em quilômetros entre dois pontos geográficos
 * usando a fórmula de Haversine. Suficiente para o escopo do projeto
 * (não considera rotas reais, só distância em linha reta).
 */
export function calcularDistanciaKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const RAIO_TERRA_KM = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RAIO_TERRA_KM * c;
}

function toRad(graus: number): number {
  return (graus * Math.PI) / 180;
}