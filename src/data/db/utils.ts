import { Directory, File, Paths } from 'expo-file-system';

/**
 * Helper to cleanup nullable text
 */
export function cleanNullableText(value?: string): string | null {
  const cleanValue = value?.trim();

  return cleanValue ?? null;
}

/**
 * Save file locally on the device
 */
export async function saveFileLocally(source_uri: string, source_name: string | null): Promise<string> {
  // Ensure the /assets subdirectory exists
  const assetsDir = new Directory(Paths.document, 'assets');
  if (!assetsDir.exists) {
    assetsDir.create({ intermediates: true });
  }

  // Build a unique filename to avoid collisions
  const safeName = `${Date.now()}_${source_name ?? 'asset'}`;
  const destination = new File(assetsDir, safeName);

  // Copy from the picker's temporary URI into our persistent directory
  const sourceFile = new File(source_uri);
  sourceFile.copy(destination);

  return destination.uri;
};