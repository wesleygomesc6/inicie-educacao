import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
  @Input() informacoes: any;

  ngOnInit(): void {
    this.atribuirValor()
  }

  atribuirValor() {
    const pv = document.querySelector('.vida') as HTMLElement;
    pv?.style.setProperty('--progressVida', this.informacoes.vida)
    const pve = document.querySelector('.velocidade') as HTMLElement;
    pve?.style.setProperty('--progressVelocidade', this.informacoes.velocidade)
    const pd = document.querySelector('.defesa') as HTMLElement;
    pd?.style.setProperty('--progressDefesa', this.informacoes.defesa)
    const pa = document.querySelector('.ataque') as HTMLElement;
    pa?.style.setProperty('--progressAtaque', this.informacoes.ataque)

  }

}
