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
  const res = http.get(`http://localhost:5000/reviews`);

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200
  });
  sleep(1)
}