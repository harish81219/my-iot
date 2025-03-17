import { Component } from '@angular/core';

@Component({
  selector: 'app-rateus',
  templateUrl: './rateus.component.html',
  styleUrls: ['./rateus.component.css']
})
export class RateusComponent {
updateAnimation() {
throw new Error('Method not implemented.');
}
  rating: number = 0;
  feedback: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  animationPath: string | null = null;
  lottieOptions: any = {};

  rate(star: number) {
    this.rating = star;
  }

  



  submitFeedback() {
    console.log("Rating:", this.rating);
    console.log("Feedback:", this.feedback);
    alert("Thank you for your feedback!");
    this.rating = 0;
    this.feedback = '';
  }

}
