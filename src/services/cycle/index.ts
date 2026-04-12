import { http } from "../config";
import type { CycleDto } from "./dtos";

interface ICycleService {
  getCurrentCycle: () => Promise<CycleDto>;
}

export const CycleService: ICycleService = {
  getCurrentCycle: () => http.get("/cycles/current")
}