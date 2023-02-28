const PAPAGO_PROXY_API_URL = '//localhost:3010/translate';

export const getEngToKor = async (textObj: object) => {
  // const MOCK_DATA = {"DAY 1":[{"destination":"Jeju Folklore and Natural History Museum","description":"examine Jeju’s natural history and culture","latitude":"33.5203732","longitude":"126.5176534"},{"destination":"Halla Mountain","description":"see breathtaking views and go hiking","latitude":"33.361205","longitude":"126.527807"},{"destination":"Seongeup Folk Village","description":"wander around the charming traditional village","latitude":"33.3410306","longitude":"126.7169708"}],"DAY 2":[{"destination":"Udo Island","description":"explore the green islands off Jeju","latitude":"33.3606745","longitude":"126.6265083"},{"destination":"Mystery Road","description":"enjoy a scenic drive","latitude":"33.3745507","longitude":"126.612722"},{"destination":"Jeju Seongsan Ilchulbong Peak","description":"hike the famous volcanic crater","latitude":"33.4799914","longitude":"126.9820269"}],"DAY 3":[{"destination":"Manjanggul Lave Tunnel","description":"walk through the magnificent lava cave","latitude":"33.2703706","longitude":"126.8679896"},{"destination":"Jeju Horse Park","description":"ride horses in the park and see a show","latitude":"33.4767348","longitude":"126.8083144"},{"destination":"The O'sulloc Tea Museum","description":"learn about the culture of Korean tea","latitude":"33.3722953","longitude":"126.8373072"}],"DAY 4":[{"destination":"Love Land","description":"visit the adult-themed sculpture park","latitude":"33.485024","longitude":"126.7950602"},{"destination":"Jeju Glass Castle","description":"visit the colorful glass art museum","latitude":"33.5390317","longitude":"126.8451405"},{"destination":"Hamdeok Beach","description":"watch the sunset on the white sand beach","latitude":"33.2945478","longitude":"126.6646028"}]};

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({text: textObj}),
  };
  
  const res = await fetch(PAPAGO_PROXY_API_URL, options);
  return res.json();
}