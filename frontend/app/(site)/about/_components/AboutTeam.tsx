"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutTeam = () => {
  const teamRef = useRef<HTMLDivElement>(null);
  const membersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
     
      membersRef.current.forEach((member) => {
        if (member) {
          gsap.fromTo(
            member,
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: member,
                start: "top 85%",
              },
            }
          );

         
          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(member, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });

          member.addEventListener("mouseenter", () => hoverTl.play());
          member.addEventListener("mouseleave", () => hoverTl.reverse());
        }
      });

     
      gsap.to(".floating-team-element", {
        y: -30,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, teamRef);

    return () => ctx.revert();
  }, []);

  const teamMembers = [
    {
      name: "Adham Nasser",
      role: "Founder & CEO",
      image: "👨‍💼",
      description: "Passionate about literature and community building",
      color: "from-[#F86D72] to-[#ff9aa1]",
    },
    {
      name: "Adham Nasser",
      role: "Head of Technology",
      image: "👨‍💻",
      description: "Building the future of digital reading experiences",
      color: "from-[#ff9aa1] to-[#F86D72]",
    },
    {
      name: "Adham Nasser",
      role: "Content Curator",
      image: "👨‍🎨",
      description: "Discovering and sharing the best stories with our community",
      color: "from-[#F86D72] to-[#ff9aa1]",
    },
    {
      name: "Adham Nasser",
      role: "Community Manager",
      image: "👨‍🤝‍👨",
      description: "Connecting readers and fostering meaningful discussions",
      color: "from-[#ff9aa1] to-[#F86D72]",
    },
  ];

  return (
    <section ref={teamRef} className="py-20 bg-white relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-team-element absolute top-20 left-10 w-24 h-24 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="floating-team-element absolute top-40 right-20 w-32 h-32 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        <div className="floating-team-element absolute bottom-20 left-1/4 w-28 h-28 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="floating-team-element absolute bottom-40 right-1/3 w-20 h-20 bg-[#ff9aa1]/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate people behind our mission to make books accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => {
                membersRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-[#F86D72] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>

              
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
