import React, { useState } from "react";
import tinycolor from "tinycolor2";

const ColorGenerator: React.FC = () => {
  const [baseColor, setBaseColor] = useState<string>("");
  const [shades, setShades] = useState<number>(0);
  const [generatedShades, setGeneratedShades] = useState<string[]>([]);
  const [copiedShade, setCopiedShade] = useState<string | null>(null);

  const generateShades = () => {
    const color = tinycolor(baseColor);
    const newShades: string[] = [];

    for (let i = 0; i < shades; i++) {
      const percentage = (i + 1) * (100 / shades);
      newShades.push(color.clone().lighten(percentage).toHexString());
    }

    setGeneratedShades(newShades);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseColor(e.target.value);
  };

  const handleShadesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 20) {
      alert("You can only generate up to 20 shades.");
      setShades(20);
    } else {
      setShades(value);
    }
  };

  const copyToClipboard = (shade: string) => {
    navigator.clipboard.writeText(shade);
    setCopiedShade(shade);

    // Clear the "Copied!" message after 2 seconds
    setTimeout(() => setCopiedShade(null), 2000);
  };

  const getGridColumnsClass = () => {
    if (generatedShades.length <= 3) return "grid-cols-1";
    if (generatedShades.length <= 6) return "grid-cols-2";
    if (generatedShades.length <= 10) return "grid-cols-4";
    return "grid-cols-5";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-opacity-80">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-primary">
          Monochromatic Color Generator
        </h1>

        {/* Input for base color */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-primary">
            Base Color (Hex):{" "}
          </label>
          <input
            type="text"
            value={baseColor}
            onChange={handleColorChange}
            placeholder="Enter your Hex #ff5733"
            className="border border-primary p-2 w-full rounded-md"
          />
        </div>

        {/* Input for number of shades */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-primary">
            Number of Shades:{" "}
          </label>
          <input
            type="text"
            value={shades}
            onChange={handleShadesChange}
            min="1"
            max="20"
            className="border border-primary p-2 w-full rounded-md"
          />
        </div>

        {/* Button to generate shades */}
        <div className="mb-4">
          <button
            onClick={generateShades}
            className="bg-primary text-white p-2 rounded-md w-full hover:bg-accent hover:text-black shadow-md font-semibold"
          >
            Generate Shades
          </button>
        </div>

        {/* Displaying generated shades */}
        <div className={`grid gap-4 ${getGridColumnsClass()}`}>
          {generatedShades.length > 0 &&
            generatedShades.map((shade, index) => (
              <div
                key={index}
                onClick={() => copyToClipboard(shade)}
                className="w-full h-24 rounded-md flex items-center justify-center text-black font-bold cursor-pointer hover:opacity-80 transition relative"
                style={{ backgroundColor: shade }}
              >
                {shade}
                {copiedShade === shade && (
                  <span className="absolute bottom-2 text-xs bg-white text-black px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>

      <footer className="mt-8 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} Made with{" "}
          <span className="text-red-500">&hearts;</span> by BTech
        </p>
      </footer>
    </div>
  );
};

export default ColorGenerator;
