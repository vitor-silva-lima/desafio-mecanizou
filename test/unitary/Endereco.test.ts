import Coordinate from '../../src/domain/endereco/Coordinate';
import Endereco from '../../src/domain/endereco/Endereco';

test('Deve criar um endereço', () => {
  const coordenadas = new Coordinate(-16.7158415, -49.253846);
  const endereco = new Endereco(
    'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
    coordenadas,
  );
  expect(endereco.getEndereco()).toBe(
    'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  );
  expect(endereco.getCoordinates().latitude).toBe(-16.7158415);
  expect(endereco.getCoordinates().longitude).toBe(-49.253846);
});

test('Não deve criar um endereço com menos de 3 caracteres', () => {
  const coordenadas = new Coordinate(-16.7158415, -49.253846);
  expect(() => {
    new Endereco('Av', coordenadas);
  }).toThrow(new Error('Endereço deve ter no mínimo 3 caracteres'));
});
