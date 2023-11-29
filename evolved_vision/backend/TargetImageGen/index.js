const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");
const S3Downloader = require("./S3Service");
require("dotenv").config();

const app = express();
const port = 3001;

const uploadFolder = "uploads"; // Directory to store downloaded images
const zptFolder = "zptFiles"; // Directory to store generated .zpt files

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/generate-zpt", async (req, res) => {
  const s3Link = req.body.s3Link;
  console.log("s3Link", s3Link, req.body);

  // Config for S3Downloader
  const s3Config = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    baseFolder: path.join(__dirname, uploadFolder),
  };

  try {
    // Download the image from the S3 link
    const downloader = new S3Downloader(s3Config);
    await downloader.download(s3Link);

    // Generate the .zpt file using zapworks train
    const objectKey = path.basename(s3Link);
    const zptOutputPath = path.join(
      __dirname,
      zptFolder,
      `target-${objectKey}.zpt`
    );
    // console.log("111", Date.now().toString());
    const zapworksCommand = `zapworks train ${path.join(
      s3Config.baseFolder,
      objectKey
    )} -o ${zptOutputPath}`;

    exec(zapworksCommand, async (error, stdout, stderr) => {
      // console.log("222", Date.now().toString());
      if (error) {
        console.error(`Error generating .zpt file: ${error.message}`);
        return res.status(500).json({ error: "Error generating .zpt file" });
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Upload the .zpt file to S3
      const uploader = new S3Downloader(s3Config);
      const zptUrl = await uploader.upload(zptOutputPath, objectKey);

      return res.status(200).json({
        zptLinkl: `/zptFiles/target-${objectKey}.zpt`,
        zptUrl: zptUrl,
      });
    });
  } catch (error) {
    console.error(`Error downloading image from S3: ${error.message}`);
    return res.status(500).json({ error: "Error downloading image from S3" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
