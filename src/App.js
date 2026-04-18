import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, MapPin, Phone, MessageCircle, X, Heart, Play, Pause, Music } from 'lucide-react';

import { getImageUrl } from './supabase';

/* Dynamic photo paths — pulled directly from Supabase Cloud Storage */
const COUPLE_PHOTO = '/images/couple.jpeg';
const GALLERY_PATHS = Array.from({ length: 37 }, (_, i) => getImageUrl(`gallery-${i + 1}.jpeg`));

/* ═══════════════ COLOUR TOKENS ═══════════════════════════════════════════ */
const C = {
  ivory: '#FDFAF5', cream: '#F5EFE0', petal: '#FBE8E8',
  blush: '#F2C4C4', blushDeep: '#E8A0A0', rose: '#D4768A',
  roseDark: '#B85771', gold: '#C9A96E', goldLight: '#E8D5A8',
  goldDeep: '#A07840', sage: '#8FAE8B', charcoal: '#2D2926', warmGray: '#7D7168',
};

/* ═══════════════ WEDDING DATA ════════════════════════════════════════════ */
const WD = {
  brideName: 'Skandha', groomName: 'Mehul',
  weddingDate: 'June 28-29, 2026',
  venue: 'Utsav Marriage',
  address: '197, Sector 2 Rd, Sector 2, Vijay Bari, Vidyadhar Nagar, Jaipur, Rajasthan 302039',
  phones: { groom: '+91 7665226944', bride: '+91 8890363091' },
  parentNames: { groom: 'Mr. & Mrs. Baldwa', bride: 'Mr. & Mrs. Toshniwal' },
  functions: [
    {
      id: 'haldi', name: 'Haldi', date: 'June 28, 2026', time: '11:00 AM', emoji: '🌼',
      tagline: 'Golden moments with golden turmeric',
      image: '/images/haldi.png',
      palette: { from: '#2A1D00', via: '#3F2C00', accent: '#D4A853', light: '#FFF8E7' },
      song: { title: 'Kabira Encore', url: '/songs/haldi.mp3' },
      dress: { color: '#D4A853', swatch2: '#FFF8E7', label: 'Soft Gold & Ivory', tip: 'Soft gold, ivory, saffron & marigold hues. Silk kurtas, lehengas preferred. Avoid blacks!' },
      particles: { chars: ['✦', '·', '◆', '✿', '•'], colors: ['#D4A853', '#F0D070', '#FFF8E7', '#C9A96E'] },
    },
    // {
    //   id: 'mehendi', name: 'Mehendi', date: 'June 24, 2026', time: '11:00 AM', emoji: '🌿',
    //   tagline: 'Colors, celebrations & beautiful designs',
    //   image: '/images/mehendi.png',
    //   palette: { from: '#061A0C', via: '#0E2E16', accent: '#5DB870', light: '#E4F7E8' },
    //   song: { title: 'Mehendi Laga Ke Rakhna', artist: 'Alka Yagnik', url: '/songs/mehendi.mp3' },
    //   dress: { color: '#4CAF50', swatch2: '#E4F7E8', label: 'Garden Greens & Pastels', tip: 'Mint greens, peach, powder pink & coral. Light floral anarkalis & sarees!' },
    //   particles: { chars: ['✦', '·', '❀', '✿', '◇'], colors: ['#5DB870', '#A8D5B5', '#D4EEA8', '#C8F0C8'] },
    // },
    {
      id: 'sangeet', name: 'Sangeet', date: 'June 27, 2026', time: '6:00 PM', emoji: '🎶',
      tagline: 'Music, dance & joyous festivities',
      image: '/images/sangeet.png',
      palette: { from: '#0A0418', via: '#150930', accent: '#B57BF5', light: '#F0E8FF' },
      song: { title: 'Rangsaari', url: '/songs/sangeet.mp3' },
      dress: { color: '#9333EA', swatch2: '#EDE9FE', label: 'Jewel Tones — Glam It Up!', tip: 'Fuchsia, royal purple, sapphire, magenta. Heavy embroidery & gowns. Glam it up!' },
      particles: { chars: ['♪', '♫', '✦', '·', '★'], colors: ['#B57BF5', '#E0C8FF', '#fff', '#D4B8FF'] },
    },
    {
      id: 'mayara', name: 'Mayara', date: 'June 26, 2026', time: '10:00 AM', emoji: '🪔',
      tagline: 'Sacred Rajasthani rituals with family blessings',
      image: '/images/mayara.png',
      palette: { from: '#240800', via: '#3E1000', accent: '#F08030', light: '#FFF0E4' },
      song: { title: 'Choudhary', url: '/songs/mayara.mp3' },
      dress: { color: '#F08030', swatch2: '#FFF0E4', label: 'Saffron & Traditional', tip: 'Traditional Gujarati — chaniya choli in saffron, red & orange. Dhoti-kurta for men.' },
      particles: { chars: ['✦', '·', '◆', '•', '❈'], colors: ['#F08030', '#FFD080', '#FFF0E4', '#F5A060'] },
    },
    {
      id: 'reception', name: 'Reception', date: 'June 29, 2026', time: '7:00 PM', emoji: '💎',
      tagline: 'An evening of love, glamour & celebration',
      image: '/images/reception.png',
      palette: { from: '#08080F', via: '#10102A', accent: '#D4B896', light: '#FFF8F0' },
      song: { title: 'Rataan Lambiyan', url: '/songs/reception.mp3' },
      dress: { color: '#C9A96E', swatch2: '#FFF8E7', label: 'Black Tie — Gold & Ivory', tip: 'Sherwanis, indo-western suits, embellished sarees & gowns. Chandeliers & champagne vibes!' },
      particles: { chars: ['✦', '◆', '·', '★', '♦'], colors: ['#D4B896', '#FFF8F0', '#C9A96E', '#E8D5A8'] },
    },
    {
      id: 'pheras', name: 'Pheras', date: 'June 30, 2026', time: '1:00 AM', emoji: '🔥',
      tagline: 'Saat Pheras — seven sacred vows around the holy fire',
      image: '/images/pheras.png',
      palette: { from: '#1A0800', via: '#2E1206', accent: '#E85D30', light: '#FFE8D8' },
      song: { title: 'Kudmayi', url: '/songs/pheras.mp3' },
      dress: { color: '#E85D30', swatch2: '#FFE8D8', label: 'Bridal Red & Sacred Gold', tip: 'Traditional red & maroon lehengas, sherwanis with gold embroidery. Embrace the sacred fire glow!' },
      particles: { chars: ['🔥', '✦', '·', '◆', '❈'], colors: ['#E85D30', '#FFB070', '#FFE8D8', '#F0A050'] },
    },
  ],
};

