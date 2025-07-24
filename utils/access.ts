import axios from "axios";
import { GetItem } from "src/control/data";

const url = "https://n7dwb6cv-80.asse.devtunnels.ms/seems-so-bad";
// const url = "http://192.168.0.134:8000/api";

const endpoint_middleware = (endpoint: string) => {
  if (!endpoint.startsWith("/")) {
    endpoint = `/${endpoint}`;
  }
  if (!endpoint.endsWith("/")) {
    endpoint = `${endpoint}/`;
  }
  return endpoint;
};

export async function get_unauth(endpoint: string, params?: unknown) {
  const { data } = await axios.get(
    `${url}${endpoint_middleware(endpoint)}`,
    params || {},
  );
  return data;
}

export async function post_unauth(endpoint: string, params?: unknown) {
  const { data } = await axios.post(
    `${url}${endpoint_middleware(endpoint)}`,
    params || {},
  );
  return data;
}

export async function get(endpoint: string, params?: unknown) {
  const token = await GetItem("token");
  const { data } = await axios.get(`${url}${endpoint_middleware(endpoint)}`, {
    params: params || {},
    headers: {
      Authorization: `Beaarer ${token}`,
    },
  });
  return data;
}

export async function post(endpoint: string, params?: unknown) {
  const token = await GetItem("token");
  const { data } = await axios.post(
    `${url}${endpoint_middleware(endpoint)}`,
    params || {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}
