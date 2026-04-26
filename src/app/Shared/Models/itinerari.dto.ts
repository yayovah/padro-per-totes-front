import { SituacioDTO } from "../../Situacions/Model/situacio.dto";

export interface ItinerariDTO {
    id?: number;
    ciutat: number;
    usuariaId?: number;
}

export interface ItinerariSeguitDTO{
    itinerari: ItinerariDTO,
    passos?: PasDTO[]
}

export interface PasDTO {
    id?: number,
    itinerari: number,
    pregunta: number,
    resposta: number,
}