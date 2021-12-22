import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  serveStatus: string;

  constructor() { }


  getcolor(){
    return this.serveStatus === 'online' ? 'Fuchsia' : 'DarkGrey';
  }
  ngOnInit() {
  }
  backFunc(){ 
    window.location.reload();

    }

}
