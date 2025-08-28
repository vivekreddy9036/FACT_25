import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CaseBrief } from "@/components/CaseBrief";
import { EvidenceDashboard } from "@/components/EvidenceDashboard";
import { SubmissionPanel } from "@/components/SubmissionPanel";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'hero' | 'brief' | 'evidence'>('hero');
  const [allEvidenceViewed, setAllEvidenceViewed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // On mount, sync isSubmitted with localStorage
  useEffect(() => {
    if (localStorage.getItem('fact_isSubmitted') === 'true') {
      setIsSubmitted(true);
    }
  }, []);

  const handleEnterCase = () => {
    setCurrentSection('brief');
  };

  const handleAcceptMission = () => {
    setCurrentSection('evidence');
  };


  const handleAllEvidenceViewed = (viewed: boolean) => {
    setAllEvidenceViewed(viewed);
  };

  const handleSubmitted = () => {
    setIsSubmitted(true);
  };

  // If submitted, show only the SubmissionPanel in thank you mode, block all other navigation
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SubmissionPanel isEnabled={false} isSubmitted={true} />
      </div>
    );
  }

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
          <SubmissionPanel isEnabled={allEvidenceViewed} onSubmitted={handleSubmitted} isSubmitted={isSubmitted} />
        </>
      )}
    </div>
  );
};

export default Index;
