import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css']
})
export class InformacoesComponent implements OnInit {
  @Input() pokemon: any;

  ngOnInit(): void { 
    
   }

}
