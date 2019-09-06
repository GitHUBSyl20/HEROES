import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.component'; 
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes : Hero[]; 

  Hero: Hero = {
    id:12,
    name: "windstorm"
  }

  //creation instance d'un HeroService 'procédé d'injection)
  constructor(private heroService: HeroService) {}

  //initialisation de la méthode get Heroes
  //appellé après la construction du composant.
  ngOnInit() {
    this.getHeroes()
  }
//on attribue le Hero selectionné a selectedHero
//comme ca si dans le template on renvoie les informations correspondant à ce hero
/*   selectedHero: Hero
  onSelect(Hero: Hero): void{
    this.selectedHero = Hero;
  } */

  //creation méthode qui va chercher la méthode souhaitée dans le service en question
/*   getHeroes(): void{
    this.heroes = this.heroService.getHeroes()
  } */

  getHeroes(): void{
    this.heroService.getHeroes()
    //The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
    .subscribe(heroes=>this.heroes = heroes)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  //If you neglect to subscribe(), the service will not send the delete request to the server.
  // As a rule, an Observable does nothing until something subscribes.

}
