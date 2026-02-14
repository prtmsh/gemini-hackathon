import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, Wand2, Globe, Sparkles } from "lucide-react";
import CampaignShowcase from "@/components/campaign-showcase";

export default function InputView() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setLocation("/results");
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-background">
      {/* Left: Form Section */}
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
              Create your next campaign.
            </h1>
            <p className="text-muted-foreground text-lg">
              Define your brand's soul and let our AI engine craft the visuals.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Brand Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Brand DNA</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input id="brandName" placeholder="e.g. Nexus Dynamics" className="glass-input h-12" {...register("brandName")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="What does your brand stand for?" className="glass-input min-h-[100px]" {...register("description")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="designLanguage">Design Language</Label>
                  <Select>
                    <SelectTrigger className="glass-input h-12">
                      <SelectValue placeholder="Select a style..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimalist & Clean</SelectItem>
                      <SelectItem value="futuristic">Futuristic & Cyberpunk</SelectItem>
                      <SelectItem value="organic">Organic & Natural</SelectItem>
                      <SelectItem value="luxury">Luxury & High-End</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Targeting</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. Tokyo, Japan" className="glass-input h-12" {...register("location")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Input id="audience" placeholder="e.g. Gen Z Techies" className="glass-input h-12" {...register("audience")} />
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Assets */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Assets</h3>
              <div className="grid gap-4">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium">Drop Brand Assets Here</p>
                  <p className="text-xs text-muted-foreground mt-1">Logo (SVG, PNG), Fonts, Color Palettes</p>
                </div>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input className="glass-input pl-10 h-12" placeholder="https://yourbrand.com" {...register("website")} />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-[0_0_30px_-5px_var(--color-primary)] transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Campaign
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Right: Visual Section */}
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