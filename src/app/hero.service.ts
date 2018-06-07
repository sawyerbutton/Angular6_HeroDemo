import { Injectable } from '@angular/core';
import { Hero} from './hero';
import { HEROES} from './mock-heroes';
import { Observable, of} from 'rxjs';
import { MessageService} from './message.service';

@Injectable({
  // new feature in service which is much easier for developers import service into components when creating the service
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private messageService: MessageService
  ) { }
  // using observable into the service to mock the real world async function
  public getHeroes(): Observable<Hero[]> {
    this.messageService.add(`Hero service: fetched heroes`);
    return of(HEROES);
  }
  public getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id= ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
