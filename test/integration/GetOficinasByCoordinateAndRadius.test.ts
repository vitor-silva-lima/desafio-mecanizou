import CreateOficina from '../../src/application/use-case/CreateOficina';
import GetOficinasByCoordinateAndRadius from '../../src/application/use-case/GetOficinasByCoordinateAndRadius';
import GeocodingOpenStreetMapGateway from '../../src/infra/gateway/GeocodingOpenStreetMapGateway';
import OficinaMemoryRepository from '../../src/infra/repository/OficinaMemoryRepository';

test('Deve buscar oficinas por proximidade geográfica, dado um ponto de referência (latitude e longitude) e um raio de busca em quilômetros', async () => {
  const oficinaRepository = new OficinaMemoryRepository();
  const geocodingGateway = new GeocodingOpenStreetMapGateway();
  const createOficina = new CreateOficina(oficinaRepository, geocodingGateway);

  await createOficina.execute({
    nome: 'Oficina do Vitor',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  });
  await createOficina.execute({
    nome: 'Oficina do Gabriel',
    endereco: 'Jardim Monte Cristo, Aparecida de Goiânia',
  });
  await createOficina.execute({
    nome: 'Oficina do Silva',
    endereco: 'Garavelo Sul II',
  });
  await createOficina.execute({
    nome: 'Oficina do Lima',
    endereco: 'Hidrolândia',
  });

  const getOficinasByCoordinateAndRadius = new GetOficinasByCoordinateAndRadius(
    oficinaRepository,
  );

  const outputGetOficinas = await getOficinasByCoordinateAndRadius.execute({
    latitude: -16.686898,
    longitude: -49.264794,
    raioKm: 20,
  });

  expect(outputGetOficinas.length).toBe(2);
  expect(outputGetOficinas[0].nome).toBe('Oficina do Vitor');
  expect(outputGetOficinas[0].endereco).toBe(
    'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  );
  expect(outputGetOficinas[0].distanciaKm).toBeCloseTo(3.427, 3);

  expect(outputGetOficinas[1].nome).toBe('Oficina do Gabriel');
  expect(outputGetOficinas[1].endereco).toBe(
    'Jardim Monte Cristo, Aparecida de Goiânia',
  );
  expect(outputGetOficinas[1].distanciaKm).toBeCloseTo(15.259, 3);
}, 20000);
