import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface SongDisplayProps {
  lyrics: string;
  isGenerating: boolean;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ lyrics, isGenerating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLyrics, setEditedLyrics] = useState(lyrics);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    setEditedLyrics(lyrics);
  }, [lyrics]);

  const handleSave = () => {
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleExport = (format: "txt" | "mp3") => {
    if (format === "txt") {
      const blob = new Blob([editedLyrics], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "song-lyrics.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleShare = (platform: string) => {
    const text = `Послушайте мою новую песню! 🎵\n\n${editedLyrics.slice(0, 100)}...`;
    const url = encodeURIComponent(window.location.href);

    const shareUrls = {
      vk: `https://vk.com/share.php?url=${url}&title=${encodeURIComponent(text)}`,
      telegram: `https://t.me/share/url?url=${url}&text=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  const highlightStructure = (text: string) => {
    return text.split("\n").map((line, index) => {
      const isVerse = line.startsWith("Куплет");
      const isChorus = line.startsWith("Припев");

      return (
        <div
          key={index}
          className={`${isVerse ? "text-blue-700 font-semibold" : ""} 
                     ${isChorus ? "text-purple-700 font-semibold" : ""}`}
        >
          {line}
        </div>
      );
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Music" size={20} className="text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Ваша песня</h2>
        </div>

        {lyrics && !isGenerating && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="border-purple-200 hover:bg-purple-50"
            >
              <Icon name={isEditing ? "X" : "Edit3"} size={14} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Icon name="Download" size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("txt")}>
                  <Icon name="FileText" size={14} className="mr-2" />
                  Скачать текст
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("mp3")}>
                  <Icon name="Music" size={14} className="mr-2" />
                  Экспорт MP3 (скоро)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Icon name="Share2" size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShare("vk")}>
                  <Icon name="Share" size={14} className="mr-2" />
                  ВКонтакте
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("telegram")}>
                  <Icon name="MessageCircle" size={14} className="mr-2" />
                  Telegram
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("twitter")}>
                  <Icon name="Twitter" size={14} className="mr-2" />
                  Twitter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className={`border-purple-200 hover:bg-purple-50 ${isSaved ? "bg-green-50 border-green-200" : ""}`}
            >
              <Icon name={isSaved ? "Check" : "Heart"} size={14} />
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 min-h-[200px] border border-purple-100">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
            <span>Создаю текст песни...</span>
          </div>
        ) : lyrics ? (
          isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editedLyrics}
                onChange={(e) => setEditedLyrics(e.target.value)}
                className="min-h-[300px] text-base resize-none border-purple-200 focus:border-purple-400"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Icon name="Check" size={14} className="mr-1" />
                  Сохранить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  size="sm"
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-line text-gray-700 leading-relaxed font-medium">
              {highlightStructure(editedLyrics)}
            </div>
          )
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
