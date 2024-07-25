'use client';
import styles from "@/app/upload/styles.module.css"
import { useEffect, useState, useRef } from "react";
import Header from '@/app/components/header'
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL, toFFmpegColor } from "@ffmpeg/util"
import roboto from './../../fonts/Roboto-Regular.ttf'
import robotoBold from './../../fonts/Roboto-Bold.ttf'

export default function FilePage({ params }) {
	const filename = params.filename;
	const [ isTranscribing, setIsTranscribing ] = useState(false);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ awsTranscriptionItems, setAwsTranscriptionItems ] = useState([]);

	useEffect(() => {
		getTranscription();
	},
	[filename]);
	
	function getTranscription() {
		setIsFetching(true);
		fetch('/upload/api/transcribe?filename=' + filename)
			.then(response => {
				setIsFetching(false);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				// Check if we have a TranscriptionJob object
				if (data?.TranscriptionJob) {
					const status = data.TranscriptionJob.TranscriptionJobStatus;
					if (status === 'IN_PROGRESS') {
						setIsTranscribing(true);
						setTimeout(getTranscription, 3000);
					} else {
						setIsTranscribing(false);
					}
				} else if (data?.status === 'COMPLETED') {
					setIsTranscribing(false);
					const transcription = data.transcription;
					transcription.results.items.forEach((item, key) => {
						if (!item.start_time) {
							const prev = transcription.results.items[key - 1];
							prev.alternatives[0].content += item.alternatives[0].content;
							delete transcription.results.items[key];
						}
					});
					const filteredItems = transcription.results.items.filter(item => item !== undefined);
					setAwsTranscriptionItems(
						filteredItems.map(item => {
							const {start_time, end_time} = item;
							const content = item.alternatives[0].content;
							return {start_time, end_time, content}
						}));
				} else {
					console.error('Unexpected response format');
				}
			})
			.catch(error => {
				console.error('Error fetching transcription:', error);
			});
	}

	if (isTranscribing) {
		return (
			<div className="text-white">Transcribing your video...</div>
		);
	};

	if (isFetching) {
		return (
			<div className="text-white">Fetching Information...</div>
		);
	}

	function updateTranscriptionItems (index, prop, ev) {
		const newAwsItems = [...awsTranscriptionItems];
		newAwsItems[index][prop] = ev.target.value;
		setAwsTranscriptionItems(newAwsItems);
	}

	return (
		<>
		<Header />
		<div className="text-white pl-96 pt-20 pb-40">
			<div className="grid grid-cols-2 w-[650px] gap-16">
				<div>
					<h2 className="text-2xl text-white/75 mb-4">Transcription</h2>
					<div className="text-center grid grid-cols-3 sticky top-0 bg-blue-900/70 p-2 rounded-md text-white">
						<div>From</div>
						<div>To</div>
						<div>content</div>
					</div>
					{awsTranscriptionItems.length > 0 && (
						<div>
							{awsTranscriptionItems.map( (item, key) => (
								<div key={key}>
									<TranscriptionItems 
									handleStartTimeChange={ev => updateTranscriptionItems(key, "start_time", ev)}
									handleEndTimeChange={ev => updateTranscriptionItems(key, "end_time", ev)}
									handleContentChange={ev => updateTranscriptionItems(key, "content", ev)}
									item={item} />
								</div>
							))}
						</div>
					)}
				</div>
				<div className="">
					<h2 className="text-2xl text-white/75 mb-4">Result</h2>
					<ResultVideo filename={filename} transcriptionItems={awsTranscriptionItems} />
				</div>
			</div>
		</div>
		</>
	);
}

function TranscriptionItems({handleStartTimeChange, handleEndTimeChange, handleContentChange, item}) {

	return (
		<div key={item.start_time} className="my-1 grid grid-cols-3 gap-1 items-center">
					<input type="text" 
							className="bg-white/20 p-1 rounded-md text-center text-white/60" 
							value={item.start_time}
							onChange={handleStartTimeChange}
					/>
					<input type="text" 
							className="bg-white/20 p-1 rounded-md text-center text-white/60" 
							value={item.end_time}
							onChange={handleEndTimeChange}
					/>
					<input type="text" 
							className="bg-white/20 p-1 rounded-md text-center text-white/60" 
							value={item.content}
							onChange={handleContentChange}
					/>
		</div>
	);
}

function ResultVideo({filename, transcriptionItems}) {
	const videoUrl = "https://auto-captioner.s3.amazonaws.com/"+filename
	const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);

	useEffect(() => {
		videoRef.current.src = videoUrl;
		load();
	}, []);

	const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
		await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
		await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
    }

	const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
		const srt = transcriptionItemsToSrt(transcriptionItems);
        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
		await ffmpeg.writeFile('subs.srt', srt);
		ffmpeg.on('log', ({ message }) => {
			console.log(message);
		});
        await ffmpeg.exec(['-i', filename,
			'-preset', 'ultrafast',
			'-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=100'`,
			'output.mp4']);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
    }

	return (
		<>
			<div>
				<button onClick={transcode} className={styles.botton}>
					Apply Captions
				</button>
			</div>
			<div className="rounded-xl overflow-hidden">
				<video 
					ref={videoRef}
					controls>
				</video>
			</div>
		</>
	);
}

function secondsToHHMMSSMS(timeString) {
	const d = new Date(parseFloat(timeString) * 1000);
	return d.toISOString().slice(11, 23).replace('.', ',');
}

function transcriptionItemsToSrt(items) {
	let srt = '';
	let i = 1;
	items.forEach(item => {
		srt += i + "\n";
		const { start_time, end_time } = item;
		srt += secondsToHHMMSSMS(start_time) + ' --> ' + secondsToHHMMSSMS(end_time);
		srt += "\n";
		srt += item.content + "\n";
		srt += "\n";
		i++;
	})
	return(srt);
}