const fs = require('fs');

const path = 'd:/Project/Project 03/src/i18n.ts';
let code = fs.readFileSync(path, 'utf8');

const additions = {
  en: {
    challenge_none: "None",
    challenge_sharing: "Sharing Toys",
    challenge_fear: "Fear of the Dark",
    challenge_moving: "Moving to a New School",
    challenge_sibling: "Sibling Friction",
    challenge_other: "Others",
    challenge_other_placeholder: "Type your challenge (max 100 chars)...",
    error_challenge_invalid: "Please type a clear challenge (at least 3 characters) that makes sense."
  },
  hi: {
    challenge_none: "कोई नहीं",
    challenge_sharing: "खिलौने साझा करना",
    challenge_fear: "अंधेरे का डर",
    challenge_moving: "नए स्कूल में जाना",
    challenge_sibling: "भाई-बहनों में मनमुटाव",
    challenge_other: "अन्य",
    challenge_other_placeholder: "अपनी चुनौती टाइप करें (अधिकतम 100 वर्ण)...",
    error_challenge_invalid: "कृपया एक स्पष्ट चुनौती टाइप करें (कम से कम 3 वर्ण)।"
  },
  bn: {
    challenge_none: "কোনোটিই নয়",
    challenge_sharing: "খেলনা ভাগ করে নেওয়া",
    challenge_fear: "অন্ধকারের ভয়",
    challenge_moving: "নতুন স্কুলে যাওয়া",
    challenge_sibling: "ভাইবোনের মধ্যে মন কষাকষি",
    challenge_other: "অন্যান্য",
    challenge_other_placeholder: "আপনার চ্যালেঞ্জ টাইপ করুন (সর্বোচ্চ ১০০ অক্ষর)...",
    error_challenge_invalid: "অনুগ্রহ করে একটি পরিষ্কার চ্যালেঞ্জ টাইপ করুন (অন্তত ৩ অক্ষর)।"
  },
  te: {
    challenge_none: "ఏదీ లేదు",
    challenge_sharing: "బొమ్మలు పంచుకోవడం",
    challenge_fear: "చీకటి భయం",
    challenge_moving: "కొత్త పాఠశాలకు వెళ్లడం",
    challenge_sibling: "తోబుట్టువుల మధ్య ఘర్షణ",
    challenge_other: "ఇతర",
    challenge_other_placeholder: "మీ సవాలును టైప్ చేయండి (గరిష్టంగా 100 అక్షరాలు)...",
    error_challenge_invalid: "దయచేసి స్పష్టమైన సవాలును టైప్ చేయండి (కనీసం 3 అక్షరాలు)."
  },
  mr: {
    challenge_none: "काहीही नाही",
    challenge_sharing: "खेळणी सामायिक करणे",
    challenge_fear: "अंधाराची भीती",
    challenge_moving: "नवीन शाळेत जाणे",
    challenge_sibling: "भावंडांमधील वाद",
    challenge_other: "इतर",
    challenge_other_placeholder: "तुमचे आव्हान टाईप करा (कमाल १०० अक्षरे)...",
    error_challenge_invalid: "कृपया स्पष्ट आव्हान टाईप करा (किमान ३ अक्षरे)."
  },
  ta: {
    challenge_none: "எதுவுமில்லை",
    challenge_sharing: "பொம்மைகளைப் பகிர்ந்துகொள்ளுதல்",
    challenge_fear: "இருட்டு பயம்",
    challenge_moving: "புதிய பள்ளிக்கு மாறுதல்",
    challenge_sibling: "உடன்பிறப்புகளுக்கு இடையிலான சண்டை",
    challenge_other: "மற்றவை",
    challenge_other_placeholder: "உங்கள் சவாலைத் தட்டச்சு செய்யவும் (அதிகபட்சம் 100 எழுத்துகள்)...",
    error_challenge_invalid: "தெளிவான சவாலைத் தட்டச்சு செய்யவும் (குறைந்தது 3 எழுத்துகள்)."
  },
  gu: {
    challenge_none: "કોઈ નહિ",
    challenge_sharing: "રમકડાં વહેંચવા",
    challenge_fear: "અંધારાનો ડર",
    challenge_moving: "નવી શાળામાં જવું",
    challenge_sibling: "ભાઈ-બહેન વચ્ચે મતભેદ",
    challenge_other: "અન્ય",
    challenge_other_placeholder: "તમારો પડકાર લખો (મહત્તમ 100 અક્ષરો)...",
    error_challenge_invalid: "કૃપા કરીને સ્પષ્ટ પડકાર લખો (ઓછામાં ઓછા 3 અક્ષરો)."
  },
  ur: {
    challenge_none: "کوئی نہیں",
    challenge_sharing: "کھلونے بانٹنا",
    challenge_fear: "اندھیرے کا ڈر",
    challenge_moving: "نئے اسکول جانا",
    challenge_sibling: "بہن بھائی کا جھگڑا",
    challenge_other: "دیگر",
    challenge_other_placeholder: "اپنا چیلنج ٹائپ کریں (زیادہ سے زیادہ 100 حروف)...",
    error_challenge_invalid: "براہ کرم واضح چیلنج ٹائپ کریں (کم از کم 3 حروف)۔"
  },
  kn: {
    challenge_none: "ಯಾವುದೂ ಇಲ್ಲ",
    challenge_sharing: "ಆಟಿಕೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದು",
    challenge_fear: "ಕತ್ತಲಿನ ಭಯ",
    challenge_moving: "ಹೊಸ ಶಾಲೆಗೆ ಹೋಗುವುದು",
    challenge_sibling: "ಒಡಹುಟ್ಟಿದವರ ಘರ್ಷಣೆ",
    challenge_other: "ಇತರೆ",
    challenge_other_placeholder: "ನಿಮ್ಮ ಸವಾಲನ್ನು ಟೈಪ್ ಮಾಡಿ (ಗರಿಷ್ಠ 100 ಅಕ್ಷರಗಳು)...",
    error_challenge_invalid: "ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾದ ಸವಾಲನ್ನು ಟೈಪ್ ಮಾಡಿ (ಕನಿಷ್ಠ 3 ಅಕ್ಷರಗಳು)."
  },
  or: {
    challenge_none: "କିଛି ନୁହେଁ",
    challenge_sharing: "ଖେଳଣା ବାଣ୍ଟିବା",
    challenge_fear: "ଅନ୍ଧାର ଭୟ",
    challenge_moving: "ନୂଆ ସ୍କୁଲକୁ ଯିବା",
    challenge_sibling: "ଭାଇ-ଭଉଣୀ ଝଗଡ଼ା",
    challenge_other: "ଅନ୍ୟାନ୍ୟ",
    challenge_other_placeholder: "ଆପଣଙ୍କ ଆହ୍ୱାନ ଟାଇପ୍ କରନ୍ତୁ (ସର୍ବାଧିକ ୧୦୦ ଅକ୍ଷର)...",
    error_challenge_invalid: "ଦୟାକରି ଏକ ସ୍ପଷ୍ଟ ଆହ୍ୱାନ ଟାଇପ୍ କରନ୍ତୁ (କମସେକମ୍ ୩ ଅକ୍ଷର)।"
  },
  ml: {
    challenge_none: "ഒന്നുമില്ല",
    challenge_sharing: "കളിപ്പാട്ടങ്ങൾ പങ്കിടൽ",
    challenge_fear: "ഇരുട്ടിനെ പേടി",
    challenge_moving: "പുതിയ സ്കൂളിലേക്ക് മാറുന്നു",
    challenge_sibling: "സഹോദരങ്ങൾ തമ്മിലുള്ള വഴക്ക്",
    challenge_other: "മറ്റുള്ളവ",
    challenge_other_placeholder: "നിങ്ങളുടെ വെല്ലുവിളി ടൈപ്പ് ചെയ്യുക (പരമാവധി 100 അക്ഷരങ്ങൾ)...",
    error_challenge_invalid: "വ്യക്തമായ വെല്ലുവിളി ടൈപ്പ് ചെയ്യുക (കുറഞ്ഞത് 3 അക്ഷരങ്ങൾ)."
  },
  pa: {
    challenge_none: "ਕੋਈ ਨਹੀਂ",
    challenge_sharing: "ਖਿਡੌਣੇ ਸਾਂਝੇ ਕਰਨਾ",
    challenge_fear: "ਹਨੇਰੇ ਦਾ ਡਰ",
    challenge_moving: "ਨਵੇਂ ਸਕੂਲ ਜਾਣਾ",
    challenge_sibling: "ਭੈਣ-ਭਰਾ ਦਾ ਝਗੜਾ",
    challenge_other: "ਹੋਰ",
    challenge_other_placeholder: "ਆਪਣੀ ਚੁਣੌਤੀ ਟਾਈਪ ਕਰੋ (ਵੱਧ ਤੋਂ ਵੱਧ 100 ਅੱਖਰ)...",
    error_challenge_invalid: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਪਸ਼ਟ ਚੁਣੌਤੀ ਟਾਈਪ ਕਰੋ (ਘੱਟੋ-ਘੱਟ 3 ਅੱਖਰ)।"
  },
  as: {
    challenge_none: "একো নাই",
    challenge_sharing: "খেলনা ভাগ কৰা",
    challenge_fear: "অন্ধকাৰলৈ ভয়",
    challenge_moving: "নতুন বিদ্যালয়লৈ যোৱা",
    challenge_sibling: "ভাই-ভনীৰ মাজত সংঘাত",
    challenge_other: "অন্যান্য",
    challenge_other_placeholder: "আপোনাৰ প্ৰত্যাহ্বান টাইপ কৰক (সৰ্বাধিক ১০০ আখৰ)...",
    error_challenge_invalid: "অনুগ্ৰহ কৰি স্পষ্ট প্ৰত্যাহ্বান টাইপ কৰক (কমেও ৩ আখৰ)।"
  }
};

for (const lang in additions) {
  const replacement = Object.entries(additions[lang]).map(([k, v]) => `    ${k}: "${v}"`).join(',\n') + '\n  },';
  
  const regex = new RegExp(`(${lang}: \\{[^}]+)(\n  \\},)`, 'g');
  code = code.replace(regex, `$1,\n${replacement}`);
}

fs.writeFileSync(path, code);
console.log('Updated i18n.ts');
