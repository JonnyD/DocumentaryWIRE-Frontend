import { Series } from './series.model';
import { Movie } from './movie.model';

export class Documentary {
    id: number;
    title: string;
    slug: string;
    category: number;
    storyline: string;
    summary: string;
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
    movie: Movie;
    series: Series;
}