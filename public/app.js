const grid = document.getElementById("grid");
const last = document.getElementById("last");
const refreshBtn = document.getElementById("refresh");

function card(s) {
  const statusClass = s.online ? "online" : "offline";
  const statusText = s.online ? "Online" : "Offline";
  const title = s.serverName ?? s.name ?? s.id;

  const playersText = s.online
    ? `${s.players ?? "—"}/${s.maxPlayers ?? "—"}`
    : "—";

  const mapText = s.online ? (s.map ? `Map: ${s.map}` : "Map: —") : (s.error ? `Error: ${s.error}` : "");

  return `
    <div class="card ${statusClass}">
      <div class="row">
        <div style="font-weight:800">${title}</div>
        <div class="tag ${statusClass}">
        <span class="dot"></span>
        ${statusText}
        </div>
      </div>

      <div class="big">${playersText}</div>
      <div class="muted">${mapText}</div>

      <div style="margin-top:10px" class="row">
        <div class="muted"><a class="connect" href="steam://connect/${s.connect}">Connect</a></div>
        <div>${s.connect}</div>
      </div>

      <!-- Displays IP and Query Port, Mart asked not to display this. Keeping it in, for debugging. 
      <div class="row">
        <div class="muted">Query</div>
        <div>${s.query}</div>
      </div>
      -->

      <div class="muted" style="margin-top:10px;font-size:12px;">
        Checked: ${new Date(s.checkedAt).toLocaleString()}
      </div>
    </div>
  `;
}

async function load() {
  grid.innerHTML = `<div class="muted">Loading…</div>`;
  try {
    const r = await fetch("/api/servers", { cache: "no-store" });
    const data = await r.json();

    last.textContent = `Last update: ${new Date(data.checkedAt).toLocaleString()}`;
    grid.innerHTML = data.servers.map(card).join("");
  } catch (e) {
    grid.innerHTML = `<div class="muted">Failed: ${String(e?.message ?? e)}</div>`;
  }
}

refreshBtn.addEventListener("click", load);

load();
setInterval(load, 60_000);