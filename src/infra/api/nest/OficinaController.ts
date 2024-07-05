import {
  Controller,
  Body,
  Query,
  Post,
  Put,
  Delete,
  Get,
  HttpCode,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import OficinaMemoryRepository from 'src/infra/repository/OficinaMemoryRepository';
import OficinaRepository from 'src/domain/repository/OficinaRepository';
import GeocodingOpenStreetMapGateway from 'src/infra/gateway/GeocodingOpenStreetMapGateway';
import GeocodingGateway from 'src/application/gateway/GeocodingGateway';
import CreateOficina from 'src/application/use-case/CreateOficina';
import UpdateOficina from 'src/application/use-case/UpdateOficina';
import DeleteOficina from 'src/application/use-case/DeleteOficina';
import GetAllOficina from 'src/application/use-case/GetAllOficina';
import GetOficinaById from 'src/application/use-case/GetOficinaById';
import GetOficinasByCoordinateAndRadius from 'src/application/use-case/GetOficinasByCoordinateAndRadius';
import {
  CreateOficinaInputDto,
  GetOficinasByCoordinateAndRadiusOutputDto,
  OficinaIdOutputDto,
  OficinaOutputDto,
  UpdateOficinaInputDto,
} from './OficinaDto';

@Controller('oficina')
@ApiTags('Oficina')
export class OficinaController {
  private readonly oficinaRepository: OficinaRepository =
    new OficinaMemoryRepository();
  private readonly geocodingGateway: GeocodingGateway =
    new GeocodingOpenStreetMapGateway();

  constructor() {}

  @Post('create')
  @ApiBody({ type: CreateOficinaInputDto })
  @ApiCreatedResponse({ type: OficinaIdOutputDto })
  async createOficina(
    @Body() input: CreateOficinaInputDto,
  ): Promise<OficinaIdOutputDto> {
    try {
      const createOficina = new CreateOficina(
        this.oficinaRepository,
        this.geocodingGateway,
      );
      return await createOficina.execute({
        nome: input.nome,
        endereco: input.endereco,
      });
    } catch (error) {
      if (error.message.includes('Nome')) {
        throw new BadRequestException(error.message);
      }
      if (error.message.includes('Endereço não encontrado')) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('update')
  @ApiBody({ type: UpdateOficinaInputDto })
  @HttpCode(204)
  async updateOficina(
    @Query('oficinaId') oficinaId: string,
    @Body() input: UpdateOficinaInputDto,
  ): Promise<void> {
    try {
      const updateOficina = new UpdateOficina(
        this.oficinaRepository,
        this.geocodingGateway,
      );
      await updateOficina.execute({
        oficinaId: oficinaId,
        nome: input.nome,
        endereco: input.endereco,
      });
    } catch (error) {
      if (error.message === 'Oficina não encontrada') {
        throw new NotFoundException(error.message);
      }
      if (error.message.includes('Nome')) {
        throw new NotFoundException(error.message);
      }
      if (error.message.includes('Endereço não encontrado')) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('delete')
  @HttpCode(204)
  async deleteOficina(@Query('oficinaId') oficinaId: string): Promise<void> {
    try {
      const deleteOficina = new DeleteOficina(this.oficinaRepository);
      await deleteOficina.execute(oficinaId);
    } catch (error) {
      if (error.message === 'Oficina não encontrada') {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('GetAll')
  @ApiOkResponse({ type: [OficinaOutputDto] })
  async getAllOficinas(): Promise<OficinaOutputDto[]> {
    const getAllOficinas = new GetAllOficina(this.oficinaRepository);
    return await getAllOficinas.execute();
  }

  @Get('getById')
  @ApiOkResponse({ type: OficinaOutputDto })
  async getOficinaById(
    @Query('oficinaId') oficinaId: string,
  ): Promise<OficinaOutputDto> {
    try {
      const getOficinaById = new GetOficinaById(this.oficinaRepository);
      return await getOficinaById.execute(oficinaId);
    } catch (error) {
      if (error.message === 'Oficina não encontrada') {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('getByCoordinateAndRadius')
  @ApiOkResponse({ type: [GetOficinasByCoordinateAndRadiusOutputDto] })
  async getOficinasByCoordinateAndRadius(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('raioKm') raioKm: number,
  ): Promise<GetOficinasByCoordinateAndRadiusOutputDto[]> {
    const getOficinasByCoordinateAndRadius =
      new GetOficinasByCoordinateAndRadius(this.oficinaRepository);
    return await getOficinasByCoordinateAndRadius.execute({
      latitude: latitude,
      longitude: longitude,
      raioKm: raioKm,
    });
  }
}
