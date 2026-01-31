'use client';

import { useState, useEffect, useMemo } from 'react';
import { LifeGrid } from './LifeGrid';
import { getGoldPrice, getCurrentGoldPrice, calculateGoldGrowth } from '@/data/goldPrices';
import { getBitcoinPrice, getCurrentBitcoinPrice, calculateBitcoinGrowth, bitcoinExisted } from '@/data/bitcoinPrices';
import { 
  Calendar, 
  Clock,
  Hourglass, 
  TrendingUp,
  Heart, 
  Wind, 
  Eye,
  Sunrise,
  Moon,
  TreeDeciduous,
  Settings2,
  LayoutGrid,
  Radio,
  Coins
} from 'lucide-react';

interface Props {
  birthdate: Date;
  onReset: () => void;
}

const LIFESPAN = 78.5;
const GAP = '24px';

// Reusable styles
const cardStyle: React.CSSProperties = {
  background: 'rgba(10, 10, 10, 0.6)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '24px',
  padding: '32px',
};

const iconBoxStyle: React.CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  background: 'rgba(217, 119, 6, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '28px',
};

const listRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '18px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
};

const listRowLastStyle: React.CSSProperties = {
  ...listRowStyle,
  borderBottom: 'none',
  paddingBottom: 0,
};

const listRowFirstStyle: React.CSSProperties = {
  ...listRowStyle,
  paddingTop: 0,
};

type AssetType = 'gold' | 'bitcoin';

