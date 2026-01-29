package com.optifit.optifitbackend.service;

import com.optifit.optifitbackend.domain.Workout;
import com.optifit.optifitbackend.dto.WorkoutDto;
import com.optifit.optifitbackend.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public List<WorkoutDto> getAllWorkouts() {
        return workoutRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public WorkoutDto createWorkout(WorkoutDto workoutDto) {
        Workout workout = new Workout(
                workoutDto.name(),
                workoutDto.date(),
                workoutDto.durationMinutes(),
                workoutDto.caloriesBurned(),
                workoutDto.notes());
        Workout savedWorkout = workoutRepository.save(workout);
        return mapToDto(savedWorkout);
    }

    public WorkoutDto updateWorkout(Long id, WorkoutDto workoutDto) {
        return workoutRepository.findById(id)
                .map(workout -> {
                    workout.setName(workoutDto.name());
                    workout.setDate(workoutDto.date());
                    workout.setDurationMinutes(workoutDto.durationMinutes());
                    workout.setCaloriesBurned(workoutDto.caloriesBurned());
                    workout.setNotes(workoutDto.notes());
                    return mapToDto(workoutRepository.save(workout));
                })
                .orElseThrow(() -> new RuntimeException("Workout not found"));
    }

    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }

    private WorkoutDto mapToDto(Workout workout) {
        return new WorkoutDto(
                workout.getId(),
                workout.getName(),
                workout.getDate(),
                workout.getDurationMinutes(),
                workout.getCaloriesBurned(),
                workout.getNotes());
    }
}
