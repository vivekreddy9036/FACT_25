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

  // Remove old handleSubmitted, use the new one below that sets justSubmitted

  // Track if this is the first render after submit (not a refresh)
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('fact_isSubmitted') === 'true') {
      setIsSubmitted(true);
      // If not just submitted, force hero page
      if (!justSubmitted) {
        setCurrentSection('hero');
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmitted = () => {
    setIsSubmitted(true);
    setJustSubmitted(true);
  };

  // If just submitted, show thank you page
  if (justSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SubmissionPanel isEnabled={false} isSubmitted={true} />
      </div>
    );
  }

  // If already submitted (on refresh), show only hero page
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <HeroSection onEnterCase={() => {}} />
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
