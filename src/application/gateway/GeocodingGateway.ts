export default interface GeocodingGateway {
  getCoordinatesByEndereco(endereco: string): Promise<Output>;
}

type Output = {
  latitude: number;
  longitude: number;
};
