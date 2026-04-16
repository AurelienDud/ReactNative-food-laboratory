import { initDb } from "@/src/data/db";
import { queryClient } from "@/src/data/query";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@src/theme/useColorScheme.web";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const AppProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  const colorScheme = useColorScheme();
  const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
  });
  const [isDbLoading, setIsDbLoading] = useState(true);

  useEffect(() => {
    initDb().then(() => setIsDbLoading(false));
  }, []);
  
  if (isDbLoading) {
    return <></>
  }

  return (
    <SafeAreaProvider> 
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme}>
          <ThemeProvider value={colorScheme === 'dark' ? AdaptedDarkTheme : AdaptedLightTheme}>
              {children}
          </ThemeProvider>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}