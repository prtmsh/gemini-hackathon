import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { Wand2, Sparkles } from "lucide-react";
import CampaignShowcase from "@/components/campaign-showcase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { saveMatrixSession } from "@/lib/matrix-session";
import type { GenerateMatrixResponse } from "@shared/ad-matrix";

type FormState = {
  logoFile: File | null;
  productFile: File | null;
  audience: string;
  languages: string;
  variations: string;
  campaignContext: string;
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

export default function InputView() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    logoFile: null,
    productFile: null,
    audience: "Gen Z Gamers across India",
    languages: "Hindi, Tamil, English, Kannada, Odia, Telugu",
    variations:
      "Minimalist Luxury, High Energy & Loud, Emotional Storytelling, FOMO/Urgency, Gen-Z Slang, Cyberpunk/Neon",
    campaignContext: "Late night gaming sessions without disturbing the family.",
  });

  const onGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.logoFile || !formState.productFile) {
      toast({
        title: "Missing assets",
        description: "Upload both logo and product image before generating.",
        variant: "destructive",
      });
      return;
    }

    const languages = splitCsv(formState.languages);
    const variations = splitCsv(formState.variations);

    if (languages.length < 1 || variations.length < 1) {
      toast({
        title: "Missing fields",
        description: "Provide at least one language and one variation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const [logoBase64, productBase64] = await Promise.all([
        fileToBase64(formState.logoFile),
        fileToBase64(formState.productFile),
      ]);

      const response = await apiRequest("POST", "/api/generate-matrix", {
        audience: formState.audience,
        languages,
        variations,
        campaignContext: formState.campaignContext,
        logoBase64,
        productBase64,
      });

      const matrixData = (await response.json()) as GenerateMatrixResponse;

      saveMatrixSession({ matrixData, logoBase64, productBase64 });
      setLocation("/results");
    } catch (error) {
      toast({
        title: "Generation failed",
        description:
          error instanceof Error ? error.message : "Unexpected error while generating matrix.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto z-10 custom-scrollbar"
      >
        <div className="max-w-xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center animate-glow">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">BrandMotion</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Gemini Ad Matrix Generator.
            </h1>
            <p className="text-muted-foreground text-lg">
              Configure your campaign inputs and generate language x style ad variants.
            </p>
          </div>

          <form onSubmit={onGenerate} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="logoFile">Logo (PNG/JPG)</Label>
                  <Input
                    id="logoFile"
                    type="file"
                    accept="image/*"
                    className="glass-input h-12"
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        logoFile: event.target.files?.[0] ?? null,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="productFile">Product Image</Label>
                  <Input
                    id="productFile"
                    type="file"
                    accept="image/*"
                    className="glass-input h-12"
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        productFile: event.target.files?.[0] ?? null,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Campaign Inputs</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    className="glass-input h-12"
                    value={formState.audience}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, audience: event.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="languages">Languages (comma separated)</Label>
                  <Input
                    id="languages"
                    className="glass-input h-12"
                    value={formState.languages}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, languages: event.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variations">Variations / Styles (comma separated)</Label>
                  <Textarea
                    id="variations"
                    className="glass-input min-h-[90px]"
                    value={formState.variations}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, variations: event.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="campaignContext">Campaign Context</Label>
                  <Textarea
                    id="campaignContext"
                    className="glass-input min-h-[90px]"
                    value={formState.campaignContext}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, campaignContext: event.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isGenerating}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-[0_0_30px_-5px_var(--color-primary)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Campaign Matrix"}
            </Button>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden border-l border-white/10"
      >
        <CampaignShowcase />
      </motion.div>
    </div>
  );
}
