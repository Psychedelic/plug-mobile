import { useState } from 'react';

const NFTS = [
  {
    index: '91244',
    canister: 'qcg3w-tyaaa-aaaah-qakea-cai',
    url: 'https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app/Token/9244',
    name: 'ICPunk #9244',
    metadata: {
      id: '9244',
      url: '/Token/9244',
      owner: {
        _arr: {
          0: 195,
          1: 147,
          2: 158,
          3: 29,
          4: 131,
          5: 177,
          6: 153,
          7: 14,
          8: 3,
          9: 66,
          10: 224,
          11: 193,
          12: 37,
          13: 209,
          14: 200,
          15: 144,
          16: 18,
          17: 98,
          18: 37,
          19: 163,
          20: 92,
          21: 216,
          22: 65,
          23: 149,
          24: 227,
          25: 220,
          26: 242,
          27: 199,
          28: 2,
        },
        _isPrincipal: true,
      },
      desc: '',
      name: 'ICPunk #9244',
      properties: [
        { value: 'Yellow', name: 'Background' },
        { value: 'Red Hoodie', name: 'Body' },
        { value: 'Red', name: 'Nose' },
        { value: 'None', name: 'Mouth' },
        { value: 'None', name: 'Eyes' },
        { value: 'Green Angry', name: 'Head' },
        { value: 'Red Cap', name: 'Top' },
      ],
    },
    standard: 'ICPunks',
    collection: 'ICPunks',
  },
];

const useNfts = () => {
  const [nfts, setNfts] = useState(NFTS);

  return { nfts, setNfts };
};

export default useNfts;
