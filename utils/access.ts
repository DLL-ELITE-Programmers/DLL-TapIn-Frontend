/*
 * INFO:if (!loginData.username.at(4) !== "-") { This file contains the api control within the system
 * It has the only one who have pre-configured api access to the server
 * which can only call throughout the system without any additional accesss
 *
 *
 * Author: Ryann Kim Sesgundo [08-08-25]
 */

import axios from "axios";
import { GetItem } from "src/control/data";

const url = "https://dlltapinserver.asse.devtunnels.ms:8000/seems-so-bad"; // INFO: Deployment test
// const url = "http://192.168.0.116:8000/seems-so-bad"; // INFO: Localhost test

const endpoint_middleware = (endpoint: string) => {
  // TODO: To create a middleware which may control the url path and endpoint
  if (!endpoint.startsWith("/")) {
    endpoint = `/${endpoint}`;
  }
  if (!endpoint.endsWith("/")) {
    endpoint = `${endpoint}/`;
  }
  return `${url}${endpoint}`;
};

export async function get_unauth(
  endpoint: string,
  params?: Record<string, any>,
) {
  const { data } = await axios.get(endpoint_middleware(endpoint), {
    params: params,
  });
  return data;
}

export async function post_unauth(
  endpoint: string,
  params?: Record<string, any>,
) {
  const { data } = await axios.post(
    endpoint_middleware(endpoint),
    params || {},
  );
  return data;
}

export async function get(endpoint: string, params?: Record<string, any>) {
  const token = await GetItem("token");
  if (!token) {
    return {
      error: "Unknown token",
    };
  }

  const { data } = await axios.get(endpoint_middleware(endpoint), {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function post(endpoint: string, params: Record<string, any>) {
  const token = await GetItem("token");
  if (!token) {
    return {
      error: "Unknown token",
    };
  }
  const { data } = await axios.post(endpoint_middleware(endpoint), params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function put(endpoint: string, params: Record<string, any>) {
  const token = await GetItem("token");
  if (!token) {
    return {
      error: "Unknown token",
    };
  }
  const { data } = await axios.put(endpoint_middleware(endpoint), params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
