import React, { useState } from "react";
import WordInput from "./WordInput";
import SongDisplay from "./SongDisplay";
import MusicPlayer from "./MusicPlayer";

const SongComposer: React.FC = () => {
  const [words, setWords] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSong = async () => {
    if (!words.trim()) return;

    setIsGenerating(true);

    // Симуляция генерации текста песни
    setTimeout(() => {
      const wordsArray = words
        .split(/[,\s]+/)
        .filter((word) => word.length > 0);
      const generatedLyrics = createLyrics(wordsArray);
      setLyrics(generatedLyrics);
      setIsGenerating(false);
    }, 2000);
  };

  const createLyrics = (wordsArray: string[]) => {
    const templates = [
      `Куплет 1:
${wordsArray[0] || "Слово"} в моём сердце звучит,
${wordsArray[1] || "Мечта"} меня вдаль манит,
${wordsArray[2] || "Дорога"} стелется впереди,
${wordsArray[0] || "Слово"} со мной, позади.

Припев:
${wordsArray.slice(0, 2).join(" и ") || "Слова и мечты"} — это всё что нужно,
${wordsArray.slice(1, 3).join(", ") || "В сердце моём"} — звучит так дружно,
${wordsArray[0] || "Жизнь"} прекрасна, ${wordsArray[1] || "мир"} удивителен,
${wordsArray.join(", ") || "Каждый момент"} — просто восхитителен!

Куплет 2:
${wordsArray[2] || "Солнце"} встаёт над землёй,
${wordsArray[3] || "Ветер"} играет со мной,
${wordsArray[0] || "Счастье"} найти так легко,
Когда ${wordsArray[1] || "любовь"} рядом, далеко.`,
    ];

    return templates[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-montserrat">
            🎵 Студия песенного творчества
          </h1>
          <p className="text-gray-600 text-lg">
            Превратите ваши слова в музыкальные строки
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <WordInput
              words={words}
              onWordsChange={setWords}
              onGenerate={generateSong}
              isGenerating={isGenerating}
            />
            <MusicPlayer />
          </div>

          <div>
            <SongDisplay lyrics={lyrics} isGenerating={isGenerating} />
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          Создавайте, экспериментируйте и наслаждайтесь процессом творчества! 🎶
        </div>
      </div>
    </div>
  );
};

export default SongComposer;
