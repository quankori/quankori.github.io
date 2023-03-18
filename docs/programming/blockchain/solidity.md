---
title: Solidity Basic
---
## Common function types

| Type     | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| public   | Anyone can call this function                                      |
| private  | Only this contract can call this fucntion                          |
| view     | This function returns data and does not modify the contract's data |
| constant | Same view but just for variable can't modifier                     |
| pure     | Function will not modify or even read the contract's data          |
| payable  | When someone call this function they might send ether along        |

## Running contract functions

| Calling                           | Sending                      |
| --------------------------------- | ---------------------------- |
| Cannot modify the contract's data | Can modify a contract's data |
| Can return data                   | Take time to execute!        |
| Runs instally                     | Returns the transaction hash |
| Free                              | Const money!                 |

## Msg global variable

| Types      | Value                    |
| ---------- | ------------------------ |
| msg.data   | data from transaction    |
| msg.gas    | amount gas               |
| msg.sender | address of account       |
| msg.value  | amount of ether (in wei) |

## Basic Types

```solidity
pragma solidity >=0.5.0;

contract DataTypes {
    // Boolean
    bool trueOrFalse;
    // Unsigned integer. default size is 256
    uint firstInteger;
    // The same as above, with definition
    uint256 secondInteger;
    // Signed integer, 128
    int128 thirdinteger;
    // Address, add keywork 'payable' to be able to send ether to it
    address myAddress;
    // Two byte array
    bytes2 twoBytesArray;
    // Sixteen byte array
    bytes16 sixteenBytesArray;
    // String
    string myString;
    // Array of strings (can be an array of any other data type)
    string[] myStringArray;
    // Enums
    enum direction { left, right, up, down }
}
```

## Mapping

```solidity
pragma solidity >=0.5.0;

contract Mappings {

    // State variable
    mapping(address => uint) public myMapping;

    // Store a new value in the mapping
    function putThing(address _key, uint _value) public {
        myMapping[_key] = _value;
    }

    // Retrieve a value from the mapping using key to search
    function getThing(address _search) public view returns (uint){
        return myMapping[_search];
    }

}
```

## Struct

```solidity
pragma solidity >=0.5.0;

contract Structs {

    // Define the Person struct
    struct Person {
        string name;
        uint8 age;
    }

    // Create a new person struct,
    // Access the age of the struct
    function personAge() external pure returns(uint8) {
        Person memory person = Person("Alex", 27);
        // Will return 27
        return person.age;
    }
}
```

## Require (Validate)

```solidity
pragma solidity >=0.5.0;

contract RequireStatements {

    function someFunction(address _anAddress) external {
        // Require that the address given as a parameter is not equal to an empty addess.
        // If the address is empty, the whole transaction will not be completed and will be reverted
        require(_anAddress != address(0), "Not a valid address");
        ...
    }
}
```

## Modifier

```solidity
pragma solidity >=0.5.0;

contract CustomModifiers {

    // State variable
    address private owner;

    // Custom modifier requiring that the sender of the transaction is the owner
    // otherwise revert the transaction
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    // Constructor takes an address and stores it in the owner variable
    constructor(address _owner) public {
        owner = _owner;
    }

    // someFunction() uses the onlyOwner modifier to make use of our
    // custom definition on line 10
    function someFunction() external onlyOwner {
        ...
    }
}
```

## Scope

```solidity
pragma solidity >=0.5.0;

contract AccessModifiers {
    // Public modifer exposes a getter for state variable
    string public myString;
    // Private variable only accessible within contract
    string private myPrivateString;

    // Internal functions can only be used within this contract
    function innerFunction() internal {}
    // External functions are part of the contract interface and can be called from outside
    function outerFunction() external {}
}
```

## Inheritance

```solidity
pragma solidity >=0.5.0;

contract Vehicle {

}

contract Car is Vehicle {

}

contract Van is Vehicle {

}
```

## Call

```solidity
(bool status, bytes memory ret) = address_value.call{
    value: amount_value
}(data_value_bytes);
```

## Delegate

```solidity
(bool success, bytes memory data) = _contract.delegatecall(
    abi.encodeWithSignature("setVars(uint256)", _num)
);
```

## Call with interface

```solidity
IERC20 token = IERC20(currency);
token.transferFrom(msg.sender, _admin, amount);
```
