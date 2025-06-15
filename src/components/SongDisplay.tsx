import React from "react";
import Icon from "@/components/ui/icon";

interface SongDisplayProps {
  lyrics: string;
  isGenerating: boolean;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ lyrics, isGenerating }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Music" size={20} className="text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Ваша песня</h2>
      </div>

      <div className="bg-white rounded-lg p-4 min-h-[200px] border border-purple-100">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
            <span>Создаю текст песни...</span>
          </div>
        ) : lyrics ? (
          <div className="whitespace-pre-line text-gray-700 leading-relaxed font-medium">
            {lyrics}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Icon name="FileText" size={32} className="mr-2 opacity-50" />
            <span>Здесь появится текст вашей песни</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDisplay;
