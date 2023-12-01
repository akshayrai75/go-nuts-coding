const axios = require("axios");
const path = require("path");
const fs = require("fs/promises");
const AWS = require("aws-sdk");
const fsFile = require("fs");
require("dotenv").config();

class S3Downloader {
  constructor(config) {
    this.config = config;
    AWS.config.update({
      region: config.region,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
  }

  async upload(zptPath, objectKey) {
    console.log("Starting Upload... ");
    const s3 = new AWS.S3();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `zptFiles/${objectKey}`,
      Body: fsFile.createReadStream(zptPath),
      ContentType: "application/octet-stream", // Set the content type to binary
    };

    try {
      const data = await s3.upload(params).promise();
      console.log("ZPT Uploaded.");
      return data.Location;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async download(s3Link) {
    const s3 = new AWS.S3();
    const { bucketName, objectKey } = this.parseS3Link(s3Link);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
    };

    try {
      const data = await s3.getObject(params).promise();

      const filePath = path.join(this.config.baseFolder, objectKey);
      console.log(filePath);
      await fs.mkdir(path.dirname(filePath), { recursive: true }); // Create directory structure
      await fs.writeFile(filePath, data.Body);

      console.log("Image Downloaded.");
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  parseS3Link(s3Link) {
    const match = s3Link.match(/\/([^/]+)$/);
    // console.log("match", match);
    if (match && match.length === 2) {
      const objectKey = match[1];
      return { objectKey };
    } else {
      console.error("Invalid S3 link format");
      throw new Error("Invalid S3 link format");
    }
  }
}

module.exports = S3Downloader;
