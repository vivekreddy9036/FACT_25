import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

interface SubmissionPanelProps {
  isEnabled: boolean;
  onSubmitted?: () => void;
  isSubmitted?: boolean;
}

interface FormData {
  conclusion: string;
  reasoning: string;
  name: string;
  email: string;
  rollNumber: string;
  phone: string;
  consent: boolean;
}

const SUBMIT_URL =
  "https://script.google.com/macros/s/AKfycbyWH5cLoq7JHmzpP6PBlSo7JhfwO30FoMOxvT4IaWg9BLunFOLD91F_KHcWpqQYTjeukQ/exec";

function SubmissionPanel({ isEnabled, onSubmitted, isSubmitted }: SubmissionPanelProps) {
  const [formData, setFormData] = useState<FormData>({
    conclusion: "",
    reasoning: "",
    name: "",
    email: "",
    rollNumber: "",
    phone: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('fact_isSubmitted') === 'true') {
      setAlreadySubmitted(true);
    }
  }, []);

  const conclusions = [
    { value: "Krishn", label: "Krishn" },
    { value: "Anita", label: "Anita" },
    { value: "Insider + External Collusion", label: "Insider + External Collusion" },
    { value: "Insufficient Evidence", label: "Insufficient Evidence" },
  ];

  const isFormValid = () => {
    return (
      formData.conclusion &&
      formData.reasoning.trim().length > 10 &&
      formData.name.trim() &&
      formData.email.includes("@") &&
      formData.rollNumber.trim() &&
      formData.phone.trim().length >= 10 &&
      formData.consent
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create a temporary hidden form to submit to Apps Script
    const form = document.createElement("form");
    form.action = SUBMIT_URL;
    form.method = "POST";
    form.target = "hidden_iframe";

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    // Add timestamp
    const ts = document.createElement("input");
    ts.type = "hidden";
    ts.name = "timestamp";
    const now = new Date();
    const formattedTimestamp = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    ts.value = formattedTimestamp;
    form.appendChild(ts);

    const startTime = localStorage.getItem("startTime");
    if (startTime) {
      const startTimeInput = document.createElement("input");
      startTimeInput.type = "hidden";
      startTimeInput.name = "startTime";
      const startDate = new Date(parseInt(startTime));
      const formattedStartTime = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} ${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}:${startDate.getSeconds().toString().padStart(2, "0")}`;
      startTimeInput.value = formattedStartTime;
      form.appendChild(startTimeInput);
    }

    document.body.appendChild(form);
    // If we have a ref to the hidden iframe, wait for its load event to mark success.
    const iframe = iframeRef.current || document.getElementsByName("hidden_iframe")?.[0] as HTMLIFrameElement | undefined;

    let handled = false;
    const cleanup = () => {
      try {
        if (form.parentNode) form.parentNode.removeChild(form);
      } catch (err) {
        // ignore
      }
      if (iframe) {
        try {
          iframe.removeEventListener("load", onLoad);
        } catch (err) {
          // ignore
        }
      }
      if (timeoutId) clearTimeout(timeoutId);
    };

    const onLoad = () => {
      if (handled) return;
      handled = true;
      setIsSubmitting(false);
      localStorage.setItem('fact_isSubmitted', 'true');
      setAlreadySubmitted(true);
      if (onSubmitted) onSubmitted();

      toast({
        title: "Success",
        description: "Report submitted to us. Thank you!, please wait to hear back from us.",
      });

      cleanup();
    };

    // Fallback timeout if iframe doesn't load (network error or blocked)
    const timeoutId = window.setTimeout(() => {
      if (handled) return;
      handled = true;
      setIsSubmitting(false);
      toast({
        title: "Submission timed out",
        description: "We could not confirm submission. Please try again or contact the organizers.",
        variant: "destructive",
      });
      cleanup();
    }, 10000);

    if (iframe) {
      try {
        iframe.addEventListener("load", onLoad);
      } catch (err) {
        // ignore and rely on timeout
      }
    }

    form.submit();
  };

  if (!isEnabled || alreadySubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Card className="border-muted">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                {alreadySubmitted
                  ? "You have already submitted your report. Further submissions are not allowed."
                  : "Review all evidence to unlock the submission panel"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        isSubmitted
          ? "py-16 cyber-grid bg-background min-h-screen"
          : "py-16 cyber-grid"
      }
    >
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-[#ff3c3c] tracking-wide" style={{letterSpacing: '0.04em'}}>Submit Findings</h2>
          <div className="h-px w-24 bg-gradient-to-r from-[#ff3c3c] to-[#ff3c3c] mx-auto"></div>
        </div>

        <Card className="border border-neutral-700 bg-[#18171c]/95 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="font-orbitron text-2xl text-white text-center tracking-wide">Case Analysis Report</CardTitle>
          </CardHeader>
          <CardContent className={isSubmitted ? "flex flex-col justify-center items-center min-h-[300px] space-y-6" : "space-y-6"}>
            {isSubmitted ? (
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{color:'#1aff89'}}>Thank you for your submission!</h3>
                <p className="text-lg text-gray-300 tracking-wide" style={{letterSpacing: '0.02em'}}>
                  YOUR REPORT HAS BEEN RECEIVED. GOOD LUCK, INVESTIGATOR.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Conclusion */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Based on the evidence provided, who is most likely responsible for the Falcon Corp breach? *
                  </Label>
                  <RadioGroup
                    value={formData.conclusion}
                    onValueChange={(value) =>
                      setFormData({ ...formData, conclusion: value })
                    }
                    className="space-y-2"
                  >
                    {conclusions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label
                          htmlFor={option.value}
                          className="font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Reasoning */}
                <div className="space-y-3">
                  <Label htmlFor="reasoning" className="text-base font-semibold">
                    Justify Your Reasoning (4-6 bullet points) *
                  </Label>
                  <Textarea
                    id="reasoning"
                    placeholder="• Point 1: Evidence from login logs shows...&#10;• Point 2: The email draft indicates...&#10;• Point 3: File metadata reveals..."
                    value={formData.reasoning}
                    onChange={(e) =>
                      setFormData({ ...formData, reasoning: e.target.value })
                    }
                    className="min-h-[120px] font-mono text-sm"
                    required
                  />
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Please use the mail to which you received this) *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number *</Label>
                    <Input
                      id="rollNumber"
                      value={formData.rollNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, rollNumber: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, consent: !!checked })
                    }
                    required
                  />
                  <Label htmlFor="consent" className="text-sm cursor-pointer">
                    I confirm this is my own analysis.
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full font-orbitron font-semibold text-lg py-6 glow-primary hover:glow-primary"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Report
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hidden iframe for form submission */}
      <iframe ref={iframeRef} name="hidden_iframe" style={{ display: "none" }} />
    </section>
  );
}

export { SubmissionPanel };
