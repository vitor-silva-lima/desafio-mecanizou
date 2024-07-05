import Coordinate from '../../domain/endereco/Coordinate';
import Endereco from '../../domain/endereco/Endereco';
import Oficina from '../../domain/oficina/Oficina';
import OficinaRepository from '../../domain/repository/OficinaRepository';
import GeocodingGateway from '../gateway/GeocodingGateway';

export default class CreateOficina {
  constructor(
    private readonly oficinaRepository: OficinaRepository,
    private readonly geocodingGateway: GeocodingGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    const dataCoordinates =
      await this.geocodingGateway.getCoordinatesByEndereco(input.endereco);
    const coordenadas = new Coordinate(
      dataCoordinates.latitude,
      dataCoordinates.longitude,
    );
    const endereco = new Endereco(input.endereco, coordenadas);
    const oficina = Oficina.create(input.nome, endereco);
    await this.oficinaRepository.save(oficina);
    return {
      oficinaId: oficina.getOficinaId(),
    };
  }
}

export type Input = {
  nome: string;
  endereco: string;
};

export type Output = {
  oficinaId: string;
};
