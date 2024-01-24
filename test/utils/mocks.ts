export const data = [
  [
    'quantidade cobranças',
    'cobrada a cada X dias',
    'data início',
    'status',
    'data status',
    'data cancelamento',
    'valor',
    'próximo ciclo',
    'ID assinante',
  ],
  [
    1,
    365,
    '2/1/22 7:52',
    'Ativa',
    '2/13/22 6:33',
    '',
    4750.35,
    '14/02/2023',
    'user_10',
  ],
  [
    1,
    30,
    '5/8/22 23:17',
    'Cancelada',
    '6/14/22 9:36',
    '6/14/22 9:36',
    367.6,
    '6/8/2022',
    'user_100',
  ],
  // ... (adicionar outras linhas conforme necessário)
];

export const mockedMetrics = [
  {
    year: 2022,
    month: 'jan',
    labels: ['MRR', 'Churn rate'],
    data: ['4750.35', 0],
  },
  {
    year: 2023,
    month: 'ago',
    labels: ['MRR', 'Churn rate'],
    data: ['0.00', 1],
  },
];
