# Arma Reforger A2S Query Website

**Author:** *Shtufff*  
**Date:** 5 January 2026

This repository contains a blank template to host a website that will query the A2S protocol for "Arma Reforger" and report back with stats like player count, IP and Online/Offline status.
It also includes a button to direct connect to the server from your browser.


---

## Instructions

**Game Server**

1 - Make sure your `config.json` file has a A2S port assigned, you can find a example here: https://github.com/Shtufff/Public_config.json

2 - Make sure your Game server is allocating the relevant A2S Ports, the default is 17777.

3 - In your Game server "start-up parameters" make sure to include this: `-port=<Game port> -a2sIpAddress=0.0.0.0 -a2sPort=17777`


**Dedicated Server (Linux Ubuntu)**

1 - Run the following commands:
   `mkdir StatSite
    cd StatSite
    npm init -y
    npm i express steam-server-query`
    
2 - FTP the files in this repo to the newly made directory.

3 - Run the following command:
   `node server.js`

4 - You can then access your website at:
   `http://YOUR_WEBSITE_SERVER_IP:3000`

Note, this is not secure and not using HTTPS. I will update this guide later to include how to add https and put it behind a domain. 


---

## Usage & Distribution Policy

These files are free to use in a non-commercial setting.


---

## Contact Information

### Shtufff (Thomas)
- Discord: `Shtufff1999`
- Discord Server: `https://discord.gg/KgyxnxgAtx`
- Email: `inverkip644@gmail.com`



