import { useState, useEffect } from 'react';
import { Brain, Zap, Users, Target, Shield, Sparkles, ArrowRight, LogIn, User, Lock, Mail, Menu, X, Activity, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeShard, setActiveShard] = useState(null);

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
      position: { top: '15%', left: '8%', rotation: '-15deg', scale: 0.9 },
      shape: 'blob1'
    },
    {
      id: 'activity',
      title: 'Quantum Activity',
      value: '2,847',
      change: '+234',
      icon: Activity,
      color: 'violet',
      position: { top: '25%', right: '12%', rotation: '20deg', scale: 0.85 },
      shape: 'blob2'
    },
    {
      id: 'network',
      title: 'Neural Network',
      value: '1,293',
      change: '+89',
      icon: Users,
      color: 'purple',
      position: { bottom: '30%', left: '6%', rotation: '-10deg', scale: 1 },
      shape: 'blob3'
    }
  ];

  const getBlobPath = (shape) => {
    const paths = {
      blob1: "M 150,50 Q 200,30 250,50 T 300,100 Q 280,150 250,180 Q 200,200 150,180 Q 100,150 100,100 Q 120,70 150,50",
      blob2: "M 100,80 Q 150,60 200,80 T 250,130 Q 230,180 200,210 Q 150,230 100,210 Q 50,180 50,130 Q 70,100 100,80",
      blob3: "M 120,60 Q 180,40 240,60 T 280,120 Q 260,180 240,220 Q 180,240 120,220 Q 80,180 80,120 Q 100,80 120,60"
    };
    return paths[shape] || paths.blob1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLoginMode ? 'Login' : 'Signup', { email, password });
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

      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              SkillTree
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Organic Layout */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Login Card - Organic Shape */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* SVG Blob Shape for Login Card */}
              <svg
                width="400"
                height="450"
                className="drop-shadow-2xl"
                style={{ 
                  filter: "drop-shadow(0 0 40px #06b6d440)",
                  transform: "rotate(-5deg)"
                }}
              >
                <defs>
                  <linearGradient id="loginGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="loginGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 100,50 Q 150,30 200,50 T 300,100 Q 280,150 250,180 Q 200,200 150,180 Q 100,150 100,100 Q 120,70 150,50"
                  fill="url(#loginGradient)"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  fillOpacity="0.8"
                  filter="url(#loginGlow)"
                  className="backdrop-blur-xl"
                />
              </svg>
              
              {/* Login Form Inside */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    {isLoginMode ? 'Welcome Back' : 'Join SkillTree'}
                  </h1>
                  <p className="text-gray-400">
                    {isLoginMode 
                      ? 'Enter your neural credentials to access your skill universe' 
                      : 'Start your journey to mastering new skills'
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
                        placeholder="•••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoginMode ? (
                      <>
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => setIsLoginMode(!isLoginMode)}
                      className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      {isLoginMode ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Organic Feature Shards */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {organicShards.map((shard) => (
              <div
                key={shard.id}
                className={`relative transition-all duration-700 ${activeShard === shard.id ? 'scale-110 z-50' : ''}`}
                style={{
                  ...shard.position,
                  transform: `rotate(${shard.position.rotation}) scale(${shard.position.scale})`,
                  animationDelay: `${organicShards.indexOf(shard) * 0.1}s`
                }}
                onMouseEnter={() => setActiveShard(shard.id)}
                onMouseLeave={() => setActiveShard(null)}
              >
                <div className="relative">
                  {/* SVG Blob Shape */}
                  <svg
                    width="300"
                    height="200"
                    className="drop-shadow-2xl"
                    style={{ 
                      filter: `drop-shadow(0 0 30px ${shard.color === 'cyan' ? '#06b6d4' : '#8b5cf6'}40)` 
                    }}
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${shard.color === 'cyan' ? 'from-cyan-500/30 to-cyan-600/30' : 'from-violet-500/30 to-violet-600/30'} flex items-center justify-center mb-3 backdrop-blur-sm border ${shard.color === 'cyan' ? 'border-cyan-500/30' : 'border-violet-500/30'}`}>
                      <shard.icon className={`w-6 h-6 ${shard.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`} />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">{shard.title}</h3>
                    <div className="text-2xl font-bold text-white mb-1">{shard.value}</div>
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
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Skills?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals already leveling up their careers
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all flex items-center gap-2 mx-auto">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 SkillTree. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
