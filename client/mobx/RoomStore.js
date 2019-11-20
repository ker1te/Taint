import { observable, action } from "mobx";

import authStore from './AuthStore';
import { sendRequest } from './NetService';

class ObservableRoomStore {
  @observable rooms = [];

  @observable roomsIsLoading = false;
  @observable postRoomIsLoading = false;

  @observable token = authStore.userToken;

  constructor(){ }
  
  @action.bound async getRooms() {
    const result = await this.fetchGetRooms();
    this.rooms = result;
    return result;
  }

  @action.bound async postRoom(data) {
    const room = await this.fetchPostRoom(data);
    this.rooms.push(room);
    return room;
  }

  @action.bound getRoom(id) {
    return this.rooms.find(r => r._id == id);
  }

  @action.bound async deleteRoom(id) {

  }

  @action
  async fetchGetRooms(){
    this.roomsIsLoading = true;

    const url = 'rooms/';
    const method = 'GET';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${this.token}`
    };

    try {
      let res = await sendRequest(url, method, headers);
      this.roomsIsLoading = false;
      return res;
    } catch(err) {
      console.log(err);
    }
  }

  @action
  async fetchPostRoom(data){
    this.postRoomIsLoading = true;

    const url = 'rooms/';
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${this.token}`
    };

    try {
      let res = await sendRequest(url, method, headers, data);
      this.postRoomIsLoading = false;
      return res;
    } catch(err) {
      console.log(err);
    }
  }
}

const roomStore = new ObservableRoomStore();
export default roomStore;