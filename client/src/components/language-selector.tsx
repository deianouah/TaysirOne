/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector() {
  const { language, setLanguage, languages, fetchEnabledLanguages } = useTranslation();

  useEffect(() => {
    fetchEnabledLanguages();
  }, []);

  const currentConfig = languages[language];

  return (
    <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
      <SelectTrigger className="w-auto min-w-[130px] px-4 py-2 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 rounded-xl" data-testid="select-language">
        <span className="flex items-center gap-2.5">
          <span className="text-lg leading-none filter drop-shadow-sm">{currentConfig?.flag}</span>
          <span className="font-semibold text-[13px] tracking-wide text-gray-700 dark:text-gray-200">{currentConfig?.nativeName || "Language"}</span>
        </span>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, config]) => (
          <SelectItem
            key={code}
            value={code}
            data-testid={`option-language-${code}`}
          >
            <span className="flex items-center gap-2">
              <span className="text-base leading-none">{config.flag}</span>
              <span>{config.nativeName}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
