import CreateOficina from '../../src/application/use-case/CreateOficina';
import GetOficinaById from '../../src/application/use-case/GetOficinaById';
import UpdateOficina from '../../src/application/use-case/UpdateOficina';
import GeocodingOpenStreetMapGateway from '../../src/infra/gateway/GeocodingOpenStreetMapGateway';
import OficinaMemoryRepository from '../../src/infra/repository/OficinaMemoryRepository';

test('Deve atualizar uma oficina pelo seu caso de uso', async () => {
  const oficinaRepository = new OficinaMemoryRepository();
  const geocodingGateway = new GeocodingOpenStreetMapGateway();
  const createOficina = new CreateOficina(oficinaRepository, geocodingGateway);

  const outputCreate = await createOficina.execute({
    nome: 'Oficina do Vitor',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  });

  const updateOficina = new UpdateOficina(oficinaRepository, geocodingGateway);

  const outputUpdate = await updateOficina.execute({
    oficinaId: outputCreate.oficinaId,
    nome: 'Oficina do Vitor Atualizada',
    endereco: 'Jardim Monte Cristo, Aparecida de Goiânia',
  });

  expect(outputUpdate.oficinaId).toBe(outputCreate.oficinaId);
  const oficina = await new GetOficinaById(oficinaRepository).execute(
    outputUpdate.oficinaId,
  );
  expect(oficina.nome).toBe('Oficina do Vitor Atualizada');
  expect(oficina.endereco).toBe('Jardim Monte Cristo, Aparecida de Goiânia');
  expect(oficina.latitude).toBe(-16.8236525);
  expect(oficina.longitude).toBe(-49.2746045);
}, 20000);
