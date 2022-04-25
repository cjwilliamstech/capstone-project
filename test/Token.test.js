const { default: Web3 } = require("web3");

const Token = artifacts.require("./Token");

require("chai").use(require("chai-as-promised")).should();

const tokens = (n) => {
  return new Web3.utils.isBN(Web3.utils.toWei(n.toString(), "ether"));
};

contract("Token", ([deployer, receiver]) => {
  const name = "DApp Token";
  const symbol = "DAPP";
  const decimals = "18";
  const totalSupply = tokens(1000000).toString();
  let token;

  beforeEach(async () => {
    token = await Token.new();
  });

  describe("deployment", () => {
    it("tracks the name", async () => {
      const result = await token.name();
      result.should.equal(name);
    });

    it("tracks the symbol", async () => {
      const result = await token.symbol();
      result.should.equal(symbol);
    });

    it("tracks the decimals", async () => {
      const result = await token.decimals();
      result.toString().should.equal(decimals);
    });

    it("tracks the total supply", async () => {
      const result = await token.totalSupply();
      result.toString().should.equal(totalSupply.toString());
    });

    it("assigns the total supply to the deployer", async () => {
      const result = await token.balanceOF(deployer);
      result.toString().should.equal(totalSupply.toString());
    });
  });

  describe("sending tokens", () => {
    it("transfers token balances", async () => {
      let balanceOF;
      //Before transfer
      balanceOF = await token.balanceOF(deployer);
      console.log("deployer balance before transfer", balanceOF.toString);
      balanceOF = await token.balanceOF(receiver);
      console.log("receiver balance before transfer", balanceOF.toString);

      // Transfer

      await token.transfer(receiver, tokens(100), {
        from: deployer,
      });

      // After transfer
      balanceOF = await token.balanceOF(deployer);
      console.log("deployer balance after transfer", balanceOF.toString);
      balanceOF = await token.balanceOF(receiver);
      console.log("receiver blance after transfer", balanceOF.toString);
    });
  });
});
