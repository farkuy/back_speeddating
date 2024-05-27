import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {UserProfileService} from "./user_profile.service";
import {CreateUserProfile} from "./dto/create_user_profile.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UserProfile} from "./user_profile.model";

@Controller('user-profile')
export class UserProfileController {
    constructor(private roleService: UserProfileService) {}

    @ApiOperation({summary: 'создать профиль пользователя'})
    @ApiResponse({status: 200, type: UserProfile})
    @Post()
    create(@Body() dto: CreateUserProfile) {
        return this.roleService.createProfile(dto);
    }

    @ApiOperation({summary: 'изменение профиля пользователя'})
    @ApiResponse({status: 200, type: UserProfile})
    @Put('/:id')
    changeProfile(@Param('id') id: number, @Body() dto: CreateUserProfile) {
        return this.roleService.changeProfile(id, dto);
    }

    @ApiOperation({summary: 'получить профиль пользователя'})
    @ApiResponse({status: 200, type: UserProfile})
    @Get('/:id')
    getProfile(@Param('id') id: number) {
        return this.roleService.getProfile(id);
    }
}
