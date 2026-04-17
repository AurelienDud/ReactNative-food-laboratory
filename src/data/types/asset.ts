export type AssetType = 'image' | 'pdf' | 'other';

export interface Asset {
  id: number;
  uri: string;
  type: AssetType;
  mime_type: string | null;
  original_name: string | null;
  size: number | null;
  created_at: string;
}

export interface AssetFile {
  uri: string;
  name: string;
  mimeType?: string | null;
  size?: number | null;
}

export interface AssetFormData extends AssetFile {
  type: AssetType;
}