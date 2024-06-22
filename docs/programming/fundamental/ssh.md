---
title: Secure Shell
---

## Explanation of SSH (Secure Shell)

SSH (Secure Shell) is a cryptographic network protocol used for securing data communication, remote command-line login, remote command execution, and other secure network services between two networked computers.

## Key Features of SSH

1. **Secure Communication**:

   - SSH encrypts the data exchanged between the client and the server, providing confidentiality and integrity.
   - It uses both symmetric and asymmetric encryption to secure the connection.

2. **Authentication**:

   - SSH supports multiple authentication methods, including password-based and public key-based authentication.
   - Public key authentication is more secure and commonly used for automated and unattended processes.

3. **Data Integrity**:

   - SSH ensures that the data sent and received is not altered in transit using message authentication codes (MACs).

4. **Port Forwarding**:

   - SSH can tunnel other network protocols, providing secure channels over unsecured networks.
   - Types of port forwarding include local, remote, and dynamic port forwarding.

5. **Versatility**:
   - SSH is used for various purposes, such as secure file transfer (SCP, SFTP), secure remote login, and secure command execution.

## How SSH Works

### 1. Establishing the Connection

**Step 1: Client Initiates Connection**

- The client sends a connection request to the SSH server using the SSH protocol.
  ```bash
  ssh username@hostname
  ```

**Step 2: Version Exchange**

- Both client and server exchange their SSH protocol versions to ensure compatibility.
  ```plaintext
  Client: SSH-2.0-OpenSSH_7.6
  Server: SSH-2.0-OpenSSH_7.6
  ```

### 2. Key Exchange and Establishing Session Keys

**Step 3: Key Exchange Initialization**

- Client and server exchange key exchange initialization packets. These packets contain information about supported algorithms for key exchange, encryption, MAC, and compression.

**Step 4: Key Exchange Process**

- The client and server perform a Diffie-Hellman key exchange (or another method) to securely share a session key.
  - Both generate their own private-public key pairs.
  - They exchange public keys.
  - Both parties independently compute a shared secret using their private key and the other party's public key.

### 3. Server and Client Authentication

**Step 5: Server Authentication**

- The server sends its host key to the client.
- The client verifies the server's host key against known hosts. If the host key is not recognized, the client may prompt the user to verify and accept the new key.

**Step 6: Client Authentication**

- The client authenticates to the server using one of the supported authentication methods:
  - **Password Authentication**: The client sends a password to the server.
  - **Public Key Authentication**: The client sends its public key, and the server verifies it against authorized keys.
  - **Two-Factor Authentication**: Combines methods such as public key and a one-time password.

### 4. Secure Data Exchange

**Step 7: Secure Shell Established**

- Once the authentication is successful, the SSH connection is established. Both client and server now use the shared session key for symmetric encryption of the data exchanged.

**Step 8: Data Transfer**

- Data sent between the client and server is encrypted using the symmetric encryption algorithm and the session key.

### 5. Session Termination

**Step 9: Termination**

- The SSH session can be terminated by either the client or the server. Proper termination involves sending a termination message and closing the connection gracefully.

## Example of SSH Command

**SSH into an EC2 Instance**

```bash
ssh -i /path/to/my-key.pem ec2-user@ec2-12-34-56-78.compute-1.amazonaws.com
```

- **-i**: Specifies the private key file for authentication.
- **ec2-user**: The username for the EC2 instance.
- **ec2-12-34-56-78.compute-1.amazonaws.com**: The public DNS name or IP address of the EC2 instance.

## SSH Workflow Diagram

```plaintext
Client                           Server
  |                                |
  |------ Initiates Connection ---->|
  |                                |
  |<------ Version Exchange ------>|
  |                                |
  |<------ Key Exchange --------->|
  |                                |
  |<--- Server Authentication ---->|
  |                                |
  |<--- Client Authentication ---->|
  |                                |
  |<----- Secure Data Exchange ---->|
  |                                |
  |<----- Session Termination ---->|
  |                                |
```

## Summary

- **SSH (Secure Shell)**: A protocol for secure communication over a network.
- **Key Features**:
  - **Secure Communication**: Encrypts data exchanged between client and server.
  - **Authentication**: Supports password-based and public key-based authentication.
  - **Data Integrity**: Ensures data is not altered in transit using MACs.
  - **Port Forwarding**: Tunnels other network protocols securely.
  - **Versatility**: Used for secure file transfer, remote login, and command execution.
- **How It Works**:
  - **Establishing Connection**: Client initiates a connection, and versions are exchanged.
  - **Key Exchange**: Securely share a session key using methods like Diffie-Hellman.
  - **Authentication**: Server and client authenticate using methods like public key authentication.
  - **Data Exchange**: Data is encrypted and transferred securely.
  - **Termination**: The session is properly closed by either the client or the server.
