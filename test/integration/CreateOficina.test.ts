import CreateOficina from '../../src/application/use-case/CreateOficina';
import GetOficinaById from '../../src/application/use-case/GetOficinaById';
import GeocodingOpenStreetMapGateway from '../../src/infra/gateway/GeocodingOpenStreetMapGateway';
import OficinaMemoryRepository from '../../src/infra/repository/OficinaMemoryRepository';

test('Deve criar uma oficina pelo seu caso de uso', async () => {
  const oficinaRepository = new OficinaMemoryRepository();
  const geocodingGateway = new GeocodingOpenStreetMapGateway();
  const createOficina = new CreateOficina(oficinaRepository, geocodingGateway);

  const output = await createOficina.execute({
    nome: 'Oficina do Vitor',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  });

  expect(output.oficinaId).toBeDefined();
  const oficina = await new GetOficinaById(oficinaRepository).execute(
    output.oficinaId,
  );
  expect(oficina).toBeDefined();
  expect(oficina.nome).toBe('Oficina do Vitor');
  expect(oficina.endereco).toBe(
    'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  );
  expect(oficina.latitude).toBe(-16.7158415);
  expect(oficina.longitude).toBe(-49.253846);
}, 20000);
