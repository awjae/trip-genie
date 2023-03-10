const SEARCH_BLOG_PROXY_API_URL = '//localhost:3010/searchBlog';


export const getSearchBlog = async (query : string) => {
  return MOCK_DATA;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query: query}),
  };
  
  const res = await fetch(SEARCH_BLOG_PROXY_API_URL, options);
  return res.json();
};


const MOCK_DATA = {
	"lastBuildDate":"Sat, 11 Mar 2023 01:15:40 +0900",
	"total":9759476,
	"start":1,
	"display":10,
	"items":[
		{
			"title":"풍부했던 <b>제주도<\/b> 고등어회 맛집",
			"link":"https:\/\/blog.naver.com\/totoro0604\/223040300656",
			"description":"며칠 전에는 친구들과 꼭 가보고 싶었던 <b>제주도<\/b> 고등어회 맛집을 찾아가게 됐는데요. 오션 뷰를 보면서... 힐링이 절로 되는 광활한 뷰에 텐션이 확 올랐어요~ 자리를 잡은 저희는 <b>제주도<\/b> 고등어회 맛집의 풍경... ",
			"bloggername":"핸들이 고장난 8톤 트럭",
			"bloggerlink":"blog.naver.com\/totoro0604",
			"postdate":"20230310"
		},
		{
			"title":"<b>제주도<\/b> 간식 선물하기좋은 제주 하마보",
			"link":"https:\/\/blog.naver.com\/re14333\/223037743058",
			"description":"며칠 전 친구들과 <b>제주도<\/b>로 여행을 갔다가 잊을 수 없는 <b>제주도<\/b> 간식 전문점을 발견했어요. 다양한 재료를 활용한 색다른 수제 찐빵을 맛봤던 곳으로 소개해 드려요. 우리가 방문한 하마보는 광치기해변에서... ",
			"bloggername":"카페 컨설팅",
			"bloggerlink":"blog.naver.com\/re14333",
			"postdate":"20230307"
		},
		{
			"title":"일품이던 <b>제주도<\/b> 생돼지갈비 제주 철수네숯불갈비",
			"link":"https:\/\/blog.naver.com\/aldus1021\/223037913085",
			"description":"주말에 사촌 동생이랑 산책 겸 도두봉을 오른 후 <b>제주도<\/b> 생돼지갈비로 저녁을 해결했는데요. 뛰어난... <b>제주도<\/b> 생돼지갈비 전문점의 벽면에는 고기를 잡 굽는 법 가이드가 적혀 있었는데요. 늘 누가 구워주는... ",
			"bloggername":"훌훌",
			"bloggerlink":"blog.naver.com\/aldus1021",
			"postdate":"20230308"
		},
		{
			"title":"입맛 사로잡은 <b>제주도<\/b> 흑돼지",
			"link":"https:\/\/blog.naver.com\/sangil00\/223033927182",
			"description":"지난주에는 가족들과 함께 중문에서 관광을 하다가 <b>제주도<\/b> 흑돼지 집을 방문하게 되었어요. 고민 없이... <b>제주도<\/b> 흑돼지를 전부 다 먹을수 있을까 생각이 들 정도로 디앵했어요. 먼저 시선이 머물렀던건... ",
			"bloggername":"길을 찾는 즐거움_거칠부",
			"bloggerlink":"blog.naver.com\/sangil00",
			"postdate":"20230304"
		},
		{
			"title":"호감 상승한 <b>제주도<\/b> 애월 흑돼지 맛집",
			"link":"https:\/\/blog.naver.com\/skdhdus20\/223030483952",
			"description":"얼마전 지인들과 유채꽃을 구경하고서 다녀온 <b>제주도<\/b> 애월 흑돼지 맛집이 있는데요. 꼭 가보라고... 이름만 들어도 알 수 있는 셀럽들도 자주 찾아오는 <b>제주도<\/b> 애월 흑돼지 맛집이라 호감도 상승했어요.... ",
			"bloggername":"먹고놀고쓰고배우고",
			"bloggerlink":"blog.naver.com\/skdhdus20",
			"postdate":"20230228"
		},
		{
			"title":"내가 고른 <b>제주도<\/b> 기념품",
			"link":"https:\/\/blog.naver.com\/smilesoo486\/223018026257",
			"description":"저번 친구들과 보냈던 애월 마지막날에는 <b>제주도<\/b> 기념품을 사러 방문해 보았었는데요. 깔끔하게... 안으로 들어가니 <b>제주도<\/b> 기념품이 냉장고안에 다양하게 준비되어 있었답니다. 너무 많아 정신이 없을 줄... ",
			"bloggername":"양양님의 블로그",
			"bloggerlink":"blog.naver.com\/smilesoo486",
			"postdate":"20230217"
		},
		{
			"title":"다시 찾아갈 <b>제주도<\/b> 밥집",
			"link":"https:\/\/blog.naver.com\/zzingzzing42\/223034845933",
			"description":"저번 주 친구들과 함께 <b>제주도<\/b>로 여행을 갔다가 현지인이 알려준 <b>제주도<\/b> 밥집을 찾아갔어요. 신선한 재료를 사용해 특유의 맛을 즐길 수 있었던 곳이라 알려드리려고해요. 위치 : 제주 제주시 아봉로 200 1층 문의... ",
			"bloggername":"두 남자, 두 여자가 사는 집",
			"bloggerlink":"blog.naver.com\/zzingzzing42",
			"postdate":"20230304"
		},
		{
			"title":"오감을 감탄시킨 <b>제주도<\/b> 통갈치구이",
			"link":"https:\/\/blog.naver.com\/l2s2j0320\/223039613967",
			"description":"얼마 전 가족들과 3박 4일 제주 여행을 다녀오면서 지인들에게 추천받은 <b>제주도<\/b> 통갈치구이 식당을... 실내로 들어서면 넓은 내부를 확인할 수 있었고 벽면에는 <b>제주도<\/b> 갈치구이 전문점답게 생방송 투데이에... ",
			"bloggername":"Yellow chocolate",
			"bloggerlink":"blog.naver.com\/l2s2j0320",
			"postdate":"20230309"
		},
		{
			"title":"<b>제주도<\/b> 해물탕 자연산 돌문어가 통째로!",
			"link":"https:\/\/blog.naver.com\/ybkll\/223039406453",
			"description":"<b>제주도<\/b> 해물탕집이 너무 인상적이였고 맛도 뛰어나 소개해드려요. 유난히 후기가 좋았던 곳이여서 궁금했는데 잘 다녀온거 같아요. 제대로 된 후기가 아닌곳도 많으니 직접 가봐야 인증이 되니까요. :) <b>제주도<\/b>... ",
			"bloggername":"사천진짜순대",
			"bloggerlink":"blog.naver.com\/ybkll",
			"postdate":"20230309"
		},
		{
			"title":"정성을 다한 <b>제주도<\/b> 전복솥밥",
			"link":"https:\/\/blog.naver.com\/fsh1329\/223010500539",
			"description":"오랜만에 가족들과 여행을 갔을때 <b>제주도<\/b> 전복솥밥 전문점에 들렀어요. 현지사람들이 많이 다녀가는 곳... 안으로 들어가니 <b>제주도<\/b> 전복솥밥집은 세련된 인테리어로 꾸며져있었어요. 식탁간 간격도 널널하고... ",
			"bloggername":"what about it?",
			"bloggerlink":"blog.naver.com\/fsh1329",
			"postdate":"20230209"
		}
	]
}