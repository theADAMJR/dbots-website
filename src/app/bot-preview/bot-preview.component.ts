import { Component, Input } from '@angular/core';

@Component({
  selector: 'bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent {
  serverCount = 100;
  votes = 0;
  @Input() body = 'Lollipop gingerbread carrot cake. Sugar plum pastry wafer brownie. Gingerbread fruitcake jelly-o donut muffin sugar plum cookie sesame snaps candy canes. Bear claw sweet roll sugar plum brownie chocolate cake cupcake pastry topping candy. Candy canes cake gingerbread sweet tootsie roll apple pie chupa chups. Cotton candy pie fruitcake. Marzipan oat cake powder bear claw marshmallow soufflé cake jelly. Chocolate wafer soufflé lemon drops. Tiramisu liquorice sugar plum cake carrot cake. Pastry bonbon liquorice. Cheesecake fruitcake carrot cake. Sesame snaps ice cream lemon drops candy cotton candy chocolate bar. Oat cake chocolate lemon drops caramels carrot cake donut chupa chups tootsie roll donut. Toffee jelly liquorice jelly-o chocolate cake toffee tootsie roll apple pie.';;

  @Input() user = {
    avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    username: 'Bot User',
    discriminator: '0000'
  }
}
