import OficinaRepository from '../../domain/repository/OficinaRepository';

export default class DeleteOficina {
  constructor(private readonly oficinaRepository: OficinaRepository) {}

  async execute(oficinaId: string): Promise<void> {
    await this.oficinaRepository.findById(oficinaId);
    await this.oficinaRepository.delete(oficinaId);
  }
}
