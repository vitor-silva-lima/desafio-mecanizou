import Oficina from '../../domain/oficina/Oficina';
import OficinaRepository from '../../domain/repository/OficinaRepository';

export default class OficinaMemoryRepository implements OficinaRepository {
  private oficinas: Oficina[] = [];

  constructor() {
    this.oficinas = [];
  }

  async save(oficina: Oficina): Promise<void> {
    this.oficinas.push(oficina);
  }

  async update(oficina: Oficina): Promise<void> {
    const index = this.oficinas.findIndex(
      (of) => of.getOficinaId() === oficina.getOficinaId(),
    );
    this.oficinas[index] = oficina;
  }

  async delete(oficinaId: string): Promise<void> {
    this.oficinas = this.oficinas.filter(
      (oficina) => oficina.getOficinaId() !== oficinaId,
    );
  }

  async findById(oficinaId: string): Promise<Oficina> {
    const oficina = this.oficinas.find(
      (oficina) => oficina.getOficinaId() === oficinaId,
    );
    if (!oficina) {
      throw new Error('Oficina não encontrada');
    }
    return oficina;
  }

  async findAll(): Promise<Oficina[]> {
    return this.oficinas;
  }
}
