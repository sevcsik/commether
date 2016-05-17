/* based on https://www.ethereum.org/greeter */
contract Mortal {
	address public owner;
	function mortal() { owner = msg.sender; }
	function kill() { if (msg.sender === owner) suicide(owner); }
}	