const WEDDING_DATE = new Date('2026-06-28T18:00:00+05:30');

const NAV_SYMBOLS = {
  cover: '💍', gallery: '📷', celebrations: '✨',
  haldi: '🌼', mehendi: '🌿', sangeet: '🎶', mayara: '🪔', reception: '💎', pheras: '🔥',
  venue: '🏰', family: '🙏', rsvp: '💌',
};

/* ═══════════════ HOOKS ════════════════════════════════════════════════════ */
const useCountdown = (target) => {
  const calc = useCallback(() => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, min: 0, sec: 0 };
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), min: Math.floor((diff % 3600000) / 60000), sec: Math.floor((diff % 60000) / 1000) };
  }, [target]);
  const [t, setT] = useState(calc);
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, [calc]);
  return t;
};

/* ═══════════════ DECORATIVE ══════════════════════════════════════════════ */
const MandalaCorner = ({ corner = 'tr', size = 160, color = C.gold, opacity = 0.12 }) => {
  const pos = { tl: { top: -10, left: -10 }, tr: { top: -10, right: -10 }, bl: { bottom: -10, left: -10 }, br: { bottom: -10, right: -10 } }[corner];
  const tf = { tl: 'scale(-1,1)', tr: 'scale(1,1)', bl: 'scale(-1,-1)', br: 'scale(1,-1)' }[corner];
  return (
    <div style={{ position: 'absolute', ...pos, width: size, height: size, opacity, pointerEvents: 'none' }}>
      <svg viewBox="0 0 120 120" width={size} height={size} style={{ transform: tf, transformOrigin: 'center' }}>
        <circle cx="110" cy="10" r="70" fill="none" stroke={color} strokeWidth="0.7" />
        <circle cx="110" cy="10" r="50" fill="none" stroke={color} strokeWidth="0.5" />
        <path d="M110 10 Q80 45 60 80 Q40 45 20 10" fill="none" stroke={color} strokeWidth="0.6" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
          <circle key={i} cx={110 + 65 * Math.cos(a * Math.PI / 180)} cy={10 + 65 * Math.sin(a * Math.PI / 180)} r="1.5" fill={color} opacity="0.5" />
        ))}
      </svg>
    </div>
  );
};

const GoldDivider = ({ color = C.gold, my = 16 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: `${my}px 0` }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,transparent,${color})` }} />
    <div style={{ width: 7, height: 7, background: color, transform: 'rotate(45deg)', flexShrink: 0 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to left,transparent,${color})` }} />
  </div>
);

const FloatingPetals = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} style={{ position: 'absolute', fontSize: `${10 + (i % 4) * 4}px`, left: `${(i * 19 + 3) % 100}%`, top: '-30px', opacity: 0, animation: `floatPetal ${5 + (i % 5) * 1.6}s ${i * 0.5}s ease-in-out infinite` }}>
        {['🌸', '🌺', '✿', '🌹', '❀'][i % 5]}
      </div>
    ))}
  </div>
);

const PetalDrop = ({ colors = [C.rose, C.blush, C.gold, C.sage] }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', width: `${5 + (i % 3) * 5}px`, height: `${5 + (i % 3) * 5}px`,
        background: colors[i % colors.length],
        borderRadius: `${50 + i % 2 * 50}% ${i % 2 * 50}% ${50 + i % 2 * 50}% ${i % 2 * 50}%`,
        left: `${(i * 23 + 5) % 100}%`, top: '-16px', opacity: 0,
        animation: `petalDrop ${4 + (i % 4) * 1.4}s ${i * 0.35}s ease-in infinite`,
        transform: `rotate(${i * 37}deg)`,
      }} />
    ))}
  </div>
);

const Confetti = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {Array.from({ length: 18 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', width: `${4 + (i % 3) * 3}px`, height: `${4 + (i % 3) * 3}px`,
        borderRadius: (i % 3 === 0) ? '50%' : (i % 3 === 1) ? '2px' : '0',
        background: [C.rose, C.gold, C.blush, C.sage, '#F0B429', '#C084FC'][i % 6],
        left: `${(i * 17 + 5) % 100}%`, top: '-20px', opacity: 0,
        animation: `confetti ${3 + (i % 4)}s ${i * 0.22}s linear infinite`, transform: `rotate(${i * 30}deg)`,
      }} />
    ))}
  </div>
);

