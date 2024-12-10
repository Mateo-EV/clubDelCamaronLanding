import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axios = Axios.create({
  baseURL: import.meta.env.PUBLIC_BACKEND_URL
})
