pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Token {
  using SafeMath for uint;
  string public name= "DApp Token";
  string public symbol = "DAPP";
  uint256 public decimals = 18;
  uint256 public totalSupply;
  mapping(address => uint256) public balanceOF;

  constructor() public {
      totalSupply = 1000000 * (10 ** decimals);
      balanceOF[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    balanceOF[msg.sender] = balanceOF[msg.sender].sub(_value);
    balanceOF[_to] =balanceOF[_to].add(_value);
    return true;
  }

}