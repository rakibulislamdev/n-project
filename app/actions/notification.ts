"use server";

import { cookies } from "next/headers";

export async function getNotificationsAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/notification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, data: data.data };
    }

    return { success: false, message: data.message || "Failed to fetch notifications", data: [] };
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    return { success: false, message: "An error occurred while fetching notifications.", data: [] };
  }
}

export async function markNotificationReadAction(id: string | number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/notification/${id}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, message: data.message };
    }

    return { success: false, message: data.message || "Failed to mark as read" };
  } catch (error) {
    console.error("Mark Read Error:", error);
    return { success: false, message: "An error occurred while marking as read." };
  }
}

export async function deleteNotificationAction(id: string | number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/notification/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, message: data.message };
    }

    return { success: false, message: data.message || "Failed to delete notification" };
  } catch (error) {
    console.error("Delete Notification Error:", error);
    return { success: false, message: "An error occurred while deleting notification." };
  }
}
