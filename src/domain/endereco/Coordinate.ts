export default class Coordinate {
  constructor(
    protected latitude: number,
    protected longitude: number,
  ) {}

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }
}
