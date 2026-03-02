

import { userRequest } from '@/lib/RequestMethods';

// Upload file to S3 using presigned URL
export const uploadFileToS3 = async (file, presignedUrl) => {
  try {
    console.log('[FileService] Starting S3 upload with presignedUrl:', presignedUrl);
    console.log('[FileService] File details:', { name: file.name, size: file.size, type: file.type });
    
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    
    console.log('[FileService] S3 upload response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[FileService] S3 upload failed response:', errorText);
      throw new Error(`Upload failed with status: ${response.status}. ${errorText}`);
    }
    
    console.log('[FileService] S3 upload succeeded');
    return true;
  } catch (error) {
    console.error('[FileService] Error uploading file to S3:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// Get presigned URL for file upload
export const getPresignedUrl = async (fileName, fileType) => {
  try {
    console.log('[FileService.getPresignedUrl] Requesting presigned URL for:', { fileName, fileType });
    
    const response = await userRequest.post('/file/presigned-url', {
      fileName,
      fileType,
    });
    
    console.log('[FileService.getPresignedUrl] Full response received:', response);
    console.log('[FileService.getPresignedUrl] response.data:', response.data);
    
    // Handle TransformInterceptor wrapped response
    // Structure: { status, message, data: { uploadUrl, key } }
    const responseData = response.data?.data || response.data;
    
    if (!responseData || !responseData.uploadUrl || !responseData.key) {
      console.error('[FileService.getPresignedUrl] Invalid response structure:', responseData);
      throw new Error('Invalid response from server: missing uploadUrl or key');
    }
    
    console.log('[FileService.getPresignedUrl] Presigned URL obtained successfully:', { 
      key: responseData.key, 
      hasUploadUrl: !!responseData.uploadUrl 
    });
    
    return responseData;
  } catch (error) {
    console.error('[FileService.getPresignedUrl] Error getting presigned URL:', error);
    if (error.response?.data) {
      console.error('[FileService.getPresignedUrl] Server error response:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || 
      error.message ||
      'Failed to get upload URL. Please try again.'
    );
  }
};

// Get presigned download URL for viewing/downloading a file from S3
export const getDownloadUrl = async (key) => {
  try {
    console.log('[FileService.getDownloadUrl] Requesting download URL for key:', key);
    
    const response = await userRequest.post('/file/download-url', {
      key,
    });
    
    console.log('[FileService.getDownloadUrl] Full response received:', response);
    
    // Handle TransformInterceptor wrapped response
    // Structure: { status, message, data: { url } }
    const responseData = response.data?.data || response.data;
    
    if (!responseData || !responseData.url) {
      console.error('[FileService.getDownloadUrl] Invalid response structure:', responseData);
      throw new Error('Invalid response from server: missing download URL');
    }
    
    console.log('[FileService.getDownloadUrl] Download URL obtained successfully');
    return responseData.url;
  } catch (error) {
    console.error('[FileService.getDownloadUrl] Error getting download URL:', error);
    if (error.response?.data) {
      console.error('[FileService.getDownloadUrl] Server error response:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || 
      error.message ||
      'Failed to get download URL.'
    );
  }
};