/* ═════════ FUNCTION-SPECIFIC RISING PARTICLES ════════════════════════════ */
const FnParticles = ({ particles }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${(i * 23 + 7) % 100}%`,
        bottom: `${(i * 13 + 5) % 45}%`,
        color: particles.colors[i % particles.colors.length],
        fontSize: `${8 + (i % 4) * 5}px`,
        opacity: 0,
        animation: `fnRise ${3 + (i % 4) * 1.1}s ${i * 0.38}s ease-out infinite`,
        textShadow: `0 0 8px ${particles.colors[i % particles.colors.length]}`,
      }}>
        {particles.chars[i % particles.chars.length]}
      </div>
    ))}
  </div>
);

/* ═══════════════ WAVE PROGRESS BAR ════════════════════════════════════════
   Pre-defined waveform heights giving a real audio-wave look.
   Filled bars: accent color + animated scaleY (wave effect when playing).
   Unfilled bars: grey, static.
══════════════════════════════════════════════════════════════════════════ */
const WAVE_H = [3, 7, 11, 15, 9, 14, 6, 12, 16, 8, 5, 13, 16, 7, 12, 9, 15, 5, 11, 16, 7, 10, 14, 4, 15, 8, 12, 5, 11, 15, 6, 13, 4, 11, 10, 5, 15, 6, 12, 8];

const WaveProgressBar = ({ pct, accent, playing, onSeek }) => (
  <div onClick={onSeek} style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5, height: 28, padding: '4px 0' }}>
    {WAVE_H.map((h, i) => {
      const filled = (i / WAVE_H.length) * 100 <= pct;
      return (
        <div key={i} style={{
          flex: 1, height: `${h}px`, borderRadius: 2, flexShrink: 0,
          background: filled ? accent : 'rgba(255,255,255,0.1)',
          boxShadow: filled && playing ? `0 0 5px 1px ${accent}70` : 'none',
          animation: playing && filled ? `wSY${(i % 5) + 1} ${0.33 + (i % 5) * 0.09}s ease-in-out infinite alternate` : 'none',
          transformOrigin: 'center',
          transition: 'background 0.3s',
        }} />
      );
    })}
  </div>
);

/* ═══════════════ MINI AUDIO PLAYER (Slim + Wave) ═════════════════════════ */
const MiniAudioPlayer = ({ song, accent, isActive }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [errDetail, setErrDetail] = useState('');

  useEffect(() => {
    if (isActive && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(e => {
        setPlaying(false);
        setError(true);
        setErrDetail('Auto-play blocked: ' + e.message);
      });
    } else if (!isActive && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    }
  }, [isActive]);

  const toggle = async () => {
    const a = audioRef.current; if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      setError(false);
      setErrDetail('');
      try {
        setPlaying(true); // Optimistic UI
        await a.play();
      } catch (e) {
        setPlaying(false);
        setError(true);
        setErrDetail('Play blocked: ' + e.message);
      }
    }
  };

  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const pct = duration ? (progress / duration) * 100 : 0;

  const handleSeek = e => {
    const r = e.currentTarget.getBoundingClientRect();
    if (audioRef.current && duration) audioRef.current.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  return (
    <div style={{ background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(18px)', borderRadius: 14, padding: '10px 14px', border: `1px solid ${accent}35` }}>
      <audio key={song.url} ref={audioRef} preload="metadata"
        onTimeUpdate={e => setProgress(e.target.currentTime)}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onError={(e) => { setError(true); setPlaying(false); setErrDetail('Network Error code: ' + (e.target.error?.code || 'unknown')); }}
      >
        <source src={song.url} type="audio/mpeg" />
      </audio>

      {/* Row 1 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <button onClick={toggle} style={{
          width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
          background: `linear-gradient(135deg,${accent},${accent}cc)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 3px 14px ${accent}55`,
        }}>
          {playing ? <Pause size={14} color="#fff" /> : <Play size={14} color="#fff" />}
        </button>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 1 }}>
            <Music size={10} color={accent} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#fff', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip' }}>{song.title}</span>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{song.artist}</span>
        </div>

        {/* Live bars */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 16, flexShrink: 0 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              width: 2.5, borderRadius: 2, background: accent, height: '3px',
              animation: playing ? `wSY${i} ${0.38 + i * 0.09}s ease-in-out infinite alternate` : 'none',
            }} />
          ))}
        </div>
      </div>

      {/* Row 2: Wave progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', minWidth: 24 }}>{fmt(progress)}</span>
        <WaveProgressBar pct={pct} accent={accent} playing={playing} onSeek={handleSeek} />
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', minWidth: 24, textAlign: 'right' }}>{fmt(duration)}</span>
      </div>

      {error && (
        <p style={{ fontSize: 9, color: 'rgba(255,160,100,0.8)', marginTop: 5, textAlign: 'center', letterSpacing: '0.05em' }}>
          ⚠ {errDetail || `Failed to load ${song.url.split('/').pop()}`}
        </p>
      )}
    </div>
  );
};

/* Dress card */
const DressThemeCard = ({ dress, accent }) => (
  <div style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '12px 16px', border: `1px solid ${accent}25` }}>
    <p style={{ fontSize: 9, letterSpacing: '0.25em', color: accent, textTransform: 'uppercase', marginBottom: 8 }}>👗 Dress Code</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <div style={{ display: 'flex', gap: 3 }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: dress.color, border: '1px solid rgba(255,255,255,0.2)' }} />
        <div style={{ width: 18, height: 18, borderRadius: 4, background: dress.swatch2, border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, color: '#fff', fontWeight: 400 }}>{dress.label}</p>
    </div>
    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>{dress.tip}</p>
  </div>
);

/* ═══════════════ CARD WRAPPER ════════════════════════════════════════════ */
const CardSlide = ({ sectionIcon, sectionName, accentColor = C.rose, petalColors, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden' }}>
      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
        transition: 'all 0.6s 0.25s cubic-bezier(0.4,0,0.2,1)', pointerEvents: isOpen ? 'all' : 'none',
      }}>
        {isOpen && <PetalDrop colors={petalColors} />}
        {children}
        <button onClick={() => setIsOpen(false)} style={{
          position: 'fixed', bottom: 'calc(88px + env(safe-area-inset-bottom))', right: 16, zIndex: 25, width: 48, height: 48, borderRadius: '50%',
          border: `1.5px solid ${C.goldLight}`, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
          cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)', animation: 'scaleIn 0.4s 0.8s both',
        }}>💌</button>
      </div>

      {/* Card face */}
      <div onClick={() => setIsOpen(true)} style={{
        position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', transformOrigin: 'center top',
        transform: isOpen ? 'translateY(-112%) rotate(-4deg) scale(0.88)' : 'none',
        transition: 'transform 0.72s cubic-bezier(0.4,0,0.2,1)', pointerEvents: isOpen ? 'none' : 'all',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: `linear-gradient(160deg,${C.ivory} 0%,${C.cream} 55%,${C.petal} 100%)`,
      }}>
        <MandalaCorner corner="tr" size={190} color={C.gold} opacity={0.13} />
        <MandalaCorner corner="bl" size={190} color={C.rose} opacity={0.08} />
        <div style={{ position: 'absolute', inset: 22, border: `1px solid ${C.gold}28`, borderRadius: 4, pointerEvents: 'none' }} />
        <FloatingPetals />

        <div style={{ textAlign: 'center', padding: '0 44px', animation: 'slideUp 0.6s both', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 52, marginBottom: 10, filter: `drop-shadow(0 4px 14px ${accentColor}44)` }}>{sectionIcon}</div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: '0.35em', color: accentColor, textTransform: 'uppercase', marginBottom: 6 }}>Wedding of</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(22px,5vw,26px)', color: C.charcoal, marginBottom: 4 }}>{WD.brideName} & {WD.groomName}</p>
          <GoldDivider color={C.gold} my={12} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(32px,8vw,42px)', color: C.charcoal, marginBottom: 26 }}>{sectionName}</h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 26px', borderRadius: 9999, background: `${accentColor}18`, border: `1px solid ${accentColor}40` }}>
            <span style={{ fontSize: 16 }}>👆</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: accentColor, letterSpacing: '0.1em', fontStyle: 'italic' }}>Tap to open</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ SPLASH SCREEN ═══════════════════════════════════════════ */
const SplashScreen = ({ onEnter, isExiting }) => {
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [touchY, setTouchY] = useState(0);

  const handleTS = e => setTouchY(e.touches[0].clientY);
  const handleTE = e => { if (touchY - e.changedTouches[0].clientY > 45) onEnter(); };

  return (
    <div onTouchStart={handleTS} onTouchEnd={handleTE} style={{ position: 'fixed', inset: 0, zIndex: 200, overflow: 'hidden', animation: isExiting ? 'splashExit 0.9s cubic-bezier(0.4,0,0.2,1) forwards' : 'none' }}>

      {/* Full-screen couple photo from /photos/couple.jpg */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg,${C.ivory} 0%,${C.cream} 40%,${C.petal} 70%,${C.blush} 100%)` }}>
        <img
          src={COUPLE_PHOTO} alt="Skandha & Mehul"
          fetchPriority="high"
          onLoad={() => setPhotoLoaded(true)}
          onError={() => setPhotoLoaded(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: photoLoaded ? 'block' : 'none' }}
        />
        {/* Show decorative placeholder if photo not yet added */}
        {!photoLoaded && (
          <>
            <MandalaCorner corner="tr" size={220} color={C.gold} opacity={0.14} />
            <MandalaCorner corner="bl" size={220} color={C.rose} opacity={0.09} />
            <FloatingPetals />
          </>
        )}
      </div>

      {/* Gradient overlay: dark at bottom for readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,8,4,0.95) 0%,rgba(15,8,4,0.5) 36%,rgba(0,0,0,0.06) 65%,transparent 100%)', pointerEvents: 'none' }} />

      {photoLoaded && <MandalaCorner corner="tr" size={150} color={C.gold} opacity={0.09} />}
      <FloatingPetals />

      {/* Bottom: names + CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, padding: '0 28px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, marginBottom: 14, animation: 'spinSlow 14s linear infinite', filter: `drop-shadow(0 4px 12px ${C.gold}70)` }}>
          <svg viewBox="0 0 80 80" width="52" height="52">
            <circle cx="40" cy="40" r="35" fill="none" stroke={C.gold} strokeWidth="1" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
              <ellipse key={i} cx={40 + 18 * Math.cos(a * Math.PI / 180)} cy={40 + 18 * Math.sin(a * Math.PI / 180)}
                rx="6.5" ry="11" fill={i % 2 === 0 ? `${C.gold}60` : `${C.rose}45`}
                stroke={i % 2 === 0 ? C.gold : C.rose} strokeWidth="0.7"
                transform={`rotate(${a},${40 + 18 * Math.cos(a * Math.PI / 180)},${40 + 18 * Math.sin(a * Math.PI / 180)})`} />
            ))}
            <circle cx="40" cy="40" r="11" fill={`${C.gold}20`} stroke={C.gold} strokeWidth="0.9" />
            <text x="40" y="44" textAnchor="middle" fontSize="10" fill={C.gold}>♡</text>
          </svg>
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: '0.38em', color: 'rgba(232,213,168,0.88)', textTransform: 'uppercase', marginBottom: 8, animation: 'fadeIn 1s 0.4s both' }}>A Wedding Celebration</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(36px,8vw,48px)', lineHeight: 1.1, color: '#fff', textShadow: '0 2px 24px rgba(0,0,0,0.65)', margin: '0 0 4px', animation: 'slideUp 0.8s 0.3s both' }}>
          {WD.brideName} <span style={{ color: C.goldLight, fontStyle: 'italic' }}>&</span> {WD.groomName}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, letterSpacing: '0.15em', color: 'rgba(232,213,168,0.68)', marginBottom: 28, animation: 'fadeIn 1s 0.6s both' }}>{WD.weddingDate}</p>

        <div onClick={onEnter} style={{ cursor: 'pointer', animation: 'fadeIn 1s 1s both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 38px', borderRadius: 9999, background: `linear-gradient(135deg,${C.rose},${C.roseDark})`, color: '#fff', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, boxShadow: '0 12px 36px rgba(180,80,100,0.5)', animation: 'pulseGlow 2.5s 2s ease-in-out infinite' }}>👆 Tap or Swipe Up ✦</div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ COVER / SAVE THE DATE ═══════════════════════════════════ */
const CoverSlide = ({ currentSlide, totalSlides }) => {
  const { days, hours, min, sec } = useCountdown(WEDDING_DATE);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', background: `linear-gradient(160deg,${C.ivory} 0%,${C.cream} 45%,${C.petal} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MandalaCorner corner="tr" size={200} color={C.gold} opacity={0.13} />
      <MandalaCorner corner="bl" size={200} color={C.rose} opacity={0.08} />
      <Confetti />
      <FloatingPetals />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 28px', animation: 'slideUp 1s both' }}>
        <div style={{ fontSize: 26, color: C.gold, fontFamily: 'serif', marginBottom: 5, opacity: 0.8 }}>ॐ</div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(13px,3vw,14px)', letterSpacing: '0.35em', color: C.rose, textTransform: 'uppercase', marginBottom: 12 }}>We are getting</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(64px,14vw,96px)', color: C.charcoal, lineHeight: 0.88, margin: 0, animation: 'scaleIn 0.9s 0.1s both' }}>Married</h1>
        <GoldDivider color={C.gold} />
        <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(24px,5.5vw,30px)', color: C.charcoal, margin: '4px 0 4px' }}>{WD.brideName} <span style={{ color: C.rose, fontStyle: 'italic' }}>&</span> {WD.groomName}</p>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14px,3vw,16px)', color: C.gold, letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 22 }}>{WD.weddingDate}</p>

        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: 10 }}>⏳ Celebrations begin in</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[{ v: days, l: 'Days' }, { v: hours, l: 'Hrs' }, { v: min, l: 'Min' }, { v: sec, l: 'Sec' }].map(({ v, l }) => (
              <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '8px 10px', border: `1px solid ${C.gold}30`, minWidth: 50 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,5vw,24px)', color: C.gold, fontWeight: 400, lineHeight: 1 }}>{String(v).padStart(2, '0')}</p>
                <p style={{ fontSize: 8, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.1em', marginTop: 3, textTransform: 'uppercase' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ PHOTO GALLERY (true infinite via RAF) ═══════════════════ */
const PhotoGallerySlide = () => {
  const trackRef = useRef();
  const scrollX = useRef(0); const rafId = useRef(null);
  // Track which gallery slots loaded successfully
  const [loaded, setLoaded] = useState(Array(GALLERY_PATHS.length).fill(false));
  const [shouldPreload, setShouldPreload] = useState(false);
  const markLoaded = useCallback((i) => setLoaded(p => { const n = [...p]; n[i] = true; return n; }), []);

  useEffect(() => { const t = setTimeout(() => setShouldPreload(true), 2500); return () => clearTimeout(t); }, []);

  const ITEM_W = 155; const GAP = 12;
  const validPaths = GALLERY_PATHS.filter((_, i) => loaded[i]);
  // For scroll: always use full path list (images hidden via opacity if loading)
  const items = [...GALLERY_PATHS, ...GALLERY_PATHS, ...GALLERY_PATHS];
  const singleW = GALLERY_PATHS.length * (ITEM_W + GAP);

  const startRAF = useCallback(() => {
    const step = () => { scrollX.current += 2.0; if (scrollX.current >= singleW) scrollX.current = 0; if (trackRef.current) trackRef.current.style.transform = `translateX(-${scrollX.current}px)`; rafId.current = requestAnimationFrame(step); };
    rafId.current = requestAnimationFrame(step);
  }, [singleW]);

  useEffect(() => { startRAF(); return () => cancelAnimationFrame(rafId.current); }, [startRAF]);

  const rots = ['-5deg', '-2deg', '3deg', '-3deg', '4deg', '-1deg', '5deg'];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', background: `linear-gradient(160deg,${C.charcoal} 0%,#1A1512 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 50%,rgba(201,169,110,0.07) 0%,transparent 70%)`, pointerEvents: 'none' }} />
      <MandalaCorner corner="tr" color={C.goldLight} opacity={0.07} />
      <MandalaCorner corner="bl" color={C.blush} opacity={0.06} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase', marginBottom: 5 }}>{WD.brideName} & {WD.groomName}</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(22px,6vw,32px)', color: C.ivory }}>Our Moments</h2>
        </div>

        {/* Hidden preload images so we know which ones exist */}
        {shouldPreload && (
          <div style={{ display: 'none' }}>
            {GALLERY_PATHS.map((src, i) => (
              <img key={i} src={src} onLoad={() => markLoaded(i)} onError={() => { }} alt="" />
            ))}
          </div>
        )}

        <div style={{ overflow: 'hidden', paddingBottom: 18 }}
          onMouseEnter={() => cancelAnimationFrame(rafId.current)}
          onMouseLeave={startRAF}>
          <div ref={trackRef} style={{ display: 'flex', gap: `${GAP}px`, paddingLeft: 20, width: `${items.length * (ITEM_W + GAP)}px` }}>
            {items.map((src, i) => {
              const dataIdx = i % GALLERY_PATHS.length;
              const isVisible = loaded[dataIdx];
              return (
                <div key={i} style={{
                  width: ITEM_W, height: 200, flexShrink: 0, borderRadius: 18, overflow: 'hidden',
                  boxShadow: '0 14px 40px rgba(0,0,0,0.55)', border: `1.5px solid ${C.gold}28`,
                  transform: `rotate(${rots[i % rots.length]})`,
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.4s',
                  background: `linear-gradient(135deg,${C.charcoal},${C.warmGray}44)`,
                }}>
                  <img src={shouldPreload || isVisible ? src : ''} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              );
            })}
          </div>
        </div>

        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 6, letterSpacing: '0.08em', textAlign: 'center' }}>
          {validPaths.length} / {GALLERY_PATHS.length} moments · hover to pause
        </p>
      </div>
    </div>
  );
};

