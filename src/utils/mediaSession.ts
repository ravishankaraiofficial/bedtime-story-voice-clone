// src/utils/mediaSession.ts
// Phase 7: Automotive Deployment (Android Auto & Apple CarPlay)

import { MediaSession } from '@capacitor-community/media-session';

export async function setupCarMediaSession(title: string, artist: string, artworkUrl: string) {
  try {
    // 1. Set metadata for the Car Dashboard
    await MediaSession.setMetadata({
      title: title,
      artist: artist,
      album: "Bedtime Story App",
      artwork: [
        { src: artworkUrl, sizes: '512x512', type: 'image/png' }
      ]
    });

    // 2. Map Car Dashboard buttons to our AudioRecorder logic
    MediaSession.setActionHandler({ action: 'play' }, () => {
      console.log('[MediaSession] CarPlay/Auto Play triggered.');
      document.dispatchEvent(new CustomEvent('carplay-play'));
    });

    MediaSession.setActionHandler({ action: 'pause' }, () => {
      console.log('[MediaSession] CarPlay/Auto Pause triggered.');
      document.dispatchEvent(new CustomEvent('carplay-pause'));
    });

    // We can also handle 'seekforward' or 'seekbackward' if we implement audio scrubbing.

    console.log("[MediaSession] Successfully hooked into native media controls.");
  } catch (e) {
    console.warn("[MediaSession] MediaSession plugin not available (likely running in standard browser, not Capacitor).", e);
  }
}

export function getRoadTripPrompt(basePrompt: string): string {
  // Road Trip Mode overrides the sleepy tone for daytime engagement
  return basePrompt + `
  
  [OVERRIDE TONE: ROAD TRIP MODE]
  Do NOT make this story sleepy. The child is in a car. Make this a fast-paced, upbeat, daytime mystery. 
  Keep energy high and encourage them to look out the window.
  `;
}
