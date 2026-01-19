
"use client";

import { useState, useEffect } from 'react';

const SETTINGS_STORAGE_KEY = 'gradex_settings';

export type Settings = {
  highRiskThreshold: number;
  mediumRiskThreshold: number;
  lowRiskThreshold: number;
};

const defaultSettings: Settings = {
    highRiskThreshold: 2.0,
    mediumRiskThreshold: 2.7,
    lowRiskThreshold: 3.5,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        setSettings(defaultSettings);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
      }
    } catch (error) {
      console.error("Failed to load or parse settings from localStorage", error);
      setSettings(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
  };

  return { settings, isLoading, saveSettings };
}
