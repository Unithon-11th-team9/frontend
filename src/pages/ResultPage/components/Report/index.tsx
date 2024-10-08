import Typography from "@/components/Typography";
import reward_tape from "/img/reward_tape.png";
import Score from "../Score";
import MbtiCardGrid from "../MbtiCardGrid";
import { getSummaryNext } from "../../utils";
import { useState } from "react";
import Button from "@/components/Button";
import KakaoShare from "@/components/KakaoShare";
import { useNavigate } from "react-router-dom";

type ReportProps = {
	summaries: string[];
	scores: [string, number][];
	mbtis: {
		E: string;
		F: string;
		I: string;
		T: string;
	};
};
export default function Report({ summaries, scores, mbtis }: ReportProps) {
	const navigate = useNavigate();
	const [summary, setSummary] = useState(summaries[0]);

	const currentUrl = window.location.href;
	const handleCopyUrl = () => {
		navigator.clipboard.writeText(currentUrl).then(() => {
			alert("클립보드에 복사되었습니다");
		});
		// .catch((error) => {
		// 	console.error("클립보드 복사 실패!");
		// });
	};

	return (
		<section className="w-full h-[1650px] flex flex-col bg-black">
			<div className="flex flex-col justify-center items-center text-point"></div>

			<div className="relative h-[200px]">
				<div className="absolute right-0 ">
					<img src={reward_tape} alt="tape" />
				</div>

				{/* title */}
				<div className="absolute top-20 translate-x-16 mb-20">
					<div className="flex flex-col justify-center items-center">
						<Typography type="title_02" classNames="text-point">
							AI가 분석한
						</Typography>
						<Typography type="title_02" classNames="text-point">
							대화 분석 리포트
						</Typography>
					</div>
				</div>
			</div>

			{/* 대화 요약 */}
			<article className="flex flex-col justify-center items-center mb-8 relative">
				<div className="text-white">
					<Typography type="main_text_03">대화 요약</Typography>
				</div>
				<div className="bg-white rounded-[30px] w-[335px] h-[206px] flex flex-col items-center m-5 relative">
					<button onClick={() => setSummary(getSummaryNext(summaries))} className="absolute top-[21px] right-4">
						<img alt="retry" src="/retry.svg" />
					</button>
					<div className="text-center px-3 pt-[58px]">
						<Typography type="main_text_03">{summary}</Typography>
					</div>
				</div>
			</article>

			{/* 대화 평화 점수 */}
			<article className="flex flex-col justify-center items-center mb-[62px]">
				<div className="text-white">
					<Typography type="main_text_03">대화 평화 점수</Typography>
				</div>
				<div className="bg-white rounded-[30px] w-[335px] h-[301px] flex justify-center items-center m-5">
					<div className="flex gap-4">
						{scores.map((score: [string, number], index) => (
							<div key={score[1]}>
								<Score name={score[0]} score={score[1]} index={index} />
							</div>
						))}
					</div>
				</div>
			</article>

			{/* MBTI 추측 */}
			<article className="flex flex-col justify-center items-center">
				<div className="text-white">
					<Typography type="main_text_03">AI가 대화를 보고 추측한 MBTI</Typography>
				</div>
				<MbtiCardGrid mbtis={mbtis} />
				<div className="text-white">
					<Typography type="sub_text_02">발화 빈도 수와 공감성 멘트 비율을 통해 측정했습니다.</Typography>
				</div>
				<div className="flex justify-center my-10 gap-4">
					<KakaoShare />
					<button className="text-black w-[49px] p-3 bg-point rounded-[8px]" onClick={handleCopyUrl}>
						<img alt="link" src="/link.svg" />
					</button>
					<div className="relative">
						<Button buttonType="button2" classNames="text-black text-lg w-[140px]" onClick={() => navigate("/")}>
							다시 하기
						</Button>
					</div>
				</div>
			</article>
		</section>
	);
}
