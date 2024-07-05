import { NomeValidator, NomeValidatorFactory } from './NomeValidator';

export default class Nome {
  private nome: string;
  private validators: NomeValidator[] = NomeValidatorFactory.create();

  constructor(nome: string) {
    this.validators.forEach((validator) => {
      validator.validate(nome);
    });
    this.nome = nome;
  }

  getNome(): string {
    return this.nome;
  }
}
