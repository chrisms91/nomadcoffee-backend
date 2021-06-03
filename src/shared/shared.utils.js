import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  try {
    const { filename, createReadStream } = await file;
    const newFileName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    console.log(readStream);
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: 'nomadcoffee-image-uploads',
        Key: newFileName,
        ACL: 'public-read',
        Body: readStream,
      })
      .promise();
    return Location;
  } catch (error) {
    console.log('something happen');
    console.log(error);
    return;
  }
};
