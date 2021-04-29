const jsdom = require('jsdom');
const { JSDOM } = jsdom;

global.window = (new JSDOM('<html><body><div id="main"></div><div id="chats"></div></body></html>')).window
global.document = global.window.document
global.window.fetch = () => new Promise(resolve => {
  resolve({
    json: () => JSON.parse('{ "results": "["{ "id": "-1", "username": "test", "text": "message", "date": "2017-07-28T03:54:21.134", "roomname": "lobby" }"]" }')
  })
})


global.expect = require('chai').expect;
global.sinon = require('sinon');
global.window.isNodeENV = true

describe('', function () {
  global.app = require('../client/scripts/app.js')
  require('./chatterboxSpec.js');
})