/* ═══════════════ CELEBRATIONS CARD ══════════════════════════════════════ */
const CelebrationsCard = ({ onGoToSlide }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden' }}>
      <img src="/images/celebrations.png" alt="Celebrations" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.78) 100%)' }} />

      {/* Open content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px',
        opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.96)',
        transition: 'all 0.55s 0.2s cubic-bezier(0.4,0,0.2,1)', pointerEvents: isOpen ? 'all' : 'none',
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 11, letterSpacing: '0.35em', color: C.gold, textTransform: 'uppercase', marginBottom: 8 }}>The Celebrations</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontSize: 'clamp(26px,7vw,38px)', color: '#fff', marginBottom: 18 }}>Begin ✨</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%', maxWidth: 360, marginBottom: 18 }}>
          {WD.functions.map((fn, i) => (
            <div key={fn.id} onClick={() => onGoToSlide(fn.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(14px)',
              borderRadius: 14, padding: '11px 15px', cursor: 'pointer', border: `1px solid ${fn.palette.accent}35`,
              animation: `slideUp 0.5s ${i * 0.07}s both`, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.65)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.42)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${fn.palette.accent}22`, border: `1px solid ${fn.palette.accent}45`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{fn.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, color: '#fff', fontWeight: 400, margin: '0 0 2px' }}>{fn.name}</p>
                <p style={{ fontSize: 9, color: `${fn.palette.accent}cc`, letterSpacing: '0.05em' }}>{fn.date} · {fn.time}</p>
              </div>
              <ChevronRight size={13} color={`${fn.palette.accent}80`} />
            </div>
          ))}
        </div>

        <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${C.gold}40`, borderRadius: 9999, padding: '7px 20px', color: C.gold, fontSize: 11, letterSpacing: '0.15em', cursor: 'pointer' }}>
          💌 Close
        </button>
      </div>

      {/* Closed card face */}
      <div onClick={() => setIsOpen(true)} style={{
        position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', transformOrigin: 'center top',
        transform: isOpen ? 'translateY(-110%) rotate(-3deg) scale(0.9)' : 'none',
        transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', pointerEvents: isOpen ? 'none' : 'all',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '0 32px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.45em', color: C.gold, marginBottom: 18 }}>✦ ✦ ✦</div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(15px,3.5vw,17px)', letterSpacing: '0.2em', color: C.goldLight, textTransform: 'uppercase', marginBottom: 6 }}>The</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontSize: 'clamp(46px,11vw,76px)', color: '#fff', lineHeight: 0.9, margin: '0 0 6px', textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>Celebrations</h2>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(46px,11vw,76px)', color: C.gold, lineHeight: 0.9, margin: '0 0 26px' }}>Begin</h2>
          <GoldDivider color={C.gold} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16, marginBottom: 26 }}>
            {WD.functions.map(f => (
              <div key={f.id} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 3 }}>{f.emoji}</div>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{f.name}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px', borderRadius: 9999, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: `1px solid ${C.gold}45`, animation: 'pulseGlow 2.5s 1.5s infinite' }}>
            <span style={{ fontSize: 15 }}>👆</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, color: C.goldLight, letterSpacing: '0.12em', fontStyle: 'italic' }}>Tap for events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ FUNCTION SLIDE (with FnParticles) ══════════════════════ */
