
import React, { useRef } from "react";
import { useColors } from "@/context/ColorContext";
import { useToast } from "@/hooks/use-toast";

const LogoUploader: React.FC = () => {
  const { logoUrl, setLogoUrl } = useColors();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoUrl(event.target.result as string);
        toast({
          title: "Logo uploaded",
          description: "Your logo has been updated in the preview"
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden border border-gray-200">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <svg 
              className="w-8 h-8 text-orange-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 3a9 9 0 1 0 9 9H3a9 9 0 0 0 9-9Z" />
              <path d="M12 3v6" />
            </svg>
          )}
        </div>
      </div>
      <button
        onClick={handleClick}
        className="text-sm text-blue-600 hover:text-blue-800 mt-2"
      >
        Change
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default LogoUploader;
