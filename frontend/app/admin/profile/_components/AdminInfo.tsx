"use client";

import { useAuth } from "@/context/AuthContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bell,
  Calendar,
  Key,
  Mail,
  Palette,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AdminInfo = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-section",
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
            trigger: infoRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".info-card",
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
          stagger: 0.15,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );
    }, infoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={infoRef} className="bg-white">
      <div className="max-w-7xl mx-auto px-6">
       

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="info-card space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-[#F86D72]" />
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {user?.name || "Admin User"}
                    </h4>
                    <p className="text-gray-600 capitalize">
                      {user?.role || "Administrator"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#F86D72]" />
                    <span className="text-gray-600">
                      {user?.email || "admin@bookstore.com"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#F86D72]" />
                    <span className="text-gray-600">Joined January 2024</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#F86D72]" />
                    <span className="text-gray-600">Full Admin Access</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-[#F86D72]" />
                Account Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#F86D72]" />
                    <span className="font-semibold">Email Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F86D72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F86D72]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-[#F86D72]" />
                    <span className="font-semibold">
                      Two-Factor Authentication
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F86D72]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F86D72]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#F86D72]" />
                System Information
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Server Status
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-600">
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Database</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-600">
                        Connected
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Last Backup
                    </div>
                    <div className="font-semibold text-gray-900">
                      2 hours ago
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Uptime</div>
                    <div className="font-semibold text-gray-900">99.9%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F86D72]/5 to-[#ff9aa1]/5 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F86D72] mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F86D72] mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-600">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F86D72] mb-2">
                    256
                  </div>
                  <div className="text-gray-600">GB Storage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F86D72] mb-2">
                    1TB
                  </div>
                  <div className="text-gray-600">Bandwidth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
