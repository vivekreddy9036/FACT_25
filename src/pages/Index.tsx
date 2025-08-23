import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CaseBrief } from "@/components/CaseBrief";
import { EvidenceDashboard } from "@/components/EvidenceDashboard";
import { SubmissionPanel } from "@/components/SubmissionPanel";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'hero' | 'brief' | 'evidence'>('hero');
  const [allEvidenceViewed, setAllEvidenceViewed] = useState(false);

  const handleEnterCase = () => {
    setCurrentSection('brief');
  };

  const handleAcceptMission = () => {
    setCurrentSection('evidence');
  };

  const handleAllEvidenceViewed = (viewed: boolean) => {
    setAllEvidenceViewed(viewed);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
     
      {currentSection === 'hero' && (
        <HeroSection onEnterCase={handleEnterCase} />
      )}
      
      {currentSection === 'brief' && (
        <CaseBrief onAcceptMission={handleAcceptMission} />
      )}
      
      {currentSection === 'evidence' && (
        <>
          <EvidenceDashboard onAllEvidenceViewed={handleAllEvidenceViewed} />
          <SubmissionPanel isEnabled={allEvidenceViewed} />
        </>
      )}
    </div>
  );
};

export default Index;
