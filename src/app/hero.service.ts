import { Injectable } from '@angular/core';
import { Hero} from './hero';
// import { HEROES} from './mock-heroes';
import { Observable, of} from 'rxjs';
import { MessageService} from './message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  // new feature in service which is much easier for developers import service into components when creating the service
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }
  // using observable into the service to mock the real world async function
  public getHeroes(): Observable<Hero[]> {
    // this.messageService.add(`Hero service: fetched heroes`);
    // return of(HEROES);
    this.log('loading heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }
  public getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService: fetched hero id= ${id}`);
    this.log(`fetched hero id= ${id}`);
    const url = `${this.heroesUrl}/${id}`;
    // return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  public log (message: string): void {
    this.messageService.add('HeroService: ' + message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  public updateHero(hero: Hero, id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.patch(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((item: Hero) => this.log(`added hero w/ id=${item.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  public deleteHero(heroId: number): Observable<any> {
    const url = `${this.heroesUrl}/${heroId}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${heroId}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.heroesUrl}/search/1?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
