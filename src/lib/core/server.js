"use server";

import { getUserToken } from "./session";


const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const getAuthHeaders = async (requiresAuth = false) => {
  const headers = {
    "Content-Type": "application/json",
  };
  
  try {
    const token = await getUserToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    
  }
  
  return headers;
};

export const serverFetch = async (path) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseurl}${path}`, {
      headers,
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status} for path: ${path}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Server fetch runtime error:", error);
    return null;
  }
};

export const serverMutation = async (path, data) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseurl}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};

export const serverPatch = async (path, data) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseurl}${path}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};

export const serverDelete = async (path) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${baseurl}${path}`, {
    method: "DELETE",
    headers,
  });
  
  if (!res.ok) {
    throw new Error(`Request Failed: ${res.status}`);
  }
  return res.json();
};