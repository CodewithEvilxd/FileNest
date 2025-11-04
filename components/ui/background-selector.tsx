"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

interface BackgroundOption {
  name: string;
  style: React.CSSProperties;
  isLight: boolean;
}

const backgroundOptions: BackgroundOption[] = [
  // Dark Backgrounds
  {
    name: "Center Spotlight",
    isLight: false,
    style: {
      background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 20%, rgba(0, 0, 0, 0.0) 60%), #000000`,
    },
  },
  {
    name: "Purple Aurora",
    isLight: false,
    style: {
      background: `linear-gradient(90deg, transparent 0%, transparent 30%, rgba(138, 43, 226, 0.4) 50%, transparent 70%, transparent 100%), linear-gradient(to bottom, #1a1a2e 0%, #2d1b69 50%, #0f0f23 100%)`,
      backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 79px, rgba(255, 255, 255, 0.05) 80px, rgba(255, 255, 255, 0.05) 81px)`,
    },
  },
  {
    name: "Black Grid",
    isLight: false,
    style: {
      background: "#000000",
      backgroundImage: `linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    },
  },
  {
    name: "Dark Grid Lines",
    isLight: false,
    style: {
      background: "#000000",
      backgroundImage: `linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    },
  },
  {
    name: "Midnight Eclipse",
    isLight: false,
    style: {
      background: "radial-gradient(circle at 20% 50%, rgba(30, 30, 60, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 20, 40, 0.3) 0%, transparent 50%), #0a0a0a",
    },
  },
  {
    name: "Deep Ocean",
    isLight: false,
    style: {
      background: "linear-gradient(180deg, #0f172a 0%, #020617 50%, #000000 100%)",
    },
  },
  {
    name: "Carbon Fiber",
    isLight: false,
    style: {
      backgroundColor: "#0a0a0a",
      backgroundImage: `linear-gradient(to right, rgba(50, 50, 50, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(50, 50, 50, 0.15) 1px, transparent 1px)`,
      backgroundSize: "50px 50px",
    },
  },
  {
    name: "Subtle Purple Haze",
    isLight: false,
    style: {
      background: "radial-gradient(ellipse at bottom, rgba(88, 28, 135, 0.15) 0%, transparent 60%), #0a0a0a",
    },
  },
  {
    name: "Slate Grid",
    isLight: false,
    style: {
      backgroundColor: "#0f0f0f",
      backgroundImage: `linear-gradient(to right, rgba(71, 85, 105, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(71, 85, 105, 0.2) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    },
  },
  {
    name: "Emerald Whisper",
    isLight: false,
    style: {
      background: "radial-gradient(circle at top right, rgba(16, 185, 129, 0.08) 0%, transparent 70%), #000000",
    },
  },
  {
    name: "Circuit Board",
    isLight: false,
    style: {
      backgroundColor: "black",
      backgroundImage: `
        linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px),
        radial-gradient(circle at 25% 25%, rgba(0, 255, 0, 0.5) 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, rgba(0, 255, 0, 0.5) 2px, transparent 2px)
      `,
      backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
    },
  },
  {
    name: "Cyber Grid",
    isLight: false,
    style: {
      backgroundColor: "black",
      backgroundImage: `
        linear-gradient(rgba(0, 255, 0, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 0, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.3) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px, 40px 40px, 80px 80px",
    },
  },
  {
    name: "Data Stream",
    isLight: false,
    style: {
      backgroundColor: "#000814",
      backgroundImage: `
        repeating-linear-gradient(90deg, rgba(0, 255, 255, 0.3) 0px, rgba(0, 255, 255, 0.3) 2px, transparent 2px, transparent 20px),
        repeating-linear-gradient(0deg, rgba(255, 0, 255, 0.3) 0px, rgba(255, 0, 255, 0.3) 2px, transparent 2px, transparent 20px),
        radial-gradient(circle at 30% 70%, rgba(255, 255, 0, 0.4) 3px, transparent 3px)
      `,
      backgroundSize: "100px 100px, 100px 100px, 150px 150px",
    },
  },
  {
    name: "Quantum Circuit",
    isLight: false,
    style: {
      backgroundColor: "#0a0a0a",
      backgroundImage: `
        linear-gradient(45deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
        linear-gradient(-45deg, rgba(255, 0, 255, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 25% 25%, rgba(255, 255, 0, 0.5) 3px, transparent 3px),
        radial-gradient(circle at 75% 75%, rgba(0, 255, 0, 0.5) 3px, transparent 3px)
      `,
      backgroundSize: "60px 60px, 60px 60px, 120px 120px, 120px 120px",
    },
  },
  {
    name: "Virtual Reality",
    isLight: false,
    style: {
      backgroundColor: "black",
      backgroundImage: `
        linear-gradient(45deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
        linear-gradient(-45deg, rgba(255, 0, 255, 0.4) 1px, transparent 1px),
        conic-gradient(from 45deg at 50% 50%, rgba(255, 255, 0, 0.3), rgba(0, 255, 0, 0.3), rgba(255, 0, 0, 0.3), rgba(0, 0, 255, 0.3))
      `,
      backgroundSize: "40px 40px, 40px 40px, 100% 100%",
    },
  },
  {
    name: "Cyber Security",
    isLight: false,
    style: {
      backgroundColor: "black",
      backgroundImage: `
        linear-gradient(90deg, rgba(255, 0, 0, 0.5) 1px, transparent 1px),
        linear-gradient(rgba(255, 165, 0, 0.5) 1px, transparent 1px),
        radial-gradient(circle, rgba(0, 255, 0, 0.4) 2px, transparent 2px)
      `,
      backgroundSize: "30px 30px, 30px 30px, 60px 60px",
    },
  },
  {
    name: "Rotating Gears",
    isLight: false,
    style: {
      backgroundColor: "rgb(15 23 42)",
      backgroundImage: `
        repeating-conic-gradient(from 0deg at 25% 25%, rgba(59, 130, 246, 0.4) 0deg 90deg, transparent 90deg 180deg),
        repeating-conic-gradient(from 0deg at 75% 75%, rgba(16, 185, 129, 0.4) 0deg 90deg, transparent 90deg 180deg)
      `,
      animation: "rotateGears 12s linear infinite",
    },
  },

  // Light/White Backgrounds
  {
    name: "White Sphere Grid",
    isLight: true,
    style: {
      background: "white",
      backgroundImage: `linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)`,
      backgroundSize: "32px 32px, 32px 32px, 100% 100%",
    },
  },
  {
    name: "Clean Canvas",
    isLight: true,
    style: {
      background: "#ffffff",
    },
  },
  {
    name: "Soft Pearl",
    isLight: true,
    style: {
      background: "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
    },
  },
  {
    name: "Ivory Grid",
    isLight: true,
    style: {
      backgroundColor: "#fafafa",
      backgroundImage: `linear-gradient(to right, rgba(200, 200, 200, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(200, 200, 200, 0.3) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    },
  },
  {
    name: "Warm Cream",
    isLight: true,
    style: {
      background: "linear-gradient(135deg, #fef9f3 0%, #faf5ef 100%)",
    },
  },
  {
    name: "Light Mesh",
    isLight: true,
    style: {
      backgroundColor: "#f8f8f8",
      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0, 0, 0, 0.02) 35px, rgba(0, 0, 0, 0.02) 36px), repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0, 0, 0, 0.03) 35px, rgba(0, 0, 0, 0.03) 36px)`,
    },
  },
  {
    name: "Soft Blue Tint",
    isLight: true,
    style: {
      background: "radial-gradient(circle at top, rgba(219, 234, 254, 0.4) 0%, transparent 70%), #ffffff",
    },
  },
  {
    name: "Elegant Dots",
    isLight: true,
    style: {
      backgroundColor: "#fefefe",
      backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    },
  },
  {
    name: "Minimal Gray",
    isLight: true,
    style: {
      background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
    },
  },
  {
    name: "Paper White",
    isLight: true,
    style: {
      background: "#fcfcfc",
    },
  },
  {
    name: "Flowing Rivers",
    isLight: true,
    style: {
      backgroundColor: "white",
      backgroundImage: `
        linear-gradient(45deg, rgba(59, 130, 246, 0.3) 25%, transparent 25%, transparent 50%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.3) 75%, transparent 75%),
        linear-gradient(-45deg, rgba(16, 185, 129, 0.3) 25%, transparent 25%, transparent 50%, rgba(16, 185, 129, 0.3) 50%, rgba(16, 185, 129, 0.3) 75%, transparent 75%)
      `,
      backgroundSize: "60px 60px",
      animation: "flowRivers 8s linear infinite",
    },
  },
  {
    name: "Floating Particles",
    isLight: true,
    style: {
      backgroundColor: "white",
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 2px, transparent 2px),
        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.4) 2px, transparent 2px),
        radial-gradient(circle at 40% 40%, rgba(245, 101, 101, 0.4) 2px, transparent 2px)
      `,
      backgroundSize: "50px 50px, 70px 70px, 60px 60px",
      animation: "floatParticles 10s ease-in-out infinite",
    },
  },
  {
    name: "Bouncing Dots",
    isLight: true,
    style: {
      backgroundColor: "white",
      backgroundImage: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 3px, transparent 3px)",
      backgroundSize: "40px 40px",
      animation: "bounceDots 5s ease-in-out infinite",
    },
  },
  {
    name: "Aged Paper",
    isLight: true,
    style: {
      backgroundColor: "#f5f5dc",
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.15) 1px, transparent 0),
        linear-gradient(90deg, rgba(160, 82, 45, 0.1) 1px, transparent 1px),
        linear-gradient(180deg, rgba(160, 82, 45, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px, 20px 20px, 20px 20px",
    },
  },
  {
    name: "Linen Fabric",
    isLight: true,
    style: {
      backgroundColor: "#faf0e6",
      backgroundImage: `
        linear-gradient(90deg, rgba(139, 69, 19, 0.2) 1px, transparent 1px),
        linear-gradient(180deg, rgba(139, 69, 19, 0.2) 1px, transparent 1px)
      `,
      backgroundSize: "15px 15px",
    },
  },
  {
    name: "Woven Basket",
    isLight: true,
    style: {
      backgroundColor: "#deb887",
      backgroundImage: `
        linear-gradient(90deg, rgba(139, 69, 19, 0.3) 2px, transparent 2px),
        linear-gradient(180deg, rgba(139, 69, 19, 0.3) 2px, transparent 2px),
        linear-gradient(45deg, rgba(160, 82, 45, 0.2) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px, 20px 20px, 20px 20px",
    },
  },
];

function Button({ variant = "ghost", size = "sm", onClick, className = "", children }: any) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors
        ${variant === "ghost" ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""}
        ${size === "sm" ? "h-9 px-3" : ""}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default function BackgroundSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundOption | null>(null);

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotateGears {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes flowRivers {
        0% { background-position: 0 0, 0 0; }
        100% { background-position: 60px 60px, -60px -60px; }
      }
      @keyframes floatParticles {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(90deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        75% { transform: translateY(-10px) rotate(270deg); }
      }
      @keyframes bounceDots {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Check if there's a saved background in localStorage
    const saved = localStorage.getItem('selectedBackground');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const found = backgroundOptions.find(bg => bg.name === parsed.name);
        if (found) {
          setSelectedBackground(found);
          return;
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }

    // Default to Carbon Fiber if no saved background or if saved background has animation
    const defaultBg = backgroundOptions.find(bg => bg.name === 'Carbon Fiber');
    if (defaultBg) {
      setSelectedBackground(defaultBg);
    }
  }, []);

  useEffect(() => {
    if (selectedBackground) {
      // Clear all background styles
      document.body.style.background = '';
      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';

      // Apply new background
      Object.assign(document.body.style, selectedBackground.style);
      document.body.style.backgroundAttachment = 'fixed';

      // Set text color based on background type
      if (selectedBackground.isLight) {
        document.body.style.color = '#1a1a1a';
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      } else {
        document.body.style.color = '#f5f5f5';
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      }
    }
  }, [selectedBackground]);

  const handleBackgroundSelect = (background: BackgroundOption) => {
    setSelectedBackground(background);
    setIsOpen(false);
  };

  const darkBackgrounds = backgroundOptions.filter(bg => !bg.isLight);
  const lightBackgrounds = backgroundOptions.filter(bg => bg.isLight);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="h-9 w-9 px-0"
      >
        <Palette className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        <span className="sr-only">Choose Background</span>
      </Button>

      {isOpen && (
        <div className="fixed top-20 right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 bg-gray-900 p-6 rounded-lg shadow-2xl z-50 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-semibold">Choose Background</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <h4 className="text-gray-300 text-sm font-medium mb-3">Dark Themes</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {darkBackgrounds.map((background, index) => (
                <div
                  key={`dark-${index}`}
                  className="cursor-pointer group"
                  onClick={() => handleBackgroundSelect(background)}
                >
                  <div
                    className="w-full h-24 rounded-lg border-2 border-gray-700 group-hover:border-blue-500 transition-all duration-200 shadow-md"
                    style={background.style}
                  />
                  <p className="text-gray-300 text-xs text-center mt-2 group-hover:text-blue-400 transition-colors duration-200">
                    {background.name}
                  </p>
                </div>
              ))}
            </div>

            <h4 className="text-gray-300 text-sm font-medium mb-3">Light Themes</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {lightBackgrounds.map((background, index) => (
                <div
                  key={`light-${index}`}
                  className="cursor-pointer group"
                  onClick={() => handleBackgroundSelect(background)}
                >
                  <div
                    className="w-full h-24 rounded-lg border-2 border-gray-700 group-hover:border-blue-500 transition-all duration-200 shadow-md"
                    style={background.style}
                  />
                  <p className="text-gray-300 text-xs text-center mt-2 group-hover:text-blue-400 transition-colors duration-200">
                    {background.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}