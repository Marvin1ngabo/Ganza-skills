import { useState, useEffect } from 'react';
import { Brain, Zap, Users, Target, Shield, Sparkles, ArrowRight, LogIn, User, Lock, Mail } from 'lucide-react';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log(isLoginMode ? 'Login' : 'Signup', { email, password });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background with deep obsidian gradients and ambient glows */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        
        {/* Ambient purple glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Ambient teal glow */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
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

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: 3D Holographic Skill Sphere */}
          <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-96 h-96 mx-auto">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Main sphere container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 shadow-2xl overflow-hidden">
                
                {/* Inner data points network */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Central core */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse"></div>
                    
                    {/* Orbiting data points */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-4 bg-gradient-to-br from-cyan-300 to-teal-400 rounded-full shadow-lg shadow-cyan-400/50"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 45}deg) translateX(120px) rotate(-${i * 45}deg)`,
                          animation: `orbit ${4 + i * 0.5}s linear infinite`
                        }}
                      >
                        <div className="w-full h-full bg-cyan-400 rounded-full animate-ping"></div>
                      </div>
                    ))}
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      {[...Array(8)].map((_, i) => (
                        <line
                          key={i}
                          x1="50%"
                          y1="50%"
                          x2={`${50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}%`}
                          y2={`${50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}%`}
                          stroke="url(#gradient)"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                      ))}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                
                {/* Holographic effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/10 to-transparent opacity-50 animate-pulse"></div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold shadow-lg animate-bounce">
                AI Powered
              </div>
              
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full text-xs font-bold shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                Real-time
              </div>
            </div>
          </div>

          {/* Right: Login Card with Glassmorphism */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20">
              
              {/* Card header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  {isLoginMode ? 'Welcome Back' : 'Join SkillTree'}
                </h1>
                <p className="text-gray-400">
                  {isLoginMode 
                    ? 'Enter your credentials to access your skill universe' 
                    : 'Start your journey to mastering new skills'
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
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
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
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

              {/* Toggle between login/signup */}
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

              {/* Social login options */}
              <div className="mt-8 pt-6 border-t border-cyan-500/20">
                <p className="text-center text-gray-400 text-sm mb-4">Or continue with</p>
                <div className="flex gap-4">
                  <button className="flex-1 py-2 bg-white/10 border border-cyan-500/20 rounded-xl hover:bg-white/20 transition-all">
                    <span className="text-sm">Google</span>
                  </button>
                  <button className="flex-1 py-2 bg-white/10 border border-cyan-500/20 rounded-xl hover:bg-white/20 transition-all">
                    <span className="text-sm">GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Why Choose SkillTree?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the future of skill development with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Personalized skill recommendations based on your goals and learning patterns"
              },
              {
                icon: Target,
                title: "Precision Tracking",
                description: "Monitor your progress with detailed analytics and insights"
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Connect with peers and learn from the best in the field"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security for your data and achievements"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance for seamless learning experience"
              },
              {
                icon: Sparkles,
                title: "Gamified Experience",
                description: "Earn badges, compete, and make learning fun"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-cyan-500/20 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
