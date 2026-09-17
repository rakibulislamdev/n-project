"use server";

import { cookies } from "next/headers";
import { User } from "@/types";

export async function loginAction(values: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const cookieStore = await cookies();
      const rememberMe = values.rememberMe === true;
      
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        ...(rememberMe && { maxAge: 60 * 60 * 24 * 30 }), // 30 days if rememberMe
      };
      
      cookieStore.set("accessToken", data.data.accessToken, cookieOptions);
      cookieStore.set("refreshToken", data.data.refreshToken, cookieOptions);
      cookieStore.set("user", JSON.stringify(data.data.user), {
        path: "/",
        ...(rememberMe && { maxAge: 60 * 60 * 24 * 30 }),
      });
      
      return { 
        success: true, 
        message: data.message || "Login successful"
      };
    } else {
      return { 
        success: false, 
        message: data.message || "Failed to login. Please check your credentials." 
      };
    }
  } catch (error) {
    console.error("Server Action Login Error:", error);
    return { 
      success: false, 
      message: "An error occurred during login. Please try again later." 
    };
  }
}



export async function getMeAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "No access token found", data: null };
    }

    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { 
        success: true, 
        message: data.message || "User fetched successfully",
        data: data.data as User
      };
    } else {
      return { 
        success: false, 
        message: data.message || "Failed to fetch user profile",
        data: null
      };
    }
  } catch (error) {
    console.error("Server Action getMe Error:", error);
    return { 
      success: false, 
      message: "An error occurred while fetching user profile.",
      data: null
    };
  }
}

export async function logoutAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }).catch(err => console.error("Logout API failed:", err));
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Server Action Logout Error:", error);
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");
    
    return { success: false, message: "An error occurred during logout." };
  }
}
