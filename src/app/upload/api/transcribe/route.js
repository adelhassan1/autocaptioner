import { StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid'


async function streamToString(stream) {
	const chunks = [];
	return new Promise((resolve, reject) => {
		stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
		stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
		stream.on('error', reject);
	})
}


async function getTranscriptionFile(filename) {
	const transcriptionFile = filename + '.transcribed';
	const client = new S3Client({
		region: 'eu-north-1',
		credentials: {
			accessKeyId: "AKIAU6GD22MEIRDJ7OTN",
			secretAccessKey: "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",
		}
	});
	const getObjectCommand = new GetObjectCommand({
		Bucket: "auto-captioner",
		Key: transcriptionFile,
	});
	let transcriptionFileRespond = null;
	try {
		transcriptionFileRespond = await client.send(getObjectCommand);
	} catch (e) {}
	if (transcriptionFileRespond) {
		return JSON.parse(await streamToString(transcriptionFileRespond.Body));
	}
	return null;
}

export async function GET(req) {
	const url = new URL(req.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const filename = searchParams.get('filename');
	const jobName = 'transcribtion-' + uniqid();

	const transcription = await getTranscriptionFile(filename);
	if (transcription) {
		return Response.json({
			status: 'COMPLETED',
			transcription,
		})
	}

	const transcribeClient = new TranscribeClient({
		region: 'eu-north-1',
		credentials: {
			accessKeyId: "AKIAU6GD22MEIRDJ7OTN",
			secretAccessKey: "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",
		}
	});

	const transcribionCommand = new StartTranscriptionJobCommand({
		TranscriptionJobName: jobName,
		OutputBucketName: "auto-captioner",
		OutputKey: filename + '.transcribed',
		IdentifyLanguage: true,
		Media: {
			MediaFileUri: 's3://' + "auto-captioner" + '/' + filename,
		}
	});

	const result = await transcribeClient.send(transcribionCommand);

	return Response.json(result);
}