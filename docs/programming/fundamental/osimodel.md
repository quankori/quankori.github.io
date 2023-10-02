---
title: Open Systems Interconnection Reference Model
---

The OSI model consists of 7 layers, and when receiving a request, it will move from layer 7 to layer 1, and the response will move from layer 1 to layer 7.

## Application layer

- This layer is the primary interface for users to interact with the application program and, through it, interact with the network.

## Presentation layer

- On the computer, this layer converts data sent from the application layer into a common format. On the receiving end, it then converts from the common format to the format of the application layer.

## Session layer

- The role of this layer is to establish, maintain, and terminate communication with receiving devices.

## Transport layer

- This layer maintains data flow management and performs error checking and data recovery between devices.

## Network layer

- This layer provides logical addresses that routers will use to determine the path to the destination.

## Data link layer

- This layer ensures the conversion of bit data received from a lower layer (physical layer) into data frames.

## Physical layer

- Establishes or breaks electrical connections with transmission media.
- Participates in the process of efficiently sharing communication resources among multiple users. For example, resource conflict resolution and traffic control.
- Transforms or converts between the digital data representation of user devices and the corresponding signals transmitted through the communication channel.

## Request

- **Application layer**: Users enter information they want to send into the computer. This information is usually in the form of images, text, etc. This data is then passed down to the presentation layer (Layer 6).

- **Presentation layer**: This layer will convert the data into a common format for encoding and compressing data. The data is then passed down to the session layer (Layer 5).

- **Session layer**: This layer is similar to bank employees verifying and adding transaction information when you transfer money at a bank. After the session layer completes its task, it will continue to pass this data down to the transport layer (Layer 4).

- **Transport layer**: At this layer, data is divided into segments, and additional information about data transport methods is added to ensure security and reliability when transmitted in the network model. The data is then passed down to the network layer (Layer 3).

- **Network layer**: At this layer, segments are divided into different Package packets, and routing information is added. The main function of the network layer is to route paths for data-containing packets. Data continues to be passed down to the data link layer (Layer 2).

- **Data link layer**: At this layer, each Package packet is broken down into many Frames frames, and additional information is added to check the data packets at the receiving end.

- **Physical layer**: Finally, when these Frames frames are passed down to the physical layer (Layer 1), they are converted into a sequence of binary bits (0 1...) and are transmitted, with signals being interrupted on the transmission medium (copper cable, optical cable, etc.) to transmit data to the recipient.

## Response

- **The Physical layer** (Layer 1) on the receiving end will check synchronization and place the received binary bit strings into a buffer. It then sends a message to the data link layer (Layer 2) that the data has been received.

- **The Datalink layer** checks for errors in the frames created by the sender by checking the FCS in the attached packet at the receiving end.

- **The Network layer** checks whether the address in this packet is the address of the recipient or not.

- **Transport layer** error recovery and error handling are supported by sending ACK and NAK packets (packets used to respond whether the data packets have been sent to the recipient or not).

- **The Session layer** is responsible for ensuring the integrity of the data in the received packet. It then removes the session layer header and continues to send it up to the presentation layer.

- **The Presentation layer** processes the packet by converting the data format to an appropriate format. When finished, it continues to send it up to the application layer.

- **Application layer** handles and removes the final header. At this point, the receiving machine will receive the data of the transmitted packet.


![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/1.jpeg)
