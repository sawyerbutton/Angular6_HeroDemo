import {Component, Input, OnInit} from '@angular/core';
import { Hero} from '../hero';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  public hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHero();
  }

  public getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((item) => {
      this.hero = item;
    });
  }
  public goBack(): void {
    this.location.back();
  }
  public save(): void {
    this.heroService.updateHero(this.hero, this.hero.id)
      .subscribe(() => this.goBack());
  }

}
