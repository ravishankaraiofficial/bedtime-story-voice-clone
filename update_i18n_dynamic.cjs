const fs = require('fs');

const path = 'd:/Project/Project 03/src/i18n.ts';
let code = fs.readFileSync(path, 'utf8');

const additions = {
  en: {
    dynamic_prefix: "Speak in your native language — The story will be told in ",
    dynamic_suffix: ". If you want the output in a different language, please change your selection from the top menu."
  },
  hi: {
    dynamic_prefix: "अपनी मातृभाषा में बोलें — कहानी ",
    dynamic_suffix: " में सुनाई जाएगी। यदि आप किसी अन्य भाषा में आउटपुट चाहते हैं, तो कृपया शीर्ष मेनू से अपना चयन बदलें।"
  },
  bn: {
    dynamic_prefix: "আপনার মাতৃভাষায় কথা বলুন — গল্পটি ",
    dynamic_suffix: " এ শোনানো হবে। আপনি যদি অন্য ভাষায় আউটপুট চান, তাহলে অনুগ্রহ করে শীর্ষ মেনু থেকে আপনার নির্বাচন পরিবর্তন করুন।"
  },
  te: {
    dynamic_prefix: "మీ మాతృభాషలో మాట్లాడండి — కథ ",
    dynamic_suffix: " లో చెప్పబడుతుంది. మీరు వేరే భాషలో అవుట్‌పుట్ కావాలనుకుంటే, దయచేసి టాప్ మెనూ నుండి మీ ఎంపికను మార్చుకోండి."
  },
  mr: {
    dynamic_prefix: "तुमच्या मातृभाषेत बोला — कथा ",
    dynamic_suffix: " मध्ये सांगितली जाईल. तुम्हाला दुसऱ्या भाषेत आउटपुट हवे असल्यास, कृपया शीर्ष मेनूमधून तुमची निवड बदला."
  },
  ta: {
    dynamic_prefix: "உங்கள் தாய்மொழியில் பேசுங்கள் — கதை ",
    dynamic_suffix: " மொழியில் சொல்லப்படும். வேறு மொழியில் வெளியீடு வேண்டுமானால், மேல் மெனுவிலிருந்து உங்கள் தேர்வை மாற்றவும்."
  },
  gu: {
    dynamic_prefix: "તમારી માતૃભાષામાં બોલો — વાર્તા ",
    dynamic_suffix: " માં કહેવામાં આવશે. જો તમે અન્ય ભાષામાં આઉટપુટ ઇચ્છતા હોવ, તો કૃપા કરીને ટોચના મેનૂમાંથી તમારી પસંદગી બદલો."
  },
  ur: {
    dynamic_prefix: "اپنی مادری زبان میں بولیں — کہانی ",
    dynamic_suffix: " میں سنائی جائے گی۔ اگر آپ کسی دوسری زبان میں آؤٹ پٹ چاہتے ہیں، تو براہ کرم ٹاپ مینو سے اپنا انتخاب تبدیل کریں۔"
  },
  kn: {
    dynamic_prefix: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ — ಕಥೆಯನ್ನು ",
    dynamic_suffix: " ದಲ್ಲಿ ಹೇಳಲಾಗುತ್ತದೆ. ನೀವು ಬೇರೆ ಭಾಷೆಯಲ್ಲಿ ಔಟ್‌ಪುಟ್ ಬಯಸಿದರೆ, ದಯವಿಟ್ಟು ಮೇಲಿನ ಮೆನುವಿನಿಂದ ನಿಮ್ಮ ಆಯ್ಕೆಯನ್ನು ಬದಲಾಯಿಸಿ."
  },
  or: {
    dynamic_prefix: "ଆପଣଙ୍କର ମାତୃଭାଷାରେ କୁହନ୍ତୁ — କାହାଣୀ ",
    dynamic_suffix: " ରେ କୁହାଯିବ। ଯଦି ଆପଣ ଅନ୍ୟ ଭାଷାରେ ଆଉଟପୁଟ୍ ଚାହୁଁଛନ୍ତି, ତେବେ ଦୟାକରି ଉପର ମେନୁରୁ ଆପଣଙ୍କର ଚୟନ ପରିବର୍ତ୍ତନ କରନ୍ତୁ।"
  },
  ml: {
    dynamic_prefix: "നിങ്ങളുടെ മാതൃഭാഷയിൽ സംസാരിക്കുക — കഥ ",
    dynamic_suffix: " ൽ പറയുന്നതായിരിക്കും. നിങ്ങൾക്ക് മറ്റൊരു ഭാഷയിലാണ് ഔട്ട്‌പുട്ട് വേണ്ടതെങ്കിൽ, മുകളിലെ മെനുവിൽ നിന്ന് നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് മാറ്റുക."
  },
  pa: {
    dynamic_prefix: "ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਵਿੱਚ ਬੋਲੋ — ਕਹਾਣੀ ",
    dynamic_suffix: " ਵਿੱਚ ਸੁਣਾਈ ਜਾਵੇਗੀ। ਜੇਕਰ ਤੁਸੀਂ ਕਿਸੇ ਹੋਰ ਭਾਸ਼ਾ ਵਿੱਚ ਆਉਟਪੁੱਟ ਚਾਹੁੰਦੇ ਹੋ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਚੋਟੀ ਦੇ ਮੀਨੂ ਤੋਂ ਆਪਣੀ ਚੋਣ ਬਦਲੋ।"
  },
  as: {
    dynamic_prefix: "আপোনাৰ মাতৃভাষাত কওক — কাহিনীটো ",
    dynamic_suffix: " ত কোৱা হ'ব। যদি আপুনি অন্য ভাষাত আউটপুট বিচাৰে, তেন্তে অনুগ্ৰহ কৰি ওপৰৰ মেনুৰ পৰা আপোনাৰ নিৰ্বাচন সলনি কৰক।"
  }
};

for (const lang in additions) {
  const replacement = Object.entries(additions[lang]).map(([k, v]) => `    ${k}: "${v}"`).join(',\n') + '\n  },';
  const regex = new RegExp(`(${lang}: \\{[^}]+)(\n  \\},)`, 'g');
  code = code.replace(regex, `$1,\n${replacement}`);
}

fs.writeFileSync(path, code);
console.log('Updated i18n.ts with dynamic instruction text');
