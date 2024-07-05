export interface NomeValidator {
  validate(nome: string): void;
}

export class MinLengthValidator implements NomeValidator {
  validate(nome: string): void {
    if (nome.length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres');
    }
  }
}

export class SpecialCharactersValidator implements NomeValidator {
  validate(nome: string): void {
    if (/[!@#$%^&*(),.?":{}|<>]/g.test(nome)) {
      throw new Error('Nome não deve conter caracteres especiais');
    }
  }
}

export class NomeValidatorFactory {
  static create(): NomeValidator[] {
    return [new MinLengthValidator(), new SpecialCharactersValidator()];
  }
}
