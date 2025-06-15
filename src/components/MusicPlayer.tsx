import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [currentTrack, setCurrentTrack] = useState("Фоновая мелодия 1");

  const backgroundTracks = [
    "Фоновая мелодия 1",
    "Акустическая гитара",
    "Лёгкий джаз",
    "Электронная музыка",
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const currentIndex = backgroundTracks.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % backgroundTracks.length;
    setCurrentTrack(backgroundTracks[nextIndex]);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Headphones" size={20} className="text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Музыкальное сопровождение
        </h2>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mb-4">
        <div className="text-center mb-3">
          <div className="text-sm text-gray-600 mb-1">Сейчас играет:</div>
          <div className="font-medium text-gray-800">{currentTrack}</div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={nextTrack}
            className="border-purple-200 hover:bg-purple-50"
          >
            <Icon name="SkipBack" size={16} />
          </Button>

          <Button
            onClick={togglePlay}
            className="bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-full"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTrack}
            className="border-purple-200 hover:bg-purple-50"
          >
            <Icon name="SkipForward" size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Icon name="Volume2" size={16} className="text-gray-600" />
          <div className="flex-1">
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <span className="text-sm text-gray-600 w-8">{volume[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
