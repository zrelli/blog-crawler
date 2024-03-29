import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class TransformerService {
  transformDataBeforeSaving(event: { type: string; data: any }) {
    if (event.type === 'NewContentScrapped') {
      const url = new URL(event.data.url);
      const domain = url.hostname;
      const path = url.pathname;

      const processedData = { ...event.data, domain, path };
      const type = 'DataReadyToSave';
      const newEvent = { type, data: processedData };
      axios.post('http://query:3004/pages', newEvent).catch((err) => {
        console.log(err.message);
      });
    }
  }
}
