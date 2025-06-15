import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("Фоновая мелодия 1");
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"none" | "one" | "all">("none");
  const [progress, setProgress] = useState([0]);

  const backgroundTracks = [
    "Фоновая мелодия 1",
    "Акустическая гитара",
    "Лёгкий джаз",
    "Электронная музыка",
    "Классическое пианино",
    "Амбиент",
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextTrack = () => {
    const currentIndex = backgroundTracks.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % backgroundTracks.length;
    setCurrentTrack(backgroundTracks[nextIndex]);
  };

  const prevTrack = () => {
    const currentIndex = backgroundTracks.indexOf(currentTrack);
    const prevIndex =
      currentIndex === 0 ? backgroundTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(backgroundTracks[prevIndex]);
  };

  const getRepeatIcon = () => {
    switch (repeat) {
      case "one":
        return "Repeat1";
      case "all":
        return "Repeat";
      default:
        return "Repeat";
    }
  };

  const toggleRepeat = () => {
    const modes: Array<"none" | "one" | "all"> = ["none", "one", "all"];
    const currentIndex = modes.indexOf(repeat);
    setRepeat(modes[(currentIndex + 1) % modes.length]);
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
          <div className="text-sm text-gray-600 mb-2">Сейчас играет:</div>
          <Select value={currentTrack} onValueChange={setCurrentTrack}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backgroundTracks.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShuffle(!shuffle)}
            className={`${shuffle ? "text-purple-600" : "text-gray-400"} hover:text-purple-600`}
          >
            <Icon name="Shuffle" size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={prevTrack}
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

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRepeat}
            className={`${repeat !== "none" ? "text-purple-600" : "text-gray-400"} hover:text-purple-600`}
          >
            <Icon name={getRepeatIcon()} size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="p-0 text-gray-600 hover:text-purple-600"
          >
            <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
          </Button>
          <div className="flex-1">
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <span className="text-sm text-gray-600 w-8">
            {isMuted ? 0 : volume[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
