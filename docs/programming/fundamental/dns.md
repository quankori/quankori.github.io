---
title: Domain Name System
---

## Fundamental

DNS stands for Domain Name System, roughly translated as "Domain Name Resolution System." Essentially, the way a computer accesses a website is by using its IP address. For instance, if you want to access google.com, your browser is actually requesting the IP address of Google's server. However, there are millions of websites, and remembering the IP address for each one is impossible. Moreover, the IP address of a website can change frequently. This is the reason why DNS was created.

DNS acts like a phone book. Instead of having to remember a long string of IP numbers, you can remember the domain name of the website, like google.com. This is much more user-friendly. DNS plays the role of translating domain names into corresponding IP addresses, allowing your browser to send requests to the server.


![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/2.webp)

To understand this, let's explore each step of the domain name resolution process together:

1. User inputs "google.com" into the browser. The query is sent out onto the Internet and received by a DNS Recursor.
2. DNS Recursor forwards the query to the Root Name Server (.) 
3. The Root Name Server responds with the IP address of the Top-Level Domain (TLD) Name Server (in this case, it would be the .com TLD).
4. DNS Recursor proceeds to query the .com TLD Name Server. 
5. The .com TLD Name Server replies with the IP address of the google.com Authoritative Name Server.
6. DNS Recursor once again sends the query, this time to the google.com Authoritative Name Server. 
7. The google.com Authoritative Name Server responds with the IP address of google.com.
8. DNS Recursor returns the IP address of the requested domain to the browser. After completing these eight steps, the browser now has the necessary IP address to proceed.
9. The browser initiates an HTTP Request to the IP address obtained in the previous step.
10. The server responds with the requested data to the browser.

In this way, the DNS system efficiently resolves domain names into IP addresses, allowing users to access websites using easy-to-remember domain names instead of complex IP addresses.