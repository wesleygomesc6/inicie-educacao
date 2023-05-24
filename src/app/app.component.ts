import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/Pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inicie-educacao';
  pokemon: Pokemon = new Pokemon;
  pokemons: Pokemon[] = [];
  pokemonsRespApi: any[] = [];
  paginacao: any = {};
  informacoes: boolean = false;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getAllPokemons()
  }

  getInformacoes(stats: any[], filtro: string): number {
    let status: number = 0;
    stats.forEach(elemet => {
      if (elemet.stat.name == filtro) {
        status = elemet.base_stat
      }
    })
    return status;
  }

  getAllPokemons() {
    this.pokemonService.getAllPokemons().subscribe((pokemonsResp) => {
      this.mapearPokemon(pokemonsResp)
    })
  }

  mapearPokemon(pokemons: any) {
    this.pokemons = [];
    this.paginacao = {
      next: pokemons.next,
      previous: pokemons.previous
    };
    this.pokemonsRespApi = pokemons.results

    this.pokemonsRespApi.forEach(n => {
      this.pokemonService.getPokemon(n.name).subscribe((r: any) => {
        let pokemon: Pokemon = new Pokemon();
        pokemon.codigo = r.id;
        pokemon.nome = r.name;
        pokemon.tipo = r.types[0].type.name;
        pokemon.imagem = r.sprites.other.home.front_default;
        pokemon.descricao = r.moves.map((item: any) => ' ' + item.move.name).toString();
        pokemon.informacoes = {
          altura: r.height * 10,
          peso: r.weight / 10,
          vida: this.getInformacoes(r.stats, 'hp'),
          defesa: this.getInformacoes(r.stats, 'defense'),
          velocidade: this.getInformacoes(r.stats, 'speed'),
          ataque: this.getInformacoes(r.stats, 'attack')
        }
        this.pokemons.push(pokemon);
        this.ordenarArray()
      })
    })
  }

  ordenarArray() {
    this.pokemons.sort((a, b) => a.codigo - b.codigo)
  }
  exibirInformacoes(pok: Pokemon) {
    this.pokemon = pok;
    this.informacoes = true;
  }

  nextPage() {
    if (this.paginacao.next != null) {
      this.pokemonService.getPokemonsPaginate(this.paginacao.next).subscribe((resp) => {
        this.mapearPokemon(resp)
      })
    }
  }

  previousPage() {
    if (this.paginacao.previous != null) {
      this.pokemonService.getPokemonsPaginate(this.paginacao.previous).subscribe((resp) => {
        this.mapearPokemon(resp)
      })
    }
  }

}




