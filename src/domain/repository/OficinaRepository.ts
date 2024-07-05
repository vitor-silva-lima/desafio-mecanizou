import Oficina from '../oficina/Oficina';

export default interface OficinaRepository {
  save(oficina: Oficina): Promise<void>;
  update(oficina: Oficina): Promise<void>;
  delete(oficinaId: string): Promise<void>;
  findById(oficinaId: string): Promise<Oficina>;
  findAll(): Promise<Oficina[]>;
}