export function ExistenceView({ birthdate, onReset }: Props) {
  const [now, setNow] = useState(new Date());
  const [ready, setReady] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetType>('gold');

  useEffect(() => {
    setReady(true);
    const t = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(t);
  }, []);

  const d = useMemo(() => {
    const ms = now.getTime() - birthdate.getTime();
    const mins = Math.floor(ms / 60000);
    const days = Math.floor(ms / 86400000);
    const years = ms / (365.25 * 24 * 60 * 60 * 1000);
    const total = LIFESPAN * 365.25 * 24 * 60 * 60 * 1000;
    
    const birthYear = birthdate.getFullYear();
    
    // Gold calculations
    const goldAtBirth = getGoldPrice(birthYear);
    const goldNow = getCurrentGoldPrice();
    const goldGrowthPct = ((goldNow - goldAtBirth) / goldAtBirth) * 100;
    const gold100Investment = calculateGoldGrowth(100, birthYear);
    
    // Bitcoin calculations (only if born after 2009)
    const btcExists = bitcoinExisted(birthYear);
    const btcAtBirth = btcExists ? getBitcoinPrice(birthYear) : null;
    const btcNow = getCurrentBitcoinPrice();
    const btcGrowthPct = btcAtBirth ? ((btcNow - btcAtBirth) / btcAtBirth) * 100 : null;
    const btc100Investment = btcExists ? calculateBitcoinGrowth(100, birthYear) : null;
    
    return {
      secs: Math.floor(ms / 1000),
      days,
      weeks: Math.floor(days / 7),
      years,
      left: Math.max(0, Math.floor((total - ms) / 86400000)),
      pct: Math.min((ms / total) * 100, 100),
      heart: Math.floor(mins * 72),
      breath: Math.floor(mins * 16),
      blink: Math.floor(mins * 17),
      sun: days,
      moon: Math.floor(days / 29.53),
      season: Math.floor(years * 4),
      birthYear,
      // Gold data
      goldAtBirth,
      goldNow,
      goldGrowthPct,
      gold100Investment,
      // Bitcoin data
      btcExists,
      btcAtBirth,
      btcNow,
      btcGrowthPct,
      btc100Investment,
    };
  }, [now, birthdate]);

  const f = (n: number) => n.toLocaleString();

  // Get current asset data based on selection
  const assetData = useMemo(() => {
    if (selectedAsset === 'bitcoin') {
      return {
        name: 'Bitcoin',
        symbol: '₿',
        atBirth: d.btcAtBirth,
        now: d.btcNow,
        growthPct: d.btcGrowthPct,
        investment100: d.btc100Investment,
        available: d.btcExists,
        color: '#F7931A', // Bitcoin orange
        bgColor: 'rgba(247, 147, 26, 0.06)',
        borderColor: 'rgba(247, 147, 26, 0.15)',
        iconBgColor: 'rgba(247, 147, 26, 0.12)',
      };
    }
    return {
      name: 'Gold',
      symbol: '$',
      atBirth: d.goldAtBirth,
      now: d.goldNow,
      growthPct: d.goldGrowthPct,
      investment100: d.gold100Investment,
      available: true,
      color: '#D97706', // Gold/amber
      bgColor: 'rgba(217, 119, 6, 0.06)',
      borderColor: 'rgba(217, 119, 6, 0.15)',
      iconBgColor: 'rgba(217, 119, 6, 0.12)',
    };
  }, [selectedAsset, d]);

  if (!ready) return null;

  return (
    <div className="min-h-screen grid-pattern" style={{ padding: '48px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header className="animate-fadeInUp" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div>
            <h1 className="font-display gradient-text glow-text" style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 800, lineHeight: 1 }}>
              EXISTENCE
            </h1>
            <p style={{ color: '#78716C', marginTop: '12px', fontSize: '16px' }}>
              Born {birthdate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button 
            onClick={onReset}
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(10, 10, 10, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              cursor: 'pointer',
            }}
          >
            <Settings2 style={{ width: '22px', height: '22px', color: '#78716C' }} />
          </button>
        </header>

        {/* HERO: LIVE SECONDS */}
        <section 
          className="animate-fadeInUp" 
          style={{ 
            ...cardStyle,
            background: 'rgba(217, 119, 6, 0.04)',
            border: '1px solid rgba(217, 119, 6, 0.2)',
            boxShadow: '0 0 60px rgba(217, 119, 6, 0.1)',
            textAlign: 'center',
            padding: '48px 32px',
            marginBottom: GAP,
            animationDelay: '100ms',
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderRadius: '100px',
            background: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            marginBottom: '36px',
          }}>
            <Radio style={{ width: '16px', height: '16px', color: '#D97706' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live</span>
          </div>
          
          <div className="stat-number" style={{ 
            fontSize: 'clamp(56px, 14vw, 110px)', 
            fontWeight: 800, 
            lineHeight: 1,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            {f(d.secs)}
          </div>
          
          <p style={{ color: '#78716C', fontSize: '18px', marginTop: '24px' }}>seconds alive</p>
        </section>

        {/* 3 STAT CARDS */}
        <section 
          className="animate-fadeInUp" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: GAP,
            marginBottom: GAP,
            animationDelay: '200ms',
          }}
        >
          {[
            { icon: Calendar, value: d.years.toFixed(2), label: 'Years old' },
            { icon: Clock, value: f(d.days), label: 'Days lived' },
            { icon: Hourglass, value: f(d.left), label: 'Days remaining' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} style={{ ...cardStyle, textAlign: 'center' }}>
              <div style={{ ...iconBoxStyle, margin: '0 auto 20px' }}>
                <Icon style={{ width: '24px', height: '24px', color: '#D97706' }} />
              </div>
              <div className="stat-number" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800 }}>{value}</div>
              <p style={{ color: '#78716C', marginTop: '12px', fontSize: '15px', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </section>

        {/* PROGRESS */}
        <section className="animate-fadeInUp" style={{ ...cardStyle, marginBottom: GAP, animationDelay: '300ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <TrendingUp style={{ width: '22px', height: '22px', color: '#D97706' }} />
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '18px', color: '#FAFAFA' }}>Life Progress</span>
            </div>
            <span className="stat-number" style={{ fontSize: '24px', fontWeight: 700 }}>{d.pct.toFixed(1)}%</span>
          </div>
          <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${d.pct}%`, 
              background: 'linear-gradient(90deg, #D97706, #F59E0B)',
              borderRadius: '5px',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </section>

        {/* 2-COL: BODY + WITNESSED */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: GAP, marginBottom: GAP }}>
          
          {/* Body */}
          <div className="animate-fadeInUp" style={{ ...cardStyle, animationDelay: '400ms' }}>
            <div style={sectionHeaderStyle}>
              <div style={iconBoxStyle}>
                <Heart style={{ width: '24px', height: '24px', color: '#D97706' }} />
              </div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '20px', color: '#FAFAFA' }}>Your Body</h2>
            </div>
            
            {[
              { icon: Heart, label: 'Heartbeats', value: f(d.heart) },
              { icon: Wind, label: 'Breaths', value: f(d.breath) },
              { icon: Eye, label: 'Blinks', value: f(d.blink) },
            ].map(({ icon: Icon, label, value }, i, arr) => (
              <div key={label} style={i === 0 ? listRowFirstStyle : i === arr.length - 1 ? listRowLastStyle : listRowStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Icon style={{ width: '20px', height: '20px', color: '#78716C' }} />
                  <span style={{ color: '#D4D4D8', fontSize: '16px' }}>{label}</span>
                </div>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '17px', color: '#FAFAFA' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Witnessed */}
          <div className="animate-fadeInUp" style={{ ...cardStyle, animationDelay: '500ms' }}>
            <div style={sectionHeaderStyle}>
              <div style={iconBoxStyle}>
                <Sunrise style={{ width: '24px', height: '24px', color: '#D97706' }} />
              </div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '20px', color: '#FAFAFA' }}>You&apos;ve Witnessed</h2>
            </div>
            
            {[
              { icon: Sunrise, label: 'Sunrises', value: f(d.sun) },
              { icon: Moon, label: 'Full moons', value: f(d.moon) },
              { icon: TreeDeciduous, label: 'Seasons', value: f(d.season) },
            ].map(({ icon: Icon, label, value }, i, arr) => (
              <div key={label} style={i === 0 ? listRowFirstStyle : i === arr.length - 1 ? listRowLastStyle : listRowStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Icon style={{ width: '20px', height: '20px', color: '#78716C' }} />
                  <span style={{ color: '#D4D4D8', fontSize: '16px' }}>{label}</span>
                </div>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '17px', color: '#FAFAFA' }}>{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ASSET SECTION (GOLD / BITCOIN TOGGLE) */}
        <section className="animate-fadeInUp" style={{ ...cardStyle, marginBottom: GAP, animationDelay: '550ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ ...iconBoxStyle, background: assetData.iconBgColor }}>
                <Coins style={{ width: '24px', height: '24px', color: assetData.color }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '20px', color: '#FAFAFA' }}>
                  {assetData.name} Over Your Lifetime
                </h2>
                <p style={{ color: '#78716C', fontSize: '14px', marginTop: '6px' }}>
                  {selectedAsset === 'gold' ? 'Price per troy ounce (USD)' : 'Price per coin (USD)'}
                </p>
              </div>
            </div>
            
            {/* Toggle */}
            <div style={{ 
              display: 'flex', 
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '4px',
            }}>
              <button
                onClick={() => setSelectedAsset('gold')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: selectedAsset === 'gold' ? 'rgba(217, 119, 6, 0.2)' : 'transparent',
                  color: selectedAsset === 'gold' ? '#D97706' : '#78716C',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Gold
              </button>
              <button
                onClick={() => setSelectedAsset('bitcoin')}
                disabled={!d.btcExists}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: selectedAsset === 'bitcoin' ? 'rgba(247, 147, 26, 0.2)' : 'transparent',
                  color: !d.btcExists ? '#3f3f46' : selectedAsset === 'bitcoin' ? '#F7931A' : '#78716C',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: d.btcExists ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                }}
              >
                Bitcoin {!d.btcExists && '(2009+)'}
              </button>
            </div>
          </div>
          
          {assetData.available && assetData.atBirth !== null ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
                <div style={{ 
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}>
                  <p style={{ color: '#78716C', fontSize: '14px', marginBottom: '8px' }}>When you were born ({d.birthYear})</p>
                  <p className="stat-number" style={{ fontSize: '28px', fontWeight: 700 }}>
                    ${assetData.atBirth < 1 ? assetData.atBirth.toFixed(4) : f(Math.round(assetData.atBirth))}
                  </p>
                </div>
                <div style={{ 
                  padding: '24px',
                  borderRadius: '16px',
                  background: assetData.bgColor,
                  border: `1px solid ${assetData.borderColor}`,
                }}>
                  <p style={{ color: '#78716C', fontSize: '14px', marginBottom: '8px' }}>Today</p>
                  <p className="stat-number" style={{ fontSize: '28px', fontWeight: 700 }}>${f(Math.round(assetData.now))}</p>
                </div>
              </div>
              
              <div style={{ 
                padding: '20px 24px',
                borderRadius: '12px',
                background: assetData.growthPct && assetData.growthPct > 0 ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                border: `1px solid ${assetData.growthPct && assetData.growthPct > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ color: '#D4D4D8', fontSize: '15px' }}>
                    If you&apos;d invested <span style={{ fontWeight: 700 }}>$100</span> in {assetData.name.toLowerCase()} at birth...
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="stat-number" style={{ 
                    fontSize: '24px', 
                    fontWeight: 700,
                    color: assetData.growthPct && assetData.growthPct > 0 ? '#22C55E' : '#EF4444',
                  }}>
                    ${assetData.investment100 ? f(Math.round(assetData.investment100)) : '0'}
                  </p>
                  <p style={{ 
                    fontSize: '13px', 
                    color: assetData.growthPct && assetData.growthPct > 0 ? '#22C55E' : '#EF4444',
                    fontWeight: 600,
                  }}>
                    {assetData.growthPct ? (assetData.growthPct > 0 ? '+' : '') + f(Math.round(assetData.growthPct)) + '%' : '0%'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div style={{ 
              padding: '40px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              textAlign: 'center',
            }}>
              <p style={{ color: '#78716C', fontSize: '16px' }}>
                Bitcoin didn&apos;t exist when you were born. It was created in 2009.
              </p>
            </div>
          )}
        </section>

        {/* LIFE GRID */}
        <section className="animate-fadeInUp" style={{ ...cardStyle, animationDelay: '600ms' }}>
          <div style={sectionHeaderStyle}>
            <div style={iconBoxStyle}>
              <LayoutGrid style={{ width: '24px', height: '24px', color: '#D97706' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '20px', color: '#FAFAFA' }}>Your Life in Weeks</h2>
              <p style={{ color: '#78716C', fontSize: '14px', marginTop: '6px' }}>
                {f(Math.ceil(LIFESPAN * 52))} weeks · Each cell = 1 week
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '28px', marginBottom: '24px' }}>
            {[
              { cls: 'week-lived', label: 'Lived' },
              { cls: 'week-now', label: 'Now' },
              { cls: 'week-future', label: 'Future' },
            ].map(({ cls, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className={`week ${cls}`} style={{ width: '14px', height: '14px', borderRadius: '3px' }} />
                <span style={{ fontSize: '14px', color: '#A8A29E' }}>{label}</span>
              </div>
            ))}
          </div>
          
          <LifeGrid weeks={d.weeks} total={Math.ceil(LIFESPAN * 52)} />
        </section>

        {/* FOOTER */}
        <footer className="animate-fadeInUp" style={{ textAlign: 'center', padding: '48px 0', animationDelay: '700ms' }}>
          <p style={{ color: '#78716C', fontStyle: 'italic', fontSize: '17px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            &ldquo;It is not the years in your life that count. It is the life in your years.&rdquo;
          </p>
          <p style={{ color: '#57534E', fontSize: '14px', marginTop: '16px' }}>— Abraham Lincoln</p>
        </footer>
      </div>
    </div>
  );
}
