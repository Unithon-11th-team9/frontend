declare global {
	interface Window {
		Kakao: any;
	}
}

import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

export default () => {
	// 배포한 자신의 사이트
	const realUrl = "https://enchanting-starlight-3ba18d.netlify.app";

	// 로컬 주소 (localhost 3000 같은거)
	const resultUrl = window.location.href;

	// 재랜더링시에 실행되게 해준다.
	useEffect(() => {
		// init 해주기 전에 clean up 을 해준다.
		Kakao.cleanup();
		// 자신의 js 키를 넣어준다.
		Kakao.init(import.meta.env.VITE_KAKAO_KEY);
		// 잘 적용되면 true 를 뱉는다.
		console.log(Kakao.isInitialized());
	}, []);

	const shareKakao = () => {
		Kakao.Share.sendDefault({
			objectType: "feed",
			content: {
				title: "2024 대화 평화상",
				description: "우리 단톡방에서 2024 대화 평화상 수상자는?",
				imageUrl: "https://github.com/Unithon-11th-team9/frontend/assets/65716445/3512fe1f-19ba-4fca-9b5f-9a9054710e3b",
				link: {
					mobileWebUrl: realUrl,
				},
			},
			buttons: [
				{
					title: "나도 테스트 하러가기",
					link: {
						mobileWebUrl: realUrl,
					},
				},
			],
		});
	};

	return (
		<>
			<button
				className="bg-white"
				onClick={() => {
					shareKakao();
				}}
			>
				카카오톡 공유하기
			</button>
		</>
	);
};