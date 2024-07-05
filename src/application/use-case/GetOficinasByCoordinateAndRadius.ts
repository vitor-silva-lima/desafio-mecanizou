import { getDistance } from 'geolib';
import OficinaRepository from '../../domain/repository/OficinaRepository';
import Oficina from '../../domain/oficina/Oficina';

export default class GetOficinasByCoordinateAndRadius {
  private readonly METERS_IN_KILOMETER = 1000;

  constructor(private oficinaRepository: OficinaRepository) {}

  async execute(input: Input): Promise<Output[]> {
    const oficinas = await this.oficinaRepository.findAll();
    return this.filterOficinasByDistance(oficinas, input);
  }

  private filterOficinasByDistance(
    oficinas: Oficina[],
    input: Input,
  ): Output[] {
    return oficinas
      .map((oficina) => this.mapToOutput(oficina, input))
      .filter((output) => output.distanciaKm <= input.raioKm);
  }

  private mapToOutput(oficina: Oficina, input: Input): Output {
    const distance =
      this.calculateDistance(input, oficina) / this.METERS_IN_KILOMETER;

    return {
      oficinaId: oficina.getOficinaId(),
      nome: oficina.getNome(),
      endereco: oficina.getEndereco(),
      latitude: oficina.getCoordinates().latitude,
      longitude: oficina.getCoordinates().longitude,
      distanciaKm: distance,
    };
  }

  private calculateDistance(input: Input, oficina: Oficina): number {
    return getDistance(
      { latitude: input.latitude, longitude: input.longitude },
      {
        latitude: oficina.getCoordinates().latitude,
        longitude: oficina.getCoordinates().longitude,
      },
    );
  }
}

export type Input = {
  latitude: number;
  longitude: number;
  raioKm: number;
};

export type Output = {
  oficinaId: string;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  distanciaKm: number;
};
