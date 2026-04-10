import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Translation wrapper component.
 * Usage: <T>English text here</T>
 */
const T = ({ children }: { children: string }) => {
  const { t } = useLanguage();
  return <>{t(children)}</>;
};

export default T;
