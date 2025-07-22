"use client";
import axios from "axios";
import { unCountedMessage } from "../base";
import {
  AddCategoryInterface,
  AddClientContactInterface,
  AddOrderInterface,
  AddProductInterface,
  AddSortInterface,
  LoginInterface,
} from "../types/interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";
const LOGIN_REQ = async (data: LoginInterface) => {
  try {
    const response: any = await axios.post(
      `${BASE_URL}/workers/sign-in`,
      {
        ...data,
        tenant_domain:
          process.env.NODE_ENV === "development" ? "localhost.com" : data.tenant_domain,
      },
      {
        withCredentials: true,
      }
    );
    if (response?.data?.done) {
      setCookie("access_token", response?.data?.access_token);
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_CATEGORY_REQ = async (data: AddCategoryInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/category`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_SORT_REQ = async (data: AddSortInterface) => {
  const id = data.id;
  delete data.id;
  try {
    const response: any = await axios.post(`${BASE_URL}/products/${id}/sorts`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_CATEGORIES_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/category`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data?.categories
      ? { done: true, data: { ...response?.data } }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_CATEGORIES_PRODUCTS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/category/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_PRODUCT_SORTS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_ORDERS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.orders
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ORDER_ITEMS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_PRODUCTS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.products
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_SORTS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/products/sorts`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.sorts
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_ORDER_REQ = async (data: AddOrderInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/orders`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });

    if (response?.data?.done) {
      return { done: true, data: response.data.order };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_ORDER_NOSORTS_REQ = async (data: AddOrderInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/orders/no-sorts`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });

    if (response?.data?.done) {
      return { done: true, data: response.data.order };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_PRODUCT_REQ = async (data: AddProductInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/products`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });

    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_CLIENTS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/clients`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.clients
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_WORKERS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/workers`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.workers
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_CLIENT_PROFILE_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/clients/find-one/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_WORKERS_PROFILE_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/workers/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_MY_PROFILE_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/workers/profile`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });

    return response?.data.done
      ? { done: true, data: response?.data?.worker }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const EDIT_CLIENT_REQ = async ({
  data,
  id,
}: {
  id: string;
  data: { user_name?: string; tax_num?: string };
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/clients/update/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_CLIENT_CONTACT_REQ = async (data: AddClientContactInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/contacts/client`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_WORKER_CONTACT_REQ = async ({
  id,
  data,
}: {
  id: string;
  data: { phone: string; note: string };
}) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/contacts/worker/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_CONTACT_REQ = async ({ id, type }: { id: string; type?: "worker" | "client" }) => {
  try {
    const response: any = await axios.delete(`${BASE_URL}/contacts/${type}/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_CONTACT_REQ = async ({
  id,
  type,
  data,
}: {
  id: string;
  type?: "worker" | "client";
  data: {
    phone: string;
    note: string;
    id?: string;
  };
}) => {
  if (data.id) delete data.id;
  try {
    const response: any = await axios.patch(`${BASE_URL}/contacts/${type}/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const BAN_USER_REQ = async ({ id, banned_reason }: { id: string; banned_reason: string }) => {
  try {
    const response: any = await axios.patch(
      `${BASE_URL}/workers/ban/${id}`,
      { banned_reason },
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
      }
    );
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_CLIENT_REQ = async (data: { user_name: string; tax_num: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/clients/create-client`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_WORKER_REQ = async (data: {
  user_name: string;
  password: string;
  role: string;
  salary: number;
}) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/workers/create-worker`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const SIGN_OUT_REQ = async () => {
  try {
    const response: any = await axios.post(
      `${BASE_URL}/workers/sign-out`,
      {},
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        withCredentials: true,
      }
    );
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const EDIT_CATEGORY_REQ = async ({
  id,
  name,
  desc,
}: {
  id: string;
  name: string;
  desc: string | null;
}) => {
  try {
    const response: any = await axios.patch(
      `${BASE_URL}/category/${id}`,
      { name, desc },
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
      }
    );
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_CATEGORY_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.delete(`${BASE_URL}/category/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_PRODUCT_REQ = async ({
  data,
  id,
}: {
  id: string;
  data: { name?: string; desc?: string; material?: string; note?: string };
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/products/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_SORT_REQ = async ({
  data,
  id,
}: {
  id: string;
  data: { name?: string; color: string; size: string; note?: string; qty?: number; cost?: number };
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/products/sorts/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_PASSWORD_REQ = async (data: { password?: string; new_password?: string }) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/workers/update-password`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_ORDER_REQ = async ({
  data,
  id,
}: {
  id: string;
  data: { tax: number; discount: number; payment_method: string; paid_status: string };
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/orders/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_COSTS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/products/costs`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.costs
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const MAKE_RETURNS_REQ = async ({
  id,
  data,
}: {
  id: string;
  data: { returns: { item_id: string; qty: number }[] };
}) => {
  const stringfyArr = JSON.stringify(data.returns);
  try {
    const response: any = await axios.post(
      `${BASE_URL}/orders/returns/${id}`,
      { returns: stringfyArr },
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
      }
    );
    if (response?.data?.done) {
      return { done: true, data: response?.data?.order };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_RETURNS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/returns`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.returns_items
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ORDER_RETURNS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/returns/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.returns_items
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ONE_RETURNS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/returns/returns-items/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const INITIAL_DATA_REQ = async () => {
  await axios.get(`${BASE_URL}/products/initialData`, {
    headers: { Authorization: `Bearer ${getCookie("access_token")}` },
  });
};
const SEARCH_REQ = async ({
  searchin,
  searchwith,
  column,
}: {
  searchin: string;
  searchwith: string;
  column?: string;
}) => {
  try {
    const response: any = await axios.get(
      `${BASE_URL}/common/search?searchin=${searchin}${
        searchwith ? "&searchwith=" + searchwith : ""
      }${column ? "&column=" + column : ""}`,
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
      }
    );
    return response?.data.results
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_CALCS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/common/calcs`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    console.log(response);
    return typeof response?.data.totalCostsPrice === "number"
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const REFRESH_TOKEN_REQ = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/workers/refresh-token`, {
      withCredentials: true,
    });
    if (response?.data?.access_token) {
      setCookie("access_token", response?.data?.access_token);
    }
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
    }
    message = error?.response?.data?.message;
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_GRAPH_DATA_REQ = async ({ type }: { type: "years" | "months" | "days" }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/graphData?type=${type}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.totalGraphData
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_PRODUCT_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_WORKER_REQ = async ({
  data,
  id,
}: {
  id: string;
  data: { role?: string; salary?: number };
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/workers/update-worker/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const PAY_SALARIES_REQ = async (data: any) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/expenses/paying-salaries`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_SUPPLIERS_BILLS_REQ = async ({ cost_id }: { cost_id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/suppliers/bills/${cost_id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.bills
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const PAY_SUPPLIERS_REQ = async (data: { cost_id: string; installment: number; note?: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/suppliers/pay`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ONE_COST_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/products/cost/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
//! BOSS REQS
const CREATE_NEW_TENANT_REQ = async (data: { tenant_domain: string; phone?: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/tenants`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_TENANT_REQ = async ({ data, id }: { id: string; data: any }) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/tenants/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_TENANTS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/tenants`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.tenants
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const SIGN_FUSER_REQ = async (data: {
  tenant_domain: string;
  user_name: string;
  password: string;
}) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/workers/sign-fuser`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_TENANT_VARS_REQ = async ({ tenant_domain }: { tenant_domain: string }) => {
  try {
    const response: any = await axios.post(
      `${BASE_URL}/workers/tenant-details`,
      {
        tenant_domain,
      },
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
      }
    );

    return response?.data?.company_title
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const CREATE_EXPENSE_REQ = async (data: { name: string; amount: number; note?: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/expenses`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_EXPENSE_REQ = async ({
  id,
  data,
}: {
  id: string;
  data: { name?: string; amount?: number; note?: string };
}) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/expenses/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_EXPENSE_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.delete(`${BASE_URL}/expenses/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_EXPENSES_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/expenses`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.expenses
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const CREATE_STOCK_CHECKS_REQ = async (data: { note?: string; data: any; type: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/stock-checks`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_STOCK_CHECKS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/stock-checks`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.stockChecks
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_STOCK_CHECKS_ITEMS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/stock-checks/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_BALANCE_REQ = async ({ data }: { data: { balance: number; period: string } }) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/tenants/balance`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ORDER_INSTALLMENTS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/installments/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.installments
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const PAY_INSTALLMENT_REQ = async ({ data, id }: { id: string; data: { installment: number } }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/orders/installments/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_SUPPLIERS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/suppliers`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.suppliers
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ONE_SUPPLIER_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/suppliers/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    return response?.data.id
      ? { done: true, data: response?.data }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_SUPPLIER_REQ = async (data: { user_name: string }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/suppliers`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
//?==============================
const ADD_CAR_REQ = async ({ id, data }: { id: string; data: any }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/cars/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const EDIT_CAR_REQ = async ({ id, data }: { id: string; data: any }) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/cars/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_CAR_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/cars/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_CAR_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.delete(`${BASE_URL}/cars/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_CAR_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/cars`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.cars) {
      return { done: true, data: response?.data };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_CAR_ORDERS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/car/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.orders) {
      return { done: true, data: response?.data };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const ADD_EQUIPMENT_REQ = async (data: any) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/equipment`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_EQUIPMENT_REQ = async ({ data, id }: any) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/equipment/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ALL_EQUIPMENTS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/equipment`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.equipments) {
      return { done: true, data: response?.data };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const MAKE_WORKER_ADVANCE_REQ = async ({ data, id }: { id: string; data: any }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/advances/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_WORKER_ADVANCE_REQ = async ({ data, id }: any) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/advances/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const PAY_WORKER_ADVANCE_REQ = async ({ data, id }: { id: string; data: any }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/advances/${id}/pay`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const EDIT_PAY_WORKER_ADVANCE_REQ = async ({ data, id }: any) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/advances/${id}/edit-pay`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_ADVANCE_PAY_BILLS_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/advances/${id}/bills`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.id) {
      return { done: true, data: response?.data };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const MAKE_WORKER_DEDUCTION_REQ = async ({ data, id }: { id: string; data: any }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/deduction/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_WORKER_DEDUCTION_REQ = async ({ data, id }: any) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/deduction/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const MAKE_WORKER_ABSENCE_REQ = async ({ data, id }: { id: string; data: any }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/absence/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const UPDATE_WORKER_ABSENCE_REQ = async ({ data, id }: any) => {
  try {
    const response: any = await axios.patch(`${BASE_URL}/absence/${id}`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const DELETE_WORKER_ABSENCE_REQ = async ({ id }: any) => {
  try {
    const response: any = await axios.delete(`${BASE_URL}/absence/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
const GET_DAILY_REPORT_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/common/daily-report`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true, data: response?.data };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};

//* MAIN FUNCTION (USED FOR ALL REQUESTS THAT NEED ACCESS_TOKEN)
const CLIENT_COLLECTOR_REQ = async (varFunction: any, dataBody?: any) => {
  const access_token = getCookie("access_token");
  if (!access_token) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
  }
  const response = await varFunction(dataBody);
  if (!response.done && response.status === 401) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
    const retryResponse = await varFunction(dataBody);
    return retryResponse;
  }
  return response;
};
//* COOKIES HANDLERS
const setCookie = (keyName: string, value: string) => {
  document.cookie = `${keyName}=${value}; path=/; max-age=${15 * 60}; SameSite=Strict`;
};
const getCookie = (keyName: string): string | null => {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${keyName}=`));
  return cookie ? cookie.split("=")[1] : null;
};

export {
  GET_DAILY_REPORT_REQ,
  MAKE_WORKER_DEDUCTION_REQ,
  MAKE_WORKER_ABSENCE_REQ,
  UPDATE_WORKER_ABSENCE_REQ,
  DELETE_WORKER_ABSENCE_REQ,
  UPDATE_WORKER_DEDUCTION_REQ,
  GET_ADVANCE_PAY_BILLS_REQ,
  EDIT_PAY_WORKER_ADVANCE_REQ,
  PAY_WORKER_ADVANCE_REQ,
  MAKE_WORKER_ADVANCE_REQ,
  UPDATE_WORKER_ADVANCE_REQ,
  ADD_EQUIPMENT_REQ,
  UPDATE_EQUIPMENT_REQ,
  GET_ALL_EQUIPMENTS_REQ,
  GET_CAR_ORDERS_REQ,
  ADD_CAR_REQ,
  EDIT_CAR_REQ,
  GET_CAR_REQ,
  DELETE_CAR_REQ,
  LOGIN_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_CATEGORIES_REQ,
  ADD_CATEGORY_REQ,
  GET_CATEGORIES_PRODUCTS_REQ,
  GET_PRODUCT_SORTS_REQ,
  ADD_SORT_REQ,
  GET_ALL_ORDERS_REQ,
  GET_ORDER_ITEMS_REQ,
  GET_ALL_PRODUCTS_REQ,
  GET_ALL_SORTS_REQ,
  ADD_ORDER_REQ,
  ADD_PRODUCT_REQ,
  GET_ALL_CLIENTS_REQ,
  GET_CLIENT_PROFILE_REQ,
  EDIT_CLIENT_REQ,
  ADD_CLIENT_CONTACT_REQ,
  DELETE_CONTACT_REQ,
  UPDATE_CONTACT_REQ,
  GET_ALL_WORKERS_REQ,
  GET_WORKERS_PROFILE_REQ,
  BAN_USER_REQ,
  ADD_CLIENT_REQ,
  ADD_WORKER_REQ,
  SIGN_OUT_REQ,
  GET_MY_PROFILE_REQ,
  EDIT_CATEGORY_REQ,
  DELETE_CATEGORY_REQ,
  UPDATE_PRODUCT_REQ,
  UPDATE_SORT_REQ,
  ADD_WORKER_CONTACT_REQ,
  UPDATE_PASSWORD_REQ,
  UPDATE_ORDER_REQ,
  GET_ALL_COSTS_REQ,
  MAKE_RETURNS_REQ,
  GET_ALL_RETURNS_REQ,
  GET_ORDER_RETURNS_REQ,
  GET_ONE_RETURNS_REQ,
  INITIAL_DATA_REQ,
  SEARCH_REQ,
  GET_CALCS_REQ,
  GET_GRAPH_DATA_REQ,
  CREATE_NEW_TENANT_REQ,
  UPDATE_TENANT_REQ,
  GET_ALL_TENANTS_REQ,
  SIGN_FUSER_REQ,
  GET_TENANT_VARS_REQ,
  DELETE_PRODUCT_REQ,
  CREATE_EXPENSE_REQ,
  UPDATE_EXPENSE_REQ,
  DELETE_EXPENSE_REQ,
  GET_ALL_EXPENSES_REQ,
  GET_STOCK_CHECKS_ITEMS_REQ,
  GET_ALL_STOCK_CHECKS_REQ,
  CREATE_STOCK_CHECKS_REQ,
  UPDATE_BALANCE_REQ,
  UPDATE_WORKER_REQ,
  PAY_SALARIES_REQ,
  GET_ORDER_INSTALLMENTS_REQ,
  PAY_INSTALLMENT_REQ,
  GET_ALL_SUPPLIERS_REQ,
  GET_ONE_SUPPLIER_REQ,
  ADD_SUPPLIER_REQ,
  GET_SUPPLIERS_BILLS_REQ,
  PAY_SUPPLIERS_REQ,
  GET_ONE_COST_REQ,
  GET_ALL_CAR_REQ,
  ADD_ORDER_NOSORTS_REQ,
};