const FunctionSlide = ({ fn, isActive }) => {
  const { palette, song, dress, name, date, time, tagline, emoji, image, particles } = fn;
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', background: `linear-gradient(160deg,${palette.from} 0%,${palette.via} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={image} alt={name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.54 }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top,${palette.from}f2 0%,${palette.via}88 45%,${palette.from}77 100%)` }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: `radial-gradient(ellipse 80% 60% at 50% 0%,${palette.accent}14 0%,transparent 70%)`, pointerEvents: 'none' }} />

      {/* Rising particles for each function */}
      <FnParticles particles={particles} />

      <div
        onTouchStart={e => { if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) e.stopPropagation(); }}
        onTouchEnd={e => { if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) e.stopPropagation(); }}
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 440, padding: '0 20px', overflowY: 'auto', maxHeight: '94vh' }}>
        <div style={{ textAlign: 'center', marginBottom: 16, animation: 'slideUp 0.7s both' }}>
          <div style={{ fontSize: 42, marginBottom: 6, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.5))', animation: 'fnFloat 3s ease-in-out infinite' }}>{emoji}</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontSize: 'clamp(38px,9vw,50px)', color: '#fff', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{name}</h2>
          <div style={{ height: 2, width: 50, background: palette.accent, margin: '10px auto', borderRadius: 9999, boxShadow: `0 0 12px ${palette.accent}`, animation: `glowPulse 2s ease-in-out infinite` }} />
          <p style={{ fontSize: 13, color: palette.light, letterSpacing: '0.13em', marginBottom: 3 }}>{date} · {time}</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: 'rgba(255,255,255,0.68)', fontStyle: 'italic' }}>{tagline}</p>
        </div>

        <div style={{ marginBottom: 10, animation: 'slideUp 0.7s 0.15s both' }}>
          <MiniAudioPlayer song={song} accent={palette.accent} isActive={isActive} />
        </div>
        <div style={{ animation: 'slideUp 0.7s 0.28s both' }}>
          <DressThemeCard dress={dress} accent={palette.accent} />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ VENUE (Premium Dark Gold) ════════════════════════════════ */
