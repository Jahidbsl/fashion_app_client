"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@heroui/react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-14 rounded-full bg-default-100 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <Switch
      isSelected={isDark}
      onChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label="Toggle theme"
      size="lg"
    >
      {({ isSelected }) => {
        const IconComponent = isSelected ? Sun : Moon;
        return (
          <Switch.Content>
            <Switch.Control className="[--switch-control-bg-checked-hover:var(--tertiary)] [--switch-control-bg-checked:var(--tertiary)]">
              <Switch.Thumb>
                <Switch.Icon>
                  <IconComponent
                    className={`size-3 text-inherit ${
                      isSelected ? "opacity-100" : "opacity-70"
                    }`}
                  />
                </Switch.Icon>
              </Switch.Thumb>
            </Switch.Control>
          </Switch.Content>
        );
      }}
    </Switch>
  );
}