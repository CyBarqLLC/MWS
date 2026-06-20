/* ===================================================================
   Momin — vanilla JS: bilingual (AR/EN) switching, RTL/LTR, mobile
   menu, sticky navbar, scroll reveal, product carousel, per-page
   <title>/description. No dependencies, no build step.
   =================================================================== */
(function () {
  "use strict";

  /* ---------- Per-language SEO ---------- */
  var SEO = {
    desc: {
      ar: "عالم مؤمن مشروع تعليمي قيمي رقمي يقدّم دفاتر وأنشطة ومواد تعليمية مخصصة باسم الطفل، تجمع بين التعلّم والتفاعل والقيم بأسلوب عربي حديث يجعل التجربة أكثر قرباً ومتعة لكل طفل.",
      en: "Momin World is a values-based educational project offering workbooks, activities, and learning materials personalized with the child's name — blending learning, interaction, and values in a modern Arabic style that makes the experience closer and more enjoyable for every child.",
    },
    ogDesc: {
      ar: "مواد تعليمية قيمية مخصصة باسم الطفل، تجمع بين التعلّم والتفاعل والقيم في تجربة صُممت خصيصاً له.",
      en: "Values-based educational materials personalized with the child's name — blending learning, interaction, and values in an experience designed just for them.",
    },
    titles: {
      home: { ar: "عالم مؤمن Momin World", en: "عالم مؤمن Momin World" },
      publications: { ar: "إصدارات عالم مؤمن", en: "Momin World Publications" },
      personalize: { ar: "عالم مؤمن - تم الدفع بنجاح", en: "Momin World - Payment Successful" },
      order: { ar: "عالم مؤمن - تم تأكيد الدفع", en: "Momin World - Payment Confirmed" },
      contact: { ar: "عالم مؤمن - تواصل معنا", en: "Momin World - Contact Us" },
    },
  };

  /* ---------- Content dictionary (single source of truth) ---------- */
  var dict = {
    ar: {
      dir: "rtl",
      nav: { home: "الرئيسية", publications: "إصداراتنا", why: "لماذا عالم مؤمن", support: "ادعم عالم مؤمن", contact: "تواصل معنا", langLabel: "اللغة", menu: "افتح القائمة", close: "أغلق القائمة" },
      hero: {
        badge: "تعليمي قيمي مخصص",
        headline: "رحلة تعلّم مخصصة باسم طفلك",
        hadith: "المؤمن القوي خيرٌ وأحبُّ إلى الله من المؤمن الضعيف",
        hadithAttr: "قال رسول الله ﷺ",
        hadithMeaning: "The strong believer is better and more beloved to Allah than the weak believer.",
        mominTag: "(Momin)",
        description: "يظهر اسم طفلك داخل صفحات الدفاتر التعليمية ليشعر أن التجربة التعليمية صُممت له خصيصًا.",
        primaryCta: "أنشئ نسخة طفلك",
        secondaryCta: "شاهد النماذج",
        f1: "رقمي وقابل للتلوين", f2: "قابل للطباعة", f3: "عربي وإنجليزي", f4: "مخصص باسم الطفل",
      },
      wpc: {
        title: "لماذا يختار الآباء والأمهات منتجات عالم مؤمن؟",
        c1: { t: "طفلك هو بطل القصة", d: "يظهر اسم طفلك داخل الصفحات ليشعر أن التجربة صُنعت له وحده." },
        c2: { t: "تعلم من خلال التفاعل", d: "يلون الطفل ويتفاعل مع المحتوى بطريقة ممتعة تساعده على التعلم والاستكشاف." },
        c3: { t: "قيم تبقى مع الطفل", d: "محتوى هادف يساعد على بناء السلوك الإيجابي والقيم الجميلة." },
        c4: { t: "كلمات تبقى في الذاكرة", d: "أضف رسالة خاصة من الوالدين أو المعلم داخل الدفتر." },
        c5: { t: "استخدمه كما تحب", d: "جاهز للاستخدام الرقمي أو للطباعة في أي وقت." },
        c6: { t: "دفاتر مجانية بالكامل", d: "جميع دفاتر عالم مؤمن متاحة مجاناً لتصل إلى أكبر عدد ممكن من الأطفال." },
      },
      why: {
        kicker: "لماذا عالم مؤمن",
        title: "لماذا يحب الآباء والأمهات عالم مؤمن؟",
        c1: { title: "تعلم مخصص", desc: "كل صفحة تخاطب طفلك باسمه." },
        c2: { title: "رقمي وقابل للطباعة", desc: "لوّن على الآيباد أو اطبع في المنزل كما تحب." },
        c3: { title: "عربي وإنجليزي", desc: "متاح باللغتين العربية والإنجليزية." },
        c4: { title: "قيم وتعاليم أصيلة", desc: "مستوحاة من القيم الإسلامية للأطفال." },
        c5: { title: "شهادة تقدير", desc: "يحصل طفلك على شهادة تقدير تحمل اسمه ويمكن لولي الأمر توقيعها." },
      },
      soon: {
        kicker: "قريبًا",
        title: "عالم متكامل من التعلّم",
        subtitle: "عالم مؤمن ليس مجرد دفاتر تلوين، بل منظومة تعليمية متنامية تساعد الأطفال على التعلّم والتفاعل واكتساب القيم بأسلوب بسيط وممتع.",
        badge: "قريبًا",
        i1: "الأخلاق الحسنة", i2: "برّ الوالدين", i3: "قصص الأنبياء", i4: "تعلّم الصلاة", i5: "أنشطة مدرسية", i6: "تعلّم اللغات",
      },
      cta: { title: "كل طفل يستحق تجربة صُممت باسمه.", subtitle: "أنشئ دفتره المخصص خلال ثوانٍ، وامنحه تجربة تعليمية أقرب إليه وأكثر متعة.", button: "أنشئ دفتره الخاص مجانًا" },
      support: {
        kicker: "ادعم عالم مؤمن",
        title: "ادعم مشروع عالم مؤمن",
        p1: "نعمل في عالم مؤمن على إنتاج دفاتر تعليمية وتربوية مخصصة بأسماء الأطفال، تساعدهم على التعلم بطريقة ممتعة وقريبة إلى قلوبهم.",
        p2: "إذا أعجبتك رسالتنا وترغب في دعم استمرار تطوير منتجات ومحتويات جديدة للأطفال، يمكنك تقديم مساهمة اختيارية لدعم المشروع.",
        p3: "كل مساهمة تساعدنا على إنتاج المزيد من المواد التعليمية والتربوية عالية الجودة.",
        btn: "ادعم مشروع عالم مؤمن",
        secure: "جميع المدفوعات تتم بشكل آمن عبر Stripe.",
        fab: "ادعم عالم مؤمن",
      },
      sp: {
        title: "ادعم عالم مؤمن",
        homeDesc: "ساهم في استمرار إنتاج دفاتر وأنشطة تعليمية قيمية مخصصة بأسماء الأطفال.",
        homeBtn: "الانتقال إلى صفحة الدعم",
        p1: "نعمل في عالم مؤمن على إنتاج دفاتر وأنشطة تعليمية قيمية مخصصة بأسماء الأطفال، تساعدهم على التعلم والتفاعل واكتساب القيم بأسلوب ممتع وقريب إلى قلوبهم.",
        p2: "كل مساهمة تساعدنا على تطوير محتوى جديد، وإطلاق دفاتر تعليمية إضافية، وتحسين التجربة التعليمية للأطفال في العالم العربي.",
        p3: "هذه المساهمة ليست شراءً لمنتج، بل دعم مباشر لاستمرار مشروع تعليمي يهدف إلى تقديم محتوى نافع وجذاب يترك أثرًا جميلًا وذكرى مميزة في حياة الطفل.",
        t1: "دعم آمن عبر Stripe",
        t2: "مساهمة اختيارية بالكامل",
        t3: "يساعد على تطوير محتوى جديد للأطفال",
        t4: "يدعم استمرارية المشروع",
        t5: "يساهم في إنتاج دفاتر وأنشطة مستقبلية",
        btn: "ادعم عالم مؤمن",
        whyTitle: "لماذا ندعم عالم مؤمن؟",
        why1: "لأن الطفل يتفاعل أكثر عندما يرى اسمه داخل التجربة التعليمية.",
        why2: "ولأن المحتوى القيمي الجيد يستحق أن يستمر ويتطور.",
        why3: "ولأن كل دفتر قد يتحول إلى ذكرى جميلة يحتفظ بها الطفل لسنوات.",
      },
      pub: {
        kicker: "دفتر مخصّص",
        breadcrumb: "إصداراتنا",
        title: "دفتر تلوين تعليمي",
        subtitle: "علّم طفلك أركان الإسلام الخمسة",
        description: "دفتر تلوين مخصص يعلم طفلك أركان الإسلام الخمسة بطريقة تفاعلية ممتعة، مع إدراج اسم طفلك داخل صفحات الدفتر.",
        price: "$1.99 فقط",
        priceUnit: "شامل جميع الرسوم",
        buy: "اشترِ دفتر طفلك المخصص",
        secure: "دفع آمن عبر Stripe",
        f1: "رقمي وقابل للتلوين مباشرة على الأجهزة اللوحية.",
        f2: "قابل للطباعة والتلوين الورقي.",
        f3: "متاح باللغتين العربية والإنجليزية.",
        f4: "مخصص باسم طفلك الذي ستضيفه بعد إتمام الدفع.",
        backHome: "العودة للرئيسية",
      },
      cat: {
        kicker: "إصداراتنا",
        title: "إصداراتنا",
        subtitle: "دفاتر تلوين تعليمية مخصصة باسم طفلك.",
        secure: "دفع آمن عبر Stripe",
        priceNote: "شامل جميع الرسوم",
        freeBadge: "متاح مجانًا",
        open: "عرض الدفتر",
        m3: { title: "رحلتي إلى المساجد الثلاثة", desc: "رحلة تلوين مخصصة عبر المساجد الثلاثة المقدسة — مخصص باسم طفلك.", age: "4–8 سنوات", price: "$2.99", cta: "أنشئ دفتر طفلك" },
        p: { title: "أنا أتعلم أركان الإسلام", desc: "تعرف على أركان الإسلام الخمسة بطريقة مبسطة وممتعة — مخصص باسم طفلك.", age: "3–6 سنوات", price: "$1.99", cta: "أنشئ دفتر طفلك" },
      },
      m3f: {
        title: "رحلتي إلى المساجد الثلاثة",
        subtitle: "خصص دفتر طفلك",
        desc: "اختر اللغة والجنس واسم طفلك، ثم حمّل الدفتر الذي تم إنشاؤه خصيصًا له.",
        language: "لغة الدفتر",
        ar: "عربي", en: "إنجليزي",
        gender: "لمن هذا الدفتر؟",
        firstName: "اسم الطفل الأول",
        fullName: "الاسم الكامل للطفل",
        fullNameNote: "يُستخدم الاسم الأول والأخير لتخصيص محتويات الدفتر، وشهادة التقدير، والرسائل المرفقة إن وجدت.",
        download: "حمّل دفتر طفلك",
        dedTitle: "إهداء خاص (اختياري)",
        dedHelp: "أضف رسالة إهداء من أحد أفراد العائلة أو المعلم لتظهر في نهاية الدفتر.",
        role: "صفة المُهدي", choose: "اختر...",
        senderName: "اسم المُهدي", message: "رسالة الإهداء", date: "التاريخ",
        r_father: "والد", r_mother: "والدة", r_brother: "أخ", r_sister: "أخت", r_teacher: "معلم", r_grandfather: "جد", r_grandmother: "جدة", r_other: "أخرى",
      },
      form: {
        thankyou: "خصص دفتر طفلك وحمّله الآن مجاناً.",
        freePill: "متاح مجانًا",
        title: "أنا أتعلم أركان الإسلام",
        subtitle: "خصص دفتر طفلك",
        description: "أخبرنا قليلاً عن طفلك، وسنُنشئ له دفترًا مخصصًا باسمه ليكون تجربة تعليمية ممتعة ومميزة.",
        gender: "لمن هذا الدفتر؟",
        boy: "ذكر",
        girl: "أنثى",
        firstNameHint: "يظهر في كامل الدفتر.",
        email: "البريد الإلكتروني",
        emailHint: "لإرسال نسخة وتأكيد الطلب.",
        emailErr: "يرجى إدخال بريد إلكتروني صحيح.",
        fullNameNote: "يُستخدم الاسم الأول والأخير لتخصيص محتويات الدفتر، وشهادة التقدير، والرسائل المرفقة إن وجدت.",
        language: "لغة الدفتر",
        langAr: "العربية",
        langEn: "English",
        download: "حمّل دفتر طفلك",
        feat1: "قابل للتلوين الرقمي",
        feat2: "قابل للطباعة",
        feat3: "يحتوي على شهادة تقدير رقمية",
        generating: "جارٍ إنشاء دفترك…",
        fillName: "الرجاء إدخال الاسم الأول للطفل.",
        doneTitle: "تم إعداد دفترك بنجاح",
        doneMsg: "شكراً لك. تم إنشاء الدفتر وتحميله بنجاح على جهازك. نأمل أن يستمتع طفلك بهذه التجربة التعليمية المخصصة.",
      },
      oc: {
        title: "تم تأكيد الدفع بنجاح",
        desc: "شكراً لك. تم استلام طلبك بنجاح ويجري الآن إنشاء دفتر طفلك المخصص.",
        step1: "تم تأكيد الدفع",
        step2: "جاري إنشاء الدفتر",
        step3: "سيتم تسليم الدفتر خلال لحظات",
        cta: "تابع لتخصيص دفترك",
      },
      msg: {
        title: "رسالة تذكارية للطفل (اختياري)",
        help: "إذا رغبت بإضافة رسالة تذكارية خاصة لطفلك أو طالبك داخل الدفتر، افتح هذا القسم وأكمل البيانات التالية.",
        senderType: "صفة المرسل",
        choose: "اختر...",
        father: "والد", mother: "والدة", brother: "أخ", sister: "أخت", teacherM: "معلم", teacherF: "معلمة", grandfather: "جد", grandmother: "جدة", uncleP: "عم", auntP: "عمة", uncleM: "خال", auntM: "خالة", other: "شخص آخر",
        senderName: "اسم صاحب الرسالة",
        date: "تاريخ الرسالة",
        message: "اكتب رسالتك",
      },
      footer: {
        desc: "عالم مؤمن مشروع تعليمي قيمي رقمي يقدّم دفاتر وأنشطة تعليمية مخصصة بأسماء الأطفال، ليجعل التعلّم أكثر قرباً ومتعة وارتباطاً بكل طفل.",
        navTitle: "روابط",
        contactTitle: "تواصل معنا",
        followTitle: "تابعنا",
        payments: "طرق دفع آمنة بواسطة Stripe",
        rights: "جميع الحقوق محفوظة.",
      },
    },
    en: {
      dir: "ltr",
      nav: { home: "Home", publications: "Our Publications", why: "Why Momin World", support: "Support Momin World", contact: "Contact Us", langLabel: "Language", menu: "Open menu", close: "Close menu" },
      hero: {
        badge: "Personalized values-based learning",
        headline: "A Personalized Learning Journey For Your Child",
        hadith: "المؤمن القوي خيرٌ وأحبُّ إلى الله من المؤمن الضعيف",
        hadithAttr: "The Messenger of Allah (peace be upon him) said",
        hadithMeaning: "The strong believer is better and more beloved to Allah than the weak believer.",
        mominTag: "(Momin)",
        description: "Your child's name appears throughout the educational workbook pages, so the learning experience feels created just for them.",
        primaryCta: "Create Your Child's Copy",
        secondaryCta: "View Samples",
        f1: "Digital Coloring", f2: "Printable", f3: "Arabic & English", f4: "Personalized With Child's Name",
      },
      wpc: {
        title: "Why Parents Choose Momin World",
        c1: { t: "Your Child Is the Hero", d: "Your child's name appears throughout, so the experience feels made just for them." },
        c2: { t: "Learn Through Interaction", d: "Children color and engage with the content in a fun way that supports learning and discovery." },
        c3: { t: "Values That Stay", d: "Meaningful content that helps build positive behavior and beautiful values." },
        c4: { t: "Words to Remember", d: "Add a special message from a parent or teacher inside the workbook." },
        c5: { t: "Use It Your Way", d: "Ready to use digitally or print anytime." },
        c6: { t: "Completely Free Workbooks", d: "All Momin World workbooks are available for free to reach as many children as possible." },
      },
      why: {
        kicker: "Why Momin World",
        title: "Why Parents Love Momin World",
        c1: { title: "Personalized Learning", desc: "Every page speaks directly to your child." },
        c2: { title: "Digital & Printable", desc: "Color digitally or print at home." },
        c3: { title: "Arabic & English", desc: "Available in both languages." },
        c4: { title: "Authentic Values", desc: "Built around timeless Islamic values." },
        c5: { title: "Achievement Certificate", desc: "Includes a personalized certificate with your child's name." },
      },
      soon: {
        kicker: "Coming Soon",
        title: "A Complete World of Learning",
        subtitle: "Momin World is more than coloring workbooks — it's a growing educational ecosystem that helps children learn, engage, and embrace values in a simple and enjoyable way.",
        badge: "Soon",
        i1: "Good Manners", i2: "Honoring Parents", i3: "Stories of the Prophets", i4: "Learning to Pray", i5: "School Activities", i6: "Learning Languages",
      },
      cta: { title: "Every child deserves an experience designed around their name.", subtitle: "Create their personalized workbook in seconds, and give them a learning experience that feels closer and more fun.", button: "Create Their Workbook for Free" },
      support: {
        kicker: "Support Momin World",
        title: "Support the Momin World Project",
        p1: "At Momin World, we create personalized educational workbooks with children's names that help them learn in a fun way that's close to their hearts.",
        p2: "If our mission resonates with you and you'd like to support the continued development of new products and content for children, you can make an optional contribution to support the project.",
        p3: "Every contribution helps us produce more high-quality educational and developmental materials.",
        btn: "Support the Momin World Project",
        secure: "All payments are processed securely via Stripe.",
        fab: "Support Momin World",
      },
      sp: {
        title: "Support Momin World",
        homeDesc: "Help us keep producing meaningful educational workbooks and activities personalized with children's names.",
        homeBtn: "Go to the support page",
        p1: "At Momin World, we create meaningful educational workbooks and activities personalized with children's names, helping them learn, engage, and embrace values in a fun way that's close to their hearts.",
        p2: "Every contribution helps us develop new content, release additional educational workbooks, and improve the learning experience for children across the Arab world.",
        p3: "This contribution is not a product purchase — it's direct support to keep an educational project going, one that aims to deliver useful, engaging content that leaves a beautiful mark and a special memory in a child's life.",
        t1: "Secure support via Stripe",
        t2: "Entirely optional contribution",
        t3: "Helps develop new content for children",
        t4: "Supports the project's continuity",
        t5: "Contributes to future workbooks and activities",
        btn: "Support Momin World",
        whyTitle: "Why support Momin World?",
        why1: "Because children engage more when they see their name inside the learning experience.",
        why2: "Because good, meaningful content deserves to continue and grow.",
        why3: "Because every workbook can become a beautiful memory a child keeps for years.",
      },
      pub: {
        kicker: "Personalized Workbook",
        breadcrumb: "Our Publications",
        title: "Educational Coloring Workbook",
        subtitle: "Teach Your Child the Five Pillars of Islam",
        description: "A personalized coloring workbook that helps your child learn the Five Pillars of Islam through a fun and interactive experience, with their name included throughout the workbook.",
        price: "Only $1.99",
        priceUnit: "All fees included",
        buy: "Get Your Child's Personalized Workbook",
        secure: "Secure payment via Stripe",
        f1: "Digital and ready for tablet coloring.",
        f2: "Printable for traditional paper coloring.",
        f3: "Available in Arabic and English.",
        f4: "Personalized with your child's name after purchase.",
        backHome: "Back to home",
      },
      cat: {
        kicker: "Our Publications",
        title: "Our Publications",
        subtitle: "Personalized educational coloring workbooks with your child's name.",
        secure: "Secure payment via Stripe",
        priceNote: "All fees included",
        freeBadge: "Available Free",
        open: "View Workbook",
        m3: { title: "My Journey to the Three Mosques", desc: "A personalized coloring journey through the three sacred mosques — personalized with your child's name.", age: "Ages 4–8", price: "$2.99", cta: "Create Your Child's Workbook" },
        p: { title: "I Learn the Pillars of Islam", desc: "Learn the Five Pillars of Islam through simple activities and coloring pages — personalized with your child's name.", age: "Ages 3–6", price: "$1.99", cta: "Create Your Child's Workbook" },
      },
      m3f: {
        title: "My Journey to the Three Mosques",
        subtitle: "Personalize your child's workbook",
        desc: "Choose the language, gender, and your child's name, then download the workbook made specially for them.",
        language: "Workbook language",
        ar: "Arabic", en: "English",
        gender: "Who is this workbook for?",
        firstName: "Child's first name",
        fullName: "Child's full name",
        fullNameNote: "The first and last name are used to personalize the workbook content, the certificate of achievement, and any attached messages.",
        download: "Download Your Child's Workbook",
        dedTitle: "Special Dedication (Optional)",
        dedHelp: "Add a dedication message from a family member or teacher to appear at the end of the workbook.",
        role: "Sender role", choose: "Choose...",
        senderName: "Sender name", message: "Dedication message", date: "Date",
        r_father: "Father", r_mother: "Mother", r_brother: "Brother", r_sister: "Sister", r_teacher: "Teacher", r_grandfather: "Grandfather", r_grandmother: "Grandmother", r_other: "Other",
      },
      form: {
        thankyou: "Personalize your child's workbook and download it now — free.",
        freePill: "Available Free",
        title: "I Learn the Pillars of Islam",
        subtitle: "Personalize Your Child's Workbook",
        description: "Tell us a little about your child, and we'll create a personalized workbook with their name — a fun and memorable learning experience.",
        gender: "Who is this workbook for?",
        boy: "Boy",
        girl: "Girl",
        firstNameHint: "Appears throughout the workbook.",
        email: "Email Address",
        emailHint: "To send a copy and confirm the request.",
        emailErr: "Please enter a valid email address.",
        fullNameNote: "The first and last name are used to personalize the workbook content, the certificate of achievement, and any attached messages.",
        language: "Workbook language",
        langAr: "العربية",
        langEn: "English",
        download: "Download Your Child's Workbook",
        feat1: "Digital Coloring Ready",
        feat2: "Printable",
        feat3: "Includes A Digital Certificate Of Achievement",
        generating: "Generating your workbook…",
        fillName: "Please enter your child's first name.",
        doneTitle: "Your workbook is ready",
        doneMsg: "Thank you. Your workbook has been created and downloaded to your device. We hope your child enjoys this personalized learning experience.",
      },
      oc: {
        title: "Payment Confirmed Successfully",
        desc: "Thank you. Your order has been received successfully and your personalized workbook is now being generated.",
        step1: "Payment Confirmed",
        step2: "Generating Workbook",
        step3: "Delivery Coming Shortly",
        cta: "Continue to Personalize",
      },
      msg: {
        title: "Keepsake Message for the Child (Optional)",
        help: "If you'd like to add a special keepsake message for your child or student inside the workbook, open this section and complete the fields below.",
        senderType: "Sender's relation",
        choose: "Choose...",
        father: "Father", mother: "Mother", brother: "Brother", sister: "Sister", teacherM: "Teacher (m)", teacherF: "Teacher (f)", grandfather: "Grandfather", grandmother: "Grandmother", uncleP: "Uncle (paternal)", auntP: "Aunt (paternal)", uncleM: "Uncle (maternal)", auntM: "Aunt (maternal)", other: "Other",
        senderName: "Message author's name",
        date: "Message date",
        message: "Write your message",
      },
      footer: {
        desc: "Momin World is a values-based digital educational project offering workbooks and learning activities personalized with children's names, to make learning closer, more enjoyable, and more connected to every child.",
        navTitle: "Links",
        contactTitle: "Contact Us",
        followTitle: "Follow Us",
        payments: "Secure Payments Powered by Stripe",
        rights: "All Rights Reserved.",
      },
    },
  };

  /* ---------- Helpers ---------- */
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return o && o[k] != null ? o[k] : null;
    }, obj);
  }

  var body = document.body;
  var htmlEl = document.documentElement;
  var currentLang = "ar";

  function applyLang(lang) {
    if (lang !== "ar" && lang !== "en") lang = "ar";
    var data = dict[lang];

    htmlEl.setAttribute("lang", lang);
    htmlEl.setAttribute("dir", data.dir);
    body.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = get(data, el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var val = get(data, el.getAttribute("data-i18n-aria"));
      if (val != null) el.setAttribute("aria-label", val);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var val = get(data, el.getAttribute("data-i18n-ph"));
      if (val != null) el.setAttribute("placeholder", val);
    });
    // Language-dependent image sources (e.g. marketing covers).
    document.querySelectorAll("[data-src-ar][data-src-en]").forEach(function (el) {
      var src = el.getAttribute(lang === "en" ? "data-src-en" : "data-src-ar");
      if (src) el.setAttribute("src", src);
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-set") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // Per-page <title> + meta description.
    // A page may override its title via data-title-ar / data-title-en on <body>.
    var page = body.getAttribute("data-page");
    var customTitle = body.getAttribute(lang === "en" ? "data-title-en" : "data-title-ar");
    var pageTitle = customTitle || (page && SEO.titles[page] ? SEO.titles[page][lang] : null);
    if (pageTitle) document.title = pageTitle;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", SEO.desc[lang]);
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt && pageTitle) ogt.setAttribute("content", pageTitle);
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", (SEO.ogDesc && SEO.ogDesc[lang]) || SEO.desc[lang]);

    updateHamburgerLabel();
    currentLang = lang;
    try { localStorage.setItem("momin-lang", lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent("momin:lang", { detail: { lang: lang } }));
  }

  /* ---------- Public mini i18n API (used by personalize.js) ---------- */
  window.Momin = {
    get lang() { return currentLang; },
    t: function (path) { return get(dict[currentLang] || dict.ar, path); },
    apply: function () { applyLang(currentLang); },
  };

  /* ---------- Language switch buttons ---------- */
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang-set")); });
  });

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobileMenu");
  var menuOpen = false;

  function updateHamburgerLabel() {
    if (!hamburger) return;
    var lang = body.getAttribute("data-lang") || "ar";
    hamburger.setAttribute("aria-label", menuOpen ? dict[lang].nav.close : dict[lang].nav.menu);
  }
  function setMenu(open) {
    menuOpen = open;
    if (mobileMenu) { if (open) mobileMenu.hidden = false; mobileMenu.classList.toggle("open", open); }
    if (hamburger) { hamburger.classList.toggle("open", open); hamburger.setAttribute("aria-expanded", open ? "true" : "false"); }
    body.style.overflow = open ? "hidden" : "";
    updateHamburgerLabel();
  }
  if (hamburger) hamburger.addEventListener("click", function () { setMenu(!menuOpen); });
  if (mobileMenu) mobileMenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Sticky navbar shadow ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Product image carousel (Publications page) ---------- */
  (function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;
    var imgs = Array.prototype.slice.call(root.querySelectorAll(".carousel-img"));
    var thumbs = Array.prototype.slice.call(root.querySelectorAll(".carousel-thumb"));
    var prev = root.querySelector(".carousel-prev");
    var next = root.querySelector(".carousel-next");
    var i = 0;
    function show(n) {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle("active", k === i); });
      thumbs.forEach(function (t, k) { t.classList.toggle("active", k === i); t.setAttribute("aria-current", k === i ? "true" : "false"); });
    }
    if (prev) prev.addEventListener("click", function () { show(i - 1); });
    if (next) next.addEventListener("click", function () { show(i + 1); });
    thumbs.forEach(function (t, k) { t.addEventListener("click", function () { show(k); }); });
    show(0);
  })();

  /* ---------- Subtle parallax for hero / decorative icons ----------
     Uses the CSS `translate` property so it composes with the floating
     `transform` animation. GPU-friendly, rAF-throttled, opt-out on
     prefers-reduced-motion. */
  (function initParallax() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    var els = Array.prototype.slice.call(document.querySelectorAll(".float, .cf"));
    if (!els.length) return;
    els.forEach(function (el, i) { el.dataset.par = (0.025 + (i % 4) * 0.018).toFixed(3); });
    var ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset || 0;
      els.forEach(function (el) {
        el.style.translate = "0 " + (y * parseFloat(el.dataset.par)).toFixed(1) + "px";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ---------- Animated hero headline (elegant word-by-word reveal) ----
     Re-runs after each language switch (applyLang resets the text). */
  function animateHeadline() {
    var h = document.querySelector(".hero-headline");
    if (!h) return;
    var text = (h.textContent || "").trim();
    if (!text) return;
    var words = text.split(/\s+/);
    h.innerHTML = "";
    words.forEach(function (w, i) {
      var s = document.createElement("span");
      s.className = "w";
      s.textContent = w;
      s.style.animationDelay = (0.12 + i * 0.11).toFixed(2) + "s";
      h.appendChild(s);
      if (i < words.length - 1) h.appendChild(document.createTextNode(" "));
    });
  }
  window.addEventListener("momin:lang", animateHeadline);

  /* ---------- Support project: link wiring + site-wide floating badge ----------
     Single source of truth for the Stripe support URL. The floating badge is
     injected on every page; its text is translated by applyLang via data-i18n. */
  var SUPPORT_URL = "https://buy.stripe.com/6oU28s5zE5Bm3joeEq9fW0a";
  function setupSupport() {
    // Point every support link at the configured Stripe URL. (The floating
    // side button was removed — support lives in the nav, homepage section,
    // and the dedicated support page.)
    document.querySelectorAll("[data-support-link]").forEach(function (a) {
      a.setAttribute("href", SUPPORT_URL);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }
  setupSupport();

  /* ---------- Social strip inside the mobile menu only (mobile view) ---------- */
  function setupNavSocial() {
    // Lives inside the mobile menu panel, so it only appears when the menu is
    // opened on mobile. Desktop navbar shows no social icons.
    var panel = document.querySelector("#mobileMenu .mobile-panel");
    if (!panel || panel.querySelector(".nav-social")) return;
    var SOCIAL = [
      { label: "LinkedIn", url: "https://linkedin.com/company/TheMominWorld", svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.5h3.5V21H3.2V8.5Zm5.6 0h3.35v1.7h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.18 2.2 4.18 5.1V21h-3.5v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.97V21H8.8V8.5Z"/></svg>' },
      { label: "X", url: "https://x.com/TheMominWorld", svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.2 21H1l7.5-8.6L.6 3H7l4.5 6 6-6Zm-1.1 16h1.8L7.7 4.8H5.8L16.4 19Z"/></svg>' },
      { label: "Instagram", url: "https://instagram.com/TheMominWorld", svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg>' },
      { label: "Facebook", url: "https://facebook.com/TheMominWorld", svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>' },
    ];
    var bar = document.createElement("div");
    bar.className = "nav-social";
    SOCIAL.forEach(function (s) {
      var a = document.createElement("a");
      a.setAttribute("href", s.url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      a.setAttribute("aria-label", s.label);
      a.innerHTML = s.svg;
      bar.appendChild(a);
    });
    panel.appendChild(bar);
  }
  setupNavSocial();

  /* ---------- Hero features marquee: true seamless infinite loop ----------
     Duplicate-content technique: build a "unit" from the 4 base features,
     repeat it until it is wider than the viewport, then render unit+unit and
     animate translateX(0 -> -50%). The two halves are identical, so the loop
     is perfectly seamless (no gap / jump / flash) in both RTL and LTR, on any
     screen width. Speed is normalized to a constant slow px/sec. */
  (function () {
    var m = document.getElementById("trustMarquee");
    if (!m) return;
    var track = m.querySelector(".trust-track");
    function build() {
      if (!track) return;
      var items = track.querySelectorAll(".trust-item");
      if (!items.length) return;
      var base = "";
      for (var i = 0; i < items.length && i < 4; i++) base += items[i].outerHTML;
      var unit = base;
      track.style.animationDuration = "";
      track.innerHTML = unit;
      var need = (m.clientWidth || window.innerWidth || 0) + 80, guard = 0;
      while (track.scrollWidth < need && guard < 40) { unit += base; track.innerHTML = unit; guard++; }
      track.innerHTML = unit + unit;
      // Constant gentle speed (~55px/sec) regardless of how wide the track is.
      var dur = (track.scrollWidth / 2) / 55;
      track.style.animationDuration = Math.max(22, dur).toFixed(1) + "s";
    }
    build();
    window.addEventListener("load", build);
    window.addEventListener("momin:lang", build);
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(build, 200); }, { passive: true });
    // Pause on hover is CSS; pause on touch here.
    var pause = function () { m.classList.add("is-paused"); };
    var resume = function () { m.classList.remove("is-paused"); };
    m.addEventListener("touchstart", pause, { passive: true });
    m.addEventListener("touchend", resume, { passive: true });
    m.addEventListener("touchcancel", resume, { passive: true });
  })();

  /* ---------- Init (respect saved preference, default Arabic) ---------- */
  var saved = "ar";
  try { saved = localStorage.getItem("momin-lang") || "ar"; } catch (e) {}
  applyLang(saved); // fires momin:lang -> animateHeadline()
})();
