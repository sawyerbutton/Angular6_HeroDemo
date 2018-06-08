import { Component, OnInit } from '@angular/core';
import { Hero} from '../hero';
// import { HEROES} from '../mock-heroes';
import { HeroService} from '../hero.service';
import { MessageService} from '../message.service';

// metadata
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // public hero: Hero = {
  //   id: 1,
  //   name: 'WindStorm',
  // }
  public temp: string;
  // public selectedHero: Hero;
  public heroes: Hero[];
  constructor(
    private heroService: HeroService,
    private messageSerive: MessageService,
  ) { }

  ngOnInit() {
    this.getHeroes();
  }
  // subscribe will subscribe the data passing from observable
  public getHeroes(): void {
    this.heroService.getHeroes().subscribe(item => this.heroes = item);
  }
  // after transfer hero details into a router onSelect function is not necessary
  // public onSelect(hero: Hero) {
  //   this.selectedHero = hero;
  // }
  public add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
      // console.log(this.heroes);
    });
    this.heroService.getHeroes().subscribe(item => this.heroes = item);
  }
  public delete(hero: Hero): void {
    const heroId = hero.id;
    this.heroes = this.heroes.filter( (item) => {
      return item !== hero;
    });
    this.heroService.deleteHero(heroId).subscribe();
  }
}
