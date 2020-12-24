import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { avatars } from './avatar.js';

@Component({
  tag: 'avatar-select',
  styleUrl: 'avatar.scss',
  shadow: true
})
export class AvatarSelect {

  @Prop() drop: boolean;
  @Prop() avatar: string;
  @Event() avatarSelected: EventEmitter;
  @Prop() opciones: string;

  constructor() {
    let avatar_selected = { index: '', avatar: '' };
    if (window.localStorage.getItem('avatar') != null) {
      avatar_selected = JSON.parse(window.localStorage.getItem('avatar'));
      this.avatar = avatar_selected.avatar;
    } else {
      this.avatar = avatars[0].imagen;
    }

  }

  public getAvatars() {
    let array_r = [];
    let item_class = this.opciones.split(' ');
    let itm =  item_class[1] == undefined ? 'item' : 'item-' + item_class[1];

    avatars.forEach((element, index) => {
      array_r.push(
        <div class={ itm }>
          <img src={element.imagen}
            onClick={() => this.set_avatar(index)}
            class="avatar_flex_grid_element" />
        </div>
      )
    });
    return array_r;
  }

  public set_avatar(index = 0) {
    this.avatar = avatars[index].imagen;
    this.drop = false;
    let avatar_seleccionado = {
      avatar: this.avatar,
      indice: index
    };
    this.avatarSelected.emit(avatar_seleccionado);
    window.localStorage.setItem('avatar', JSON.stringify(avatar_seleccionado));
  }

  public activar() {
    this.drop = !this.drop;
    return this.drop;
  }

  render() {
      return (
      <div class="popover__wrapper">
        <img src={this.avatar}
          onClick={() => this.activar()}
          class="static_avatar"
        />
        { 
        //Short Circuit Evaluation with &&
        //https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
        this.drop &&
          <div class={'popover__content ' + this.opciones}>
            <div class="container">
              {this.getAvatars()}
            </div>
          </div>
        }
      </div>
      )
  }
}
