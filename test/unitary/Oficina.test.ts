import Coordinate from '../../src/domain/endereco/Coordinate';
import Endereco from '../../src/domain/endereco/Endereco';
import Oficina from '../../src/domain/oficina/Oficina';

test('Deve criar uma oficina', () => {
  const coordenadas = new Coordinate(-16.7158415, -49.253846);
  const endereco = new Endereco(
    'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
    coordenadas,
  );
  const oficina = Oficina.create('Oficina do Vitor', endereco);
  expect(oficina.getOficinaId()).toBeDefined();
  expect(oficina.getNome()).toBe('Oficina do Vitor');
  expect(oficina.getEndereco()).toBe(
    'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  );
});
