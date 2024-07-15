'use client';
import { useEffect, useState } from "react";


export default function FilePage({ params }) {
	const filename = params.filename;
	const [ isTranscribing, setIsTranscribing ] = useState(false);
	const [ awsTranscriptionItems, setAwsTranscriptionItems ] = useState([]);

	useEffect(() => {
		getTranscription();
	},
	[filename]);
	
	function getTranscription() {
		fetch('/upload/api/transcribe?filename=' + filename)
			.then(response => {
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
					setAwsTranscriptionItems(transcription.results.items);
				} else {
					console.error('Unexpected response format');
				}
			})
			.catch(error => {
				console.error('Error fetching transcription:', error);
			});
	}
	return (
		<div>
			{filename}
			<div>
				is transcribing: {JSON.stringify(isTranscribing)}
			</div>
			{awsTranscriptionItems.length > 0 && awsTranscriptionItems.map(item => (
				<div key={item.start_time}>
					<span className="text-white/50 mr-2">
						{item.start_time} - {item.end_time}
					</span>
					<span>
						{item.alternatives[0].content}
					</span>
				</div>
			))}
		</div>
	);
}