import express from "express";
import { geoRouter } from "./routes/geo.routes";
 
const app = express();
const PORTA = process.env.PORT ? Number(process.env.PORT) : 3334;
 
app.use(express.json());
app.use(geoRouter);
 
app.listen(PORTA, () => {
  console.log(`postoradar-geo rodando na porta ${PORTA}`);
});
 