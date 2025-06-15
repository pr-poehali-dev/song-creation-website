import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface WordInputProps {
  words: string;
  onWordsChange: (words: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const WordInput: React.FC<WordInputProps> = ({
  words,
  onWordsChange,
  onGenerate,
  isGenerating,
}) => {
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState("happy");
  const [tempo, setTempo] = useState("medium");
  const [rhymeScheme, setRhymeScheme] = useState("abab");

  const wordSuggestions = [
    "любовь",
    "мечта",
    "солнце",
    "дорога",
    "счастье",
    "сердце",
    "душа",
    "свобода",
    "надежда",
    "весна",
    "звёзды",
    "океан",
  ];

  const addSuggestion = (word: string) => {
    if (!words.includes(word)) {
      onWordsChange(words ? `${words}, ${word}` : word);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="PenTool" size={20} className="text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Настройки песни</h2>
      </div>

      {/* Generation Settings */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Жанр
          </label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pop">Поп</SelectItem>
              <SelectItem value="rock">Рок</SelectItem>
              <SelectItem value="ballad">Баллада</SelectItem>
              <SelectItem value="folk">Фолк</SelectItem>
              <SelectItem value="rap">Рэп</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Настроение
          </label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="happy">Радостное</SelectItem>
              <SelectItem value="sad">Грустное</SelectItem>
              <SelectItem value="romantic">Романтичное</SelectItem>
              <SelectItem value="energetic">Энергичное</SelectItem>
              <SelectItem value="calm">Спокойное</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Темп
          </label>
          <Select value={tempo} onValueChange={setTempo}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Медленный</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="fast">Быстрый</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Рифма
          </label>
          <Select value={rhymeScheme} onValueChange={setRhymeScheme}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abab">ABAB</SelectItem>
              <SelectItem value="aabb">AABB</SelectItem>
              <SelectItem value="abcb">ABCB</SelectItem>
              <SelectItem value="free">Свободная</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Word Suggestions */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Предложения слов:
        </label>
        <div className="flex flex-wrap gap-2">
          {wordSuggestions.map((word) => (
            <Badge
              key={word}
              variant="outline"
              className="cursor-pointer hover:bg-purple-50 hover:border-purple-300"
              onClick={() => addSuggestion(word)}
            >
              {word}
            </Badge>
          ))}
        </div>
      </div>

      <Textarea
        placeholder="Введите слова, которые хотите использовать в песне... (например: любовь, солнце, мечта, дорога)"
        value={words}
        onChange={(e) => onWordsChange(e.target.value)}
        className="min-h-[120px] text-base resize-none border-purple-200 focus:border-purple-400 mb-4"
      />

      <Button
        onClick={onGenerate}
        disabled={!words.trim() || isGenerating}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2.5"
      >
        {isGenerating ? (
          <>
            <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
            Создаю песню...
          </>
        ) : (
          <>
            <Icon name="Sparkles" size={16} className="mr-2" />
            Сочинить песню
          </>
        )}
      </Button>
    </div>
  );
};

export default WordInput;
