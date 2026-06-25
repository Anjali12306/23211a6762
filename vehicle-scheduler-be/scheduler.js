const knapsack = (items, capacity) => {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const w = items[i - 1].duration;
    const v = items[i - 1].impact;
    for (let c = 0; c <= capacity; c++) {
      dp[i][c] = dp[i - 1][c];
      if (w <= c) {
        const val = dp[i - 1][c - w] + v;
        if (val > dp[i][c]) dp[i][c] = val;
      }
    }
  }

  let c = capacity;
  const chosen = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][c] !== dp[i - 1][c]) {
      chosen.push(items[i - 1]);
      c -= items[i - 1].duration;
    }
  }
  chosen.reverse();
  const totalImpact = dp[n][capacity];
  const totalDuration = chosen.reduce((s, it) => s + it.duration, 0);
  return { chosen, totalImpact, totalDuration };
};

const schedule = (vehicles, capacity) => {
  const items = vehicles.map(v => ({
    id: v.TaskID || v.taskId || v.id,
    duration: Math.max(0, Math.floor(v.Duration || v.duration || 0)),
    impact: Math.max(0, Math.floor(v.Impact || v.impact || 0)),
    raw: v
  })).filter(it => it.duration > 0 && it.impact >= 0);

  const { chosen, totalImpact, totalDuration } = knapsack(items, capacity);
  return { selected: chosen.map(it => it.raw), totalImpact, totalDuration };
};

module.exports = { schedule };
