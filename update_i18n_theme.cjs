const fs = require('fs');

const path = 'd:/Project/Project 03/src/i18n.ts';
let code = fs.readFileSync(path, 'utf8');

const additions = {
  en: {
    theme_none: "None",
    theme_kindness: "Kindness",
    theme_bravery: "Bravery",
    theme_sharing: "Sharing",
    theme_honesty: "Honesty",
    theme_other: "Others",
    theme_other_placeholder: "Type your theme (max 100 chars)...",
    error_theme_invalid: "Please type a clear theme (at least 3 characters) that makes sense."
  },
  hi: {
    theme_none: "कोई नहीं",
    theme_kindness: "दयालुता",
    theme_bravery: "बहादुरी",
    theme_sharing: "साझा करना",
    theme_honesty: "ईमानदारी",
    theme_other: "अन्य",
    theme_other_placeholder: "अपनी थीम टाइप करें (अधिकतम 100 वर्ण)...",
    error_theme_invalid: "कृपया एक स्पष्ट थीम टाइप करें (कम से कम 3 वर्ण)।"
  },
  bn: {
    theme_none: "কোনোটিই নয়",
    theme_kindness: "দয়া",
    theme_bravery: "সাহসিকতা",
    theme_sharing: "ভাগ করে নেওয়া",
    theme_honesty: "সততা",
    theme_other: "অন্যান্য",
    theme_other_placeholder: "আপনার থিম টাইপ করুন (সর্বোচ্চ ১০০ অক্ষর)...",
    error_theme_invalid: "অনুগ্রহ করে একটি পরিষ্কার থিম টাইপ করুন (অন্তত ৩ অক্ষর)।"
  },
  te: {
    theme_none: "ఏదీ లేదు",
    theme_kindness: "దయ",
    theme_bravery: "ధైర్యం",
    theme_sharing: "పంచుకోవడం",
    theme_honesty: "నిజాయితీ",
    theme_other: "ఇతర",
    theme_other_placeholder: "మీ థీమ్‌ను టైప్ చేయండి (గరిష్టంగా 100 అక్షరాలు)...",
    error_theme_invalid: "దయచేసి స్పష్టమైన థీమ్‌ను టైప్ చేయండి (కనీసం 3 అక్షరాలు)."
  },
  mr: {
    theme_none: "काहीही नाही",
    theme_kindness: "दयाळूपणा",
    theme_bravery: "शौर्य",
    theme_sharing: "सामायिक करणे",
    theme_honesty: "प्रामाणिकपणा",
    theme_other: "इतर",
    theme_other_placeholder: "तुमची थीम टाईप करा (कमाल १०० अक्षरे)...",
    error_theme_invalid: "कृपया स्पष्ट थीम टाईप करा (किमान ३ अक्षरे)."
  },
  ta: {
    theme_none: "எதுவுமில்லை",
    theme_kindness: "கருணை",
    theme_bravery: "தைரியம்",
    theme_sharing: "பகிர்ந்துகொள்ளுதல்",
    theme_honesty: "நேர்மை",
    theme_other: "மற்றவை",
    theme_other_placeholder: "உங்கள் கருப்பொருளைத் தட்டச்சு செய்யவும் (அதிகபட்சம் 100 எழுத்துகள்)...",
    error_theme_invalid: "தெளிவான கருப்பொருளைத் தட்டச்சு செய்யவும் (குறைந்தது 3 எழுத்துகள்)."
  },
  gu: {
    theme_none: "કોઈ નહિ",
    theme_kindness: "દયા",
    theme_bravery: "બહાદુરી",
    theme_sharing: "વહેંચણી",
    theme_honesty: "પ્રામાણિકતા",
    theme_other: "અન્ય",
    theme_other_placeholder: "તમારી થીમ લખો (મહત્તમ 100 અક્ષરો)...",
    error_theme_invalid: "કૃપા કરીને સ્પષ્ટ થીમ લખો (ઓછામાં ઓછા 3 અક્ષરો)."
  },
  ur: {
    theme_none: "کوئی نہیں",
    theme_kindness: "مہربانی",
    theme_bravery: "بہادری",
    theme_sharing: "بانٹنا",
    theme_honesty: "ایمانداری",
    theme_other: "دیگر",
    theme_other_placeholder: "اپنی تھیم ٹائپ کریں (زیادہ سے زیادہ 100 حروف)...",
    error_theme_invalid: "براہ کرم واضح تھیم ٹائپ کریں (کم از کم 3 حروف)۔"
  },
  kn: {
    theme_none: "ಯಾವುದೂ ಇಲ್ಲ",
    theme_kindness: "ದಯೆ",
    theme_bravery: "ಶೌರ್ಯ",
    theme_sharing: "ಹಂಚಿಕೊಳ್ಳುವುದು",
    theme_honesty: "ಪ್ರಾಮಾಣಿಕತೆ",
    theme_other: "ಇತರೆ",
    theme_other_placeholder: "ನಿಮ್ಮ ಥೀಮ್ ಟೈಪ್ ಮಾಡಿ (ಗರಿಷ್ಠ 100 ಅಕ್ಷರಗಳು)...",
    error_theme_invalid: "ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾದ ಥೀಮ್ ಟೈಪ್ ಮಾಡಿ (ಕನಿಷ್ಠ 3 ಅಕ್ಷರಗಳು)."
  },
  or: {
    theme_none: "କିଛି ନୁହେଁ",
    theme_kindness: "ଦୟା",
    theme_bravery: "ସାହସ",
    theme_sharing: "ବାଣ୍ଟିବା",
    theme_honesty: "ସଚ୍ଚୋଟତା",
    theme_other: "ଅନ୍ୟାନ୍ୟ",
    theme_other_placeholder: "ଆପଣଙ୍କ ଥିମ୍ ଟାଇପ୍ କରନ୍ତୁ (ସର୍ବାଧିକ ୧୦୦ ଅକ୍ଷର)...",
    error_theme_invalid: "ଦୟାକରି ଏକ ସ୍ପଷ୍ଟ ଥିମ୍ ଟାଇପ୍ କରନ୍ତୁ (କମସେକମ୍ ୩ ଅକ୍ଷର)।"
  },
  ml: {
    theme_none: "ഒന്നുമില്ല",
    theme_kindness: "ദയ",
    theme_bravery: "ധീരത",
    theme_sharing: "പങ്കിടൽ",
    theme_honesty: "സത്യസന്ധത",
    theme_other: "മറ്റുള്ളവ",
    theme_other_placeholder: "നിങ്ങളുടെ തീം ടൈപ്പ് ചെയ്യുക (പരമാവധി 100 അക്ഷരങ്ങൾ)...",
    error_theme_invalid: "വ്യക്തമായ തീം ടൈപ്പ് ചെയ്യുക (കുറഞ്ഞത് 3 അക്ഷരങ്ങൾ)."
  },
  pa: {
    theme_none: "ਕੋਈ ਨਹੀਂ",
    theme_kindness: "ਦਿਆਲਤਾ",
    theme_bravery: "ਬਹਾਦਰੀ",
    theme_sharing: "ਸਾਂਝਾ ਕਰਨਾ",
    theme_honesty: "ਇਮਾਨਦਾਰੀ",
    theme_other: "ਹੋਰ",
    theme_other_placeholder: "ਆਪਣੀ ਥੀਮ ਟਾਈਪ ਕਰੋ (ਵੱਧ ਤੋਂ ਵੱਧ 100 ਅੱਖਰ)...",
    error_theme_invalid: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਪਸ਼ਟ ਥੀਮ ਟਾਈਪ ਕਰੋ (ਘੱਟੋ-ਘੱਟ 3 ਅੱਖਰ)।"
  },
  as: {
    theme_none: "একো নাই",
    theme_kindness: "দয়া",
    theme_bravery: "সাহস",
    theme_sharing: "ভাগ কৰা",
    theme_honesty: "সততা",
    theme_other: "অন্যান্য",
    theme_other_placeholder: "আপোনাৰ থিম টাইপ কৰক (সৰ্বাধিক ১০০ আখৰ)...",
    error_theme_invalid: "অনুগ্ৰহ কৰি স্পষ্ট থিম টাইপ কৰক (কমেও ৩ আখৰ)।"
  }
};

for (const lang in additions) {
  const replacement = Object.entries(additions[lang]).map(([k, v]) => `    ${k}: "${v}"`).join(',\n') + '\n  },';
  const regex = new RegExp(`(${lang}: \\{[^}]+)(\n  \\},)`, 'g');
  code = code.replace(regex, `$1,\n${replacement}`);
}

fs.writeFileSync(path, code);
console.log('Updated i18n.ts with theme translations');
