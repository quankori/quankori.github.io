# Solidity Cheatsheet

- Common function types

| Loại     | Công dụng                                                          |
| -------- | ------------------------------------------------------------------ |
| public   | Anyone can call this function                                      |
| private  | Only this contract can call this fucntion                          |
| view     | This function returns data and does not modify the contract's data |
| constant | Same view                                                          |
| pure     | Function will not modify or even read the contract's data          |
| payable  | When someone call this function they might send ether along        |

- Running contract functions

| Calling                           | Sending                      |
| --------------------------------- | ---------------------------- |
| Cannot modify the contract's data | Can modify a contract's data |
| Can return data                   | Take time to execute!        |
| Runs instally                     | Returns the transaction hash |
| Free                              | Const money!                 |

- Basic types

| Types                | Value            |
| -------------------- | ---------------- |
| string               | "a,b,c"          |
| bool                 | true, false      |
| int (default int256) | 0 , 3000, -3000  |
| uint                 | 0, 3000, 5000    |
| fixed                | 0, 30.01, -30.01 |
| ufixed               | 0, 30.01, 50.01  |
| address              | 0x1456sbe.....   |

- Msg global variable

| Types      | Value                    |
| ---------- | ------------------------ |
| msg.data   | data from transaction    |
| msg.gas    | amount gas               |
| msg.sender | address of account       |
| msg.value  | amount of ether (in wei) |

- Reference types

| Name          | Notes                                | Example                                              |
| ------------- | ------------------------------------ | ---------------------------------------------------- |
| fixed array   | Unchaging length                     | int[3] => [1,2,3]                                    |
| dynamic array | Changing length                      | int[] => [1,2]                                       |
| mapping       | Think of Javascript object           | mapping(string => string) => Mapping[_key] = \_value |
| struct        | Seem mapping but can different types | struct Car {string make; string value;}              |
