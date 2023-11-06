import React, { ChangeEvent } from "react";

interface LogoProps {
  onSelectLogo: (file: File) => void;
  logoName: string;
}

const Logo: React.FC<LogoProps> = ({ onSelectLogo, logoName }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onSelectLogo(file);
    }
  };

  return (
    <div className="flex items-center">
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default Logo;
