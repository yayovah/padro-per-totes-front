import { CiutatDTO } from "../../Ciutat/Models/ciutat.dto";
import { PreguntaDTO } from "../../Preguntes/Models/pregunta.dto";
import { RespostaDTO } from "../../Respostes/Models/resposta.dto";

export interface SituacioDTO {
    id: number;
  /*  ciutatId: number;
    preguntaId: number;
    respostaId?:number;
    seguentPreguntaId?:number;*/
    posicio?:number;

    ciutat:CiutatDTO;
    pregunta:PreguntaDTO;
    resposta?:RespostaDTO;
    seguent_pregunta?:PreguntaDTO;
}
