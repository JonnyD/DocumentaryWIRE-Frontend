import { VideoSource } from './video-source.model';
export class Documentary {
    id: number;
    title: string;
    slug: string;
    category: number;
    storyline: string;
    summary: string;
    year: number;
    length: number;
    status: string;
    views: number;
    shortUrl: string;
    wideImage: string;
    videoSource: VideoSource;
    videoId: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    poster: string;
}