const VenueContent = () => (
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#0F0A04 0%,#1E1408 60%,#150F02 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <PetalDrop colors={[C.gold, C.goldLight, '#D4A853', '#C9A96E']} />
    <MandalaCorner corner="tr" size={200} color={C.gold} opacity={0.13} />
    <MandalaCorner corner="bl" size={180} color={C.goldLight} opacity={0.08} />
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 30%,rgba(201,169,110,0.1) 0%,transparent 70%)`, pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 2, maxWidth: 420, width: '100%', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 52, marginBottom: 8, animation: 'fnFloat 4s ease-in-out infinite' }}>🏰</div>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 10, letterSpacing: '0.35em', color: C.gold, textTransform: 'uppercase', marginBottom: 6 }}>Celebrating at</p>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontSize: 'clamp(22px,6vw,34px)', color: C.ivory, marginBottom: 4 }}>{WD.venue}</h2>
      <GoldDivider color={C.gold} my={14} />
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: C.warmGray, lineHeight: 1.8, marginBottom: 22 }}>{WD.address}</p>

      {/* Ornate map card */}
      <div style={{
        width: '100%', aspectRatio: '16/9', borderRadius: 20, marginBottom: 24,
        background: `linear-gradient(135deg,rgba(201,169,110,0.07),rgba(201,169,110,0.03))`,
        border: `1px solid ${C.gold}30`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%,rgba(201,169,110,0.12) 0%,transparent 70%)` }} />
        <MapPin size={36} color={C.gold} style={{ filter: `drop-shadow(0 4px 10px ${C.gold}60)` }} />
        <span style={{ fontSize: 13, color: C.warmGray, fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>
          {WD.venue}
        </span>
        <span style={{ fontSize: 10, color: 'rgba(201,169,110,0.5)', letterSpacing: '0.1em' }}>Jaipur, Rajasthan</span>
      </div>

      <a href={`https://maps.google.com/?q=${encodeURIComponent(WD.venue + ' ' + WD.address)}`} target="_blank" rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 9999,
          background: `linear-gradient(135deg,${C.gold},${C.goldDeep})`,
          color: '#1A1208', fontSize: 12, letterSpacing: '0.15em', textDecoration: 'none', fontWeight: 600,
          boxShadow: `0 8px 28px ${C.gold}40`,
        }}>
        <MapPin size={13} /> Open in Maps
      </a>
    </div>
  </div>
);

