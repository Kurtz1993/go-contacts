import { Contact } from "@models/contact.model";
import axios from "axios";

const apiUrl = "http://localhost:8080";

const api = axios.create({ baseURL: `${apiUrl}/contacts` });

export async function getContacts() {
  try {
    const { data } = await api.get<Contact[]>("/");

    return data;
  } catch (e) {
    throw e;
  }
}
