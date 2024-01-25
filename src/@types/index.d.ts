namespace Utils {
  namespace Validator {
    export interface ResultValidator {
      msg: string;
      status: boolean;
      ref?: string;
      data?: any;
    }
  }
}
