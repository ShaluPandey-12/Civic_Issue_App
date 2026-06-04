import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

// API to create signed upload (PUT) and signed download (GET) URLs
// Requirements:
// - Install @google-cloud/storage
// - Set environment variable GCP_SERVICE_ACCOUNT_JSON with service account JSON or set GOOGLE_APPLICATION_CREDENTIALS
// - Set GCLOUD_STORAGE_BUCKET to your bucket name (e.g. civic-issue-app-631cc.appspot.com)

const bucketName = process.env.GCLOUD_STORAGE_BUCKET || 'civic-issue-app-631cc.appspot.com';

async function getStorageClient() {
  // If GCP_SERVICE_ACCOUNT_JSON is provided, use it, otherwise rely on ADC
  if (process.env.GCP_SERVICE_ACCOUNT_JSON) {
    const credentials = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_JSON);
    return new Storage({ projectId: credentials.project_id, credentials });
  }
  return new Storage();
}

export async function POST(req: Request) {
  try {
    const { name, contentType } = await req.json();
    if (!name || !contentType) {
      return NextResponse.json({ error: 'Missing name or contentType' }, { status: 400 });
    }

    const storage = await getStorageClient();
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(name);

    // Signed URL for upload (write)
    const [uploadUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
    });

    // Signed URL for download (read)
    const [downloadUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    return NextResponse.json({ uploadUrl, downloadUrl, objectName: name });
  } catch (err) {
    console.error('Error creating signed URL', err);
    return NextResponse.json({ error: 'Failed to create signed URL' }, { status: 500 });
  }
}
