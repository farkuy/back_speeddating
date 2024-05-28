import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {PreferredTypeService} from "./preferred_type.service";
import {CreateUserPreferred} from "./dto/preferred_type.dto";
import {Preferred} from "./preferred_type.model";

@Controller('preferred-type')
export class PreferredTypeController {
    constructor(private preferredTypeService: PreferredTypeService) {}

    @ApiOperation({summary: 'создать предпочтения пользователя'})
    @ApiResponse({status: 200, type: Preferred})
    @Post()
    create(@Body() dto: CreateUserPreferred) {
        return this.preferredTypeService.createPreferred(dto);
    }

    @ApiOperation({summary: 'изменение предпочтения пользователя'})
    @ApiResponse({status: 200, type: Preferred})
    @Put('/:id')
    changePreferred(@Param('id') id: number, @Body() dto: CreateUserPreferred) {
        return this.preferredTypeService.changePreferred(id, dto);
    }

    @ApiOperation({summary: 'получить предпочтения пользователя'})
    @ApiResponse({status: 200, type: Preferred})
    @Get('/:id')
    getPreferred(@Param('id') id: number) {
        return this.preferredTypeService.getPreferred(id);
    }
}
