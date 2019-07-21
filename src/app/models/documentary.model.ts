import { Poster } from './poster.module';

export class Documentary {
    id: number;
    title: string;
    slug: string;
    storyline: string;
    summary: string;
    year: number;
    length: number;
    status: string;
    views: number;
    short_url: string;
    wide_image: string;
    video_source: string;
    video_id: string;
    featured: boolean;
    created_at: string;
    updated_at: string;
    posterFile: string;
}