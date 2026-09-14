import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Post, Param, Query, Body, Headers, ForbiddenException, ValidationPipe } from '@nestjs/common';
import { IsArray, IsIn, IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { RosterService } from './roster.service';
import type { Role } from './types';

export const categories = [{id:'policy',nameEn:'Public Policy',nameAr:'السياسات العامة',slug:'public-policy'},{id:'technology',nameEn:'Technology',nameAr:'التكنولوجيا',slug:'technology'}];
export class SearchDto { @IsOptional() @IsString() query?:string; @IsOptional() @IsString() category?:string; @IsOptional() @IsString() location?:string; @IsOptional() @IsString() language?:string; }
export class SubmissionDto { @IsEmail() email!:string; @IsString() @MinLength(2) name!:string; @IsString() headlineEn!:string; @IsString() headlineAr!:string; @IsString() bioEn!:string; @IsString() bioAr!:string; @IsString() location!:string; @IsArray() @IsString({each:true}) languages!:string[]; @IsString() categoryId!:string; @IsString() consentVersion!:string; }
export class DecisionDto { @IsString() @IsIn(['APPROVED','REJECTED']) status!: 'APPROVED'|'REJECTED'; @IsOptional() @IsString() @MinLength(3) reason?:string; }
@Controller() export class RosterController { constructor(private readonly service:RosterService){} @Get('health') health(){return {status:'ok',service:'women-experts-api'};} @Get('api/v1/categories') categories(){return categories;} @Get('api/v1/experts') experts(@Query() q:SearchDto){return {data:this.service.search(q),filters:q};} @Post('api/v1/submissions') submit(@Body() dto:SubmissionDto){return this.service.submit(dto);} @Get('api/v1/admin/submissions') pending(@Headers('x-role') role:Role='EXPERT'){if(role!=='REVIEWER'&&role!=='ADMIN')throw new ForbiddenException();return {data:this.service.pending()};} @Post('api/v1/admin/profiles/:id/decision') decision(@Param('id') id:string,@Body() dto:DecisionDto,@Headers('x-role') role:Role='EXPERT'){return this.service.decide(id,dto,role);} }
@Module({controllers:[RosterController],providers:[RosterService]}) export class AppModule {}
NestFactory.create(AppModule).then(app=>{app.enableCors();app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true}));app.listen(process.env.PORT||4000,'0.0.0.0');});
