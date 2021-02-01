import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    
    // expressjs에서는 수동으로 import를 통해서 service에 접근하지만
    // nextjs에서는 요청을 통해서 service에 접근한다.
    constructor(private readonly moviesService: MoviesService) { }
    
    @Get()
    getAll() : Movie[] {
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query("year") searchingYear: string){
        return `We are searching for a movie made after: ${searchingYear} `;
    }

    @Get('/:id')
    getOne(@Param('id') movieId: string): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData){        
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: string ){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData){
        return this.moviesService.update(movieId, updateData);
    }
}
