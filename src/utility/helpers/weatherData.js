const toChunkArray = (payload) =>{

  const n = 5;
  const chunkLength = Math.max(payload.length/n ,1);
  const chunks = [];
  for (let i = 0; i < n; i++) {
    if(chunkLength*(i+1)<= payload.length)chunks.push(payload.slice(chunkLength*i, chunkLength*(i+1)));
  }
  return chunks;
};

const getForecastWeatherData = (data) =>{

  const chunkArray =  toChunkArray(data);

  const weatherDataOne = chunkArray[0] || [];
  const weatherDataTwo = chunkArray[1] || [];
  const weatherDataThree = chunkArray[2] || [];
  const weatherDataFor = chunkArray[3] || [];
  const weatherDataFive = chunkArray[4] || [];
  const dayOne = weatherDataOne[0]?.dt_txt.slice(8).slice(0,3);
  const dayTwo = weatherDataTwo[0]?.dt_txt.slice(8).slice(0,3);
  const dayThree = weatherDataThree[0]?.dt_txt.slice(8).slice(0,3);
  const dayFor = weatherDataFor[0]?.dt_txt.slice(8).slice(0,3);
  const dayFive = weatherDataFive[0]?.dt_txt.slice(8).slice(0,3);
  const monthOne = weatherDataOne[0]?.dt_txt.slice(0,7);
  const monthTwo = weatherDataTwo[0]?.dt_txt.slice(0,7);
  const monthTree = weatherDataThree[0]?.dt_txt.slice(0,7);
  const monthFor = weatherDataFor[0]?.dt_txt.slice(0,7);
  const monthFive = weatherDataFive[0]?.dt_txt.slice(0,7);const weatherDates = [];
  weatherDates.push(`${dayOne}-${dayTwo}, ${monthOne}`, `${dayTwo}-${dayThree}, ${monthTwo}`, `${dayThree}-${dayFor}, ${monthTree}`, `${dayFor}-${dayFive}, ${monthFor}`, `${dayFive},${monthFive}`);
return {
    weatherDates,
  weatherDataOne,
  weatherDataTwo,
  weatherDataThree,
  weatherDataFor,
  weatherDataFive
}
}

module.exports = {
  getForecastWeatherData
};
