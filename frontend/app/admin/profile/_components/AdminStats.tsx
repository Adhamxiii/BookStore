"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Users, ShoppingCart, TrendingUp, DollarSign, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AdminStats = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      title: "Total Books",
      value: "1,247",
      change: "+12%",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Active Users",
      value: "2,341",
      change: "+8%",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: 3,
      title: "Orders Today",
      value: "89",
      change: "+23%",
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$12,847",
      change: "+15%",
      icon: DollarSign,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      id: 5,
      title: "Page Views",
      value: "45,231",
      change: "+7%",
      icon: Eye,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      id: 6,
      title: "Growth Rate",
      value: "18.5%",
      change: "+3%",
      icon: TrendingUp,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats section animation
      gsap.fromTo(
        ".stats-section",
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );

      // Stats cards animation
      gsap.fromTo(
        ".stat-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationY: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

      // Counter animation
      gsap.fromTo(
        ".stat-value",
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          delay: 0.6,
        }
      );

      // Floating animation
      gsap.to(".stat-card", {
        y: -10,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={statsRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#F86D72]/5 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#F86D72]/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="stats-section text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
            <TrendingUp className="w-5 h-5" />
            Dashboard Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Store Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time insights and performance metrics for your bookstore
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="stat-card group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${stat.textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
                    <div className="stat-value text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${stat.textColor}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">from last month</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Cards */}
        <div className="stats-section mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
            <p className="text-white/90 mb-6">
              Manage your bookstore efficiently with these quick access tools
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Add Book
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                View Orders
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Manage Users
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Analytics
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">New book &quot;The Great Adventure&quot; added</span>
                <span className="text-sm text-gray-400 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Order #1234 completed</span>
                <span className="text-sm text-gray-400 ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">New user registered</span>
                <span className="text-sm text-gray-400 ml-auto">10 min ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Category &quot;Mystery&quot; updated</span>
                <span className="text-sm text-gray-400 ml-auto">15 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;
