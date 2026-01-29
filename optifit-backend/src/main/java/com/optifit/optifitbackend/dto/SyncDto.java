package com.optifit.optifitbackend.dto;

import java.util.List;

public record SyncDto(
        List<WorkoutDto> workouts,
        List<FoodDto> foods) {
}
