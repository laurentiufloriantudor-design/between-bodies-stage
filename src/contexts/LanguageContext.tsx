import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Language = "en" | "it" | "ro";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Cache: `${lang}:${text}` → translated string
const cache = new Map<string, string>();

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("bb-lang") as Language) || "en";
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [, forceRender] = useState(0);

  // Collect texts during render, batch-translate after
  const pendingTexts = useRef<Set<string>>(new Set());
  const batchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inflightRef = useRef<Set<string>>(new Set());

  const scheduleBatch = useCallback(() => {
    if (batchTimer.current) return;
    batchTimer.current = setTimeout(async () => {
      batchTimer.current = null;
      const lang = localStorage.getItem("bb-lang") || "en";
      if (lang === "en") return;

      const toTranslate = [...pendingTexts.current].filter(
        (t) => !cache.has(`${lang}:${t}`) && !inflightRef.current.has(`${lang}:${t}`)
      );
      pendingTexts.current.clear();
      if (toTranslate.length === 0) return;

      toTranslate.forEach((t) => inflightRef.current.add(`${lang}:${t}`));
      setIsTranslating(true);

      try {
        const { data, error } = await supabase.functions.invoke("translate", {
          body: { texts: toTranslate, targetLang: lang },
        });

        if (!error && data?.translations) {
          const translations = data.translations as string[];
          toTranslate.forEach((text, i) => {
            const translated = translations[i] || text;
            cache.set(`${lang}:${text}`, typeof translated === "string" ? translated : text);
          });
        }
      } catch (e) {
        console.error("Translation batch error:", e);
      } finally {
        toTranslate.forEach((t) => inflightRef.current.delete(`${lang}:${t}`));
        setIsTranslating(false);
        forceRender((n) => n + 1);
      }
    }, 50); // 50ms debounce to collect all texts from a single render
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("bb-lang", lang);
    // Trigger re-translation for new language
    forceRender((n) => n + 1);
  }, []);

  const t = useCallback(
    (text: string): string => {
      if (language === "en") return text;
      const key = `${language}:${text}`;
      const cached = cache.get(key);
      if (cached) return cached;

      // Queue for batch translation
      pendingTexts.current.add(text);
      scheduleBatch();
      return text; // Return original until translated
    },
    [language, scheduleBatch]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
