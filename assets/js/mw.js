/* Momin World — product-page template. New products: add an MW.products
   entry. Payments: set MW.paid = true and fill MW.stripe[slug]. */
(function () {
  "use strict";

  var MW = {
    paid: false,
    stripe: { "islamic-pillars": "", "three-mosques": "" },
    products: {
      "islamic-pillars": {
        slug: "islamic-pillars",
        personalize: "/mw/islamic-pillars/personalize/index.html",
        cover: { ar: "/assets/covers/cover-new-ar.jpg", en: "/assets/covers/cover-new-en.jpg" },
        gallery: 6,
        price: "$1.99",
        age: { ar: "3–6 سنوات", en: "Ages 3–6" },
        languages: { ar: "العربية والإنجليزية", en: "Arabic & English" },
        title: { ar: "أنا أتعلم أركان الإسلام", en: "I Learn the Pillars of Islam" },
        docTitle: { ar: "أنا أتعلم أركان الإسلام - دفتر تلوين تعليمي", en: "I Am Learning The Five Pillars Of Islam - Educational Coloring Workbook" },
        subtitle: { ar: "تعلم ممتع يبدأ من أول تلوين", en: "Joyful learning that starts with the very first coloring page" },
        desc: { ar: "دفتر تلوين تعليمي مخصص باسم طفلك يساعده على التعرف على أركان الإسلام الخمسة من خلال التلوين والأنشطة البسيطة المناسبة للأطفال.", en: "A personalized coloring workbook with your child's name that helps them get to know the Five Pillars of Islam through coloring and simple, child-friendly activities." },
        learnHeading: { ar: "ماذا سيتعلم طفلك؟", en: "What your child will learn" },
        learn: { ar: ["معنى الشهادتين بطريقة تناسب عمر الطفل", "أهمية الصلاة في حياة المسلم", "لماذا نؤدي الزكاة ونساعد الآخرين", "معنى صيام رمضان وأثره الجميل", "التعرف على الحج وزيارة بيت الله الحرام"], en: ["The meaning of the Shahadah in a child-friendly way", "The importance of prayer in a Muslim's life", "Why we give Zakah and help others", "The meaning of fasting in Ramadan and its beauty", "Getting to know Hajj and visiting the Sacred House of Allah"] },
        inside: { ar: ["غلاف مخصص باسم الطفل", "خمس صفحات تلوين مستوحاة من أركان الإسلام", "أنشطة وأسئلة بسيطة بعد كل ركن", "شهادة تقدير رقمية باسم الطفل", "صفحة رسالة تذكارية اختيارية من الأسرة أو المعلم"], en: ["A cover personalized with the child's name", "Five coloring pages inspired by the Pillars of Islam", "Simple activities and questions after each pillar", "A digital certificate of achievement with the child's name", "An optional keepsake message page from family or teacher"] },
        personalization: { ar: ["يظهر اسم الطفل في صفحات الدفتر", "نسخة خاصة للبنين وأخرى للبنات", "متاح بالعربية أو الإنجليزية", "شهادة تقدير تحمل الاسم الكامل للطفل", "إمكانية إضافة رسالة تذكارية خاصة"], en: ["The child's name appears throughout the workbook pages", "Separate boy and girl versions", "Available in Arabic or English", "A certificate of achievement bearing the child's full name", "Option to add a special keepsake message"] },
      },
      "three-mosques": {
        slug: "three-mosques",
        personalize: "/mw/three-mosques/personalize/index.html",
        cover: { ar: "/assets/covers/m3-cover-ar.jpg", en: "/assets/covers/m3-cover-en.jpg" },
        gallery: 6,
        price: "$2.99",
        age: { ar: "4–8 سنوات", en: "Ages 4–8" },
        languages: { ar: "العربية والإنجليزية", en: "Arabic & English" },
        title: { ar: "رحلتي إلى المساجد الثلاثة", en: "My Journey to the Three Mosques" },
        docTitle: { ar: "رحلتي إلى المساجد الثلاثة - دفتر تلوين تعليمي", en: "My Journey Through The Three Holy Mosques - Educational Coloring Workbook" },
        subtitle: { ar: "اكتشاف ممتع لأعظم مساجد الإسلام", en: "A joyful discovery of Islam's greatest mosques" },
        desc: { ar: "دفتر تلوين مخصص باسم طفلك يأخذه في رحلة مبسطة للتعرف على المسجد الحرام والمسجد النبوي والمسجد الأقصى من خلال التلوين والأنشطة التفاعلية.", en: "A personalized coloring workbook with your child's name that takes them on a simple journey to discover Masjid Al-Haram, the Prophet's Mosque, and Al-Aqsa Mosque through coloring and interactive activities." },
        learnHeading: { ar: "ماذا سيكتشف طفلك؟", en: "What your child will discover" },
        learn: { ar: ["المسجد الحرام والكعبة المشرفة", "المسجد النبوي في المدينة المنورة", "المسجد الأقصى المبارك", "مكانة هذه المساجد في الإسلام", "معلومات مبسطة تناسب الأطفال"], en: ["Masjid Al-Haram and the Holy Kaaba", "The Prophet's Mosque in Madinah", "The blessed Al-Aqsa Mosque", "The status of these mosques in Islam", "Simple, child-friendly information"] },
        inside: { ar: ["غلاف مخصص باسم الطفل", "صفحات تلوين للمساجد المباركة", "أنشطة وأسئلة تفاعلية ممتعة", "صفحة ترحيب خاصة", "صفحة رسالة تذكارية اختيارية"], en: ["A cover personalized with the child's name", "Coloring pages of the blessed mosques", "Fun, interactive activities and questions", "A special welcome page", "An optional keepsake message page"] },
        personalization: { ar: ["يظهر اسم الطفل داخل صفحات الدفتر", "نسخة خاصة للبنين وأخرى للبنات", "متاح بالعربية أو الإنجليزية", "إمكانية إضافة رسالة تذكارية من أحد أفراد الأسرة أو المعلم"], en: ["The child's name appears inside the workbook pages", "Separate boy and girl versions", "Available in Arabic or English", "Option to add a keepsake message from a family member or teacher"] },
      },
    },
  };
  window.MW = MW;

  var T = {
    ar: { back: "العودة للإصدارات", age: "الفئة العمرية", gallery: "استكشف بعض صفحات الدفتر", learn: "ماذا سيتعلّم طفلك", inside: "ماذا ستجد داخل الدفتر", personalization: "كيف يصبح الدفتر مخصصاً لطفلك", languages: "اللغات المتاحة", cta: "أنشئ دفتر طفلك", start: "ابدأ التخصيص", free: "متاح مجانًا", prev: "السابق", next: "التالي" },
    en: { back: "Back to publications", age: "Age range", gallery: "Explore some workbook pages", learn: "What your child will learn", inside: "What you'll find inside the workbook", personalization: "How the workbook becomes personalized", languages: "Languages supported", cta: "Create Your Child's Workbook", start: "Start Personalizing", free: "Available Free", prev: "Previous", next: "Next" },
  };

  function lang() { return (window.Momin && window.Momin.lang) || document.body.getAttribute("data-lang") || "ar"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function list(items) { return '<ul class="pp-list">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"; }

  function ctaHref(p) {
    if (MW.paid && MW.stripe[p.slug]) return MW.stripe[p.slug]; // future: Stripe checkout (success -> personalize)
    return p.personalize;
  }

  function render() {
    var root = document.getElementById("mwProduct");
    if (!root) return;
    var p = MW.products[root.getAttribute("data-product")];
    if (!p) return;
    var l = lang(), t = T[l];

    var learnH = (p.learnHeading && p.learnHeading[l]) || t.learn;
    // Section order: hero -> learn -> inside -> personalization -> CTA.
    root.innerHTML =
      '<a class="back-link" href="/product.html">' + esc(t.back) + "</a>" +
      '<div class="pp-hero reveal in">' +
        '<div class="pp-cover"><img src="' + p.cover[l] + '" alt="" /></div>' +
        '<div class="pp-info">' +
          '<span class="age-badge">' + esc(p.age[l]) + "</span>" +
          '<h1 class="pp-title">' + esc(p.title[l]) + "</h1>" +
          '<p class="pp-sub">' + esc(p.subtitle[l]) + "</p>" +
          '<p class="pp-desc">' + esc(p.desc[l]) + "</p>" +
          '<div class="price-row"><span class="free-badge">' + esc(t.free) + "</span></div>" +
          '<a class="btn btn-blue block pp-cta" href="' + ctaHref(p) + '">' + esc(t.cta) + "</a>" +
          '<p class="pp-langs"><strong>' + esc(t.languages) + ":</strong> " + esc(p.languages[l]) + "</p>" +
        "</div>" +
      "</div>" +
      '<div class="pp-cols">' +
        '<section class="reveal"><h2 class="pp-h">' + esc(learnH) + "</h2>" + list(p.learn[l]) + "</section>" +
        '<section class="reveal"><h2 class="pp-h">' + esc(t.inside) + "</h2>" + list(p.inside[l]) + "</section>" +
        '<section class="reveal"><h2 class="pp-h">' + esc(t.personalization) + "</h2>" + list(p.personalization[l]) + "</section>" +
      "</div>" +
      '<div class="pp-cta-band reveal"><a class="btn btn-blue" href="' + ctaHref(p) + '">' + esc(t.cta) + "</a></div>";

    document.title = (p.docTitle && p.docTitle[l]) || p.title[l];
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", document.title);
    revealInit(root);
  }

  // Apply the scroll-reveal observer to freshly injected .reveal nodes.
  function revealInit(root) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: 0.1 });
      root.querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
    } else {
      root.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }
  }

  window.addEventListener("momin:lang", render);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
