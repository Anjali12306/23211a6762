require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { schedule } = require('./scheduler');

const BASE = process.env.BASE_URL || 'http://4.224.186.213/evaluation-service';
const TOKEN = process.env.API_TOKEN || '';

async function fetchDepots() {
  const url = `${BASE}/depots`;
  try {
    const res = await axios.get(url, { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} });
    return res.data && res.data.depots ? res.data.depots : [];
  } catch (err) {
    if (err && err.response) {
      console.error(`Failed fetching depots: ${err.response.status} ${err.response.statusText}`);
      if (err.response.data) console.error('Response body:', err.response.data);
      if (err.response.status === 401) console.error('Unauthorized. Set the API_TOKEN environment variable to a valid token.');
    } else {
      console.error('Failed fetching depots:', err.message || err);
    }
    return [];
  }
}

async function fetchVehicles(depotId) {
  
  const url = `${BASE}/vehicles`;
  try {
    const res = await axios.get(url, {
      params: depotId ? { depotId } : {},
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}
    });
    if (res.data && res.data.vehicles) return res.data.vehicles;

    if (Array.isArray(res.data)) return res.data;
    return [];
  } catch (err) {
    console.error('Failed fetching vehicles:', err.message || err);
    return [];
  }
}

async function runForDepot(depot) {
  console.log(`
Scheduling for depot ID=${depot.ID} with mechanicHours=${depot.MechanicHours}`);
  const vehicles = await fetchVehicles(depot.ID);
  if (!vehicles || vehicles.length === 0) {
    console.log('No vehicles/tasks returned for depot', depot.ID);
    return null;
  }
  const result = schedule(vehicles, Math.floor(depot.MechanicHours || 0));
  const out = {
    depotId: depot.ID,
    mechanicHours: depot.MechanicHours,
    selectedCount: result.selected.length,
    totalImpact: result.totalImpact,
    totalDuration: result.totalDuration,
    selected: result.selected
  };
  const outPath = path.join(__dirname, `vehicle-schedule-depot-${depot.ID}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Wrote output to', outPath);
  return out;
}

async function main() {
  const arg = process.argv[2];
  const depots = await fetchDepots();
  if (!depots || depots.length === 0) {
    console.error('No depots found from API');
    process.exit(1);
  }

  if (arg) {
    const d = depots.find(x => String(x.ID) === String(arg) || String(x.id) === String(arg));
    if (!d) {
      console.error('Depot id not found:', arg);
      process.exit(1);
    }
    await runForDepot(d);
    return;
  }

  for (const d of depots) {
    await runForDepot(d);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
