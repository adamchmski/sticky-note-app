/**
 * Service for handling sticky note API calls
 */

/**
 * Updates a sticky note on the server
 * @param {Object} stickyData - The sticky note data to update
 * @param {string} stickyData._id - The sticky note ID
 * @param {string} stickyData.color - The sticky note color class
 * @param {Object} stickyData.position - The sticky note position
 * @param {Object} stickyData.size - The sticky note size
 * @param {number} stickyData.zIndex - The sticky note z-index
 * @param {string} stickyData.text - The sticky note text content
 * @returns {Promise} - The response from the server
 */
export const updateSticky = async (stickyData) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/stickies",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stickyData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error saving card:", error);
    throw error;
  }
};

/**
 * Creates a new sticky note
 * @param {string} color - The color class for the new sticky note
 * @returns {Promise} - The response from the server with the new sticky note data
 */
export const createSticky = async (color, creator) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/stickies",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color, creator }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
};

/**
 * Deletes a sticky note
 * @param {string} _id - The ID of the sticky note to delete
 * @returns {Promise} - The response from the server
 */
export const deleteSticky = async (_id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/stickies",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};

export const getUserStickies = async (creator) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/stickies/userStickies",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};
