import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Download, Play, ArrowLeft, Share2, Layers, Clock } from "lucide-react";
import Scene3D from "@/components/scene-3d";
import poster1 from "@/assets/poster-1.png";

export default function ResultsView() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/">
              <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Config
              </Button>
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Campaign Results</h1>
            <p className="text-muted-foreground">Generated assets for "Nexus Dynamics"</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="glass border-white/10 hover:bg-white/5">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--color-primary)]">
              <Download className="mr-2 h-4 w-4" /> Export All
            </Button>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Posters */}
          <motion.div variants={item} className="lg:col-span-1 row-span-2">
            <Card className="glass-card border-white/10 overflow-hidden h-full flex flex-col group">
              <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <span className="font-medium">Key Visual</span>
                </div>
                <Badge variant="secondary" className="bg-white/10 hover:bg-white/20">4 Variations</Badge>
              </div>
              <div className="flex-1 relative overflow-hidden bg-black/40">
                <img 
                  src={poster1} 
                  alt="Generated Poster" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button className="w-full bg-white text-black hover:bg-white/90">Download High-Res</Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Motion Graphics */}
          <motion.div variants={item} className="lg:col-span-2 h-[400px]">
            <Card className="glass-card border-white/10 overflow-hidden h-full flex flex-col relative">
               <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <Badge className="bg-primary text-white border-none shadow-lg">Interactive 3D</Badge>
               </div>
               <div className="absolute top-4 right-4 z-10">
                  <Button size="sm" variant="secondary" className="backdrop-blur-md bg-black/50 hover:bg-black/70">
                    <Play className="mr-2 h-3 w-3" /> Play Interaction
                  </Button>
               </div>
               <div className="flex-1 bg-gradient-to-b from-gray-900 to-black">
                 <Scene3D />
               </div>
            </Card>
          </motion.div>

          {/* Card 3: Video (Disabled) */}
          <motion.div variants={item} className="lg:col-span-1 h-[300px]">
            <Card className="glass-card border-white/5 overflow-hidden h-full flex flex-col relative opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-not-allowed">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] z-20">
                <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-1">Hyperlocal Video</h3>
                <Badge variant="outline" className="border-primary text-primary">Coming Soon</Badge>
              </div>
              <div className="p-4 border-b border-white/5 bg-white/5">
                <span className="font-medium">Video Assets</span>
              </div>
              <div className="flex-1 bg-muted/20 relative">
                 {/* Decorative background for disabled state */}
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Copy/Text */}
          <motion.div variants={item} className="lg:col-span-1 h-[300px]">
             <Card className="glass-card border-white/10 overflow-hidden h-full flex flex-col p-6 space-y-4">
                <h3 className="font-display text-xl font-bold">Campaign Copy</h3>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
                    <p className="text-xs text-muted-foreground mb-2">Headline</p>
                    <p className="font-medium">"Future is Now. Embrace the Nexus."</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
                    <p className="text-xs text-muted-foreground mb-2">Subheader</p>
                    <p className="text-sm text-gray-300">"Experience the next evolution of connectivity. Seamless, powerful, everywhere."</p>
                  </div>
                </div>
             </Card>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}