/* ═══════════════ FAMILY (Warm Luxury) ════════════════════════════════════ */
const FamilyContent = () => (
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#140C04 0%,#1E1208 60%,#120A04 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <PetalDrop colors={[C.gold, C.goldLight, C.blush, 'rgba(201,169,110,0.8)']} />
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 50%,rgba(201,169,110,0.09) 0%,transparent 70%)`, pointerEvents: 'none' }} />
    <MandalaCorner corner="tl" size={190} color={C.goldLight} opacity={0.1} />
    <MandalaCorner corner="br" size={190} color={C.blush} opacity={0.07} />

    <div style={{ position: 'relative', zIndex: 2, maxWidth: 400, padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 10, animation: 'fnFloat 3s ease-in-out infinite' }}>🙏</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(22px,6vw,32px)', color: C.ivory, marginBottom: 6 }}>With blessings of</h2>
      <GoldDivider color={C.gold} my={16} />

      {[{ label: "Groom's Family", name: WD.parentNames.groom, icon: '🤵' }, { label: "Bride's Family", name: WD.parentNames.bride, icon: '👰' }].map((f, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '14px 0' }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,transparent,${C.gold}50)` }} />
              <Heart size={14} color={C.rose} fill={C.rose} style={{ animation: 'pulseGlow 2s infinite' }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left,transparent,${C.gold}50)` }} />
            </div>
          )}
          <div style={{
            background: `linear-gradient(135deg,rgba(201,169,110,0.08),rgba(201,169,110,0.03))`,
            borderRadius: 18, padding: '18px 24px', border: `1px solid ${C.gold}25`,
            animation: `slideUp 0.6s ${i * 0.15}s both`,
            boxShadow: `inset 0 1px 0 rgba(201,169,110,0.1)`,
          }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{f.icon}</span>
            <p style={{ fontSize: 9, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: 7 }}>{f.label}</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontSize: 21, color: C.ivory }}>{f.name}</p>
          </div>
        </React.Fragment>
      ))}

      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 14, color: 'rgba(201,169,110,0.5)', marginTop: 18, letterSpacing: '0.1em' }}>
        Together, forever ♡
      </p>
    </div>
  </div>
);

/* ═══════════════ RSVP (Celebratory Deep Rose) ═════════════════════════════ */
const RSVPContent = () => {
  const [side, setSide] = useState(null); // 'bride' or 'groom'
  const [sent, setSent] = useState(false);

  const phone = side === 'bride' ? WD.phones.bride : WD.phones.groom;

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#280614 0%,#3E0C1E 50%,#1E0810 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PetalDrop colors={[C.rose, C.blush, '#FF99AA', 'rgba(212,118,138,0.7)', '#FFB8C8']} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 55% at 50% 40%,rgba(212,118,138,0.12) 0%,transparent 70%)`, pointerEvents: 'none' }} />
      <MandalaCorner corner="tl" size={190} color={C.rose} opacity={0.1} />
      <MandalaCorner corner="br" size={190} color={C.blush} opacity={0.08} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 400, padding: '0 24px', textAlign: 'center' }}>
        {/* Animated heart */}
        <div style={{ fontSize: 48, marginBottom: 10, animation: 'heartBeat 1.8s ease-in-out infinite' }}>💕</div>

        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 300, fontSize: 'clamp(30px,8vw,40px)', color: C.ivory, margin: '0 0 5px' }}>
          We can't wait
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: '#FF99AA', fontStyle: 'italic', marginBottom: 18 }}>
          to celebrate with you
        </p>

        <GoldDivider color={C.rose} my={0} />

        {!side ? (
          <div style={{ marginTop: 24, animation: 'fadeIn 0.5s' }}>
            <p style={{ fontSize: 12, letterSpacing: '0.15em', color: 'rgba(255,153,170,0.8)', textTransform: 'uppercase', marginBottom: 16 }}>
              Where are you joining us from?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setSide('bride')} style={{
                flex: 1, padding: '14px 10px', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.rose}40`,
                color: C.ivory, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, backdropFilter: 'blur(8px)', transition: 'all 0.3s'
              }}>
                <span style={{ fontSize: 24 }}>👰</span>
                <span style={{ fontSize: 13, fontFamily: "'Playfair Display',serif" }}>Bride's Side</span>
              </button>
              <button onClick={() => setSide('groom')} style={{
                flex: 1, padding: '14px 10px', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.rose}40`,
                color: C.ivory, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, backdropFilter: 'blur(8px)', transition: 'all 0.3s'
              }}>
                <span style={{ fontSize: 24 }}>🤵</span>
                <span style={{ fontSize: 13, fontFamily: "'Playfair Display',serif" }}>Groom's Side</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ animation: 'slideUp 0.4s both' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,153,170,0.7)', textTransform: 'uppercase', margin: '18px 0 8px' }}>
              Kindly RSVP by June 14, 2026
            </p>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: C.gold, marginBottom: 20, letterSpacing: '0.04em' }}>
                {phone}
              </p>
              <button onClick={() => setSide(null)} style={{ position: 'absolute', right: -30, top: '5px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 12 }}>
                <X size={14} />
              </button>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
              <a href={`tel:${phone}`} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '13px 22px', borderRadius: 9999,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                color: C.ivory, fontSize: 12, textDecoration: 'none', backdropFilter: 'blur(10px)',
              }}>
                <Phone size={14} /> Call
              </a>
              <a href={`https://wa.me/${phone.replace(/\s/g, '').replace(/^\+/, '')}?text=Hi!%20We%20are%20attending%20the%20wedding%20of%20${WD.brideName}%20and%20${WD.groomName}%20on%20${WD.weddingDate}!%20🎉`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '13px 22px', borderRadius: 9999,
                  background: `linear-gradient(135deg,${C.rose},${C.roseDark})`,
                  color: '#fff', fontSize: 12, textDecoration: 'none',
                  boxShadow: `0 8px 24px rgba(212,118,138,0.4)`, fontWeight: 500,
                }}>
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>

            {/* Confirm button */}
            <button onClick={() => setSent(true)} style={{
              background: 'transparent', border: `1px solid ${C.rose}40`,
              borderRadius: 9999, padding: '10px 24px',
              color: '#FF99AA', fontSize: 12, letterSpacing: '0.15em', cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {sent ? '✓ See you there! 💕' : '✦ Mark as Attending'}
            </button>
          </div>
        )}

        <p style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(201,169,110,0.5)', marginTop: 18 }}>
          with all our love 💕
        </p>
      </div>
    </div>
  );
};

/* ═══════════════ LIGHTBOX ════════════════════════════════════════════════ */
const Lightbox = ({ src, name, onClose }) => {
  useEffect(() => { const h = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s', backdropFilter: 'blur(10px)' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><X size={20} /></button>
      <img src={src} alt={name} onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 18, boxShadow: '0 40px 100px rgba(0,0,0,0.6)', border: `2px solid ${C.goldLight}` }} />
    </div>
  );
};

