import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Zap, TrendingUp, MessageSquare, ArrowRight, Star, CheckCircle } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
  onExploreCourses: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLogin, onRegister, onExploreCourses }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Rich Course Content',
      description: 'Create and organize engaging courses with modules, materials, and multimedia content.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Foster interaction through discussion forums and real-time collaboration tools.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Advanced Grading',
      description: 'Streamlined assignment submission and grading workflow with detailed feedback.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track learning progress and performance with intuitive dashboards and metrics.',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Corporate Trainer',
      avatar: 'SC',
      content: 'Mayura LMS has transformed how we deliver training. The intuitive interface and powerful features make course creation a breeze.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Learning & Development Lead',
      avatar: 'MR',
      content: 'The grading workflow is exceptional. I can provide detailed feedback quickly, and trainees love the interactive course experience.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'HR Manager',
      avatar: 'EW',
      content: 'Our team adoption rate was incredible. The clean design and smooth animations make learning engaging and enjoyable.',
      rating: 5
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Learners' },
    { value: '500+', label: 'Courses Created' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-amber-500/20 shadow-lg shadow-amber-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3 holographic-text">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Mayura LMS
                </h1>
                <p className="text-xs text-slate-400 tracking-wider">Learning Excellence</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={onExploreCourses}
                className="text-slate-300 hover:text-amber-400 transition-colors font-medium group"
              >
                <span className="relative">
                  Explore Courses
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>
              <a href="#features" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">
                Testimonials
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onLogin}
                className="px-5 py-2 text-slate-300 hover:text-white font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onRegister}
                className="relative group px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-white overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-amber-400 text-sm font-medium">Next-Generation Learning Platform</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                Transform Learning
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent animate-gradient">
                Into Excellence
              </span>
            </h2>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-delayed">
              Empower your organization with a cutting-edge learning management system designed for modern training needs.
              Create, deliver, and track exceptional learning experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={onRegister}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={onExploreCourses}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-amber-500/50 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
              >
                Explore Courses
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/30 transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Modern Learning</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to create, deliver, and manage exceptional learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group relative bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
                  activeFeature === idx
                    ? 'border-amber-500/50 shadow-xl shadow-amber-500/20 scale-105'
                    : 'border-slate-700 hover:border-amber-500/30'
                }`}
                onMouseEnter={() => setActiveFeature(idx)}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8">
              <CheckCircle className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Lightning Fast</h4>
              <p className="text-slate-400">Optimized performance ensures smooth, instant interactions across all features.</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <MessageSquare className="w-10 h-10 text-cyan-500 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Real-time Collaboration</h4>
              <p className="text-slate-400">Engage with discussions, live updates, and instant feedback mechanisms.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
              <Award className="w-10 h-10 text-green-500 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Certification Ready</h4>
              <p className="text-slate-400">Track achievements and generate completion certificates automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Learning
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Professionals</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              See what trainers and organizations are saying about Mayura LMS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-amber-500/30 transition-all hover:scale-105"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-600/10 to-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Training Programs?</span>
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of organizations using Mayura LMS to deliver exceptional learning experiences
              </p>
              <button
                onClick={onRegister}
                className="group relative inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Mayura LMS
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 Mayura LMS. Elevating Learning Excellence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
