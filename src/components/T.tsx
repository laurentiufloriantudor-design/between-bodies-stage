import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Translation wrapper component.
 * Usage: <T>English text here</T>
 * Renders translated text when a non-English language is selected.
 */
const T = ({ children }: { children: string }) => {
  const { language, translate } = useLanguage();
  const [translated, setTranslated] = useState(children);

  useEffect(() => {
    if (language === "en") {
      setTranslated(children);
      return;
    }

    let cancelled = false;
    translate([children]).then(([result]) => {
      if (!cancelled) setTranslated(result);
    });

    return () => { cancelled = true; };
  }, [children, language, translate]);

  return <>{translated}</>;
};

export default T;
