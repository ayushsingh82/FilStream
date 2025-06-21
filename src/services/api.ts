import axios from "axios";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

const API_BASE_URL =  "http://localhost:3000";

// Base axios instance without payment interceptor
const baseApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});