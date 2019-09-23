import { Component, Prop, h } from '@stencil/core';
// import { format } from '../../utils/utils';
import { avatars } from './avatar.js';

@Component({
  tag: 'my-component',
  styleUrl: 'avatar.scss',
  shadow: true
})
export class MyComponent {

  @Prop() drop: boolean;

 


   public getAvatars(){
     if(this.drop){
      let array_r = [];
      avatars.forEach((element,index) => {
       array_r.push( <div class="item"> <img src={ element.imagen } onClick={ () => this.set_avatar(index) }/> </div> )
      });
      return array_r;
     }
  }

  public set_avatar(index){
    console.log(index);
  }


  public activar (){
    this.drop = !this.drop;
    console.log(this.drop);
    return this.drop;
  }



  render() {
    return     <div class="popover__wrapper">
                  <a href="#">
                    <button onClick={() => this.activar() }>Avatar</button>
                    
                  </a>
                    <div class="popover__content">
                          
                    <div class="container">
                    { this.getAvatars() }
                    </div>
                        
                  </div>
      
  </div>
  }
}
