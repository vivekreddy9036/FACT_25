import { Button } from "@/components/ui/button";
import { ScrollingLogo } from "@/components/ScrollingLogo";


interface HeroSectionProps {
  onEnterCase: () => void;
}

export function HeroSection({ onEnterCase }: HeroSectionProps) {
  return (<>
    <section className="min-h-screen flex flex-col items-center justify-center relative cyber-grid">
      <ScrollingLogo />
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black bg-gradient-to-r from-primary via-forensic-red to-secondary bg-clip-text text-transparent animate-glow-pulse">
            OPERATION BLACK ICE
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary via-forensic-red to-secondary mx-auto rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-orbitron font-medium text-foreground">
            Cyber Forensics Case File
          </h2>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Falcon Corp has been breached. You've been called to investigate.
          </p>
          
          <Button 
            onClick={onEnterCase}
            size="lg"
            className="font-orbitron font-semibold text-lg px-8 py-6 bg-gradient-to-r from-primary to-forensic-red hover:from-forensic-red hover:to-primary transition-all duration-300 glitch shadow-lg shadow-primary/50"
          >
            Enter Case File
          </Button>
        </div>
      </div>
      
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>FACT    Forensic Analysis Club & Triage</p>
      </footer>
    </section>
    </>
  );
}