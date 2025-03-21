export const login = async (username, password) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.user._id;
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
};
