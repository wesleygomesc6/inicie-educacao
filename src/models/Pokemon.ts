import { DetalhesPokemon } from "./DetalhesPokemon";

export class Pokemon {
    codigo!: number;
    nome!: string;
    tipo!: string;
    descricao!: string;
    imagem!: string;
    informacoes!: DetalhesPokemon;

    constructor() { }

}