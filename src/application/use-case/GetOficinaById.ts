import OficinaRepository from '../../domain/repository/OficinaRepository';

export default class GetOficinaById {
  constructor(private readonly oficinaRepository: OficinaRepository) {}

  async execute(oficinaId: string): Promise<Output> {
    const oficina = await this.oficinaRepository.findById(oficinaId);
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