/* ═══════════════════════════ MAIN APP ════════════════════════════════════ */
const WeddingInvitation = () => {
  const scrollRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const slides = React.useMemo(() => ['cover', 'gallery', 'celebrations', ...WD.functions.map(f => f.id), 'venue', 'family', 'rsvp'], []);
  const total = slides.length;

  const handleEnter = () => { setIsExiting(true); setTimeout(() => setShowSplash(false), 900); };

  const scrollToSlideIndex = useCallback((idx) => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
  }, []);

  const go = useCallback((dir) => {
    scrollToSlideIndex(Math.max(0, Math.min(total - 1, currentSlide + dir)));
  }, [total, currentSlide, scrollToSlideIndex]);

  const goToSlide = useCallback((slideId) => {
    const idx = slides.indexOf(slideId); if (idx !== -1) scrollToSlideIndex(idx);
  }, [slides, scrollToSlideIndex]);

  const handleScroll = (e) => {
    const idx = Math.round(e.currentTarget.scrollTop / window.innerHeight);
    if (idx !== currentSlide) setCurrentSlide(idx);
  };

  const darkSlides = [...WD.functions.map(f => f.id), 'family', 'gallery', 'celebrations', 'venue', 'rsvp'];
  const isDark = darkSlides.includes(slides[currentSlide]);
  const navBg = isDark ? 'rgba(255,255,255,0.11)' : 'rgba(201,169,110,0.11)';
  const navIcon = isDark ? 'rgba(255,255,255,0.82)' : C.gold;
  const curFn = WD.functions.find(f => f.id === slides[currentSlide]);

  const renderSlide = (sid, idx) => {
    const fn = WD.functions.find(f => f.id === sid);
    if (fn) return <FunctionSlide fn={fn} isActive={idx === currentSlide} />;
    switch (sid) {
      case 'cover': return <CoverSlide currentSlide={currentSlide} totalSlides={total} />;
      case 'gallery': return <PhotoGallerySlide />;
      case 'celebrations': return <CelebrationsCard onGoToSlide={goToSlide} />;
      case 'venue':
        return <CardSlide sectionIcon="🏰" sectionName="Venue" accentColor={C.goldDeep} petalColors={[C.gold, C.goldLight, '#D4A853']}><VenueContent /></CardSlide>;
      case 'family':
        return <CardSlide sectionIcon="🙏" sectionName="With Blessings" accentColor={C.gold} petalColors={[C.gold, C.goldLight, C.blush]}><FamilyContent /></CardSlide>;
      case 'rsvp':
        return <CardSlide sectionIcon="💌" sectionName="RSVP" accentColor={C.rose} petalColors={[C.rose, C.blush, '#FF99AA']}><RSVPContent /></CardSlide>;
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{overflow:hidden;-webkit-font-smoothing:antialiased}

        @keyframes fadeIn    {from{opacity:0}to{opacity:1}}
        @keyframes slideUp   {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
        @keyframes scaleIn   {from{opacity:0;transform:scale(0.86)}to{opacity:1;transform:scale(1)}}
        @keyframes spinSlow  {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulseGlow {0%,100%{transform:scale(1)}50%{transform:scale(1.06);opacity:0.9}}
        @keyframes floatPetal{0%{opacity:0;transform:translateY(0) rotate(0deg)}10%{opacity:.7}90%{opacity:.4}100%{opacity:0;transform:translateY(110vh) rotate(360deg)}}
        @keyframes petalDrop {0%{opacity:0;transform:translateY(-16px) rotate(0deg)}10%{opacity:.7}100%{opacity:0;transform:translateY(110vh) rotate(720deg)}}
        @keyframes confetti  {0%{opacity:0;transform:translateY(-20px) rotate(0deg)}10%{opacity:.9}90%{opacity:.5}100%{opacity:0;transform:translateY(110vh) rotate(720deg)}}
        @keyframes splashExit{to{opacity:0;transform:scale(1.06)}}
        @keyframes fnRise    {0%{opacity:0;transform:translateY(0) scale(0.6) rotate(0deg)}15%{opacity:0.85}100%{opacity:0;transform:translateY(-130px) scale(1.3) rotate(200deg)}}
        @keyframes fnFloat   {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes glowPulse {0%,100%{opacity:1;box-shadow:none}50%{opacity:0.7;box-shadow:0 0 20px 4px currentColor}}
        @keyframes heartBeat {0%,100%{transform:scale(1)}14%{transform:scale(1.2)}28%{transform:scale(1)}42%{transform:scale(1.15)}70%{transform:scale(1)}}

        /* Wave bar scale animations for progress bar */
        @keyframes wSY1{from{transform:scaleY(1)}to{transform:scaleY(2.0)}}
        @keyframes wSY2{from{transform:scaleY(1)}to{transform:scaleY(2.4)}}
        @keyframes wSY3{from{transform:scaleY(1)}to{transform:scaleY(1.6)}}
        @keyframes wSY4{from{transform:scaleY(1)}to{transform:scaleY(2.1)}}
        @keyframes wSY5{from{transform:scaleY(1)}to{transform:scaleY(1.8)}}

        .nav-btn:hover{background:rgba(255,255,255,0.2)!important;transform:scale(1.1)}
        button, a { touch-action: manipulation; }
        ::-webkit-scrollbar{width:0}
        @media(min-width:768px){.kbd-hint{display:block!important}}
      `}</style>

      {showSplash && (
        <SplashScreen onEnter={handleEnter} isExiting={isExiting} />
      )}

      <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', background: C.charcoal }}>

        {/* Slide strip */}
        <div ref={scrollRef} onScroll={handleScroll} style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100dvh', overflowY: 'auto', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
          {slides.map((sid, idx) => (
            <div key={sid} style={{ width: '100vw', height: '100dvh', flexShrink: 0, scrollSnapAlign: 'start', position: 'relative' }}>{renderSlide(sid, idx)}</div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ position: 'fixed', bottom: 'calc(22px + env(safe-area-inset-bottom))', left: 16, right: 16, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="nav-btn" onClick={() => go(-1)} disabled={currentSlide === 0}
            style={{ padding: 10, borderRadius: '50%', border: 'none', cursor: currentSlide === 0 ? 'not-allowed' : 'pointer', background: navBg, color: navIcon, opacity: currentSlide === 0 ? 0.18 : 1, transition: 'all 0.3s', display: 'flex' }}>
            <ChevronUp size={20} />
          </button>

          {/* Emoji nav */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {slides.map((sid, i) => (
              <button key={i} onClick={() => scrollToSlideIndex(i)} style={{
                border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px 1px',
                fontSize: i === currentSlide ? '14px' : '8px', opacity: i === currentSlide ? 1 : 0.3,
                transition: 'all 0.35s ease', lineHeight: 1, filter: i === currentSlide ? 'none' : 'grayscale(1)',
              }}>
                {NAV_SYMBOLS[sid] || '•'}
              </button>
            ))}
          </div>

          <button className="nav-btn" onClick={() => go(1)} disabled={currentSlide === total - 1}
            style={{ padding: 10, borderRadius: '50%', border: 'none', cursor: currentSlide === total - 1 ? 'not-allowed' : 'pointer', background: navBg, color: navIcon, opacity: currentSlide === total - 1 ? 0.18 : 1, transition: 'all 0.3s', display: 'flex' }}>
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Function badge */}
        {curFn && (
          <div key={curFn.id} style={{
            position: 'fixed', top: 18, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
            padding: '4px 14px', borderRadius: 9999, background: 'rgba(0,0,0,0.36)', backdropFilter: 'blur(10px)',
            border: `1px solid ${curFn.palette.accent}38`, color: curFn.palette.accent,
            fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', animation: 'fadeIn 0.35s both', whiteSpace: 'nowrap',
          }}>
            {curFn.emoji} {curFn.name}
          </div>
        )}

        <div className="kbd-hint" style={{ position: 'fixed', top: 26, left: 16, zIndex: 50, fontSize: 9, color: navIcon, opacity: 0.3, letterSpacing: '0.1em', display: 'none' }}>
          ↑ ↓ arrow keys
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} name={lightbox.name} onClose={() => setLightbox(null)} />}
    </>
  );
};

export default WeddingInvitation;
