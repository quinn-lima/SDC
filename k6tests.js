import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 218,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 150,
      maxVUs: 225,
    },
  },
  thresholds: { http_req_duration: ['p(98)<18'] },
};

export default function () {
  const res = http.get(`http://localhost:5000/master`, {headers: {product_id: 47421} });

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200
  });
  sleep(1)
}





//STRESS TESTS
//
// for loop through products
// increase requests until breakage
// console.log times so you can see when it slows down
// export let options = {
//   stages: [
//     { duration: '1m', target: 100 }, // below normal load
//     { duration: '2m', target: 100 },
//     { duration: '1m', target: 200 }, // normal load
//     { duration: '2m', target: 200 },
//     { duration: '1m', target: 300 }, // around the breaking point
//     { duration: '2m', target: 300 },
//     { duration: '1m', target: 400 }, // beyond the breaking point
//     { duration: '2m', target: 400 },
//     { duration: '5m', target: 0 }, // scale down. Recovery stage.
//   ],
// };

// export default function () {
//   const BASE_URL = 'http://localhost:5000/master'; // make sure this is not production

//   let responses = http.batch([
//     [
//       'GET',
//       `${BASE_URL}`,
//       null,
//       {headers: {product_id: 47421}}
//     ],
//     [
//       'GET',
//       `${BASE_URL}`,
//       null,
//       {headers: {product_id: 47422}}
//     ],
//     [
//       'GET',
//       `${BASE_URL}`,
//       null,
//       {headers: {product_id: 47423}}
//     ],
//     [
//       'GET',
//       `${BASE_URL}`,
//       null,
//       {headers: {product_id: 47424}}
//     ],
//   ]);

//   sleep(1);
// }



