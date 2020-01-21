import { Episodic } from './episodic.model';
import { Standalone } from './standalone.model';
import { VideoSource } from './video-source.model';
import { Category } from './category.model';

export class Documentary {
    id: number;
    title: string;
    slug: string;
    category: number;
    storyline: string;
    summary: string;
    year: number;
    yearFrom: number;
    yearTo: number;
    length: number;
    status: string;
    views: number;
    shortUrl: string;
    wideImage: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    poster: string;
    imdbId: string;
    type: string;
    standalone: Standalone;
    episodic: Episodic;
}