import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  EvidenceModal, 
  Evidence,
  LoginLogsEvidence,
  EmailDraftEvidence,
  FileMetadataEvidence,
  USBActivityEvidence,
  ChatTranscriptEvidence
} from "./EvidenceModal";
import { FileText, Mail, HardDrive, Usb, MessageSquare } from "lucide-react";
import { ScrollingLogo } from "./ScrollingLogo";

interface EvidenceDashboardProps {
  onAllEvidenceViewed: (viewed: boolean) => void;
}

export function EvidenceDashboard({ onAllEvidenceViewed }: EvidenceDashboardProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [viewedEvidence, setViewedEvidence] = useState<Set<string>>(new Set());

  const evidenceList: Evidence[] = [
    {
      id: "logs",
      title: "Login Logs",
      content: <LoginLogsEvidence />
    },
    {
      id: "email",
      title: "Email Drafts", 
      content: <EmailDraftEvidence />
    },
    {
      id: "metadata",
      title: "File Metadata",
      content: <FileMetadataEvidence />
    },
    {
      id: "usb",
      title: "USB Activity",
      content: <USBActivityEvidence />
    },
    {
      id: "chat",
      title: "Chat Transcript",
      content: <ChatTranscriptEvidence />
    }
  ];

  const getIcon = (id: string) => {
    const icons = {
      logs: FileText,
      email: Mail,
      metadata: HardDrive,
      usb: Usb,
      chat: MessageSquare
    };
    const Icon = icons[id as keyof typeof icons];
    return <Icon className="h-6 w-6" />;
  };

  const handleEvidenceClick = (evidence: Evidence) => {
    setSelectedEvidence(evidence);
    const newViewed = new Set(viewedEvidence);
    newViewed.add(evidence.id);
    setViewedEvidence(newViewed);
    
    // Check if all evidence has been viewed
    if (newViewed.size === evidenceList.length) {
      onAllEvidenceViewed(true);
    }
  };

  const markAllViewed = () => {
    const allIds = new Set(evidenceList.map(e => e.id));
    setViewedEvidence(allIds);
    onAllEvidenceViewed(true);
  };

  return (
    <section className="min-h-screen py-16 cyber-grid">
  <ScrollingLogo size="20%" />
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold bg-gradient-to-r from-primary to-forensic-red bg-clip-text text-transparent">
            Evidence Dashboard
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-primary to-forensic-red mx-auto"></div>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="font-mono">
              Evidence reviewed: {viewedEvidence.size}/{evidenceList.length}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllViewed}
              className="text-xs"
            >
              Mark All Viewed
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidenceList.map((evidence) => {
            const isViewed = viewedEvidence.has(evidence.id);
            return (
              <Card
                key={evidence.id}
                className={`evidence-tile cursor-pointer group ${
                  isViewed ? 'border-success' : 'border-border'
                }`}
                onClick={() => handleEvidenceClick(evidence)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg font-orbitron">
                    <div className="flex items-center space-x-3">
                      <div className="text-primary group-hover:text-secondary transition-colors">
                        {getIcon(evidence.id)}
                      </div>
                      <span>{evidence.title}</span>
                    </div>
                    <div className={`progress-check ${isViewed ? 'completed' : ''}`}></div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to examine evidence
                  </p>
                  {isViewed && (
                    <Badge variant="outline" className="mt-2 text-success border-success">
                      Reviewed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <EvidenceModal
          evidence={selectedEvidence}
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
        />
      </div>
    </section>
  );
}