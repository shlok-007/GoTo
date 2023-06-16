import travelDetails_interface from "../types/travelDetailsInterface";

const findCompanions = async (
  destination: string,
  date: string
): Promise<travelDetails_interface[] | boolean> => {
  try {
    const response = await fetch(
      "http://localhost:5000/travelDetails/?" +
        new URLSearchParams({
          destination: destination,
          date: date,
        })
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return JSON.parse("[]");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default findCompanions;
