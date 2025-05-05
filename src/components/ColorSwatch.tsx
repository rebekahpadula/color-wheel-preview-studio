
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useColors } from "@/context/ColorContext";

interface ColorSwatchProps {
  label: string;
  colorKey: "text" | "background" | "primary" | "secondary" | "important";
}

const PREDEFINED_COLORS = [
  '#A00505', '#BA690B', '#BAB26C', '#329D0C', '#06A7B1', '#005DB4', '#310393', '#9B0079', '#000000',
  '#EC0C0C', '#FB8C0A', '#F8E007', '#4EF314', '#0DE1EF', '#0A83F3', '#5307F4', '#E80FB8', '#5A5A5A',
  '#FF7C7C', '#FFBC6D', '#FFF38B', '#B9FFA0', '#90F8FF', '#7BC0FF', '#A175FF', '#FF82E3', '#CECECE',
  '#FFBFBF', '#FFE1BE', '#FFFBD4', '#E2FFD8', '#D7FDFF', '#C3E2FF', '#E5D9FF', '#FFDCF7', '#FFFFFF'
];

const ColorSwatch: React.FC<ColorSwatchProps> = ({ label, colorKey }) => {
  const { pendingColors, updateColor } = useColors();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(pendingColors[colorKey]);

  // Update local state when pendingColors change externally
  React.useEffect(() => {
    setSelectedColor(pendingColors[colorKey]);
  }, [pendingColors, colorKey]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    updateColor(colorKey, color);
  };

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
        <PopoverContent className="w-[272px] p-4"> {/* Width to fit 9 colors per row */}
          <div className="text-sm font-medium mb-2">Select a color for {label}</div>
          <div className="grid grid-cols-9 gap-1">
            {PREDEFINED_COLORS.map((color, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded border border-gray-200 hover:border-gray-400 transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
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
