package com.optifit.optifitbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
public class HealthController {

    @GetMapping("/")
    public Map<String, Object> healthCheck() {
        return Map.of(
                "status", "UP",
                "message", "OptiFit Backend is running successfully!",
                "timestamp", LocalDateTime.now(),
                "documentation", "/swagger-ui.html");
    }
}
