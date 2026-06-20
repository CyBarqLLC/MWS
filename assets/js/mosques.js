/* ===================================================================
   Momin — "The Three Mosques" personalized book (JPG-overlay + PDF).
   Mirrors the Pillars engine: uploaded artwork is the locked background;
   only dynamic text is overlaid, then exported as a multi-page PDF.

   Book language is chosen IN THE FORM (independent of the site language).
   Pages: cover (green=boy / pink=girl) -> welcome -> 4 mosque question
   pages -> 2 thinking pages -> optional dedication.
   =================================================================== */
(function () {
  "use strict";

  var DIR = "/assets/pages/";
  var FONT_AR = '"ZagelNums", "KidzhoodAR", "Zagel", "Tajawal", sans-serif';
  var FONT_EN = '"ZagelNums", "KidzhoodEN", "Zagel", "Inter", sans-serif';
  var INK = "#1a1a2e";

  var state = {
    lang: "ar", gender: "boy", firstName: "", fullName: "", email: "",
    ded: { role: "", name: "", msg: "", date: "" },
  };

  // Web3Forms integration for this product (Three Mosques). PDF generation below
  // is unchanged; this only adds a parallel submission of the form data.
  var WEB3FORMS_URL = "https://api.web3forms.com/submit";
  var WEB3FORMS_KEY = "659418d0-7f4f-4f90-8737-673d2b80b473";
  var PRODUCT_NAME = "رحلتي إلى المساجد الثلاثة / My Journey to the Three Mosques";
  var PRODUCT_AGE = "4–8";
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim()); }
  function sendSubmission() {
    try {
      var d = state.ded;
      // Official Web3Forms AJAX API: JSON POST including the access_key.
      // Fire-and-forget (.catch) so it never blocks or alters the PDF download.
      var payload = {
        access_key: WEB3FORMS_KEY,
        subject: "طلب تخصيص دفتر — رحلتي إلى المساجد الثلاثة",
        from_name: "عالم مؤمن — Momin World",
        email: state.email.trim(),
        product: PRODUCT_NAME,
        child_first_name: state.firstName.trim(),
        child_last_name: state.fullName.trim(),
        gender: state.gender === "boy" ? "ذكر / Boy" : "أنثى / Girl",
        age_range: PRODUCT_AGE,
        workbook_language: L() === "ar" ? "العربية" : "English",
        message_sender_type: d.role || "",
        message_sender_name: d.name.trim(),
        message_date: d.date || "",
        message_text: d.msg.trim(),
      };
      fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).catch(function () {});
    } catch (e) { /* never block the download */ }
  }

  function L() { return state.lang === "en" ? "en" : "ar"; }
  function isBoy() { return state.gender === "boy"; }
  function fn() { return state.firstName.trim() || (L() === "ar" ? "اسم طفلك" : "Your Name"); }
  function full() { return state.fullName.trim() || fn(); }

  /* ---------- dynamic text ---------- */
  function coverLines() {
    var name = fn();
    if (L() === "ar") {
      // Fixed four-line structure, all lines same weight + size.
      return [
        { text: "رحلة", sizeR: 0.092, weight: 800 },
        { text: name, sizeR: 0.092, weight: 800, fit: true },
        { text: "إلى المساجد", sizeR: 0.092, weight: 800 },
        { text: "الثلاثة", sizeR: 0.092, weight: 800 },
      ];
    }
    return [
      { text: name, sizeR: 0.13, weight: 800, fit: true },
      { text: "and the Three", sizeR: 0.078, weight: 700 },
      { text: "Mosques", sizeR: 0.095, weight: 700 },
    ];
  }
  function welcomeText() { return L() === "ar" ? "مرحباً يا " + fn() + "!" : "Welcome, " + fn() + "!"; }
  function thinkingText() { return L() === "ar" ? "هيا نفكر معاً يا " + fn() + "!" : "Let's Think, " + fn() + "!"; }
  var Q = {
    ar: {
      // Masculine wording (boy version) — unchanged.
      boy: {
        1: function (n) { return "لو وقفت أمام الكعبة المشرفة يا " + n + "، ماذا ستدعو الله؟"; },
        2: function (n) { return "هل تتشوق يا " + n + " لزيارة مسجد النبي ﷺ؟"; },
        3: function (n) { return "هل تعلم يا " + n + " أن المسجد الأقصى هو قبلة المسلمين الأولى؟"; },
        4: function (n) { return "هل تعلم يا " + n + " أن قبة الصخرة تقع داخل المسجد الأقصى؟"; },
      },
      // Feminine wording (girl version) — verbs/pronouns in the feminine.
      girl: {
        1: function (n) { return "لو وقفتِ أمام الكعبة المشرفة يا " + n + "، ماذا ستدعين الله؟"; },
        2: function (n) { return "هل تتشوقين يا " + n + " لزيارة مسجد النبي ﷺ؟"; },
        3: function (n) { return "هل تعلمين يا " + n + " أن المسجد الأقصى هو قبلة المسلمين الأولى؟"; },
        4: function (n) { return "هل تعلمين يا " + n + " أن قبة الصخرة تقع داخل المسجد الأقصى؟"; },
      },
    },
    en: {
      1: function (n) { return "If you stood in front of the Holy Kaaba, " + n + ", what would you ask Allah for?"; },
      2: function (n) { return "Would you like to visit the Prophet's Mosque, " + n + "?"; },
      3: function (n) { return "Did you know, " + n + ", that Al-Aqsa Mosque was the first Qiblah of the Muslims?"; },
      4: function (n) { return "Did you know, " + n + ", that the Dome of the Rock is located within the Al-Aqsa Mosque compound?"; },
    },
  };
  function questionText(order) {
    if (L() === "ar") return Q.ar[isBoy() ? "boy" : "girl"][order](fn());
    return Q.en[order](fn());
  }

  /* ---------- keepsake message (shared template with Pillars) ---------- */
  // Same 11 sender types + same "من X" / "From Your X" wording as Pillars.
  var SENDER_AR = { father: "من والدك", mother: "من والدتك", brother: "من أخيك", sister: "من أختك", teacherM: "من معلمك", teacherF: "من معلمتك", grandfather: "من جدك", grandmother: "من جدتك", uncleP: "من عمك", auntP: "من عمتك", uncleM: "من خالك", auntM: "من خالتك", other: "من" };
  var SENDER_EN = { father: "From Your Father", mother: "From Your Mother", brother: "From Your Brother", sister: "From Your Sister", teacherM: "From Your Teacher", teacherF: "From Your Teacher", grandfather: "From Your Grandfather", grandmother: "From Your Grandmother", uncleP: "From Your Uncle", auntP: "From Your Aunt", uncleM: "From Your Uncle", auntM: "From Your Aunt", other: "From" };
  // The message page is generated when a message is entered (date optional).
  function dedComplete() {
    var d = state.ded;
    return !!(d.role && d.name.trim() && d.msg.trim());
  }
  function senderTitle() {
    var d = state.ded;
    var map = L() === "ar" ? SENDER_AR : SENDER_EN;
    var prefix = map[d.role] || (L() === "ar" ? "من" : "From");
    return prefix + " " + d.name.trim();
  }
  function dateLine() {
    if (!state.ded.date) return "";
    return (L() === "ar" ? "التاريخ: " : "Date: ") + state.ded.date;
  }

  /* ---------- page set ---------- */
  function buildPages() {
    var l = L();
    var font = l === "ar" ? FONT_AR : FONT_EN;
    var dir = l === "ar" ? "rtl" : "ltr";
    var g = isBoy() ? "boy" : "girl";
    var coverPos = l === "ar" ? { xr: 0.95, align: "right" } : { xr: 0.05, align: "left" };
    function q(id, file, order) {
      return { id: id, src: DIR + file + ".jpg", overlays: [{ kind: "question", order: order, xr: 0.5, yr: 0.171, sizeR: 0.04, maxR: 0.66, align: "center", color: INK, weight: 700, font: font, dir: dir }] };
    }
    var thinkPos = l === "ar" ? 0.62 : 0.35;
    function act(id, file) {
      return { id: id, src: DIR + file + ".jpg", overlays: [{ kind: "thinking", xr: thinkPos, yr: 0.208, sizeR: 0.04, maxR: 0.4, align: "center", color: INK, weight: 800, font: font, dir: dir }] };
    }
    return [
      { id: "cover", src: DIR + "m3-cover-" + l + "-" + g + ".jpg", overlays: [{ kind: "cover", xr: coverPos.xr, yr: 0.49, align: coverPos.align, maxR: 0.42, gap: 0.16, color: INK, font: font, dir: dir }] },
      { id: "welcome", src: DIR + "m3-welcome-" + l + ".jpg", overlays: [{ kind: "welcome", xr: 0.5, yr: 0.19, sizeR: 0.078, maxR: 0.86, align: "center", color: INK, weight: 800, font: font, dir: dir }] },
      q("haram", "m3-haram", 1),
      q("nabawi", "m3-nabawi", 2),
      q("aqsa", "m3-aqsa", 3),
      q("dome", "m3-dome", 4),
      act("act1", "m3-act1-" + l),
      act("act2", "m3-act2-" + l),
      // Shared keepsake-message page (same template + layout as Pillars).
      { id: "message", src: DIR + (g === "boy" ? "msg-boy" : "msg-girl") + ".jpg", optional: true, overlays: [{ kind: "message", font: font, dir: dir }] },
    ];
  }

  var FALLBACK_W = 3508, FALLBACK_H = 2480;

  /* ---------- refs ---------- */
  var langInputs = document.querySelectorAll('input[name="m3lang"]');
  var langOpts = document.querySelectorAll(".m3-lang-opt");
  var genderInputs = document.querySelectorAll('input[name="m3gender"]');
  var genderOpts = document.querySelectorAll(".m3-gender-opt");
  var firstNameInput = document.getElementById("m3FirstName");
  var fullNameInput = document.getElementById("m3FullName");
  var emailInput = document.getElementById("m3Email");
  var firstNameLabel = document.getElementById("m3FirstNameLabel");
  var fullNameLabel = document.getElementById("m3FullNameLabel");
  var downloadBtn = document.getElementById("m3DownloadBtn");
  var genStatus = document.getElementById("m3GenStatus");
  var mockupImg = document.getElementById("m3MockupImg");
  var doneOverlay = document.getElementById("doneOverlay");
  var dToggle = document.getElementById("m3DedToggle");
  var dBody = document.getElementById("m3DedBody");
  var dRole = document.getElementById("m3DedRole");
  var dName = document.getElementById("m3DedName");
  var dMsg = document.getElementById("m3DedMsg");
  var dDate = document.getElementById("m3DedDate");
  var dCounter = document.getElementById("m3DedCounter");

  var IMAGES = {}, preloadPromise = null, alreadyGenerated = false;

  /* ---------- image loading (blob -> object URL, taint-safe) ---------- */
  function loadImage(src) {
    return fetch(src).then(function (r) { if (!r.ok) throw 0; return r.blob(); })
      .then(function (b) {
        return new Promise(function (res) {
          var u = URL.createObjectURL(b), i = new Image();
          i.onload = function () { res(i); }; i.onerror = function () { URL.revokeObjectURL(u); res(null); }; i.src = u;
        });
      })
      .catch(function () { return new Promise(function (res) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { res(null); }; i.src = src; }); });
  }
  function allSources() {
    var s = [];
    ["ar", "en"].forEach(function (l) {
      ["boy", "girl"].forEach(function (g) { s.push(DIR + "m3-cover-" + l + "-" + g + ".jpg"); });
      s.push(DIR + "m3-welcome-" + l + ".jpg", DIR + "m3-act1-" + l + ".jpg", DIR + "m3-act2-" + l + ".jpg");
    });
    ["m3-haram", "m3-nabawi", "m3-aqsa", "m3-dome", "msg-boy", "msg-girl"].forEach(function (f) { s.push(DIR + f + ".jpg"); });
    return s.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }
  function preload() {
    if (preloadPromise) return preloadPromise;
    preloadPromise = Promise.all(allSources().map(function (s) { return loadImage(s).then(function (im) { IMAGES[s] = im; }); }));
    return preloadPromise;
  }

  /* ---------- drawing ---------- */
  function wrap(ctx, text, maxW) {
    var words = String(text).split(" "), lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var t = cur ? cur + " " + words[i] : words[i];
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = words[i]; } else cur = t;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function drawStack(ctx, lines, o, W, H) {
    var cx = o.xr * W, cy = o.yr * H, maxW = (o.maxR || 0.8) * W, gap = o.gap != null ? o.gap : 0.28;
    ctx.textAlign = o.align || "center"; ctx.textBaseline = "middle"; ctx.direction = o.dir || "rtl"; ctx.fillStyle = o.color || INK;
    var rows = [];
    lines.forEach(function (ln) {
      var size = (ln.sizeR || o.sizeR) * H, weight = ln.weight || o.weight || 700;
      ctx.font = weight + " " + size + "px " + (o.font || FONT_AR);
      if (ln.fit) { var w = ctx.measureText(ln.text).width; if (w > maxW) size = size * (maxW / w); rows.push({ text: ln.text, size: size, weight: weight }); }
      else wrap(ctx, ln.text, maxW).forEach(function (sub) { rows.push({ text: sub, size: size, weight: weight }); });
    });
    var total = 0; rows.forEach(function (r) { total += r.size * (1 + gap); }); if (rows.length) total -= rows[rows.length - 1].size * gap;
    var y = cy - total / 2;
    rows.forEach(function (r) { ctx.font = r.weight + " " + r.size + "px " + (o.font || FONT_AR); y += r.size / 2; ctx.fillText(r.text, cx, y); y += r.size / 2 + r.size * gap; });
  }
  function drawOverlay(ctx, o, W, H) {
    if (o.kind === "cover") drawStack(ctx, coverLines(), o, W, H);
    else if (o.kind === "welcome") drawStack(ctx, [{ text: welcomeText(), sizeR: o.sizeR, weight: o.weight }], o, W, H);
    else if (o.kind === "thinking") drawStack(ctx, [{ text: thinkingText(), sizeR: o.sizeR, weight: o.weight }], o, W, H);
    else if (o.kind === "question") drawStack(ctx, [{ text: questionText(o.order), sizeR: o.sizeR, weight: o.weight, fit: true }], o, W, H);
    else if (o.kind === "message") {
      // Identical layout to the Pillars message page (sender / message / date).
      var base = { font: o.font, dir: o.dir, color: "#1a1a2e", align: "center" };
      drawStack(ctx, [{ text: senderTitle(), sizeR: 0.04, weight: 800 }],
        Object.assign({}, base, { xr: 0.5, yr: 0.45, maxR: 0.58 }), W, H);
      drawStack(ctx, [{ text: state.ded.msg.trim(), sizeR: 0.031, weight: 600 }],
        Object.assign({}, base, { xr: 0.5, yr: 0.585, maxR: 0.56, gap: 0.16 }), W, H);
      if (dateLine()) drawStack(ctx, [{ text: dateLine(), sizeR: 0.028, weight: 700 }],
        Object.assign({}, base, { xr: 0.5, yr: 0.7, maxR: 0.5 }), W, H);
    }
  }
  function renderPage(page) {
    var src = page.src, img = IMAGES[src], canvas, W, H;
    if (img) {
      W = img.naturalWidth || img.width; H = img.naturalHeight || img.height;
      canvas = document.createElement("canvas"); canvas.width = W; canvas.height = H;
      var ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0, W, H);
      page.overlays.forEach(function (o) { drawOverlay(ctx, o, W, H); });
    } else {
      canvas = document.createElement("canvas"); canvas.width = FALLBACK_W; canvas.height = FALLBACK_H;
      var c = canvas.getContext("2d"); c.fillStyle = "#f3f4f8"; c.fillRect(0, 0, FALLBACK_W, FALLBACK_H);
      c.fillStyle = "#8a8fa3"; c.textAlign = "center"; c.textBaseline = "middle"; c.font = '700 60px "Inter",monospace';
      c.fillText("missing: " + src.replace(DIR, ""), FALLBACK_W / 2, FALLBACK_H / 2);
      W = FALLBACK_W; H = FALLBACK_H;
    }
    return { canvas: canvas, w: W, h: H };
  }

  /* ---------- export ---------- */
  function setStatus(m, t) { genStatus.textContent = m || ""; genStatus.className = "gen-status" + (t ? " " + t : ""); }
  function tr(p) { if (window.Momin && window.Momin.t) { var v = window.Momin.t(p); if (v != null) return v; } return ""; }
  function loadFonts() {
    if (!document.fonts) return Promise.resolve();
    return Promise.all([
      document.fonts.load('800 120px "KidzhoodAR"'), document.fonts.load('700 120px "KidzhoodAR"'),
      document.fonts.load('800 120px "KidzhoodEN"'), document.fonts.load('700 120px "KidzhoodEN"'),
      document.fonts.load('700 120px "Zagel"'), document.fonts.load('700 120px "ZagelNums"', "0123456789"),
    ]).then(function () { return document.fonts.ready; }).catch(function () {});
  }
  // Absolute path so the redirect reaches the site root (not the current
  // /mw/<slug>/personalize/ folder). This fixes the redirect bug.
  var HOME_URL = "/index.html";
  var doneCount = document.getElementById("doneCount");
  var countdownTimer = null, homeSent = false;
  function goHome() {
    if (homeSent) return; homeSent = true;
    if (countdownTimer) clearInterval(countdownTimer);
    window.location.href = HOME_URL;
  }
  function countdownLine(n) {
    if (uiLang() === "ar") {
      var u = n === 1 ? "ثانية" : n === 2 ? "ثانيتين" : n + " ثوانٍ";
      return "العودة إلى الصفحة الرئيسية خلال " + u + "…";
    }
    return "Returning to the homepage in " + n + (n === 1 ? " second" : " seconds") + "…";
  }
  function showDone() {
    if (!doneOverlay) { goHome(); return; }
    doneOverlay.hidden = false;
    requestAnimationFrame(function () { doneOverlay.classList.add("show"); });
    var n = 3;
    if (doneCount) doneCount.textContent = countdownLine(n);
    countdownTimer = setInterval(function () {
      n -= 1;
      if (n <= 0) { goHome(); return; }
      if (doneCount) doneCount.textContent = countdownLine(n);
    }, 1000);
  }
  if (doneOverlay) {
    doneOverlay.addEventListener("click", function (e) { if (e.target === doneOverlay) goHome(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && doneOverlay && !doneOverlay.hidden) goHome();
  });

  async function generate() {
    if (!state.firstName.trim()) { setStatus(tr("form.fillName") || "Please enter your child's first name.", "err"); firstNameInput.focus(); return; }
    if (!validEmail(state.email)) { setStatus(tr("form.emailErr") || "Please enter a valid email address.", "err"); if (emailInput) emailInput.focus(); return; }
    if (!window.jspdf) { setStatus("PDF library still loading — please try again.", "err"); return; }
    // Second function: submit form data to Web3Forms (fire-and-forget, never blocks the PDF).
    sendSubmission();
    downloadBtn.disabled = true; setStatus(tr("form.generating") || "Generating your workbook…", "busy");
    try {
      await loadFonts(); await preload();
      var rendered = buildPages().filter(function (p) { return !p.optional || dedComplete(); }).map(renderPage);
      var JsPDF = window.jspdf.jsPDF, first = rendered[0];
      var doc = new JsPDF({ orientation: first.w >= first.h ? "landscape" : "portrait", unit: "px", format: [first.w, first.h], compress: true });
      for (var i = 0; i < rendered.length; i++) {
        var r = rendered[i], data = r.canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) doc.addPage([r.w, r.h], r.w >= r.h ? "landscape" : "portrait");
        doc.addImage(data, "JPEG", 0, 0, r.w, r.h);
      }
      var safe = (state.firstName.trim() || "Momin").replace(/\s+/g, "-");
      doc.save("Momin-ThreeMosques-" + L() + "-" + safe + ".pdf");
      setStatus("", "");
      // No lock — repeat generation is allowed.
      downloadBtn.disabled = false;
      showDone(); // success modal + 3s countdown -> redirect to /index.html
    } catch (err) { console.error(err); setStatus("PDF error: " + (err && err.message ? err.message : err), "err"); downloadBtn.disabled = false; }
  }

  /* ---------- UI ---------- */
  var PH = {
    ar: { f: { boy: "مثال: عبدالرحمن", girl: "مثال: سلمى" }, u: { boy: "مثال: أحمد", girl: "مثال: أحمد" } },
    en: { f: { boy: "Example: Abdulrahman", girl: "Example: Salma" }, u: { boy: "Example: Ahmad", girl: "Example: Ahmad" } },
  };
  // Gendered first/last-name labels (follow the site/UI language, like Pillars).
  function uiLang() { return (window.Momin && window.Momin.lang) || document.body.getAttribute("data-lang") || "ar"; }
  var LABELS = {
    ar: { first: { boy: "الاسم الأول للطفل", girl: "الاسم الأول للطفلة" }, full: { boy: "الاسم الأخير للطفل", girl: "الاسم الأخير للطفلة" } },
    en: { first: { boy: "Child's First Name (Boy)", girl: "Child's First Name (Girl)" }, full: { boy: "Child's Last Name (Boy)", girl: "Child's Last Name (Girl)" } },
  };
  function updateLabels() {
    var l = uiLang() === "ar" ? "ar" : "en", g = isBoy() ? "boy" : "girl";
    if (firstNameLabel) firstNameLabel.textContent = LABELS[l].first[g];
    if (fullNameLabel) fullNameLabel.textContent = LABELS[l].full[g];
  }
  function syncOpts(opts, inputs) { opts.forEach(function (o) { o.classList.toggle("is-active", o.querySelector("input").checked); }); }
  function updateMockup() { if (mockupImg) mockupImg.src = DIR + "m3-cover-" + L() + "-" + (isBoy() ? "boy" : "girl") + ".jpg"; }
  function updateCounter() { if (dCounter && dMsg) dCounter.textContent = dMsg.value.length + " / 100"; }
  function applyGenderTheme() { document.body.setAttribute("data-gender", isBoy() ? "boy" : "girl"); }
  function updatePlaceholders() {
    var l = L(), g = isBoy() ? "boy" : "girl";
    if (firstNameInput) firstNameInput.setAttribute("placeholder", PH[l].f[g]);
    if (fullNameInput) fullNameInput.setAttribute("placeholder", PH[l].u[g]);
  }

  langInputs.forEach(function (r) { r.addEventListener("change", function () { state.lang = r.value; syncOpts(langOpts, langInputs); updateMockup(); updatePlaceholders(); }); });
  genderInputs.forEach(function (r) { r.addEventListener("change", function () { state.gender = r.value; syncOpts(genderOpts, genderInputs); updateMockup(); applyGenderTheme(); updatePlaceholders(); updateLabels(); }); });
  firstNameInput.addEventListener("input", function () { state.firstName = firstNameInput.value; });
  if (fullNameInput) fullNameInput.addEventListener("input", function () { state.fullName = fullNameInput.value; });
  if (emailInput) emailInput.addEventListener("input", function () { state.email = emailInput.value; });
  downloadBtn.addEventListener("click", generate);
  window.addEventListener("momin:lang", function () { updatePlaceholders(); updateLabels(); });
  if (dToggle) {
    var dSection = dToggle.closest(".msg-section");
    dToggle.addEventListener("click", function () { var open = dSection.classList.toggle("is-open"); dToggle.setAttribute("aria-expanded", open ? "true" : "false"); });
  }
  if (dRole) dRole.addEventListener("change", function () { state.ded.role = dRole.value; });
  if (dName) dName.addEventListener("input", function () { state.ded.name = dName.value; });
  if (dDate) dDate.addEventListener("change", function () { state.ded.date = dDate.value; });
  if (dMsg) dMsg.addEventListener("input", function () { if (dMsg.value.length > 100) dMsg.value = dMsg.value.slice(0, 100); state.ded.msg = dMsg.value; updateCounter(); });

  /* ---------- init ---------- */
  (function init() {
    // default book language follows the current site language
    state.lang = (window.Momin && window.Momin.lang) || document.body.getAttribute("data-lang") || "ar";
    langInputs.forEach(function (r) { r.checked = r.value === state.lang; });
    syncOpts(langOpts, langInputs); syncOpts(genderOpts, genderInputs);
    applyGenderTheme(); updatePlaceholders(); updateLabels(); updateMockup(); updateCounter(); loadFonts(); preload();
  })();
})();
