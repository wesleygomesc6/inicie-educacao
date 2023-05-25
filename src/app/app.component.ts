import { Component, Input, OnInit } from '@angular/core';
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

  buscarPokemon() {
    const valor: any = document.getElementById('nomePokemon') as HTMLElement;
    this.pokemonService.getPokemon(valor.value).subscribe(
      res => this.exibirInformacoes(this.converterRespostaEmPokemon(res))
    )
    this.limparBusca()
  }

  limparBusca() {
    let l: any = document.getElementById('nomePokemon') as HTMLElement;
    l.value = ''

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
        this.pokemons.push(this.converterRespostaEmPokemon(r));
        this.ordenarArray()
      })
    })
  }

  converterRespostaEmPokemon(pokemon: any): Pokemon {
    let pokemonConvertido: Pokemon = new Pokemon();
    pokemonConvertido.codigo = pokemon.id;
    pokemonConvertido.nome = pokemon.name;
    pokemonConvertido.tipo = pokemon.types[0].type.name;
    pokemonConvertido.imagem = pokemon.sprites.other.home.front_default;
    pokemonConvertido.descricao = pokemon.moves.map((item: any) => ' ' + item.move.name).toString();
    pokemonConvertido.informacoes = {
      altura: pokemon.height * 10,
      peso: pokemon.weight / 10,
      vida: this.getInformacoes(pokemon.stats, 'hp'),
      defesa: this.getInformacoes(pokemon.stats, 'defense'),
      velocidade: this.getInformacoes(pokemon.stats, 'speed'),
      ataque: this.getInformacoes(pokemon.stats, 'attack')
    }
    return pokemonConvertido;
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




