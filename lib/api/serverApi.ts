import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", {
    params,
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return Boolean(data?.success);
};
