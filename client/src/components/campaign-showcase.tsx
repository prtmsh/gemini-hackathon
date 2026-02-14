import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import sonyLogo from "@assets/sony_logo_1771056418315.png";
import headphoneImg from "@assets/WH1000XM6_Primary_image_Midnight_Blue-removebg-preview_1771056418315.png";

const campaigns = [
  {
    id: 'hi',
    langName: 'HINDI',
    font: "'Noto Sans Devanagari', sans-serif",
    text: {
      header: "TRAFFIC",
      body: "शिफ्ट ख़त्म।\nशोर जारी।",
      final: "मेहनत को सम्मान।",
      sub: "शांति के लिए निर्मित"
    }
  },
  {
    id: 'ta',
    langName: 'TAMIL',
    font: "'Noto Sans Tamil', sans-serif",
    text: {
      header: "TRAFFIC",
      body: "வேலை ஓய்ந்தது.\nஇரைச்சல் ஓயவில்லை.",
      final: "உழைப்பிற்கு மரியாதை.",
      sub: "அமைதிக்காகவே உருவானது"
    }
  },
  {
    id: 'te',
    langName: 'TELUGU',
    font: "'Noto Sans Telugu', sans-serif",
    text: {
      header: "TRAFFIC",
      body: "షిఫ్ట్ అయిపోయింది.\nగోల ఆగలేదు.",
      final: "కష్టానికి గౌరవం.",
      sub: "నిశ్శబ్దం కోసం రూపొందించబడింది"
    }
  },
  {
    id: 'ml',
    langName: 'MALAYALAM',
    font: "'Noto Sans Malayalam', sans-serif",
    text: {
      header: "TRAFFIC",
      body: "ജോലി കഴിഞ്ഞു.\nബഹളം ഒഴിഞ്ഞില്ല.",
      final: "അധ്വാനത്തെ മാനിക്കുക.",
      sub: "നിശബ്ദതയ്ക്കായി നിർമ്മിച്ചത്"
    }
  },
  {
    id: 'kn',
    langName: 'KANNADA',
    font: "'Noto Sans Kannada', sans-serif",
    text: {
      header: "TRAFFIC",
      body: "ಕೆಲಸ ಮುಗಿದಿದೆ.\nಗದ್ದಲ ಮುಗಿದಿಲ್ಲ.",
      final: "ಪರಿಶ್ರಮಕ್ಕೆ ಗೌರವ.",
      sub: "ಮೌನಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ"
    }
  }
];

const variants = [
  {
    name: "Industrial",
    bg: "#000000",
    accent: "#58a6ff", // Blue
    traffic: "#ff3333", // Red
  },
  {
    name: "Midnight",
    bg: "#051324",
    accent: "#64ffda", // Teal
    traffic: "#ff0080", // Hot Pink
  },
  {
    name: "Forest",
    bg: "#0A1F0D",
    accent: "#adff2f", // Green Yellow
    traffic: "#ff9100", // Orange
  },
  {
    name: "Velvet",
    bg: "#1a0b2e",
    accent: "#e0aaff", // Lavender
    traffic: "#00f2ff", // Cyan
  }
];

