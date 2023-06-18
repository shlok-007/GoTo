import travelDetails_interface from "../types/travelDetailsInterface";

const findCompanions = async (
  destination: string,
  date: string,
  email: string
): Promise<travelDetails_interface[] | boolean> => {
  try {
    const response = await fetch(
      "http://localhost:5000/travelDetails/?" +
        new URLSearchParams({
          destination: destination,
          date: date,
          email: email
        })
    );
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return false;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default findCompanions;
