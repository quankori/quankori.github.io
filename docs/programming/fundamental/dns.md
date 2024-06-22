---
title: Domain Name System
---

## Fundamental

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/2.webp)

## How DNS Works from Client Call to IP Resolution

DNS (Domain Name System) is the system that translates domain names into IP addresses that computers can use to communicate with each other. Below is a detailed explanation of the process from the moment a client requests a domain name to the point it receives the corresponding IP address.

## Detailed Steps of DNS Resolution:

1. **Client Requests Domain Name**:

   - When you type a URL like `www.example.com` into your browser, the browser checks its local cache to see if it has a DNS record (IP address for the domain).
   - If it has the record, the DNS process ends here and the browser uses the cached IP address to connect to the destination server.

2. **Operating System Cache Check**:

   - If the browser does not have the DNS record, it asks the operating system (OS) to check its cache.
   - If the OS has the DNS record, the DNS process ends here and the OS uses the cached IP address to allow the browser to connect to the destination server.

3. **Send Request to DNS Resolver**:

   - If the DNS record is not in the OS cache, the OS sends a request to the DNS resolver (also known as a recursive resolver) of the ISP or the DNS service you are using (like Google DNS or Cloudflare DNS).
   - The DNS resolver is a server that handles DNS requests and finds the IP address corresponding to the domain name.

4. **DNS Resolver Cache Check**:

   - The DNS resolver checks its cache to see if it has the DNS record for the domain.
   - If it does, the DNS resolver returns the IP address to the client’s OS.

5. **Query Root DNS Server**:

   - If the DNS resolver does not have the record in its cache, it sends a request to one of the Root DNS servers.
   - Root DNS servers do not know the final IP address but know the addresses of the Top-Level Domain (TLD) servers (like `.com`, `.net`, `.org`).

6. **Query TLD DNS Server**:

   - The Root DNS server responds with the address of the TLD DNS server (for example, the `.com` TLD server).
   - The DNS resolver then sends a request to the TLD DNS server.

7. **Query Authoritative DNS Server**:

   - The TLD DNS server responds with the address of the Authoritative DNS server.
   - The Authoritative DNS server holds the exact DNS records for the specific domain (e.g., `example.com`).

8. **Get Response from Authoritative DNS Server**:

   - The DNS resolver sends a request to the Authoritative DNS server, which then returns the IP address corresponding to the requested domain.
   - The DNS resolver caches this record for future requests.

9. **Return IP Address to Client**:

   - The DNS resolver returns the IP address to the client’s OS.
   - The OS then returns the IP address to the browser.

10. **Connect to Destination Server**:
    - The browser uses this IP address to establish a TCP connection with the destination server and sends an HTTP (or HTTPS) request to load the webpage.

## Process Illustration (DNS Resolution Steps)

```plaintext
Client -> Browser Cache -> OS Cache -> DNS Resolver Cache
       -> Root DNS Server -> TLD DNS Server -> Authoritative DNS Server
       -> DNS Resolver -> OS -> Browser -> Server
```

## Specific Example:

Let's say you enter `www.example.com` into your browser:

1. The browser checks its cache, no record found.
2. The browser asks the OS, no record found.
3. The OS sends a request to the ISP's DNS resolver.
4. The DNS resolver checks its cache, no record found.
5. The DNS resolver sends a request to a Root DNS server, gets the address of the `.com` TLD server.
6. The DNS resolver sends a request to the `.com` TLD server, gets the address of the Authoritative DNS server for `example.com`.
7. The DNS resolver sends a request to the Authoritative DNS server for `example.com`, gets the IP address `93.184.216.34`.
8. The DNS resolver returns the IP address `93.184.216.34` to the OS.
9. The OS returns the IP address `93.184.216.34` to the browser.
10. The browser connects to the server at `93.184.216.34` and loads the webpage.
