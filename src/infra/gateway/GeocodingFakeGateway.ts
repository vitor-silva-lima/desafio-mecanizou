import GeocodingGateway from '../../application/gateway/GeocodingGateway';

export default class GeocodingFakeGateway implements GeocodingGateway {
  constructor() {}

  async getCoordinatesByEndereco() {
    return {
      latitude: 0,
      longitude: 0,
    };
  }
}
