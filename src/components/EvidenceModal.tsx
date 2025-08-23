import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface Evidence {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface EvidenceModalProps {
  evidence: Evidence | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EvidenceModal({ evidence, isOpen, onClose }: EvidenceModalProps) {
  if (!evidence) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-primary modal-enter">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="font-orbitron text-xl text-primary flex items-center justify-between">
            <span>Evidence: {evidence.title}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-primary/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {evidence.content}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Evidence content components
export function LoginLogsEvidence() {
  return (
    <div className="space-y-4">
      <div className="terminal">
        <div className="space-y-1 font-mono text-sm">
          <div>[01:59:43] LOGIN FAILED: user=krishn@falconcorp.com from 192.168.1.77</div>
          <div>[02:01:08] LOGIN FAILED: user=anita@falconcorp.com from 103.44.115.209</div>
          <div>[02:13:27] LOGIN SUCCESS: user=krishn@falconcorp.com from 103.44.115.209</div>
          <div>[02:15:03] PRIVILEGE ESCALATION DETECTED on user=krishn@falconcorp.com</div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground space-y-1">
        <p>• 192.168.1.77 is an internal office machine.</p>
        <p>• 103.44.115.209 appears to be foreign/external.</p>
        <p>• Correlate times with other evidence.</p>
      </div>
    </div>
  );
}

export function EmailDraftEvidence() {
  return (
    <div className="space-y-4">
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="border-b border-border pb-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">From:</span>
            <span>anita@falconcorp.com</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subject:</span>
            <span className="text-warning">[NO SUBJECT]</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-destructive">DRAFT (UNSENT)</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p>The client list and design schematics will be delivered by Friday.</p>
          <p>Payment must be made in cryptocurrency, as agreed.</p>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground italic">
        Why was this left unsent?
      </p>
    </div>
  );
}

export function FileMetadataEvidence() {
  return (
    <div className="space-y-4">
      <div className="bg-muted/20 border border-border rounded-lg overflow-hidden">
        <div className="bg-primary/10 px-4 py-2 border-b border-border">
          <h4 className="font-mono text-sm font-semibold">File Properties</h4>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">File Name:</span>
              <div className="font-mono">contracts.pdf</div>
            </div>
            <div>
              <span className="text-muted-foreground">File Size:</span>
              <div className="font-mono">2.4 MB</div>
            </div>
            <div>
              <span className="text-muted-foreground">Modified On:</span>
              <div className="font-mono text-warning">02:15 AM</div>
            </div>
            <div>
              <span className="text-muted-foreground">Last Modified By:</span>
              <div className="font-mono text-destructive">ADMINISTRATOR</div>
            </div>
            <div>
              <span className="text-muted-foreground">Created By:</span>
              <div className="font-mono">system</div>
            </div>
            <div className="border border-primary/50 rounded p-2 bg-primary/5">
              <span className="text-muted-foreground">Author:</span>
              <div className="font-mono text-primary">anita@falconcorp.com</div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground italic">
        Check consistency between modifier and author.
      </p>
    </div>
  );
}

export function USBActivityEvidence() {
  return (
    <div className="space-y-4">
      <div className="bg-black border border-terminal-green rounded-lg p-4">
        <div className="font-mono text-terminal-green text-sm space-y-1">
          <div>[02:14:12] External Device Inserted: USB#1423X-BLK</div>
          <div>[02:14:58] Data Transfer Complete: contracts.pdf, blackice_design.docx</div>
          <div>[02:15:02] Device Ejected</div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>USB device activity logged during breach timeframe.</p>
      </div>
    </div>
  );
}

export function ChatTranscriptEvidence() {
  return (
    <div className="space-y-4">
      <div className="bg-muted/20 border border-border rounded-lg p-4 space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-primary/20 rounded-full p-2 text-xs font-mono">K</div>
          <div className="flex-1">
            <div className="bg-card border border-border rounded-lg p-3">
              <p>If we go through with this, we can't turn back.</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">01:22 AM – krishn</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-secondary/20 rounded-full p-2 text-xs font-mono">?</div>
          <div className="flex-1">
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <p>Relax. By the time they figure it out, we'll be gone.</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">01:24 AM – unknown</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-warning/20 rounded-full p-2 text-xs font-mono">A</div>
          <div className="flex-1">
            <div className="bg-card border border-border rounded-lg p-3">
              <p>Wait. This isn't what we agreed on...</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">02:16 AM – anita</p>
          </div>
        </div>
      </div>
    </div>
  );
}