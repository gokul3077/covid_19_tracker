import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  try {
    let changedUrl = url;
    // console.log("fetch data for " + country);
    if (country) {
      if (country != "global") {
        changedUrl = `${url}/countries/${country}`;
      }
      // console.log(changedUrl);
    }
    const { data } = await axios.get(changedUrl);
    console.log(data);
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };
    return modifiedData;
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    const modifiedData = countries.map((country) => country.name);

    return modifiedData;
  } catch (error) {}
};
