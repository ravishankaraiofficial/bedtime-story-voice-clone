const fs = require('fs');

async function test() {
  const text = "Hello world, this is a test.";
  
  try {
    const response = await fetch('http://localhost:4321/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      const err = await response.text();
      console.error("FAILED:", response.status, err);
      return;
    }
    
    console.log("SUCCESS, writing output.wav");
    const buffer = await response.arrayBuffer();
    fs.writeFileSync('output.wav', Buffer.from(buffer));
  } catch (e) {
    console.error("ERROR:", e);
  }
}

test();
