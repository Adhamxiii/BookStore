"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AdminActions = () => {
  const actionsRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    {
      id: 1,
      title: "Manage Books",
      description: "Add, edit, or remove books from your catalog",
      icon: BookOpen,
      href: "/admin/books",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      title: "User Management",
      description: "View and manage user accounts and permissions",
      icon: Users,
      href: "/admin/users",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: 3,
      title: "Order Management",
      description: "Track and manage customer orders",
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Analytics Dashboard",
      description: "View detailed analytics and reports",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      id: 5,
      title: "System Settings",
      description: "Configure system preferences and settings",
      icon: Settings,
      href: "/admin/settings",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
    },
    {
      id: 6,
      title: "Reports & Logs",
      description: "Generate reports and view system logs",
      icon: FileText,
      href: "/admin/reports",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  const recentActions = [
    { id: 1, action: "Added new book", time: "2 minutes ago", icon: Plus },
    { id: 2, action: "Viewed user profile", time: "5 minutes ago", icon: Eye },
    { id: 3, action: "Updated book details", time: "10 minutes ago", icon: Edit },
    { id: 4, action: "Deleted old category", time: "15 minutes ago", icon: Trash2 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Actions section animation
      gsap.fromTo(
        ".actions-section",
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 80%",
          },
        }
      );

      // Action cards animation
      gsap.fromTo(
        ".action-card",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

    }, actionsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={actionsRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#F86D72]/5 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#F86D72]/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="actions-section text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Settings className="w-5 h-5" />
            Admin Actions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quick Access Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your bookstore efficiently with these powerful admin tools
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="actions-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link key={action.id} href={action.href} className="action-card group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${action.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${action.textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#F86D72] transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {action.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-[#F86D72] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Access Tool</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity & System Status */}
        <div className="actions-section grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#F86D72]" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActions.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-10 h-10 bg-[#F86D72]/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-[#F86D72]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              System Status
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Server Load</div>
                  <div className="text-2xl font-bold">23%</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Memory Usage</div>
                  <div className="text-2xl font-bold">67%</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Active Users</div>
                  <div className="text-2xl font-bold">142</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Orders Today</div>
                  <div className="text-2xl font-bold">89</div>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">System Health</span>
                  <span className="text-sm font-semibold">Excellent</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminActions;
