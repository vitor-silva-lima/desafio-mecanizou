import Coordinate from './Coordinate';

export default class Endereco {
  private value: string;
  private coordenadas: Coordinate;

  constructor(endereco: string, coordenadas: Coordinate) {
    if (endereco.length < 3) {
      throw new Error('Endereço deve ter no mínimo 3 caracteres');
    }
    this.value = endereco;
    this.coordenadas = coordenadas;
  }

  getEndereco(): string {
    return this.value;
  }

  getCoordinates(): { latitude: number; longitude: number } {
    return {
      latitude: this.coordenadas.getLatitude(),
      longitude: this.coordenadas.getLongitude(),
    };
  }
}
