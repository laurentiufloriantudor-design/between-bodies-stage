import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Language = "en" | "it" | "ro";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (texts: string[]) => Promise<string[]>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Global cache: key = `${lang}:${text}` → translated string
const translationCache = new Map<string, string>();

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("bb-lang");
    return (saved as Language) || "en";
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const pendingRef = useRef<Map<string, Promise<string[]>>>(new Map());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("bb-lang", lang);
  }, []);

  const translate = useCallback(async (texts: string[]): Promise<string[]> => {
    if (language === "en") return texts;

    // Check cache
    const uncached: { index: number; text: string }[] = [];
    const results: string[] = new Array(texts.length);

    texts.forEach((text, i) => {
      const key = `${language}:${text}`;
      const cached = translationCache.get(key);
      if (cached) {
        results[i] = cached;
      } else {
        uncached.push({ index: i, text });
      }
    });

    if (uncached.length === 0) return results;

    // Batch translate uncached texts
    const batchKey = `${language}:${uncached.map(u => u.text).join("|||")}`;
    
    let promise = pendingRef.current.get(batchKey);
    if (!promise) {
      setIsTranslating(true);
      promise = (async () => {
        try {
          const { data, error } = await supabase.functions.invoke("translate", {
            body: { texts: uncached.map(u => u.text), targetLang: language },
          });

          if (error) {
            console.error("Translation error:", error);
            return uncached.map(u => u.text);
          }

          return data.translations as string[];
        } catch (e) {
          console.error("Translation error:", e);
          return uncached.map(u => u.text);
        } finally {
          pendingRef.current.delete(batchKey);
          setIsTranslating(false);
        }
      })();
      pendingRef.current.set(batchKey, promise);
    }

    const translations = await promise;
    
    uncached.forEach((item, i) => {
      const translated = translations[i] || item.text;
      translationCache.set(`${language}:${item.text}`, translated);
      results[item.index] = translated;
    });

    return results;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
