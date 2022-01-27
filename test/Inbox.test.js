const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
//const INITIAL_STRING = 'Hi there';

// Tests = Commented.txt

let accounts;
let inbox;

beforeEach (async () => {
  // Get a list of all accopunts
  accounts = await web3.eth.getAccounts();
  // Use any one acc. to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data: bytecode, arguments: ['Hi there!'] })
   .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await methods.message().call();
    assert.equal(message, 'Hi there')
  });
});
