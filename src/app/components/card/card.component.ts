import { CardModel } from './../../models/card.model';
import { CardsService } from './../../services/cards/cards.service';
import { MatchService } from './../../services/match/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(
    private cardService: CardsService,
    public matchService: MatchService
  ) {

   }

  /* variable that defines which button will display the correct answer */
  random: number = Math.floor((Math.random() * 3) + 1);
  hits: number = 0
  mistakes: number = 0
  match: number = (this.matchService.getNumMatch()) + 1;

  public card: CardModel
  public button1: CardModel
  public button2: CardModel
  public button3: CardModel

  /**
   * Function that determines the alternatives shown on the buttons
   */
  public options() {

    this.card = this.cardService.getCardRandom()

    if (this.random == 1) {
      this.button1 = this.card;
      
      while (this.button1 == this.button2 || this.button1 == this.button3 || this.button2 == this.button3) {
        this.button2 = this.cardService.getCardRandom();
        this.button3 = this.cardService.getCardRandom(); 
      }

    } else if (this.random == 2) {
      this.button2 = this.card;
      
      while (this.button2 == this.button1 || this.button2 == this.button3 || this.button1 == this.button3) {
        this.button1 = this.cardService.getCardRandom();
        this.button3 = this.cardService.getCardRandom();
      }

    } else if (this.random == 3) {
      this.button3 = this.card;

      while (this.button3 == this.button1 || this.button3 == this.button2 || this.button1 == this.button2) {
        this.button1 = this.cardService.getCardRandom();
        this.button2 = this.cardService.getCardRandom();
      }

    }
  }

  /**
   * Function that checks if the answers are correct and increments the errors, 
   * hits and number of the round in the sessionStorage
   */
  public verifyAnswer(answer: CardModel) {
    let numMatch = 1;

    console.log(answer)

    if(answer == this.card){
      this.hits++
      console.log("hits: ", this.hits)
      this.matchService.setHits(this.hits)// hits++
      this.matchService.setNumMatch(numMatch)// numMatch++
     // this.navCtrl.push(answerPage, { answer: this.cartao, hits: this.hits, mistakes: this.mistakes })// push na Pageanswer
    } else {
      this.mistakes++
      console.log("mistakes: ", this.mistakes)
      this.matchService.setMistakes(this.mistakes)// mistakes++
      this.matchService.setNumMatch(numMatch)// numMatch++
      //this.navCtrl.push(answerPage, { answer: this.cartao, hits: this.hits, mistakes: this.mistakes })// push na Pageanswer
    }

  }

  ngOnInit() {

    this.options()

    console.log("card: ", this.card)
    console.log("random: ", this.random)
  }

}
