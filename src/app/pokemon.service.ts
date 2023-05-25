import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RespApiPokemon } from 'src/models/RespApiPokemon';

@Injectable({
    providedIn: 'root',
})
export class PokemonService {

    public apiURL = 'https://pokeapi.co/api/v2/pokemon/';

    constructor(private http: HttpClient) { }

    getAllPokemons(): Observable<RespApiPokemon> {
        return this.http.get<RespApiPokemon>(this.apiURL)
    }

    getPokemon(nome: string): Observable<any> {
        return this.http.get<any>(this.apiURL + nome)

    }

    getPokemonsPaginate(url: string) {
        return this.http.get<RespApiPokemon>(url)
    }

    getDescricao(url: string): Observable<any> {
        return this.http.get<any>(url)
            .pipe(
                map(res => res.flavor_text_entries)
            )

    }
}
