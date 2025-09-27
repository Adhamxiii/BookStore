import { NextPage } from "next";
import React from "react";
import AboutHero from "./_components/AboutHero";
import AboutStats from "./_components/AboutStats";
import AboutMission from "./_components/AboutMission";
import AboutTeam from "./_components/AboutTeam";
import AboutCTA from "./_components/AboutCTA";

const AboutPage: NextPage = () => {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutTeam />
      <AboutCTA />
    </main>
  );
};

export default AboutPage;
