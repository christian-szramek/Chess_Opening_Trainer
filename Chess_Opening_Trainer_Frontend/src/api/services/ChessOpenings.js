import axiosChessInstance from "../axios";

// GET all openings as array from the API
export const getAllOpenings = async callBackFunc => {
  try {
    const response = await axiosChessInstance.get("/openings");
    callBackFunc(response.data);
  } catch (error) {
    if (error.response) {
      // Not in the 200 response range
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
};

// GET specific opening from the API
export const getOpening = async (id, callBackFunc) => {
  try {
    const response = await axiosChessInstance.get(`/openings/${id}`);
    callBackFunc(response.data);
  } catch (error) {
    if (error.response) {
      // Not in the 200 response range
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
};
