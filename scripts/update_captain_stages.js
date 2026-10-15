const fs = require('fs');
const path = require('path');

const ccPath = path.join(__dirname, '..', 'public', 'data', 'games', 'captain-commando', 'data.json');
const cc = JSON.parse(fs.readFileSync(ccPath, 'utf8'));

cc.sections.stages = {
  title: "مراحل وجولات المجرة (9 مراحل)",
  icon: "🚀",
  color: "#27ae60",
  image: "images/captain-commando/stage-city.png",
  intro: "تسع مراحل فضائية ومستقبلية كاملة تبدأ من شوارع ميترو سيتي عام 2026 وتصل إلى قمة كوكب كاليستو الجليدي.",
  items: [
    {
      id: "stage1",
      name: "المرحلة 1: شوارع ميترو سيتي 2026 (City Stage)",
      nameEn: "Stage 1: City & Bank",
      icon: "🏙️",
      tag: "شوارع المستقبل والبنك الوطني",
      summary: "شوارع متطورة بسيارات طائرة ومصارف بنكية يتم السطو عليها، وتنتهي بمواجهة العملاق دولغ.",
      description: "البداية الكلاسيكية في شوارع ميترو سيتي المستقبلية، حيث يركب الأبطال الروبوتات للمرة الأولى ويطهرون البنك من اللصوص.",
      image: "images/captain-commando/stage-city.png",
      fields: {
        "الموقع": "ميترو سيتي، الأرض (عام 2026)",
        "الزعيم": "دولغ (Dolgh)"
      }
    },
    {
      id: "stage2",
      name: "المرحلة 2: المتحف التاريخي (Museum)",
      nameEn: "Stage 2: Museum",
      icon: "🏛️",
      tag: "هياكل الديناصورات والتاريخ",
      summary: "متحف أثري تعرض فيه هياكل الديناصورات العظمية وفخاخ الرماح ومواجهة نينجا الساموراي كوجيرو وماردس.",
      description: "مرحلة فريدة تدور بين معروضات التاريخ القديم والتماثيل، وتنتهي بمواجهة ثنائية ضد حراس النينجا.",
      image: "images/captain-commando/stage-museum.png",
      fields: {
        "الزعماء": "كوجيرو وماردس (Kojiro & Mardes)"
      }
    },
    {
      id: "stage3",
      name: "المرحلة 3: بيت النينجا السري (Ninja House)",
      nameEn: "Stage 3: Ninja House",
      icon: "🏯",
      tag: "حصن النينجوتسو السري",
      summary: "منزل نينجا تقليدي غامض مليء بالأبواب السرية والفخاخ الحجرية ومواجهة النينجا العملاق ياماتو برمح ناداشي.",
      description: "مرحلة شرقية مليئة بالفخاخ والأسوار الخشبية وشاشات المراقبة السرية، وتنتهي بمواجهة قائد النينجا ياماتو.",
      image: "images/captain-commando/stage-ninjahouse.png",
      fields: {
        "الزعيم": "ياماتو (Yamato)"
      }
    },
    {
      id: "stage4",
      name: "المرحلة 4: مخيم السيرك (Circus Camp)",
      nameEn: "Stage 4: Circus Camp",
      icon: "🎪",
      tag: "خيمة السيرك والألعاب النارية",
      summary: "مخيم سيرك ومهرجون متوحشون وألعاب نارية، وتنتهي بمواجهة الوحش الهائج المحقون جينياً مونستر.",
      description: "أجواء كرنفالية مشبوهة مليئة بالنيران والمدافع والمهرجين المتحولين، ومواجهة الوحش الهائل فرانكنشتاين (Monster).",
      image: "images/captain-commando/stage-circus.png",
      fields: {
        "الزعيم": "مونستر (Monster)"
      }
    },
    {
      id: "stage5",
      name: "المرحلة 5: الميناء البحري (Sea Port)",
      nameEn: "Stage 5: Sea Port",
      icon: "🚢",
      tag: "الرصيف البحري والسفينة المائية",
      summary: "قتال على رصيف الميناء وركوب الزوارق السريعة والمواجهة ضد الدكتور المجنون ت. دبليو.",
      description: "مرحلة مائية وسريعة تتضمن القتال على ألواح التزلج المائية والمراكب السريعة حتى مواجهة دكتور T.W في آلته.",
      image: "images/captain-commando/stage-seaport.png",
      fields: {
        "الزعيم": "دكتور تي. دبليو (Dr. T.W.)"
      }
    },
    {
      id: "stage6",
      name: "المرحلة 6: الأكواريوم المائي العملاق (Aquarium)",
      nameEn: "Stage 6: Aquarium",
      icon: "🐠",
      tag: "أنفاق تحت المحيط وأسماك القرش",
      summary: "أنفاق زجاجية تحت مياه المحيط محاطة بأسماك القرش، ومواجهة الأخوين شتروم جونيور ودروك.",
      description: "بيئة مائية خلابة داخل أنفاق زجاجية شفافة، تنتهي بمواجهة ثنائية شرسة ضد رماة السهام المتفجرة شتروم ودروك.",
      image: "images/captain-commando/stage-aquarium.png",
      fields: {
        "الزعماء": "شتروم جونيور ودروك (Shtrom Jr. & Druk)"
      }
    },
    {
      id: "stage7",
      name: "المرحلة 7: القاعدة الجوفية العسكرية (Underground Base)",
      nameEn: "Stage 7: Underground Base",
      icon: "🏭",
      tag: "مختبر التجارب السرية",
      summary: "قاعدة محصنة تحت الأرض مع أشعة ليزر ودفاعات آلية ومواجهة الجندي المعدل جينياً بلود.",
      description: "مجمع تجارب سري لإنتاج المتحولين، مليء بأشعة الليزر وفخاخ الصعق، والمواجهة ضد أسرع مقاتل في العصابة بلود.",
      image: "images/captain-commando/stage-underground.png",
      fields: {
        "الزعيم": "بلود (Blood)"
      }
    },
    {
      id: "stage8",
      name: "المرحلة 8: سفينة الفضاء الحربية (Enemy's Spaceship)",
      nameEn: "Stage 8: Enemy's Spaceship",
      icon: "🛸",
      tag: "القتال في مدار الفضاء الخارجي",
      summary: "اقتحام السفينة الحربية المتجهة نحو كاليستو، ومواجهة الكائن الهلامي الناسخ دوبل.",
      description: "معركة في الفضاء الخارجي داخل ممرات السفينة الحربية، حيث يواجه اللاعبون الكائن الناسخ دوبل الذي يستنسخ حركاتهم.",
      image: "images/captain-commando/stage-spaceship.png",
      fields: {
        "الزعيم": "دوبل الناسخ (Doppel)"
      }
    },
    {
      id: "stage9",
      name: "المرحلة 9: كوكب كاليستو الجليدي (Planet Callisto)",
      nameEn: "Stage 9: Callisto",
      icon: "❄️",
      tag: "المعركة النهائية في المجرة",
      summary: "سطح كوكب كاليستو الجليدي المتجمد، والمواجهة المصيرية الكبرى ضد إمبراطور الشر سكاموسايد.",
      description: "أقسى وأعظم مراحل اللعبة، حيث تتقاتل تحت سماء الفضاء المرصعة بالنجوم فوق الجليد الأزرق حتى القضاء على سكاموسايد نهائياً وإنقاذ كوكب الأرض.",
      image: "images/captain-commando/stage-callisto.png",
      fields: {
        "الموقع": "كوكب كاليستو الفضائي",
        "الزعيم النهائي": "سكاموسايد (Scumocide)"
      }
    }
  ]
};

fs.writeFileSync(ccPath, JSON.stringify(cc, null, 2), 'utf8');
console.log('Successfully updated Captain Commando stages to use all 9 exact stage maps!');
