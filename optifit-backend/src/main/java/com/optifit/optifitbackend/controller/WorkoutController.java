package com.optifit.optifitbackend.controller;

import com.optifit.optifitbackend.dto.WorkoutDto;
import com.optifit.optifitbackend.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping
    public List<WorkoutDto> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    @PostMapping
    public WorkoutDto createWorkout(@RequestBody WorkoutDto workoutDto) {
        return workoutService.createWorkout(workoutDto);
    }

    @PutMapping("/{id}")
    public WorkoutDto updateWorkout(@PathVariable Long id, @RequestBody WorkoutDto workoutDto) {
        return workoutService.updateWorkout(id, workoutDto);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
    }
}
