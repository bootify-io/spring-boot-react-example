import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema<TType extends yup.Maybe<string> = string|undefined, TContext = yup.AnyObject, TDefault = undefined, TFlags extends yup.Flags = ''> extends yup.Schema<TType, TContext, TDefault, TFlags> {
    emptyToNull(msg?: yup.Message): yup.StringSchema<TType|null, TContext, TDefault, TFlags>;
    numeric(precision: number | Reference<number>, scale: number | Reference<number>, msg?: Message<{ precision: number; scale: number; }>): this;
  }
  interface NumberSchema<TType extends yup.Maybe<number> = number|undefined, TContext = yup.AnyObject, TDefault = undefined, TFlags extends yup.Flags = ''> extends yup.Schema<TType, TContext, TDefault, TFlags> {
    emptyToNull(msg?: yup.Message): yup.NumberSchema<TType|null, TContext, TDefault, TFlags>;
  }
}