export default function CampaignShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % (campaigns.length * variants.length));
    }, 3500); // Slightly slower to appreciate the animation
    return () => clearInterval(timer);
  }, []);

  const variantIndex = Math.floor(index / campaigns.length) % variants.length;
  const campaignIndex = index % campaigns.length;

  const currentVariant = variants[variantIndex];
  const currentCampaign = campaigns[campaignIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
      {/* Background Ambience */}
      <motion.div 
        animate={{ backgroundColor: currentVariant.bg }}
        className="absolute inset-0 transition-colors duration-1000 ease-in-out"
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Info Overlay */}
      <div className="absolute top-12 left-0 right-0 z-20 text-center space-y-2 pointer-events-none">
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10"
         >
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-xs font-medium text-white/80">AI Analyzing Trends</span>
         </motion.div>
         <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
           One Concept. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Limitless Scale.</span>
         </h2>
         <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
           Instantly generate culturally relevant designs across multiple languages.
         </p>
      </div>

      {/* The Ad Card */}
      <motion.div
        layout
        className="relative z-10 mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="w-[300px] h-[500px] md:w-[340px] md:h-[580px] rounded-xl overflow-hidden shadow-2xl relative border border-white/10 transition-colors duration-1000"
          style={{ backgroundColor: currentVariant.bg }}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-end px-5">
             <img src={sonyLogo} alt="Sony" className="h-4 opacity-90 invert brightness-0" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>

          {/* Persistent Product Image (Outside AnimatePresence) */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
             <motion.img 
                src={headphoneImg} 
                alt="Headphones"
                className="w-64 h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
             />
          </div>

          {/* Dynamic Content Layer */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={`${currentCampaign.id}-${currentVariant.name}`}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20"
              initial={{ x: 300, opacity: 0, skewX: -10 }}
              animate={{ x: 0, opacity: 1, skewX: 0 }}
              exit={{ x: -300, opacity: 0, skewX: 10 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, mass: 0.8 }}
            >
               {/* Language Tag */}
               <div className="absolute top-4 left-5">
                 <Badge variant="outline" className="bg-black/20 backdrop-blur-md border-white/20 text-white/80 text-[10px] tracking-wider">
                   {currentCampaign.langName}
                 </Badge>
               </div>
               <div className="absolute top-4 left-20">
                 <Badge variant="outline" className="bg-black/20 backdrop-blur-md border-white/20 text-white/50 text-[10px] tracking-wider" style={{ color: currentVariant.accent }}>
                    {currentVariant.name}
                 </Badge>
               </div>

               {/* Background Header Text (Behind Product) */}
               {/* We create a duplicate layer with lower z-index for the background text if we want it strictly behind, 
                   but since we want it part of the slide animation, we can manage z-index here relative to siblings or use `mix-blend-mode`.
                   The product is Z-10. This container is Z-20. 
                   To put text *behind* the product but still animate with this block, we need to be clever.
                   
                   Actually, simplest way for "Right to Left" seamless swipe is to have everything on top or mixed.
                   Let's use specific Z-indexes for elements inside this motion div.
                */}
               
               {/* Traffic Line Decoration */}
               <div 
                 className="absolute top-[20%] w-[120%] h-[2px] shadow-[0_0_10px_currentColor] transform -rotate-12 -z-10"
                 style={{ backgroundColor: currentVariant.traffic, color: currentVariant.traffic }}
               />
               
               {/* Traffic Text (Behind Product) */}
               <h3 
                 className="absolute top-[18%] text-4xl font-bold -z-10 opacity-20 select-none whitespace-nowrap"
                 style={{ color: currentVariant.traffic, fontFamily: 'Inter' }}
               >
                 {currentCampaign.text.header}
               </h3>

               {/* Spacer to push text below product */}
               <div className="h-48"></div>

               {/* Bottom Text Content */}
               <div className="mt-12 text-center w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-xl backdrop-blur-[2px]">
                  <h4 className="text-white/40 text-xs tracking-[0.2em] mb-2 font-inter uppercase">WH-1000XM5</h4>
                  
                  <p 
                    className="text-2xl font-bold leading-tight mb-2 whitespace-pre-line drop-shadow-lg"
                    style={{ 
                      color: "#fff", 
                      fontFamily: currentCampaign.font
                    }}
                  >
                    {currentCampaign.text.final}
                  </p>
                  
                  <p 
                    className="text-lg font-bold drop-shadow-md"
                    style={{ color: currentVariant.accent, fontFamily: currentCampaign.font }}
                  >
                    {currentCampaign.text.sub}
                  </p>
               </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div 
            key={index}
            className="absolute bottom-0 left-0 h-1 bg-white z-50"
            style={{ backgroundColor: currentVariant.accent }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
          />

        </div>
      </motion.div>
    </div>
  );
}