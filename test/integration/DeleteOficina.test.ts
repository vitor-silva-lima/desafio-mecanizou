import CreateOficina from '../../src/application/use-case/CreateOficina';
import DeleteOficina from '../../src/application/use-case/DeleteOficina';
import GetOficinaById from '../../src/application/use-case/GetOficinaById';
import GeocodingFakeGateway from '../../src/infra/gateway/GeocodingFakeGateway';
import OficinaMemoryRepository from '../../src/infra/repository/OficinaMemoryRepository';

test('Deve Deletar uma oficina pelo seu caso de uso', async () => {
  const oficinaRepository = new OficinaMemoryRepository();
  const geocodingGateway = new GeocodingFakeGateway();
  const createOficina = new CreateOficina(oficinaRepository, geocodingGateway);

  const outputCreate = await createOficina.execute({
    nome: 'Oficina do Vitor',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
  });

  const deleteOficina = new DeleteOficina(oficinaRepository);

  await deleteOficina.execute(outputCreate.oficinaId);

  expect(
    async () =>
      await new GetOficinaById(oficinaRepository).execute(
        outputCreate.oficinaId,
      ),
  ).rejects.toThrow('Oficina não encontrada');
}, 20000);
