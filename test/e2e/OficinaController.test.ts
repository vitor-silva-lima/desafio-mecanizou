import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/infra/api/nest/AppModule';

describe('OficinaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const createOficina = async (nome: string, endereco: string) => {
    const response = await request(app.getHttpServer())
      .post('/oficina/create')
      .send({ nome, endereco })
      .expect(201);
    return response.body.oficinaId;
  };

  const deleteOficina = async (oficinaId: string) => {
    await request(app.getHttpServer())
      .delete(`/oficina/delete?oficinaId=${oficinaId}`)
      .expect(204);
  };

  const oficinaData = {
    nome: 'Oficina do Vitor',
    endereco: 'Setor Pedro Ludovico, Avenida Circular, Goiânia-GO',
    nomeAtualizado: 'Oficina do Vitor Atualizada',
    enderecoAtualizado: 'Jardim Monte Cristo, Aparecida de Goiânia',
  };

  it('Deve criar uma oficina com sucesso e retornar o id com status code 201', async () => {
    const oficinaId = await createOficina(
      oficinaData.nome,
      oficinaData.endereco,
    );
    expect(oficinaId).toBeDefined();
    await deleteOficina(oficinaId);
  });

  it('Deve atualizar uma oficina com sucesso e retornar status code 204', async () => {
    const oficinaId = await createOficina(
      oficinaData.nome,
      oficinaData.endereco,
    );

    await request(app.getHttpServer())
      .put(`/oficina/update?oficinaId=${oficinaId}`)
      .send({
        nome: oficinaData.nomeAtualizado,
        endereco: oficinaData.enderecoAtualizado,
      })
      .expect(204);

    await deleteOficina(oficinaId);
  });

  it('Deve deletar uma oficina com sucesso e retornar status code 204', async () => {
    const oficinaId = await createOficina(
      oficinaData.nome,
      oficinaData.endereco,
    );
    await deleteOficina(oficinaId);
  });

  it('Deve retornar todas as oficinas com sucesso e status code 200', async () => {
    await request(app.getHttpServer()).get('/oficina/GetAll').expect(200);
  });

  it('Deve retornar uma oficina com sucesso e status code 200', async () => {
    const oficinaId = await createOficina(
      oficinaData.nome,
      oficinaData.endereco,
    );

    const response = await request(app.getHttpServer())
      .get(`/oficina/getById?oficinaId=${oficinaId}`)
      .expect(200);

    const { body } = response;
    expect(body).toHaveProperty('oficinaId', oficinaId);
    expect(body).toHaveProperty('nome', oficinaData.nome);
    expect(body).toHaveProperty('endereco', oficinaData.endereco);
    expect(body).toHaveProperty('latitude');
    expect(body).toHaveProperty('longitude');

    await deleteOficina(oficinaId);
  });

  it('Deve retornar as oficinas próximas a uma coordenada com sucesso e status code 200', async () => {
    const oficinaId = await createOficina(
      'Oficina do Vitor',
      'Av. Daniel de La Touche, Cohama, São Luís - MA',
    );

    const responseGetById = await request(app.getHttpServer())
      .get(`/oficina/getById?oficinaId=${oficinaId}`)
      .expect(200);

    const { latitude, longitude } = responseGetById.body;
    const raioKm = 10;

    const response = await request(app.getHttpServer())
      .get(
        `/oficina/getByCoordinateAndRadius?latitude=${latitude}&longitude=${longitude}&raioKm=${raioKm}`,
      )
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('oficinaId', oficinaId);
    expect(response.body[0]).toHaveProperty('nome', 'Oficina do Vitor');
    expect(response.body[0]).toHaveProperty(
      'endereco',
      'Av. Daniel de La Touche, Cohama, São Luís - MA',
    );
    expect(response.body[0]).toHaveProperty('latitude', latitude);
    expect(response.body[0]).toHaveProperty('longitude', longitude);
    expect(response.body[0]).toHaveProperty('distanciaKm', 0);

    await deleteOficina(oficinaId);
  });
});
