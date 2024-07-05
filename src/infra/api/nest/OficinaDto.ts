import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class OficinaIdOutputDto {
  @ApiProperty({
    example: randomUUID(),
  })
  oficinaId: string;
}

export class OficinaOutputDto {
  @ApiProperty({
    example: randomUUID(),
  })
  oficinaId: string;

  @ApiProperty({
    example: 'Oficina 1',
  })
  nome: string;

  @ApiProperty({
    example: 'Jardim Helena, São Paulo - SP',
  })
  endereco: string;

  @ApiProperty({
    example: -23.5,
  })
  latitude: number;

  @ApiProperty({
    example: -46.6,
  })
  longitude: number;
}

export class CreateOficinaInputDto {
  @ApiProperty({
    example: 'Oficina 1',
  })
  nome: string;

  @ApiProperty({
    example: 'Jardim Helena, São Paulo - SP',
  })
  endereco: string;
}

export class UpdateOficinaInputDto extends CreateOficinaInputDto {}

export class GetOficinasByCoordinateAndRadiusOutputDto extends OficinaOutputDto {
  @ApiProperty({
    example: 10,
  })
  distanciaKm: number;
}
