const BASE_URL = "https://your-railway-url.up.railway.app/api";

// Helper function
const request = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// Auth
export const registerUser = (name, email, password) =>
  request("/auth/register", "POST", { name, email, password });

export const loginUser = (email, password) =>
  request("/auth/login", "POST", { email, password });

export const getMe = (token) =>
  request("/auth/me", "GET", null, token);

// Interviews
export const saveInterview = (data, token) =>
  request("/interviews", "POST", data, token);

export const getInterviews = (token) =>
  request("/interviews", "GET", null, token);

// Resume Upload
export const uploadResume = async (file, token) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch(`${BASE_URL}/interviews/resume`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
};