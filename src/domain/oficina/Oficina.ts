import { randomUUID } from 'crypto';
import Endereco from '../endereco/Endereco';
import Nome from '../nome/Nome';

export default class Oficina {
  private nome: Nome;
  private endereco: Endereco;

  constructor(
    private oficinaId: string,
    nome: string,
    endereco: Endereco,
  ) {
    this.oficinaId = oficinaId;
    this.nome = new Nome(nome);
    this.endereco = endereco;
  }

  static create(nome: string, endereco: Endereco): Oficina {
    const oficinaId = randomUUID();
    return new Oficina(oficinaId, nome, endereco);
  }

  getOficinaId(): string {
    return this.oficinaId;
  }

  getNome(): string {
    return this.nome.getNome();
  }

  getEndereco(): string {
    return this.endereco.getEndereco();
  }

  getCoordinates(): { latitude: number; longitude: number } {
    return this.endereco.getCoordinates();
  }

  alterNome(nome: string): void {
    this.nome = new Nome(nome);
  }

  alterEndereco(endereco: Endereco): void {
    this.endereco = endereco;
  }
}
