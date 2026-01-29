package com.optifit.optifitbackend.controller;

import com.optifit.optifitbackend.service.FoodService;
import com.optifit.optifitbackend.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    private final WorkoutService workoutService;
    private final FoodService foodService;

    public DashboardController(WorkoutService workoutService, FoodService foodService) {
        this.workoutService = workoutService;
        this.foodService = foodService;
    }

    @GetMapping("/summary")
    public Map<String, Integer> getSummary() {
        int totalBurned = workoutService.getAllWorkouts().stream()
                .mapToInt(w -> w.caloriesBurned() == null ? 0 : w.caloriesBurned())
                .sum();

        int totalConsumed = foodService.getAllFoods().stream()
                .mapToInt(f -> f.getCalories() == null ? 0 : f.getCalories())
                .sum();

        return Map.of(
                "totalCaloriesBurned", totalBurned,
                "totalCaloriesConsumed", totalConsumed,
                "netCalories", totalConsumed - totalBurned);
    }

    @PostMapping("/restore")
    public void restoreData(@RequestBody com.optifit.optifitbackend.dto.SyncDto syncDto) {
        if (syncDto.workouts() != null) {
            syncDto.workouts().forEach(workoutService::createWorkout);
        }
        if (syncDto.foods() != null) {
            syncDto.foods().forEach(foodDto -> {
                com.optifit.optifitbackend.domain.Food food = new com.optifit.optifitbackend.domain.Food();
                food.setName(foodDto.name());
                food.setCalories(foodDto.calories());
                food.setDate(foodDto.date());
                foodService.createFood(food);
            });
        }
    }
}
