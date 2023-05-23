import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  @Input() pokemon: any;

  ngOnInit(): void { }

}
