/* ===================================================================
   Momin — personalization + PDF export (JPG-overlay engine).

   The uploaded JPGs are the FINAL artwork and are used as locked,
   untouched backgrounds. This script NEVER redraws, recreates, traces,
   vectorizes or modifies any page. At EXPORT TIME it only:
     1. loads the original JPG (1:1, pixel-perfect),
     2. overlays the child's dynamic text,
     3. exports a multi-page PDF.

   No live preview — the page shows the form + a static cover image.
   =================================================================== */
(function () {
  "use strict";

  var DIR = "/assets/pages/";
  // ZagelNums first so digits + "?" render in Zagel on canvas too.
  var FONT_AR = '"ZagelNums", "KidzhoodAR", "Zagel", "Tajawal", sans-serif';
  var FONT_EN = '"ZagelNums", "KidzhoodEN", "Zagel", "Inter", sans-serif';

  /* ---------------- form state ---------------- */
  var state = {
    gender: "boy", lang: "ar", firstName: "", fullName: "", email: "",
    msg: { type: "", name: "", date: "", text: "" },
  };

  // Web3Forms integration for this product (Pillars). The PDF generation below
  // is unchanged; this only adds a parallel submission of the form data.
  var WEB3FORMS_URL = "https://api.web3forms.com/submit";
  var WEB3FORMS_KEY = "659418d0-7f4f-4f90-8737-673d2b80b473";
  var PRODUCT_NAME = "أنا أتعلم أركان الإسلام / I Learn the Pillars of Islam";
  var PRODUCT_AGE = "3–6";
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim()); }
  function sendSubmission() {
    try {
      var m = state.msg;
      // Official Web3Forms AJAX API: JSON POST including the access_key.
      // Fire-and-forget (.catch) so it never blocks or alters the PDF download.
      var payload = {
        access_key: WEB3FORMS_KEY,
        subject: "طلب تخصيص دفتر — أنا أتعلم أركان الإسلام",
        from_name: "عالم مؤمن — Momin World",
        email: state.email.trim(),
        product: PRODUCT_NAME,
        child_first_name: state.firstName.trim(),
        child_last_name: state.fullName.trim(),
        gender: state.gender === "boy" ? "ذكر / Boy" : "أنثى / Girl",
        age_range: PRODUCT_AGE,
        workbook_language: LANG() === "ar" ? "العربية" : "English",
        message_sender_type: m.type || "",
        message_sender_name: m.name.trim(),
        message_date: m.date || "",
        message_text: m.text.trim(),
      };
      fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).catch(function () {});
    } catch (e) { /* never block the download */ }
  }

  // Workbook (content) language — driven by the in-form selector below.
  function LANG() { return state.lang === "en" ? "en" : "ar"; }
  // Site/UI language — drives the form's own labels only.
  function uiLang() {
    if (window.Momin && window.Momin.lang) return window.Momin.lang;
    return document.body.getAttribute("data-lang") || "ar";
  }
  function isBoy() { return state.gender === "boy"; }
  function fn() { return state.firstName.trim() || (LANG() === "ar" ? "اسم طفلك" : "Your Name"); }
  // Certificate name = first + last (last name held in state.fullName field).
  function full() {
    var combined = (state.firstName.trim() + " " + state.fullName.trim()).trim();
    return combined || (LANG() === "ar" ? "الاسم الكامل" : "Full Name");
  }

  /* ---------------- dynamic text strings ---------------- */
  // Cover title:  أنا (الاسم) / أتعلمُ / أركان / الإسلام
  //               I Am (Name) / Learning / The Pillars / of Islam
  function coverLines() {
    var name = fn();
    if (LANG() === "ar") {
      return [
        { text: "أنا " + name, sizeR: 0.130, weight: 800, fit: true },
        { text: "أتعلمُ", sizeR: 0.100, weight: 700 },
        { text: "أركان", sizeR: 0.100, weight: 700 },
        { text: "الإسلام", sizeR: 0.100, weight: 700 },
      ];
    }
    return [
      { text: "I Am " + name, sizeR: 0.130, weight: 800, fit: true },
      { text: "Learning", sizeR: 0.100, weight: 700 },
      { text: "The Pillars", sizeR: 0.100, weight: 700 },
      { text: "of Islam", sizeR: 0.100, weight: 700 },
    ];
  }

  // Per-pillar Arabic question (gendered). English uses the original
  // generic wording on every pillar page.
  var Q_AR = {
    1: { boy: "هل تعلمت معنى الشهادتين يا ", girl: "هل تعلمتِ معنى الشهادتين يا " },
    2: { boy: "هل تعلمت معنى الصلاة يا ", girl: "هل تعلمتِ معنى الصلاة يا " },
    3: { boy: "هل تعلمت معنى إيتاء الزكاة يا ", girl: "هل تعلمتِ معنى إيتاء الزكاة يا " },
    4: { boy: "هل تعلمت معنى صوم رمضان يا ", girl: "هل تعلمتِ معنى صوم رمضان يا " },
    5: { boy: "هل تعلمت معنى الحج يا ", girl: "هل تعلمتِ معنى الحج يا " },
  };
  function questionText(order) {
    var name = fn();
    if (LANG() === "ar") {
      return Q_AR[order][isBoy() ? "boy" : "girl"] + name + "؟";
    }
    return "Did you learn it, " + name + "?";
  }

  /* ---------------- optional special message ---------------- */
  var SENDER_AR = { father: "من والدك", mother: "من والدتك", brother: "من أخيك", sister: "من أختك", teacherM: "من معلمك", teacherF: "من معلمتك", grandfather: "من جدك", grandmother: "من جدتك", uncleP: "من عمك", auntP: "من عمتك", uncleM: "من خالك", auntM: "من خالتك", other: "من" };
  var SENDER_EN = { father: "From Your Father", mother: "From Your Mother", brother: "From Your Brother", sister: "From Your Sister", teacherM: "From Your Teacher", teacherF: "From Your Teacher", grandfather: "From Your Grandfather", grandmother: "From Your Grandmother", uncleP: "From Your Uncle", auntP: "From Your Aunt", uncleM: "From Your Uncle", auntM: "From Your Aunt", other: "From" };
  // The message page is generated when a message is entered (date optional).
  function messageComplete() {
    var m = state.msg;
    return !!(m.type && m.name.trim() && m.text.trim());
  }
  function senderTitle() {
    var m = state.msg;
    var map = LANG() === "ar" ? SENDER_AR : SENDER_EN;
    var prefix = map[m.type] || (LANG() === "ar" ? "من" : "From");
    return prefix + " " + m.name.trim();
  }
  function dateLine() {
    if (!state.msg.date) return "";
    return (LANG() === "ar" ? "التاريخ: " : "Date: ") + state.msg.date;
  }

  /* ---------------- page definitions per language ---------------- */
  function buildPages(lang) {
    var p = lang === "ar" ? "ar" : "en";
    var font = lang === "ar" ? FONT_AR : FONT_EN;
    var dir = lang === "ar" ? "rtl" : "ltr";
    var coverPos = lang === "ar" ? { xr: 0.955, align: "right" } : { xr: 0.045, align: "left" };
    var certYr = lang === "ar" ? 0.532 : 0.593;

    // Question text anchored away from the blue "؟" badge (x≈0.543-0.573):
    //  AR  -> right-aligned, right edge at 0.90, wraps before x=0.60
    //  EN  -> left-aligned,  left edge at 0.60 (after the badge), wraps to 0.90
    // Font reduced ~13%, line-wrapping enabled (no center alignment).
    var qPos = lang === "ar"
      ? { xr: 0.90, align: "right" }
      : { xr: 0.60, align: "left" };
    function pillar(id, file, order) {
      return {
        id: id,
        src: DIR + p + "-" + file + ".jpg",
        overlays: [{
          kind: "question", order: order, xr: qPos.xr, yr: 0.762, sizeR: 0.033,
          maxR: 0.30, align: qPos.align, color: "#1a1a2e", weight: 700, font: font, dir: dir,
        }],
      };
    }

    return [
      {
        id: "cover",
        src: DIR + p + "-1-cover.jpg",
        overlays: [{
          kind: "cover", xr: coverPos.xr, yr: 0.50, align: coverPos.align,
          maxR: 0.40, gap: 0.18, color: "#ffffff", font: font, dir: dir,
        }],
      },
      pillar("shahadah", "2-shahadah", 1),
      pillar("salah", "3-salah", 2),
      pillar("zakah", "4-zakah", 3),
      pillar("fasting", "5-fasting", 4),
      pillar("hajj", "6-hajj", 5),
      {
        // Gender template (bilingual artwork); text overlaid in current
        // language. Included in the PDF only when messageComplete().
        id: "message",
        src: { boy: DIR + "msg-boy.jpg", girl: DIR + "msg-girl.jpg" },
        fallback: true,
        overlays: [{ kind: "message", font: font, dir: dir }],
      },
      {
        id: "certificate",
        src: { boy: DIR + p + "-7-cert-boy.jpg", girl: DIR + p + "-7-cert-girl.jpg" },
        overlays: [{
          kind: "cert", xr: 0.5, yr: certYr, sizeR: 0.052, maxR: 0.60,
          align: "center", weight: 800, font: font, dir: dir,
          colorBoy: "#ffffff", colorGirl: "#1a1a2e",
        }],
      },
    ];
  }
  function srcFor(page) {
    if (typeof page.src === "string") return page.src;
    return isBoy() ? page.src.boy : page.src.girl;
  }
  function currentPages() { return buildPages(LANG()); }

  var FALLBACK_W = 3508, FALLBACK_H = 2480;

  /* ---------------- refs ---------------- */
  var firstNameInput = document.getElementById("firstName");
  var fullNameInput = document.getElementById("fullName");
  var emailInput = document.getElementById("email");
  var firstNameLabel = document.getElementById("firstNameLabel");
  var fullNameLabel = document.getElementById("fullNameLabel");
  var genderInputs = document.querySelectorAll('input[name="gender"]');
  var genderOpts = document.querySelectorAll(".gender-opt");
  var downloadBtn = document.getElementById("downloadBtn");
  var genStatus = document.getElementById("genStatus");
  var mockupImg = document.getElementById("mockupImg");
  var doneOverlay = document.getElementById("doneOverlay");
  // Optional special-message section
  var msgToggle = document.getElementById("msgToggle");
  var msgBody = document.getElementById("msgBody");
  var msgSender = document.getElementById("msgSender");
  var msgName = document.getElementById("msgName");
  var msgDate = document.getElementById("msgDate");
  var msgText = document.getElementById("msgText");
  var msgCounter = document.getElementById("msgCounter");

  var IMAGES = {};
  var preloadPromise = null;
  var alreadyGenerated = false;

  /* ---------------- image loading (blob -> object URL, taint-safe) -- */
  function loadImage(src) {
    return fetch(src)
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.blob(); })
      .then(function (blob) {
        return new Promise(function (resolve) {
          var url = URL.createObjectURL(blob);
          var img = new Image();
          img.onload = function () { resolve(img); };
          img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
          img.src = url;
        });
      })
      .catch(function () {
        return new Promise(function (resolve) {
          var img = new Image();
          img.onload = function () { resolve(img); };
          img.onerror = function () { resolve(null); };
          img.src = src;
        });
      });
  }
  function allSources() {
    var srcs = [];
    ["ar", "en"].forEach(function (l) {
      buildPages(l).forEach(function (pg) {
        if (typeof pg.src === "string") srcs.push(pg.src);
        else { srcs.push(pg.src.boy); srcs.push(pg.src.girl); }
      });
    });
    return srcs;
  }
  function preload() {
    if (preloadPromise) return preloadPromise;
    preloadPromise = Promise.all(allSources().map(function (s) {
      return loadImage(s).then(function (img) { IMAGES[s] = img; });
    }));
    return preloadPromise;
  }

  /* ---------------- text drawing ---------------- */
  function wrap(ctx, text, maxW) {
    var words = String(text).split(" ");
    var lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var test = cur ? cur + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = words[i]; }
      else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function drawStack(ctx, lines, o, W, H) {
    var cx = o.xr * W, cy = o.yr * H;
    var maxW = (o.maxR || 0.8) * W;
    var gap = o.gap != null ? o.gap : 0.28;
    ctx.textAlign = o.align || "center";
    ctx.textBaseline = "middle";
    ctx.direction = o.dir || "rtl";
    ctx.fillStyle = o.color || "#111";

    var rows = [];
    lines.forEach(function (ln) {
      var size = (ln.sizeR || o.sizeR) * H;
      var weight = ln.weight || o.weight || 700;
      ctx.font = weight + " " + size + 'px ' + (o.font || FONT_AR);
      if (ln.fit) {
        var w = ctx.measureText(ln.text).width;
        if (w > maxW) size = size * (maxW / w);
        rows.push({ text: ln.text, size: size, weight: weight });
      } else {
        wrap(ctx, ln.text, maxW).forEach(function (sub) { rows.push({ text: sub, size: size, weight: weight }); });
      }
    });

    var totalH = 0;
    rows.forEach(function (r) { totalH += r.size * (1 + gap); });
    if (rows.length) totalH -= rows[rows.length - 1].size * gap;
    var y = cy - totalH / 2;
    rows.forEach(function (r) {
      ctx.font = r.weight + " " + r.size + 'px ' + (o.font || FONT_AR);
      y += r.size / 2;
      ctx.fillText(r.text, cx, y);
      y += r.size / 2 + r.size * gap;
    });
  }
  function drawOverlay(ctx, o, W, H) {
    if (o.kind === "cover") {
      drawStack(ctx, coverLines(), o, W, H);
    } else if (o.kind === "question") {
      drawStack(ctx, [{ text: questionText(o.order), sizeR: o.sizeR, weight: o.weight, fit: true }], o, W, H);
    } else if (o.kind === "cert") {
      var col = isBoy() ? o.colorBoy : o.colorGirl;
      drawStack(ctx, [{ text: full(), sizeR: o.sizeR, weight: o.weight }],
        Object.assign({}, o, { color: col }), W, H);
    } else if (o.kind === "message") {
      // Dark text kept safely inside the template's white card area
      // (card interior ≈ x 0.17–0.83, y 0.36–0.74). Short 100-char limit
      // + wrapping + conservative sizes guarantee nothing touches the border.
      var base = { font: o.font, dir: o.dir, color: "#1a1a2e", align: "center" };
      drawStack(ctx, [{ text: senderTitle(), sizeR: 0.04, weight: 800 }],
        Object.assign({}, base, { xr: 0.5, yr: 0.45, maxR: 0.58 }), W, H);
      drawStack(ctx, [{ text: state.msg.text.trim(), sizeR: 0.031, weight: 600 }],
        Object.assign({}, base, { xr: 0.5, yr: 0.585, maxR: 0.56, gap: 0.16 }), W, H);
      if (dateLine()) drawStack(ctx, [{ text: dateLine(), sizeR: 0.028, weight: 700 }],
        Object.assign({}, base, { xr: 0.5, yr: 0.7, maxR: 0.5 }), W, H);
    }
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function placeholderCanvas(label) {
    var c = document.createElement("canvas");
    c.width = FALLBACK_W; c.height = FALLBACK_H;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#f3f4f8"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#8a8fa3"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = '700 64px "Inter", monospace';
    ctx.fillText("missing artwork: " + label, c.width / 2, c.height / 2);
    return c;
  }
  // Clean fallback used only if a message template is missing: white page
  // with a rounded colored border (blue boy / pink girl) + the text.
  function messageFallbackCanvas(page, W, H) {
    var c = document.createElement("canvas"); c.width = W; c.height = H;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = isBoy() ? "#0061ef" : "#ffa1cc";
    ctx.lineWidth = 10;
    roundRect(ctx, W * 0.13, H * 0.14, W * 0.74, H * 0.64, 80);
    ctx.stroke();
    page.overlays.forEach(function (o) { drawOverlay(ctx, o, W, H); });
    return c;
  }
  function renderPage(page) {
    var src = srcFor(page);
    var img = IMAGES[src];
    var canvas, W, H;
    if (img) {
      W = img.naturalWidth || img.width; H = img.naturalHeight || img.height;
      canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, W, H);
      page.overlays.forEach(function (o) { drawOverlay(ctx, o, W, H); });
    } else if (page.fallback) {
      W = FALLBACK_W; H = FALLBACK_H;
      canvas = messageFallbackCanvas(page, W, H);
    } else {
      canvas = placeholderCanvas(src.replace(DIR, "")); W = canvas.width; H = canvas.height;
    }
    return { canvas: canvas, w: W, h: H };
  }

  /* ---------------- PDF export ---------------- */
  function setStatus(msg, type) {
    genStatus.textContent = msg || "";
    genStatus.className = "gen-status" + (type ? " " + type : "");
  }
  function tr(path) {
    if (window.Momin && typeof window.Momin.t === "function") {
      var v = window.Momin.t(path); if (v != null) return v;
    }
    return "";
  }
  function loadFonts() {
    if (!document.fonts) return Promise.resolve();
    return Promise.all([
      document.fonts.load('800 120px "KidzhoodAR"'),
      document.fonts.load('700 120px "KidzhoodAR"'),
      document.fonts.load('800 120px "KidzhoodEN"'),
      document.fonts.load('700 120px "KidzhoodEN"'),
      document.fonts.load('700 120px "Zagel"'),
      document.fonts.load('700 120px "ZagelNums"', "0123456789"),
    ]).then(function () { return document.fonts.ready; }).catch(function () {});
  }

  // Light, UX-only protection: one workbook per session.
  function lockDownloaded() {
    alreadyGenerated = true;
    if (downloadBtn) { downloadBtn.disabled = true; downloadBtn.classList.add("is-done"); }
  }
  // Absolute path so the redirect always reaches the site root (not the
  // current /mw/<slug>/personalize/ folder). This fixes the redirect bug.
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
  // Dismissing the modal (backdrop click or Escape) redirects home immediately.
  if (doneOverlay) {
    doneOverlay.addEventListener("click", function (e) { if (e.target === doneOverlay) goHome(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && doneOverlay && !doneOverlay.hidden) goHome();
  });

  async function generate() {
    if (!state.firstName.trim()) {
      setStatus(tr("form.fillName") || "Please enter your child's first name.", "err");
      firstNameInput.focus();
      return;
    }
    if (!validEmail(state.email)) {
      setStatus(tr("form.emailErr") || "Please enter a valid email address.", "err");
      if (emailInput) emailInput.focus();
      return;
    }
    if (!window.jspdf) {
      setStatus("PDF library still loading — please try again in a moment.", "err");
      return;
    }
    // Second function: submit the form data to Web3Forms (fire-and-forget so it
    // never blocks or alters the existing PDF download flow).
    sendSubmission();
    downloadBtn.disabled = true;
    setStatus(tr("form.generating") || "Generating your workbook…", "busy");
    try {
      await loadFonts();
      await preload();

      // Include the special-message page only when the section is fully
      // completed; otherwise the PDF is exactly as before (no blank page).
      var rendered = currentPages()
        .filter(function (pg) { return pg.id !== "message" || messageComplete(); })
        .map(renderPage);
      var JsPDF = window.jspdf.jsPDF;
      var first = rendered[0];
      var doc = new JsPDF({
        orientation: first.w >= first.h ? "landscape" : "portrait",
        unit: "px", format: [first.w, first.h], compress: true,
      });
      for (var i = 0; i < rendered.length; i++) {
        var r = rendered[i];
        var data = r.canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) doc.addPage([r.w, r.h], r.w >= r.h ? "landscape" : "portrait");
        doc.addImage(data, "JPEG", 0, 0, r.w, r.h);
      }
      var safe = (state.firstName.trim() || "Momin").replace(/\s+/g, "-");
      doc.save("Momin-" + LANG() + "-" + safe + ".pdf");

      setStatus("", "");
      downloadBtn.disabled = false; // no lock — repeat generation allowed
      showDone();              // success modal + 3s countdown -> redirect home
    } catch (err) {
      console.error(err);
      setStatus("PDF error: " + (err && err.message ? err.message : err), "err");
      downloadBtn.disabled = false;
    }
  }

  /* ---------------- gender + language aware labels / placeholders ---- */
  var LABELS = {
    ar: {
      first: { boy: "الاسم الأول للطفل", girl: "الاسم الأول للطفلة" },
      full: { boy: "الاسم الأخير للطفل", girl: "الاسم الأخير للطفلة" },
      fph: { boy: "مثال: عبدالرحمن", girl: "مثال: سلمى" },
      uph: { boy: "مثال: أحمد", girl: "مثال: أحمد" },
    },
    en: {
      first: { boy: "Child's First Name (Boy)", girl: "Child's First Name (Girl)" },
      full: { boy: "Child's Last Name (Boy)", girl: "Child's Last Name (Girl)" },
      fph: { boy: "Example: Abdulrahman", girl: "Example: Salma" },
      uph: { boy: "Example: Ahmad", girl: "Example: Ahmad" },
    },
  };
  function updateLabels() {
    var l = uiLang() === "ar" ? "ar" : "en", g = isBoy() ? "boy" : "girl";
    if (firstNameLabel) firstNameLabel.textContent = LABELS[l].first[g];
    if (fullNameLabel) fullNameLabel.textContent = LABELS[l].full[g];
    if (firstNameInput) firstNameInput.setAttribute("placeholder", LABELS[l].fph[g]);
    if (fullNameInput) fullNameInput.setAttribute("placeholder", LABELS[l].uph[g]);
  }
  function updateMockup() {
    if (mockupImg) mockupImg.src = "/assets/covers/cover-new-" + (LANG() === "ar" ? "ar" : "en") + ".jpg";
  }
  function updateGenderUI() {
    genderOpts.forEach(function (l) { l.classList.toggle("is-active", l.querySelector("input").checked); });
  }
  // Drives the pink (girl) / blue (boy) accent theme on the page only.
  function applyGenderTheme() {
    document.body.setAttribute("data-gender", isBoy() ? "boy" : "girl");
  }

  function updateCounter() {
    if (msgCounter && msgText) msgCounter.textContent = msgText.value.length + " / 100";
  }

  /* ---------------- events ---------------- */
  genderInputs.forEach(function (r) {
    r.addEventListener("change", function () { state.gender = r.value; updateGenderUI(); updateLabels(); applyGenderTheme(); });
  });
  firstNameInput.addEventListener("input", function () { state.firstName = firstNameInput.value; });
  fullNameInput.addEventListener("input", function () { state.fullName = fullNameInput.value; });
  if (emailInput) emailInput.addEventListener("input", function () { state.email = emailInput.value; });
  downloadBtn.addEventListener("click", generate);
  // In-form workbook-language selector (official source for file generation).
  var bookLangInputs = document.querySelectorAll('input[name="bookLang"]');
  bookLangInputs.forEach(function (r) {
    r.addEventListener("change", function () { if (r.checked) { state.lang = r.value; updateMockup(); } });
  });
  // Site language only re-translates the form's own labels — never the file.
  window.addEventListener("momin:lang", function () { updateLabels(); });

  // Optional special message: collapse toggle (+/−) + fields + live counter
  var msgSection = msgToggle ? msgToggle.closest(".msg-section") : null;
  if (msgToggle && msgSection) {
    msgToggle.addEventListener("click", function () {
      var open = msgSection.classList.toggle("is-open");
      msgToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (msgSender) msgSender.addEventListener("change", function () { state.msg.type = msgSender.value; });
  if (msgName) msgName.addEventListener("input", function () { state.msg.name = msgName.value; });
  if (msgDate) msgDate.addEventListener("change", function () { state.msg.date = msgDate.value; });
  if (msgText) msgText.addEventListener("input", function () {
    if (msgText.value.length > 100) msgText.value = msgText.value.slice(0, 100);
    state.msg.text = msgText.value; updateCounter();
  });
  updateCounter();

  /* ---------------- init ---------------- */
  var checkedBookLang = document.querySelector('input[name="bookLang"]:checked');
  if (checkedBookLang) state.lang = checkedBookLang.value;
  updateGenderUI();
  applyGenderTheme();
  updateLabels();
  updateMockup();
  loadFonts();
  preload();
})();
