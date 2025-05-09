
import React from "react";
import { useColors } from "@/context/ColorContext";
import ColorSwatch from "./ColorSwatch";
import PreviewSVG from "./PreviewSVG";
import LogoUploader from "./LogoUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppearanceSettings: React.FC = () => {
  const { 
    pendingColors, 
    colors,
    applyColors, 
    resetToDefault, 
    cancelChanges,
    useSystemFont,
    setUseSystemFont
  } = useColors();
  const { toast } = useToast();

  const handleApplyColors = () => {
    if (hasLowContrast()) {
      // Show warning toast but still apply colors
      toast({
        title: "Low contrast warning",
        description: "The selected colors have low contrast and may be difficult to read for some users",
        variant: "destructive"
      });
    }
    
    applyColors();
    toast({
      title: "Colors saved",
      description: "Your color settings have been applied",
    });
  };

  const handleResetToDefault = () => {
    resetToDefault();
    toast({
      title: "Colors reset",
      description: "Your color settings have been reset to default values",
    });
  };

  const handleCancelChanges = () => {
    cancelChanges();
    toast({
      title: "Changes discarded",
      description: "Your changes have been discarded",
    });
  };

  // Check if background color has enough contrast with text color
  const hasLowContrast = () => {
    // Simple contrast check - this is just a basic implementation
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null;
    };

    const bgRgb = hexToRgb(pendingColors.background);
    const textRgb = hexToRgb(pendingColors.text);
    const primaryRgb = hexToRgb(pendingColors.primary);

    if (!bgRgb || !textRgb || !primaryRgb) return false;

    // Calculate relative luminance
    const luminance = (rgb: { r: number; g: number; b: number }) => {
      const a = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const bgLum = luminance(bgRgb);
    const textLum = luminance(textRgb);
    const primaryLum = luminance(primaryRgb);

    // Calculate contrast ratio
    const contrastRatio = (l1: number, l2: number) => {
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const textContrast = contrastRatio(bgLum, textLum);
    const primaryContrast = contrastRatio(bgLum, primaryLum);

    // WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text
    return textContrast < 4.5 || primaryContrast < 3;
  };

  const fontClass = useSystemFont ? "font-system" : "";

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-2xl font-semibold mb-8 ${fontClass}`}>Appearance</h1>
        
        <section className="mb-8">
          <h2 className={`text-xl font-medium mb-4 ${fontClass}`}>Logomark</h2>
          <LogoUploader />
        </section>
        
        <section className="mb-8">
          <h2 className={`text-xl font-medium mb-4 ${fontClass}`}>Colors</h2>
          
          <div className="min-h-[96px] relative">
            {hasLowContrast() && (
              <Alert 
                variant="destructive" 
                className="mb-4 bg-orange-50 border-orange-200 animate-in fade-in slide-in-from-top-1 duration-300"
              >
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-800">Low Contrast Warning</AlertTitle>
                <AlertDescription className="text-orange-700">
                  The background color needs more contrast with the text and primary colors for WCAG AA compliance. 
                  You can still apply these colors, but they may be difficult to read for some users.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <ColorSwatch label="Text" colorKey="text" />
              <ColorSwatch label="Background" colorKey="background" />
              <ColorSwatch label="Primary" colorKey="primary" />
              <ColorSwatch label="Secondary" colorKey="secondary" />
              <ColorSwatch label="Important" colorKey="important" />
              
              <div className="pt-4 flex gap-2 flex-wrap">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleResetToDefault}
                  className="flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Reset to Default
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Preview</h3>
              <PreviewSVG />
            </div>
          </div>
          
          <div className="flex justify-end mt-6 gap-3">
            <Button 
              variant="outline" 
              onClick={handleCancelChanges}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApplyColors}
            >
              Apply Colors
            </Button>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className={`text-xl font-medium mb-4 ${fontClass}`}>Header Typeface</h2>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="system-font" 
              checked={useSystemFont}
              onCheckedChange={(checked) => {
                setUseSystemFont(checked as boolean);
              }}
            />
            <label 
              htmlFor="system-font" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use the default typeface of the user's OS for headers
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppearanceSettings;
