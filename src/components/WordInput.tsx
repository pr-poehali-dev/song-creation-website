import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="PenTool" size={20} className="text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Введите слова</h2>
      </div>

      <Textarea
        placeholder="Введите слова, которые хотите использовать в песне... (например: любовь, солнце, мечта, дорога)"
        value={words}
        onChange={(e) => onWordsChange(e.target.value)}
        className="min-h-[120px] text-base resize-none border-purple-200 focus:border-purple-400"
      />

      <Button
        onClick={onGenerate}
        disabled={!words.trim() || isGenerating}
        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2.5"
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
