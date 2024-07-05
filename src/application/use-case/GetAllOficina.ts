import Oficina from '../../domain/oficina/Oficina';
import OficinaRepository from '../../domain/repository/OficinaRepository';

export default class GetAllOficina {
  constructor(private readonly oficinaRepository: OficinaRepository) {}

  async execute(): Promise<Output[]> {
    const oficinas = await this.oficinaRepository.findAll();
    return oficinas.map((oficina) => this.mapToOutput(oficina));
  }

  private mapToOutput(oficina: Oficina): Output {
    return {
      oficinaId: oficina.getOficinaId(),
      nome: oficina.getNome(),
      endereco: oficina.getEndereco(),
      latitude: oficina.getCoordinates().latitude,
      longitude: oficina.getCoordinates().longitude,
    };
  }
}

export type Output = {
  oficinaId: string;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
};
