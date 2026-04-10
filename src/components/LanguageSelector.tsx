import { useLanguage, type Language } from "@/contexts/LanguageContext";

const languages: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "ro", flag: "🇷🇴", label: "Română" },
];

const LanguageSelector = () => {
  const { language, setLanguage, isTranslating } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-xl px-1.5 py-1 rounded transition-all duration-300 hover:scale-110 ${
            language === lang.code
              ? "opacity-100 bg-foreground/10"
              : "opacity-40 hover:opacity-80"
          } ${isTranslating ? "animate-pulse" : ""}`}
          aria-label={lang.label}
          title={lang.label}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
