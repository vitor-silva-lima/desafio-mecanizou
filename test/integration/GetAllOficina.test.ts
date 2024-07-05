import CreateOficina from '../../src/application/use-case/CreateOficina';
import GetAllOficina from '../../src/application/use-case/GetAllOficina';
import GeocodingFakeGateway from '../../src/infra/gateway/GeocodingFakeGateway';
import OficinaMemoryRepository from '../../src/infra/repository/OficinaMemoryRepository';

test('Deve buscar todas as oficinas pelo seu caso de uso', async () => {
  const oficinaRepository = new OficinaMemoryRepository();
  const geocodingGateway = new GeocodingFakeGateway();
  const createOficina = new CreateOficina(oficinaRepository, geocodingGateway);

  await createOficina.execute({
    nome: 'Oficina do Vitor',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  });
  await createOficina.execute({
    nome: 'Oficina do Gabriel',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  });

  const getAllOficina = new GetAllOficina(oficinaRepository);

  const output = await getAllOficina.execute();

  expect(output).toHaveLength(2);
});
