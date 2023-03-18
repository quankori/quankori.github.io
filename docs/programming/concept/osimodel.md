---
title: Open Systems Interconnection Reference Model
---
The OSI Model is composed of 7 layers, and when receiving a request, it will go from layer 7 to layer 1, and the response returned will go from layer 1 to layer 7.

## Application layer

This layer is the main interface for users to interact with the application program and, through it, with the network.

## Presentation layer

On a computer, this layer performs the task of translating data sent from the Application layer into a common format. At the receiving computer, this layer then converts from the common format to the format of the Application layer.

## Session layer

The task of this layer is to establish, maintain and terminate communication with receiving devices.

## Transport layer

This layer maintains control of the flow of data and performs error checking and data recovery between devices.

## Network layer

This layer provides logical addresses that routers will use to determine the path to the destination.

## Data link layer

This layer ensures the transformation of bit data received from the lower layer (physical layer) into data frames.

## Physical layer

Establishes or breaks electrical connections with a transmission medium.

Participates in a process where communication resources are efficiently shared among multiple users. For example, resolving resource contention and traffic control.

Modulates or transforms between the digital data representation of user devices and the corresponding signals transmitted through the communication channel.

## Request

Application layer: Users enter the information they want to send into the computer. This information is usually in the form of images, text, etc. Then, this data is transferred down to the Presentation layer (layer 6).

Presentation layer: This layer will convert the data into a common format for data encoding and compression. The data is then transferred down to the Session layer (layer 5).

Session layer: This layer is similar to bank employees who verify and add transaction information when you transfer money at the bank. After the Session layer completes its task, it will continue to transfer this data down to the Transport layer (layer 4).

Transport layer: At this layer, the data is divided into multiple segments and additional information about data transportation methods is added to ensure security and reliability when transmitting in the network model. Then, the data is transferred down to the Network layer (layer 3).

Network layer: At this layer, the segments are further divided into different Package packets and routing information is added. The main function of the Network layer is to route the path for packets containing data. The data continues to be transferred down to the Data Link layer (layer 2).

Datalink layer: At this layer, each Package packet is hashed into multiple Frames and additional information is added to check the data packets at the receiving end.

Physical layer: Finally, when these Frames are transferred down to the Physical layer (layer 1), they are converted into a series of binary bits (0 1....) and transmitted and signal broken on transmission media (copper cable, fiber optic cable, ...) to transmit data to the receiver.

## Resposne

The Physical layer (Layer 1) on the receiving end will check the synchronization process and put the received binary bit strings into the buffer. Then it sends a notification to the Data Link layer (Layer 2) that the data has been received.

Next, the Data Link layer will check for errors in the frame created by the sending machine by checking the FCS in the packet attached to the receiving machine.

The Network layer will check whether the address in this packet is the address of the receiving machine or not.

At the Transport layer, error recovery and error handling are supported by sending ACK and NAK packets (packets used to respond to whether the data-containing packets have been sent to the receiving machine or not).

The Session layer is responsible for ensuring the integrity of the data in the received packet. Then it removes the Session layer header and continues to send it up to the Presentation layer.

The Presentation layer processes the packet by converting the data formats to the appropriate format. When finished, it will proceed to send it up to the Application layer.

Finally, the Application layer processes and removes the last header. At this point, the receiving machine will receive the data of the transmitted packet.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/main/src/images/programming/1.jpeg)
