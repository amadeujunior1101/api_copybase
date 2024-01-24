export interface IPlan {
  status: string;
  valor: string;
}

export const ID = 1;

export const MONTH_NAMES = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

export interface IPlanData {
  status: string;
  valor: string;
}

export const EXPECTED_COLUMN_NAMES = [
  'quantidade cobranças',
  'cobrada a cada X dias',
  'data início',
  'status',
  'data status',
  'data cancelamento',
  'valor',
  'próximo ciclo',
  'ID assinante',
];

export interface SerializedDataItem {
  'quantidade cobranças': string;
  'cobrada a cada X dias': string;
  'data início': string;
  status: string;
  'data status': string;
  'data cancelamento?': string | null;
  valor: string;
  'próximo ciclo': string;
  'ID assinante': string;
}
