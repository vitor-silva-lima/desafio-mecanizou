import Nome from '../../src/domain/nome/Nome';

test('Deve criar um nome', () => {
  const nome = new Nome('Vitor Gabriel');
  expect(nome.getNome()).toBe('Vitor Gabriel');
});

test('Não deve criar um nome com menos de 3 caracteres', () => {
  expect(() => new Nome('Vi')).toThrow(
    new Error('Nome deve ter no mínimo 3 caracteres'),
  );
});

test('Não deve criar um nome com caracteres especiais', () => {
  expect(() => new Nome('Vitor Gabriel!')).toThrow(
    new Error('Nome não deve conter caracteres especiais'),
  );
});
