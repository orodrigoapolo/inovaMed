package school.sptech.bucket;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

public class S3Provider {

    private final AwsCredentialsProvider credentials;

    public S3Provider() {
        this.credentials = DefaultCredentialsProvider.create();
    }

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(credentials)
                .build();
    }

    public void saveCredentialsToFile(String filePath) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filePath))) {
            AwsSessionCredentials sessionCredentials = (AwsSessionCredentials) credentials.resolveCredentials();
            writer.println("export AWS_ACCESS_KEY_ID=" + sessionCredentials.accessKeyId());
            writer.println("export AWS_SECRET_ACCESS_KEY=" + sessionCredentials.secretAccessKey());
            writer.println("export AWS_SESSION_TOKEN=" + sessionCredentials.sessionToken());
            writer.println("export AWS_DEFAULT_REGION=us-east-1");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
