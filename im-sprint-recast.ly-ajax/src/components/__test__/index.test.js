import { fakeData } from './fakeData';
global.ajaxCallCount = 0;
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => {
      global.ajaxCallCount = 1
      return Promise.resolve({ items: [fakeData[2]] })
    },
  })
);

import './VideoListEntry.test';
import './VideoList.test';
import './VideoPlayer.test';
import './App.test';
import './Search.test';
import './Nav.test';
import './App.part2.test';