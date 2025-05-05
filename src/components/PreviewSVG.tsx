
import React from "react";
import { useColors } from "@/context/ColorContext";

const PreviewSVG: React.FC = () => {
  const { pendingColors, logoUrl } = useColors();
  
  return (
    <div className="w-full bg-gray-50 rounded-md p-4 border border-gray-200">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 500 300" 
        style={{ maxHeight: "300px" }}
        className="rounded shadow-sm"
      >
        {/* Background */}
        <rect 
          x="0" 
          y="0" 
          width="500" 
          height="300" 
          fill={pendingColors.background} 
        />
        
        {/* Header */}
        <rect 
          x="0" 
          y="0" 
          width="500" 
          height="60" 
          fill={pendingColors.primary} 
        />
        
        {/* Logo/Cog in header */}
        {logoUrl ? (
          <image 
            x="20" 
            y="15" 
            width="30" 
            height="30" 
            href={logoUrl} 
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <g transform="translate(35, 30)">
            <path 
              d="M12 15H7a1 1 0 0 1-.82-1.57l3.12-4.05a1 1 0 0 1 1.64 0l3.12 4.05A1 1 0 0 1 13 15h-1z"
              fill={pendingColors.important}
            />
            <path 
              d="M11.23 7.25a2.5 2.5 0 0 0-4.46 0l-4.2 9a.75.75 0 0 0 .69 1.05h11.48a.75.75 0 0 0 .69-1.05z"
              fill={pendingColors.important}
            />
          </g>
        )}
        
        {/* Title text */}
        <text 
          x="70" 
          y="38" 
          fontFamily="Arial" 
          fontSize="20" 
          fill="#ffffff"
        >
          Acme Widgets Dashboard
        </text>
        
        {/* Sidebar */}
        <rect 
          x="0" 
          y="60" 
          width="100" 
          height="240" 
          fill="#f5f5f5" 
        />
        
        {/* Sidebar Menu Items */}
        {["Dashboard", "Reports", "Settings", "Users", "Help"].map((item, index) => (
          <g key={index}>
            <rect 
              x="0" 
              y={80 + index * 40} 
              width="100" 
              height="36" 
              fill={index === 2 ? pendingColors.secondary + "30" : "transparent"} 
            />
            <text 
              x="20" 
              y={102 + index * 40} 
              fontFamily="Arial" 
              fontSize="12" 
              fill={pendingColors.text}
            >
              {item}
            </text>
          </g>
        ))}
        
        {/* Main Content Area Title */}
        <text 
          x="120" 
          y="90" 
          fontFamily="Arial" 
          fontSize="18" 
          fontWeight="bold" 
          fill={pendingColors.text}
        >
          Settings Overview
        </text>
        
        {/* Cards */}
        {[0, 1, 2].map((index) => (
          <g key={index}>
            <rect 
              x={120 + index * 120} 
              y="110" 
              width="110" 
              height="80" 
              rx="4" 
              fill="#ffffff" 
              stroke="#e2e8f0" 
              strokeWidth="1"
            />
            <rect 
              x={120 + index * 120} 
              y="110" 
              width="110" 
              height="8" 
              fill={index === 0 ? pendingColors.primary : index === 1 ? pendingColors.secondary : pendingColors.important} 
            />
            <text 
              x={125 + index * 120} 
              y="135" 
              fontFamily="Arial" 
              fontSize="10" 
              fill={pendingColors.text}
            >
              {index === 0 ? "Users" : index === 1 ? "Activity" : "Security"}
            </text>
            <text 
              x={125 + index * 120} 
              y="155" 
              fontFamily="Arial" 
              fontSize="16" 
              fontWeight="bold" 
              fill={pendingColors.text}
            >
              {index === 0 ? "24" : index === 1 ? "85%" : "Good"}
            </text>
          </g>
        ))}
        
        {/* Table */}
        <rect 
          x="120" 
          y="200" 
          width="360" 
          height="80" 
          fill="#ffffff" 
          stroke="#e2e8f0" 
          strokeWidth="1"
        />
        <rect 
          x="120" 
          y="200" 
          width="360" 
          height="25" 
          fill={pendingColors.secondary + "20"} 
        />
        
        {/* Table headers */}
        {["Name", "Status", "Role", "Action"].map((header, index) => (
          <text 
            key={index}
            x={130 + index * 90} 
            y="217" 
            fontFamily="Arial" 
            fontSize="12" 
            fontWeight="bold" 
            fill={pendingColors.text}
          >
            {header}
          </text>
        ))}
        
        {/* Table rows */}
        {[0, 1].map((row) => (
          <g key={row}>
            <line 
              x1="120" 
              y1={225 + row * 27} 
              x2="480" 
              y2={225 + row * 27} 
              stroke="#e2e8f0" 
              strokeWidth="1"
            />
            <text 
              x="130" 
              y={242 + row * 27} 
              fontFamily="Arial" 
              fontSize="12" 
              fill={pendingColors.text}
            >
              {row === 0 ? "John Doe" : "Jane Smith"}
            </text>
            <rect 
              x="220" 
              y={232 + row * 27} 
              width="40" 
              height="16" 
              rx="8" 
              fill={row === 0 ? pendingColors.primary + "40" : pendingColors.important + "40"} 
            />
            <text 
              x="225" 
              y={244 + row * 27} 
              fontFamily="Arial" 
              fontSize="10" 
              fill={row === 0 ? pendingColors.primary : pendingColors.important}
            >
              {row === 0 ? "Active" : "Pending"}
            </text>
            <text 
              x="310" 
              y={242 + row * 27} 
              fontFamily="Arial" 
              fontSize="12" 
              fill={pendingColors.text}
            >
              {row === 0 ? "Admin" : "User"}
            </text>
            <rect 
              x="395" 
              y={232 + row * 27} 
              width="60" 
              height="20" 
              rx="4" 
              fill={pendingColors.secondary}
            />
            <text 
              x="407" 
              y={246 + row * 27} 
              fontFamily="Arial" 
              fontSize="10" 
              fill="#ffffff"
            >
              Edit
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default PreviewSVG;
