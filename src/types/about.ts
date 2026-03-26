export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export interface AboutBlock {
  title: string;
  videos: VideoItem[];
  ctaButton: {
    text: string;
    action: string;
  };
}