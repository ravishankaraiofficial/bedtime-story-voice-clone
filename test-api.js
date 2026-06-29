const fs = require('fs');

async function run() {
  try {
    const formData = new FormData();
    formData.append('audio', new Blob(['fake audio'], { type: 'audio/webm' }));
    formData.append('languageName', 'English');
    
    const res = await fetch('http://localhost:4321/api/story', {
      method: 'POST',
      body: formData
    });
    console.log(res.status, await res.text());
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
