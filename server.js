"use strict";

const express = require("express");
const path = require("path");
const { queryGameServerInfo } = require("steam-server-query");

const app = express();
const WEB_PORT = Number.parseInt(process.env.PORT ?? "3000", 10);

app.use(express.static(path.join(__dirname, "public")));

/**
 * Add your servers here.
 * connect: game port 
 * a2s: query port (Steam query / A2S)
 */
const SERVERS = [
  { id: "EU1", name: "Shadow Elite EU1", ip: "151.80.33.213", connectPort: 2002, a2sPort: 17779 },
  { id: "EU2", name: "Shadow Elite EU2", ip: "151.80.33.213", connectPort: 2003, a2sPort: 17778 },
  { id: "EU3", name: "Shadow Elite EU3", ip: "37.187.135.120", connectPort: 2003, a2sPort: 17778 },
  { id: "EU4", name: "Shadow Elite EU4", ip: "37.187.135.120", connectPort: 2004, a2sPort: 17777 },
];

// Query ONE server
async function getStatus(s) {
  const queryAddr = `${s.ip}:${s.a2sPort}`;
  try {
    const info = await queryGameServerInfo(queryAddr, 2, 2500); /* attempts, time in ms */

    const players =
      Number.isFinite(info.players) ? info.players :
      Number.isFinite(info.numplayers) ? info.numplayers :
      Number.isFinite(info.playerCount) ? info.playerCount :
      null;

    const maxPlayers =
      Number.isFinite(info.max_players) ? info.max_players :
      Number.isFinite(info.maxPlayers) ? info.maxPlayers :
      Number.isFinite(info.maxplayers) ? info.maxplayers :
      null;

    return {
      id: s.id,
      name: s.name,
      ip: s.ip,
      connect: `${s.ip}:${s.connectPort}`,
      query: queryAddr,
      online: true,
      serverName: info.name ?? null,
      map: info.map ?? null,
      players,
      maxPlayers,
      ping: info.ping ?? null,
      checkedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      id: s.id,
      name: s.name,
      ip: s.ip,
      connect: `${s.ip}:${s.connectPort}`,
      query: queryAddr,
      online: false,
      error: String(err?.message ?? err),
      checkedAt: new Date().toISOString(),
    };
  }
}

// Query ALL servers
app.get("/api/servers", async (req, res) => {
  const results = await Promise.all(SERVERS.map(getStatus));
  res.json({ servers: results, checkedAt: new Date().toISOString() });
});

app.listen(WEB_PORT, "0.0.0.0", () => {
  console.log(`Web listening on :${WEB_PORT}`);
});
