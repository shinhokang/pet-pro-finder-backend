import aws from "aws-sdk";
import { NextFunction, Request, Response, Router } from "express";

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const REGION = process.env.AWS_S3_REGION;
const SIGNATUREVERSION = process.env.AWS_S3_SIGNATURE_VERSION;

class S3Router {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  public signS3 = async (req: Request, res: Response, next: NextFunction) => {
    const {
      query: { name, type }
    } = req;
    const s3 = new aws.S3({
      signatureVersion: SIGNATUREVERSION,
      region: REGION,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Expires: 60,
      ContentType: type,
      ACL: "public-read"
    };

    try {
      const signedUrl = await s3.getSignedUrl("putObject", s3Params);
      const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${name}`;
      return res.json({
        signedUrl,
        fileUrl
      });
    } catch (error) {
      return res.json({
        error: true
      });
    }
  };

  private init() {
    this.router.get("/", this.signS3);
  }
}

export default new S3Router().router;
