import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EventsService {
  publish(event: { type: string; data: any }) {
    // axios.post('http://localhost:3000/events', event).catch((err) => {
    //   console.log(err.message);
    // });
    // axios.post('http://localhost:3001/events', event).catch((err) => {
    //   console.log(err.message);
    // });

    // axios.post('http://localhost:3003/events', event).catch((err) => {
    //   console.log(err.message);
    // });
    axios.post('http://localhost:3004/events', event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://localhost:3005/events', event).catch((err) => {
      console.log(err.message);
    });
  }
}
