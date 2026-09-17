"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


export async function uploadImageAction(formData: FormData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/upload`, {
      method: "POST",
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: formData,
    });
    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, url: data.data.url };
    }

    return { success: false, message: data.message || "Failed to upload image" };
  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, message: "An error occurred during upload." };
  }
}

export async function submitReviewAction(payload: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.ok && data.success) {
      revalidatePath("/dashboard/reviews/pending");
      revalidatePath("/");
      return { success: true, message: data.message };
    }

    return { success: false, message: data.message || "Failed to submit review" };
  } catch (error) {
    console.error("Review Submit Error:", error);
    return { success: false, message: "An error occurred during submission." };
  }
}

export async function getReviewsAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // For GET request, we might not need auth token if reviews are public,
    // but just in case, we can include it or leave it out if it's public.
    // Assuming public for now as landing page reviews are usually public.
    const response = await fetch(`${baseUrl}/review`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // You can add next: { revalidate: 60 } or cache: "no-store" based on your needs
      cache: "no-store",
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, data: data.data };
    }

    return { success: false, message: data.message || "Failed to fetch reviews", data: [] };
  } catch (error) {
    console.error("Fetch Reviews Error:", error);
    return { success: false, message: "An error occurred while fetching reviews.", data: [] };
  }
}

export async function getPendingReviewsAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/review/admin/pending`, {
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

    return { success: false, message: data.message || "Failed to fetch pending reviews", data: [] };
  } catch (error) {
    console.error("Fetch Pending Reviews Error:", error);
    return { success: false, message: "An error occurred while fetching pending reviews.", data: [] };
  }
}

export async function updateReviewStatusAction(id: string | number, status: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${baseUrl}/review/admin/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();

    if (response.ok && data.success) {
      revalidatePath("/dashboard/reviews/pending");
      revalidatePath("/dashboard/reviews/approved");
      revalidatePath("/");
      return { success: true, message: data.message };
    }

    return { success: false, message: data.message || "Failed to update review status" };
  } catch (error) {
    console.error("Update Review Status Error:", error);
    return { success: false, message: "An error occurred while updating review status." };
  }
}
