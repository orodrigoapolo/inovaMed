package school.sptech.infra;

import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.nio.file.Path;

public class S3Provider {
    private final AwsSessionCredentials credentials;

    public S3Provider() {
        this.credentials = AwsSessionCredentials.create(
                System.getenv("AWS_ACCESS_KEY_ID"),
                System.getenv("AWS_SECRET_ACCESS_KEY"),
                System.getenv("AWS_SESSION_TOKEN")
        );
    }

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(() -> credentials)
                .build();
    }

    public S3Client putS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(() -> credentials)
                .build();
    }

    public void putS3Client(PutObjectRequest putObjectRequest, Path path) {
        getS3Client().putObject(putObjectRequest, path);
    }
}
