import Coordinate from '../../domain/endereco/Coordinate';
import Endereco from '../../domain/endereco/Endereco';
import OficinaRepository from '../../domain/repository/OficinaRepository';
import GeocodingGateway from '../gateway/GeocodingGateway';

export default class UpdateOficina {
  constructor(
    private readonly oficinaRepository: OficinaRepository,
    private readonly geocodingGateway: GeocodingGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    const oficina = await this.oficinaRepository.findById(input.oficinaId);
    oficina.alterNome(input.nome);
    const dataCoordinates =
      await this.geocodingGateway.getCoordinatesByEndereco(input.endereco);
    const coordinates = new Coordinate(
      dataCoordinates.latitude,
      dataCoordinates.longitude,
    );
    const endereco = new Endereco(input.endereco, coordinates);
    oficina.alterEndereco(endereco);
    await this.oficinaRepository.update(oficina);
    return {
      oficinaId: oficina.getOficinaId(),
    };
  }
}

export type Input = {
  oficinaId: string;
  nome: string;
  endereco: string;
};

export type Output = {
  oficinaId: string;
};
