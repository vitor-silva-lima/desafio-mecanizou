import axios from 'axios';
import GeocodingGateway from '../../application/gateway/GeocodingGateway';

export default class GeocodingOpenStreetMapGateway implements GeocodingGateway {
  private readonly BASE_URL: string;

  constructor() {
    this.BASE_URL = 'https://nominatim.openstreetmap.org/search';
  }

  async getCoordinatesByEndereco(endereco: string) {
    const encodedAddress = encodeURIComponent(endereco);
    const url = `${this.BASE_URL}?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;
    const response = await axios.get(url);
    if (!response.data[0] && response.data.length === 0) {
      throw new Error('Endereço não encontrado');
    }
    const location = response.data[0];
    return {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
    };
  }
}
