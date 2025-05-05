import React, { useState, useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useColors } from "@/context/ColorContext";

interface ColorSwatchProps {
  label: string;
  colorKey: "text" | "background" | "primary" | "secondary" | "important";
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ label, colorKey }) => {
  const { pendingColors, updateColor } = useColors();
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState(pendingColors[colorKey]);
  const [isDragging, setIsDragging] = useState(false);

  // Update local state when pendingColors change externally
  useEffect(() => {
    setSelectedColor(pendingColors[colorKey]);
  }, [pendingColors, colorKey]);

  // Draw the color wheel when component mounts or when popover opens
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // For each angle, create a gradient from center to edge
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );

      // Add color stops for the gradient
      // White at center
      gradient.addColorStop(0, '#FFFFFF');
      // Full saturation color at middle
      gradient.addColorStop(0.5, `hsl(${angle}, 100%, 50%)`);
      // Black at edge
      gradient.addColorStop(1, '#000000');

      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw center white circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

  }, [isOpen]);

  const handleColorSelect = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Get position based on event type
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const color = `#${pixelData[0].toString(16).padStart(2, '0')}${pixelData[1].toString(16).padStart(2, '0')}${pixelData[2].toString(16).padStart(2, '0')}`;
    
    setSelectedColor(color);
    updateColor(colorKey, color);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      handleColorSelect(e);
    }
  };

  // Similar handlers for touch events
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      handleColorSelect(e);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="flex items-center py-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-6 h-6 border border-gray-300 mr-3 rounded"
            style={{ backgroundColor: selectedColor }}
            aria-label={`Pick ${label} color`}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <div className="text-sm font-medium mb-2">Select a color for {label}</div>
          <canvas 
            ref={canvasRef} 
            width="200" 
            height="200" 
            onClick={handleColorSelect}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className="cursor-crosshair"
          />
          <div className="flex justify-between items-center mt-2">
            <div
              className="w-8 h-8 rounded border border-gray-300"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="font-mono text-sm">{selectedColor}</div>
          </div>
        </PopoverContent>
      </Popover>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default ColorSwatch;
