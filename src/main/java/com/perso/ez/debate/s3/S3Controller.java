package com.perso.ez.debate.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/s3")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class S3Controller {

    @Value("${s3.bucketName}")
    private String bucketName;

    @Value("${s3.accessKey}")
    private String accessKey;

    @Value("${s3.secretKey}")
    private String secretKey;

    @GetMapping("/bucket")
    String getBucketName() {
        return bucketName;
    }

    @GetMapping("/accessKey")
    String getAccessKey() {
        return accessKey;
    }

    @GetMapping("/secretKey")
    String getSecretKey() {
        return secretKey;
    }
}
