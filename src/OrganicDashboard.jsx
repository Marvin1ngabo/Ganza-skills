import { useState, useEffect } from 'react';
import { Brain, Zap, Users, Target, Shield, Sparkles, Activity, TrendingUp, Award, Clock, ChevronRight, Menu, X } from 'lucide-react';

export default function OrganicDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeShard, setActiveShard] = useState(null);
  const [isDockOpen, setIsDockOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const organicShards = [
    {
      id: 'skills',
      title: 'Neural Skills',
      value: '87%',
      change: '+12%',
      icon: Brain,
      color: 'cyan',
      position: { top: '15%', left: '10%', rotation: '-15deg', scale: 1 },
      shape: 'blob1'
    },
    {
      id: 'activity',
      title: 'Quantum Activity',
      value: '2,847',
      change: '+234',
      icon: Activity,
      color: 'violet',
      position: { top: '25%', right: '15%', rotation: '20deg', scale: 0.9 },
      shape: 'blob2'
    },
    {
      id: 'network',
      title: 'Neural Network',
      value: '1,293',
      change: '+89',
      icon: Users,
      color: 'purple',
      position: { bottom: '30%', left: '8%', rotation: '-10deg', scale: 1.1 },
      shape: 'blob3'
    },
    {
      id: 'targets',
      title: 'Target Matrix',
      value: '94%',
      change: '+5%',
      icon: Target,
      color: 'cyan',
      position: { bottom: '20%', right: '12%', rotation: '15deg', scale: 0.85 },
      shape: 'blob4'
    },
    {
      id: 'shield',
      title: 'Security Core',
      value: '100%',
      change: 'Active',
      icon: Shield,
      color: 'violet',
      position: { top: '45%', left: '5%', rotation: '-25deg', scale: 0.95 },
      shape: 'blob5'
    },
    {
      id: 'spark',
      title: 'Energy Flow',
      value: '8.2kW',
      change: '+0.8kW',
      icon: Zap,
      color: 'purple',
      position: { top: '55%', right: '8%', rotation: '30deg', scale: 1.05 },
      shape: 'blob6'
    }
  ];

  const radialData = [
    { label: 'Technical', value: 87, color: '#06b6d4' },
    { label: 'Creative', value: 72, color: '#8b5cf6' },
    { label: 'Leadership', value: 91, color: '#a855f7' },
    { label: 'Analytics', value: 68, color: '#06b6d4' },
    { label: 'Strategy', value: 85, color: '#8b5cf6' },
    { label: 'Innovation', value: 79, color: '#a855f7' }
  ];

  const floatingIcons = [
    { icon: Brain, position: { top: '10%', left: '20%' }, delay: 0 },
    { icon: Zap, position: { top: '15%', right: '25%' }, delay: 1 },
    { icon: Users, position: { bottom: '20%', left: '15%' }, delay: 2 },
    { icon: Target, position: { bottom: '15%', right: '20%' }, delay: 3 },
    { icon: Shield, position: { top: '50%', left: '10%' }, delay: 4 },
    { icon: Sparkles, position: { top: '45%', right: '10%' }, delay: 5 }
  ];

  const getBlobPath = (shape) => {
    const paths = {
      blob1: "M 150,50 Q 200,30 250,50 T 300,100 Q 280,150 250,180 Q 200,200 150,180 Q 100,150 100,100 Q 120,70 150,50",
      blob2: "M 100,80 Q 150,60 200,80 T 250,130 Q 230,180 200,210 Q 150,230 100,210 Q 50,180 50,130 Q 70,100 100,80",
      blob3: "M 120,60 Q 180,40 240,60 T 280,120 Q 260,180 240,220 Q 180,240 120,220 Q 80,180 80,120 Q 100,80 120,60",
      blob4: "M 110,70 Q 160,50 210,70 T 260,130 Q 240,190 210,230 Q 160,250 110,230 Q 60,190 60,130 Q 80,90 110,70",
      blob5: "M 130,55 Q 190,35 250,55 T 290,115 Q 270,175 250,215 Q 190,235 130,215 Q 90,175 90,115 Q 110,75 130,55",
      blob6: "M 105,75 Q 155,55 205,75 T 255,135 Q 235,195 205,235 Q 155,255 105,235 Q 55,195 55,135 Q 75,95 105,75"
    };
    return paths[shape] || paths.blob1;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Deep liquid obsidian background with parallax layers */}
      <div className="absolute inset-0">
        {/* Base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        
        {/* Parallax depth layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-cyan-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/5 via-transparent to-cyan-900/5"></div>
        
        {/* Liquid texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3C/defs%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>

      {/* Floating 3D holographic icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute z-20"
          style={{
            ...item.position,
            animation: `float ${6 + index}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-500/30">
              <item.icon className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      ))}

      {/* Central Radial Chart */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="relative w-80 h-80">
          {/* Pulsing outer rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border border-violet-500/30 animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-4 rounded-full border border-purple-500/30 animate-ping" style={{ animationDelay: '2s' }}></div>
          
          {/* Main radial container */}
          <div className="absolute inset-8 rounded-full bg-black/40 backdrop-blur-xl border border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            {/* Radial segments */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {radialData.map((segment, index) => {
                const angle = (segment.value / 100) * 360;
                const startAngle = index * 60;
                const endAngle = startAngle + angle;
                
                const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                return (
                  <path
                    key={index}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={segment.color}
                    fillOpacity="0.3"
                    stroke={segment.color}
                    strokeWidth="2"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                );
              })}
              
              {/* Center circle */}
              <circle cx="100" cy="100" r="30" fill="black" fillOpacity="0.8" />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="24" fontWeight="bold">
                87%
              </text>
            </svg>
            
            {/* Glowing center core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Organic Cell Shards */}
      {organicShards.map((shard) => (
        <div
          key={shard.id}
          className={`absolute z-40 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            ...shard.position,
            transform: `rotate(${shard.position.rotation}) scale(${shard.position.scale})`,
            animationDelay: `${organicShards.indexOf(shard) * 0.1}s`
          }}
          onMouseEnter={() => setActiveShard(shard.id)}
          onMouseLeave={() => setActiveShard(null)}
        >
          <div className={`relative transition-all duration-300 ${activeShard === shard.id ? 'scale-110 z-50' : ''}`}>
            {/* SVG Blob Shape */}
            <svg
              width="300"
              height="250"
              className="drop-shadow-2xl"
              style={{ filter: `drop-shadow(0 0 30px ${shard.color === 'cyan' ? '#06b6d4' : '#8b5cf6'}40)` }}
            >
              <defs>
                <linearGradient id={`gradient-${shard.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={shard.color === 'cyan' ? '#06b6d4' : '#8b5cf6'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={shard.color === 'cyan' ? '#a855f7' : '#06b6d4'} stopOpacity="0.1" />
                </linearGradient>
                <filter id={`glow-${shard.id}`}>
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d={getBlobPath(shard.shape)}
                fill={`url(#gradient-${shard.id})`}
                stroke={shard.color === 'cyan' ? '#06b6d4' : '#8b5cf6'}
                strokeWidth="2"
                fillOpacity="0.8"
                filter={`url(#glow-${shard.id})`}
                className="backdrop-blur-sm"
              />
            </svg>
            
            {/* Content inside shard */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${shard.color === 'cyan' ? 'from-cyan-500/30 to-cyan-600/30' : 'from-violet-500/30 to-violet-600/30'} flex items-center justify-center mb-3 backdrop-blur-sm border ${shard.color === 'cyan' ? 'border-cyan-500/30' : 'border-violet-500/30'}`}>
                <shard.icon className={`w-6 h-6 ${shard.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{shard.title}</h3>
              <div className="text-3xl font-bold text-white mb-1">{shard.value}</div>
              <div className={`text-sm ${shard.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'} flex items-center gap-1`}>
                <TrendingUp className="w-3 h-3" />
                {shard.change}
              </div>
            </div>
            
            {/* Hover glow effect */}
            {activeShard === shard.id && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-xl animate-pulse"></div>
            )}
          </div>
        </div>
      ))}

      {/* Floating Curved Side Dock */}
      <div className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${isDockOpen ? 'translate-x-0' : 'translate-x-64'}`}>
        {/* Dock Container */}
        <div className="relative">
          {/* Curved Background */}
          <svg width="280" height="400" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="dockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
              <filter id="dockGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 20,50 Q 0,200 20,350 L 260,350 Q 280,200 260,50 Z"
              fill="url(#dockGradient)"
              stroke="#06b6d4"
              strokeWidth="2"
              fillOpacity="0.8"
              filter="url(#dockGlow)"
              className="backdrop-blur-xl"
            />
          </svg>
          
          {/* Dock Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 p-8">
            <div className="text-center mb-4">
              <h3 className="text-white font-bold text-lg mb-1">Neural Core</h3>
              <p className="text-gray-400 text-sm">System Interface</p>
            </div>
            
            {/* Navigation Items */}
            {[
              { icon: Brain, label: 'Skills', active: true },
              { icon: Activity, label: 'Activity', active: false },
              { icon: Users, label: 'Network', active: false },
              { icon: Target, label: 'Targets', active: false },
              { icon: Shield, label: 'Security', active: false }
            ].map((item, index) => (
              <button
                key={index}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  item.active 
                    ? 'bg-gradient-to-br from-cyan-500 to-violet-500 shadow-lg shadow-cyan-500/50' 
                    : 'bg-white/10 hover:bg-white/20 border border-cyan-500/30'
                }`}
              >
                <item.icon className={`w-6 h-6 ${item.active ? 'text-black' : 'text-cyan-400'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dock Toggle Button */}
      <button
        onClick={() => setIsDockOpen(!isDockOpen)}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-all duration-300"
      >
        {isDockOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
      </button>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          75% {
            transform: translateY(10px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
}
