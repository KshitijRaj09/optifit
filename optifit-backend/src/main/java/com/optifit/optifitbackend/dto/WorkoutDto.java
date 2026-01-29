package com.optifit.optifitbackend.dto;

import java.time.LocalDate;

public record WorkoutDto(
                Long id,
                String name,
                LocalDate date,
                Integer durationMinutes,
                Integer caloriesBurned,
                String notes) {
}
