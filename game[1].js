(() => {
const G = window.GAME, $ = s => document.querySelector(s), app = $("#app");
let voice = false, st = {};
const store = {
  get() { try { return JSON.parse(localStorage.getItem("zwfl.stars") || "{}"); } catch (e) { return {}; } },
  set(id, n) { try { const s = store.get(); if (!s[id] || s[id] < n) s[id] = n; localStorage.setItem("zwfl.stars", JSON.stringify(s)); } catch (e) {} }
};
const stars = n => "★".repeat(n) + "☆".repeat(3 - n);
const strip = t => t.replace(/<[^>]+>/g, "");
function say(t) { if (!voice || !window.speechSynthesis) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(strip(t)); u.rate = .95; speechSynthesis.speak(u); }
const wig = (t, cls = "") => `<div class="wig"><div class="worm" aria-hidden="true">🪱</div><p class="bubble ${cls}" aria-live="polite">${t}</p></div>`;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const bin = (l, b) => ({ ...G.bins[b], ...((l.binLabels || {})[b] || {}) });
const best = it => Object.entries(it.scores).sort((a, b) => b[1] - a[1])[0][0];
const back = `<button class="btn" id="home">← Levels</button>`;
const wireHome = () => { const h = $("#home"); if (h) h.onclick = home; };

$("#voice").onclick = e => {
  voice = !voice; e.target.setAttribute("aria-pressed", voice);
  e.target.textContent = "🔊 Read aloud: " + (voice ? "on" : "off");
  if (!voice && window.speechSynthesis) speechSynthesis.cancel();
};
if (window.FEEDBACK_URL) $("#fb").innerHTML = `· <a href="${window.FEEDBACK_URL}" target="_blank" rel="noopener">Send feedback</a>`;

function home() {
  const s = store.get();
  const intro = "Hi, I'm Wiggle! Food waste is a design problem we can fix. Help me close the loop so nothing goes to waste.";
  app.innerHTML = `${wig(intro)}
  <section class="card"><h2>The Food Rescue Ladder</h2><p>Always try the top step first. Trash is last.</p>
  <ol class="ladder">${G.ladder.map((l, i) => `<li style="--w:${100 - i * 18}"><span style="font-size:1.6rem">${l.e}</span><span><b>${l.t}</b><small>${l.d}</small></span></li>`).join("")}</ol></section>
  <h2>Choose a level</h2>
  ${G.levels.map((l, i) => `<button class="level" data-i="${i}"><span class="lemoji">${l.emoji}</span><span><b>${l.title}</b> ${l.bonus ? "<em>Bonus</em>" : ""}<br><small>${l.blurb}</small></span><span class="stars" aria-label="${s[l.id] || 0} of 3 stars">${stars(s[l.id] || 0)}</span></button>`).join("")}`;
  app.querySelectorAll("[data-i]").forEach(b => b.onclick = () => startLevel(+b.dataset.i));
  say(intro);
}

function startLevel(i) {
  const l = G.levels[i];
  st = { li: i, l, results: [], idx: 0, choice: null };
  if (l.type === "loop") return loopStart();
  if (l.prestep) return prestepView();
  introView();
}
function introView() {
  const l = st.l;
  app.innerHTML = `${back}<h2>${l.emoji} ${l.title}</h2>${wig(l.intro)}
  <div class="card"><b>Your bins</b><div class="row">${l.bins.map(b => { const x = bin(l, b); return `<span class="btn">${x.emoji} ${x.name}</span>`; }).join("")}</div></div>
  <p class="row"><button class="go" id="start">Start →</button></p>`;
  wireHome(); $("#start").onclick = () => beginSort([]); say(l.intro);
}
function prestepView() {
  const l = st.l, p = l.prestep;
  app.innerHTML = `${back}<h2>${l.emoji} ${l.title}</h2>${wig(l.intro)}
  <div class="card"><h2>${p.q}</h2>${p.options.map((o, i) => `<button class="opt" data-o="${i}"><b>${o.label}</b><br><small>${o.desc}</small></button>`).join("")}</div>`;
  wireHome(); say(l.intro + " " + p.q);
  app.querySelectorAll("[data-o]").forEach(b => b.onclick = () => { st.choice = p.options[+b.dataset.o]; beginSort(st.choice.extras || []); });
}
function beginSort(extras) {
  const l = st.l;
  st.queue = shuffle([...l.items.filter(i => !i.extra), ...extras.map(id => l.items.find(i => i.id === id))]);
  st.idx = 0; st.results = []; showItem();
}
function showItem() {
  const l = st.l, it = st.queue[st.idx], n = st.queue.length;
  app.innerHTML = `${back}
  <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${st.idx}"><i style="width:${100 * st.idx / n}%"></i></div>
  <small>Item ${st.idx + 1} of ${n}</small>
  <div class="item"><div class="big" aria-hidden="true">${it.emoji}</div><h2>${it.name}</h2><p>${it.desc || ""}</p></div>
  <p class="ask">Where should it go?</p>
  <div class="bins">${l.bins.map(b => { const x = bin(l, b); return `<button class="bin" data-b="${b}"><span class="e" aria-hidden="true">${x.emoji}</span><b>${x.name}</b><small>${x.sub}</small></button>`; }).join("")}</div>`;
  wireHome(); say(`${it.name}. ${it.desc || ""} Where should it go?`);
  app.querySelectorAll("[data-b]").forEach(b => b.onclick = () => pick(b.dataset.b));
}
function pick(b) {
  const it = st.queue[st.idx], score = it.scores[b] ?? 0, unsafe = (it.unsafe || []).includes(b), bb = best(it);
  st.results.push({ it, b, score, unsafe, best: bb });
  const l = st.l, last = st.idx === st.queue.length - 1;
  let v, cls, text = it.why[b] || (score === 3 ? it.why[bb] : "That is not the best place for this item.");
  if (unsafe) { v = "⚠️ Safety alert!"; cls = "danger"; }
  else if (score === 3) { v = "✅ Great choice!"; cls = "ok"; }
  else if (score === 2) { v = "👍 Good, but there is a better spot"; cls = "meh"; }
  else if (score === 1) { v = "🤔 Not the best choice"; cls = "meh"; }
  else { v = "❌ Not here"; cls = "danger"; }
  if (score < 3) { const x = bin(l, bb); text += `<br><b>Best choice:</b> ${x.emoji} ${x.name}. ${it.why[bb]}`; }
  app.innerHTML = `${back}<div class="item ${unsafe ? "alert" : ""}"><div class="big" aria-hidden="true">${it.emoji}</div><h2>${it.name}</h2>
  <p>You chose: ${bin(l, b).emoji} ${bin(l, b).name}</p></div>
  <div class="verdict ${cls}">${v}</div>${wig(text, unsafe ? "alert" : "")}
  <p class="row"><button class="go" id="next">${last ? "See results" : "Next →"}</button></p>`;
  wireHome(); say(strip(v) + ". " + strip(text));
  $("#next").onclick = () => { st.idx++; last ? summary() : showItem(); };
}

function ring(pct) {
  const c = 2 * Math.PI * 54;
  return `<svg class="ring" viewBox="0 0 140 140" role="img" aria-label="Loop meter ${Math.round(pct * 100)} percent">
  <circle cx="70" cy="70" r="54" fill="none" stroke="var(--line)" stroke-width="14"/>
  <circle cx="70" cy="70" r="54" fill="none" stroke="var(--green)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${c * pct} ${c}" transform="rotate(-90 70 70)"/>
  <text x="70" y="80" text-anchor="middle">${Math.round(pct * 100)}%</text></svg>`;
}
function finish(pct, bodyHtml, msg) {
  const l = st.l, n = pct >= .85 ? 3 : pct >= .6 ? 2 : 1;
  store.set(l.id, n);
  const next = G.levels[st.li + 1];
  app.innerHTML = `${back}<h2>${l.emoji} ${l.title}: done!</h2>
  <div class="card" style="text-align:center">${ring(pct)}<div class="stars" style="margin:6px 0;font-size:1.8rem" aria-label="${n} of 3 stars">${stars(n)}</div><b>Loop meter</b></div>
  ${wig(msg)}${bodyHtml}
  <div class="card"><b>💡 Did you know?</b><p>${l.fact}</p></div>
  <p class="row"><button class="go" id="again">Play again</button>${next ? `<button class="btn" id="nextlv">Next: ${next.title} →</button>` : ""}</p>`;
  wireHome(); $("#again").onclick = () => startLevel(st.li);
  if (next) $("#nextlv").onclick = () => startLevel(st.li + 1);
  say(msg);
}
function summary() {
  const r = st.results, pct = r.reduce((s, x) => s + x.score, 0) / (3 * r.length), hits = r.filter(x => x.unsafe).length, l = st.l;
  const rows = r.map(x => `<tr><td>${x.it.emoji} ${x.it.name}</td><td>${bin(l, x.b).emoji} ${bin(l, x.b).name}</td><td>${x.score === 3 && !x.unsafe ? "✅" : `Best: ${bin(l, x.best).emoji} ${bin(l, x.best).name}`}</td></tr>`).join("");
  let body = `<div class="card"><b>Your choices</b><table class="picks"><tr><td></td><td><b>You chose</b></td><td><b>Result</b></td></tr>${rows}</table></div>`;
  if (st.choice) body = `<div class="card"><b>${st.choice.prevent ? "🌟 Waste prevented!" : "What you chose"}</b><p>${st.choice.note}</p></div>` + body;
  if (hits) body = `<div class="card alert"><b>⚠️ ${hits} safety alert${hits > 1 ? "s" : ""}</b><p>Keep unsafe food away from people and animals. Review the red items above.</p></div>` + body;
  const msg = pct >= .85 ? "Amazing! Almost nothing goes to waste in your loop." : pct >= .6 ? "Good work! Try the ladder again to rescue even more." : "Nice start! Check the best choices below and try again.";
  finish(pct, body, msg);
}

function loopStart() { st.step = 0; st.tries = 0; st.scores = []; st.lit = new Set([0]); st.closed = false; st.wrong = new Set(); loopView(); }
function nodesHtml() {
  const l = st.l;
  return `<div class="nodes" role="img" aria-label="The food loop">${l.nodes.map((n, i) => `<div class="node ${st.lit.has(i) ? "on" : ""}"><span class="e">${n.e}</span><small>${n.t}</small></div>${i < l.nodes.length - 1 ? `<span class="arrow ${st.lit.has(i + 1) ? "on" : ""}">➜</span>` : ""}`).join("")}
  <span class="arrow ${st.closed ? "on" : ""}" title="back to the start">↩️</span></div>`;
}
function loopView(fb) {
  const l = st.l, s = l.steps[st.step];
  app.innerHTML = `${back}<h2>${l.emoji} ${l.title}</h2>${st.step === 0 && !fb ? wig(l.intro) : ""}${nodesHtml()}
  <div class="card"><small>Question ${st.step + 1} of ${l.steps.length}</small><h2>${s.q}</h2>
  ${s.c.map((c, i) => `<button class="opt ${st.wrong.has(i) ? "bad" : ""}" data-c="${i}" ${st.wrong.has(i) ? "disabled" : ""}>${c}</button>`).join("")}</div>
  ${fb ? wig(fb) : ""}`;
  wireHome(); say(s.q);
  app.querySelectorAll("[data-c]").forEach(b => b.onclick = () => answer(+b.dataset.c));
}
function answer(i) {
  const l = st.l, s = l.steps[st.step];
  if (i !== s.a) { st.tries++; st.wrong.add(i); return loopView("Not quite. Think about what really happens, then try another answer."); }
  st.scores.push(Math.max(1, 3 - st.tries));
  s.light.forEach(x => x === "close" ? st.closed = true : st.lit.add(x));
  const last = st.step === l.steps.length - 1;
  app.innerHTML = `${back}${nodesHtml()}<div class="card"><h2>✅ ${s.c[s.a]}</h2></div>${wig(s.fact)}
  <p class="row"><button class="go" id="next">${last ? "Close the loop" : "Next →"}</button></p>`;
  wireHome(); say(s.fact);
  $("#next").onclick = () => {
    st.tries = 0; st.wrong = new Set();
    if (last) { st.closed = true; finish(st.scores.reduce((a, b) => a + b, 0) / (3 * st.scores.length), "", "The loop is closed! Scraps became soil, soil grew food, and nothing went to waste."); }
    else { st.step++; loopView(); }
  };
}
home();
})();
