import { Injectable } from '@angular/core';
/* import { HEROES } from './mock-heroes'; */
import { Observable, of } from 'rxjs';
import { Hero } from './hero.component';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

private heroesUrl = 'api/heroes';
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  //Because each service method returns a different kind of Observable result, 
  //handleError() takes a type parameter so it can return the safe value as the type that the app expects.
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  //bien importé Hero depuis son modèle 
  getHeroes(): Observable<Hero[]> {
    //of(HEROES) return an observable with a single value that is an array
    this.messageService.add("HeroService: fetched Heroes")
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      //The HeroService methods will tap into the flow of observable values and send a message, v
      //ia the log() method, to the message area at the bottom of the page.
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }


  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}