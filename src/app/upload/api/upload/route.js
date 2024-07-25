import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid'

export async function POST(req) {
	const formData = await req.formData();
	const file = formData.get('file');
	const {name, type} = file;
	const data = await file.arrayBuffer();

	const client = new S3Client({
		region: 'eu-north-1',
		credentials: {
			accessKeyId: "AKIAU6GD22MEIRDJ7OTN",
			secretAccessKey: "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",
		}
	});

	const id = uniqid();
	const ext = name.split('.').slice(-1)[0];
	const newName = id + '.' + ext;

	const uploadCommand = new PutObjectCommand({
		Bucket: "auto-captioner",
		Body: data,
		ACL: 'public-read',
		ContentType: type,
		Key: newName,
	});

	await client.send(uploadCommand);

	return Response.json({name,ext,newName,id});
}