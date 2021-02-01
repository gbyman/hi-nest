import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string):Movie {
        // string인 ID를 int로 형변환
        //return this.movies.find(movie => movie.id === parseInt(id));
        // return this.movies.find(movie => movie.id === +id);  위와 동일한 결과
        const movie = this.movies.find(movie => movie.id === +id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id: string) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id: string, updateData) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
        // 가짜 데이터 베이스라서 삭제후 새로운 데이터 입력하는 방식으로 작성
    }
}
